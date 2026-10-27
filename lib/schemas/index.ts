import { z } from "zod";

// ---------- Shared enums ----------

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
export const LevelSchema = z.enum(CEFR_LEVELS);
export type Level = z.infer<typeof LevelSchema>;

export const MODES = ["conversation", "roleplay", "vocabulary"] as const;
export const ModeSchema = z.enum(MODES);
export type Mode = z.infer<typeof ModeSchema>;

export const ReviewStateSchema = z.enum(["new", "learning", "known"]);
export type ReviewState = z.infer<typeof ReviewStateSchema>;

// ---------- Settings ----------

export const SettingsSchema = z.object({
  displayName: z.string().trim().min(1).max(40),
  nativeLanguage: z.string().trim().min(1).max(40),
  targetLanguage: z.literal("German"),
  level: LevelSchema,
  goal: z.string().trim().max(120),
  explanationLanguage: z.enum(["native", "simple-target"]),
  correctionFrequency: z.enum(["every", "important", "off"]),
  model: z.string().trim().max(100),
  ttsEngine: z.enum(["piper", "browser", "off"]),
  ttsVoice: z.string().trim().max(100),
  speechRate: z.number().min(0.5).max(1.5),
  autoPlayReplies: z.boolean(),
  dailyGoalMinutes: z.number().int().min(5).max(180),
});
export type Settings = z.infer<typeof SettingsSchema>;

export const SettingsPatchSchema = SettingsSchema.partial().strict();

export const DEFAULT_SETTINGS: Settings = {
  displayName: "Learner",
  nativeLanguage: "English",
  targetLanguage: "German",
  level: "A1",
  goal: "daily conversation",
  explanationLanguage: "native",
  correctionFrequency: "important",
  model: "", // empty = use OLLAMA_MODEL from the environment
  ttsEngine: "piper",
  ttsVoice: "de_DE-thorsten-medium",
  speechRate: 1,
  autoPlayReplies: true,
  dailyGoalMinutes: 15,
};

// ---------- Tutor output (what the LLM must return) ----------

const shortText = (max: number) => z.string().trim().max(max);

export const CorrectionSchema = z.object({
  original: shortText(500),
  suggested: shortText(500),
  explanation: shortText(600),
  category: shortText(40).describe("Short grammar label, e.g. 'verb tense', 'word order', 'article/gender'"),
});
export type Correction = z.infer<typeof CorrectionSchema>;

export const VocabItemSchema = z.object({
  term: shortText(80).min(1),
  meaning: shortText(160).min(1),
  example: shortText(240),
});
export type VocabItem = z.infer<typeof VocabItemSchema>;

// Key order matters: Ollama's grammar generates fields in this order, so the model
// judges the learner's sentence before replying, and the reply streams early.
export const TutorResponseSchema = z.object({
  correction: CorrectionSchema.nullable(),
  reply: shortText(1200).min(1),
  vocabulary: z.array(VocabItemSchema).max(5),
  nextPrompt: shortText(300),
});
export type TutorResponse = z.infer<typeof TutorResponseSchema>;

// ---------- API request bodies ----------

export const CreateSessionSchema = z.object({
  mode: ModeSchema,
  lessonId: z.string().max(40).optional(),
  /** Beginner-course unit review: the tutor sticks to vocabulary taught so far. */
  courseUnitId: z.string().max(10).optional(),
  title: z.string().trim().max(120).optional(),
});

export const CourseResultSchema = z.object({
  lessonId: z.string().min(1).max(20),
  score: z.number().min(0).max(1),
});

export const PracticeKindSchema = z.enum(["dictation", "pronunciation", "story", "placement"]);
export type PracticeKind = z.infer<typeof PracticeKindSchema>;

export const PracticeResultSchema = z.object({
  kind: PracticeKindSchema,
  itemId: z.string().min(1).max(40),
  score: z.number().min(0).max(1),
});

export const PlacementApplySchema = z.object({
  /** Units the learner passed, with their placement score. */
  passed: z.array(z.object({ unitId: z.string().max(10), score: z.number().min(0).max(1) })).max(100),
  startUnitId: z.string().max(10).nullable(),
});

export type PracticeSummaryDTO = {
  dictation: { sessions: number; average: number | null };
  pronunciation: { setId: string; best: number }[];
  stories: { storyId: string; best: number }[];
  placement: { startUnitId: string | null; at: string } | null;
};

// ---------- Weekly check-up ----------

export const CheckupSkillSchema = z.enum(["reading", "listening", "grammar", "speaking"]);

const SkillScoreSchema = z
  .object({ correct: z.number().int().min(0).max(20), asked: z.number().int().min(1).max(20) })
  .refine((s) => s.correct <= s.asked, "correct can't exceed asked");

