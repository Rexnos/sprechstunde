"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useHealth } from "@/components/layout/useHealth";
import { useSpeaker } from "@/components/audio/useSpeaker";
import { ErrorBanner, Loading, Notice } from "@/components/ui/Feedback";
import { api, errorMessage } from "@/lib/client";
import { CEFR_LEVELS, type Settings } from "@/lib/schemas";

type SettingsResponse = { settings: Settings; defaultModel: string };

export function SettingsForm() {
  const [form, setForm] = useState<Settings | null>(null);
  const [defaultModel, setDefaultModel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const { health } = useHealth(0);
  const speaker = useSpeaker(form?.ttsEngine ?? "off", form?.speechRate ?? 1);

  useEffect(() => {
    api<SettingsResponse>("/api/settings")
      .then((r) => {
        setForm(r.settings);
        setDefaultModel(r.defaultModel);
      })
      .catch((err) => setError(errorMessage(err)));
  }, []);

  if (error && !form) return <ErrorBanner message={error} />;
  if (!form) return <Loading />;

  const set = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setForm({ ...form, [key]: value });
    setSaved(false);
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const r = await api<SettingsResponse>("/api/settings", { method: "PATCH", json: form });
      setForm(r.settings);
      setSaved(true);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  const models = health?.llm.models ?? [];
  const voices = health?.tts.voices ?? [];

  return (
    <form onSubmit={submit} className="space-y-6">
      <fieldset className="card grid gap-4 sm:grid-cols-2">
        <legend className="px-1 font-semibold">About you</legend>
        <Field id="displayName" label="Name">
          <input id="displayName" className="input" value={form.displayName} maxLength={40} onChange={(e) => set("displayName", e.target.value)} />
        </Field>
        <Field id="nativeLanguage" label="Your native language">
          <input id="nativeLanguage" className="input" value={form.nativeLanguage} maxLength={40} onChange={(e) => set("nativeLanguage", e.target.value)} />
        </Field>
        <Field id="targetLanguage" label="Language you're learning" hint="German only for now.">
          <select id="targetLanguage" className="input" value={form.targetLanguage} disabled>
            <option value="German">German</option>
          </select>
        </Field>
        <Field id="level" label="Your level (CEFR)" hint="Applies to new sessions.">
          <select id="level" className="input" value={form.level} onChange={(e) => set("level", e.target.value as Settings["level"])}>
            {CEFR_LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>
        <Field id="goal" label="Learning goal" className="sm:col-span-2">
          <input id="goal" className="input" value={form.goal} maxLength={120} onChange={(e) => set("goal", e.target.value)} placeholder="e.g. small talk with colleagues" />
        </Field>
        <Field id="dailyGoal" label="Daily goal (minutes)">
          <input
            id="dailyGoal"
            type="number"
            min={5}
            max={180}
            className="input"
            value={form.dailyGoalMinutes}
            onChange={(e) => set("dailyGoalMinutes", Number(e.target.value))}
          />
        </Field>
      </fieldset>

      <fieldset className="card grid gap-4 sm:grid-cols-2">
        <legend className="px-1 font-semibold">Tutor</legend>
        <Field id="corrections" label="Corrections">
          <select id="corrections" className="input" value={form.correctionFrequency} onChange={(e) => set("correctionFrequency", e.target.value as Settings["correctionFrequency"])}>
            <option value="every">Correct every mistake</option>
            <option value="important">Only important mistakes</option>
            <option value="off">Don&apos;t correct me</option>
          </select>
        </Field>
        <Field id="explanations" label="Explanations in">
          <select id="explanations" className="input" value={form.explanationLanguage} onChange={(e) => set("explanationLanguage", e.target.value as Settings["explanationLanguage"])}>
            <option value="native">{form.nativeLanguage || "My language"}</option>
            <option value="simple-target">Simple German</option>
          </select>
        </Field>
        <Field id="model" label="AI model (Ollama)" hint={`Leave empty to use the default from .env.local (${defaultModel}).`} className="sm:col-span-2">
          <input id="model" className="input" list="model-options" value={form.model} placeholder={defaultModel} onChange={(e) => set("model", e.target.value)} />
          <datalist id="model-options">
            {models.map((m) => (
              <option key={m} value={m} />
            ))}
          </datalist>
          {models.length > 0 && <p className="mt-1 text-xs text-muted">Installed: {models.join(", ")}</p>}
        </Field>
      </fieldset>

      <fieldset className="card grid gap-4 sm:grid-cols-2">
        <legend className="px-1 font-semibold">Voice</legend>
        <Field id="ttsEngine" label="Speech output">
          <select id="ttsEngine" className="input" value={form.ttsEngine} onChange={(e) => set("ttsEngine", e.target.value as Settings["ttsEngine"])}>
            <option value="piper">Local voice (Piper)</option>
            <option value="browser">Browser / Windows voice</option>
            <option value="off">Off (text only)</option>
          </select>
        </Field>
        <Field id="voice" label="Piper voice">
          <select id="voice" className="input" value={form.ttsVoice} disabled={form.ttsEngine !== "piper"} onChange={(e) => set("ttsVoice", e.target.value)}>
            {[...new Set([form.ttsVoice, ...voices])].map((v) => (
              <option key={v} value={v}>
                {v}
                {voices.length && !voices.includes(v) ? " (not installed)" : ""}
              </option>
            ))}
          </select>
        </Field>
        <Field id="rate" label={`Speech speed: ${form.speechRate.toFixed(2)}×`}>
          <input id="rate" type="range" min={0.5} max={1.5} step={0.05} value={form.speechRate} onChange={(e) => set("speechRate", Number(e.target.value))} className="w-full accent-[var(--accent)]" />
        </Field>
        <div className="flex flex-col justify-end gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.autoPlayReplies} onChange={(e) => set("autoPlayReplies", e.target.checked)} className="size-4 accent-[var(--accent)]" />
            Read tutor replies aloud automatically
          </label>
          <button type="button" className="btn-secondary self-start" disabled={form.ttsEngine === "off"} onClick={() => speaker.speak("test", "Hallo! So klinge ich. Viel Spaß beim Üben!")}>
            Test voice
          </button>
        </div>
        {speaker.notice && (
          <div className="sm:col-span-2">
            <Notice>{speaker.notice}</Notice>
          </div>
        )}
        <p className="text-xs text-muted sm:col-span-2">
          Recordings are sent to the local speech service for transcription and are never saved. Transcripts are saved as part of your conversation history.
        </p>
      </fieldset>

      <div className="sticky bottom-0 flex items-center gap-3 border-t border-border bg-bg py-3">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Saving…" : "Save settings"}
        </button>
        {saved && (
          <span role="status" className="text-sm text-ok">
            Saved.
          </span>
        )}
        {error && <span className="text-sm text-danger">{error}</span>}
      </div>
    </form>
  );
}

function Field({ id, label, hint, className, children }: { id: string; label: string; hint?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
