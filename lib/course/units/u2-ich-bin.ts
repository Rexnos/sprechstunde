import { defineUnit, p, tutor, you } from "../define";

export const unit2 = defineUnit(2, "A1", "Ich bin …", "Introduce yourself: your name, where you're from, where you live, what you do.", [
  {
    title: "My name is …",
    intro:
      "There are two common ways to say your name: 'Ich heiße …' (I am called …) and 'Ich bin …' (I am …). To ask someone's name, use 'Wie heißt du?' or, politely, 'Wie heißen Sie?'.",
    phrases: [
      p("Ich heiße Anna.", "My name is Anna.", { words: [["ich", "I"], ["heiße", "am called"]] }),
      p("Ich bin Tom.", "I'm Tom.", { words: [["ich", "I"], ["bin", "am"]] }),
      p("Wie heißt du?", "What's your name? (casual)", { words: [["wie", "how"], ["heißt", "are called"], ["du", "you"]] }),
      p("Wie heißen Sie?", "What's your name? (polite)"),
      p("Mein Name ist Lena.", "My name is Lena.", { words: [["mein", "my"], ["Name", "name"], ["ist", "is"]] }),
      p("Freut mich!", "Nice to meet you!", { note: "Literally 'pleases me'." }),
      p("Mich auch.", "Me too. (Nice to meet you too.)"),
    ],
    dialogue: [
      tutor("Hallo! Ich heiße Jana. Wie heißt du?", "Hi! I'm Jana. What's your name?"),
      you("Ich heiße {name}.", "Tell her your name.", ["Ich bin {name}.", "Mein Name ist {name}."]),
      tutor("Freut mich!", "Nice to meet you!"),
      you("Mich auch!", "Say: me too.", ["Freut mich auch!"]),
    ],
  },
  {
    title: "Where are you from?",
    intro:
      "'Ich komme aus …' means 'I come from …'. Most country names need no article: aus Indien, aus Deutschland, aus Kanada. A few have one, like 'aus der Schweiz' and 'aus den USA'.",
    phrases: [
      p("Woher kommst du?", "Where are you from? (casual)", { words: [["woher", "where from"], ["kommst", "come"], ["du", "you"]] }),
      p("Woher kommen Sie?", "Where are you from? (polite)"),
      p("Ich komme aus Indien.", "I'm from India.", { words: [["ich", "I"], ["komme", "come"], ["aus", "from"], ["Indien", "India"]] }),
      p("Ich komme aus Deutschland.", "I'm from Germany."),
      p("Ich komme aus England.", "I'm from England."),
      p("Und du?", "And you? (casual)"),
      p("Ich komme auch aus Indien.", "I'm also from India.", { words: [["auch", "also"]] }),
    ],
    dialogue: [
      tutor("Woher kommst du?", "Where are you from?"),
      you("Ich komme aus {country}.", "Say where you're from."),
      tutor("Ah, interessant!", "Ah, interesting!"),
      you("Und du? Woher kommst du?", "Ask her back where she's from (casual).", ["Woher kommst du?", "Und du?"]),
      tutor("Ich komme aus Deutschland, aus Berlin.", "I'm from Germany, from Berlin."),
    ],
  },
  {
    title: "Where do you live? What languages do you speak?",
    intro:
      "German verbs change their ending with the person. For most verbs: ich + -e, du + -st, Sie + -en. Learn this pattern once and it works for hundreds of verbs.",
    grammar: {
      title: "Verb endings (present tense)",
      text: "Take the verb stem (wohn-, komm-, lern-) and add the ending.",
      table: [
        ["", "wohnen (live)", "kommen (come)", "ending"],
        ["ich", "wohne", "komme", "-e"],
        ["du", "wohnst", "kommst", "-st"],
        ["Sie", "wohnen", "kommen", "-en"],
      ],
    },
    phrases: [
      p("Wo wohnst du?", "Where do you live? (casual)", { words: [["wo", "where"], ["wohnst", "live"], ["du", "you"]] }),
      p("Ich wohne in Berlin.", "I live in Berlin."),
      p("Ich wohne in Kochi.", "I live in Kochi."),
      p("Welche Sprachen sprichst du?", "Which languages do you speak?", { words: [["welche", "which"], ["Sprachen", "languages"], ["sprichst", "speak"]] }),
      p("Ich spreche Englisch.", "I speak English."),
      p("Ich lerne Deutsch.", "I'm learning German.", { words: [["lerne", "learn"], ["Deutsch", "German"]] }),
      p("Ich spreche ein bisschen Deutsch.", "I speak a little German.", { words: [["ein bisschen", "a little"]] }),
    ],
    dialogue: [
      tutor("Wo wohnst du?", "Where do you live?"),
      you("Ich wohne in {city}.", "Say the city where you live."),
      tutor("Sprichst du Deutsch?", "Do you speak German?"),
      you("Ich spreche ein bisschen Deutsch.", "Say you speak a little German.", ["Ein bisschen.", "Ja, ein bisschen."]),
      tutor("Super! Und Englisch?", "Great! And English?"),
      you("Ja, ich spreche Englisch.", "Say yes, you speak English.", ["Ich spreche Englisch."]),
    ],
  },
  {
    title: "What do you do?",
    intro:
      "To talk about your job use 'Ich bin …' or 'Ich arbeite als …'. No article is needed: 'Ich bin Lehrer', not 'Ich bin ein Lehrer'. Many job titles have a female form ending in -in.",
    grammar: {
      title: "sein (to be)",
      text: "The most important German verb is irregular. Learn these three forms first.",
      table: [
        ["ich bin", "I am"],
        ["du bist", "you are (casual)"],
        ["Sie sind", "you are (polite)"],
      ],
    },
    phrases: [
      p("Was machst du beruflich?", "What do you do for work?", { words: [["was", "what"], ["machst", "do"], ["beruflich", "for work"]] }),
      p("Ich bin Student.", "I'm a student. (male)", { note: "Female: Ich bin Studentin." }),
      p("Ich bin Ingenieurin.", "I'm an engineer. (female)", { note: "Male: Ich bin Ingenieur." }),
      p("Ich arbeite als Entwickler.", "I work as a developer.", { words: [["arbeite", "work"], ["als", "as"], ["Entwickler", "developer"]] }),
      p("Ich arbeite in einer Firma.", "I work at a company."),
      p("Bist du Student?", "Are you a student?"),
      p("Nein, ich arbeite.", "No, I work."),
    ],
    dialogue: [
      tutor("Was machst du beruflich?", "What do you do for work?"),
      you("Ich arbeite als {job}.", "Say what you work as.", ["Ich bin {job}."]),
      tutor("Interessant! Und wo arbeitest du?", "Interesting! And where do you work?"),
      you("Ich arbeite in einer Firma.", "Say you work at a company.", ["In einer Firma."]),
      tutor("Ich bin Lehrerin.", "I'm a teacher."),
      you("Oh, interessant!", "Say: oh, interesting!", ["Interessant!", "Schön!", "Toll!"]),
    ],
  },
]);
