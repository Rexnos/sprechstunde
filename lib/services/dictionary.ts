import "server-only";
import type { Filter, WithId } from "mongodb";
import { foldKey, normalizeKey, type DictDoc, type DictEntryDTO } from "../dictionary/transform";
import { getDb } from "../mongodb";

const MAX_RESULTS = 30;

function entryDTO(d: WithId<DictDoc>): DictEntryDTO {
  return {
    id: d._id.toHexString(),
    word: d.word,
    pos: d.pos,
    gender: d.gender,
    plural: d.plural,
    ipa: d.ipa,
    senses: d.senses,
  };
}

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Looks a word up in German and English. Best matches come first: the headword itself,
 * then words it is a form of (ging → gehen), then words whose main meaning is it
 * (dog → Hund), then headwords starting with it, then any English meaning.
 * Every step uses an index.
 */
export async function searchDictionary(q: string, limit = MAX_RESULTS): Promise<DictEntryDTO[]> {
  const key = normalizeKey(q);
  if (!key) return [];
  const dict = (await getDb()).collection<DictDoc>("dictionary");
  const steps: Filter<DictDoc>[] = [
    { key },
    { fold: foldKey(q) },
    { formKeys: key },
    // Before the prefix step, or "dog" would list Doge and Dogma ahead of Hund.
    { en1: key },
    { key: { $regex: `^${escapeRegex(key)}` } },
    { enKeys: key },
  ];

  const seen = new Set<string>();
  const out: DictEntryDTO[] = [];
  for (const filter of steps) {
    if (out.length >= limit) break;
    // Within a step: names last, shorter headwords first ("Hund" before "Hundeleine"),
    // and the entry with more meanings first (schön the adjective before an old spelling).
    const docs = await dict
      .aggregate<WithId<DictDoc>>([
        { $match: filter },
        { $limit: 200 },
        { $addFields: { len: { $strLenCP: "$word" }, isName: { $eq: ["$pos", "name"] }, meanings: { $size: "$senses" } } },
        { $sort: { isName: 1, len: 1, meanings: -1, _id: 1 } },
        { $limit: limit },
      ])
      .toArray();
    for (const d of docs) {
      const id = d._id.toHexString();
      if (seen.has(id)) continue;
      seen.add(id);
      out.push(entryDTO(d));
      if (out.length >= limit) break;
    }
  }
  return out;
}

export async function dictionaryCount(): Promise<number> {
  return (await getDb()).collection("dictionary").estimatedDocumentCount();
}
