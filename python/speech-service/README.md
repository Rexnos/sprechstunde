# Local speech service

A FastAPI service that the Next.js app calls on `127.0.0.1:8001`.

| Endpoint | Purpose |
| --- | --- |
| `GET /health` | STT/TTS readiness and installed voices |
| `POST /transcribe` | multipart `file` (webm/ogg/wav/mp4) and `language` (default `de`) → transcript with segments |
| `POST /synthesize` | `{text, voice, length_scale}` → `audio/wav` |

Setup and start-up are handled by `scripts/setup-speech.ps1` and `scripts/start-speech.ps1` in the repo root.

Environment variables: `WHISPER_MODEL` (default `small`), `WHISPER_DEVICE` (`cpu`/`cuda`/`auto`), `WHISPER_COMPUTE_TYPE`, `PIPER_VOICES_DIR`, `MAX_UPLOAD_BYTES`, `MAX_AUDIO_SECONDS` (60).

Audio is decoded in memory with PyAV and never written to disk. Only one transcription and one synthesis run at a time, so RAM/VRAM use stays bounded.

To add another voice: `.venv\Scripts\python -m piper.download_voices <voice-name> --data-dir voices`, then pick it in Settings.
