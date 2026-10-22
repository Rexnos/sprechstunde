/**
 * Runs a fixed suite of German learner sentences through the local model and
 * reports latency, schema validity and whether corrections were given where
 * expected. Use it to compare models on your own hardware:
 *
 *   npm run eval:tutor                 # uses OLLAMA_MODEL from .env.local
 *   npm run eval:tutor -- qwen2.5:3b   # try another model
 *
 * Results are a starting point for manual review — read the corrections yourself.
 */
import { readFileSync } from "node:fs";
import { z } from "zod";
import { buildTutorSystemPrompt } from "../lib/prompts";
import { DEFAULT_SETTINGS, TutorResponseSchema, type Level } from "../lib/schemas";
import { parseTutorOutput } from "../lib/services/tutor-output";

type Case = { level: Level; text: string; expectCorrection: boolean; note: string };

const CASES: Case[] = [
  // correct sentences — should NOT be corrected
  { level: "A1", text: "Ich heiße Anna und ich komme aus Kanada.", expectCorrection: false, note: "correct" },
  { level: "A1", text: "Ich möchte einen Kaffee, bitte.", expectCorrection: false, note: "correct" },
  { level: "A2", text: "Am Wochenende habe ich meine Eltern besucht.", expectCorrection: false, note: "correct Perfekt" },
  { level: "B1", text: "Ich bin mir nicht sicher, ob ich morgen Zeit habe.", expectCorrection: false, note: "correct subordinate clause" },
  // valid alternatives — should NOT be corrected
  { level: "A1", text: "Ich möchte bitte einen Kaffee.", expectCorrection: false, note: "valid word order alternative" },
  { level: "A2", text: "Gestern war ich im Kino.", expectCorrection: false, note: "Präteritum of sein is fine" },
  // common mistakes — SHOULD be corrected
  { level: "A1", text: "Ich habe 25 Jahre alt.", expectCorrection: true, note: "haben vs. sein" },
  { level: "A1", text: "Ich gehe gestern ins Kino.", expectCorrection: true, note: "tense" },
  { level: "A2", text: "Gestern ich habe Fußball gespielt.", expectCorrection: true, note: "V2 word order" },
  { level: "A2", text: "Ich habe nach Berlin gefahren.", expectCorrection: true, note: "sein-Perfekt" },
  { level: "A2", text: "Ich sehe der Mann.", expectCorrection: true, note: "accusative" },
  { level: "B1", text: "Ich weiß nicht, wann kommt der Zug.", expectCorrection: true, note: "verb-final in subordinate clause" },
  { level: "B1", text: "Ich freue mich auf dem Urlaub.", expectCorrection: true, note: "preposition case" },
  // ambiguous / speech-recognition style input
  { level: "A1", text: "ja gut danke und dir", expectCorrection: false, note: "lowercase, no punctuation (STT style)" },
];

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

async function main() {
  loadEnv();
  const base = process.env.OLLAMA_BASE_URL ?? "http://127.0.0.1:11434";
  const model = process.argv[2] ?? process.env.OLLAMA_MODEL ?? "gemma3:4b";
  const schema = z.toJSONSchema(TutorResponseSchema);
  console.log(`Model: ${model}  (${CASES.length} cases)\n`);

  let valid = 0;
  let agree = 0;
  const latencies: number[] = [];

  for (const c of CASES) {
    const system = buildTutorSystemPrompt({ settings: { ...DEFAULT_SETTINGS, level: c.level, correctionFrequency: "important" }, mode: "conversation" });
    const started = Date.now();
    const res = await fetch(`${base}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        stream: false,
        think: false,
        format: schema,
        options: { temperature: 0.4, num_predict: 500, num_ctx: 4096 },
        messages: [
          { role: "system", content: system },
          { role: "user", content: c.text },
        ],
      }),
    });
    if (!res.ok) throw new Error(`Ollama error ${res.status}: ${await res.text()}`);
    const data = (await res.json()) as { message: { content: string }; eval_count?: number; eval_duration?: number };
    const ms = Date.now() - started;
    latencies.push(ms);

    const { response, fallback } = parseTutorOutput(data.message.content, c.text);
    if (!fallback) valid++;
    const corrected = !!response.correction;
    if (corrected === c.expectCorrection) agree++;
    const tps = data.eval_count && data.eval_duration ? (data.eval_count / (data.eval_duration / 1e9)).toFixed(1) : "?";

    console.log(`${corrected === c.expectCorrection ? "✓" : "✗"} [${c.level}] ${c.text}   (${c.note})`);
    console.log(`    reply: ${response.reply}`);
    if (response.correction) console.log(`    fix:   ${response.correction.suggested}  — ${response.correction.explanation} [${response.correction.category}]`);
    console.log(`    ${(ms / 1000).toFixed(1)}s, ${tps} tok/s${fallback ? ", INVALID JSON (fallback used)" : ""}\n`);
  }

  latencies.sort((a, b) => a - b);
  console.log("Summary");
  console.log(`  valid structured output: ${valid}/${CASES.length}`);
  console.log(`  correction decision matched expectation: ${agree}/${CASES.length}`);
  console.log(`  latency median ${(latencies[Math.floor(latencies.length / 2)] / 1000).toFixed(1)}s, max ${(latencies.at(-1)! / 1000).toFixed(1)}s`);
  console.log("  (first call includes model load time)");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
