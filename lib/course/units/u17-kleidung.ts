import { defineUnit, p, tutor, you } from "../define";

export const unit17 = defineUnit(17, "A2", "Kleidung und Mode", "Shop for clothes, describe them with adjective endings and compare things.", [
  {
    title: "In the clothes shop",
    intro:
      "In a clothes shop you ask for a size, a colour and the changing room, and say whether something fits. 'passen' means to fit, 'stehen' means to suit: 'Die Hose passt, aber die Farbe steht mir nicht.'",
    phrases: [
      p("Ich suche eine Jacke für den Winter.", "I'm looking for a jacket for the winter.", { words: [["suchen", "look for"], ["Jacke", "jacket"]] }),
      p("Haben Sie das auch in Größe 40?", "Do you have that in size 40 too?", { accept: ["Haben Sie das auch in Größe vierzig?"], words: [["Größe", "size"]] }),
      p("Wo sind die Umkleidekabinen?", "Where are the changing rooms?", { words: [["Umkleidekabine", "changing room"]] }),
      p("Die Hose passt mir nicht.", "The trousers don't fit me.", { words: [["Hose", "trousers"], ["passen", "fit"]], note: "'die Hose' is singular in German: 'Die Hose ist zu lang.'" }),
      p("Der Pullover ist zu eng.", "The jumper is too tight.", { words: [["Pullover", "jumper, sweater"], ["eng", "tight"]] }),
      p("Die Farbe steht Ihnen sehr gut.", "The colour really suits you.", { words: [["Farbe", "colour"], ["stehen", "suit (someone)"]] }),
      p("Kann ich mit Karte bezahlen?", "Can I pay by card?", { words: [["Karte", "card"], ["bezahlen", "pay"]] }),
    ],
    dialogue: [
      tutor("Guten Tag! Kann ich Ihnen helfen?", "Hello! Can I help you?"),
      you("Ja, ich suche eine Jacke für den Winter.", "Say yes, you're looking for a jacket for the winter.", ["Ich suche einen Pullover.", "Ich suche eine Hose."]),
      tutor("Welche Größe haben Sie?", "What size are you?"),
      you("Ich habe Größe {number}.", "Say your size.", ["Größe {number}, bitte."]),
      tutor("Hier, bitte. Die Umkleidekabinen sind dort hinten.", "Here you are. The changing rooms are back there."),
      you("Vielen Dank!", "Say thank you very much.", ["Danke schön!", "Danke!"]),
    ],
  },
  {
    title: "The red jacket (adjectives after der, die, das)",
    intro:
      "When an adjective comes before a noun, it takes an ending. After der, die, das the ending is easy: almost always -e in the nominative, and -en for masculine nouns in the accusative and for all plurals.",
    grammar: {
      title: "Adjective endings after the definite article",
      text: "Only the masculine accusative changes in the singular: den rot-en Mantel.",
      table: [
        ["", "Nominative", "Accusative"],
        ["masculine", "der rote Mantel", "den roten Mantel"],
        ["feminine", "die rote Jacke", "die rote Jacke"],
        ["neuter", "das rote Kleid", "das rote Kleid"],
        ["plural", "die roten Schuhe", "die roten Schuhe"],
      ],
    },
    phrases: [
      p("Der blaue Mantel ist schön.", "The blue coat is nice.", { words: [["Mantel", "coat"], ["blau", "blue"]] }),
      p("Ich nehme den schwarzen Pullover.", "I'll take the black jumper.", { words: [["schwarz", "black"]], note: "Masculine accusative: den + -en." }),
      p("Wie viel kostet das grüne Kleid?", "How much is the green dress?", { words: [["Kleid", "dress"], ["grün", "green"]] }),
      p("Die weißen Schuhe sind im Angebot.", "The white shoes are on offer.", { words: [["Schuhe", "shoes"], ["im Angebot", "on offer"]] }),
      p("Ich finde die rote Jacke toll.", "I think the red jacket is great.", { words: [["toll", "great"]] }),
      p("Kann ich das gestreifte Hemd anprobieren?", "Can I try on the striped shirt?", { words: [["gestreift", "striped"], ["Hemd", "shirt"], ["anprobieren", "try on"]] }),
    ],
    dialogue: [
      tutor("Na, wie gefällt dir der blaue Mantel?", "So, how do you like the blue coat?"),
      you("Der blaue Mantel ist schön, aber zu teuer.", "Say the blue coat is nice, but too expensive.", ["Er ist schön.", "Ich finde ihn zu teuer."]),
      tutor("Und die rote Jacke?", "And the red jacket?"),
      you("Ich finde die rote Jacke toll.", "Say you think the red jacket is great.", ["Die rote Jacke ist toll."]),
      tutor("Möchtest du sie anprobieren?", "Would you like to try it on?"),
      you("Ja, und ich nehme den schwarzen Pullover.", "Say yes, and you'll take the black jumper.", ["Ja, gern!"]),
    ],
  },
  {
    title: "A new shirt (adjectives after ein, kein, mein)",
    intro:
      "After ein, kein and possessives like mein, the adjective has to show the gender itself, because 'ein' doesn't: ein schwarzer Rock, ein weißes Hemd. In the accusative only the masculine changes again: einen schwarzen Rock.",
    grammar: {
      title: "Adjective endings after the indefinite article",
      text: "The endings -er (masculine) and -es (neuter) borrow the signal from der and das.",
      table: [
        ["", "Nominative", "Accusative"],
        ["masculine", "ein warmer Schal", "einen warmen Schal"],
        ["feminine", "eine neue Bluse", "eine neue Bluse"],
        ["neuter", "ein weißes Hemd", "ein weißes Hemd"],
        ["plural", "meine neuen Schuhe", "meine neuen Schuhe"],
      ],
    },
    phrases: [
      p("Ich brauche einen warmen Schal.", "I need a warm scarf.", { words: [["brauchen", "need"], ["Schal", "scarf"], ["warm", "warm"]] }),
      p("Das ist ein sehr schönes Hemd.", "That's a very nice shirt.", { words: [["Hemd", "shirt"]] }),
      p("Sie trägt eine elegante Bluse.", "She's wearing an elegant blouse.", { words: [["tragen", "wear"], ["Bluse", "blouse"]] }),
      p("Er hat einen neuen Anzug gekauft.", "He bought a new suit.", { words: [["Anzug", "suit"]] }),
      p("Meine neuen Schuhe sind sehr bequem.", "My new shoes are very comfortable.", { words: [["bequem", "comfortable"]] }),
      p("Ich suche ein Geschenk für meinen kleinen Bruder.", "I'm looking for a present for my little brother.", { words: [["Geschenk", "present"]], note: "'für' takes the accusative: meinen kleinen Bruder." }),
      p("Hast du keinen dicken Pullover?", "Don't you have a thick jumper?", { words: [["dick", "thick"]] }),
    ],
    dialogue: [
      tutor("Es ist kalt heute! Was brauchst du?", "It's cold today! What do you need?"),
      you("Ich brauche einen warmen Schal.", "Say you need a warm scarf.", ["Ich brauche einen warmen Pullover.", "Ich brauche eine warme Jacke."]),
      tutor("Hast du keinen dicken Pullover?", "Don't you have a thick jumper?"),
      you("Nein, ich habe nur ein dünnes Hemd.", "Say no, you only have a thin shirt.", ["Nein, leider nicht."]),
      tutor("Schau mal, das ist ein sehr schönes Hemd!", "Look, that's a very nice shirt!"),
      you("Ja, aber ich suche einen warmen Pullover.", "Say yes, but you're looking for a warm jumper.", ["Ja, das stimmt."]),
    ],
  },
  {
    title: "Bigger, cheaper, the best (comparing)",
    intro:
      "To compare, add -er to the adjective and use 'als': 'Die Jacke ist billiger als der Mantel.' Equal things use 'so … wie'. The superlative is 'am' + adjective + -sten. Short words often add an umlaut: groß, größer, am größten.",
    grammar: {
      title: "Comparative and superlative",
      text: "gut and gern are irregular. Short adjectives ending in -t, -d, -s, -ß or -z usually add -esten: am kürzesten.",
      table: [
        ["Adjective", "Comparative", "Superlative"],
        ["billig", "billiger", "am billigsten"],
        ["groß", "größer", "am größten"],
        ["warm", "wärmer", "am wärmsten"],
        ["gut", "besser", "am besten"],
        ["gern", "lieber", "am liebsten"],
      ],
    },
    phrases: [
      p("Die Jacke ist billiger als der Mantel.", "The jacket is cheaper than the coat.", { words: [["billiger", "cheaper"], ["als", "than"]] }),
      p("Der Rock ist so teuer wie die Hose.", "The skirt is as expensive as the trousers.", { words: [["Rock", "skirt"], ["so … wie", "as … as"]] }),
      p("Haben Sie das eine Nummer größer?", "Do you have that one size bigger?", { words: [["eine Nummer größer", "one size bigger"]] }),
      p("Diese Schuhe sind am bequemsten.", "These shoes are the most comfortable.", { words: [["am bequemsten", "most comfortable"]] }),
      p("Welches Kleid gefällt dir am besten?", "Which dress do you like best?", { words: [["am besten", "best"], ["gefallen", "please, be liked"]] }),
      p("Ich trage lieber Jeans als Röcke.", "I prefer wearing jeans to skirts.", { words: [["lieber", "rather"], ["Röcke", "skirts"]] }),
      p("Im Winter ist ein Mantel wärmer als eine Jacke.", "In winter a coat is warmer than a jacket.", { words: [["wärmer", "warmer"]] }),
    ],
    dialogue: [
      tutor("Welches Kleid gefällt dir am besten?", "Which dress do you like best?"),
      you("Das grüne Kleid gefällt mir am besten.", "Say you like the green dress best.", ["Das grüne.", "Das blaue Kleid gefällt mir am besten."]),
      tutor("Aber das blaue ist billiger als das grüne.", "But the blue one is cheaper than the green one."),
      you("Ja, aber das grüne ist schöner.", "Say yes, but the green one is nicer.", ["Das ist mir egal."]),
      tutor("Passt es dir?", "Does it fit you?"),
      you("Nein, haben Sie das eine Nummer größer?", "Say no, and ask the shop assistant for it one size bigger.", ["Es ist zu klein.", "Haben Sie das eine Nummer kleiner?"]),
    ],
  },
]);
