import "server-only";
import { ObjectId } from "mongodb";
import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { BadRequestError, ServiceUnavailableError } from "./errors";

export type ApiError = { error: { code: string; message: string; service?: string } };

export function jsonError(status: number, code: string, message: string, service?: string) {
  return Response.json({ error: { code, message, service } } satisfies ApiError, { status });
}

/**
 * Wraps a route handler so that known errors become predictable JSON responses
 * and unknown errors never leak stack traces to the browser.
 */
export function handle<A extends unknown[]>(fn: (...args: A) => Promise<Response>) {
  return async (...args: A): Promise<Response> => {
    try {
      return await fn(...args);
    } catch (err) {
      // Let Next.js's own control-flow errors (e.g. "this route is dynamic" during prerendering) through.
      unstable_rethrow(err);
      if (err instanceof ServiceUnavailableError) {
        return jsonError(503, "service_unavailable", err.message, err.service);
      }
      if (err instanceof BadRequestError) {
        return jsonError(err.status, err.status === 404 ? "not_found" : "bad_request", err.message);
      }
      if (err instanceof z.ZodError) {
        return jsonError(400, "validation_error", err.issues.map((i) => (i.path.length ? `${i.path.join(".")}: ${i.message}` : i.message)).join("; "));
      }
      console.error("[api] unhandled error", err);
      const detail = process.env.NODE_ENV === "development" ? ` (${(err as Error)?.message ?? String(err)})` : "";
      return jsonError(500, "internal_error", `Something went wrong. Check the server log for details.${detail}`);
    }
  };
}

export async function readJson<T extends z.ZodType>(request: Request, schema: T): Promise<z.infer<T>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw new BadRequestError("Request body must be valid JSON.");
  }
  return schema.parse(body);
}

export function toObjectId(id: string): ObjectId {
  if (!ObjectId.isValid(id)) throw new BadRequestError("Invalid id.");
  return new ObjectId(id);
}
