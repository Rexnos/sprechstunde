import { defineUnit, p, tutor, you } from "../define";

export const unit30 = defineUnit(30, "B1", "Reisen und Kulturen", "Tell travel stories in the right order with the Plusquamperfekt and nachdem, bevor and während, and talk about cultural differences and misunderstandings.", [
  {
    title: "Plusquamperfekt: what had happened",
    intro:
      "The Plusquamperfekt describes something that happened before another past event: 'Als wir ankamen, war der Zug schon abgefahren.' Build it like the Perfekt, but with the Präteritum of the helper verb: 'hatte' or 'war' + participle.",
    grammar: {
      title: "Perfekt → Plusquamperfekt",
      text: "Verbs that take sein in the Perfekt take war; all others take hatte.",
      table: [
        ["Perfekt", "Plusquamperfekt"],
        ["Ich habe gegessen.", "Ich hatte gegessen."],
        ["Sie ist gefahren.", "Sie war gefahren."],
        ["Wir haben gebucht.", "Wir hatten gebucht."],
        ["Er ist angekommen.", "Er war angekommen."],
      ],
    },
    phrases: [
      p("Als wir ankamen, war der Zug schon abgefahren.", "When we arrived, the train had already left.", { words: [["ankommen", "arrive"], ["abfahren", "leave, depart"]] }),
      p("Ich hatte das Hotel online gebucht.", "I had booked the hotel online.", { words: [["buchen", "book"]] }),
      p("Leider hatte ich meinen Pass zu Hause vergessen.", "Unfortunately I had left my passport at home.", { words: [["Pass", "passport"], ["vergessen", "forget, leave behind"]] }),
      p("Sie war noch nie im Ausland gewesen.", "She had never been abroad before.", { words: [["im Ausland", "abroad"]] }),
      p("Wir hatten vorher viel über das Land gelesen.", "We had read a lot about the country beforehand.", { words: [["vorher", "beforehand"]] }),
      p("Das Restaurant hatte schon geschlossen.", "The restaurant had already closed."),
      p("Hattest du vorher schon einmal Sushi gegessen?", "Had you eaten sushi before?"),
    ],
    dialogue: [
      tutor("Warum bist du so spät gekommen?", "Why did you come so late?"),
      you("Als wir ankamen, war der Zug schon abgefahren.", "Say that when you arrived, the train had already left.", ["Der Zug war schon abgefahren."]),
      tutor("Oh nein! Und dann?", "Oh no! And then?"),
      you("Wir wollten essen, aber das Restaurant hatte schon geschlossen.", "Say you wanted to eat, but the restaurant had already closed.", ["Das Restaurant hatte schon geschlossen."]),
      tutor("Was für ein Tag! Warst du vorher schon einmal in Wien gewesen?", "What a day! Had you been to Vienna before?"),
      you("Nein, ich war noch nie im Ausland gewesen.", "Say no, you had never been abroad.", ["Nein, noch nie.", "Ja, ich war schon einmal dort gewesen."]),
    ],
  },
  {
    title: "nachdem, bevor, während",
    intro:
      "'Nachdem' (after) usually combines a Plusquamperfekt clause with a main clause in the Präteritum or Perfekt: 'Nachdem wir gegessen hatten, gingen wir spazieren.' 'Bevor' (before) and 'während' (while) use the same tense in both parts. All three send the verb to the end.",
    grammar: {
      title: "Time conjunctions",
      text: "nachdem: the earlier action is in the Plusquamperfekt. bevor and während: same tense in both clauses.",
      table: [
        ["Conjunction", "Meaning", "Example"],
        ["nachdem", "after", "Nachdem ich gefrühstückt hatte, fuhr ich los."],
        ["bevor", "before", "Bevor wir abfuhren, packten wir."],
        ["während", "while", "Während er schlief, las ich."],
      ],
    },
    phrases: [
      p("Nachdem wir gegessen hatten, gingen wir am Fluss spazieren.", "After we had eaten, we went for a walk by the river.", { words: [["nachdem", "after"], ["spazieren gehen", "go for a walk"]] }),
      p("Nachdem sie angekommen war, rief sie ihre Mutter an.", "After she had arrived, she called her mother."),
      p("Bevor wir abgefahren sind, haben wir alle Fenster geschlossen.", "Before we left, we closed all the windows.", { words: [["bevor", "before"]] }),
      p("Bevor du reist, solltest du die Adresse aufschreiben.", "Before you travel, you should write the address down."),
      p("Während ich im Hotel war, regnete es jeden Tag.", "While I was at the hotel, it rained every day.", { words: [["während", "while"]], note: "As a conjunction 'während' means 'while'; as a preposition (Unit 28) it means 'during'." }),
      p("Während der Bus fuhr, schlief er ein.", "While the bus was moving, he fell asleep.", { words: [["einschlafen", "fall asleep"]] }),
      p("Was habt ihr gemacht, nachdem ihr ausgecheckt hattet?", "What did you do after you'd checked out?", { words: [["auschecken", "check out"]] }),
    ],
    dialogue: [
      tutor("Was habt ihr gemacht, nachdem ihr ausgecheckt hattet?", "What did you do after you'd checked out?"),
      you("Nachdem wir ausgecheckt hatten, gingen wir in die Altstadt.", "Say after you'd checked out, you went to the old town.", ["Wir gingen in die Altstadt.", "Wir sind zum Bahnhof gegangen."]),
      tutor("Und habt ihr vorher die Fenster zugemacht?", "And did you shut the windows beforehand?"),
      you("Ja, bevor wir abgefahren sind, haben wir alle Fenster geschlossen.", "Say yes, you closed all the windows before you left.", ["Ja, natürlich.", "Ja, bevor wir abgefahren sind."]),
      tutor("Und wie war das Wetter?", "And how was the weather?"),
      you("Während ich im Hotel war, regnete es jeden Tag.", "Say it rained every day while you were at the hotel.", ["Es regnete jeden Tag.", "Das Wetter war schön."]),
    ],
  },
  {
    title: "Cultural differences",
    intro:
      "Every country has its own habits: greetings, punctuality, how direct people are. To compare cultures, use 'In Deutschland …, bei uns …', 'Es ist üblich, dass …' (It's usual that …) and 'Mir ist aufgefallen, dass …' (I've noticed that …).",
    phrases: [
      p("In Deutschland ist man meistens sehr pünktlich.", "In Germany people are usually very punctual.", { words: [["meistens", "usually, mostly"], ["pünktlich", "punctual"]] }),
      p("Bei uns gibt man sich zur Begrüßung einen Kuss.", "Where I'm from, people greet each other with a kiss.", { words: [["bei uns", "where I'm from, at home"], ["Begrüßung", "greeting"], ["Kuss", "kiss"]] }),
      p("Mir ist aufgefallen, dass die Geschäfte sonntags geschlossen sind.", "I've noticed that the shops are closed on Sundays.", { words: [["auffallen", "be noticeable, strike"], ["sonntags", "on Sundays"]] }),
      p("Es ist üblich, dass man die Schuhe auszieht.", "It's customary to take your shoes off.", { words: [["üblich", "usual, customary"], ["ausziehen", "take off"]] }),
      p("Die Deutschen sagen sehr direkt, was sie denken.", "Germans say very directly what they think.", { words: [["direkt", "directly"]] }),
      p("In meinem Land isst man viel später zu Abend.", "In my country people have dinner much later.", { words: [["zu Abend essen", "have dinner"]] }),
      p("Das war am Anfang ungewohnt für mich.", "That was unfamiliar to me at first.", { words: [["am Anfang", "at first"], ["ungewohnt", "unfamiliar, unusual"]] }),
    ],
    dialogue: [
      tutor("Was ist in Deutschland anders als in deinem Land?", "What's different in Germany compared to your country?"),
      you("In Deutschland ist man meistens sehr pünktlich.", "Say people in Germany are usually very punctual.", ["Mir ist aufgefallen, dass die Geschäfte sonntags geschlossen sind."]),
      tutor("Und wie begrüßt man sich bei euch?", "And how do people greet each other where you're from?"),
      you("Bei uns gibt man sich zur Begrüßung einen Kuss.", "Say people greet each other with a kiss.", ["Bei uns gibt man sich die Hand.", "Bei uns umarmt man sich."]),
      tutor("Und beim Essen?", "And when it comes to meals?"),
      you("In meinem Land isst man viel später zu Abend.", "Say people in your country have dinner much later.", ["Bei uns isst man später.", "In {country} isst man später zu Abend."]),
    ],
  },
  {
    title: "Misunderstandings abroad",
    intro:
      "Misunderstandings happen to every traveller. These phrases help you clear them up on the spot, and tell the story afterwards with the past tenses you know: Präteritum for the story itself, Plusquamperfekt for what had happened before.",
    phrases: [
      p("Da habe ich Sie wohl falsch verstanden.", "I must have misunderstood you.", { words: [["wohl", "probably"], ["falsch verstehen", "misunderstand"]] }),
      p("Das war ein Missverständnis.", "That was a misunderstanding.", { words: [["Missverständnis", "misunderstanding"]] }),
      p("Ich hatte gedacht, das Frühstück wäre inklusive.", "I had thought breakfast was included.", { words: [["inklusive", "included"]] }),
      p("Wie meinen Sie das?", "What do you mean by that?"),
      p("In meinem Land bedeutet diese Geste etwas ganz anderes.", "In my country this gesture means something completely different.", { words: [["bedeuten", "mean"], ["Geste", "gesture"]] }),
      p("Alle lachten, und ich wurde rot.", "Everyone laughed and I went red.", { words: [["rot werden", "go red, blush"]] }),
      p("Am Ende haben wir beide darüber gelacht.", "In the end we both laughed about it.", { words: [["darüber", "about it"]] }),
    ],
    dialogue: [
      tutor("Das Frühstück kostet fünfzehn Euro extra.", "Breakfast costs fifteen euros extra."),
      you("Oh, ich hatte gedacht, das Frühstück wäre inklusive.", "Say you had thought breakfast was included.", ["Ich dachte, das Frühstück ist inklusive.", "Wie meinen Sie das?"]),
      tutor("Nein, leider nicht. Das steht auch auf der Website.", "No, unfortunately not. It says so on the website, too."),
      you("Da habe ich Sie wohl falsch verstanden.", "Say you must have misunderstood.", ["Das war ein Missverständnis.", "Dann habe ich das falsch verstanden."]),
      tutor("Kein Problem. Möchten Sie trotzdem frühstücken?", "No problem. Would you still like breakfast?"),
      you("Ja, gern.", "Say yes please.", ["Nein, danke.", "Ja, bitte."]),
    ],
  },
]);
