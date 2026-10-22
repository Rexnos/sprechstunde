import { defineUnit, p, tutor, you } from "../define";

export const unit6 = defineUnit(6, "Familie und Freunde", "Talk about your family and friends and describe people.", [
  {
    title: "My family",
    intro:
      "'Mein' (my) and 'dein' (your) follow the same pattern as 'ein': mein Vater, meine Mutter, mein Kind. Plural is always 'meine': meine Eltern.",
    grammar: {
      title: "mein / meine",
      text: "Use 'meine' for feminine nouns and all plurals.",
      table: [
        ["der Bruder", "mein Bruder"],
        ["die Schwester", "meine Schwester"],
        ["das Kind", "mein Kind"],
        ["die Eltern (plural)", "meine Eltern"],
      ],
    },
    phrases: [
      p("Das ist meine Familie.", "This is my family."),
      p("Das ist mein Vater.", "This is my father.", { words: [["Vater", "father"]] }),
      p("Das ist meine Mutter.", "This is my mother.", { words: [["Mutter", "mother"]] }),
      p("Meine Eltern wohnen in Kochi.", "My parents live in Kochi.", { words: [["Eltern", "parents"]] }),
      p("Ich habe einen Bruder.", "I have a brother.", { words: [["habe", "have"], ["Bruder", "brother"]] }),
      p("Ich habe eine Schwester.", "I have a sister.", { words: [["Schwester", "sister"]] }),
      p("Ich habe keine Geschwister.", "I don't have any brothers or sisters.", { words: [["keine", "no"], ["Geschwister", "siblings"]] }),
    ],
    dialogue: [
      tutor("Hast du Geschwister?", "Do you have brothers or sisters?"),
      you("Ja, ich habe einen Bruder.", "Say yes, you have a brother.", ["Ich habe eine Schwester.", "Nein, ich habe keine Geschwister."]),
      tutor("Und wo wohnen deine Eltern?", "And where do your parents live?"),
      you("Meine Eltern wohnen in {city}.", "Say where your parents live."),
      tutor("Schön!", "Nice!"),
    ],
  },
  {
    title: "haben: to have",
    intro:
      "'Haben' is the second most important verb after 'sein'. It's used for owning things, for family, and later to build the past tense.",
    grammar: {
      title: "haben (to have)",
      text: "Slightly irregular in the du form.",
      table: [
        ["ich habe", "I have"],
        ["du hast", "you have (casual)"],
        ["er / sie hat", "he / she has"],
        ["Sie haben", "you have (polite)"],
      ],
    },
    phrases: [
      p("Hast du Kinder?", "Do you have children?", { words: [["hast", "have"], ["Kinder", "children"]] }),
      p("Ich habe zwei Kinder.", "I have two children.", { accept: ["Ich habe 2 Kinder."] }),
      p("Er hat einen Hund.", "He has a dog.", { words: [["er", "he"], ["hat", "has"], ["Hund", "dog"]] }),
      p("Sie hat eine Katze.", "She has a cat.", { words: [["sie", "she"], ["Katze", "cat"]] }),
      p("Wir haben Zeit.", "We have time.", { words: [["wir", "we"], ["Zeit", "time"]] }),
      p("Ich habe keine Zeit.", "I don't have time."),
    ],
    dialogue: [
      tutor("Hast du Kinder?", "Do you have children?"),
      you("Nein, ich habe keine Kinder.", "Say no, you don't have children.", ["Ja, ich habe {number} Kinder.", "Ja, ich habe ein Kind."]),
      tutor("Ich habe einen Hund. Hast du ein Haustier?", "I have a dog. Do you have a pet?"),
      you("Nein. Aber meine Schwester hat eine Katze.", "Say no, but your sister has a cat.", ["Nein.", "Ja, ich habe eine Katze."]),
    ],
  },
  {
    title: "Describing people",
    intro:
      "Use 'sein' + an adjective to describe someone: 'Er ist nett.' Adjectives after 'ist' never change their ending, which makes this easy.",
    phrases: [
      p("Mein Bruder ist groß.", "My brother is tall.", { words: [["groß", "tall, big"]] }),
      p("Meine Mutter ist sehr nett.", "My mother is very nice.", { words: [["sehr", "very"], ["nett", "nice"]] }),
      p("Er ist lustig.", "He is funny.", { words: [["lustig", "funny"]] }),
      p("Sie ist jung.", "She is young.", { words: [["jung", "young"]] }),
      p("Mein Opa ist alt, aber fit.", "My grandpa is old but fit.", { words: [["Opa", "grandpa"], ["alt", "old"], ["aber", "but"]] }),
      p("Wie ist deine Schwester?", "What's your sister like?"),
    ],
    dialogue: [
      tutor("Wie ist dein Bruder?", "What is your brother like?"),
      you("Mein Bruder ist nett.", "Say your brother is nice.", ["Er ist nett.", "Er ist lustig.", "Mein Bruder ist groß."]),
      tutor("Und wie alt ist er?", "And how old is he?"),
      you("Er ist {age} Jahre alt.", "Say how old he is.", ["Er ist {age}."]),
    ],
  },
  {
    title: "Friends and free time",
    intro:
      "'Gern' after a verb means you like doing it: 'Ich spiele gern Fußball' (I like playing football). 'Nicht gern' means you don't like it.",
    phrases: [
      p("Das ist mein Freund Max.", "This is my friend Max.", { note: "'Freund' can also mean boyfriend, depending on context." }),
      p("Was machst du gern?", "What do you like doing?", { words: [["gern", "gladly, like to"]] }),
      p("Ich lese gern.", "I like reading.", { words: [["lese", "read"]] }),
      p("Ich koche gern.", "I like cooking.", { words: [["koche", "cook"]] }),
      p("Ich spiele gern Fußball.", "I like playing football."),
      p("Ich tanze nicht gern.", "I don't like dancing."),
      p("Wir gehen ins Kino.", "We're going to the cinema.", { words: [["gehen", "go"], ["ins Kino", "to the cinema"]] }),
    ],
    dialogue: [
      tutor("Was machst du gern in deiner Freizeit?", "What do you like doing in your free time?"),
      you("Ich koche gern.", "Say something you like doing.", ["Ich lese gern.", "Ich spiele gern Fußball.", "Ich {verb} gern."]),
      tutor("Toll! Ich gehe gern ins Kino.", "Great! I like going to the cinema."),
      you("Ich auch!", "Say: me too!", ["Ich nicht.", "Ich gehe auch gern ins Kino."]),
    ],
  },
]);
