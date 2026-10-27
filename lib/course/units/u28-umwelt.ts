import { defineUnit, p, tutor, you } from "../define";

export const unit28 = defineUnit(28, "B1", "Umwelt und Natur", "Use the genitive and the prepositions wegen, trotz and während, and talk about recycling, climate and saving energy.", [
  {
    title: "The genitive: des and der",
    intro:
      "The genitive shows belonging, like English 'of' or 's: 'das Auto meines Vaters' (my father's car). Masculine and neuter nouns take 'des' and add -s or -es (short nouns usually -es); feminine and plural nouns take 'der' and add nothing. With names, just add -s: 'Annas Garten'.",
    grammar: {
      title: "Genitive forms",
      text: "The genitive noun comes after the noun it belongs to: die Luft der Stadt (the city's air).",
      table: [
        ["", "masculine", "feminine", "neuter", "plural"],
        ["article", "des Waldes", "der Stadt", "des Meeres", "der Kinder"],
        ["possessive", "meines Vaters", "meiner Mutter", "meines Kindes", "meiner Eltern"],
      ],
    },
    phrases: [
      p("Das ist das Auto meines Vaters.", "That's my father's car.", { words: [["meines Vaters", "of my father"]] }),
      p("Die Luft der Stadt ist sehr schmutzig.", "The city's air is very dirty.", { words: [["Luft", "air"], ["schmutzig", "dirty"]] }),
      p("Am Ende des Sommers war der See fast leer.", "At the end of the summer the lake was almost empty.", { words: [["Ende", "end"], ["See", "lake"], ["leer", "empty"]] }),
      p("Die Zukunft unserer Kinder ist mir wichtig.", "Our children's future is important to me.", { words: [["Zukunft", "future"]] }),
      p("Das Wasser des Flusses ist wieder sauber.", "The river's water is clean again.", { words: [["Fluss", "river"], ["sauber", "clean"]] }),
      p("Die Hälfte des Waldes ist abgebrannt.", "Half of the forest has burned down.", { words: [["Hälfte", "half"], ["Wald", "forest"], ["abbrennen", "burn down"]] }),
      p("Annas Garten ist voller Bienen.", "Anna's garden is full of bees.", { words: [["voller", "full of"], ["Bienen", "bees"]], note: "Names take -s with no apostrophe." }),
    ],
    dialogue: [
      tutor("Wem gehört das alte Auto da?", "Who does that old car belong to?"),
      you("Das ist das Auto meines Vaters.", "Say it's your father's car.", ["Das ist das Auto meiner Mutter.", "Das Auto meines Bruders."]),
      tutor("Wie ist die Luft in deiner Stadt?", "What's the air like in your city?"),
      you("Die Luft der Stadt ist sehr schmutzig.", "Say the city's air is very dirty.", ["Die Luft ist sehr sauber.", "Die Luft ist leider schmutzig."]),
      tutor("Warum ist dir die Umwelt so wichtig?", "Why does the environment matter so much to you?"),
      you("Die Zukunft unserer Kinder ist mir wichtig.", "Say your children's future is important to you.", ["Wegen der Zukunft unserer Kinder."]),
    ],
  },
  {
    title: "wegen, trotz, während",
    intro:
      "Three common prepositions take the genitive: 'wegen' (because of), 'trotz' (despite) and 'während' (during). In everyday speech many people use the dative after them ('wegen dem Wetter'), but in writing the genitive is correct: 'wegen des Wetters'.",
    grammar: {
      title: "Prepositions with the genitive",
      text: "After an article, adjectives in the genitive end in -en: trotz des schlechten Wetters.",
      table: [
        ["Preposition", "Meaning", "Example"],
        ["wegen", "because of", "wegen des Regens"],
        ["trotz", "despite", "trotz der Hitze"],
        ["während", "during", "während des Sommers"],
      ],
    },
    phrases: [
      p("Wegen des Regens bleiben wir zu Hause.", "Because of the rain we're staying at home.", { words: [["wegen", "because of"], ["Regen", "rain"]] }),
      p("Trotz der Hitze sind wir gewandert.", "Despite the heat we went hiking.", { words: [["trotz", "despite"], ["Hitze", "heat"], ["wandern", "hike"]] }),
      p("Während des Sturms ist ein Baum umgefallen.", "During the storm a tree fell over.", { words: [["während", "during"], ["Sturm", "storm"], ["umfallen", "fall over"]] }),
      p("Wegen der Trockenheit darf man im Wald kein Feuer machen.", "Because of the drought you're not allowed to light fires in the forest.", { words: [["Trockenheit", "drought, dryness"], ["Feuer", "fire"]] }),
      p("Trotz des schlechten Wetters fahren viele Leute Fahrrad.", "Despite the bad weather, many people cycle."),
      p("Während der Ferien war der Strand sehr voll.", "During the holidays the beach was very crowded.", { words: [["Strand", "beach"], ["voll", "full, crowded"]] }),
      p("Die Straße ist wegen eines Unfalls gesperrt.", "The road is closed because of an accident.", { words: [["Unfall", "accident"], ["gesperrt", "closed"]] }),
    ],
    dialogue: [
      tutor("Machen wir heute die Wanderung?", "Are we doing the hike today?"),
      you("Nein, wegen des Regens bleiben wir zu Hause.", "Say no, because of the rain you're staying at home.", ["Wegen des Regens nicht.", "Ja, trotz des Regens!"]),
      tutor("Schade. Und wie war euer Urlaub am Meer?", "Pity. And how was your holiday by the sea?"),
      you("Während der Ferien war der Strand sehr voll.", "Say the beach was very crowded during the holidays.", ["Der Strand war sehr voll.", "Trotz der Hitze war es schön."]),
      tutor("Habt ihr auch gegrillt?", "Did you have a barbecue too?"),
      you("Nein, wegen der Trockenheit durfte man kein Feuer machen.", "Say no, you weren't allowed to light fires because of the drought.", ["Nein, das durfte man nicht."]),
    ],
  },
  {
    title: "Sorting the rubbish",
    intro:
      "Germans take 'Mülltrennung' (separating rubbish) seriously. There are different bins: 'Biomüll' (food and garden waste), 'Papier', the 'gelber Sack' or 'gelbe Tonne' (packaging) and 'Restmüll' (everything else). Glass goes to a bottle bank, and many bottles have a 'Pfand' (deposit).",
    phrases: [
      p("In welche Tonne kommt der Joghurtbecher?", "Which bin does the yoghurt pot go in?", { words: [["Tonne", "bin"], ["Joghurtbecher", "yoghurt pot"]] }),
      p("Verpackungen kommen in den gelben Sack.", "Packaging goes in the yellow bag.", { words: [["Verpackungen", "packaging"], ["Sack", "bag, sack"]] }),
      p("Die Pfandflaschen bringe ich zurück in den Supermarkt.", "I take the deposit bottles back to the supermarket.", { words: [["Pfandflaschen", "deposit bottles"]] }),
      p("Altglas wirft man in den Container an der Ecke.", "Old glass goes into the container on the corner.", { words: [["Altglas", "used glass"], ["werfen", "throw"]] }),
      p("Wir vermeiden Plastik, wo es geht.", "We avoid plastic wherever possible.", { words: [["vermeiden", "avoid"], ["wo es geht", "wherever possible"]] }),
      p("Ich nehme immer eine Tasche zum Einkaufen mit.", "I always take a bag with me when I go shopping.", { words: [["mitnehmen", "take along"]] }),
      p("Batterien gehören nicht in den Restmüll.", "Batteries don't belong in general waste.", { words: [["Restmüll", "general waste"]] }),
    ],
    dialogue: [
      tutor("Entschuldigung, in welche Tonne kommt der Joghurtbecher?", "Excuse me, which bin does the yoghurt pot go in?"),
      you("Verpackungen kommen in den gelben Sack.", "Say packaging goes in the yellow bag.", ["In den gelben Sack.", "In die gelbe Tonne."]),
      tutor("Und die leeren Flaschen?", "And the empty bottles?"),
      you("Die Pfandflaschen bringe ich zurück in den Supermarkt.", "Say you take deposit bottles back to the supermarket.", ["Die bringe ich in den Supermarkt.", "Altglas kommt in den Container."]),
      tutor("Und die alten Batterien?", "And the old batteries?"),
      you("Batterien gehören nicht in den Restmüll.", "Say batteries don't belong in general waste.", ["Die bringe ich in den Supermarkt.", "Nicht in den Restmüll!"]),
    ],
  },
  {
    title: "Climate and saving energy",
    intro:
      "Climate change ('der Klimawandel') is a big topic in Germany. To discuss it you need words like 'Energie sparen' (save energy), 'Strom' (electricity) and 'Heizung' (heating). Combine them with the genitive and with 'um … zu' and 'damit' from Unit 24.",
    phrases: [
      p("Der Klimawandel ist eines der größten Probleme unserer Zeit.", "Climate change is one of the biggest problems of our time.", { words: [["Klimawandel", "climate change"], ["eines der", "one of the"]] }),
      p("Um Energie zu sparen, dusche ich kürzer.", "To save energy, I take shorter showers.", { words: [["kürzer", "shorter"]] }),
      p("Wir drehen im Winter die Heizung herunter.", "In winter we turn the heating down.", { words: [["herunterdrehen", "turn down"], ["Heizung", "heating"]] }),
      p("Ich fahre mit dem Fahrrad, damit die Luft sauberer wird.", "I cycle so that the air gets cleaner."),
      p("Wenn du den Raum verlässt, mach bitte das Licht aus.", "When you leave the room, please switch off the light.", { words: [["verlassen", "leave"], ["ausmachen", "switch off"]] }),
      p("Immer mehr Strom kommt aus Wind und Sonne.", "More and more electricity comes from wind and sun.", { words: [["immer mehr", "more and more"], ["Strom", "electricity"]] }),
      p("Jeder kann etwas für die Umwelt tun.", "Everyone can do something for the environment.", { words: [["Umwelt", "environment"]] }),
    ],
    dialogue: [
      tutor("Was machst du, um Energie zu sparen?", "What do you do to save energy?"),
      you("Um Energie zu sparen, dusche ich kürzer.", "Say you take shorter showers to save energy.", ["Ich dusche kürzer.", "Ich mache das Licht aus."]),
      tutor("Und im Winter?", "And in winter?"),
      you("Wir drehen die Heizung herunter.", "Say you turn the heating down.", ["Im Winter drehen wir die Heizung herunter."]),
      tutor("Glaubst du, das hilft wirklich?", "Do you think that really helps?"),
      you("Ja, jeder kann etwas für die Umwelt tun.", "Say yes, everyone can do something for the environment.", ["Jeder kann etwas tun.", "Ich glaube schon."]),
    ],
  },
]);
