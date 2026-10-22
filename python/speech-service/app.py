"""Local speech service: speech-to-text (faster-whisper) and text-to-speech (Piper).

Binds to 127.0.0.1 only. Audio is processed in memory and never written to disk.

Run:  .venv\\Scripts\\python -m uvicorn app:app --host 127.0.0.1 --port 8001
"""

from __future__ import annotations

import io
import logging
import os
import threading
import wave
from pathlib import Path

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.responses import Response
from pydantic import BaseModel, Field

log = logging.getLogger("speech-service")
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

HERE = Path(__file__).parent
WHISPER_MODEL = os.getenv("WHISPER_MODEL", "small")
WHISPER_DEVICE = os.getenv("WHISPER_DEVICE", "auto")  # "auto" tries CUDA first, then CPU
WHISPER_COMPUTE_TYPE = os.getenv("WHISPER_COMPUTE_TYPE", "")  # empty = best for the device
WHISPER_MODEL_DIR = os.getenv("WHISPER_MODEL_DIR", str(HERE / "models"))
VOICES_DIR = Path(os.getenv("PIPER_VOICES_DIR", str(HERE / "voices")))
MAX_UPLOAD_BYTES = int(os.getenv("MAX_UPLOAD_BYTES", str(10 * 1024 * 1024)))
MAX_AUDIO_SECONDS = float(os.getenv("MAX_AUDIO_SECONDS", "60"))
MAX_TTS_CHARS = 600

app = FastAPI(title="Local speech service", version="1.0.0")

# Only one transcription / synthesis at a time to keep RAM/VRAM use bounded.
_stt_lock = threading.Lock()
_tts_lock = threading.Lock()
_whisper = None
_whisper_error: str | None = None
_whisper_device = WHISPER_DEVICE  # actual device once loaded
_voices: dict[str, object] = {}


def _load_whisper(device: str):
    import numpy as np
    from faster_whisper import WhisperModel

    compute_type = WHISPER_COMPUTE_TYPE or ("int8_float16" if device == "cuda" else "int8")
    # Once downloaded, never contact the internet again (offline use, faster start-up).
    cached = Path(WHISPER_MODEL_DIR).exists() and any(Path(WHISPER_MODEL_DIR).glob(f"models--*faster-whisper-{WHISPER_MODEL}"))
    model = WhisperModel(
        WHISPER_MODEL, device=device, compute_type=compute_type, download_root=WHISPER_MODEL_DIR, local_files_only=cached
    )
    # Missing CUDA libraries (cuBLAS/cuDNN) only fail at inference time, so run a tiny test.
    segments, _ = model.transcribe(np.zeros(16000, dtype=np.float32), language="de")
    list(segments)
    log.info("Loaded Whisper model %s on %s (%s)", WHISPER_MODEL, device, compute_type)
    return model


def get_whisper():
    global _whisper, _whisper_error, _whisper_device
    if _whisper is None:
        devices = ["cuda", "cpu"] if WHISPER_DEVICE == "auto" else [WHISPER_DEVICE]
        errors = []
        for device in devices:
            try:
                _whisper = _load_whisper(device)
                _whisper_device = device
                _whisper_error = None
                break
            except Exception as exc:  # noqa: BLE001 - fall back to the next device, report at the end
                errors.append(f"{device}: {exc}")
                log.warning("Whisper could not use %s: %s", device, exc)
        if _whisper is None:
            _whisper_error = "; ".join(errors)
            raise RuntimeError(_whisper_error)
    return _whisper


def available_voices() -> list[str]:
    if not VOICES_DIR.exists():
        return []
    return sorted(p.stem for p in VOICES_DIR.glob("*.onnx") if p.with_suffix(".onnx.json").exists())


def get_voice(name: str):
    from piper import PiperVoice

    if name not in _voices:
        model = VOICES_DIR / f"{name}.onnx"
        if not model.exists():
            raise HTTPException(status_code=400, detail=f"Voice '{name}' is not installed. Available: {', '.join(available_voices()) or 'none'}")
        _voices[name] = PiperVoice.load(str(model))
        log.info("Loaded Piper voice %s", name)
    return _voices[name]


@app.on_event("startup")
def preload():
    # Load Whisper in the background so the first recording doesn't wait for it.
    threading.Thread(target=lambda: _try(get_whisper), daemon=True).start()


