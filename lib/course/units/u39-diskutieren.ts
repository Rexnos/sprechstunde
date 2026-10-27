import { defineUnit, p, tutor, you } from "../define";

export const unit39 = defineUnit(39, "B2", "Diskutieren und Argumentieren", "Build an argument, concede and contrast points with B2 connectors, and take part politely in a debate.", [
  {
    title: "Conceding a point: zwar … aber, dennoch",
    intro:
      "Good arguments admit the other side before disagreeing. 'zwar … aber' says 'admittedly …, but': 'Das Auto ist zwar praktisch, aber schlecht für die Umwelt.' 'dennoch' is a more formal 'trotzdem' (nevertheless) and 'allerdings' adds a limitation.",
    grammar: {
      title: "Concessive connectors",
      text: "zwar sits in the middle of the first clause; dennoch and allerdings in position 1 send the verb to position 2.",
      table: [
        ["Connector", "Meaning", "Example"],
        ["zwar … aber", "admittedly … but", "Das ist zwar teuer, aber gut."],
        ["dennoch", "nevertheless", "Es regnete. Dennoch gingen wir los."],
        ["allerdings", "however, though", "Das stimmt, allerdings ist es teuer."],
      ],
    },
    phrases: [
      p("Das Auto ist zwar praktisch, aber schlecht für die Umwelt.", "The car may be practical, but it's bad for the environment.", { words: [["zwar … aber", "admittedly … but"], ["Umwelt", "environment"]] }),
      p("Die Idee ist gut. Dennoch habe ich Zweifel.", "The idea is good. Nevertheless, I have doubts.", { words: [["dennoch", "nevertheless"], ["Zweifel", "doubts"]] }),
      p("Das stimmt, allerdings muss man auch die Kosten sehen.", "That's true, but you also have to consider the costs.", { words: [["allerdings", "however, though"]] }),
      p("Zwar verdient er viel, aber er ist nicht glücklich.", "He does earn a lot, but he isn't happy.", { note: "zwar in position 1 also works; the verb follows directly." }),
      p("Es gibt zwar Fortschritte, dennoch bleibt viel zu tun.", "There is some progress, but there's still a lot to do.", { words: [["Fortschritte", "progress"]] }),
      p("Ich verstehe deinen Punkt, sehe das aber anders.", "I understand your point, but I see it differently."),
      p("Das mag sein, aber es löst das Problem nicht.", "That may be, but it doesn't solve the problem.", { words: [["mag sein", "may be"]] }),
    ],
    dialogue: [
      tutor("Ich finde, jeder sollte ein Auto haben.", "I think everyone should have a car."),
      you("Das Auto ist zwar praktisch, aber schlecht für die Umwelt.", "Concede that cars are practical, but say they're bad for the environment.", ["Ich sehe das anders."]),
      tutor("Aber auf dem Land braucht man eins!", "But in the countryside you need one!"),
      you("Das stimmt, allerdings muss man auch die Kosten sehen.", "Agree, but say you also have to consider the costs.", ["Das mag sein, aber es löst das Problem nicht."]),
      tutor("Elektroautos sind doch die Lösung.", "Electric cars are the solution, surely."),
      you("Die Idee ist gut. Dennoch habe ich Zweifel.", "Say the idea is good, but you nevertheless have doubts.", ["Ich verstehe deinen Punkt, sehe das aber anders."]),
    ],
  },
  {
    title: "Contrasts: während, wohingegen, dagegen",
    intro:
      "To set two things side by side, use 'während' or the more formal 'wohingegen' (both send the verb to the end), the adverb 'dagegen', or 'im Gegensatz zu' + dative. Careful: 'während' also means 'while' in time, so context decides.",
    grammar: {
      title: "Adversative connectors",
      text: "während and wohingegen are subordinating; dagegen is an adverb and can stand right after the subject.",
      table: [
        ["Connector", "Type", "Example"],
        ["während", "verb at the end", "Während sie gern liest, sieht er lieber fern."],
        ["wohingegen", "verb at the end", "Er ist ruhig, wohingegen sie laut ist."],
        ["dagegen", "adverb", "Im Süden dagegen regnet es kaum."],
        ["im Gegensatz zu", "preposition + dative", "im Gegensatz zu früher"],
      ],
    },
    phrases: [
      p("Während in der Stadt alles teurer wird, sind die Mieten auf dem Land gesunken.", "While everything in the city is getting more expensive, rents in the countryside have fallen.", { words: [["Mieten", "rents"], ["gesunken", "fallen"]] }),
      p("Mein Bruder arbeitet gern im Team, wohingegen ich lieber allein arbeite.", "My brother likes working in a team, whereas I prefer working alone.", { words: [["wohingegen", "whereas"]] }),
      p("Im Gegensatz zu früher lesen viele Leute keine Zeitung mehr.", "Unlike in the past, many people no longer read a newspaper.", { words: [["im Gegensatz zu", "unlike, in contrast to"]] }),
      p("Die Jüngeren sind dafür, die Älteren dagegen sind skeptisch.", "The younger ones are in favour, whereas the older ones are sceptical.", { words: [["dafür", "in favour"], ["skeptisch", "sceptical"]] }),
      p("Während die einen protestieren, schweigen die anderen.", "While some protest, others keep quiet.", { words: [["die einen … die anderen", "some … others"], ["schweigen", "keep quiet"]] }),
      p("Im Norden regnet es viel, im Süden dagegen kaum.", "In the north it rains a lot, but in the south hardly at all."),
      p("Er ist sehr ruhig, wohingegen seine Schwester laut ist.", "He's very quiet, whereas his sister is loud."),
    ],
    dialogue: [
      tutor("Wie unterscheiden sich Stadt und Land?", "How do town and country differ?"),
      you("Während in der Stadt alles teurer wird, sind die Mieten auf dem Land gesunken.", "Say that while everything in the city is getting more expensive, rents in the countryside have fallen.", ["In der Stadt ist es teuer, auf dem Land dagegen billiger."]),
      tutor("Und in deiner Familie? Arbeiten alle gern im Team?", "And in your family? Does everyone like working in a team?"),
      you("Mein Bruder arbeitet gern im Team, wohingegen ich lieber allein arbeite.", "Say your brother likes working in a team, whereas you prefer working alone.", ["Ich arbeite lieber allein."]),
      tutor("Liest du eigentlich noch Zeitung?", "Do you actually still read a newspaper?"),
      you("Nein, im Gegensatz zu früher lese ich alles online.", "Say no, unlike in the past you read everything online.", ["Ja, jeden Tag.", "Nein, nicht mehr."]),
    ],
  },
  {
    title: "Structuring an argument",
    intro:
      "In a discussion or an essay you state your position, weigh up both sides, add points and examples and then draw a conclusion. These set phrases give your German a clear structure and buy you a moment to think.",
    grammar: {
      title: "Phrases for building an argument",
      text: "'Ich bin der Ansicht, dass …' and 'Hinzu kommt, dass …' are followed by a dass clause.",
      table: [
        ["Function", "Expression"],
        ["giving your view", "Ich bin der Ansicht, dass …"],
        ["weighing up", "Einerseits … andererseits …"],
        ["adding a point", "Hinzu kommt, dass …"],
        ["giving an example", "Ein gutes Beispiel dafür ist …"],
        ["concluding", "Alles in allem …"],
      ],
    },
    phrases: [
      p("Ich bin der Ansicht, dass Bildung kostenlos sein sollte.", "I believe that education should be free.", { words: [["der Ansicht sein", "be of the opinion"], ["kostenlos", "free (of charge)"]] }),
      p("Einerseits spart man Zeit, andererseits fehlt der persönliche Kontakt.", "On the one hand you save time, on the other you lose personal contact.", { words: [["einerseits … andererseits", "on the one hand … on the other"]] }),
      p("Hinzu kommt, dass die Kosten ständig steigen.", "On top of that, costs keep rising.", { words: [["hinzu kommt", "on top of that"], ["ständig", "constantly"]] }),
      p("Ein gutes Beispiel dafür ist die Schweiz.", "A good example of this is Switzerland."),
      p("Alles in allem überwiegen die Vorteile.", "All in all, the pros outweigh the cons.", { words: [["alles in allem", "all in all"], ["überwiegen", "outweigh, predominate"]] }),
      p("Daraus folgt, dass wir handeln müssen.", "It follows that we have to act.", { words: [["daraus folgt", "it follows"], ["handeln", "act"]] }),
      p("Man darf nicht vergessen, dass viele Menschen betroffen sind.", "We mustn't forget that many people are affected.", { words: [["betroffen", "affected"]] }),
    ],
    dialogue: [
      tutor("Sollte das Studium kostenlos sein? Was meinst du?", "Should university be free? What do you think?"),
      you("Ich bin der Ansicht, dass Bildung kostenlos sein sollte.", "Say you believe education should be free.", ["Ich bin der Ansicht, dass das Studium kostenlos sein sollte.", "Ich bin dagegen."]),
      tutor("Aber das kostet den Staat sehr viel Geld.", "But that costs the state a lot of money."),
      you("Einerseits kostet es viel Geld, andererseits profitiert die ganze Gesellschaft.", "Weigh it up: on the one hand it costs a lot, on the other the whole of society benefits.", ["Das stimmt, aber die ganze Gesellschaft profitiert."]),
      tutor("Und was ist dein Fazit?", "And what's your conclusion?"),
      you("Alles in allem überwiegen die Vorteile.", "Say all in all the pros outweigh the cons.", ["Alles in allem bin ich dafür."]),
    ],
  },
  {
    title: "Debating politely",
    intro:
      "In a German discussion it's normal to disagree openly, but politely. You'll need to break in, hold the floor, disagree, agree in part and steer back to the topic. In formal debates people use Sie, even when they disagree strongly.",
    grammar: {
      title: "Managing a discussion",
      text: "Konjunktiv II (Könnten Sie …?) makes questions and interruptions more polite.",
      table: [
        ["Function", "Expression"],
        ["interrupting", "Darf ich kurz unterbrechen?"],
        ["keeping the floor", "Lassen Sie mich bitte ausreden."],
        ["disagreeing", "Da muss ich Ihnen widersprechen."],
        ["partly agreeing", "Da haben Sie teilweise recht, aber …"],
        ["back to the topic", "Um auf … zurückzukommen: …"],
      ],
    },
    phrases: [
      p("Entschuldigung, darf ich kurz unterbrechen?", "Sorry, may I interrupt for a moment?", { words: [["unterbrechen", "interrupt"]] }),
      p("Lassen Sie mich bitte ausreden.", "Please let me finish.", { words: [["ausreden", "finish speaking"]] }),
      p("Da muss ich Ihnen widersprechen.", "I have to disagree with you there.", { words: [["widersprechen", "contradict, disagree with (+ dative)"]] }),
      p("Da haben Sie teilweise recht, aber das ist nicht alles.", "You're partly right there, but that's not the whole story.", { words: [["teilweise", "partly"]] }),
      p("Um auf Ihre Frage zurückzukommen: Die Antwort ist nein.", "To come back to your question: the answer is no.", { words: [["zurückkommen auf", "come back to"]] }),
      p("Das ist ein wichtiger Punkt.", "That's an important point."),
      p("Könnten Sie das genauer erklären?", "Could you explain that in more detail?", { words: [["genauer", "in more detail"]] }),
    ],
    dialogue: [
      tutor("Ich glaube, Homeoffice macht die Leute faul, und außerdem …", "I think working from home makes people lazy, and besides …"),
      you("Entschuldigung, darf ich kurz unterbrechen?", "Interrupt politely.", ["Darf ich kurz unterbrechen?"]),
      tutor("Bitte, aber ich war noch nicht fertig.", "Go ahead, but I hadn't finished."),
      you("Da muss ich Ihnen widersprechen. Viele arbeiten zu Hause mehr.", "Disagree politely and say many people work more at home.", ["Da muss ich Ihnen widersprechen."]),
      tutor("Das ist ein wichtiger Punkt. Aber die Teamarbeit leidet.", "That's an important point. But teamwork suffers."),
      you("Da haben Sie teilweise recht, aber das ist nicht alles.", "Say they're partly right, but that's not the whole story.", ["Da haben Sie teilweise recht."]),
    ],
  },
]);
