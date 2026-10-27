import { defineUnit, p, tutor, you } from "../define";

export const unit15 = defineUnit(15, "A2", "Meinungen und Gründe", "Give reasons with weil and denn, and say what you think with dass.", [
  {
    title: "Because… (weil)",
    intro:
      "'Warum?' asks why, and the usual answer starts with 'weil' (because). 'Weil' starts a subordinate clause, which sends the conjugated verb to the very end: 'Ich bleibe zu Hause, weil ich krank bin.' A comma always goes before 'weil'.",
    grammar: {
      title: "weil: verb to the end",
      text: "In a weil-clause the conjugated verb (bin, muss, hat …) moves to the last position. With a modal or the Perfekt, the conjugated verb comes after the infinitive or participle.",
      table: [
        ["Main clause", "weil-clause"],
        ["Ich bleibe zu Hause,", "weil ich krank bin."],
        ["Ich kann nicht kommen,", "weil ich arbeiten muss."],
        ["Er ist müde,", "weil er schlecht geschlafen hat."],
      ],
    },
    phrases: [
      p("Warum lernst du Deutsch?", "Why are you learning German?", { words: [["warum", "why"]] }),
      p("Ich lerne Deutsch, weil ich in Deutschland arbeite.", "I'm learning German because I work in Germany.", { words: [["weil", "because"]] }),
      p("Ich komme nicht, weil ich krank bin.", "I'm not coming because I'm ill.", { words: [["krank", "ill, sick"]] }),
      p("Wir bleiben zu Hause, weil es regnet.", "We're staying at home because it's raining.", { words: [["regnet", "is raining"]] }),
      p("Ich kann nicht kommen, weil ich arbeiten muss.", "I can't come because I have to work."),
      p("Er ist müde, weil er schlecht geschlafen hat.", "He's tired because he slept badly.", { words: [["müde", "tired"], ["schlecht", "badly"]] }),
    ],
    dialogue: [
      tutor("Warum lernst du Deutsch?", "Why are you learning German?"),
      you("Ich lerne Deutsch, weil ich in Deutschland arbeite.", "Say you're learning German because you work in Germany.", ["Weil ich in Deutschland wohne.", "Weil ich {reason}."]),
      tutor("Interessant! Kommst du heute Abend mit ins Kino?", "Interesting! Are you coming to the cinema tonight?"),
      you("Leider nicht, weil ich arbeiten muss.", "Say unfortunately not, because you have to work.", ["Ich kann nicht kommen, weil ich arbeiten muss.", "Ja, gern!"]),
      tutor("Schade! Vielleicht nächste Woche.", "Too bad! Maybe next week."),
    ],
  },
  {
    title: "denn and deshalb",
    intro:
      "'Denn' also means 'because', but it doesn't change the word order: 'Ich gehe ins Bett, denn ich bin müde.' 'Deshalb' (that's why) points the other way, from cause to result, and the verb comes right after it.",
    grammar: {
      title: "weil, denn, deshalb",
      text: "Three ways to link a reason and a result. Watch where the verb goes.",
      table: [
        ["Word", "Verb position", "Example"],
        ["weil", "at the end", "…, weil ich müde bin."],
        ["denn", "normal (2nd)", "…, denn ich bin müde."],
        ["deshalb", "right after deshalb", "Ich bin müde. Deshalb gehe ich ins Bett."],
      ],
    },
    phrases: [
      p("Ich gehe früh ins Bett, denn ich bin müde.", "I'm going to bed early, as I'm tired.", { words: [["früh", "early"], ["denn", "because, as"]] }),
      p("Ich nehme den Bus, denn mein Auto ist kaputt.", "I'm taking the bus, as my car is broken.", { words: [["kaputt", "broken"]] }),
      p("Sie lernt viel, denn sie hat bald eine Prüfung.", "She's studying a lot, as she has an exam soon.", { words: [["bald", "soon"], ["Prüfung", "exam"]] }),
      p("Ich trinke keinen Kaffee mehr, denn ich schlafe dann schlecht.", "I don't drink coffee any more, as I sleep badly then.", { words: [["kein … mehr", "no more, no longer"]] }),
      p("Ich bin krank. Deshalb bleibe ich im Bett.", "I'm ill. That's why I'm staying in bed.", { words: [["deshalb", "that's why, so"]] }),
      p("Es regnet. Deshalb nehmen wir das Auto.", "It's raining. So we're taking the car."),
    ],
    dialogue: [
      tutor("Du fährst heute mit dem Bus?", "You're going by bus today?"),
      you("Ja, denn mein Auto ist kaputt.", "Say yes, as your car is broken.", ["Ich nehme den Bus, denn mein Auto ist kaputt."]),
      tutor("Oh nein! Und heute Abend? Gehen wir essen?", "Oh no! And tonight? Shall we go out to eat?"),
      you("Ich bin müde. Deshalb bleibe ich zu Hause.", "Say you're tired, that's why you're staying at home.", ["Deshalb bleibe ich zu Hause.", "Ja, gern!"]),
      tutor("Verstehe. Dann morgen!", "I understand. Tomorrow then!"),
    ],
  },
  {
    title: "I think that… (dass)",
    intro:
      "To give your opinion, say 'Ich finde, dass …', 'Ich glaube, dass …' or 'Ich denke, dass …'. Like 'weil', 'dass' (that) sends the verb to the end. In speech you can also drop 'dass' and keep normal order: 'Ich finde, das ist teuer.'",
    grammar: {
      title: "dass-clauses",
      text: "After verbs of thinking, knowing and saying. Comma before dass, verb at the end.",
      table: [
        ["Main clause", "dass-clause"],
        ["Ich finde,", "dass Berlin spannend ist."],
        ["Ich glaube,", "dass er recht hat."],
        ["Es ist wichtig,", "dass wir pünktlich sind."],
      ],
    },
    phrases: [
      p("Ich finde, dass Berlin sehr spannend ist.", "I think Berlin is really exciting.", { words: [["ich finde", "I think, I find"], ["spannend", "exciting"]] }),
      p("Ich glaube, dass er recht hat.", "I believe he's right.", { words: [["glaube", "believe"], ["recht haben", "be right"]] }),
      p("Ich denke, dass das eine gute Idee ist.", "I think that's a good idea.", { words: [["Idee", "idea"]] }),
      p("Findest du nicht, dass es zu teuer ist?", "Don't you think it's too expensive?"),
      p("Ich weiß, dass du viel Arbeit hast.", "I know that you have a lot of work.", { words: [["weiß", "know"]] }),
      p("Es ist wichtig, dass wir pünktlich sind.", "It's important that we're on time.", { words: [["wichtig", "important"], ["pünktlich", "on time"]] }),
      p("Ich hoffe, dass das Wetter schön bleibt.", "I hope the weather stays nice.", { words: [["hoffe", "hope"], ["bleibt", "stays"]] }),
    ],
    dialogue: [
      tutor("Wie findest du Berlin?", "What do you think of Berlin?"),
      you("Ich finde, dass Berlin sehr spannend ist.", "Say you think Berlin is really exciting.", ["Ich finde Berlin spannend.", "Ich finde, dass Berlin {opinion} ist."]),
      tutor("Ja, aber die Mieten sind sehr hoch.", "Yes, but the rents are very high."),
      you("Da hast du recht.", "Say they're right about that.", ["Ich glaube, dass du recht hast.", "Das stimmt."]),
      tutor("Fahren wir am Wochenende an den See?", "Shall we go to the lake at the weekend?"),
      you("Gern! Ich hoffe, dass das Wetter schön bleibt.", "Say yes, and that you hope the weather stays nice.", ["Ich hoffe, dass das Wetter schön bleibt."]),
    ],
  },
  {
    title: "Agreeing and disagreeing",
    intro:
      "Discussions need short reactions: 'Da hast du recht' (you're right), 'Das sehe ich anders' (I see it differently). 'Meiner Meinung nach' (in my opinion) counts as position 1, so the verb follows straight away.",
    phrases: [
      p("Was meinst du dazu?", "What do you think about it?", { words: [["meinst", "think, mean"], ["dazu", "about it"]] }),
      p("Meiner Meinung nach ist das zu teuer.", "In my opinion that's too expensive.", { words: [["meiner Meinung nach", "in my opinion"]] }),
      p("Da hast du recht.", "You're right about that."),
      p("Das sehe ich anders.", "I see it differently.", { words: [["anders", "differently"]] }),
      p("Ich bin nicht sicher.", "I'm not sure.", { words: [["sicher", "sure"]] }),
      p("Ich bin dafür.", "I'm in favour.", { words: [["dafür", "for it"]] }),
      p("Ich bin dagegen, weil es zu laut ist.", "I'm against it because it's too loud.", { words: [["dagegen", "against it"], ["laut", "loud"]] }),
    ],
    dialogue: [
      tutor("Unsere Stadt plant ein neues Stadion. Was meinst du dazu?", "Our town is planning a new stadium. What do you think about it?"),
      you("Ich bin dagegen, weil es zu laut ist.", "Say you're against it because it's too loud.", ["Ich bin dafür.", "Ich bin dagegen."]),
      tutor("Aber das Stadion bringt viele Touristen.", "But the stadium brings lots of tourists."),
      you("Das sehe ich anders.", "Say you see it differently.", ["Da hast du recht.", "Ich bin nicht sicher."]),
      tutor("Und es ist auch sehr teuer.", "And it's also very expensive."),
      you("Meiner Meinung nach ist das zu teuer.", "Say in your opinion it's too expensive.", ["Da hast du recht."]),
    ],
  },
]);
