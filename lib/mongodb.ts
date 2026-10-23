import "server-only";
import { Db, MongoClient } from "mongodb";
import { env } from "./env";
import { ServiceUnavailableError } from "./errors";

type Cache = { client?: MongoClient; connecting?: Promise<MongoClient>; indexed?: boolean };

// Survive hot reloads in development without opening a new pool each time.
const globalCache = globalThis as unknown as { __mongo?: Cache };
const cache: Cache = (globalCache.__mongo ??= {});

async function connect(): Promise<MongoClient> {
  if (cache.client) return cache.client;
  cache.connecting ??= new MongoClient(env().MONGODB_URI, {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
    maxPoolSize: 10,
  })
    .connect()
    .then((client) => {
      cache.client = client;
      return client;
    })
    .finally(() => {
      cache.connecting = undefined;
    });
  return cache.connecting;
}

export async function getDb(): Promise<Db> {
  let client: MongoClient;
  try {
    client = await connect();
  } catch (err) {
    throw new ServiceUnavailableError(
      "database",
      `Cannot reach MongoDB at ${redact(env().MONGODB_URI)}. Is the MongoDB service running? (${(err as Error).message})`,
    );
  }
  const db = client.db();
  if (!cache.indexed) {
    await ensureIndexes(db);
    cache.indexed = true;
  }
  return db;
}

async function ensureIndexes(db: Db) {
  await Promise.all([
    db.collection("sessions").createIndex({ profileId: 1, startedAt: -1 }),
    db.collection("messages").createIndex({ sessionId: 1, createdAt: 1 }),
    db.collection("vocabulary").createIndex({ profileId: 1, nextReviewAt: 1 }),
    // One card per term per learner; terms are normalised before insert.
    db.collection("vocabulary").createIndex({ profileId: 1, termKey: 1 }, { unique: true }),
    db.collection("course_progress").createIndex({ profileId: 1, lessonId: 1 }, { unique: true }),
    db.collection("practice_results").createIndex({ profileId: 1, kind: 1, at: -1 }),
    db.collection("generated_content").createIndex({ profileId: 1, kind: 1, createdAt: -1 }),
    db.collection("checkups").createIndex({ profileId: 1, takenAt: -1 }),
    // Shared Wiktionary data loaded by scripts/import-dictionary.ts (keep the two lists in step).
    ...["key", "fold", "formKeys", "en1", "enKeys"].map((field) => db.collection("dictionary").createIndex({ [field]: 1 })),
  ]);
}

export async function pingDb(): Promise<void> {
  const db = await getDb();
  await db.command({ ping: 1 });
}

function redact(uri: string) {
  return uri.replace(/\/\/[^@/]+@/, "//***@");
}
