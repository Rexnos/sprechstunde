import { handle } from "@/lib/api";
import { dictionaryCount, searchDictionary } from "@/lib/services/dictionary";

export const GET = handle(async (request: Request) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim().slice(0, 80) ?? "";
  // The tap-a-word popup only needs the best few entries.
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit")) || 30, 1), 30);
  const available = (await dictionaryCount()) > 0;
  const items = available && q ? await searchDictionary(q, limit) : [];
  return Response.json({ items, available });
});
