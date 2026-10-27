import { defineUnit, p, tutor, you } from "../define";

export const unit12 = defineUnit(12, "A1", "Im Alltag", "Fill in forms, write short notes, use the post office and bank, and invite people.", [
  {
    title: "Filling in a form",
    intro:
      "Forms ('Formulare') ask for your personal details: Vorname (first name), Nachname (surname), Adresse, Geburtsdatum (date of birth). Officials use 'Sie' and 'Ihr' (your). In an address, the house number comes after the street name.",
    grammar: {
      title: "Words on a form",
      text: "These words appear on almost every German form.",
      table: [
        ["German", "English"],
        ["Vorname", "first name"],
        ["Nachname", "surname"],
        ["Straße, Hausnummer", "street, house number"],
        ["Postleitzahl, Wohnort", "postcode, town"],
        ["Geburtsdatum", "date of birth"],
        ["Unterschrift", "signature"],
      ],
    },
    phrases: [
      p("Wie ist Ihr Nachname?", "What's your surname?", { words: [["Nachname", "surname"]] }),
      p("Können Sie das bitte buchstabieren?", "Can you spell that, please?", { words: [["buchstabieren", "spell"]] }),
      p("Wie ist Ihre Adresse?", "What's your address?"),
      p("Ich wohne in der Gartenstraße zwölf.", "I live at 12 Gartenstraße.", { accept: ["Ich wohne in der Gartenstraße 12."] }),
      p("Wann sind Sie geboren?", "When were you born?", { words: [["geboren", "born"]] }),
      p("Ich bin am zweiten März geboren.", "I was born on the second of March.", { accept: ["Ich bin am 2. März geboren."] }),
      p("Unterschreiben Sie bitte hier.", "Please sign here.", { words: [["unterschreiben", "sign"]] }),
    ],
    dialogue: [
      tutor("Guten Tag. Wie ist Ihr Nachname?", "Hello. What's your surname?"),
      you("Mein Nachname ist {name}.", "Say your surname.", ["{name}."]),
      tutor("Können Sie das bitte buchstabieren?", "Can you spell that, please?"),
      you("Ich buchstabiere: {letters}", "Spell your surname."),
      tutor("Danke. Und wann sind Sie geboren?", "Thanks. And when were you born?"),
      you("Ich bin am {date} geboren.", "Say your date of birth.", ["Am {date}."]),
      tutor("Gut. Unterschreiben Sie bitte hier.", "Good. Please sign here."),
    ],
  },
  {
    title: "Short messages and notes",
    intro:
      "Text messages and notes are short and informal. People often leave out 'ich': 'Bin gleich zurück.' Messages to friends start with 'Hallo' or 'Liebe …/Lieber …' and end with 'Liebe Grüße' (love, best wishes).",
    phrases: [
      p("Ich komme heute etwas später.", "I'll be a bit late today.", { words: [["etwas", "a little"], ["später", "later"]] }),
      p("Bin gleich zurück.", "Back in a minute.", { words: [["gleich", "right away, soon"], ["zurück", "back"]], note: "Notes often drop 'ich'." }),
      p("Kannst du bitte Brot kaufen?", "Can you buy some bread, please?", { words: [["Brot", "bread"], ["kaufen", "buy"]] }),
      p("Ruf mich bitte an!", "Please call me!", { words: [["anrufen", "call (phone)"]] }),
      p("Danke für deine Nachricht.", "Thanks for your message.", { words: [["Nachricht", "message"]] }),
      p("Ich bin um sechs Uhr zu Hause.", "I'll be home at six.", { accept: ["Ich bin um 6 Uhr zu Hause."] }),
      p("Liebe Grüße und bis später!", "Love, and see you later!", { words: [["Grüße", "greetings"]], note: "A common, friendly way to end a message." }),
    ],
    dialogue: [
      tutor("Hallo! Wo bist du? Das Essen ist fertig.", "Hi! Where are you? Dinner is ready."),
      you("Ich komme heute etwas später.", "Write that you'll be a bit late today.", ["Ich komme später."]),
      tutor("Kein Problem. Wann bist du zu Hause?", "No problem. When will you be home?"),
      you("Ich bin um {time} Uhr zu Hause.", "Say what time you'll be home."),
      tutor("Okay. Kannst du bitte Brot kaufen?", "Okay. Can you buy some bread, please?"),
      you("Ja, klar. Liebe Grüße und bis später!", "Say yes, sure, and sign off.", ["Ja, klar!", "Bis später!"]),
    ],
  },
  {
    title: "At the post office and the bank",
    intro:
      "At the post office you send a 'Brief' (letter) or a 'Paket' (parcel) and buy 'Briefmarken' (stamps). At the bank you can open a 'Konto' (account). For anything official you'll need your 'Ausweis' (ID card) or passport.",
    phrases: [
      p("Ich möchte dieses Paket nach Spanien schicken.", "I'd like to send this parcel to Spain.", { words: [["Paket", "parcel"], ["schicken", "send"]] }),
      p("Was kostet ein Brief nach England?", "How much is a letter to England?", { words: [["Brief", "letter"]] }),
      p("Drei Briefmarken, bitte.", "Three stamps, please.", { accept: ["3 Briefmarken, bitte."], words: [["Briefmarken", "stamps"]] }),
      p("Ich möchte ein Konto eröffnen.", "I'd like to open an account.", { words: [["Konto", "bank account"], ["eröffnen", "open (an account)"]] }),
      p("Brauchen Sie meinen Ausweis?", "Do you need my ID?", { words: [["Ausweis", "ID card"]] }),
      p("Wo ist hier ein Geldautomat?", "Where's a cash machine around here?", { words: [["Geldautomat", "cash machine, ATM"]] }),
      p("Ich möchte Geld abheben.", "I'd like to withdraw money.", { words: [["abheben", "withdraw"]] }),
    ],
    dialogue: [
      tutor("Guten Tag. Was kann ich für Sie tun?", "Hello. What can I do for you?"),
      you("Ich möchte dieses Paket nach Spanien schicken.", "Say you'd like to send this parcel to Spain.", ["Ich möchte ein Paket schicken.", "Ich möchte dieses Paket nach {country} schicken."]),
      tutor("Gern. Das kostet sechzehn Euro.", "Sure. That costs sixteen euros."),
      you("Und drei Briefmarken, bitte.", "Ask for three stamps too.", ["Drei Briefmarken, bitte."]),
      tutor("Das macht zusammen achtzehn Euro fünfzig.", "That makes eighteen euros fifty altogether."),
      you("Hier, bitte.", "Hand over the money.", ["Bitte schön."]),
    ],
  },
  {
    title: "Invitations and possessives (dein, sein, ihr, unser, Ihr)",
    intro:
      "Possessives say whose something is. They work like 'mein': no ending before der/das nouns, '-e' before die nouns and plurals. 'ihr' means 'her' (and 'their'), but capital 'Ihr' is the polite 'your'.",
    grammar: {
      title: "Possessives",
      text: "Like ein/kein: dein Bruder, deine Schwester, deine Eltern. In the accusative, der-nouns take -en: Ich sehe deinen Bruder.",
      table: [
        ["Person", "Possessive", "Example"],
        ["ich", "mein (my)", "mein Bruder"],
        ["du", "dein (your)", "deine Schwester"],
        ["er", "sein (his)", "sein Fahrrad"],
        ["sie", "ihr (her)", "ihr Auto"],
        ["wir", "unser (our)", "unsere Party"],
        ["Sie", "Ihr (your, polite)", "Ihr Schlüssel"],
      ],
    },
    phrases: [
      p("Unsere Party ist am Samstag um acht Uhr.", "Our party is on Saturday at eight.", { accept: ["Unsere Party ist am Samstag um 8 Uhr."], words: [["unsere", "our"]] }),
      p("Bring gern deine Freundin mit!", "Feel free to bring your girlfriend!", { words: [["mitbringen", "bring along"], ["gern", "(here) feel free"]], note: "'Freundin' can mean a female friend or a girlfriend." }),
      p("Ist das dein Fahrrad?", "Is that your bike?", { words: [["Fahrrad", "bicycle"]] }),
      p("Nein, das ist sein Fahrrad.", "No, that's his bike.", { words: [["sein", "his"]] }),
      p("Das ist ihr Auto.", "That's her car.", { words: [["ihr", "her"]] }),
      p("Ist das Ihr Schlüssel?", "Is this your key? (polite)", { note: "Capital 'Ihr' = your (polite)." }),
      p("Danke für die Einladung!", "Thanks for the invitation!", { words: [["Einladung", "invitation"]] }),
      p("Leider kann ich nicht kommen.", "Unfortunately I can't come."),
    ],
    dialogue: [
      tutor("Unsere Party ist am Samstag um acht Uhr. Kommst du?", "Our party is on Saturday at eight. Are you coming?"),
      you("Danke für die Einladung! Ich komme gern.", "Thank them for the invitation and say you'd love to come.", ["Ich komme gern.", "Leider kann ich nicht kommen."]),
      tutor("Super! Bring gern deine Freundin mit!", "Great! Feel free to bring your girlfriend!"),
      you("Danke! Was kann ich mitbringen?", "Say thanks and ask what you can bring.", ["Was kann ich mitbringen?"]),
      tutor("Vielleicht einen Salat?", "Maybe a salad?"),
      you("Ja, gern. Bis Samstag!", "Agree and say see you Saturday.", ["Bis Samstag!"]),
    ],
  },
]);
