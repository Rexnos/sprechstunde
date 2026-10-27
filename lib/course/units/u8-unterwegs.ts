import { defineUnit, p, tutor, you } from "../define";

export const unit8 = defineUnit(8, "A1", "Unterwegs", "Find your way, travel by train and make appointments.", [
  {
    title: "Asking the way",
    intro:
      "'Wo ist …?' asks where something is. Directions use 'links' (left), 'rechts' (right) and 'geradeaus' (straight on). If you don't understand, ask for 'langsam, bitte'.",
    phrases: [
      p("Entschuldigung, wo ist der Bahnhof?", "Excuse me, where is the station?", { words: [["wo ist", "where is"], ["Bahnhof", "station"]] }),
      p("Wo ist hier eine Apotheke?", "Where is a pharmacy around here?", { words: [["Apotheke", "pharmacy"]] }),
      p("Gehen Sie geradeaus.", "Go straight on."),
      p("Dann links.", "Then left."),
      p("Die zweite Straße rechts.", "The second street on the right."),
      p("Ist das weit?", "Is it far?", { words: [["weit", "far"]] }),
      p("Nein, nur fünf Minuten.", "No, only five minutes.", { accept: ["Nein, nur 5 Minuten."] }),
    ],
    dialogue: [
      you("Entschuldigung, wo ist der Bahnhof?", "Ask where the station is.", ["Wo ist der Bahnhof?"]),
      tutor("Gehen Sie geradeaus und dann links.", "Go straight on and then left."),
      you("Ist das weit?", "Ask if it's far."),
      tutor("Nein, nur fünf Minuten.", "No, only five minutes."),
      you("Vielen Dank!", "Thank them.", ["Danke schön!", "Danke!"]),
    ],
  },
  {
    title: "At the train station",
    intro:
      "German stations show 'Gleis' (platform) numbers. A 'Fahrkarte' is a ticket; 'einfach' is one-way and 'hin und zurück' is return. 'Umsteigen' means changing trains.",
    phrases: [
      p("Eine Fahrkarte nach München, bitte.", "A ticket to Munich, please.", { words: [["Fahrkarte", "ticket"], ["nach", "to (a city)"]] }),
      p("Einfach oder hin und zurück?", "One-way or return?"),
      p("Hin und zurück, bitte.", "Return, please."),
      p("Von welchem Gleis fährt der Zug?", "Which platform does the train leave from?", { words: [["Gleis", "platform"], ["fährt", "goes, leaves"]] }),
      p("Muss ich umsteigen?", "Do I have to change trains?", { words: [["muss", "must"], ["umsteigen", "change trains"]] }),
      p("Der Zug hat Verspätung.", "The train is delayed.", { words: [["Verspätung", "delay"]] }),
    ],
    dialogue: [
      you("Eine Fahrkarte nach München, bitte.", "Ask for a ticket to Munich.", ["Nach München, bitte."]),
      tutor("Einfach oder hin und zurück?", "One-way or return?"),
      you("Hin und zurück, bitte.", "Say return, please.", ["Einfach, bitte."]),
      tutor("Das macht neunundvierzig Euro.", "That's forty-nine euros."),
      you("Von welchem Gleis fährt der Zug?", "Ask which platform the train leaves from."),
      tutor("Von Gleis sieben.", "From platform seven."),
    ],
  },
  {
    title: "Can and must (können, müssen)",
    intro:
      "Modal verbs like 'können' (can) and 'müssen' (must) send the main verb to the end in its basic form: 'Ich kann Deutsch sprechen.' 'Ich muss arbeiten.'",
    grammar: {
      title: "können and müssen",
      text: "The modal verb is in position 2; the main verb goes to the end in its basic form (infinitive).",
      table: [
        ["", "können (can)", "müssen (must)"],
        ["ich", "kann", "muss"],
        ["du", "kannst", "musst"],
        ["Sie", "können", "müssen"],
      ],
    },
    phrases: [
      p("Ich kann ein bisschen Deutsch sprechen.", "I can speak a little German."),
      p("Kannst du mir helfen?", "Can you help me?", { words: [["mir", "me"], ["helfen", "help"]] }),
      p("Können Sie das wiederholen?", "Can you repeat that?", { words: [["wiederholen", "repeat"]] }),
      p("Ich muss heute arbeiten.", "I have to work today."),
      p("Ich muss zum Arzt gehen.", "I have to go to the doctor.", { words: [["zum Arzt", "to the doctor"]] }),
      p("Wir müssen jetzt gehen.", "We have to go now.", { words: [["jetzt", "now"]] }),
    ],
    dialogue: [
      tutor("Kannst du mir helfen?", "Can you help me?"),
      you("Ja, natürlich!", "Say yes, of course.", ["Ja, gern!", "Leider nicht."]),
      tutor("Kannst du am Montag kommen?", "Can you come on Monday?"),
      you("Nein, am Montag muss ich arbeiten.", "Say no, on Monday you have to work.", ["Ich muss arbeiten."]),
      tutor("Schade! Und am Dienstag?", "Too bad! And on Tuesday?"),
      you("Am Dienstag kann ich kommen.", "Say you can come on Tuesday.", ["Ja, am Dienstag kann ich."]),
    ],
  },
  {
    title: "Making an appointment",
    intro:
      "On the phone, people introduce themselves with their name: 'Hier ist …'. A 'Termin' is an appointment. 'Passt Ihnen …?' asks whether a time suits you.",
    phrases: [
      p("Ich möchte einen Termin machen.", "I'd like to make an appointment.", { words: [["Termin", "appointment"]] }),
      p("Hier ist Anna Schmidt.", "This is Anna Schmidt speaking.", { note: "On the phone, say your own name this way." }),
      p("Haben Sie am Donnerstag Zeit?", "Do you have time on Thursday?"),
      p("Passt Ihnen zehn Uhr?", "Does ten o'clock suit you?", { accept: ["Passt Ihnen 10 Uhr?"], words: [["passt Ihnen", "suits you"]] }),
      p("Ja, das passt gut.", "Yes, that suits me well."),
      p("Ich habe Kopfschmerzen.", "I have a headache.", { words: [["Kopfschmerzen", "headache"]] }),
      p("Bis Donnerstag, auf Wiederhören!", "See you Thursday, goodbye! (on the phone)", { note: "On the phone 'Wiederhören' (hearing again) replaces 'Wiedersehen'." }),
    ],
    dialogue: [
      tutor("Praxis Dr. Weber, guten Tag.", "Dr. Weber's practice, hello."),
      you("Guten Tag, hier ist {name}. Ich möchte einen Termin machen.", "Say who you are and that you'd like an appointment.", ["Ich möchte einen Termin machen."]),
      tutor("Passt Ihnen Donnerstag um zehn Uhr?", "Does Thursday at ten suit you?"),
      you("Ja, das passt gut.", "Say yes, that time suits you well.", ["Ja, das passt.", "Ja, gern."]),
      tutor("Gut. Bis Donnerstag, auf Wiederhören!", "Good. See you Thursday, goodbye!"),
      you("Auf Wiederhören!", "Say goodbye (on the phone).", ["Danke, auf Wiederhören!"]),
    ],
  },
]);
