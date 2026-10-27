import { defineUnit, p, tutor, you } from "../define";

export const unit9 = defineUnit(9, "A1", "Zu Hause", "Describe your flat, say where things are and use kein and nicht.", [
  {
    title: "Rooms and furniture",
    intro:
      "A 'Wohnung' is a flat and a 'Zimmer' is a room. Most room words are compounds: 'Wohnzimmer' (living room), 'Schlafzimmer' (bedroom). Learn every noun with der, die or das.",
    grammar: {
      title: "Rooms and furniture with their articles",
      text: "Compound nouns take the article of their last part: das Zimmer → das Wohnzimmer.",
      table: [
        ["der", "die", "das"],
        ["der Flur (hall)", "die Küche (kitchen)", "das Wohnzimmer (living room)"],
        ["der Tisch (table)", "die Lampe (lamp)", "das Bad (bathroom)"],
        ["der Stuhl (chair)", "die Dusche (shower)", "das Bett (bed)"],
        ["der Schrank (cupboard)", "die Wohnung (flat)", "das Sofa (sofa)"],
      ],
    },
    phrases: [
      p("Das ist das Wohnzimmer.", "This is the living room.", { words: [["Wohnzimmer", "living room"]] }),
      p("Die Küche ist klein, aber schön.", "The kitchen is small but nice.", { words: [["Küche", "kitchen"], ["schön", "nice, beautiful"]] }),
      p("Das Schlafzimmer ist groß und hell.", "The bedroom is big and bright.", { words: [["Schlafzimmer", "bedroom"], ["hell", "bright, light"]] }),
      p("Im Bad gibt es eine Dusche.", "There's a shower in the bathroom.", { words: [["Bad", "bathroom"], ["es gibt", "there is"], ["Dusche", "shower"]] }),
      p("Wir haben einen Balkon.", "We have a balcony.", { words: [["Balkon", "balcony"]] }),
      p("Im Wohnzimmer steht ein Sofa.", "There's a sofa in the living room.", { words: [["steht", "stands"]], note: "Germans often say furniture 'stands' (steht) somewhere." }),
      p("Der Tisch und die Stühle sind neu.", "The table and the chairs are new.", { words: [["Tisch", "table"], ["Stühle", "chairs"]] }),
    ],
    dialogue: [
      tutor("Wie ist deine Wohnung?", "What's your flat like?"),
      you("Meine Wohnung ist {adjective}.", "Describe your flat in one word (klein, groß, hell…).", ["Sie ist klein, aber schön."]),
      tutor("Hast du einen Balkon?", "Do you have a balcony?"),
      you("Ja, wir haben einen Balkon.", "Say yes, you have a balcony.", ["Ja.", "Nein, leider nicht."]),
      tutor("Und wie ist die Küche?", "And what's the kitchen like?"),
      you("Die Küche ist klein, aber schön.", "Say the kitchen is small but nice.", ["Die Küche ist groß."]),
    ],
  },
  {
    title: "Where is it? (Wo ist …?)",
    intro:
      "To say where something is, learn a few location phrases as whole chunks: 'im Wohnzimmer' (in the living room), 'in der Küche' (in the kitchen), 'auf dem Tisch' (on the table). Things that lie flat 'liegen', upright things 'stehen'.",
    grammar: {
      title: "Location phrases (learn them as chunks)",
      text: "After words like in, auf, unter and neben, der and das become 'dem', and die becomes 'der'. 'in dem' is shortened to 'im'.",
      table: [
        ["Word", "der / das noun", "die noun"],
        ["in (in)", "im Bad", "in der Küche"],
        ["auf (on)", "auf dem Tisch", "auf der Kommode"],
        ["unter (under)", "unter dem Bett", "unter der Lampe"],
        ["neben (next to)", "neben dem Sofa", "neben der Tür"],
      ],
    },
    phrases: [
      p("Wo ist mein Handy?", "Where is my phone?", { words: [["Handy", "mobile phone"]] }),
      p("Es liegt auf dem Tisch.", "It's on the table.", { words: [["liegt", "lies"], ["auf dem Tisch", "on the table"]] }),
      p("Die Schlüssel sind in der Küche.", "The keys are in the kitchen.", { words: [["Schlüssel", "key(s)"]] }),
      p("Die Katze schläft unter dem Bett.", "The cat is sleeping under the bed.", { words: [["Katze", "cat"], ["schläft", "sleeps"], ["unter", "under"]] }),
      p("Die Lampe steht neben dem Sofa.", "The lamp is next to the sofa.", { words: [["neben", "next to"]] }),
      p("Das Buch steht im Regal.", "The book is on the shelf.", { words: [["Regal", "shelf, bookcase"]], note: "German says the book is 'in' the shelf." }),
      p("Meine Jacke hängt im Flur.", "My jacket is hanging in the hall.", { words: [["hängt", "hangs"], ["Flur", "hall, corridor"]] }),
    ],
    dialogue: [
      tutor("Wo ist mein Handy?", "Where is my phone?"),
      you("Es liegt auf dem Tisch.", "Say it's on the table.", ["Auf dem Tisch.", "Im Wohnzimmer."]),
      tutor("Danke! Und wo sind die Schlüssel?", "Thanks! And where are the keys?"),
      you("Die Schlüssel sind in der Küche.", "Say the keys are in the kitchen.", ["In der Küche."]),
      tutor("Und wo ist die Katze?", "And where is the cat?"),
      you("Sie schläft unter dem Bett.", "Say it's sleeping under the bed.", ["Unter dem Bett."]),
    ],
  },
  {
    title: "No and not (kein or nicht)",
    intro:
      "German has two words for 'not'. 'kein' means 'no / not a' and replaces 'ein' in front of a noun: 'Ich habe keinen Balkon.' 'nicht' negates everything else, such as adjectives and verbs: 'Die Wohnung ist nicht groß.'",
    grammar: {
      title: "kein or nicht?",
      text: "kein takes the same endings as ein: kein / keine / keinen. Use nicht for adjectives, verbs, names and nouns with der/die/das.",
      table: [
        ["Use", "German", "English"],
        ["kein + noun", "Wir haben keine Spülmaschine.", "We don't have a dishwasher."],
        ["keinen (accusative)", "Ich habe keinen Balkon.", "I don't have a balcony."],
        ["nicht + adjective", "Die Wohnung ist nicht teuer.", "The flat isn't expensive."],
        ["nicht + verb", "Ich wohne nicht im Zentrum.", "I don't live in the centre."],
      ],
    },
    phrases: [
      p("Die Wohnung hat keinen Balkon.", "The flat doesn't have a balcony.", { words: [["keinen", "no, not a (masculine, accusative)"]] }),
      p("Wir haben keine Spülmaschine.", "We don't have a dishwasher.", { words: [["Spülmaschine", "dishwasher"]] }),
      p("Im Bad ist kein Fenster.", "There's no window in the bathroom.", { words: [["Fenster", "window"]] }),
      p("Das ist kein Problem.", "That's no problem."),
      p("Die Küche ist nicht groß.", "The kitchen isn't big."),
      p("Die Wohnung ist nicht teuer.", "The flat isn't expensive.", { words: [["teuer", "expensive"]] }),
      p("Ich wohne nicht im Zentrum.", "I don't live in the centre.", { words: [["Zentrum", "centre"]] }),
    ],
    dialogue: [
      tutor("Hat deine Wohnung einen Balkon?", "Does your flat have a balcony?"),
      you("Nein, die Wohnung hat keinen Balkon.", "Say no, the flat doesn't have a balcony.", ["Nein, keinen Balkon.", "Ja, sie hat einen Balkon."]),
      tutor("Ist die Wohnung groß?", "Is the flat big?"),
      you("Nein, sie ist nicht groß.", "Say no, it isn't big.", ["Nein, nicht sehr groß.", "Ja, sie ist groß."]),
      tutor("Ist sie teuer?", "Is it expensive?"),
      you("Nein, sie ist nicht teuer.", "Say no, it isn't expensive.", ["Ja, leider."]),
    ],
  },
  {
    title: "Looking at a flat ad",
    intro:
      "Flat ads give the number of rooms (kitchen and bathroom don't count), the size in 'Quadratmeter' (square metres) and the rent, 'Miete'. 'Warm' rent includes heating and other running costs; 'kalt' rent doesn't. You call to ask if you can view it: 'besichtigen'.",
    phrases: [
      p("Die Wohnung hat drei Zimmer.", "The flat has three rooms.", { accept: ["Die Wohnung hat 3 Zimmer."] }),
      p("Wie groß ist die Wohnung?", "How big is the flat?"),
      p("Sie hat siebzig Quadratmeter.", "It's seventy square metres.", { accept: ["Sie hat 70 Quadratmeter."], words: [["Quadratmeter", "square metres"]] }),
      p("Die Miete ist achthundert Euro warm.", "The rent is eight hundred euros including bills.", { accept: ["Die Miete ist 800 Euro warm."], words: [["Miete", "rent"], ["warm", "including heating and bills"]] }),
      p("Ist die Wohnung noch frei?", "Is the flat still available?", { words: [["noch", "still"], ["frei", "free, available"]] }),
      p("Gibt es einen Aufzug?", "Is there a lift?", { words: [["Aufzug", "lift, elevator"]] }),
      p("Kann ich die Wohnung besichtigen?", "Can I view the flat?", { words: [["besichtigen", "view, visit"]] }),
    ],
    dialogue: [
      tutor("Hausverwaltung Keller, guten Tag.", "Keller property management, hello."),
      you("Guten Tag, ist die Wohnung noch frei?", "Ask if the flat is still available.", ["Ist die Wohnung noch frei?"]),
      tutor("Ja, sie ist noch frei.", "Yes, it's still available."),
      you("Wie groß ist die Wohnung?", "Ask how big the flat is."),
      tutor("Sie hat drei Zimmer und siebzig Quadratmeter.", "It has three rooms and seventy square metres."),
      you("Kann ich die Wohnung besichtigen?", "Ask if you can view the flat.", ["Kann ich die Wohnung sehen?"]),
      tutor("Gern. Passt Ihnen Freitag um fünf Uhr?", "Sure. Does Friday at five suit you?"),
      you("Ja, das passt gut.", "Say yes, that time suits you well.", ["Ja, gern."]),
    ],
  },
]);
