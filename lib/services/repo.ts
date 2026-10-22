import "server-only";
import { ObjectId, type Db, type Sort } from "mongodb";
import { getDb } from "../mongodb";
import { NotFoundError } from "../errors";
import {
  DEFAULT_SETTINGS,
  type Correction,
  type CourseProgressDTO,
  type GeneratedDTO,
  type GeneratedKind,
  type PracticeKind,
  type PracticeSummaryDTO,
  type Level,
  type MessageDTO,
  type Mode,
  type ProgressDTO,
  type ReviewState,
  type SessionDTO,
  type Settings,
  type VocabDTO,
  type VocabItem,
} from "../schemas";
import { ALL_LESSONS, getCourseLesson } from "../course";
import { scheduleReview, termKey, type ReviewResult } from "./review";

// ---------- Document shapes ----------

export type ProfileDoc = Settings & { _id: ObjectId; key: "default"; createdAt: Date; updatedAt: Date };

export type SessionDoc = {
  _id: ObjectId;
  profileId: ObjectId;
  title: string;
  mode: Mode;
  lessonId?: string;
  courseUnitId?: string;
  targetLanguage: string;
  level: Level;
  status: "active" | "completed";
  startedAt: Date;
  lastActivityAt: Date;
  endedAt?: Date;
  messageCount: number;
  /** Estimated active practice time (gaps between turns are capped). */
  activeMs: number;
  promptVersion: string;
};

export type MessageDoc = {
  _id: ObjectId;
  sessionId: ObjectId;
  profileId: ObjectId;
  role: "user" | "assistant";
  text: string;
  inputMethod?: "text" | "voice";
  correction?: Correction | null;
  vocabulary?: VocabItem[];
  nextPrompt?: string;
  fallback?: boolean;
  model?: string;
  latencyMs?: number;
  activeMs?: number;
  createdAt: Date;
};

export type VocabDoc = {
  _id: ObjectId;
  profileId: ObjectId;
  term: string;
  termKey: string;
  meaning: string;
  exampleSentence: string;
  sourceSessionId?: ObjectId;
  reviewState: ReviewState;
  streak: number;
  reviewCount: number;
  nextReviewAt: Date;
  lastReviewedAt?: Date;
  createdAt: Date;
};

export type CourseProgressDoc = {
  _id: ObjectId;
  profileId: ObjectId;
  lessonId: string;
  unitId: string;
  status: "completed";
  /** "placement" when skipped via the placement test. */
  source?: "lesson" | "placement";
  bestScore: number;
  attempts: number;
  completedAt: Date;
  lastAttemptAt: Date;
};

export type PracticeResultDoc = {
  _id: ObjectId;
  profileId: ObjectId;
  kind: PracticeKind;
  itemId: string;
  score: number;
  at: Date;
};

export type GeneratedDoc = {
  _id: ObjectId;
  profileId: ObjectId;
  kind: GeneratedKind;
  key: string;
  payload: unknown;
  model: string;
  createdAt: Date;
};

/** Gaps longer than this between turns are not counted as practice time. */
const MAX_TURN_GAP_MS = 3 * 60 * 1000;
const FIRST_TURN_MS = 30 * 1000;

const col = {
  profiles: (db: Db) => db.collection<ProfileDoc>("profiles"),
  sessions: (db: Db) => db.collection<SessionDoc>("sessions"),
  messages: (db: Db) => db.collection<MessageDoc>("messages"),
  vocabulary: (db: Db) => db.collection<VocabDoc>("vocabulary"),
  courseProgress: (db: Db) => db.collection<CourseProgressDoc>("course_progress"),
  practice: (db: Db) => db.collection<PracticeResultDoc>("practice_results"),
  generated: (db: Db) => db.collection<GeneratedDoc>("generated_content"),
};

// ---------- Profile / settings ----------

export async function getProfile(): Promise<ProfileDoc> {
  const db = await getDb();
  const now = new Date();
  const profile = await col.profiles(db).findOneAndUpdate(
    { key: "default" },
    { $setOnInsert: { ...DEFAULT_SETTINGS, key: "default", createdAt: now, updatedAt: now } },
    { upsert: true, returnDocument: "after" },
  );
  // Fill in settings added in later versions of the app.
  return { ...DEFAULT_SETTINGS, ...profile! };
}

export function settingsOf(p: ProfileDoc): Settings {
  const s = {} as Record<string, unknown>;
  for (const key of Object.keys(DEFAULT_SETTINGS)) s[key] = (p as Record<string, unknown>)[key];
  return s as Settings;
}

