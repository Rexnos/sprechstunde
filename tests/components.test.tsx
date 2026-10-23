import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TappableText } from "@/components/dictionary/WordLookup";
import { MessageBubble } from "@/components/tutor/MessageBubble";

describe("MessageBubble", () => {
  it("shows the correction card under a learner message", () => {
    render(
      <ol>
        <MessageBubble
          message={{
            id: "1",
            role: "user",
            text: "Ich gehe gestern ins Kino.",
            inputMethod: "voice",
            correction: {
              original: "Ich gehe gestern ins Kino.",
              suggested: "Ich bin gestern ins Kino gegangen.",
              explanation: "Past tense.",
              category: "verb tense",
            },
            createdAt: new Date().toISOString(),
          }}
        />
      </ol>,
    );
    const card = screen.getByRole("complementary", { name: "Correction" });
    expect(card).toHaveTextContent("Ich bin gestern ins Kino gegangen.");
    // Only the changed words are highlighted.
    expect([...card.querySelectorAll("mark")].map((m) => m.textContent)).toEqual(["bin", "gegangen."]);
    expect(screen.getByText("spoken")).toBeInTheDocument();
  });

  it("confirms correct sentences when corrections are on", () => {
    render(
      <ol>
        <MessageBubble message={{ id: "4", role: "user", text: "Ich heiße Anna.", correction: null, createdAt: "" }} showOk />
      </ol>,
    );
    expect(screen.getByText("Looks good")).toBeInTheDocument();
  });

  it("renders model output as text, never as HTML", () => {
    render(
      <ol>
        <MessageBubble message={{ id: "2", role: "assistant", text: "<img src=x onerror=alert(1)>Hallo", createdAt: new Date().toISOString() }} />
      </ol>,
    );
    // Words are tappable buttons now, so match the paragraph's whole text.
    expect(screen.getByText((_, el) => el?.tagName === "P" && el.textContent === "<img src=x onerror=alert(1)>Hallo")).toBeInTheDocument();
    expect(document.querySelector("img")).toBeNull();
  });

  it("lists new vocabulary on tutor messages", () => {
    render(
      <ol>
        <MessageBubble
          message={{
            id: "3",
            role: "assistant",
            text: "Toll!",
            vocabulary: [{ term: "das Kino", meaning: "the cinema", example: "" }],
            createdAt: new Date().toISOString(),
          }}
          onSpeak={() => {}}
        />
      </ol>,
    );
    expect(screen.getByText("das Kino")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Listen to this reply" })).toBeInTheDocument();
  });
});

describe("TappableText", () => {
  it("makes words tappable, shows the material's own meaning first, and offers to save it", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ items: [], available: false }), { status: 200, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);
    render(<TappableText text="Der Hund schläft." glossary={{ hund: "dog" }} />);
    fireEvent.click(screen.getByRole("button", { name: "Hund" }));
    expect(screen.getByText("dog")).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "Add Hund to Vocabulary" })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining("/api/dictionary?q=Hund"), expect.anything());
    vi.unstubAllGlobals();
  });
});