export const CheckupResultSchema = z.object({
  /** Skills left out were not tested (e.g. speaking skipped). */
  skills: z.partialRecord(CheckupSkillSchema, SkillScoreSchema).refine((s) => Object.keys(s).length > 0, "No answers to save."),
  missed: z.array(z.object({ de: z.string().trim().min(1).max(200), en: z.string().trim().min(1).max(200) })).max(20),
  /** Keys of the AI sentences that were asked, so the next check-up uses fresh ones. */
  aiSentences: z.array(z.string().max(200)).max(20),
});
export type CheckupResult = z.infer<typeof CheckupResultSchema>;

export type CheckupDTO = {
  id: string;
  /** Monday of the week, "YYYY-MM-DD". */
  weekOf: string;
  takenAt: string;
  score: number;
  skills: CheckupResult["skills"];
  missed: { de: string; en: string }[];
};

export type CheckupStatusDTO = {
  /** No check-up yet this week, and there's material to test. */
  dueNow: boolean;
  weekOf: string;
  thisWeek: CheckupDTO | null;
  /** The latest check-up of each week, oldest first (up to 12 weeks). */
  history: CheckupDTO[];
};

export const GenerateRequestSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("story"), unitId: z.string().max(10) }),
  z.object({ kind: z.literal("sentences") }),
]);
export type GeneratedKind = "story" | "sentences";

export type GeneratedDTO = {
  id: string;
  kind: GeneratedKind;
  /** unitId for stories, "all" for dictation sentences. */
  key: string;
  model: string;
  createdAt: string;
  payload: unknown;
};

export type CourseProgressDTO = {
  lessons: { lessonId: string; unitId: string; status: "completed"; bestScore: number; attempts: number; completedAt: string }[];
  completed: number;
  total: number;
  nextLessonId: string | null;
};

export const UpdateSessionSchema = z.object({
  status: z.enum(["active", "completed"]),
});

export const ChatRequestSchema = z.object({
  sessionId: z.string().min(1),
  message: z.string().trim().min(1, "Message is empty.").max(1000, "Message is too long (max 1000 characters)."),
  inputMethod: z.enum(["text", "voice"]).default("text"),
});

export const SynthesizeRequestSchema = z.object({
  text: z.string().trim().min(1).max(600),
  voice: z.string().max(100).optional(),
  rate: z.number().min(0.5).max(1.5).optional(),
});

export const VocabPatchSchema = z.union([
  z.object({ result: z.enum(["again", "good", "known"]) }),
  z.object({ meaning: shortText(160).min(1).optional(), example: shortText(240).optional() }).strict(),
]);

export const VocabCreateSchema = z.object({
  term: shortText(80).min(1),
  meaning: shortText(160).min(1),
  example: shortText(240).default(""),
});

// ---------- DTOs returned to the browser ----------

export type SessionDTO = {
  id: string;
  title: string;
  mode: Mode;
  lessonId?: string;
  level: Level;
  status: "active" | "completed";
  startedAt: string;
  lastActivityAt: string;
  messageCount: number;
};

export type MessageDTO = {
  id: string;
  role: "user" | "assistant";
  text: string;
  inputMethod?: "text" | "voice";
  correction?: Correction | null;
  vocabulary?: VocabItem[];
  nextPrompt?: string;
  fallback?: boolean;
  createdAt: string;
};

export type VocabDTO = {
  id: string;
  term: string;
  meaning: string;
  example: string;
  reviewState: ReviewState;
  streak: number;
  nextReviewAt: string;
  lastReviewedAt?: string;
  sourceSessionId?: string;
  createdAt: string;
};

export type ServiceStatus = { ok: boolean; detail: string };

export type HealthDTO = {
  app: ServiceStatus;
  database: ServiceStatus;
  /** gpuPercent: share of the loaded model in GPU memory; null when the model isn't loaded. */
  llm: ServiceStatus & { model: string; models: string[]; gpuPercent: number | null };
  stt: ServiceStatus;
  tts: ServiceStatus & { engine: Settings["ttsEngine"]; voices: string[] };
  checkedAt: string;
};

export type ProgressDTO = {
  totals: {
    sessions: number;
    completedSessions: number;
    practiceMinutes: number;
    userTurns: number;
    voiceTurns: number;
    corrections: number;
  };
  today: { minutes: number; turns: number; goalMinutes: number };
  vocabulary: { total: number; new: number; learning: number; known: number; due: number; reviewed: number };
  daily: { date: string; turns: number; minutes: number }[];
  errorCategories: { category: string; count: number; example?: Correction }[];
  lessons: { lessonId: string; sessions: number; completed: number; lastPracticedAt: string }[];
  recentSessions: SessionDTO[];
};
