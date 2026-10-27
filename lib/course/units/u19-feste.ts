import { defineUnit, p, tutor, you } from "../define";

export const unit19 = defineUnit(19, "A2", "Feste und Essen", "Talk about festivals and food, invite and give presents, and use the dative with mir, dir, ihm.", [
  {
    title: "Festivals and invitations",
    intro:
      "Germans celebrate Weihnachten, Silvester, Ostern and of course birthdays. Each has its own greeting: 'Frohe Weihnachten!', 'Guten Rutsch!', 'Alles Gute zum Geburtstag!'. To invite someone, say 'Ich lade dich zu … ein' (einladen is separable).",
    phrases: [
      p("Alles Gute zum Geburtstag!", "Happy birthday!", { words: [["Alles Gute", "all the best"]] }),
      p("Frohe Weihnachten und einen guten Rutsch!", "Merry Christmas and a happy New Year!", { words: [["Weihnachten", "Christmas"], ["Rutsch", "slide (Guten Rutsch = happy New Year)"]] }),
      p("Ich lade dich zu meiner Party ein.", "I'm inviting you to my party.", { words: [["einladen", "invite"]] }),
      p("Am Samstag feiern wir meinen Geburtstag.", "On Saturday we're celebrating my birthday.", { words: [["feiern", "celebrate"]] }),
      p("Was soll ich mitbringen?", "What should I bring?", { words: [["mitbringen", "bring along"]] }),
      p("Vielen Dank für die Einladung!", "Thank you very much for the invitation!", { words: [["Einladung", "invitation"]] }),
      p("Leider kann ich nicht kommen.", "Unfortunately I can't come."),
    ],
    dialogue: [
      tutor("Am Samstag feiern wir meinen Geburtstag. Kommst du?", "On Saturday we're celebrating my birthday. Are you coming?"),
      you("Ja, gern! Vielen Dank für die Einladung!", "Say yes, gladly, and thank them for the invitation.", ["Ja, gern!", "Leider kann ich nicht kommen."]),
      tutor("Super! Die Party beginnt um acht.", "Great! The party starts at eight."),
      you("Was soll ich mitbringen?", "Ask what you should bring.", ["Soll ich etwas mitbringen?"]),
      tutor("Vielleicht einen Salat?", "Maybe a salad?"),
      you("Kein Problem, ich bringe einen Salat mit.", "Say no problem, you'll bring a salad.", ["Gern!", "Okay, mache ich."]),
    ],
  },
  {
    title: "To me, to you (dative pronouns)",
    intro:
      "Some pronouns change in the dative: mir, dir, ihm, ihr, uns, euch, Ihnen. You already know 'Wie geht es dir?' and 'Das tut mir leid'. The dative answers 'to whom?' or 'for whom?'.",
    grammar: {
      title: "Personal pronouns: nominative, accusative, dative",
      text: "Learn the dative column first: it appears in many everyday phrases.",
      table: [
        ["Nominative", "Accusative", "Dative"],
        ["ich", "mich", "mir"],
        ["du", "dich", "dir"],
        ["er / es", "ihn / es", "ihm"],
        ["sie", "sie", "ihr"],
        ["wir", "uns", "uns"],
        ["ihr", "euch", "euch"],
        ["sie / Sie", "sie / Sie", "ihnen / Ihnen"],
      ],
    },
    phrases: [
      p("Kannst du mir das Salz geben?", "Can you pass me the salt?", { words: [["mir", "(to) me"], ["Salz", "salt"]] }),
      p("Ich zeige dir die Fotos von der Party.", "I'll show you the photos from the party.", { words: [["zeigen", "show"], ["dir", "(to) you"]] }),
      p("Wir schreiben ihm eine Karte.", "We're writing him a card.", { words: [["ihm", "(to) him"]] }),
      p("Hast du ihr schon gratuliert?", "Have you congratulated her yet?", { words: [["gratulieren", "congratulate"], ["ihr", "(to) her"]], note: "'gratulieren' takes the dative." }),
      p("Das erkläre ich euch später.", "I'll explain that to you later.", { words: [["erklären", "explain"], ["euch", "(to) you all"]] }),
      p("Darf ich Ihnen noch etwas bringen?", "May I bring you anything else?", { words: [["Ihnen", "(to) you, polite"], ["noch etwas", "anything else"]] }),
    ],
    dialogue: [
      tutor("Wie war die Party?", "How was the party?"),
      you("Super! Ich zeige dir die Fotos von der Party.", "Say great, and that you'll show them the photos from the party.", ["Toll! Ich zeige dir die Fotos."]),
      tutor("Oh, schön! Ist das Anna?", "Oh, nice! Is that Anna?"),
      you("Ja, sie hatte Geburtstag.", "Say yes, it was her birthday.", ["Ja, das ist Anna."]),
      tutor("Ach, das wusste ich nicht! Ich schreibe ihr eine Nachricht.", "Oh, I didn't know that! I'll write her a message."),
      you("Gute Idee, sie freut sich bestimmt.", "Say good idea, she'll certainly be pleased.", ["Gute Idee!"]),
    ],
  },
  {
    title: "It tastes good to me (dative verbs)",
    intro:
      "A few verbs always take the dative, and the person is in the dative, not the nominative: 'Die Suppe schmeckt mir' (literally: the soup tastes good to me). The most useful ones are gefallen, schmecken, gehören, helfen, passen and danken.",
    grammar: {
      title: "Verbs with the dative",
      text: "The thing is often the subject; the person who likes it is in the dative.",
      table: [
        ["Verb", "Meaning", "Example"],
        ["schmecken", "taste (good)", "Der Kuchen schmeckt mir."],
        ["gefallen", "like, please", "Das Fest gefällt uns."],
        ["gehören", "belong to", "Die Tasche gehört ihr."],
        ["helfen", "help", "Ich helfe dir."],
        ["passen", "suit, fit, work for", "Samstag passt mir gut."],
      ],
    },
    phrases: [
      p("Der Kuchen schmeckt mir sehr gut.", "I really like the cake.", { words: [["schmecken", "taste"]] }),
      p("Wie gefällt dir das Fest?", "How are you enjoying the festival?", { words: [["Fest", "festival, party"], ["gefallen", "please"]] }),
      p("Wem gehört diese Jacke?", "Whose jacket is this?", { words: [["wem", "to whom"], ["gehören", "belong"]] }),
      p("Die Jacke gehört ihm.", "The jacket is his.", { words: [["ihm", "to him"]] }),
      p("Kann ich dir in der Küche helfen?", "Can I help you in the kitchen?", { words: [["helfen", "help"]] }),
      p("Passt euch Sonntag um drei?", "Does Sunday at three suit you?", { accept: ["Passt euch Sonntag um 3?"], words: [["passen", "suit"]] }),
      p("Das Essen hat uns sehr gut geschmeckt.", "We really enjoyed the meal.", { words: [["geschmeckt", "tasted"]] }),
    ],
    dialogue: [
      tutor("Wie gefällt dir das Fest?", "How are you enjoying the party?"),
      you("Sehr gut! Der Kuchen schmeckt mir sehr gut.", "Say very much, and that you really like the cake.", ["Es gefällt mir sehr gut.", "Super!"]),
      tutor("Danke! Den habe ich selbst gebacken.", "Thanks! I baked it myself."),
      you("Kann ich dir in der Küche helfen?", "Offer to help in the kitchen.", ["Kann ich dir helfen?"]),
      tutor("Gern! Ach, wem gehört diese Jacke?", "Gladly! Oh, whose jacket is this?"),
      you("Die Jacke gehört mir.", "Say the jacket is yours.", ["Sie gehört mir.", "Ich weiß es nicht."]),
    ],
  },
  {
    title: "Giving presents (Ich schenke dir …)",
    intro:
      "Verbs like schenken, geben, bringen and kaufen often have two objects: a person (dative) and a thing (accusative). The person usually comes first: 'Ich schenke meiner Mutter Blumen.' If the thing is a pronoun, it comes first: 'Ich schenke sie ihr.'",
    grammar: {
      title: "Dative person + accusative thing",
      text: "Dative articles: dem (m./n.), der (f.), den + -n (plural). Possessives follow: meinem, meiner, meinen.",
      table: [
        ["Subject", "Verb", "Dative (who?)", "Accusative (what?)"],
        ["Ich", "schenke", "dir", "ein Buch."],
        ["Wir", "kaufen", "unserem Vater", "eine Uhr."],
        ["Sie", "gibt", "ihrer Freundin", "einen Kuchen."],
        ["Er", "bringt", "den Kindern", "Schokolade."],
      ],
    },
    phrases: [
      p("Was schenkst du deiner Schwester?", "What are you giving your sister?", { words: [["schenken", "give (as a present)"], ["deiner Schwester", "(to) your sister"]] }),
      p("Ich schenke ihr ein Buch.", "I'm giving her a book."),
      p("Wir kaufen unserem Vater eine neue Uhr.", "We're buying our father a new watch.", { words: [["Uhr", "watch, clock"]] }),
      p("Er bringt den Kindern Schokolade mit.", "He's bringing the children some chocolate.", { words: [["den Kindern", "(to) the children"]], note: "Dative plural adds -n: die Kinder → den Kindern." }),
      p("Das ist ein Geschenk für dich.", "This is a present for you.", { note: "'für' takes the accusative: für dich, not für dir." }),
      p("Vielen Dank, das ist sehr lieb von dir!", "Thank you so much, that's very kind of you!", { words: [["lieb", "kind, sweet"]] }),
      p("Hast du ihm schon etwas gekauft?", "Have you bought him something yet?"),
    ],
    dialogue: [
      tutor("Meine Schwester hat morgen Geburtstag.", "It's my sister's birthday tomorrow."),
      you("Was schenkst du deiner Schwester?", "Ask what they're giving their sister.", ["Was schenkst du ihr?"]),
      tutor("Ich weiß es noch nicht. Hast du eine Idee?", "I don't know yet. Do you have an idea?"),
      you("Schenk ihr doch ein Buch!", "Suggest giving her a book.", ["Schenk ihr doch Blumen!", "Vielleicht ein Buch?"]),
      tutor("Gute Idee! Und das hier ist ein Geschenk für dich.", "Good idea! And this is a present for you."),
      you("Vielen Dank, das ist sehr lieb von dir!", "Thank them warmly, say it's very kind.", ["Oh, danke schön!"]),
    ],
  },
]);
