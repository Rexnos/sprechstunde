import { z } from "zod";
import { handle, readJson, toObjectId } from "@/lib/api";
import { ServiceUnavailableError } from "@/lib/errors";
import { chatJsonStream } from "@/lib/ollama";
import { ChatRequestSchema } from "@/lib/schemas";
import { getProfile, getSession, messageDTO } from "@/lib/services/repo";
import { extractStringField, tryParseCorrectionPrefix } from "@/lib/services/stream-json";
import { finishTurn, prepareTurn } from "@/lib/services/tutor";

const StreamRequestSchema = ChatRequestSchema.extend({ spoken: z.boolean().default(false) });

/**
 * Streaming tutor turn for voice calls. Responds with NDJSON events:
 *   {type:"correction"} → {type:"reply", text} (repeated, growing) → {type:"done"} | {type:"error"}
 * Validation and setup errors are returned as normal JSON errors before streaming starts.
 */
export const POST = handle(async (request: Request) => {
  const body = await readJson(request, StreamRequestSchema);
  const profile = await getProfile();
  const session = await getSession(profile._id, toObjectId(body.sessionId));
  const turn = await prepareTurn({ profile, session, message: body.message, spoken: body.spoken });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: Record<string, unknown>) => controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      const started = Date.now();
      let firstTokenMs: number | null = null;
      let replyStartMs: number | null = null;
      let raw = "";
      let correctionSent = false;
      let lastReply = "";

      try {
        for await (const delta of chatJsonStream(turn.model, turn.messages, request.signal)) {
          firstTokenMs ??= Date.now() - started;
          raw += delta;
          if (!correctionSent) {
            const c = tryParseCorrectionPrefix(raw);
            if (c.ready) {
              correctionSent = true;
              send({ type: "correction", correction: c.correction });
            }
          }
          const reply = extractStringField(raw, "reply");
          if (reply.found && reply.text !== lastReply) {
            replyStartMs ??= Date.now() - started;
            lastReply = reply.text;
            send({ type: "reply", text: reply.text, closed: reply.closed });
          }
        }
        const totalMs = Date.now() - started;
        const result = await finishTurn(turn, raw, body.inputMethod, totalMs);
        send({
          type: "done",
          user: messageDTO(result.user),
          assistant: messageDTO(result.assistant),
          newVocabulary: result.newVocabulary,
          timings: { firstTokenMs, replyStartMs, totalMs },
        });
      } catch (err) {
        if (request.signal.aborted) return; // learner hung up or interrupted; nothing is saved
        console.error("[chat/stream]", err);
        send({
          type: "error",
          message: err instanceof ServiceUnavailableError ? err.message : "Something went wrong while the tutor was answering.",
          service: err instanceof ServiceUnavailableError ? err.service : undefined,
        });
      } finally {
        try {
          controller.close();
        } catch {
          /* already closed by an abort */
        }
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" },
  });
});
