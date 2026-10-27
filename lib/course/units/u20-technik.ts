import { defineUnit, p, tutor, you } from "../define";

export const unit20 = defineUnit(20, "A2", "Technik und Medien", "Talk about phones, the internet and apps, ask polite indirect questions and say what happens if something goes wrong.", [
  {
    title: "Phone, internet and apps",
    intro:
      "Most tech words in German are borrowed from English, but they get a German gender and German verbs: das Handy (mobile phone), die App, das WLAN, herunterladen (download), aufladen (charge). Many of these verbs are separable.",
    phrases: [
      p("Mein Handy ist fast leer.", "My phone is almost out of battery.", { words: [["Handy", "mobile phone"], ["leer", "empty, flat"]] }),
      p("Darf ich mein Handy hier aufladen?", "May I charge my phone here?", { words: [["aufladen", "charge"]] }),
      p("Wie ist das WLAN-Passwort?", "What's the wifi password?", { words: [["Passwort", "password"]] }),
      p("Ich habe die App gestern heruntergeladen.", "I downloaded the app yesterday.", { words: [["herunterladen", "download"]] }),
      p("Schick mir den Link per Nachricht.", "Send me the link by message.", { words: [["schicken", "send"], ["per Nachricht", "by message"]] }),
      p("Ich lese die Nachrichten meistens online.", "I mostly read the news online.", { words: [["Nachrichten", "news; messages"], ["meistens", "mostly"]] }),
      p("Wie viele Stunden am Tag bist du im Internet?", "How many hours a day are you on the internet?"),
    ],
    dialogue: [
      tutor("Willkommen! Brauchst du etwas?", "Welcome! Do you need anything?"),
      you("Ja, mein Handy ist fast leer. Darf ich es hier aufladen?", "Say yes, your phone is almost flat, and ask if you may charge it here.", ["Darf ich mein Handy hier aufladen?"]),
      tutor("Natürlich, die Steckdose ist dort.", "Of course, the socket is over there."),
      you("Danke! Wie ist das WLAN-Passwort?", "Thank them and ask for the wifi password.", ["Wie ist das Passwort?"]),
      tutor("Es steht auf dem Zettel am Kühlschrank.", "It's on the note on the fridge."),
      you("Super, vielen Dank!", "Say great, thank you very much.", ["Danke!"]),
    ],
  },
  {
    title: "It doesn't work! (problems with devices)",
    intro:
      "When something breaks, you need a few key phrases: 'funktioniert nicht', 'ist kaputt', 'geht nicht an'. In a shop or on a hotline you describe what happened in the Perfekt: 'Der Bildschirm ist kaputtgegangen.'",
    phrases: [
      p("Mein Laptop funktioniert nicht mehr.", "My laptop doesn't work anymore.", { words: [["nicht mehr", "no longer"]] }),
      p("Der Bildschirm ist kaputt.", "The screen is broken.", { words: [["Bildschirm", "screen"], ["kaputt", "broken"]] }),
      p("Der Computer geht nicht an.", "The computer won't switch on.", { words: [["angehen", "switch on (by itself)"]] }),
      p("Ich habe das Handy schon ausgemacht und wieder angemacht.", "I've already switched the phone off and on again.", { words: [["ausmachen", "switch off"], ["anmachen", "switch on"]] }),
      p("Das Internet ist heute sehr langsam.", "The internet is very slow today.", { words: [["langsam", "slow"]] }),
      p("Ich habe mein Passwort vergessen.", "I've forgotten my password.", { words: [["vergessen", "forgotten; forget"]] }),
      p("Können Sie das reparieren?", "Can you repair that?", { words: [["reparieren", "repair"]] }),
    ],
    dialogue: [
      tutor("Guten Tag, was kann ich für Sie tun?", "Hello, what can I do for you?"),
      you("Mein Laptop funktioniert nicht mehr.", "Say your laptop doesn't work anymore.", ["Mein Handy ist kaputt.", "Der Computer geht nicht an."]),
      tutor("Haben Sie ihn schon ausgemacht und wieder angemacht?", "Have you already switched it off and on again?"),
      you("Ja, aber er geht nicht an.", "Say yes, but it won't switch on.", ["Ja, schon zweimal."]),
      tutor("Hm, vielleicht ist der Akku kaputt.", "Hm, maybe the battery is broken."),
      you("Können Sie das reparieren?", "Ask if they can repair it.", ["Was kostet die Reparatur?"]),
    ],
  },
  {
    title: "Do you know if …? (indirect questions)",
    intro:
      "A direct question can sound abrupt. Start with 'Wissen Sie, …' or 'Können Sie mir sagen, …' and the question becomes a subordinate clause with the verb at the end. Yes/no questions use 'ob'; W-questions keep their W-word.",
    grammar: {
      title: "Indirect questions: verb to the end",
      text: "ob = whether, if. The W-word or ob starts the clause, the conjugated verb goes last.",
      table: [
        ["Direct question", "Indirect question"],
        ["Ist der Laden offen?", "Wissen Sie, ob der Laden offen ist?"],
        ["Wann öffnet der Laden?", "Können Sie mir sagen, wann der Laden öffnet?"],
        ["Wo kann ich das kaufen?", "Wissen Sie, wo ich das kaufen kann?"],
        ["Funktioniert das?", "Ich weiß nicht, ob das funktioniert."],
      ],
    },
    phrases: [
      p("Wissen Sie, ob es hier WLAN gibt?", "Do you know if there's wifi here?", { words: [["ob", "whether, if"]] }),
      p("Können Sie mir sagen, wann der Laden öffnet?", "Can you tell me when the shop opens?", { words: [["Laden", "shop"], ["öffnen", "open"]] }),
      p("Weißt du, wo mein Ladekabel ist?", "Do you know where my charging cable is?", { words: [["Ladekabel", "charging cable"]] }),
      p("Ich weiß nicht, ob das Update funktioniert hat.", "I don't know if the update worked.", { note: "With a Perfekt, the form of haben or sein goes to the very end." }),
      p("Können Sie mir erklären, wie die App funktioniert?", "Can you explain to me how the app works?", { words: [["erklären", "explain"]] }),
      p("Weißt du, wie viel das neue Handy kostet?", "Do you know how much the new phone costs?"),
      p("Ich frage mich, warum der Drucker nicht druckt.", "I wonder why the printer isn't printing.", { words: [["sich fragen", "wonder"], ["Drucker", "printer"], ["drucken", "print"]] }),
    ],
    dialogue: [
      tutor("Guten Tag! Kann ich Ihnen helfen?", "Hello! Can I help you?"),
      you("Ja, wissen Sie, ob es hier WLAN gibt?", "Ask politely if there's wifi here.", ["Gibt es hier WLAN?"]),
      tutor("Ja, das Passwort steht auf der Karte.", "Yes, the password is on the card."),
      you("Danke. Können Sie mir sagen, wann der Laden schließt?", "Thank them and ask politely when the shop closes.", ["Wissen Sie, wann der Laden schließt?"]),
      tutor("Um acht Uhr. Brauchen Sie noch etwas?", "At eight o'clock. Do you need anything else?"),
      you("Können Sie mir erklären, wie die App funktioniert?", "Ask politely how the app works.", ["Nein, danke."]),
    ],
  },
  {
    title: "If … then (wenn-clauses)",
    intro:
      "'wenn' introduces a condition, and like 'weil' and 'dass' it sends the verb to the end. If the wenn-clause comes first, the main clause starts with its verb: 'Wenn das WLAN nicht geht, starte den Router neu.'",
    grammar: {
      title: "wenn: verb to the end, then verb first",
      text: "The whole wenn-clause counts as position 1, so the next verb comes straight after the comma.",
      table: [
        ["wenn-clause", "main clause"],
        ["Wenn das Handy leer ist,", "lade ich es auf."],
        ["Wenn du Zeit hast,", "kannst du mir helfen."],
        ["Wenn es nicht funktioniert,", "rufen Sie uns an."],
      ],
    },
    phrases: [
      p("Wenn das Handy leer ist, lade ich es auf.", "If the phone is flat, I charge it.", { words: [["wenn", "if, when"]] }),
      p("Wenn das WLAN nicht geht, starte den Router neu.", "If the wifi doesn't work, restart the router.", { words: [["neu starten", "restart"]] }),
      p("Wenn du Zeit hast, kannst du mir helfen?", "If you have time, can you help me?"),
      p("Ich rufe dich an, wenn ich zu Hause bin.", "I'll call you when I'm home.", { words: [["anrufen", "call"]] }),
      p("Wenn ich abends müde bin, schaue ich Serien.", "When I'm tired in the evening, I watch series.", { words: [["Serien", "TV series"], ["schauen", "watch"]] }),
      p("Was machst du, wenn das Internet nicht funktioniert?", "What do you do if the internet isn't working?"),
    ],
    dialogue: [
      tutor("Was machst du, wenn das Internet nicht funktioniert?", "What do you do if the internet isn't working?"),
      you("Wenn das WLAN nicht geht, starte ich den Router neu.", "Say that if the wifi doesn't work, you restart the router.", ["Ich starte den Router neu.", "Dann lese ich ein Buch."]),
      tutor("Und was machst du abends, wenn du müde bist?", "And what do you do in the evening when you're tired?"),
      you("Wenn ich abends müde bin, schaue ich Serien.", "Say that when you're tired in the evening, you watch series.", ["Dann schaue ich Serien.", "Dann gehe ich ins Bett."]),
      tutor("Ich auch! Ich rufe dich morgen an, okay?", "Me too! I'll call you tomorrow, okay?"),
      you("Okay, ruf mich an, wenn du Zeit hast.", "Say okay, call me when you have time.", ["Okay, bis morgen!"]),
    ],
  },
]);
