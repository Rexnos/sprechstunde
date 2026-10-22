import { defineUnit, p, tutor, you } from "../define";

export const unit4 = defineUnit(4, "Im Café", "Order food and drinks, ask about prices and pay.", [
  {
    title: "Ordering a drink",
    intro:
      "'Ich möchte …' (I would like …) and 'Ich hätte gern …' are the polite ways to order. Adding 'bitte' at the end is always good.",
    grammar: {
      title: "ein / eine / einen",
      text: "German nouns are masculine (der), feminine (die) or neuter (das). After 'möchte', 'a' changes for masculine nouns only.",
      table: [
        ["der Kaffee", "Ich möchte einen Kaffee."],
        ["die Cola", "Ich möchte eine Cola."],
        ["das Wasser", "Ich möchte ein Wasser."],
      ],
    },
    phrases: [
      p("Was möchten Sie?", "What would you like? (polite)", { words: [["was", "what"], ["möchten", "would like"], ["Sie", "you"]] }),
      p("Ich möchte einen Kaffee, bitte.", "I'd like a coffee, please.", { words: [["möchte", "would like"], ["einen", "a"], ["Kaffee", "coffee"]] }),
      p("Ich hätte gern einen Tee.", "I'd like a tea.", { words: [["hätte gern", "would gladly have"]] }),
      p("Ein Wasser, bitte.", "A water, please."),
      p("Mit Milch, bitte.", "With milk, please.", { words: [["mit", "with"], ["Milch", "milk"]] }),
      p("Ohne Zucker.", "Without sugar.", { words: [["ohne", "without"], ["Zucker", "sugar"]] }),
      p("Groß oder klein?", "Large or small?"),
    ],
    dialogue: [
      tutor("Guten Tag! Was möchten Sie?", "Hello! What would you like?"),
      you("Ich möchte einen Kaffee, bitte.", "Order a coffee, politely.", ["Einen Kaffee, bitte.", "Ich hätte gern einen Kaffee."]),
      tutor("Mit Milch?", "With milk?"),
      you("Ja, mit Milch, bitte.", "Say yes, with milk, please.", ["Mit Milch, bitte.", "Ja, bitte."]),
      tutor("Groß oder klein?", "Large or small?"),
      you("Groß, bitte.", "Say large, please.", ["Klein, bitte."]),
    ],
  },
  {
    title: "Something to eat",
    intro:
      "German cafés serve cakes (Kuchen), sandwiches (belegte Brötchen) and breakfast. To ask what there is, say 'Was gibt es?' To ask for the menu, 'Die Karte, bitte.'",
    phrases: [
      p("Die Karte, bitte.", "The menu, please.", { words: [["die Karte", "the menu"]] }),
      p("Was gibt es heute?", "What is there today?", { words: [["was gibt es", "what is there"], ["heute", "today"]] }),
      p("Ich nehme den Apfelkuchen.", "I'll have the apple cake.", { words: [["nehme", "take"], ["Apfelkuchen", "apple cake"]] }),
      p("Ein Brötchen mit Käse, bitte.", "A roll with cheese, please.", { words: [["Brötchen", "bread roll"], ["Käse", "cheese"]] }),
      p("Ich bin Vegetarier.", "I'm vegetarian. (male)", { note: "Female: Ich bin Vegetarierin." }),
      p("Ist das mit Fleisch?", "Is that with meat?", { words: [["Fleisch", "meat"]] }),
      p("Das schmeckt gut!", "That tastes good!", { words: [["schmeckt", "tastes"]] }),
    ],
    dialogue: [
      tutor("Möchten Sie auch etwas essen?", "Would you also like something to eat?"),
      you("Ja. Was gibt es heute?", "Say yes and ask what there is today.", ["Was gibt es heute?"]),
      tutor("Apfelkuchen und Brötchen mit Käse.", "Apple cake and cheese rolls."),
      you("Ich nehme den Apfelkuchen.", "Choose the apple cake.", ["Den Apfelkuchen, bitte.", "Ein Brötchen mit Käse, bitte."]),
      tutor("Gern!", "Gladly!"),
    ],
  },
  {
    title: "How much is it?",
    intro:
      "Prices are said as euros and cents: 3,50 € is 'drei Euro fünfzig'. 'Was kostet …?' asks the price of one thing; 'Wie viel kostet das?' works for anything.",
    phrases: [
      p("Was kostet der Kaffee?", "How much is the coffee?", { words: [["was kostet", "what costs"]] }),
      p("Wie viel kostet das?", "How much does that cost?"),
      p("Das kostet drei Euro fünfzig.", "That's 3.50 euros.", { accept: ["Das kostet 3 Euro 50."] }),
      p("Das ist teuer.", "That's expensive.", { words: [["teuer", "expensive"]] }),
      p("Das ist günstig.", "That's cheap / good value.", { words: [["günstig", "cheap, good value"]] }),
      p("Zwei Euro zwanzig.", "2.20 euros.", { accept: ["2 Euro 20."] }),
    ],
    dialogue: [
      tutor("Bitte schön, Ihr Kaffee.", "Here you go, your coffee."),
      you("Danke! Was kostet der Kaffee?", "Thank them and ask how much the coffee is.", ["Was kostet der Kaffee?", "Wie viel kostet das?"]),
      tutor("Drei Euro fünfzig.", "Three euros fifty."),
      you("Okay, danke.", "Say okay, thanks.", ["Danke.", "Gut, danke."]),
    ],
  },
  {
    title: "Paying",
    intro:
      "In Germany you often pay at the table. Say 'Zahlen, bitte!' or 'Die Rechnung, bitte.' The waiter may ask 'Zusammen oder getrennt?' (together or separately). Card payment is common, but ask first.",
    phrases: [
      p("Zahlen, bitte!", "The bill, please! (I'd like to pay)", { words: [["zahlen", "to pay"]] }),
      p("Die Rechnung, bitte.", "The bill, please.", { words: [["die Rechnung", "the bill"]] }),
      p("Zusammen oder getrennt?", "Together or separately?"),
      p("Getrennt, bitte.", "Separately, please."),
      p("Kann ich mit Karte zahlen?", "Can I pay by card?", { words: [["kann", "can"], ["mit Karte", "by card"]] }),
      p("Stimmt so.", "Keep the change.", { note: "Said when you hand over the money, to include a tip." }),
      p("Einen schönen Tag noch!", "Have a nice day!"),
    ],
    dialogue: [
      you("Entschuldigung! Zahlen, bitte!", "Call the waiter and ask to pay.", ["Zahlen, bitte!", "Die Rechnung, bitte."]),
      tutor("Zusammen oder getrennt?", "Together or separately?"),
      you("Zusammen, bitte.", "Say together, please.", ["Getrennt, bitte."]),
      tutor("Das macht sieben Euro.", "That comes to seven euros."),
      you("Kann ich mit Karte zahlen?", "Ask if you can pay by card."),
      tutor("Ja, natürlich. Einen schönen Tag noch!", "Yes, of course. Have a nice day!"),
      you("Danke, Ihnen auch!", "Say thanks, you too (polite).", ["Danke, gleichfalls!", "Danke!"]),
    ],
  },
]);
