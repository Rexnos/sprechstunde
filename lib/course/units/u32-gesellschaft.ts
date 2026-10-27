import { defineUnit, p, tutor, you } from "../define";

export const unit32 = defineUnit(32, "B1", "Gesellschaft und Politik", "Read and talk about history, elections and volunteering with the passive in the past and infinitives with zu, and give a short presentation.", [
  {
    title: "The passive in the past: wurde gebaut",
    intro:
      "The passive in the past uses the Präteritum of 'werden': 'Das Rathaus wurde 1900 gebaut.' This is the form you'll read in the news and in history texts. On its own 'wurde' means 'became'; with a participle at the end it means 'was done'.",
    grammar: {
      title: "Passiv Präteritum: wurde + Partizip II",
      text: "Add the person who does it with von + dative: Das Gesetz wurde vom Parlament beschlossen.",
      table: [
        ["", "werden (Präteritum)", "Example"],
        ["ich", "wurde", "Ich wurde gefragt."],
        ["du", "wurdest", "Du wurdest gewählt."],
        ["er / sie / es", "wurde", "Die Brücke wurde gebaut."],
        ["wir / sie / Sie", "wurden", "Wir wurden eingeladen."],
        ["ihr", "wurdet", "Ihr wurdet gesehen."],
      ],
    },
    phrases: [
      p("Die Mauer wurde 1989 geöffnet.", "The Berlin Wall was opened in 1989.", { accept: ["Die Mauer wurde neunzehnhundertneunundachtzig geöffnet."], words: [["Mauer", "wall"], ["öffnen", "open"]], note: "Years are read in hundreds: neunzehnhundertneunundachtzig." }),
      p("Das Rathaus wurde im Krieg zerstört.", "The town hall was destroyed in the war.", { words: [["Rathaus", "town hall"], ["Krieg", "war"], ["zerstören", "destroy"]] }),
      p("Danach wurde es wieder aufgebaut.", "Afterwards it was rebuilt.", { words: [["aufbauen", "build up, rebuild"]] }),
      p("Die neue Bürgermeisterin wurde gestern gewählt.", "The new mayor was elected yesterday.", { words: [["Bürgermeisterin", "mayor (female)"], ["wählen", "elect, vote"]] }),
      p("Das Gesetz wurde vom Parlament beschlossen.", "The law was passed by parliament.", { words: [["Gesetz", "law"], ["beschließen", "pass, decide"]] }),
      p("Wir wurden zur Eröffnung eingeladen.", "We were invited to the opening.", { words: [["Eröffnung", "opening"]] }),
      p("Wann wurde die Brücke gebaut?", "When was the bridge built?", { words: [["Brücke", "bridge"]] }),
    ],
    dialogue: [
      tutor("Was ist das für ein schönes Gebäude?", "What's that beautiful building?"),
      you("Das ist das Rathaus. Es wurde im Krieg zerstört.", "Say it's the town hall and it was destroyed in the war.", ["Das ist das Rathaus.", "Es wurde im Krieg zerstört."]),
      tutor("Aber es sieht ganz neu aus!", "But it looks brand new!"),
      you("Ja, danach wurde es wieder aufgebaut.", "Say yes, it was rebuilt afterwards.", ["Es wurde wieder aufgebaut."]),
      tutor("Gibt es Neuigkeiten aus dem Rathaus?", "Any news from the town hall?"),
      you("Die neue Bürgermeisterin wurde gestern gewählt.", "Say the new mayor was elected yesterday.", ["Wir haben eine neue Bürgermeisterin.", "Ja, gestern wurde gewählt."]),
    ],
  },
  {
    title: "Passive in the Perfekt and elections",
    intro:
      "In conversation the passive often appears in the Perfekt: 'ist … worden'. Careful: it's 'worden', not 'geworden', and the helper is always 'sein': 'Die Straße ist repariert worden.' In Germany you vote ('wählen') in local, state and federal elections, often by 'Briefwahl' (postal vote).",
    grammar: {
      title: "The passive in three tenses",
      text: "In a main clause in the Perfekt passive, worden is the very last word.",
      table: [
        ["Tense", "Example"],
        ["Präsens", "Die Straße wird repariert."],
        ["Präteritum", "Die Straße wurde repariert."],
        ["Perfekt", "Die Straße ist repariert worden."],
      ],
    },
    phrases: [
      p("Die Schule ist renoviert worden.", "The school has been renovated.", { words: [["renovieren", "renovate"], ["worden", "been (passive)"]] }),
      p("Mein Fahrrad ist gestohlen worden!", "My bike has been stolen!", { words: [["stehlen", "steal"]] }),
      p("Ist der Termin schon festgelegt worden?", "Has the date been set yet?", { words: [["festlegen", "set, fix"]] }),
      p("Am Sonntag wird ein neues Parlament gewählt.", "On Sunday a new parliament will be elected.", { words: [["Parlament", "parliament"]] }),
      p("Darfst du in Deutschland wählen?", "Are you allowed to vote in Germany?"),
      p("Ich habe per Briefwahl gewählt.", "I voted by post.", { words: [["Briefwahl", "postal vote"]] }),
      p("Welche Partei hat die Wahl gewonnen?", "Which party won the election?", { words: [["Partei", "(political) party"], ["Wahl", "election"]] }),
    ],
    dialogue: [
      tutor("Hast du schon gehört? Die Schule ist renoviert worden.", "Have you heard? The school has been renovated."),
      you("Ja, und das Rathaus ist auch neu gestrichen worden.", "Say yes, and the town hall has been repainted too.", ["Ja, das habe ich gehört.", "Endlich!"]),
      tutor("Am Sonntag ist Wahl. Darfst du in Deutschland wählen?", "There's an election on Sunday. Are you allowed to vote in Germany?"),
      you("Ja, ich habe schon per Briefwahl gewählt.", "Say yes, you've already voted by post.", ["Nein, ich darf leider nicht wählen.", "Ja, ich gehe am Sonntag wählen."]),
      tutor("Welche Partei wird wohl gewinnen?", "Which party do you think will win?"),
      you("Ich weiß es nicht. Das ist schwer zu sagen.", "Say you don't know, it's hard to say.", ["Keine Ahnung.", "Das ist schwer zu sagen."]),
    ],
  },
  {
    title: "Volunteering: infinitives with zu",
    intro:
      "Many verbs and expressions are followed by 'zu' + infinitive at the end: 'Ich habe vor, …' (I plan to), 'Ich habe keine Lust, …', 'Es ist wichtig, …'. With separable verbs, 'zu' goes in the middle: 'mitzumachen', 'anzufangen'. Lots of people in Germany volunteer ('ehrenamtlich arbeiten') in clubs, food banks or the fire brigade.",
    grammar: {
      title: "zu + infinitive",
      text: "A comma separates the infinitive clause. Modal verbs never take zu: Ich will helfen, but Ich habe vor zu helfen.",
      table: [
        ["Expression", "zu + infinitive at the end"],
        ["Ich habe vor,", "mich ehrenamtlich zu engagieren."],
        ["Es ist wichtig,", "anderen Menschen zu helfen."],
        ["Ich habe keine Zeit,", "jede Woche mitzumachen."],
        ["Hast du Lust,", "am Samstag mitzukommen?"],
      ],
    },
    phrases: [
      p("Ich habe vor, mich ehrenamtlich zu engagieren.", "I'm planning to do voluntary work.", { words: [["vorhaben", "plan, intend"], ["sich engagieren", "get involved"], ["ehrenamtlich", "voluntary, unpaid"]] }),
      p("Es ist wichtig, anderen Menschen zu helfen.", "It's important to help other people."),
      p("Ich arbeite ehrenamtlich bei der Tafel.", "I volunteer at the food bank.", { words: [["Tafel", "food bank"]] }),
      p("Hast du Lust, am Samstag mitzukommen?", "Do you feel like coming along on Saturday?", { words: [["Lust haben", "feel like"], ["mitkommen", "come along"]] }),
      p("Es macht mir Spaß, mit Kindern zu arbeiten.", "I enjoy working with children."),
      p("Ich versuche, jede Woche zwei Stunden zu helfen.", "I try to help for two hours every week.", { accept: ["Ich versuche, jede Woche 2 Stunden zu helfen."], words: [["versuchen", "try"]] }),
      p("Vergiss nicht, dich vorher anzumelden!", "Don't forget to register beforehand!", { words: [["sich anmelden", "register, sign up"]] }),
    ],
    dialogue: [
      tutor("Was machst du am Wochenende?", "What are you doing at the weekend?"),
      you("Ich arbeite ehrenamtlich bei der Tafel.", "Say you volunteer at the food bank.", ["Ich helfe bei der Tafel.", "Ich habe vor, mich ehrenamtlich zu engagieren."]),
      tutor("Toll! Warum machst du das?", "Great! Why do you do that?"),
      you("Es ist wichtig, anderen Menschen zu helfen.", "Say it's important to help other people.", ["Es macht mir Spaß, Menschen zu helfen."]),
      tutor("Kann ich auch mal mitkommen?", "Can I come along sometime?"),
      you("Klar! Hast du Lust, am Samstag mitzukommen?", "Say sure, and ask if they feel like coming along on Saturday.", ["Hast du Lust, am Samstag mitzukommen?", "Gern, vergiss nicht, dich vorher anzumelden."]),
    ],
  },
  {
    title: "Giving a short presentation",
    intro:
      "At B1 you'll often have to give a short presentation, for example in the B1 exam. Structure it clearly: introduce the topic, talk about your experience, name the pros and cons and finish with your opinion. These set phrases help you move from one part to the next.",
    phrases: [
      p("Ich möchte heute über das Thema Ehrenamt sprechen.", "Today I'd like to talk about volunteering.", { words: [["Thema", "topic"], ["Ehrenamt", "volunteering, voluntary work"]] }),
      p("Zuerst erzähle ich von meinen eigenen Erfahrungen.", "First I'll talk about my own experiences.", { words: [["zuerst", "first"], ["eigenen", "own"]] }),
      p("Danach möchte ich die Vor- und Nachteile nennen.", "After that I'd like to name the pros and cons.", { words: [["Vorteile", "advantages"], ["Nachteile", "disadvantages"], ["nennen", "name"]] }),
      p("Ein Vorteil ist, dass man neue Leute kennenlernt.", "One advantage is that you meet new people."),
      p("Ein Nachteil ist, dass es viel Zeit kostet.", "One disadvantage is that it takes a lot of time.", { words: [["kosten", "cost, take (time)"]] }),
      p("Zum Schluss möchte ich meine Meinung sagen.", "Finally, I'd like to give my opinion.", { words: [["zum Schluss", "finally, to finish"]] }),
      p("Vielen Dank für Ihre Aufmerksamkeit!", "Thank you for your attention!", { words: [["Aufmerksamkeit", "attention"]] }),
    ],
    dialogue: [
      tutor("Sie haben jetzt drei Minuten. Bitte beginnen Sie.", "You have three minutes now. Please begin."),
      you("Ich möchte heute über das Thema {thing} sprechen.", "Introduce your topic.", ["Ich möchte heute über das Thema Ehrenamt sprechen."]),
      tutor("Gut. Wie ist Ihr Vortrag aufgebaut?", "Good. How is your talk structured?"),
      you("Zuerst erzähle ich von meinen eigenen Erfahrungen.", "Say first you'll talk about your own experiences.", ["Danach möchte ich die Vor- und Nachteile nennen."]),
      tutor("Sehr schön. Bitte kommen Sie jetzt zum Schluss.", "Very nice. Please wrap up now."),
      you("Vielen Dank für Ihre Aufmerksamkeit!", "Thank the audience for their attention.", ["Danke fürs Zuhören!", "Vielen Dank!"]),
    ],
  },
]);