def _try(fn):
    try:
        fn()
    except Exception:  # noqa: BLE001 - already logged and reported via /health
        pass


@app.get("/health")
def health():
    model_cached = any(Path(WHISPER_MODEL_DIR).glob(f"*{WHISPER_MODEL}*")) if Path(WHISPER_MODEL_DIR).exists() else False
    stt_ok = _whisper is not None or (model_cached and _whisper_error is None)
    stt_detail = (
        _whisper_error
        or ("loaded" if _whisper is not None else ("ready (loads on first use)" if model_cached else f"model '{WHISPER_MODEL}' not downloaded yet"))
    )
    voices = available_voices()
    return {
        "stt": {"ok": stt_ok, "model": WHISPER_MODEL, "device": _whisper_device, "detail": stt_detail},
        "tts": {"ok": bool(voices), "voices": voices, "detail": "ok" if voices else f"no Piper voices found in {VOICES_DIR}"},
    }


@app.post("/transcribe")
def transcribe(file: UploadFile = File(...), language: str = Form("de")):
    data = file.file.read(MAX_UPLOAD_BYTES + 1)
    if len(data) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="Recording is too large.")
    if len(data) < 1000:
        raise HTTPException(status_code=400, detail="Recording is empty or too short.")

    try:
        model = get_whisper()
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=503, detail=f"Whisper model could not be loaded: {exc}") from exc

    with _stt_lock:
        try:
            # faster-whisper decodes webm/ogg/wav/mp4 via PyAV; no ffmpeg CLI needed.
            segments, info = model.transcribe(
                io.BytesIO(data),
                language=language or None,
                vad_filter=True,
                beam_size=5,
                condition_on_previous_text=False,
            )
            if info.duration > MAX_AUDIO_SECONDS:
                raise HTTPException(status_code=400, detail=f"Recording is longer than {int(MAX_AUDIO_SECONDS)} seconds.")
            segs = [
                {"start": round(s.start, 2), "end": round(s.end, 2), "text": s.text.strip(), "avgLogprob": round(s.avg_logprob, 3)}
                for s in segments
            ]
        except HTTPException:
            raise
        except Exception as exc:  # noqa: BLE001
            log.exception("Transcription failed")
            raise HTTPException(status_code=400, detail=f"Could not decode or transcribe the audio: {exc}") from exc

    return {
        "text": " ".join(s["text"] for s in segs).strip(),
        "language": info.language,
        "languageProbability": round(info.language_probability, 3),
        "duration": round(info.duration, 2),
        "segments": segs,
    }


class PhonemizeRequest(BaseModel):
    words: list[str] = Field(min_length=1, max_length=40)
    voice: str = Field(default="de_DE-thorsten-medium", max_length=100, pattern=r"^[A-Za-z0-9_\-.]+$")


@app.post("/phonemize")
def phonemize(req: PhonemizeRequest):
    """IPA for each word or short sentence, as the voice pronounces it. Used to verify AI practice."""
    voice = get_voice(req.voice)
    out = []
    for word in req.words:
        word = word.strip()[:200]
        try:
            out.append("".join("".join(s) for s in voice.phonemize(word)) if word else "")
        except Exception:  # noqa: BLE001 - an unpronounceable word just fails verification
            out.append("")
    return {"ipa": out}


class SynthesizeRequest(BaseModel):
    text: str = Field(min_length=1, max_length=MAX_TTS_CHARS)
    voice: str = Field(default="de_DE-thorsten-medium", max_length=100, pattern=r"^[A-Za-z0-9_\-.]+$")
    length_scale: float = Field(default=1.0, ge=0.5, le=2.0)


@app.post("/synthesize")
def synthesize(req: SynthesizeRequest):
    from piper import SynthesisConfig

    voice = get_voice(req.voice)
    buf = io.BytesIO()
    with _tts_lock:
        with wave.open(buf, "wb") as wav:
            voice.synthesize_wav(req.text, wav, syn_config=SynthesisConfig(length_scale=req.length_scale))
    return Response(content=buf.getvalue(), media_type="audio/wav")


if __name__ == "__main__":
    import uvicorn

    # Loopback by default; the Docker image binds 0.0.0.0 on its private network.
    uvicorn.run(app, host=os.getenv("SPEECH_HOST", "127.0.0.1"), port=int(os.getenv("SPEECH_PORT", "8001")))
