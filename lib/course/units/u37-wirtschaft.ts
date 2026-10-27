import { defineUnit, p, tutor, you } from "../define";

export const unit37 = defineUnit(37, "B2", "Wirtschaft und Konsum", "Switch between nominal and verbal style, use genitive prepositions and stand up for your rights as a consumer.", [
  {
    title: "Nominal style and verbal style",
    intro:
      "Spoken German prefers verbs: 'nachdem wir angekommen waren'. Official letters, contracts and the news prefer nouns: 'nach unserer Ankunft'. This nominal style is shorter and more formal. Recognising it makes formal texts much easier, and using it makes your letters sound professional.",
    grammar: {
      title: "Turning clauses into noun phrases",
      text: "The verb becomes a noun (often -ung), the subject becomes a possessive or a genitive, and the conjunction becomes a preposition.",
      table: [
        ["Verbal style", "Nominal style"],
        ["nachdem wir angekommen waren", "nach unserer Ankunft"],
        ["bevor man bezahlt", "vor der Bezahlung"],
        ["wenn man das Gerät benutzt", "bei der Benutzung des Geräts"],
        ["weil die Preise steigen", "wegen der steigenden Preise"],
        ["um den Service zu verbessern", "zur Verbesserung des Service"],
      ],
    },
    phrases: [
      p("Nach unserer Ankunft haben wir sofort reklamiert.", "After our arrival we complained immediately.", { words: [["Ankunft", "arrival"], ["reklamieren", "complain (about a product)"]] }),
      p("Vor der Bezahlung sollten Sie die Ware prüfen.", "Before paying you should check the goods.", { words: [["Bezahlung", "payment"], ["Ware", "goods"]] }),
      p("Bei der Benutzung des Geräts ist ein Fehler aufgetreten.", "An error occurred while using the device.", { words: [["Benutzung", "use"], ["auftreten", "occur"]] }),
      p("Nach Erhalt der Rechnung haben Sie zwei Wochen Zeit.", "After receiving the invoice you have two weeks.", { accept: ["Nach Erhalt der Rechnung haben Sie 2 Wochen Zeit."], words: [["Erhalt", "receipt (receiving)"], ["Rechnung", "invoice, bill"]] }),
      p("Bei Nichtgefallen erhalten Sie Ihr Geld zurück.", "If you're not satisfied, you get your money back.", { words: [["bei Nichtgefallen", "if you don't like it"]] }),
      p("Zur Verbesserung unseres Service bitten wir um Ihre Meinung.", "To improve our service, we'd like your opinion.", { words: [["Verbesserung", "improvement"], ["bitten um", "ask for"]] }),
      p("Seit der Eröffnung des Ladens hat sich viel verändert.", "A lot has changed since the shop opened.", { words: [["Eröffnung", "opening"], ["Laden", "shop"]] }),
    ],
    dialogue: [
      tutor("Wann haben Sie den Fehler bemerkt?", "When did you notice the fault?"),
      you("Bei der Benutzung des Geräts.", "Say: while using the device (nominal style).", ["Als ich das Gerät benutzt habe."]),
      tutor("Und wann haben Sie sich beschwert?", "And when did you complain?"),
      you("Nach Erhalt der Rechnung.", "Say: after receiving the invoice (nominal style).", ["Nachdem ich die Rechnung bekommen hatte."]),
      tutor("Haben Sie die Ware vor der Bezahlung geprüft?", "Did you check the goods before paying?"),
      you("Nein, leider nicht.", "Say no, unfortunately not.", ["Ja, natürlich.", "Nein."]),
    ],
  },
  {
    title: "Genitive prepositions",
    intro:
      "Formal German has a group of prepositions that take the genitive. You know 'wegen', 'trotz' and 'während'; now add 'aufgrund' (due to), 'infolge' (as a result of), 'innerhalb' (within), 'außerhalb' (outside) and 'angesichts' (in view of). They're everywhere in business letters and news.",
    grammar: {
      title: "More prepositions with the genitive",
      text: "Remember the genitive endings: des Streiks, der Nachfrage, eines Monats.",
      table: [
        ["Preposition", "Meaning", "Example"],
        ["aufgrund", "due to", "aufgrund der hohen Nachfrage"],
        ["infolge", "as a result of", "infolge des Streiks"],
        ["innerhalb", "within", "innerhalb eines Monats"],
        ["außerhalb", "outside", "außerhalb der Öffnungszeiten"],
        ["angesichts", "in view of", "angesichts der Inflation"],
      ],
    },
    phrases: [
      p("Aufgrund der hohen Nachfrage ist das Produkt ausverkauft.", "Due to high demand the product is sold out.", { words: [["Nachfrage", "demand"], ["ausverkauft", "sold out"]] }),
      p("Infolge des Streiks kam es zu Lieferverzögerungen.", "As a result of the strike there were delivery delays.", { words: [["Streik", "strike"], ["Lieferverzögerungen", "delivery delays"]] }),
      p("Sie können die Ware innerhalb eines Monats zurückgeben.", "You can return the goods within a month.", { words: [["zurückgeben", "return"]] }),
      p("Angesichts der Inflation sparen viele Haushalte.", "In view of inflation, many households are saving.", { words: [["Haushalte", "households"], ["sparen", "save"]] }),
      p("Außerhalb der Öffnungszeiten erreichen Sie uns per E-Mail.", "Outside opening hours you can reach us by email.", { words: [["Öffnungszeiten", "opening hours"]] }),
      p("Die Preise sind infolge der Krise stark gestiegen.", "Prices have risen sharply as a result of the crisis.", { words: [["Krise", "crisis"]] }),
      p("Aufgrund eines technischen Problems ist die Seite nicht erreichbar.", "Due to a technical problem the website can't be reached.", { words: [["erreichbar", "reachable"]] }),
    ],
    dialogue: [
      tutor("Ist das neue Handy noch zu haben?", "Is the new phone still available?"),
      you("Nein, aufgrund der hohen Nachfrage ist es ausverkauft.", "Say no, it's sold out due to high demand.", ["Nein, es ist ausverkauft."]),
      tutor("Schade. Und warum kommt meine Bestellung nicht?", "Pity. And why hasn't my order arrived?"),
      you("Infolge des Streiks kam es zu Lieferverzögerungen.", "Say there were delivery delays as a result of the strike.", ["Wegen des Streiks gibt es Verzögerungen."]),
      tutor("Kann ich sie noch zurückgeben?", "Can I still return it?"),
      you("Ja, innerhalb eines Monats.", "Say yes, within a month.", ["Ja, innerhalb von vierzehn Tagen."]),
    ],
  },
  {
    title: "A formal letter of complaint",
    intro:
      "A Beschwerdebrief follows a fixed pattern: formal greeting, reason for writing, the problem, what you want and by when, and a formal closing. Nominal style and genitive prepositions make it sound firm and professional.",
    grammar: {
      title: "The parts of a complaint letter",
      text: "After the greeting with a comma, the first word of the letter is lower case (unless it's a noun or 'Sie').",
      table: [
        ["Part", "Typical phrase"],
        ["greeting", "Sehr geehrte Damen und Herren,"],
        ["reason", "hiermit möchte ich mich über … beschweren."],
        ["problem", "Leider musste ich feststellen, dass …"],
        ["demand", "Ich bitte Sie daher, …"],
        ["closing", "Mit freundlichen Grüßen"],
      ],
    },
    phrases: [
      p("Sehr geehrte Damen und Herren,", "Dear Sir or Madam,", { note: "Use this when you don't know the name of the person you're writing to." }),
      p("Hiermit möchte ich mich über Ihren Kundenservice beschweren.", "I am writing to complain about your customer service.", { words: [["hiermit", "hereby, with this letter"], ["sich beschweren über", "complain about"]] }),
      p("Leider musste ich feststellen, dass das Gerät defekt ist.", "Unfortunately I discovered that the device is faulty.", { words: [["feststellen", "discover, notice"], ["defekt", "faulty"]] }),
      p("Bezüglich meiner Bestellung habe ich noch keine Antwort erhalten.", "I have not yet received a reply regarding my order.", { words: [["bezüglich", "regarding (+ genitive)"]] }),
      p("Ich bitte Sie daher, mir den Kaufpreis zu erstatten.", "I therefore ask you to refund the purchase price.", { words: [["Kaufpreis", "purchase price"], ["erstatten", "refund"]] }),
      p("Ich erwarte Ihre Antwort innerhalb von zehn Tagen.", "I expect your reply within ten days.", { accept: ["Ich erwarte Ihre Antwort innerhalb von 10 Tagen."], note: "With a number and no article, 'innerhalb von' + dative is used." }),
      p("Mit freundlichen Grüßen", "Kind regards", { note: "The standard closing for formal letters. No comma after it." }),
    ],
    dialogue: [
      tutor("Wie beginnen Sie den Brief?", "How do you begin the letter?"),
      you("Sehr geehrte Damen und Herren,", "Give the formal greeting.", ["Sehr geehrte Damen und Herren"]),
      tutor("Und was ist das Problem?", "And what is the problem?"),
      you("Leider musste ich feststellen, dass das Gerät defekt ist.", "Say unfortunately you discovered that the device is faulty.", ["Das Gerät ist defekt."]),
      tutor("Was möchten Sie von der Firma?", "What do you want from the company?"),
      you("Ich bitte Sie daher, mir den Kaufpreis zu erstatten.", "Ask them to refund the purchase price.", ["Ich möchte mein Geld zurück."]),
    ],
  },
  {
    title: "Consumer rights",
    intro:
      "In the EU, sellers must give a two-year Gewährleistung (legal warranty) on new goods, and online purchases come with a 14-day Widerrufsrecht (right of withdrawal). A Garantie is an extra promise from the manufacturer. Knowing these words helps you not to be fobbed off.",
    grammar: {
      title: "Key words for consumers",
      text: "Gewährleistung is the law; Garantie is voluntary.",
      table: [
        ["Term", "Meaning"],
        ["die Gewährleistung", "legal warranty (2 years)"],
        ["die Garantie", "manufacturer's guarantee"],
        ["das Widerrufsrecht", "right of withdrawal (online, 14 days)"],
        ["der Umtausch", "exchange"],
        ["der Kassenbon", "receipt"],
      ],
    },
    phrases: [
      p("Haben Sie den Kassenbon noch?", "Do you still have the receipt?", { words: [["Kassenbon", "receipt"]] }),
      p("Ich möchte von meinem Widerrufsrecht Gebrauch machen.", "I'd like to exercise my right of withdrawal.", { words: [["Gebrauch machen von", "make use of"]] }),
      p("Auf das Gerät gibt es zwei Jahre Garantie.", "The device has a two-year guarantee.", { accept: ["Auf das Gerät gibt es 2 Jahre Garantie."] }),
      p("Reduzierte Ware ist vom Umtausch ausgeschlossen.", "Reduced items can't be exchanged.", { words: [["reduziert", "reduced"], ["ausgeschlossen", "excluded"]], note: "This only covers voluntary exchanges. Faulty goods are still covered by the Gewährleistung." }),
      p("Als Verbraucher haben Sie ein Recht auf Reparatur oder Ersatz.", "As a consumer you have a right to repair or replacement.", { words: [["Verbraucher", "consumer"], ["Ersatz", "replacement"]] }),
      p("Ich lasse mich nicht abwimmeln.", "I won't be fobbed off.", { words: [["abwimmeln", "fob off, brush off"]] }),
      p("Können Sie mir das bitte schriftlich bestätigen?", "Could you confirm that in writing, please?", { words: [["schriftlich", "in writing"], ["bestätigen", "confirm"]] }),
    ],
    dialogue: [
      tutor("Guten Tag, was kann ich für Sie tun?", "Hello, what can I do for you?"),
      you("Ich habe diesen Wasserkocher gekauft, aber er ist defekt.", "Say you bought this kettle but it's faulty.", ["Das Gerät ist defekt."]),
      tutor("Haben Sie den Kassenbon noch?", "Do you still have the receipt?"),
      you("Ja, hier ist er.", "Say yes, here it is.", ["Ja, hier bitte."]),
      tutor("Leider können wir da nichts machen.", "Unfortunately there's nothing we can do."),
      you("Als Verbraucher habe ich ein Recht auf Reparatur oder Ersatz.", "Say that as a consumer you have a right to repair or replacement.", ["Können Sie mir das bitte schriftlich bestätigen?", "Ich lasse mich nicht abwimmeln."]),
    ],
  },
]);
