import "server-only";
import { z } from "zod";

const EnvSchema = z.object({
  MONGODB_URI: z.string().min(1).default("mongodb://127.0.0.1:27017/local_language_tutor"),
  OLLAMA_BASE_URL: z.url().default("http://127.0.0.1:11434"),
  OLLAMA_MODEL: z.string().min(1).default("gemma3:4b"),
  OLLAMA_TIMEOUT_MS: z.coerce.number().int().positive().default(120_000),
  SPEECH_SERVICE_URL: z.url().default("http://127.0.0.1:8001"),
  SPEECH_TIMEOUT_MS: z.coerce.number().int().positive().default(60_000),
  TTS_MODE: z.enum(["piper", "browser", "off"]).default("piper"),
});

export type Env = z.infer<typeof EnvSchema>;

let cached: Env | undefined;

/** Validated server environment. Throws a readable error on invalid config. */
export function env(): Env {
  if (cached) return cached;
  const result = EnvSchema.safeParse(process.env);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    throw new Error(`Invalid environment configuration: ${issues}`);
  }
  cached = result.data;
  return cached;
}
