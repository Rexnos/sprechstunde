import { defineUnit, p, tutor, you } from "../define";

export const unit22 = defineUnit(22, "A2", "Ämter und Termine", "Make appointments at an office, ask politely with könnte, hätte and würde, and make complaints.", [
  {
    title: "At the Bürgeramt",
    intro:
      "When you move in Germany, you must register your address at the Bürgeramt within two weeks (die Anmeldung). You usually need an appointment, your passport and a form from your landlord (die Wohnungsgeberbestätigung).",
    phrases: [
      p("Ich möchte mich anmelden.", "I'd like to register my address.", { words: [["sich anmelden", "register"]] }),
      p("Ich brauche einen Termin beim Bürgeramt.", "I need an appointment at the citizens' office.", { words: [["Bürgeramt", "citizens' office"]] }),
      p("Welche Unterlagen muss ich mitbringen?", "Which documents do I have to bring?", { words: [["Unterlagen", "documents, papers"]] }),
      p("Hier sind mein Pass und das Formular.", "Here's my passport and the form.", { words: [["Formular", "form"]] }),
      p("Sie müssen das Formular unterschreiben.", "You have to sign the form.", { words: [["unterschreiben", "sign"]] }),
      p("Ziehen Sie bitte eine Nummer.", "Please take a number.", { words: [["ziehen", "pull, take"]] }),
      p("Wie lange dauert das ungefähr?", "Roughly how long will that take?", { words: [["dauern", "last, take"], ["ungefähr", "roughly"]] }),
    ],
    dialogue: [
      tutor("Guten Morgen. Was kann ich für Sie tun?", "Good morning. What can I do for you?"),
      you("Guten Morgen, ich möchte mich anmelden.", "Say good morning and that you'd like to register.", ["Ich möchte mich anmelden."]),
      tutor("Haben Sie einen Termin?", "Do you have an appointment?"),
      you("Ja, um zehn Uhr.", "Say yes, at ten o'clock.", ["Ja, um {number} Uhr.", "Nein, leider nicht."]),
      tutor("Gut. Ich brauche Ihren Pass und das Formular.", "Good. I need your passport and the form."),
      you("Hier sind mein Pass und das Formular.", "Hand them over: here's your passport and the form.", ["Hier, bitte."]),
    ],
  },
  {
    title: "Being polite (Konjunktiv II)",
    intro:
      "To make a request softer, Germans use the Konjunktiv II: 'Könnten Sie …?' instead of 'Können Sie …?', 'Ich hätte gern …' instead of 'Ich will …', and 'Würden Sie …?' with any other verb. You know 'Ich möchte' already: it's the same idea.",
    grammar: {
      title: "Polite forms",
      text: "hätte, könnte, wäre and würde all come from the Präteritum plus an umlaut. würde + infinitive works with every verb.",
      table: [
        ["", "haben", "können", "sein", "werden"],
        ["ich / er / sie", "hätte", "könnte", "wäre", "würde"],
        ["du", "hättest", "könntest", "wärst", "würdest"],
        ["wir / sie / Sie", "hätten", "könnten", "wären", "würden"],
      ],
    },
    phrases: [
      p("Könnten Sie mir bitte helfen?", "Could you help me, please?", { words: [["könnten", "could"]] }),
      p("Ich hätte gern einen Termin.", "I'd like an appointment.", { words: [["hätte gern", "would like"]] }),
      p("Würden Sie das bitte langsamer sagen?", "Would you say that more slowly, please?", { words: [["würden", "would"], ["langsamer", "more slowly"]] }),
      p("Könnten Sie das bitte buchstabieren?", "Could you spell that, please?", { words: [["buchstabieren", "spell"]] }),
      p("Wäre es möglich, den Termin zu verschieben?", "Would it be possible to postpone the appointment?", { words: [["wäre", "would be"], ["möglich", "possible"], ["verschieben", "postpone"]] }),
      p("Würden Sie mir das Formular schicken?", "Would you send me the form?"),
      p("Hätten Sie am Donnerstag Zeit?", "Would you have time on Thursday?"),
    ],
    dialogue: [
      tutor("Guten Tag, Sie wünschen?", "Hello, what can I do for you?"),
      you("Ich hätte gern einen Termin.", "Say you'd like an appointment.", ["Ich hätte gern einen Termin, bitte."]),
      tutor("Am Dienstag um neun Uhr fünfzehn ginge es.", "Tuesday at nine fifteen would work."),
      you("Würden Sie das bitte langsamer sagen?", "Ask them to say it more slowly.", ["Könnten Sie das bitte wiederholen?"]),
      tutor("Natürlich. Dienstag, neun Uhr fünfzehn.", "Of course. Tuesday, nine fifteen."),
      you("Wäre es möglich, am Donnerstag zu kommen?", "Ask if it would be possible to come on Thursday.", ["Hätten Sie am Donnerstag Zeit?", "Dienstag passt gut."]),
    ],
  },
  {
    title: "Phoning an office",
    intro:
      "On the phone, Germans start with their surname: 'Hier ist Weber.' or 'Weber, guten Tag.' Office phone calls follow a pattern: say who you are, why you're calling, and check the details at the end.",
    phrases: [
      p("Guten Tag, hier spricht Anna Weber.", "Hello, this is Anna Weber speaking.", { words: [["hier spricht", "this is … speaking"]] }),
      p("Ich rufe wegen meines Termins an.", "I'm calling about my appointment.", { words: [["wegen", "because of, about"]], note: "'wegen' takes the genitive in writing; in speech you often hear 'wegen meinem Termin'." }),
      p("Könnten Sie mich bitte mit Frau Schulz verbinden?", "Could you put me through to Ms Schulz, please?", { words: [["verbinden", "connect, put through"]] }),
      p("Sie ist gerade nicht im Büro.", "She's not in the office right now.", { words: [["gerade", "right now"]] }),
      p("Kann ich eine Nachricht hinterlassen?", "Can I leave a message?", { words: [["hinterlassen", "leave (a message)"]] }),
      p("Unter welcher Nummer kann ich Sie erreichen?", "What number can I reach you on?", { words: [["erreichen", "reach"]] }),
      p("Ich wiederhole: am Montag um halb neun.", "Let me repeat: on Monday at half past eight.", { words: [["wiederholen", "repeat"], ["halb neun", "half past eight"]] }),
    ],
    dialogue: [
      tutor("Ausländerbehörde, Schulz, guten Tag.", "Immigration office, Schulz speaking, hello."),
      you("Guten Tag, hier spricht {name}. Ich rufe wegen meines Termins an.", "Give your name and say you're calling about your appointment.", ["Hier ist {name}. Ich rufe wegen meines Termins an."]),
      tutor("Ja, was ist das Problem?", "Yes, what's the problem?"),
      you("Wäre es möglich, den Termin zu verschieben?", "Ask if it would be possible to postpone the appointment.", ["Könnte ich den Termin verschieben?"]),
      tutor("Ja, am Montag um halb neun ginge es.", "Yes, Monday at half past eight would work."),
      you("Ich wiederhole: am Montag um halb neun.", "Repeat the time to check it.", ["Montag um halb neun, vielen Dank!"]),
    ],
  },
  {
    title: "Making a complaint",
    intro:
      "A good complaint is polite but clear: say what's wrong, since when, and what you'd like. Soften with 'leider' and the Konjunktiv II, and use 'seit' + dative for how long the problem has lasted.",
    phrases: [
      p("Ich möchte mich beschweren.", "I'd like to make a complaint.", { words: [["sich beschweren", "complain"]] }),
      p("Ich warte schon seit drei Wochen auf eine Antwort.", "I've been waiting for an answer for three weeks.", { accept: ["Ich warte schon seit 3 Wochen auf eine Antwort."], words: [["warten auf", "wait for"], ["Antwort", "answer"]] }),
      p("Leider habe ich den Brief nie bekommen.", "Unfortunately I never received the letter.", { words: [["Brief", "letter"], ["nie", "never"]] }),
      p("Das ist nicht in Ordnung.", "That's not okay.", { words: [["in Ordnung", "okay, all right"]] }),
      p("Könnten Sie das bitte prüfen?", "Could you check that, please?", { words: [["prüfen", "check"]] }),
      p("Ich würde gern mit Ihrem Chef sprechen.", "I would like to speak to your manager.", { words: [["würde gern", "would like to"]], note: "Very polite and very firm at the same time." }),
      p("Vielen Dank für Ihre Hilfe.", "Thank you for your help.", { words: [["Hilfe", "help"]] }),
    ],
    dialogue: [
      tutor("Guten Tag, worum geht es?", "Hello, what is it about?"),
      you("Ich möchte mich beschweren.", "Say you'd like to make a complaint.", ["Ich habe ein Problem."]),
      tutor("Was ist passiert?", "What happened?"),
      you("Ich warte schon seit drei Wochen auf eine Antwort.", "Say you've been waiting for an answer for three weeks.", ["Ich warte schon seit {number} Wochen auf eine Antwort.", "Leider habe ich den Brief nie bekommen."]),
      tutor("Das tut mir leid. Ich schaue sofort nach.", "I'm sorry. I'll check right away."),
      you("Vielen Dank für Ihre Hilfe.", "Thank them for their help.", ["Danke schön!"]),
    ],
  },
]);
