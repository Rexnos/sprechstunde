import { defineUnit, p, tutor, you } from "../define";

export const unit13 = defineUnit(13, "A2", "Was ist passiert?", "Tell what happened using the Perfekt with haben and sein.", [
  {
    title: "What did you do? (Perfekt with haben)",
    intro:
      "To talk about the past in conversation, Germans mostly use the Perfekt: a form of 'haben' in second position plus a past participle at the end. Regular verbs build the participle as ge- + stem + -t: machen → gemacht, spielen → gespielt.",
    grammar: {
      title: "Perfekt with haben (regular verbs)",
      text: "haben goes in position 2, the participle goes to the end. Verbs ending in -ieren and verbs starting with be-, ver-, er- take no ge-.",
      table: [
        ["Infinitive", "Participle", "Example"],
        ["machen", "gemacht", "Ich habe Sport gemacht."],
        ["kaufen", "gekauft", "Sie hat ein Buch gekauft."],
        ["arbeiten", "gearbeitet", "Wir haben lange gearbeitet."],
        ["besuchen", "besucht", "Ich habe Oma besucht."],
      ],
    },
    phrases: [
      p("Was hast du am Wochenende gemacht?", "What did you do at the weekend?", { words: [["gemacht", "done, made"]] }),
      p("Ich habe Fußball gespielt.", "I played football.", { words: [["gespielt", "played"]] }),
      p("Wir haben zusammen gekocht.", "We cooked together.", { words: [["zusammen", "together"], ["gekocht", "cooked"]] }),
      p("Ich habe ein Buch gekauft.", "I bought a book.", { words: [["gekauft", "bought"]] }),
      p("Hast du gestern gearbeitet?", "Did you work yesterday?", { words: [["gestern", "yesterday"], ["gearbeitet", "worked"]], note: "Stems ending in -t or -d add -et: arbeiten → gearbeitet." }),
      p("Ich habe meine Mutter besucht.", "I visited my mother.", { words: [["besucht", "visited"]], note: "Verbs starting with be- take no ge-: besuchen → besucht." }),
      p("Am Abend habe ich Musik gehört.", "In the evening I listened to music.", { words: [["gehört", "listened, heard"]] }),
    ],
    dialogue: [
      tutor("Hallo! Was hast du am Wochenende gemacht?", "Hi! What did you do at the weekend?"),
      you("Ich habe Fußball gespielt.", "Say you played football.", ["Ich habe {thing} gemacht.", "Ich habe gearbeitet."]),
      tutor("Schön! Und am Sonntag?", "Nice! And on Sunday?"),
      you("Am Sonntag habe ich meine Mutter besucht.", "Say that on Sunday you visited your mother.", ["Ich habe meine Mutter besucht.", "Am Sonntag habe ich {thing}."]),
      tutor("Ich habe den ganzen Tag gearbeitet.", "I worked all day."),
      you("Oh, das ist schade!", "Say that's a pity.", ["Schade!", "Oh nein!"]),
    ],
  },
  {
    title: "Irregular participles",
    intro:
      "Many common verbs are irregular: their participle ends in -en, and the vowel often changes. You simply have to learn them, so start with the ones you use every day: gegessen, getrunken, gesehen, gelesen, geschrieben.",
    grammar: {
      title: "Irregular participles (-en)",
      text: "They still take ge- and still go to the end, but end in -en, often with a new vowel.",
      table: [
        ["Infinitive", "Participle", "Meaning"],
        ["essen", "gegessen", "eaten"],
        ["trinken", "getrunken", "drunk"],
        ["sehen", "gesehen", "seen"],
        ["schreiben", "geschrieben", "written"],
        ["finden", "gefunden", "found"],
      ],
    },
    phrases: [
      p("Ich habe einen Film gesehen.", "I watched a film.", { words: [["gesehen", "seen"]] }),
      p("Wir haben im Restaurant gegessen.", "We ate at a restaurant.", { words: [["gegessen", "eaten"]] }),
      p("Hast du das Buch schon gelesen?", "Have you read the book yet?", { words: [["schon", "already, yet"], ["gelesen", "read"]] }),
      p("Ich habe zu viel Kaffee getrunken.", "I drank too much coffee.", { words: [["zu viel", "too much"], ["getrunken", "drunk"]] }),
      p("Sie hat mir eine Nachricht geschrieben.", "She wrote me a message.", { words: [["Nachricht", "message"], ["geschrieben", "written"]] }),
      p("Ich habe meinen Schlüssel nicht gefunden.", "I didn't find my key.", { words: [["Schlüssel", "key"], ["gefunden", "found"]] }),
      p("Er hat den ganzen Tag geschlafen.", "He slept all day.", { words: [["den ganzen Tag", "all day"], ["geschlafen", "slept"]] }),
    ],
    dialogue: [
      tutor("Was hast du gestern Abend gemacht?", "What did you do last night?"),
      you("Ich habe einen Film gesehen.", "Say you watched a film.", ["Ich habe ein Buch gelesen.", "Ich habe {thing} gesehen."]),
      tutor("Ah, schön. Hast du auch etwas gegessen?", "Ah, nice. Did you eat something too?"),
      you("Ja, wir haben im Restaurant gegessen.", "Say yes, you ate at a restaurant.", ["Ja, ich habe Pizza gegessen.", "Ja, ich habe gekocht."]),
      tutor("Und heute bist du müde?", "And today you're tired?"),
      you("Ja, ich habe zu wenig geschlafen.", "Say yes, you slept too little.", ["Ja, ich habe schlecht geschlafen."]),
    ],
  },
  {
    title: "Perfekt with sein",
    intro:
      "Verbs of movement from A to B (gehen, fahren, fliegen, kommen) and verbs of change (aufwachen, einschlafen, passieren) use 'sein' instead of 'haben'. 'Bleiben' and 'sein' itself also take 'sein': 'Ich bin zu Hause geblieben.'",
    grammar: {
      title: "haben or sein?",
      text: "sein: movement from place to place, change of state, plus bleiben and sein. Everything else: haben.",
      table: [
        ["Infinitive", "Perfekt"],
        ["gehen", "ich bin gegangen"],
        ["fahren", "ich bin gefahren"],
        ["kommen", "ich bin gekommen"],
        ["fliegen", "ich bin geflogen"],
        ["bleiben", "ich bin geblieben"],
        ["passieren", "es ist passiert"],
      ],
    },
    phrases: [
      p("Ich bin nach Hamburg gefahren.", "I went to Hamburg.", { words: [["gefahren", "gone, travelled"]] }),
      p("Wann bist du nach Hause gekommen?", "When did you come home?", { words: [["nach Hause", "home (direction)"], ["gekommen", "come"]] }),
      p("Wir sind ins Kino gegangen.", "We went to the cinema.", { words: [["Kino", "cinema"], ["gegangen", "gone"]] }),
      p("Sie ist nach Spanien geflogen.", "She flew to Spain.", { words: [["geflogen", "flown"]] }),
      p("Ich bin zu Hause geblieben.", "I stayed at home.", { words: [["geblieben", "stayed"]] }),
      p("Was ist passiert?", "What happened?", { words: [["passiert", "happened"]] }),
      p("Er ist vom Fahrrad gefallen.", "He fell off his bike.", { words: [["Fahrrad", "bike"], ["gefallen", "fallen"]] }),
    ],
    dialogue: [
      tutor("Warst du am Samstag auf der Party?", "Were you at the party on Saturday?"),
      you("Nein, ich bin zu Hause geblieben.", "Say no, you stayed at home.", ["Ja, ich bin auf die Party gegangen.", "Nein, ich bin zu Hause geblieben."]),
      tutor("Schade! Tom ist auch nicht gekommen.", "Pity! Tom didn't come either."),
      you("Was ist passiert?", "Ask what happened."),
      tutor("Er ist vom Fahrrad gefallen.", "He fell off his bike."),
      you("Oh nein! Wie geht es ihm?", "Say oh no and ask how he is.", ["Wie geht es ihm?"]),
    ],
  },
  {
    title: "Telling a story: aufgestanden, eingekauft",
    intro:
      "With separable verbs, 'ge' sits between the prefix and the stem: aufstehen → aufgestanden, einkaufen → eingekauft, anrufen → angerufen. Use 'zuerst', 'dann' and 'danach' to put events in order.",
    grammar: {
      title: "Separable verbs in the Perfekt",
      text: "The prefix stays at the front of the participle, and ge- goes in the middle. Inseparable verbs (ver-, be-, er-) take no ge-.",
      table: [
        ["Infinitive", "Participle", "Auxiliary"],
        ["aufstehen", "aufgestanden", "sein"],
        ["einkaufen", "eingekauft", "haben"],
        ["anrufen", "angerufen", "haben"],
        ["ankommen", "angekommen", "sein"],
        ["verpassen", "verpasst", "haben"],
      ],
    },
    phrases: [
      p("Ich bin um sechs Uhr aufgestanden.", "I got up at six o'clock.", { accept: ["Ich bin um 6 Uhr aufgestanden."], words: [["aufgestanden", "got up"]] }),
      p("Ich habe im Supermarkt eingekauft.", "I did the shopping at the supermarket.", { words: [["eingekauft", "shopped"]] }),
      p("Hat jemand angerufen?", "Did anyone call?", { words: [["jemand", "someone, anyone"], ["angerufen", "called (on the phone)"]] }),
      p("Der Zug ist zu spät angekommen.", "The train arrived late.", { words: [["zu spät", "late, too late"], ["angekommen", "arrived"]] }),
      p("Zuerst habe ich den Bus verpasst.", "First I missed the bus.", { words: [["zuerst", "first"], ["verpasst", "missed"]] }),
      p("Danach hat es auch noch geregnet.", "After that it rained as well.", { words: [["danach", "after that"], ["auch noch", "on top of that"], ["geregnet", "rained"]] }),
      p("Ich bin vor dem Fernseher eingeschlafen.", "I fell asleep in front of the TV.", { words: [["Fernseher", "TV set"], ["eingeschlafen", "fallen asleep"]] }),
    ],
    dialogue: [
      tutor("Du siehst müde aus. Was ist passiert?", "You look tired. What happened?"),
      you("Ich bin um fünf Uhr aufgestanden.", "Say you got up at five o'clock.", ["Ich bin um 5 Uhr aufgestanden.", "Ich bin um {time} Uhr aufgestanden."]),
      tutor("So früh! Und dann?", "So early! And then?"),
      you("Zuerst habe ich den Bus verpasst.", "Say that first you missed the bus.", ["Ich habe den Bus verpasst."]),
      tutor("Oh je! Und danach?", "Oh dear! And after that?"),
      you("Dann bin ich zu spät zur Arbeit gekommen.", "Say then you came to work late.", ["Ich bin zu spät gekommen."]),
    ],
  },
]);
