import { LETTERS, SPECIAL_LETTERS } from "../alphabet";
import { defineUnit, p, tutor, you } from "../define";

export const unit0 = defineUnit(0, "A1", "Das Alphabet", "Learn the letters, how German sounds, and how to spell your name.", [
  {
    title: "The letters A to Z",
    intro:
      "German uses the same 26 letters as English, but most of them have different names: A is 'ah', E is 'eh', I is 'ee', J is 'yott', V is 'fow', W is 'veh'. Tap each letter to hear its name and an example word. Germans spell on the phone with words: 'A wie Apfel' (A as in Apfel).",
    letters: LETTERS,
    spellWords: ["Brot", "Haus", "Jahr", "Zug", "Obst", "Post", "Tee", "Uhr"],
    phrases: [
      p("Apfel", "apple"),
      p("Brot", "bread"),
      p("Haus", "house", { note: "au sounds like English 'ow' in 'house'." }),
      p("Jahr", "year", { note: "J sounds like Y. The h makes the a long." }),
      p("Vater", "father", { note: "V sounds like F; the final -er is a soft 'a'." }),
      p("Wasser", "water", { note: "W sounds like V." }),
      p("Zug", "train", { note: "Z = 'ts'. A g at the end of a word sounds like k." }),
      p("Sonne", "sun", { note: "S before a vowel buzzes like English z." }),
    ],
    dialogue: [
      tutor("A wie Apfel.", "A as in Apfel (apple)."),
      you("B wie Brot.", "Your turn: B as in Brot (bread).", ["Be wie Brot."]),
      tutor("H wie Haus.", "H as in Haus (house)."),
      you("J wie Jahr.", "Say: J as in Jahr (year).", ["Jott wie Jahr."]),
      tutor("V wie Vater.", "V as in Vater (father)."),
      you("W wie Wasser.", "Say: W as in Wasser (water).", ["We wie Wasser."]),
    ],
  },
  {
    title: "Ä, Ö, Ü, ß and German sounds",
    intro:
      "German has four extra letters: Ä, Ö, Ü (the dots are called 'Umlaut') and ß. German is mostly written the way it sounds, but some letter pairs sound different from English. Learn these patterns once and you can read almost any German word aloud.",
    letters: SPECIAL_LETTERS,
    spellWords: ["Tür", "Öl", "Fuß", "Käse"],
    grammar: {
      title: "Letter pairs to remember",
      text: "These combinations always sound the same.",
      table: [
        ["written", "sounds like", "example"],
        ["ei", "'eye'", "Wein (wine)"],
        ["ie", "'ee'", "Bier (beer)"],
        ["eu / äu", "'oy'", "heute (today)"],
        ["sch", "'sh'", "Schule (school)"],
        ["st / sp at the start", "'sht' / 'shp'", "Stadt, Sport"],
        ["ch after a, o, u", "throaty, like 'loch'", "acht (eight)"],
        ["ch after e, i, ä, ö, ü", "soft hiss", "ich (I)"],
      ],
    },
    phrases: [
      p("schön", "beautiful, nice", { note: "sch = 'sh'. ö: say 'eh' with rounded lips." }),
      p("Tür", "door", { note: "ü: say 'ee' with rounded lips." }),
      p("Käse", "cheese", { note: "ä sounds like the e in 'bed'." }),
      p("Straße", "street", { note: "ß is a sharp 'ss'. st at the start of a word sounds like 'sht'." }),
      p("Wein und Bier", "wine and beer", { note: "ei sounds like 'eye'; ie sounds like 'ee'." }),
      p("heute", "today", { note: "eu sounds like 'oy'." }),
      p("ich", "I", { note: "ch after i: a soft hiss, like a cat. Not 'k'." }),
      p("acht", "eight", { note: "ch after a: further back in the throat, like Scottish 'loch'." }),
      p("Sport und Schule", "sport and school", { note: "sp at the start = 'shp'; sch = 'sh'." }),
      p("Tag", "day", { note: "b, d, g at the end of a word sound like p, t, k: Tag = 'tahk'." }),
    ],
    dialogue: [
      tutor("Hallo! Wie schön!", "Hello! How nice!"),
      you("Schön!", "Say: nice! (Round your lips for ö.)"),
      tutor("Wein oder Bier?", "Wine or beer?"),
      you("Wein, bitte.", "Choose wine, please. (ei = 'eye')", ["Bier, bitte.", "Wein.", "Bier."]),
      tutor("Heute ist ein schöner Tag.", "Today is a beautiful day."),
      you("Ja, heute ist ein schöner Tag.", "Agree: yes, today is a beautiful day.", ["Ja!", "Ja, heute ist es schön."]),
    ],
  },
  {
    title: "Spelling: Wie schreibt man das?",
    intro:
      "In Germany you'll often be asked to spell your name: on the phone, at a doctor's office, or at a hotel. You say each letter's German name, or use words: 'M wie Mutter'. For ä, ö, ü people say 'A-Umlaut', 'O-Umlaut', 'U-Umlaut'.",
    spellWords: ["Max", "Lena", "Anna", "Berlin", "Köln", "Weber", "Müller"],
    phrases: [
      p("Wie schreibt man das?", "How do you spell that?", { words: [["wie", "how"], ["schreibt", "writes"], ["man", "one"], ["das", "that"]] }),
      p("Können Sie das buchstabieren?", "Can you spell that?", { words: [["können Sie", "can you"], ["buchstabieren", "spell"]] }),
      p("Wie ist Ihr Name?", "What is your name? (polite)"),
      p("Mein Name ist Lena Weber.", "My name is Lena Weber."),
      p("Weber mit W am Anfang.", "Weber with a W at the start.", { words: [["am Anfang", "at the beginning"]] }),
      p("Mit Doppel-L.", "With a double L.", { note: "Double letters: Doppel-L, Doppel-N, Doppel-S." }),
      p("Müller mit Ü.", "Müller with Ü (U-Umlaut).", { accept: ["Müller mit U Umlaut."] }),
      p("Groß oder klein?", "Capital or small letter?"),
    ],
    dialogue: [
      tutor("Guten Tag! Wie ist Ihr Name, bitte?", "Hello! What is your name, please?"),
      you("Mein Name ist {name}.", "Say your name.", ["Ich heiße {name}."]),
      tutor("Wie schreibt man das?", "How do you spell that?"),
      you("Ich buchstabiere: {letters}", "Spell your name letter by letter, with German letter names."),
      tutor("Danke schön. Mein Name ist Weber.", "Thank you. My name is Weber."),
      you("Können Sie das buchstabieren?", "Now you ask him to spell his name.", ["Wie schreibt man das?"]),
      tutor("Natürlich. W wie Wasser, E, B, E, R. Weber.", "Of course. W as in Wasser, E, B, E, R. Weber."),
    ],
  },
]);