export async function updateSettings(patch: Partial<Settings>): Promise<Settings> {
  const db = await getDb();
  const profile = await getProfile();
  await col.profiles(db).updateOne({ _id: profile._id }, { $set: { ...patch, updatedAt: new Date() } });
  return settingsOf({ ...profile, ...patch });
}

// ---------- Sessions ----------

export function sessionDTO(s: SessionDoc): SessionDTO {
  return {
    id: s._id.toHexString(),
    title: s.title,
    mode: s.mode,
    lessonId: s.lessonId,
    level: s.level,
    status: s.status,
    startedAt: s.startedAt.toISOString(),
    lastActivityAt: s.lastActivityAt.toISOString(),
    messageCount: s.messageCount,
  };
}

export async function createSession(input: {
  profile: ProfileDoc;
  mode: Mode;
  title: string;
  lessonId?: string;
  courseUnitId?: string;
  promptVersion: string;
  /** Optional opening line from the tutor (e.g. a role-play starter). */
  starter?: string;
}): Promise<SessionDoc> {
  const db = await getDb();
  const now = new Date();
  const doc: SessionDoc = {
    _id: new ObjectId(),
    profileId: input.profile._id,
    title: input.title,
    mode: input.mode,
    lessonId: input.lessonId,
    courseUnitId: input.courseUnitId,
    targetLanguage: input.profile.targetLanguage,
    level: input.profile.level,
    status: "active",
    startedAt: now,
    lastActivityAt: now,
    messageCount: input.starter ? 1 : 0,
    activeMs: 0,
    promptVersion: input.promptVersion,
  };
  await col.sessions(db).insertOne(doc);
  if (input.starter) {
    await col.messages(db).insertOne({
      _id: new ObjectId(),
      sessionId: doc._id,
      profileId: doc.profileId,
      role: "assistant",
      text: input.starter,
      createdAt: now,
    });
  }
  return doc;
}

export async function listSessions(profileId: ObjectId, opts: { limit: number; before?: Date }) {
  const db = await getDb();
  const filter = { profileId, ...(opts.before ? { lastActivityAt: { $lt: opts.before } } : {}) };
  const docs = await col.sessions(db).find(filter).sort({ lastActivityAt: -1 }).limit(opts.limit + 1).toArray();
  const page = docs.slice(0, opts.limit);
  return {
    sessions: page.map(sessionDTO),
    nextCursor: docs.length > opts.limit ? page[page.length - 1].lastActivityAt.toISOString() : null,
  };
}

export async function getSession(profileId: ObjectId, sessionId: ObjectId): Promise<SessionDoc> {
  const db = await getDb();
  const session = await col.sessions(db).findOne({ _id: sessionId, profileId });
  if (!session) throw new NotFoundError("Session not found.");
  return session;
}

export async function setSessionStatus(session: SessionDoc, status: SessionDoc["status"]) {
  const db = await getDb();
  const update = status === "completed" ? { status, endedAt: new Date() } : { status };
  await col.sessions(db).updateOne({ _id: session._id }, { $set: update, ...(status === "active" ? { $unset: { endedAt: "" } } : {}) });
  return { ...session, ...update };
}

export async function deleteSession(session: SessionDoc) {
  const db = await getDb();
  await col.messages(db).deleteMany({ sessionId: session._id });
  await col.sessions(db).deleteOne({ _id: session._id });
}

// ---------- Messages ----------

export function messageDTO(m: MessageDoc): MessageDTO {
  return {
    id: m._id.toHexString(),
    role: m.role,
    text: m.text,
    inputMethod: m.inputMethod,
    correction: m.correction,
    vocabulary: m.vocabulary,
    nextPrompt: m.nextPrompt,
    fallback: m.fallback,
    createdAt: m.createdAt.toISOString(),
  };
}

export async function listMessages(sessionId: ObjectId, limit = 200): Promise<MessageDoc[]> {
  const db = await getDb();
  const recent = await col.messages(db).find({ sessionId }).sort({ createdAt: -1 }).limit(limit).toArray();
  return recent.reverse();
}

