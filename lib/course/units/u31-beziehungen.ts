import { defineUnit, p, tutor, you } from "../define";

export const unit31 = defineUnit(31, "B1", "Beziehungen", "Talk about friendship, family and love, and link ideas with two-part connectors like sowohl … als auch and je … desto.", [
  {
    title: "Both and neither: sowohl … als auch, weder … noch",
    intro:
      "Two-part connectors link ideas elegantly. 'Sowohl … als auch' means 'both … and'; 'weder … noch' means 'neither … nor' and already makes the sentence negative, so don't add 'nicht' or 'kein'.",
    grammar: {
      title: "sowohl … als auch, weder … noch",
      text: "They link two words or phrases of the same kind; the word order of the sentence doesn't change.",
      table: [
        ["Connector", "Meaning", "Example"],
        ["sowohl … als auch", "both … and", "Sie spricht sowohl Englisch als auch Französisch."],
        ["weder … noch", "neither … nor", "Er hat weder Zeit noch Geld."],
      ],
    },
    phrases: [
      p("Meine Schwester spricht sowohl Englisch als auch Französisch.", "My sister speaks both English and French.", { words: [["sowohl … als auch", "both … and"]] }),
      p("Er hat weder Zeit noch Lust.", "He has neither the time nor the inclination.", { words: [["weder … noch", "neither … nor"], ["Lust", "inclination, desire"]] }),
      p("Sowohl meine Eltern als auch meine Großeltern wohnen in der Nähe.", "Both my parents and my grandparents live nearby.", { words: [["in der Nähe", "nearby"]] }),
      p("Ich trinke weder Kaffee noch Tee.", "I drink neither coffee nor tea."),
      p("Unsere Kinder lieben sowohl Hunde als auch Katzen.", "Our children love both dogs and cats."),
      p("Sie hat weder angerufen noch geschrieben.", "She neither called nor wrote."),
      p("Mein Freund kann sowohl kochen als auch backen.", "My boyfriend can both cook and bake.", { words: [["backen", "bake"]] }),
    ],
    dialogue: [
      tutor("Welche Sprachen spricht deine Schwester?", "Which languages does your sister speak?"),
      you("Sie spricht sowohl Englisch als auch Französisch.", "Say she speaks both English and French.", ["Meine Schwester spricht sowohl Englisch als auch Französisch.", "Sie spricht sowohl {language} als auch Deutsch."]),
      tutor("Möchtest du einen Kaffee oder einen Tee?", "Would you like a coffee or a tea?"),
      you("Danke, ich trinke weder Kaffee noch Tee.", "Say thanks, but you drink neither coffee nor tea.", ["Ich trinke weder Kaffee noch Tee.", "Lieber ein Wasser, bitte."]),
      tutor("Hat sich Tom gemeldet?", "Has Tom been in touch?"),
      you("Nein, er hat weder angerufen noch geschrieben.", "Say no, he neither called nor wrote.", ["Nein, er hat sich nicht gemeldet."]),
    ],
  },
  {
    title: "Either or, not only but also",
    intro:
      "'Entweder … oder' (either … or) offers two choices. 'Nicht nur … sondern auch' (not only … but also) adds something important or surprising; there's always a comma before 'sondern'. Both are common when you talk about friends and plans.",
    grammar: {
      title: "entweder … oder, nicht nur … sondern auch",
      text: "After 'entweder' at the start, the subject usually comes next: Entweder wir gehen … 'oder' takes no position.",
      table: [
        ["Connector", "Meaning", "Example"],
        ["entweder … oder", "either … or", "Entweder wir kochen oder wir bestellen Pizza."],
        ["nicht nur … sondern auch", "not only … but also", "Er ist nicht nur nett, sondern auch klug."],
      ],
    },
    phrases: [
      p("Entweder wir gehen ins Kino oder wir bleiben zu Hause.", "Either we go to the cinema or we stay at home.", { words: [["entweder … oder", "either … or"]] }),
      p("Du kannst entweder mich oder meinen Bruder fragen.", "You can ask either me or my brother."),
      p("Sie ist nicht nur meine Kollegin, sondern auch meine beste Freundin.", "She's not only my colleague but also my best friend.", { words: [["nicht nur … sondern auch", "not only … but also"]] }),
      p("Er ist nicht nur lustig, sondern auch sehr hilfsbereit.", "He's not only funny but also very helpful.", { words: [["hilfsbereit", "helpful"]] }),
      p("Entweder du entschuldigst dich oder ich rede nicht mehr mit dir.", "Either you apologise or I'm not talking to you anymore.", { words: [["sich entschuldigen", "apologise"]] }),
      p("Ein guter Freund hört nicht nur zu, sondern sagt auch die Wahrheit.", "A good friend not only listens but also tells the truth.", { words: [["zuhören", "listen"], ["Wahrheit", "truth"]] }),
      p("Wir treffen uns entweder am Samstag oder am Sonntag.", "We're meeting either on Saturday or on Sunday."),
    ],
    dialogue: [
      tutor("Was machen wir heute Abend?", "What shall we do tonight?"),
      you("Entweder wir gehen ins Kino oder wir bleiben zu Hause.", "Suggest either going to the cinema or staying at home.", ["Wir gehen ins Kino.", "Entweder Kino oder Sofa!"]),
      tutor("Wer ist eigentlich Lisa?", "Who is Lisa, actually?"),
      you("Sie ist nicht nur meine Kollegin, sondern auch meine beste Freundin.", "Say she's not only your colleague but also your best friend.", ["Sie ist meine beste Freundin.", "Sie ist nicht nur meine Kollegin, sondern auch eine gute Freundin."]),
      tutor("Was ist für dich ein guter Freund?", "What makes a good friend for you?"),
      you("Ein guter Freund hört nicht nur zu, sondern sagt auch die Wahrheit.", "Say a good friend not only listens but also tells the truth.", ["Ein guter Freund hört zu.", "Ein guter Freund ist ehrlich."]),
    ],
  },
  {
    title: "The more, the better: je … desto",
    intro:
      "'Je … desto' (the … the) links two comparatives: 'Je älter ich werde, desto ruhiger bin ich.' The je-part has its verb at the end; after 'desto' + comparative comes the verb, then the subject. 'Umso' can replace 'desto'.",
    grammar: {
      title: "je … desto",
      text: "Each part starts with je or desto plus a comparative. Only the word order differs.",
      table: [
        ["je + comparative … verb at the end", "desto + comparative + verb + subject"],
        ["Je länger ich ihn kenne,", "desto besser verstehe ich ihn."],
        ["Je mehr wir reden,", "desto weniger streiten wir."],
        ["Je früher du kommst,", "desto mehr Zeit haben wir."],
      ],
    },
    phrases: [
      p("Je länger ich sie kenne, desto lieber mag ich sie.", "The longer I know her, the more I like her.", { words: [["je … desto", "the … the"]] }),
      p("Je älter ich werde, desto ruhiger werde ich.", "The older I get, the calmer I become.", { words: [["ruhiger", "calmer"]] }),
      p("Je mehr wir miteinander reden, desto weniger streiten wir.", "The more we talk to each other, the less we argue.", { words: [["miteinander", "with each other"], ["streiten", "argue"]] }),
      p("Je früher du kommst, desto mehr Zeit haben wir.", "The earlier you come, the more time we have."),
      p("Je öfter wir uns sehen, umso besser.", "The more often we see each other, the better.", { words: [["umso", "the (= desto)"]] }),
      p("Je weiter weg meine Familie wohnt, desto mehr vermisse ich sie.", "The further away my family lives, the more I miss them.", { words: [["weiter weg", "further away"], ["vermissen", "miss"]] }),
      p("Je mehr, desto besser!", "The more, the merrier!"),
    ],
    dialogue: [
      tutor("Wie lange kennst du deine Freundin Mia schon?", "How long have you known your friend Mia?"),
      you("Seit {number} Jahren. Je länger ich sie kenne, desto lieber mag ich sie.", "Say for how many years, and that the longer you know her, the more you like her.", ["Je länger ich sie kenne, desto lieber mag ich sie.", "Seit {number} Jahren."]),
      tutor("Streitet ihr manchmal?", "Do you sometimes argue?"),
      you("Je mehr wir miteinander reden, desto weniger streiten wir.", "Say the more you talk to each other, the less you argue.", ["Selten.", "Manchmal, aber nicht oft."]),
      tutor("Kann ich am Samstag noch zwei Freunde mitbringen?", "Can I bring two more friends on Saturday?"),
      you("Klar, je mehr, desto besser!", "Say of course, the more the merrier.", ["Je mehr, desto besser!", "Natürlich!"]),
    ],
  },
  {
    title: "Love, family and friendship",
    intro:
      "Relationships come with their own verbs: 'sich verlieben in' (fall in love with), 'sich verstehen mit' (get on with), 'sich streiten' (argue), 'sich trennen' (break up, separate) and 'sich versöhnen' (make up). Most are reflexive, so remember the pronoun.",
    phrases: [
      p("Wir haben uns im Urlaub ineinander verliebt.", "We fell in love on holiday.", { words: [["sich verlieben", "fall in love"], ["ineinander", "with each other"]] }),
      p("Ich verstehe mich gut mit meiner Schwiegermutter.", "I get on well with my mother-in-law.", { words: [["sich verstehen mit", "get on with"], ["Schwiegermutter", "mother-in-law"]] }),
      p("Meine Eltern haben sich vor zwei Jahren getrennt.", "My parents separated two years ago.", { accept: ["Meine Eltern haben sich vor 2 Jahren getrennt."], words: [["sich trennen", "separate, break up"]] }),
      p("Nach dem Streit haben wir uns schnell versöhnt.", "After the argument we quickly made up.", { words: [["Streit", "argument"], ["sich versöhnen", "make up"]] }),
      p("Wir sind seit zehn Jahren verheiratet.", "We've been married for ten years.", { accept: ["Wir sind seit 10 Jahren verheiratet."], words: [["verheiratet", "married"]] }),
      p("Auf meine Freunde kann ich mich immer verlassen.", "I can always rely on my friends.", { words: [["sich verlassen auf", "rely on"]] }),
      p("Wir haben uns aus den Augen verloren.", "We lost touch.", { words: [["aus den Augen verlieren", "lose touch (lit. lose from sight)"]] }),
    ],
    dialogue: [
      tutor("Wie habt ihr euch kennengelernt?", "How did you two meet?"),
      you("Wir haben uns im Urlaub ineinander verliebt.", "Say you fell in love on holiday.", ["Im Urlaub.", "Wir haben uns bei der Arbeit kennengelernt."]),
      tutor("Wie romantisch! Seid ihr verheiratet?", "How romantic! Are you married?"),
      you("Ja, wir sind seit {number} Jahren verheiratet.", "Say yes, and for how many years.", ["Nein, noch nicht.", "Ja, seit zehn Jahren."]),
      tutor("Und hast du noch Kontakt zu deinen Schulfreunden?", "And are you still in touch with your school friends?"),
      you("Leider haben wir uns aus den Augen verloren.", "Say unfortunately you lost touch.", ["Ja, auf meine Freunde kann ich mich immer verlassen.", "Nein, leider nicht."]),
    ],
  },
]);
