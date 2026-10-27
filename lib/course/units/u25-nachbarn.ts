import { defineUnit, p, tutor, you } from "../define";

export const unit25 = defineUnit(25, "B1", "Nachbarn und Wohnen", "Describe people and things with relative clauses, understand house rules and sort out problems with neighbours.", [
  {
    title: "Relative clauses: der, die, das",
    intro:
      "A relative clause describes a noun: 'der Mann, der nebenan wohnt' (the man who lives next door). The relative pronoun looks like the article, the clause is set off by commas, and its verb goes to the end. In the nominative, the pronoun is the subject of the clause.",
    grammar: {
      title: "Relative pronouns in the nominative",
      text: "The gender and number come from the noun being described: der Mann → der, die Frau → die, das Kind → das, die Leute → die.",
      table: [
        ["", "masculine", "feminine", "neuter", "plural"],
        ["Nominativ", "der", "die", "das", "die"],
        ["Example", "der Mann, der …", "die Frau, die …", "das Kind, das …", "die Leute, die …"],
      ],
    },
    phrases: [
      p("Der Mann, der nebenan wohnt, ist sehr freundlich.", "The man who lives next door is very friendly.", { words: [["nebenan", "next door"]] }),
      p("Die Frau, die über uns wohnt, hat drei Katzen.", "The woman who lives above us has three cats.", { words: [["über uns", "above us"]] }),
      p("Das Kind, das unten spielt, ist mein Sohn.", "The child playing downstairs is my son.", { words: [["unten", "downstairs"]] }),
      p("Wir suchen eine Wohnung, die einen Balkon hat.", "We're looking for a flat that has a balcony."),
      p("Ich habe Nachbarn, die immer helfen.", "I have neighbours who always help."),
      p("Kennst du die Leute, die im Erdgeschoss wohnen?", "Do you know the people who live on the ground floor?", { words: [["Erdgeschoss", "ground floor"]] }),
      p("Das ist ein Viertel, das sehr ruhig ist.", "It's a neighbourhood that's very quiet.", { words: [["Viertel", "neighbourhood, quarter"], ["ruhig", "quiet"]] }),
    ],
    dialogue: [
      tutor("Wer ist denn der Mann da?", "Who's that man there?"),
      you("Das ist der Mann, der nebenan wohnt.", "Say it's the man who lives next door.", ["Der Mann, der nebenan wohnt.", "Das ist mein Nachbar."]),
      tutor("Und die Frau mit den Katzen?", "And the woman with the cats?"),
      you("Das ist die Frau, die über uns wohnt.", "Say that's the woman who lives above you.", ["Die Frau, die über uns wohnt."]),
      tutor("Wie gefällt dir das Viertel?", "How do you like the neighbourhood?"),
      you("Das ist ein Viertel, das sehr ruhig ist.", "Say it's a neighbourhood that's very quiet.", ["Es ist sehr ruhig.", "Das Viertel ist sehr ruhig."]),
    ],
  },
  {
    title: "Accusative and dative relative pronouns",
    intro:
      "The relative pronoun takes the case it has inside its own clause. If it's the object, use the accusative ('den' for masculine): 'der Schlüssel, den ich verloren habe'. After a dative verb like helfen or gehören, use the dative: 'dem', 'der', 'dem', and 'denen' in the plural.",
    grammar: {
      title: "Relative pronouns: all cases",
      text: "Only masculine accusative and the dative look different from the nominative. Note the plural dative: denen.",
      table: [
        ["", "masculine", "feminine", "neuter", "plural"],
        ["Nominativ", "der", "die", "das", "die"],
        ["Akkusativ", "den", "die", "das", "die"],
        ["Dativ", "dem", "der", "dem", "denen"],
      ],
    },
    phrases: [
      p("Der Schlüssel, den ich verloren habe, war im Briefkasten.", "The key I lost was in the letterbox.", { words: [["verloren", "lost"], ["Briefkasten", "letterbox"]] }),
      p("Die Wohnung, die wir gestern gesehen haben, war zu teuer.", "The flat we saw yesterday was too expensive."),
      p("Das ist der Nachbar, dem ich beim Umzug geholfen habe.", "That's the neighbour I helped with the move.", { words: [["Umzug", "move (house)"]], note: "helfen takes the dative, so the pronoun is 'dem'." }),
      p("Die Leute, denen das Haus gehört, wohnen in Spanien.", "The people who own the house live in Spain.", { words: [["gehören", "belong to"]] }),
      p("Die Frau, der ich das Paket gegeben habe, war sehr dankbar.", "The woman I gave the parcel to was very grateful.", { words: [["Paket", "parcel"], ["dankbar", "grateful"]] }),
      p("Das Sofa, das ich gekauft habe, passt nicht durch die Tür.", "The sofa I bought doesn't fit through the door.", { words: [["passen", "fit"]] }),
      p("Wie heißt der Vermieter, den du angerufen hast?", "What's the name of the landlord you called?", { words: [["Vermieter", "landlord"]] }),
    ],
    dialogue: [
      tutor("Hast du deinen Schlüssel gefunden?", "Did you find your key?"),
      you("Ja, der Schlüssel, den ich verloren habe, war im Briefkasten.", "Say yes, the key you lost was in the letterbox.", ["Ja, er war im Briefkasten.", "Der Schlüssel war im Briefkasten."]),
      tutor("Und wie war die Wohnung gestern?", "And how was the flat yesterday?"),
      you("Die Wohnung, die wir gesehen haben, war zu teuer.", "Say the flat you saw was too expensive.", ["Die Wohnung war zu teuer.", "Sie war zu teuer."]),
      tutor("Wer ist der Mann, der dich gerade gegrüßt hat?", "Who's the man who just said hello to you?"),
      you("Das ist der Nachbar, dem ich beim Umzug geholfen habe.", "Say it's the neighbour you helped with the move.", ["Das ist mein Nachbar.", "Das ist der Nachbar, dem ich geholfen habe."]),
    ],
  },
  {
    title: "Prepositions in relative clauses and house rules",
    intro:
      "When a preposition belongs to the relative clause, it comes first, followed by the pronoun in the case the preposition needs: 'die Freundin, mit der ich wohne', 'das Zimmer, in dem ich schlafe'. In a German block of flats, the 'Hausordnung' (house rules) sets things like the 'Ruhezeit' (quiet hours).",
    grammar: {
      title: "Preposition + relative pronoun",
      text: "The preposition decides the case: mit + dative, von + dative, in + dative (for location), für + accusative.",
      table: [
        ["Noun", "Preposition + pronoun", "Rest of the clause"],
        ["der Hausmeister,", "mit dem", "ich gesprochen habe"],
        ["die Freundin,", "mit der", "ich zusammenwohne"],
        ["das Zimmer,", "in dem", "ich schlafe"],
        ["die Nachbarn,", "von denen", "ich erzählt habe"],
      ],
    },
    phrases: [
      p("Das ist die Freundin, mit der ich zusammenwohne.", "That's the friend I share a flat with.", { words: [["zusammenwohnen", "live together, share a flat"]] }),
      p("Das Zimmer, in dem ich schlafe, ist sehr klein.", "The room I sleep in is very small."),
      p("Der Hausmeister, mit dem ich gesprochen habe, kommt morgen.", "The caretaker I spoke to is coming tomorrow.", { words: [["Hausmeister", "caretaker"]] }),
      p("Das ist der Keller, in dem wir die Fahrräder abstellen.", "That's the cellar where we keep the bikes.", { words: [["Keller", "cellar, basement"], ["abstellen", "put away, park"]] }),
      p("Die Nachbarn, von denen ich dir erzählt habe, sind ausgezogen.", "The neighbours I told you about have moved out.", { words: [["erzählen von", "tell about"], ["ausziehen", "move out"]] }),
      p("Laut Hausordnung ist von 22 bis 6 Uhr Ruhezeit.", "According to the house rules, quiet hours are from 10 pm to 6 am.", { accept: ["Laut Hausordnung ist von zweiundzwanzig bis sechs Uhr Ruhezeit."], words: [["laut", "according to"], ["Hausordnung", "house rules"], ["Ruhezeit", "quiet hours"]] }),
      p("Im Treppenhaus darf man keine Schuhe abstellen.", "You're not allowed to leave shoes in the stairwell.", { words: [["Treppenhaus", "stairwell"]] }),
    ],
    dialogue: [
      tutor("Wohnst du allein?", "Do you live alone?"),
      you("Nein, das ist die Freundin, mit der ich zusammenwohne.", "Say no, and that this is the friend you share a flat with.", ["Nein, ich wohne mit einer Freundin zusammen.", "Ja, ich wohne allein."]),
      tutor("Wo kann ich mein Fahrrad lassen?", "Where can I leave my bike?"),
      you("Das ist der Keller, in dem wir die Fahrräder abstellen.", "Say that's the cellar where you keep the bikes.", ["Im Keller.", "Im Keller, bitte."]),
      tutor("Darf ich hier abends noch Musik machen?", "Am I allowed to play music here in the evening?"),
      you("Laut Hausordnung ist ab 22 Uhr Ruhezeit.", "Say that according to the house rules, quiet hours start at 10 pm.", ["Ab 22 Uhr ist Ruhezeit.", "Laut Hausordnung ist ab zweiundzwanzig Uhr Ruhezeit."]),
    ],
  },
  {
    title: "Problems with the neighbours",
    intro:
      "Problems with neighbours are best solved politely. Start with a friendly opener, describe the problem and suggest a solution. Konjunktiv II from A2 helps you sound polite: 'Könnten Sie bitte …?' 'Würden Sie bitte …?'",
    phrases: [
      p("Entschuldigen Sie, ich wohne direkt unter Ihnen.", "Excuse me, I live directly below you.", { words: [["direkt", "directly"], ["unter Ihnen", "below you"]] }),
      p("Die Musik war gestern Abend sehr laut.", "The music was very loud last night.", { words: [["laut", "loud"]] }),
      p("Könnten Sie bitte nach 22 Uhr leiser sein?", "Could you please be quieter after 10 pm?", { accept: ["Könnten Sie bitte nach zweiundzwanzig Uhr leiser sein?"], words: [["leiser", "quieter"]] }),
      p("Ihr Hund bellt den ganzen Tag.", "Your dog barks all day.", { words: [["bellen", "bark"]] }),
      p("Jemand stellt immer seinen Müll vor meine Tür.", "Someone always puts their rubbish in front of my door.", { words: [["jemand", "someone"], ["Müll", "rubbish"]] }),
      p("Das tut mir leid, das wusste ich nicht.", "I'm sorry, I didn't know that.", { words: [["wusste", "knew (wissen)"]] }),
      p("Kein Problem, das kann passieren.", "No problem, that can happen.", { words: [["passieren", "happen"]] }),
    ],
    dialogue: [
      tutor("Ja, bitte? Kann ich Ihnen helfen?", "Yes? Can I help you?"),
      you("Entschuldigen Sie, ich wohne direkt unter Ihnen.", "Say excuse me, you live directly below them.", ["Guten Abend, ich wohne unter Ihnen."]),
      tutor("Ah, hallo! Gibt es ein Problem?", "Ah, hello! Is there a problem?"),
      you("Die Musik war gestern Abend sehr laut.", "Say the music was very loud last night.", ["Die Musik ist sehr laut.", "Ihr Hund bellt den ganzen Tag."]),
      tutor("Oh, das tut mir leid, das wusste ich nicht.", "Oh, I'm sorry, I didn't know that."),
      you("Könnten Sie bitte nach 22 Uhr leiser sein?", "Ask politely if they could be quieter after 10 pm.", ["Könnten Sie bitte leiser sein?", "Kein Problem, das kann passieren."]),
    ],
  },
]);