/** Saves one learner turn and the tutor's answer, and updates session counters. */
export async function saveExchange(input: {
  session: SessionDoc;
  userText: string;
  inputMethod: "text" | "voice";
  correction: Correction | null;
  reply: string;
  nextPrompt: string;
  vocabulary: VocabItem[];
  fallback: boolean;
  model: string;
  latencyMs: number;
  userAt: Date;
}): Promise<{ user: MessageDoc; assistant: MessageDoc }> {
  const db = await getDb();
  const { session } = input;
  const gap = input.userAt.getTime() - session.lastActivityAt.getTime();
  const firstTurn = session.activeMs === 0;
  const activeMs = firstTurn ? FIRST_TURN_MS : Math.max(0, Math.min(gap, MAX_TURN_GAP_MS));

  const user: MessageDoc = {
    _id: new ObjectId(),
    sessionId: session._id,
    profileId: session.profileId,
    role: "user",
    text: input.userText,
    inputMethod: input.inputMethod,
    correction: input.correction,
    activeMs,
    createdAt: input.userAt,
  };
  const assistant: MessageDoc = {
    _id: new ObjectId(),
    sessionId: session._id,
    profileId: session.profileId,
    role: "assistant",
    text: input.reply,
    nextPrompt: input.nextPrompt,
    vocabulary: input.vocabulary,
    fallback: input.fallback || undefined,
    model: input.model,
    latencyMs: input.latencyMs,
    createdAt: new Date(Math.max(Date.now(), input.userAt.getTime() + 1)),
  };
  await col.messages(db).insertMany([user, assistant]);
  await col.sessions(db).updateOne(
    { _id: session._id },
    {
      $set: { lastActivityAt: assistant.createdAt, status: "active" },
      $unset: { endedAt: "" },
      $inc: { messageCount: 2, activeMs },
    },
  );
  return { user, assistant };
}

// ---------- Vocabulary ----------

export function vocabDTO(v: VocabDoc): VocabDTO {
  return {
    id: v._id.toHexString(),
    term: v.term,
    meaning: v.meaning,
    example: v.exampleSentence,
    reviewState: v.reviewState,
    streak: v.streak,
    nextReviewAt: v.nextReviewAt.toISOString(),
    lastReviewedAt: v.lastReviewedAt?.toISOString(),
    sourceSessionId: v.sourceSessionId?.toHexString(),
    createdAt: v.createdAt.toISOString(),
  };
}

/** Adds terms that are not already in the learner's list. Existing cards are left untouched. */
export async function addVocabulary(profileId: ObjectId, items: VocabItem[], sourceSessionId?: ObjectId): Promise<number> {
  if (!items.length) return 0;
  const db = await getDb();
  const now = new Date();
  const ops = items.map((item) => ({
    updateOne: {
      filter: { profileId, termKey: termKey(item.term) },
      update: {
        $setOnInsert: {
          profileId,
          term: item.term,
          termKey: termKey(item.term),
          meaning: item.meaning,
          exampleSentence: item.example,
          sourceSessionId,
          reviewState: "new" as const,
          streak: 0,
          reviewCount: 0,
          nextReviewAt: now,
          createdAt: now,
        },
      },
      upsert: true,
    },
  }));
  const res = await col.vocabulary(db).bulkWrite(ops, { ordered: false });
  return res.upsertedCount;
}

export async function listVocabulary(
  profileId: ObjectId,
  opts: { q?: string; state?: ReviewState; due?: boolean; limit: number; skip: number },
) {
  const db = await getDb();
  const filter: Record<string, unknown> = { profileId };
  if (opts.state) filter.reviewState = opts.state;
  if (opts.due) filter.nextReviewAt = { $lte: new Date() };
  if (opts.q) {
    const rx = new RegExp(escapeRegex(opts.q), "i");
    filter.$or = [{ term: rx }, { meaning: rx }, { exampleSentence: rx }];
  }
  const sort: Sort = opts.due ? { nextReviewAt: 1 } : { createdAt: -1 };
  const [items, total] = await Promise.all([
    col.vocabulary(db).find(filter).sort(sort).skip(opts.skip).limit(opts.limit).toArray(),
    col.vocabulary(db).countDocuments(filter),
  ]);
  return { items: items.map(vocabDTO), total };
}

export async function dueVocabulary(profileId: ObjectId, limit: number): Promise<VocabDoc[]> {
  const db = await getDb();
  return col.vocabulary(db).find({ profileId, nextReviewAt: { $lte: new Date() } }).sort({ nextReviewAt: 1 }).limit(limit).toArray();
}

export async function getVocab(profileId: ObjectId, id: ObjectId): Promise<VocabDoc> {
  const db = await getDb();
  const doc = await col.vocabulary(db).findOne({ _id: id, profileId });
  if (!doc) throw new NotFoundError("Vocabulary item not found.");
  return doc;
}

