/**
 * Loads the kaikki.org German Wiktionary extract into the `dictionary` collection.
 * Download it once (about 1 GB) from https://kaikki.org/dictionary/German/ into data/, then:
 *
 *   npm run dict:import -- data/kaikki.org-dictionary-German.jsonl          # into MONGODB_URI
 *   npm run dict:import -- data/kaikki.org-dictionary-German.jsonl --out data/dictionary.ndjson
 *
 * The second form only writes the converted entries, for mongoimport into the Docker stack
 * (see scripts/docker-dictionary.ps1). Re-running replaces the whole collection.
 * Data: Wiktionary, CC BY-SA 4.0.
 */
import { createReadStream, createWriteStream, readFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { createGunzip } from "node:zlib";
import { MongoClient } from "mongodb";
import { toDictDoc, type DictDoc } from "../lib/dictionary/transform";

const BATCH = 1000;

function loadEnv() {
  try {
    for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {
    /* optional */
  }
}

async function* entries(file: string): AsyncGenerator<DictDoc> {
  const input = createReadStream(file);
  const lines = createInterface({ input: file.endsWith(".gz") ? input.pipe(createGunzip()) : input, crlfDelay: Infinity });
  for await (const line of lines) {
    if (!line.trim()) continue;
    let raw: unknown;
    try {
      raw = JSON.parse(line);
    } catch {
      continue;
    }
    const doc = toDictDoc(raw as Parameters<typeof toDictDoc>[0]);
    if (doc) yield doc;
  }
}

async function toFile(file: string, out: string) {
  const stream = createWriteStream(out);
  let n = 0;
  for await (const doc of entries(file)) {
    if (!stream.write(JSON.stringify(doc) + "\n")) await new Promise<void>((r) => stream.once("drain", () => r()));
    if (++n % 20_000 === 0) console.log(`  ${n} entries…`);
  }
  await new Promise<void>((resolve, reject) => stream.end((err?: Error | null) => (err ? reject(err) : resolve())));
  console.log(`[ok] Wrote ${n} entries to ${out}`);
}

async function toDb(file: string) {
  loadEnv();
  const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/local_language_tutor";
  const client = await new MongoClient(uri, { serverSelectionTimeoutMS: 5000 }).connect();
  try {
    const db = client.db();
    // Fill a staging collection and swap it in, so the app keeps working during the import.
    const staging = db.collection<DictDoc>("dictionary_import");
    await staging.drop().catch(() => {});
    let batch: DictDoc[] = [];
    let n = 0;
    for await (const doc of entries(file)) {
      batch.push(doc);
      if (batch.length === BATCH) {
        await staging.insertMany(batch, { ordered: false });
        n += batch.length;
        batch = [];
        if (n % 20_000 === 0) console.log(`  ${n} entries…`);
      }
    }
    if (batch.length) await staging.insertMany(batch, { ordered: false });
    n += batch.length;
    if (!n) throw new Error("No German entries found. Is this the kaikki.org German .jsonl file?");
    await staging.rename("dictionary", { dropTarget: true });
    // Same indexes as ensureIndexes in lib/mongodb.ts, built now rather than on the next app start.
    const dict = db.collection("dictionary");
    await Promise.all([dict.createIndex({ key: 1 }), dict.createIndex({ fold: 1 }), dict.createIndex({ formKeys: 1 }), dict.createIndex({ en1: 1 }), dict.createIndex({ enKeys: 1 })]);
    console.log(`[ok] Imported ${n} entries into the dictionary collection.`);
  } finally {
    await client.close();
  }
}

async function main() {
  const args = process.argv.slice(2);
  const outAt = args.indexOf("--out");
  const out = outAt >= 0 ? args[outAt + 1] : undefined;
  const file = args.find((a, i) => !a.startsWith("--") && (outAt < 0 || i !== outAt + 1));
  if (!file || (outAt >= 0 && !out)) {
    console.error("Usage: npm run dict:import -- <kaikki German .jsonl[.gz]> [--out <file.ndjson>]");
    process.exit(1);
  }
  console.log(`Reading ${file}…`);
  await (out ? toFile(file, out) : toDb(file));
}

main().catch((err) => {
  console.error(`[error] ${(err as Error).message}`);
  process.exit(1);
});
