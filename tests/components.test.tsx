import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
    expect(screen.getByText("<img src=x onerror=alert(1)>Hallo")).toBeInTheDocument();
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
