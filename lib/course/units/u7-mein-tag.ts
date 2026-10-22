import { defineUnit, p, tutor, you } from "../define";

export const unit7 = defineUnit(7, "Mein Tag", "Describe your daily routine and make plans with times and days.", [
  {
    title: "My morning",
    intro:
      "Some verbs split in two: 'aufstehen' (get up) becomes 'Ich stehe um sieben Uhr auf.' The small first part (auf) jumps to the end of the sentence.",
    grammar: {
      title: "Separable verbs",
      text: "The prefix goes to the end; the main part stays in second position.",
      table: [
        ["aufstehen", "Ich stehe um 7 Uhr auf."],
        ["anfangen", "Die Arbeit fängt um 9 Uhr an."],
        ["einkaufen", "Ich kaufe am Samstag ein."],
      ],
    },
    phrases: [
      p("Ich stehe um sieben Uhr auf.", "I get up at seven.", { accept: ["Ich stehe um 7 Uhr auf."], words: [["stehe … auf", "get up"]] }),
      p("Ich dusche.", "I take a shower.", { words: [["dusche", "shower"]] }),
      p("Ich frühstücke.", "I have breakfast.", { words: [["frühstücke", "have breakfast"]] }),
      p("Ich trinke Kaffee.", "I drink coffee."),
      p("Ich fahre mit dem Bus zur Arbeit.", "I take the bus to work.", { words: [["fahre", "go, ride"], ["mit dem Bus", "by bus"], ["zur Arbeit", "to work"]] }),
      p("Die Arbeit fängt um neun Uhr an.", "Work starts at nine.", { accept: ["Die Arbeit fängt um 9 Uhr an."] }),
    ],
    dialogue: [
      tutor("Wann stehst du auf?", "When do you get up?"),
      you("Ich stehe um {time} Uhr auf.", "Say what time you get up."),
      tutor("Und was machst du dann?", "And what do you do then?"),
      you("Ich dusche und frühstücke.", "Say you shower and have breakfast.", ["Ich frühstücke.", "Ich trinke Kaffee."]),
      tutor("Wie fährst du zur Arbeit?", "How do you get to work?"),
      you("Ich fahre mit dem Bus.", "Say you go by bus.", ["Mit dem Bus.", "Ich fahre mit dem Auto.", "Ich arbeite zu Hause."]),
    ],
  },
  {
    title: "Verb in second place",
    intro:
      "In a German statement the verb is always the second element. If you start with a time word, the subject moves after the verb: 'Heute arbeite ich' (not 'Heute ich arbeite').",
    grammar: {
      title: "Verb second",
      text: "Position 1 can be the subject or a time phrase. The verb is always position 2.",
      table: [
        ["1", "2 (verb)", "rest"],
        ["Ich", "arbeite", "heute."],
        ["Heute", "arbeite", "ich."],
        ["Am Abend", "koche", "ich."],
      ],
    },
    phrases: [
      p("Heute arbeite ich.", "Today I'm working."),
      p("Am Abend koche ich.", "In the evening I cook.", { words: [["am Abend", "in the evening"]] }),
      p("Am Mittag esse ich in der Kantine.", "At noon I eat in the canteen.", { words: [["am Mittag", "at noon"], ["Kantine", "canteen"]] }),
      p("Nach der Arbeit gehe ich einkaufen.", "After work I go shopping.", { words: [["nach der Arbeit", "after work"]] }),
      p("Um zehn Uhr gehe ich ins Bett.", "At ten I go to bed.", { accept: ["Um 10 Uhr gehe ich ins Bett."] }),
      p("Am Wochenende schlafe ich lange.", "At the weekend I sleep in.", { words: [["schlafe lange", "sleep long"]] }),
    ],
    dialogue: [
      tutor("Was machst du am Abend?", "What do you do in the evening?"),
      you("Am Abend koche ich.", "Start with 'Am Abend' and say you cook.", ["Am Abend lese ich.", "Am Abend {verb} ich."]),
      tutor("Und am Wochenende?", "And at the weekend?"),
      you("Am Wochenende schlafe ich lange.", "Say you sleep in at the weekend.", ["Am Wochenende {verb} ich."]),
    ],
  },
  {
    title: "Making plans",
    intro:
      "'Hast du Zeit?' (Do you have time?) is the easiest way to invite someone. Answer with 'Ja, gern!' or 'Leider nicht' (unfortunately not).",
    phrases: [
      p("Hast du am Samstag Zeit?", "Are you free on Saturday?"),
      p("Ja, gern!", "Yes, I'd love to!"),
      p("Leider nicht.", "Unfortunately not.", { words: [["leider", "unfortunately"]] }),
      p("Wollen wir ins Kino gehen?", "Shall we go to the cinema?", { words: [["wollen wir", "shall we"]] }),
      p("Wann treffen wir uns?", "When shall we meet?", { words: [["treffen uns", "meet each other"]] }),
      p("Um sechs Uhr am Bahnhof.", "At six at the station.", { accept: ["Um 6 Uhr am Bahnhof."] }),
      p("Bis Samstag!", "See you Saturday!"),
    ],
    dialogue: [
      tutor("Hast du am Samstag Zeit?", "Are you free on Saturday?"),
      you("Ja, gern!", "Say yes, gladly.", ["Ja.", "Leider nicht."]),
      tutor("Wollen wir ins Kino gehen?", "Shall we go to the cinema?"),
      you("Gute Idee! Wann treffen wir uns?", "Say good idea and ask when you'll meet.", ["Wann treffen wir uns?"]),
      tutor("Um sechs Uhr am Bahnhof.", "At six at the station."),
      you("Okay. Bis Samstag!", "Agree and say see you Saturday.", ["Bis Samstag!"]),
    ],
  },
  {
    title: "What did you do? (a first look at the past)",
    intro:
      "To talk about the past, Germans mostly use 'haben' + a past form at the end: 'Ich habe gearbeitet.' Verbs of movement use 'sein': 'Ich bin gefahren.' Just learn these as phrases for now.",
    phrases: [
      p("Was hast du gestern gemacht?", "What did you do yesterday?", { words: [["gestern", "yesterday"], ["gemacht", "done"]] }),
      p("Ich habe gearbeitet.", "I worked."),
      p("Ich habe Deutsch gelernt.", "I studied German."),
      p("Ich habe Pizza gegessen.", "I ate pizza.", { words: [["gegessen", "eaten"]] }),
      p("Ich bin ins Kino gegangen.", "I went to the cinema.", { words: [["bin … gegangen", "went"]] }),
      p("Ich bin nach Hause gefahren.", "I went home.", { words: [["nach Hause", "home(wards)"]] }),
    ],
    dialogue: [
      tutor("Was hast du gestern gemacht?", "What did you do yesterday?"),
      you("Ich habe Deutsch gelernt.", "Say you studied German.", ["Ich habe gearbeitet.", "Ich bin ins Kino gegangen."]),
      tutor("Super! Und am Abend?", "Great! And in the evening?"),
      you("Am Abend habe ich Pizza gegessen.", "Say in the evening you ate pizza.", ["Ich habe Pizza gegessen."]),
    ],
  },
]);
