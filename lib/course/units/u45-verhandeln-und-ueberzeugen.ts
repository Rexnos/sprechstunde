import { defineUnit, p, tutor, you } from "../define";

export const unit45 = defineUnit(45, "C1", "Verhandeln und Überzeugen", "Negotiate diplomatically: use conditional clauses without 'wenn', soften criticism, hedge your claims and steer towards a deal.", [
  {
    title: "If … without 'wenn'",
    intro:
      "In formal German you can drop 'wenn' and put the verb first: 'Sollten Sie Fragen haben, melden Sie sich gern.' The main clause often starts with 'so' or 'dann', or simply with its verb. 'Sollten' adds a polite 'should it happen that', and 'Hätten wir das gewusst, …' is an elegant way to speak about things that didn't happen.",
    grammar: {
      title: "Verb-first conditionals",
      text: "The conjugated verb moves to position 1. Everything else stays where it was.",
      table: [
        ["with wenn / falls", "without wenn"],
        ["Wenn Sie Fragen haben, …", "Haben Sie Fragen, …"],
        ["Falls Sie Fragen haben sollten, …", "Sollten Sie Fragen haben, …"],
        ["Wenn wir das gewusst hätten, …", "Hätten wir das gewusst, …"],
        ["Wenn der Preis niedriger wäre, …", "Wäre der Preis niedriger, …"],
        ["Wenn die Lieferung zu spät kommt, …", "Kommt die Lieferung zu spät, …"],
      ],
    },
    phrases: [
      p("Sollten Sie Fragen haben, melden Sie sich gern.", "Should you have any questions, feel free to get in touch.", { words: [["sollten Sie", "should you"], ["sich melden", "get in touch"]] }),
      p("Hätten wir das früher gewusst, hätten wir anders geplant.", "Had we known that earlier, we would have planned differently."),
      p("Sollte sich etwas ändern, informieren wir Sie umgehend.", "Should anything change, we'll inform you immediately.", { words: [["umgehend", "immediately, promptly"]] }),
      p("Wäre der Preis etwas niedriger, könnten wir sofort unterschreiben.", "Were the price a little lower, we could sign right away.", { words: [["niedriger", "lower"], ["unterschreiben", "sign"]] }),
      p("Kommt die Lieferung zu spät, zahlen wir eine Vertragsstrafe.", "If the delivery is late, we pay a contractual penalty.", { words: [["Lieferung", "delivery"], ["Vertragsstrafe", "contractual penalty"]] }),
      p("Hätte ich Zeit gehabt, wäre ich gekommen.", "If I'd had time, I would have come."),
      p("Sollte das nicht möglich sein, finden wir eine andere Lösung.", "If that isn't possible, we'll find another solution.", { words: [["Lösung", "solution"]] }),
    ],
    dialogue: [
      tutor("Wir können leider erst im März liefern.", "Unfortunately we can't deliver until March."),
      you("Hätten wir das früher gewusst, hätten wir anders geplant.", "Say had you known earlier, you would have planned differently.", ["Hätten wir das gewusst, hätten wir früher bestellt."]),
      tutor("Das tut mir leid. Sollte sich etwas ändern, melde ich mich sofort.", "I'm sorry. Should anything change, I'll get in touch immediately."),
      you("Gut. Sollte das nicht möglich sein, brauchen wir eine andere Lösung.", "Say fine, but if that isn't possible you'll need another solution.", ["Sollte das nicht klappen, suchen wir einen anderen Lieferanten."]),
      tutor("Verstehe. Wir prüfen alle Optionen.", "Understood. We'll look into all the options."),
      you("Sollten Sie Fragen haben, melden Sie sich gern.", "Say should they have any questions, they should feel free to get in touch.", ["Melden Sie sich gern bei Fragen."]),
    ],
  },
  {
    title: "Diplomatic language",
    intro:
      "In negotiations, how you say no matters as much as what you say. Konjunktiv II, softening words ('etwas', 'nicht ganz', 'leider') and questions instead of demands make criticism easier to accept. 'Das ist falsch' becomes 'Das sehe ich etwas anders', and 'Das geht nicht' becomes 'Das dürfte schwierig werden'.",
    grammar: {
      title: "Direct → diplomatic",
      text: "The diplomatic version says the same thing but leaves the other side room to move.",
      table: [
        ["direct", "diplomatic"],
        ["Das ist falsch.", "Das sehe ich etwas anders."],
        ["Das geht nicht.", "Das dürfte schwierig werden."],
        ["Das ist zu teuer.", "Das übersteigt leider unser Budget."],
        ["Sie haben das vergessen.", "Da ist wohl etwas untergegangen."],
        ["Wir wollen …", "Uns wäre wichtig, dass …"],
      ],
    },
    phrases: [
      p("Ich hätte da noch eine kleine Anmerkung.", "I'd have one small remark.", { words: [["Anmerkung", "remark, comment"]] }),
      p("Wäre es denkbar, den Termin um eine Woche zu verschieben?", "Would it be conceivable to postpone the date by a week?", { words: [["denkbar", "conceivable"]] }),
      p("Da muss ich Ihnen leider widersprechen.", "I'm afraid I have to disagree with you there.", { words: [["widersprechen", "contradict, disagree"]] }),
      p("Ich verstehe Ihren Standpunkt, sehe das aber etwas anders.", "I understand your point of view, but I see it a little differently.", { words: [["Standpunkt", "point of view"]] }),
      p("Das ist nicht ganz das, was wir uns vorgestellt hatten.", "That's not quite what we had in mind.", { words: [["sich vorstellen", "imagine, have in mind"]] }),
      p("Vielleicht sollten wir das noch einmal in Ruhe besprechen.", "Perhaps we should discuss this again calmly.", { words: [["in Ruhe", "calmly, without rushing"]] }),
      p("Ihr Vorschlag ist durchaus interessant.", "Your proposal is certainly interesting.", { words: [["durchaus", "certainly, quite"], ["Vorschlag", "proposal"]], note: "Often followed by 'aber …'." }),
    ],
    dialogue: [
      tutor("Unser Angebot: Lieferung in sechs Wochen, Preis wie besprochen.", "Our offer: delivery in six weeks, price as discussed."),
      you("Ihr Vorschlag ist durchaus interessant, aber das ist nicht ganz das, was wir uns vorgestellt hatten.", "Say the proposal is certainly interesting, but not quite what you had in mind.", ["Das ist nicht ganz das, was wir uns vorgestellt hatten."]),
      tutor("Was schwebt Ihnen denn vor?", "What do you have in mind, then?"),
      you("Wäre es denkbar, in vier Wochen zu liefern?", "Ask whether delivery in four weeks would be conceivable.", ["Wäre eine Lieferung in vier Wochen denkbar?"]),
      tutor("Das dürfte schwierig werden.", "That's likely to be difficult."),
      you("Ich verstehe Ihren Standpunkt. Vielleicht finden wir einen Mittelweg.", "Say you understand their position and suggest finding a middle way.", ["Vielleicht sollten wir das noch einmal in Ruhe besprechen."]),
    ],
  },
  {
    title: "Softening and hedging",
    intro:
      "Hedges protect you from saying more than you can stand behind. 'Soweit ich weiß' limits a claim to your knowledge, 'ich würde sagen' turns a fact into an opinion, and 'unter Umständen' makes an offer conditional. Used well, they make you sound careful rather than vague.",
    grammar: {
      title: "Useful hedges",
      text: "One hedge per sentence is usually enough. Stack three and you sound evasive.",
      table: [
        ["hedge", "effect"],
        ["soweit ich weiß", "limits the claim to your knowledge"],
        ["ich würde sagen", "turns a fact into an opinion"],
        ["unter Umständen", "makes an offer conditional"],
        ["tendenziell, eher", "weakens a trend"],
        ["gewissermaßen", "in a way, so to speak"],
        ["es scheint, als …", "presents a conclusion carefully"],
      ],
    },
    phrases: [
      p("Soweit ich weiß, ist das Budget schon verplant.", "As far as I know, the budget is already allocated.", { words: [["soweit", "as far as"], ["verplant", "allocated, spoken for"]] }),
      p("Ich würde sagen, wir liegen im Großen und Ganzen im Zeitplan.", "I'd say we're more or less on schedule.", { words: [["im Großen und Ganzen", "by and large"], ["im Zeitplan liegen", "be on schedule"]] }),
      p("Unter Umständen könnten wir Ihnen etwas entgegenkommen.", "We might possibly be able to meet you halfway.", { words: [["unter Umständen", "possibly, under certain circumstances"], ["entgegenkommen", "meet halfway"]] }),
      p("Das ist gewissermaßen ein Kompromiss.", "That is, in a way, a compromise.", { words: [["gewissermaßen", "in a way, so to speak"]] }),
      p("Die Nachfrage ist tendenziell eher rückläufig.", "Demand is, if anything, tending to decline.", { words: [["Nachfrage", "demand"], ["tendenziell", "tending to"], ["rückläufig", "declining"]] }),
      p("Es scheint, als hätte es ein Missverständnis gegeben.", "It seems there has been a misunderstanding.", { note: "'als' + Konjunktiv II with the verb straight after 'als'. With 'als ob' the verb goes last." }),
      p("Wenn ich Sie richtig verstehe, geht es Ihnen vor allem um den Preis.", "If I understand you correctly, your main concern is the price.", { words: [["es geht Ihnen um", "your concern is"]] }),
    ],
    dialogue: [
      tutor("Können Sie uns beim Preis entgegenkommen?", "Can you meet us halfway on the price?"),
      you("Unter Umständen könnten wir Ihnen etwas entgegenkommen.", "Say you might possibly be able to meet them halfway.", ["Unter Umständen wäre das möglich.", "Darüber könnten wir unter Umständen reden."]),
      tutor("Unter welchen Umständen?", "Under what circumstances?"),
      you("Wenn Sie eine größere Menge bestellen.", "Say if they order a larger quantity.", ["Bei einer größeren Bestellmenge.", "Wenn Sie den Vertrag um ein Jahr verlängern."]),
      tutor("Hm. Wir dachten eigentlich, der Rabatt sei schon vereinbart.", "Hm. We actually thought the discount had already been agreed."),
      you("Es scheint, als hätte es ein Missverständnis gegeben.", "Say it seems there's been a misunderstanding.", ["Da gab es wohl ein Missverständnis."]),
    ],
  },
  {
    title: "Closing the deal",
    intro:
      "A negotiation moves from proposals to counter-offers to an agreement. You'll need phrases to propose ('Was halten Sie von …?'), to ask for something in return ('im Gegenzug'), to refuse firmly ('Darauf können wir uns nicht einlassen'), and finally to agree and fix the result in writing.",
    phrases: [
      p("Was halten Sie von folgendem Vorschlag?", "What do you think of the following proposal?", { words: [["halten von", "think of"], ["folgend", "following"]] }),
      p("Wir könnten Ihnen einen Rabatt von zehn Prozent anbieten.", "We could offer you a ten percent discount.", { accept: ["Wir könnten Ihnen einen Rabatt von 10 Prozent anbieten."], words: [["Rabatt", "discount"], ["anbieten", "offer"]] }),
      p("Im Gegenzug erwarten wir eine längere Vertragslaufzeit.", "In return, we expect a longer contract term.", { words: [["im Gegenzug", "in return"], ["Vertragslaufzeit", "contract term"]] }),
      p("Damit können wir leben.", "We can live with that."),
      p("Darauf können wir uns nicht einlassen.", "We can't agree to that.", { words: [["sich einlassen auf", "agree to, get involved in"]] }),
      p("Lassen Sie uns die Eckpunkte schriftlich festhalten.", "Let's put the key points in writing.", { words: [["Eckpunkte", "key points"], ["festhalten", "record"]] }),
      p("Ich denke, wir haben eine Lösung gefunden, mit der beide Seiten zufrieden sind.", "I think we've found a solution both sides are happy with."),
    ],
    dialogue: [
      tutor("Was halten Sie davon: zehn Prozent Rabatt bei drei Jahren Laufzeit?", "What do you think of this: ten percent discount for a three-year term?"),
      you("Drei Jahre sind uns zu lang. Darauf können wir uns nicht einlassen.", "Say three years is too long for you, you can't agree to that.", ["Darauf können wir uns leider nicht einlassen."]),
      tutor("Und zwei Jahre bei acht Prozent?", "And two years at eight percent?"),
      you("Damit können wir leben.", "Say you can live with that.", ["Einverstanden.", "Das klingt fair."]),
      tutor("Wunderbar. Dann sind wir uns einig.", "Wonderful. Then we're agreed."),
      you("Lassen Sie uns die Eckpunkte schriftlich festhalten.", "Suggest putting the key points in writing.", ["Halten wir das schriftlich fest."]),
    ],
  },
]);
