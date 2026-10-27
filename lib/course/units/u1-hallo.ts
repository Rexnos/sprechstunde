import { defineUnit, p, tutor, you } from "../define";

export const unit1 = defineUnit(1, "A1", "Hallo!", "Say hello and goodbye, be polite, and ask how someone is.", [
  {
    title: "Hello and goodbye",
    intro:
      "Germans greet differently depending on the time of day. 'Hallo' works almost always. 'Tschüss' is the casual goodbye; 'Auf Wiedersehen' is the polite one.",
    phrases: [
      p("Guten Morgen!", "Good morning!", { words: [["Guten", "good"], ["Morgen", "morning"]] }),
      p("Guten Tag!", "Hello! (Good day)", { note: "Polite greeting, used from late morning to early evening." }),
      p("Guten Abend!", "Good evening!", { words: [["Guten", "good"], ["Abend", "evening"]] }),
      p("Gute Nacht!", "Good night!", { note: "Only when someone is going to bed, or as a goodbye late at night." }),
      p("Tschüss!", "Bye!", { note: "Casual. With friends, family, in shops." }),
      p("Auf Wiedersehen!", "Goodbye!", { words: [["auf", "on"], ["Wiedersehen", "seeing again"]], note: "Polite and a little formal." }),
      p("Bis morgen!", "See you tomorrow!", { words: [["bis", "until"], ["morgen", "tomorrow"]] }),
    ],
    dialogue: [
      tutor("Guten Morgen!", "Good morning!"),
      you("Guten Morgen!", "Say good morning back."),
      tutor("Bis morgen!", "See you tomorrow!"),
      you("Tschüss! Bis morgen!", "Say bye, see you tomorrow.", ["Tschüss!", "Bis morgen!"]),
    ],
  },
  {
    title: "Please, thank you, sorry",
    intro:
      "These few words make you sound polite in any situation. 'Bitte' is very flexible: it means please, you're welcome, and 'here you go'.",
    phrases: [
      p("Bitte.", "Please. / You're welcome.", { note: "Also used when handing something to someone." }),
      p("Danke!", "Thanks!"),
      p("Danke schön!", "Thank you very much!", { words: [["Danke", "thanks"], ["schön", "nicely"]] }),
      p("Gern geschehen.", "You're welcome.", { words: [["gern", "gladly"], ["geschehen", "happened"]] }),
      p("Entschuldigung!", "Excuse me! / Sorry!", { note: "To get attention or to apologise." }),
      p("Kein Problem.", "No problem."),
      p("Ja, bitte.", "Yes, please."),
      p("Nein, danke.", "No, thank you."),
    ],
    dialogue: [
      tutor("Ein Wasser?", "A water?"),
      you("Ja, bitte.", "Say yes, please."),
      tutor("Bitte schön.", "Here you go."),
      you("Danke schön!", "Say thank you very much.", ["Danke!", "Vielen Dank!"]),
      tutor("Gern geschehen.", "You're welcome."),
      you("Entschuldigung!", "Get the waiter's attention: excuse me!"),
    ],
  },
  {
    title: "How are you? (du and Sie)",
    intro:
      "German has two words for 'you'. Use 'du' with friends, family, children and people your age in casual places. Use 'Sie' with strangers, older people and at work. When in doubt, use Sie.",
    grammar: {
      title: "du or Sie?",
      text: "The question 'How are you?' changes with the kind of 'you'.",
      table: [
        ["", "casual (du)", "polite (Sie)"],
        ["How are you?", "Wie geht es dir?", "Wie geht es Ihnen?"],
        ["And you?", "Und dir?", "Und Ihnen?"],
      ],
    },
    phrases: [
      p("Wie geht's?", "How's it going?", { note: "Short and casual." }),
      p("Wie geht es dir?", "How are you? (casual)", { words: [["wie", "how"], ["geht", "goes"], ["es", "it"], ["dir", "to you"]] }),
      p("Wie geht es Ihnen?", "How are you? (polite)", { words: [["wie", "how"], ["geht", "goes"], ["es", "it"], ["Ihnen", "to you, polite"]] }),
      p("Gut, danke.", "Good, thanks."),
      p("Sehr gut!", "Very good!"),
      p("Es geht.", "So-so.", { note: "Literally 'it goes'." }),
      p("Nicht so gut.", "Not so good."),
      p("Und dir?", "And you? (casual)"),
      p("Und Ihnen?", "And you? (polite)"),
    ],
    dialogue: [
      tutor("Hallo! Wie geht's?", "Hi! How's it going?"),
      you("Gut, danke. Und dir?", "Say good, thanks, and ask back (casual).", ["Sehr gut, danke. Und dir?", "Gut. Und dir?"]),
      tutor("Sehr gut, danke!", "Very good, thanks!"),
      tutor("Guten Tag! Wie geht es Ihnen?", "Good day! How are you? (polite)"),
      you("Gut, danke. Und Ihnen?", "Answer and ask back politely.", ["Sehr gut, danke. Und Ihnen?"]),
      tutor("Auch gut, danke.", "Good too, thanks."),
    ],
  },
]);
