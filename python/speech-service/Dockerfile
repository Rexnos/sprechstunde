# syntax=docker/dockerfile:1
# Local speech service: faster-whisper (STT) + Piper (TTS).
# Models are downloaded at build time, so the running container needs no internet.
FROM python:3.12-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
# ACCEL=cuda adds CUDA 12 cuBLAS + cuDNN 9 (~2 GB) so faster-whisper can use an NVIDIA GPU;
# the driver itself comes from the host. ACCEL=cpu (default) keeps the image small and works
# on any machine, x86-64 or ARM. Either way the service falls back to CPU when needed.
ARG ACCEL=cpu
RUN if [ "$ACCEL" = "cuda" ]; then pip install "nvidia-cublas-cu12" "nvidia-cudnn-cu12==9.*"; fi
ENV LD_LIBRARY_PATH=/usr/local/lib/python3.12/site-packages/nvidia/cublas/lib:/usr/local/lib/python3.12/site-packages/nvidia/cudnn/lib

ARG WHISPER_MODEL=small
ARG PIPER_VOICE=de_DE-thorsten-medium
ENV WHISPER_MODEL=${WHISPER_MODEL} \
    WHISPER_MODEL_DIR=/models/whisper \
    PIPER_VOICES_DIR=/models/voices \
    WHISPER_DEVICE=auto \
    HF_HUB_OFFLINE=0
RUN python -m piper.download_voices "${PIPER_VOICE}" --data-dir /models/voices \
 && python -c "from faster_whisper.utils import download_model; download_model('${WHISPER_MODEL}', cache_dir='/models/whisper')"
# Never contact Hugging Face at runtime.
ENV HF_HUB_OFFLINE=1

COPY app.py .
RUN useradd --create-home --uid 10001 speech && chown -R speech /models
USER speech

EXPOSE 8001
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD python -c "import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://127.0.0.1:8001/health', timeout=5).status == 200 else 1)"
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8001"]