export async function reviewVocab(doc: VocabDoc, result: ReviewResult): Promise<VocabDoc> {
  const db = await getDb();
  const next = scheduleReview(doc, result);
  await col.vocabulary(db).updateOne({ _id: doc._id }, { $set: next, $inc: { reviewCount: 1 } });
  return { ...doc, ...next, reviewCount: doc.reviewCount + 1 };
}

export async function editVocab(doc: VocabDoc, patch: { meaning?: string; example?: string }): Promise<VocabDoc> {
  const db = await getDb();
  const set: Partial<VocabDoc> = {};
  if (patch.meaning !== undefined) set.meaning = patch.meaning;
  if (patch.example !== undefined) set.exampleSentence = patch.example;
  await col.vocabulary(db).updateOne({ _id: doc._id }, { $set: set });
  return { ...doc, ...set };
}

export async function deleteVocab(doc: VocabDoc) {
  const db = await getDb();
  await col.vocabulary(db).deleteOne({ _id: doc._id });
}

// ---------- Progress ----------

export async function getProgress(profile: ProfileDoc): Promise<ProgressDTO> {
  const db = await getDb();
  const profileId = profile._id;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const since = new Date(Date.now() - 13 * 24 * 60 * 60 * 1000);
  since.setHours(0, 0, 0, 0);
  const now = new Date();

  const [sessionAgg, userAgg, daily, errorCats, vocabAgg, due, lessons, recent] = await Promise.all([
    col.sessions(db)
      .aggregate<{ total: number; completed: number; activeMs: number }>([
        { $match: { profileId } },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
            activeMs: { $sum: "$activeMs" },
          },
        },
      ])
      .toArray(),
    col.messages(db)
      .aggregate<{ turns: number; voice: number; corrections: number }>([
        { $match: { profileId, role: "user" } },
        {
          $group: {
            _id: null,
            turns: { $sum: 1 },
            voice: { $sum: { $cond: [{ $eq: ["$inputMethod", "voice"] }, 1, 0] } },
            corrections: { $sum: { $cond: [{ $gt: ["$correction", null] }, 1, 0] } },
          },
        },
      ])
      .toArray(),
    col.messages(db)
      .aggregate<{ _id: string; turns: number; activeMs: number }>([
        { $match: { profileId, role: "user", createdAt: { $gte: since } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone } },
            turns: { $sum: 1 },
            activeMs: { $sum: "$activeMs" },
          },
        },
      ])
      .toArray(),
    col.messages(db)
      .aggregate<{ _id: string; count: number; example: Correction }>([
        { $match: { profileId, role: "user", correction: { $type: "object" } } },
        { $sort: { createdAt: -1 } },
        { $group: { _id: "$correction.category", count: { $sum: 1 }, example: { $first: "$correction" } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ])
      .toArray(),
    col.vocabulary(db)
      .aggregate<{ _id: ReviewState; count: number; reviewed: number }>([
        { $match: { profileId } },
        { $group: { _id: "$reviewState", count: { $sum: 1 }, reviewed: { $sum: { $cond: [{ $gt: ["$reviewCount", 0] }, 1, 0] } } } },
      ])
      .toArray(),
    col.vocabulary(db).countDocuments({ profileId, nextReviewAt: { $lte: now } }),
    col.sessions(db)
      .aggregate<{ _id: string; sessions: number; completed: number; last: Date }>([
        { $match: { profileId, lessonId: { $type: "string" } } },
        {
          $group: {
            _id: "$lessonId",
            sessions: { $sum: 1 },
            completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
            last: { $max: "$lastActivityAt" },
          },
        },
        { $sort: { last: -1 } },
      ])
      .toArray(),
    col.sessions(db).find({ profileId }).sort({ lastActivityAt: -1 }).limit(5).toArray(),
  ]);

  const dayKey = (d: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: timezone }).format(d);
  const byDay = new Map(daily.map((d) => [d._id, d]));
  const days: ProgressDTO["daily"] = [];
  for (let i = 13; i >= 0; i--) {
    const key = dayKey(new Date(now.getTime() - i * 24 * 60 * 60 * 1000));
    const d = byDay.get(key);
    days.push({ date: key, turns: d?.turns ?? 0, minutes: Math.round((d?.activeMs ?? 0) / 60000) });
  }
  const today = days[days.length - 1];

  const vocabCount = (state: ReviewState) => vocabAgg.find((v) => v._id === state)?.count ?? 0;
  const s = sessionAgg[0];
  const u = userAgg[0];

  return {
    totals: {
      sessions: s?.total ?? 0,
      completedSessions: s?.completed ?? 0,
      practiceMinutes: Math.round((s?.activeMs ?? 0) / 60000),
      userTurns: u?.turns ?? 0,
      voiceTurns: u?.voice ?? 0,
      corrections: u?.corrections ?? 0,
    },
    today: { minutes: today.minutes, turns: today.turns, goalMinutes: profile.dailyGoalMinutes },
    vocabulary: {
      total: vocabAgg.reduce((n, v) => n + v.count, 0),
      new: vocabCount("new"),
      learning: vocabCount("learning"),
      known: vocabCount("known"),
      due,
      reviewed: vocabAgg.reduce((n, v) => n + v.reviewed, 0),
    },
    daily: days,
    errorCategories: errorCats.map((e) => ({ category: e._id || "other", count: e.count, example: e.example })),
    lessons: lessons.map((l) => ({ lessonId: l._id, sessions: l.sessions, completed: l.completed, lastPracticedAt: l.last.toISOString() })),
    recentSessions: recent.map(sessionDTO),
  };
}

