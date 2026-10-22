"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ErrorBanner, Loading, Notice } from "@/components/ui/Feedback";
import { api, errorMessage } from "@/lib/client";
import type { GeneratedDTO } from "@/lib/schemas";
import type { Story } from "@/lib/stories";
import { StoryReader } from "./StoryReader";

export function AiStory({ id }: { id: string }) {
  const router = useRouter();
  const [story, setStory] = useState<Story | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<{ item: GeneratedDTO }>(`/api/practice/generated/${id}`)
      .then(({ item }) => setStory({ ...(item.payload as Omit<Story, "id" | "unitId">), id: `ai-${item.id}`, unitId: item.key }))
      .catch((err) => setError(errorMessage(err)));
  }, [id]);

  async function remove() {
    if (!window.confirm("Delete this AI story?")) return;
    try {
      await api(`/api/practice/generated/${id}`, { method: "DELETE" });
      router.push("/practice/stories");
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  if (error) return <ErrorBanner message={error} />;
  if (!story) return <Loading />;
  return (
    <div className="space-y-6">
      <header>
        <p className="mb-1 text-xs text-muted">
          <Link href="/practice/stories" className="hover:text-ink">
            Stories
          </Link>{" "}
          / AI story
        </p>
        <h1 className="text-3xl font-semibold tracking-tight" lang="de">
          {story.title}
        </h1>
        <p className="mt-1.5 text-muted">{story.blurb}</p>
      </header>
      <Notice tone="info">
        Written by the local AI and checked automatically. If something looks wrong,{" "}
        <button type="button" onClick={remove} className="font-medium text-danger underline underline-offset-2">
          delete this story
        </button>
        .
      </Notice>
      <StoryReader story={story} />
    </div>
  );
}
