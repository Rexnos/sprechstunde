export type ServiceName = "database" | "llm" | "speech" | "tts";

/** A local dependency (MongoDB, Ollama, speech service) is down, slow, or misbehaving. */
export class ServiceUnavailableError extends Error {
  constructor(
    public readonly service: ServiceName,
    message: string,
  ) {
    super(message);
    this.name = "ServiceUnavailableError";
  }
}

/** The request itself is invalid; safe to show the message to the user. */
export class BadRequestError extends Error {
  constructor(
    message: string,
    public readonly status = 400,
  ) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class NotFoundError extends BadRequestError {
  constructor(message = "Not found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}