// ---------- Beginner course ----------

export async function getCourseProgress(profileId: ObjectId): Promise<CourseProgressDTO> {
  const db = await getDb();
  const docs = await col.courseProgress(db).find({ profileId }).toArray();
  const done = new Set(docs.map((d) => d.lessonId));
  return {
    lessons: docs.map((d) => ({
      lessonId: d.lessonId,
      unitId: d.unitId,
      status: d.status,
      bestScore: d.bestScore,
      attempts: d.attempts,
      completedAt: d.completedAt.toISOString(),
    })),
    completed: docs.filter((d) => ALL_LESSONS.some((x) => x.lesson.id === d.lessonId)).length,
    total: ALL_LESSONS.length,
    nextLessonId: ALL_LESSONS.find((x) => !done.has(x.lesson.id))?.lesson.id ?? null,
  };
}

/** Records a finished lesson (keeping the best score) and adds its phrases to the learner's words. */
export async function recordLessonResult(profileId: ObjectId, lessonId: string, score: number) {
  const found = getCourseLesson(lessonId);
  if (!found) throw new NotFoundError("Unknown lesson.");
  const db = await getDb();
  const now = new Date();
  await col.courseProgress(db).updateOne(
    { profileId, lessonId },
    {
      $setOnInsert: { profileId, lessonId, unitId: found.unit.id, status: "completed" as const, source: "lesson" as const, completedAt: now },
      $max: { bestScore: score },
      $inc: { attempts: 1 },
      $set: { lastAttemptAt: now },
    },
    { upsert: true },
  );
  const added = await addVocabulary(
    profileId,
    found.lesson.phrases.map((ph) => ({ term: ph.de, meaning: ph.en, example: "" })),
  );
  return { added };
}

/**
 * Applies a placement result: marks every lesson of the passed units (and the alphabet
 * unit) as done. Phrases are not added to Vocabulary, so the review queue isn't flooded.
 */
export async function applyPlacement(profileId: ObjectId, passed: { unitId: string; score: number }[], startUnitId: string | null) {
  const db = await getDb();
  const now = new Date();
  const units = new Map(passed.map((p) => [p.unitId, p.score]));
  if (passed.length) units.set("u0", Math.max(units.get("u0") ?? 0, 1));
  const ops = ALL_LESSONS.filter(({ unit }) => units.has(unit.id)).map(({ unit, lesson }) => ({
    updateOne: {
      filter: { profileId, lessonId: lesson.id },
      update: {
        $setOnInsert: { profileId, lessonId: lesson.id, unitId: unit.id, status: "completed" as const, source: "placement" as const, completedAt: now, attempts: 0 },
        $max: { bestScore: units.get(unit.id)! },
        $set: { lastAttemptAt: now },
      },
      upsert: true,
    },
  }));
  if (ops.length) await col.courseProgress(db).bulkWrite(ops, { ordered: false });
  await recordPracticeResult(profileId, "placement", startUnitId ?? "done", passed.length / 8);
  // Everything passed: the learner is beyond A1.
  if (passed.length >= 8) await col.profiles(db).updateOne({ _id: profileId }, { $set: { level: "A2", updatedAt: now } });
}

// ---------- Practice results (dictation, pronunciation, stories, placement) ----------

