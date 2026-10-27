import { defineUnit, p, tutor, you } from "../define";

export const unit14 = defineUnit(14, "A2", "Umzug", "Talk about moving house and say where things are and where they go.", [
  {
    title: "Moving house",
    intro:
      "'Umziehen' means to move house, and 'der Umzug' is the move itself. It's a separable verb: 'Wir ziehen um.' In the Perfekt it takes 'sein': 'Wir sind umgezogen.'",
    phrases: [
      p("Wir ziehen nächste Woche um.", "We're moving next week.", { words: [["ziehen … um", "move house"], ["nächste Woche", "next week"]] }),
      p("Die neue Wohnung hat drei Zimmer.", "The new flat has three rooms.", { accept: ["Die neue Wohnung hat 3 Zimmer."], words: [["Wohnung", "flat, apartment"], ["Zimmer", "room(s)"]] }),
      p("Kannst du mir beim Umzug helfen?", "Can you help me with the move?", { words: [["beim Umzug", "with the move"]] }),
      p("Wir brauchen noch viele Kartons.", "We still need lots of boxes.", { words: [["noch", "still"], ["Kartons", "cardboard boxes"]] }),
      p("Die Küche ist klein, aber hell.", "The kitchen is small but bright.", { words: [["hell", "bright, light"]] }),
      p("Die Miete ist leider ziemlich hoch.", "Unfortunately the rent is quite high.", { words: [["Miete", "rent"], ["ziemlich", "quite, rather"], ["hoch", "high"]] }),
      p("Wir sind letzten Monat umgezogen.", "We moved last month.", { words: [["letzten Monat", "last month"], ["umgezogen", "moved (house)"]] }),
    ],
    dialogue: [
      tutor("Ich habe gehört, ihr zieht um?", "I heard you're moving?"),
      you("Ja, wir ziehen nächste Woche um.", "Say yes, you're moving next week.", ["Ja, nächste Woche."]),
      tutor("Toll! Wie ist die neue Wohnung?", "Great! What's the new flat like?"),
      you("Sie hat drei Zimmer und die Küche ist hell.", "Say it has three rooms and the kitchen is bright.", ["Sie hat 3 Zimmer.", "Sie hat {number} Zimmer."]),
      tutor("Brauchst du Hilfe beim Umzug?", "Do you need help with the move?"),
      you("Ja, gern! Kannst du am Samstag?", "Say yes please, and ask if they can on Saturday.", ["Ja, gern!", "Kannst du mir beim Umzug helfen?"]),
    ],
  },
  {
    title: "Where is it? (Wo? + dative)",
    intro:
      "Prepositions like 'in', 'auf', 'an', 'unter' and 'neben' take the dative when you say where something IS: 'Das Buch liegt auf dem Tisch.' Things that stand upright 'stehen', flat things 'liegen', and pictures 'hängen'.",
    grammar: {
      title: "Wo? → dative",
      text: "Two-way prepositions: in, an, auf, unter, über, vor, hinter, neben, zwischen. For position (Wo?) use the dative: der/das → dem, die → der, plural → den (+ -n). in dem = im.",
      table: [
        ["", "der Tisch", "die Wand", "das Regal"],
        ["Wo?", "auf dem Tisch", "an der Wand", "im Regal"],
        ["", "unter dem Tisch", "vor der Wand", "neben dem Regal"],
      ],
    },
    phrases: [
      p("Das Sofa steht im Wohnzimmer.", "The sofa is in the living room.", { words: [["steht", "stands"], ["Wohnzimmer", "living room"]] }),
      p("Die Lampe steht neben dem Bett.", "The lamp is next to the bed.", { words: [["neben", "next to"]] }),
      p("Das Bild hängt an der Wand.", "The picture is hanging on the wall.", { words: [["Bild", "picture"], ["hängt", "hangs"], ["Wand", "wall"]] }),
      p("Die Bücher liegen auf dem Tisch.", "The books are lying on the table.", { words: [["liegen", "lie"]] }),
      p("Die Katze schläft unter dem Sofa.", "The cat is sleeping under the sofa.", { words: [["unter", "under"]] }),
      p("Wo ist meine Brille?", "Where are my glasses?", { words: [["Brille", "glasses"]], note: "'Brille' is singular in German: 'Die Brille ist …'" }),
      p("Der Schlüssel liegt zwischen den Kissen.", "The key is between the cushions.", { words: [["zwischen", "between"], ["Kissen", "cushion(s)"]] }),
    ],
    dialogue: [
      tutor("Ich finde meine Brille nicht!", "I can't find my glasses!"),
      you("Sie liegt auf dem Tisch.", "Say they're lying on the table.", ["Auf dem Tisch.", "Sie liegt auf dem {thing}."]),
      tutor("Nein, da ist sie nicht. Und wo ist mein Schlüssel?", "No, they're not there. And where's my key?"),
      you("Der Schlüssel liegt zwischen den Kissen.", "Say the key is between the cushions.", ["Zwischen den Kissen."]),
      tutor("Danke! Ah, und die Brille liegt unter dem Sofa.", "Thanks! Ah, and the glasses are under the sofa."),
      you("Die Katze schläft auch unter dem Sofa!", "Say the cat is sleeping under the sofa too!"),
    ],
  },
  {
    title: "Where does it go? (Wohin? + accusative)",
    intro:
      "When you move something to a place (Wohin?), the same prepositions take the accusative: 'Ich stelle die Lampe auf den Tisch.' The action verbs are 'stellen' (put upright), 'legen' (lay down) and 'hängen' (hang).",
    grammar: {
      title: "Action vs. position",
      text: "Action verb + Wohin? + accusative. Position verb + Wo? + dative. Only der changes in the accusative: auf den Tisch. in das = ins.",
      table: [
        ["Put (Wohin? + accusative)", "Is there (Wo? + dative)", "Used for"],
        ["stellen", "stehen", "upright things"],
        ["legen", "liegen", "flat things"],
        ["hängen", "hängen", "hanging things"],
      ],
    },
    phrases: [
      p("Wohin stellen wir das Sofa?", "Where shall we put the sofa?", { words: [["wohin", "where to"], ["stellen", "put (upright)"]] }),
      p("Stell das Sofa an die Wand.", "Put the sofa against the wall."),
      p("Ich stelle die Bücher ins Regal.", "I'm putting the books on the shelf.", { words: [["Regal", "shelf, bookcase"]], note: "Books stand upright on a shelf, so German uses 'stellen'." }),
      p("Leg die Decke aufs Bett.", "Put the blanket on the bed.", { words: [["leg", "lay, put (flat)"], ["Decke", "blanket"], ["aufs", "onto the (auf das)"]] }),
      p("Ich hänge die Lampe über den Tisch.", "I'm hanging the lamp above the table.", { words: [["über", "above, over"]] }),
      p("Wir stellen den Tisch vor das Fenster.", "We're putting the table in front of the window.", { words: [["vor", "in front of"], ["Fenster", "window"]] }),
      p("Häng das Bild bitte neben die Tür.", "Please hang the picture next to the door.", { words: [["Tür", "door"]] }),
    ],
    dialogue: [
      tutor("So, das ist das Sofa. Wohin stellen wir es?", "So, this is the sofa. Where shall we put it?"),
      you("Stell das Sofa an die Wand.", "Tell your friend to put the sofa against the wall.", ["An die Wand, bitte."]),
      tutor("Gut. Und der Tisch?", "Good. And the table?"),
      you("Wir stellen den Tisch vor das Fenster.", "Say you're putting the table in front of the window.", ["Vor das Fenster."]),
      tutor("Und wohin hängen wir das Bild?", "And where shall we hang the picture?"),
      you("Häng das Bild bitte neben die Tür.", "Ask them to hang the picture next to the door.", ["Neben die Tür, bitte.", "Über das Sofa, bitte."]),
    ],
  },
  {
    title: "The new home",
    intro:
      "When you've moved in ('eingezogen'), you meet the neighbours, find out where the bins are and report problems to the landlord ('der Vermieter'). Germans often throw an 'Einweihungsparty' (housewarming party).",
    phrases: [
      p("Wir sind letzte Woche eingezogen.", "We moved in last week.", { words: [["eingezogen", "moved in"]] }),
      p("Ich wohne jetzt im dritten Stock.", "I now live on the third floor.", { words: [["im dritten Stock", "on the third floor"]] }),
      p("Herzlich willkommen im Haus!", "Welcome to the building!", { words: [["herzlich willkommen", "a warm welcome"]] }),
      p("Wo stehen die Mülltonnen?", "Where are the bins?", { words: [["Mülltonnen", "rubbish bins"]] }),
      p("Die Heizung funktioniert nicht.", "The heating doesn't work.", { words: [["Heizung", "heating"], ["funktioniert", "works"]] }),
      p("Ich habe die Kartons in den Keller gebracht.", "I took the boxes down to the cellar.", { words: [["Keller", "cellar, basement"], ["gebracht", "brought, taken"]] }),
      p("Wir machen am Samstag eine kleine Einweihungsparty.", "We're having a small housewarming party on Saturday.", { words: [["Einweihungsparty", "housewarming party"]] }),
    ],
    dialogue: [
      tutor("Hallo! Sind Sie neu hier?", "Hello! Are you new here?"),
      you("Ja, wir sind letzte Woche eingezogen.", "Say yes, you moved in last week.", ["Ja, ich bin letzte Woche eingezogen."]),
      tutor("Herzlich willkommen im Haus! Ich bin Frau Krüger.", "Welcome to the building! I'm Mrs Krüger."),
      you("Freut mich! Wo stehen die Mülltonnen?", "Say pleased to meet you and ask where the bins are.", ["Wo stehen die Mülltonnen?"]),
      tutor("Im Hof, hinter dem Haus.", "In the courtyard, behind the building."),
      you("Danke! Wir machen am Samstag eine kleine Einweihungsparty.", "Thank her and say you're having a small housewarming party on Saturday.", ["Wir machen am Samstag eine Party."]),
    ],
  },
]);
