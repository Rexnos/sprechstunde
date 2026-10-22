import type { Level, Mode } from "./schemas";

export type Lesson = {
  id: string;
  title: string;
  scenario: string;
  objective: string;
  /** Role the tutor plays in role-play mode. */
  tutorRole: string;
  starter: string;
  starterTranslation: string;
  vocabulary: { term: string; meaning: string }[];
  recommendedLevel: Level;
};

// Original scenario content written for this project.
export const LESSONS: Lesson[] = [
  {
    id: "cafe",
    title: "At the café",
    scenario: "You are ordering a drink and a snack at a small café in Berlin.",
    objective: "Order food and drinks politely, ask about prices, and pay.",
    tutorRole: "a friendly waiter at a café in Berlin",
    starter: "Guten Tag! Was darf es sein?",
    starterTranslation: "Hello! What can I get you?",
    vocabulary: [
      { term: "die Speisekarte", meaning: "the menu" },
      { term: "Ich hätte gern …", meaning: "I would like …" },
      { term: "die Rechnung", meaning: "the bill" },
      { term: "zum Mitnehmen", meaning: "to take away" },
      { term: "Was kostet …?", meaning: "How much is …?" },
    ],
    recommendedLevel: "A1",
  },
  {
    id: "introductions",
    title: "Introducing yourself",
    scenario: "You meet a new neighbour in the stairwell of your apartment building.",
    objective: "Say your name, where you are from, what you do, and ask the same questions back.",
    tutorRole: "a curious new neighbour",
    starter: "Hallo! Ich glaube, wir kennen uns noch nicht. Ich bin Jana.",
    starterTranslation: "Hi! I don't think we've met yet. I'm Jana.",
    vocabulary: [
      { term: "Ich komme aus …", meaning: "I come from …" },
      { term: "Ich wohne in …", meaning: "I live in …" },
      { term: "Ich arbeite als …", meaning: "I work as …" },
      { term: "Freut mich!", meaning: "Nice to meet you!" },
      { term: "der Nachbar / die Nachbarin", meaning: "the neighbour" },
    ],
    recommendedLevel: "A1",
  },
  {
    id: "travel",
    title: "At the train station",
    scenario: "You need a ticket and directions to the right platform.",
    objective: "Buy a ticket, ask about departure times, and find your platform.",
    tutorRole: "a helpful ticket-office employee at a German train station",
    starter: "Guten Morgen! Wohin möchten Sie fahren?",
    starterTranslation: "Good morning! Where would you like to travel to?",
    vocabulary: [
      { term: "die Fahrkarte", meaning: "the ticket" },
      { term: "das Gleis", meaning: "the platform/track" },
      { term: "einfach / hin und zurück", meaning: "one-way / return" },
      { term: "umsteigen", meaning: "to change trains" },
      { term: "die Verspätung", meaning: "the delay" },
    ],
    recommendedLevel: "A2",
  },
  {
    id: "shopping",
    title: "Shopping for clothes",
    scenario: "You are looking for a jacket in a clothing store.",
    objective: "Describe what you want, ask for sizes and colours, and decide to buy or not.",
    tutorRole: "a shop assistant in a clothing store",
    starter: "Hallo! Kann ich Ihnen helfen?",
    starterTranslation: "Hello! Can I help you?",
    vocabulary: [
      { term: "die Größe", meaning: "the size" },
      { term: "anprobieren", meaning: "to try on" },
      { term: "die Umkleidekabine", meaning: "the fitting room" },
      { term: "zu groß / zu klein", meaning: "too big / too small" },
      { term: "Ich nehme es.", meaning: "I'll take it." },
    ],
    recommendedLevel: "A2",
  },
  {
    id: "work",
    title: "First day at work",
    scenario: "It is your first day at a new job and a colleague shows you around.",
    objective: "Talk about your role, ask questions about the team, and make small talk.",
    tutorRole: "a friendly colleague on your first day",
    starter: "Herzlich willkommen im Team! Wie war die Anreise?",
    starterTranslation: "Welcome to the team! How was your journey here?",
    vocabulary: [
      { term: "der Kollege / die Kollegin", meaning: "the colleague" },
      { term: "die Besprechung", meaning: "the meeting" },
      { term: "zuständig für", meaning: "responsible for" },
      { term: "die Mittagspause", meaning: "the lunch break" },
      { term: "Ich bin neu hier.", meaning: "I'm new here." },
    ],
    recommendedLevel: "B1",
  },
  {
    id: "appointments",
    title: "Making a doctor's appointment",
    scenario: "You call a doctor's office to make an appointment.",
    objective: "Describe a simple problem, agree on a date and time, and confirm details.",
    tutorRole: "a receptionist at a doctor's office",
    starter: "Praxis Dr. Weber, guten Tag. Was kann ich für Sie tun?",
    starterTranslation: "Dr. Weber's practice, hello. What can I do for you?",
    vocabulary: [
      { term: "der Termin", meaning: "the appointment" },
      { term: "Ich habe Kopfschmerzen.", meaning: "I have a headache." },
      { term: "die Versichertenkarte", meaning: "the health insurance card" },
      { term: "Passt Ihnen …?", meaning: "Does … suit you?" },
      { term: "absagen / verschieben", meaning: "to cancel / to postpone" },
    ],
    recommendedLevel: "B1",
  },
];

export function getLesson(id: string | undefined): Lesson | undefined {
  return id ? LESSONS.find((l) => l.id === id) : undefined;
}

export const MODE_LABELS: Record<Mode, string> = {
  conversation: "Free conversation",
  roleplay: "Role-play",
  vocabulary: "Vocabulary practice",
};