export async function recordPracticeResult(profileId: ObjectId, kind: PracticeKind, itemId: string, score: number) {
  const db = await getDb();
  await col.practice(db).insertOne({ _id: new ObjectId(), profileId, kind, itemId, score, at: new Date() });
}

export async function getPracticeSummary(profileId: ObjectId): Promise<PracticeSummaryDTO> {
  const db = await getDb();
  const [dictation, best, placement] = await Promise.all([
    col.practice(db)
      .aggregate<{ sessions: number; average: number }>([
        { $match: { profileId, kind: "dictation" } },
        { $group: { _id: null, sessions: { $sum: 1 }, average: { $avg: "$score" } } },
      ])
      .toArray(),
    col.practice(db)
      .aggregate<{ _id: { kind: PracticeKind; itemId: string }; best: number }>([
        { $match: { profileId, kind: { $in: ["pronunciation", "story"] } } },
        { $group: { _id: { kind: "$kind", itemId: "$itemId" }, best: { $max: "$score" } } },
      ])
      .toArray(),
    col.practice(db).find({ profileId, kind: "placement" }).sort({ at: -1 }).limit(1).toArray(),
  ]);
  const of = (kind: PracticeKind) => best.filter((b) => b._id.kind === kind);
  return {
    dictation: { sessions: dictation[0]?.sessions ?? 0, average: dictation[0]?.average ?? null },
    pronunciation: of("pronunciation").map((b) => ({ setId: b._id.itemId, best: b.best })),
    stories: of("story").map((b) => ({ storyId: b._id.itemId, best: b.best })),
    placement: placement[0] ? { startUnitId: placement[0].itemId === "done" ? null : placement[0].itemId, at: placement[0].at.toISOString() } : null,
  };
}

// ---------- AI-generated practice content ----------

export function generatedDTO(d: GeneratedDoc): GeneratedDTO {
  return { id: d._id.toHexString(), kind: d.kind, key: d.key, model: d.model, createdAt: d.createdAt.toISOString(), payload: d.payload };
}

export async function saveGenerated(profileId: ObjectId, kind: GeneratedKind, key: string, payload: unknown, model: string) {
  const db = await getDb();
  const doc: GeneratedDoc = { _id: new ObjectId(), profileId, kind, key, payload, model, createdAt: new Date() };
  await col.generated(db).insertOne(doc);
  return doc;
}

export async function listGenerated(profileId: ObjectId, kind: GeneratedKind, key?: string, limit = 100) {
  const db = await getDb();
  return col.generated(db)
    .find({ profileId, kind, ...(key ? { key } : {}) })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
}

export async function getGenerated(profileId: ObjectId, id: ObjectId) {
  const db = await getDb();
  const doc = await col.generated(db).findOne({ _id: id, profileId });
  if (!doc) throw new NotFoundError("Not found.");
  return doc;
}

export async function deleteGenerated(profileId: ObjectId, id: ObjectId) {
  const db = await getDb();
  await col.generated(db).deleteOne({ _id: id, profileId });
}

// ---------- Export / delete ----------

export async function exportAll(profile: ProfileDoc) {
  const db = await getDb();
  const profileId = profile._id;
  const [sessions, messages, vocabulary, courseProgress, practiceResults, generatedContent] = await Promise.all([
    col.sessions(db).find({ profileId }).toArray(),
    col.messages(db).find({ profileId }).sort({ createdAt: 1 }).toArray(),
    col.vocabulary(db).find({ profileId }).toArray(),
    col.courseProgress(db).find({ profileId }).toArray(),
    col.practice(db).find({ profileId }).toArray(),
    col.generated(db).find({ profileId }).toArray(),
  ]);
  return {
    exportedAt: new Date().toISOString(),
    format: "local-language-tutor/v1",
    settings: settingsOf(profile),
    sessions,
    messages,
    vocabulary,
    courseProgress,
    practiceResults,
    generatedContent,
  };
}

export async function deleteAllHistory(profileId: ObjectId, what: { sessions: boolean; vocabulary: boolean }) {
  const db = await getDb();
  const ops: Promise<unknown>[] = [];
  if (what.sessions) ops.push(col.messages(db).deleteMany({ profileId }), col.sessions(db).deleteMany({ profileId }));
  if (what.vocabulary) ops.push(col.vocabulary(db).deleteMany({ profileId }));
  if (what.sessions) ops.push(col.courseProgress(db).deleteMany({ profileId }), col.practice(db).deleteMany({ profileId }), col.generated(db).deleteMany({ profileId }));
  await Promise.all(ops);
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

