# Sprechstunde — Local AI German Tutor

A speaking-practice app for German that runs **entirely on your Windows PC**: a local LLM (Ollama) for the tutor, faster-whisper for speech recognition, Piper for speech output, and MongoDB for your history. No paid APIs, no cloud account, no data leaves the machine.

> Original code and lesson content. It is inspired by conversation-based apps but copies no proprietary code, content, branding or models.

## Features (MVP)

- **Tutor chat**: free conversation, role-play lessons (café, introductions, train station, shopping, work, doctor's appointment) and vocabulary practice.
- **Push-to-talk**: you record, then **review and edit the transcript** before sending.
- **Structured feedback** for each turn: the reply, a correction (original → better, with an explanation and category), new vocabulary, and a follow-up question.
- **Spoken replies** with a local Piper voice. If Piper isn't available it falls back to the Windows/browser voice, and then to text only.
- **Vocabulary list**: search, filters, "needs practice" / "I know it", and a flash-card review queue (simple Leitner scheduling).
- **Progress page**: sessions, estimated practice minutes, a 14-day activity chart, your most frequent correction categories, and lesson history.
- **Settings**: level (A1–C1), how often to correct, explanation language, model, voice, speech speed, autoplay and daily goal.
- **Status page** that checks MongoDB, Ollama, STT and TTS, with a fix hint for each.
- **Data controls**: export everything to JSON, or delete sessions and/or vocabulary.

## Architecture

```
Browser (Next.js UI, React client components)
        │  fetch /api/*            (proxy.ts blocks cross-site writes)
        ▼
Next.js 16 Route Handlers  ──►  Ollama          127.0.0.1:11434   (LLM, JSON-schema output)
        │                  ──►  speech-service  127.0.0.1:8001    (FastAPI: faster-whisper + Piper)
        ▼
MongoDB Community Server   127.0.0.1:27017   db: local_language_tutor
```

| Path | What |
| --- | --- |
| `app/(app)/*` | Pages: dashboard, tutor, lessons, vocabulary, progress, settings, status |
| `app/api/*` | `health`, `chat`, `sessions[/id]`, `speech/transcribe`, `speech/synthesize`, `vocabulary[/id]`, `progress`, `settings`, `data` |
| `lib/prompts/tutor-v1.ts` | Versioned tutor system prompt |
| `lib/schemas/` | Zod schemas for requests, settings and the tutor's JSON output |
| `lib/services/tutor-output.ts` | Validates and repairs model output, with a safe fallback |
| `lib/services/repo.ts` | All MongoDB access (profiles, sessions, messages, vocabulary, progress aggregates) |
| `python/speech-service/app.py` | Local STT/TTS service |
| `scripts/` | Setup/start scripts and the model evaluation script |

## Run with Docker (any computer)

Everything runs in containers: the web app, MongoDB, Ollama (AI model) and the speech service (Whisper + Piper). It works on Windows, macOS and Linux, on x86-64 and ARM (including Apple Silicon), with or without a GPU. Only the web app is published, and only on `127.0.0.1`.

### Pick the setup for your device

The start scripts detect this automatically; the table explains what they choose.

| Your device | Mode | How the AI runs |
| --- | --- | --- |
| Windows or Linux with an **NVIDIA GPU** | `nvidia` | Ollama and Whisper on the GPU, in Docker |
| Linux with an **AMD GPU** (ROCm-supported) | `amd` | Ollama on the GPU in Docker (ROCm image); Whisper on the CPU |
| **Mac with Apple Silicon** | `host-ollama` | Install the Ollama app; it uses the Metal GPU. The app and speech run in Docker |
| Windows with an **AMD or Intel GPU** | `host-ollama` | Install the Ollama app (it supports these GPUs); Docker can't |
| **No GPU** (any OS, x86 or ARM) | `cpu` | Everything on the CPU. Works everywhere, but slower; use a smaller model (see `.env.docker.example`) |

Rough reply speed with qwen3.5:4b: NVIDIA or Apple Silicon a few seconds, CPU-only 20–60 s. On a CPU-only machine, set `OLLAMA_MODEL=gemma3:1b` and `WHISPER_MODEL=base` in `.env`.

### One-time setup

- **Windows:** `wsl --install` (admin PowerShell, then reboot), install **Docker Desktop** (keep the WSL 2 engine). For NVIDIA, update the driver and test with `docker run --rm --gpus all ubuntu:24.04 nvidia-smi`. Recommended with 16 GB RAM: create `%UserProfile%\.wslconfig` containing `[wsl2]`, `memory=10GB` and `swap=8GB`, then run `wsl --shutdown`.
- **macOS:** install **Docker Desktop** and give it at least 6 GB of memory (Settings → Resources). Install the **Ollama app** from ollama.com for GPU speed.
- **Linux:** install Docker Engine with the Compose plugin.
  - NVIDIA: also install the NVIDIA Container Toolkit.
  - AMD: install the ROCm driver; your user needs the `video`/`render` groups.
  - Native Ollama: start it with `OLLAMA_HOST=172.17.0.1:11434` so containers (and only they) can reach it.
- **Requirement:** Docker Compose 2.24 or newer (current Docker Desktop has it).

### Start / stop

```powershell
# Windows
powershell -ExecutionPolicy Bypass -File scripts/docker-up.ps1            # auto-detect
powershell -ExecutionPolicy Bypass -File scripts/docker-up.ps1 -Mode cpu  # or nvidia / host-ollama
powershell -ExecutionPolicy Bypass -File scripts/docker-down.ps1
```

```bash
# macOS / Linux
./scripts/docker-up.sh          # auto-detect, or: nvidia | amd | host-ollama | cpu
./scripts/docker-down.sh
```

- **Manual start:** combine `docker-compose.yml` with one add-on: `docker-compose.nvidia.yml`, `docker-compose.amd.yml` or `docker-compose.host-ollama.yml`. Use the base file alone for CPU.
- **First start:** downloads the AI model (~3.3 GB, unless you use host Ollama) and the speech libraries. NVIDIA mode adds about 2 GB of CUDA libraries.
- **After that it works offline.**
- **Check the Status page:** the model's GPU share, and whether speech runs on `cuda` or `cpu`.
- **Settings:** copy `.env.docker.example` to `.env` to change the model, Whisper size, image versions or port.

### Data, backups and updates

- **Where data lives:** your progress is in the Docker volume `language-tutor_mongo-data`, and the AI models in `language-tutor_ollama-models`. Both survive `down` and rebuilds; only `docker compose down -v` deletes them.
- **Back up:** `scripts/docker-backup.ps1` (Windows) or `scripts/docker-backup.sh` (macOS/Linux) writes `backups/tutor-<date>.archive.gz`.
- **Restore (Windows):** `scripts/docker-restore.ps1 backups\tutor-<date>.archive.gz`. On macOS/Linux, the restore commands are in the comment at the top of `docker-backup.sh`.
- **Update:** get the new code, then run the start script again; it rebuilds what changed.

### Troubleshooting (Docker)

| Problem | Fix |
| --- | --- |
| NVIDIA GPU not detected | Update the GPU driver and Docker Desktop. On Windows, WSL 2 mode must be on. On Linux, install the NVIDIA Container Toolkit. Test with the `nvidia-smi` command above |
| `host-ollama` mode: Status says Ollama unreachable | Is the Ollama app running? On Linux, set `OLLAMA_HOST=172.17.0.1:11434` |
| Model only partly on GPU | Too little VRAM. Close GPU-heavy apps or pick a smaller model in `.env` |
| Speech shows "on cpu" with an NVIDIA GPU | `docker compose logs speech` shows why CUDA failed; it falls back to CPU automatically |
| Very slow replies on CPU | Use `OLLAMA_MODEL=gemma3:1b`, `WHISPER_MODEL=base`, and give Docker more CPU/RAM |
| Port 3000 in use | Stop a natively running `npm run dev`, or set `APP_PORT=3001` in `.env` |
| `depends_on: !override` error | Docker Compose is older than 2.24. Update Docker Desktop / Compose |

## Installation without Docker (Windows 11)

Install these from their official sites:

| Tool | Notes |
| --- | --- |
| Node.js LTS (≥ 20) | `node --version` |
| Python 3.12 | faster-whisper and Piper wheels are reliable on 3.12. `py -0` lists installed versions |
| [Ollama for Windows](https://ollama.com/download) | `ollama --version` |
| [MongoDB Community Server](https://www.mongodb.com/try/download/community) | Install "as a Service". Optionally install `mongosh` too |
| FFmpeg | Optional. Audio decoding uses PyAV, which bundles FFmpeg libraries |

Then, from the project folder:

```powershell
npm install
copy .env.example .env.local                                       # adjust if needed
powershell -ExecutionPolicy Bypass -File scripts/setup-speech.ps1  # Python env + Whisper model + German voice
ollama pull gemma3:4b                                              # or the model you chose (see below)
```

## Running

Start order: MongoDB → Ollama → speech service → app.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-all.ps1
```

Or start each part by hand:

```powershell
net start MongoDB                                   # admin shell; usually already running as a service
ollama serve                                        # if Ollama isn't already running in the tray
powershell -File scripts/start-speech.ps1           # speech service on 127.0.0.1:8001
npm run dev                                         # app on http://127.0.0.1:3000
```

Open **http://127.0.0.1:3000** and check the **Status** page first.

For daily use, a production build is faster: `npm run build` then `npm start`.

## Ports and data locations

| Service | Address | Data |
| --- | --- | --- |
| App | 127.0.0.1:3000 | — |
| MongoDB | 127.0.0.1:27017 | Database `local_language_tutor` (MongoDB's data dir, default `C:\Program Files\MongoDB\Server\<ver>\data`) |
| Ollama | 127.0.0.1:11434 | Models in `%USERPROFILE%\.ollama\models` |
| Speech service | 127.0.0.1:8001 | Whisper models in `python/speech-service/models/`, voices in `python/speech-service/voices/` |

Every service binds to loopback. Don't change this unless you add authentication first.

**Recordings are never stored.** Audio goes to the speech service, is transcribed in memory, and is discarded. Only the transcript text (as part of the conversation) is saved.

## Beginner course (German from zero)

**Course** in the sidebar: 9 units and 34 lessons from the alphabet to everyday A1 German (alphabet, sounds and spelling, greetings, introducing yourself, numbers and time, café, shopping, family, daily routine, travel and appointments).

Each lesson takes 10–15 minutes and has five steps:

1. **Learn**: phrases with audio at normal and slow speed, a word-by-word breakdown, and short grammar notes.
2. **Practice**: exercises generated from the lesson (meaning, listen & pick, build the sentence, fill the gap). Missed ones come back once.
3. **Repeat**: listen and say it back. The words the speech recognizer heard turn green. This checks words, not pronunciation.
4. **Talk**: a short guided conversation. The tutor's lines are spoken; you answer from an English prompt, with an optional German hint.
5. **Done**: your score is saved, and the lesson's phrases go into Vocabulary for spaced review.

An **alphabet chart** (`/course/alphabet`) lets you hear every letter's German name at any time. Unit 0 adds two alphabet exercise types: hear a letter and pick it, and hear a word spelled out and type it.

After a unit's last lesson (from Unit 1 on), **Practise with the tutor** starts a voice call in which the AI only uses German you have learned so far, with English hints if you're stuck.

All course content is hand-written, in `lib/course/units/*.ts` (one readable file per unit), and works without the AI model. **Have a fluent speaker review it** before relying on it, and add more units with the same `defineUnit` format.

## Practice (ear, pronunciation, reading) and placement test

- **Placement test** (`/course/placement`): about 5 minutes, 3 questions per unit, stops when it gets too hard, then marks the units you passed as done and starts you at the first new unit.
- **Listening & dictation** (`/practice/listen`): 10 sentences from lessons you've finished. Listen at normal or slow speed and type what you hear; each word is marked. Typing ae/oe/ue/ss instead of ä/ö/ü/ß is fine.
- **Pronunciation** (`/practice/pronunciation`): 8 sets of minimal pairs (ü/u, ü/i, ö, long/short vowels, ch/sch, ich/ach, s/z, r/l). Learn the pairs, then pick which word you heard, then say each word. The speaking check uses speech recognition, so it's a soft check, not a phonetic score.
- **Stories** (`/practice/stories`): one short story per unit, read aloud. Tap any word for its meaning, then answer 3 questions.

### Endless practice (AI-generated, auto-checked)

When the built-in material runs out, the local model writes more. **Every item is checked before you see it**, is marked **AI**, and can be deleted if something looks wrong.

- **New stories** (Stories → "Write a new story"): pick a unit. The story may only use words you've learned (checked against your finished lessons and Vocabulary; at most 25% unfamiliar words). It must have 5–10 short sentences, a complete glossary (gaps are filled from the course's own word list) and 3 valid questions. Failed drafts are retried once with feedback.
- **New dictation sentences** (results screen → "Generate 10 new sentences"): new sentences recombining your known words. Sentences that are too long or unfamiliar are dropped. When you've heard nearly everything, a batch is generated automatically.
- **Pronunciation in sentences** (after a sound set → "Practise in sentences"): real sentences from the course, the stories and your AI dictation sentences, chosen because they're rich in that sound. This is checked with the voice's own pronunciation via the speech service's `/phonemize` endpoint. No AI writing is involved: the 4B model could not invent valid minimal pairs (0 of 5 passed the sound check in testing), so this uses verified real sentences instead, and the pool grows as you generate dictation sentences.

Generation time with qwen3.5:4b (measured on the GTX 1650, about 50% on CPU): story about 1–3 min, 10 dictation sentences about 2 min. Expect roughly 5–10× faster when the model runs fully on an RTX 3060. You can cancel any generation. Saved AI content is in the `generated_content` collection and is included in export and delete.

Content lives in `lib/pronunciation.ts` and `lib/stories/index.ts`. Every pronunciation pair was checked with Piper's phonemizer to differ in the intended sound.

## Voice calls

**Start a call** on the dashboard, or **Call** on a lesson or in the chat header, opens a voice call:

- **Hold Space** (or the big button) while you speak, then release to send. A short tap toggles recording on/off instead.
- The tutor's reply is **streamed**: it starts speaking after the first sentence is written, while the rest is still being generated. Corrections and new words appear on screen during the reply.
- Press talk while the tutor is speaking to **interrupt**.
- **End call** marks the session finished and opens the full transcript with all corrections.

Speed depends almost entirely on whether the model fits in GPU memory. The Status page shows the split (for example "100% on GPU").

| Machine | Expected time until the tutor starts speaking |
| --- | --- |
| RTX 3060 6 GB (recommended) | ~1–2 s after speech recognition |
| GTX 1650 4 GB (model ~50% on CPU) | ~10–14 s |

### Recommended setup: RTX 3060 6 GB

1. Update the NVIDIA driver (any 2024+ driver), then reboot.
2. `ollama pull qwen3.5:4b`. After the first reply, `ollama ps` should show `100% GPU`.
3. GPU speech recognition (optional, faster): in `python/speech-service`, run
   `.venv\Scripts\python -m pip install nvidia-cublas-cu12 nvidia-cudnn-cu12==9.*`.
   The speech service (`-Device auto`, the default) then uses CUDA and falls back to the CPU otherwise. The Status page shows `small on cuda`.
4. Check `nvidia-smi` during a call: the model plus Whisper should use about 5 GB of the 6 GB.

## Choosing a model

A 6 GB card (RTX 3060) fits a quantised **4B** model fully; a 4 GB card (GTX 1650) only fits ~3B models fully, and larger ones spill into system RAM and slow down a lot. Candidates to benchmark:

| Model tag | Size | Notes |
| --- | --- | --- |
| `gemma3:4b` | ~3.3 GB | Default. Strong multilingual output; tight on 4 GB VRAM |
| `qwen2.5:3b` | ~1.9 GB | Faster; good at following the JSON schema |
| `llama3.2:3b` | ~2.0 GB | Fallback option |

Compare them on your machine:

```powershell
ollama pull qwen2.5:3b
npm run eval:tutor -- gemma3:4b
npm run eval:tutor -- qwen2.5:3b
```

The eval runs 14 fixed A1–B1 sentences: correct sentences, valid alternatives, common mistakes and STT-style input. It reports schema validity, whether a correction was given when one was expected, latency and tokens/s. **Read the corrections yourself.** The automatic score only checks *whether* a correction was given, not whether it was right. Record the model you pick in `.env.local` (`OLLAMA_MODEL`). Run `nvidia-smi` during a chat to confirm the GPU is actually in use.

Model tags and licences change. Check each model's licence on ollama.com before you redistribute anything.

### Speech recognition on the GPU

The speech service uses the CPU by default (`small` model, int8): a few seconds per utterance, and it leaves all VRAM to the LLM. To try the GPU, install the CUDA 12 cuBLAS/cuDNN libraries that faster-whisper needs, then run `scripts/start-speech.ps1 -Device cuda`. With 4 GB VRAM, Whisper and the LLM compete for memory, so measure before switching. `-WhisperModel base` is faster and less accurate; `medium` is more accurate and slower.

## Tests

```powershell
npm test            # Vitest: output parsing/fallback, prompts, schemas, review scheduling, components
npm run typecheck
npm run lint
npm run eval:tutor  # needs Ollama running
```

### Manual test checklist

- [ ] Status page shows all services green.
- [ ] Start a free conversation, type a German sentence, and get a reply with audio.
- [ ] Type a sentence with a mistake (e.g. "Ich habe 25 Jahre alt.") and see a correction card.
- [ ] Record speech, check the transcript appears in the box (not sent automatically), edit it, and send.
- [ ] Deny microphone permission and see a clear message.
- [ ] Reload the page and restart `npm run dev`: the session is still there under Tutor → Your sessions.
- [ ] A new word appears in Vocabulary; "Needs practice" and "I know it" update its status; the review queue works.
- [ ] Start a role-play lesson; the tutor opens with the scenario line. "End session" marks it completed on Lessons.
- [ ] Stop Ollama, send a message: you get an error, the message stays in the box, nothing crashes.
- [ ] Stop the speech service: the mic shows an error; replies fall back to the browser voice.
- [ ] Stop MongoDB: pages show "Cannot reach MongoDB" with a retry button.
- [ ] Start a call, hold Space, say "Ich habe nach Berlin gefahren", release: you see a correction and hear the reply begin before it has finished generating. Press talk mid-reply to interrupt.
- [ ] Disconnect from the internet and repeat the first steps (offline check).
- [ ] Export data (Settings) and check the JSON contains your sessions.

## Backup and restore

- Built-in: **Settings → Export everything (JSON)**.
- Full database: `mongodump --db local_language_tutor --out D:\backups\tutor-YYYY-MM-DD`, restore with `mongorestore --db local_language_tutor D:\backups\tutor-YYYY-MM-DD\local_language_tutor`. Keep backups outside the project folder, and test a restore at least once.

## Troubleshooting

| Problem | Check |
| --- | --- |
| Ollama unavailable | Is Ollama in the tray? `ollama list`. Is the model tag in Settings/`.env.local` downloaded? |
| Replies too slow | Try a smaller model (`qwen2.5:3b`). The first reply after a while includes model load time. Check `nvidia-smi` |
| GPU not used | `nvidia-smi` while generating. Update the NVIDIA driver. Check the Ollama logs in `%LOCALAPPDATA%\Ollama` |
| STT fails | Status page detail. Run `scripts/setup-speech.ps1` again. Don't use Python 3.14 for the venv. `av` must stay `<16` (pinned) |
| TTS fails | Is `python/speech-service/voices/*.onnx` + `.onnx.json` present? Switch Settings → Speech output → Browser voice |
| MongoDB connection fails | `Get-Service MongoDB`. Check the URI in `.env.local`. Look in the MongoDB logs |
| Microphone unavailable | Allow it in the address bar. Use `http://127.0.0.1:3000` or `http://localhost:3000`; a LAN IP is not a secure context |
| Offline mode fails | The app uses no web fonts or CDNs. Make sure the models were downloaded while you were online |

## Licences of bundled/downloaded assets

Check these before distributing anything:

- **faster-whisper** (MIT); Whisper model weights (MIT, OpenAI).
- **Piper** (`piper-tts`, GPL-3.0); voice `de_DE-thorsten-medium`: see its model card in the rhasspy/piper-voices repository.
- **Ollama** (MIT). **Each LLM has its own licence** (Gemma Terms of Use, Qwen licence, Llama Community License…).
- MongoDB Community Server (SSPL), Next.js (MIT).

## Roadmap (after MVP)

Spaced repetition tuning, placement test, streaming replies, phoneme-level pronunciation feedback, more languages (only after checking STT/TTS quality), multiple local profiles, a desktop wrapper, and Playwright end-to-end tests.
