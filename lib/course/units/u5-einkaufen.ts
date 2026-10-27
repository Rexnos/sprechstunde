import { defineUnit, p, tutor, you } from "../define";

export const unit5 = defineUnit(5, "A1", "Einkaufen", "Shop for food and clothes: ask for things, colours, sizes and quantities.", [
  {
    title: "At the supermarket",
    intro:
      "'Ich suche …' means 'I'm looking for …'. 'Wo finde ich …?' (Where do I find …?) is useful in any shop. Remember: masculine nouns take 'einen' after verbs like suchen and brauchen.",
    grammar: {
      title: "Accusative: who or what you want",
      text: "After verbs like suchen (look for), brauchen (need), kaufen (buy), only the masculine article changes.",
      table: [
        ["", "nominative", "after suchen / brauchen"],
        ["masculine", "der / ein Apfel", "den / einen Apfel"],
        ["feminine", "die / eine Banane", "die / eine Banane"],
        ["neuter", "das / ein Brot", "das / ein Brot"],
      ],
    },
    phrases: [
      p("Ich suche Milch.", "I'm looking for milk.", { words: [["suche", "look for"], ["Milch", "milk"]] }),
      p("Wo finde ich Brot?", "Where do I find bread?", { words: [["wo", "where"], ["finde", "find"], ["Brot", "bread"]] }),
      p("Ich brauche einen Apfel.", "I need an apple.", { words: [["brauche", "need"], ["einen Apfel", "an apple"]] }),
      p("Haben Sie Bananen?", "Do you have bananas?"),
      p("Ein Kilo Tomaten, bitte.", "A kilo of tomatoes, please."),
      p("Eine Tüte, bitte.", "A bag, please.", { words: [["Tüte", "bag"]] }),
      p("Das ist alles.", "That's everything.", { words: [["alles", "everything"]] }),
    ],
    dialogue: [
      you("Entschuldigung, wo finde ich Brot?", "Ask where you can find bread.", ["Wo finde ich Brot?"]),
      tutor("Da hinten, links.", "Back there, on the left."),
      you("Danke! Haben Sie auch Bananen?", "Thank them and ask if they also have bananas.", ["Haben Sie Bananen?"]),
      tutor("Ja, beim Obst.", "Yes, with the fruit."),
      tutor("Noch etwas?", "Anything else?"),
      you("Nein, das ist alles.", "Say no, that's everything.", ["Das ist alles."]),
    ],
  },
  {
    title: "Colours and clothes",
    intro:
      "Colours after 'ist' don't change: 'Die Jacke ist rot.' Here you'll learn common colours and how to ask for something in another colour.",
    phrases: [
      p("rot, blau, grün, gelb", "red, blue, green, yellow"),
      p("schwarz, weiß, grau", "black, white, grey"),
      p("Ich suche eine Jacke.", "I'm looking for a jacket.", { words: [["eine Jacke", "a jacket"]] }),
      p("Die Jacke ist schön.", "The jacket is nice."),
      p("Haben Sie das auch in Blau?", "Do you also have this in blue?", { words: [["auch", "also"], ["in Blau", "in blue"]] }),
      p("Das gefällt mir.", "I like that.", { words: [["gefällt mir", "pleases me"]] }),
      p("Das gefällt mir nicht.", "I don't like that."),
    ],
    dialogue: [
      tutor("Hallo! Kann ich Ihnen helfen?", "Hello! Can I help you?"),
      you("Ja, ich suche eine Jacke.", "Say yes, you're looking for a jacket.", ["Ich suche eine Jacke."]),
      tutor("Wie gefällt Ihnen diese Jacke?", "How do you like this jacket?"),
      you("Schön! Haben Sie das auch in Blau?", "Say nice, and ask for it in blue.", ["Haben Sie das auch in Blau?"]),
      tutor("Ja, hier, bitte.", "Yes, here you go."),
      you("Das gefällt mir!", "Say you like it.", ["Die gefällt mir!"]),
    ],
  },
  {
    title: "Sizes and trying on",
    intro:
      "'Anprobieren' (to try on) is a separable verb: 'Kann ich das anprobieren?' Sizes are 'Größe 38' or S, M, L. 'Zu' means 'too': zu groß, zu klein.",
    phrases: [
      p("Welche Größe haben Sie?", "What size are you?", { words: [["welche", "which"], ["Größe", "size"]] }),
      p("Größe M, bitte.", "Size M, please."),
      p("Kann ich das anprobieren?", "Can I try this on?", { words: [["kann", "can"], ["anprobieren", "try on"]] }),
      p("Wo ist die Umkleidekabine?", "Where is the fitting room?"),
      p("Das ist zu groß.", "That's too big.", { words: [["zu", "too"], ["groß", "big"]] }),
      p("Das ist zu klein.", "That's too small."),
      p("Das passt gut.", "That fits well.", { words: [["passt", "fits"]] }),
    ],
    dialogue: [
      you("Kann ich das anprobieren?", "Ask if you can try it on."),
      tutor("Natürlich. Welche Größe haben Sie?", "Of course. What size are you?"),
      you("Größe {size}, bitte.", "Say your size."),
      tutor("Und? Passt es?", "Well? Does it fit?"),
      you("Nein, das ist zu klein.", "Say no, it's too small.", ["Das ist zu klein.", "Das ist zu groß."]),
      tutor("Hier ist eine Nummer größer.", "Here's one size bigger."),
    ],
  },
  {
    title: "Buying and deciding",
    intro:
      "To decide, say 'Ich nehme es' (I'll take it) or 'Ich überlege noch' (I'm still thinking). 'Ich schaue nur' politely tells a shop assistant you're just looking.",
    phrases: [
      p("Ich schaue nur, danke.", "I'm just looking, thanks.", { words: [["schaue", "look"], ["nur", "only"]] }),
      p("Ich nehme sie.", "I'll take it. (for a die-word like die Jacke)", { note: "Use 'ihn' for der-words and 'es' for das-words: Ich nehme ihn / es." }),
      p("Ich überlege noch.", "I'm still thinking about it."),
      p("Was kostet die Jacke?", "How much is the jacket?"),
      p("Ist das im Angebot?", "Is that on sale?", { words: [["im Angebot", "on offer"]] }),
      p("Kann ich das umtauschen?", "Can I exchange it?", { words: [["umtauschen", "exchange"]] }),
    ],
    dialogue: [
      tutor("Kann ich Ihnen helfen?", "Can I help you?"),
      you("Ich schaue nur, danke.", "Say you're just looking.", ["Nur schauen, danke."]),
      tutor("Gern. Sagen Sie Bescheid!", "Sure. Let me know!"),
      you("Was kostet die Jacke?", "A bit later: ask how much the jacket costs.", ["Wie viel kostet die Jacke?"]),
      tutor("Neunundfünfzig Euro.", "Fifty-nine euros."),
      you("Gut, ich nehme sie.", "Decide to buy the jacket.", ["Ich nehme sie.", "Ich überlege noch."]),
    ],
  },
]);
