import { NextResponse, type NextRequest } from "next/server";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

/**
 * Basic cross-site request protection for the local API: state-changing
 * requests must come from a page served by this app. This stops other
 * websites open in the same browser from writing to the tutor's data.
 */
export function proxy(request: NextRequest) {
  if (SAFE_METHODS.has(request.method)) return NextResponse.next();

  const origin = request.headers.get("origin");
  const site = request.headers.get("sec-fetch-site");
  // Compare against the Host header the browser actually used: nextUrl.origin is
  // normalised by Next.js (127.0.0.1 shows up as localhost), so it can't be trusted here.
  const host = request.headers.get("host");
  const sameOrigin = origin ? safeHost(origin) === host : site === null || site === "same-origin" || site === "none";
  if (!sameOrigin) {
    return NextResponse.json({ error: { code: "forbidden", message: "Cross-site requests are not allowed." } }, { status: 403 });
  }
  return NextResponse.next();
}

function safeHost(origin: string): string | null {
  try {
    return new URL(origin).host;
  } catch {
    return null;
  }
}

export const config ={ matcher: "/api/:path*" };
