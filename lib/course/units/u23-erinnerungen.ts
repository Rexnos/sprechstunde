import { defineUnit, p, tutor, you } from "../define";

export const unit23 = defineUnit(23, "B1", "Erinnerungen", "Tell stories and share childhood memories using the Präteritum, and choose between als and wenn.", [
  {
    title: "Telling stories (regular verbs)",
    intro:
      "In written stories, books and the news, Germans use the Präteritum (simple past) instead of the Perfekt. You already know 'war', 'hatte' and the modals. Regular verbs work the same way: stem + -te, plus the person ending: ich machte, wir machten.",
    grammar: {
      title: "Präteritum of regular verbs",
      text: "Stem + -te. Stems ending in -t or -d add -ete: arbeiten → arbeitete. ich and er/sie/es are the same.",
      table: [
        ["", "machen", "wohnen", "arbeiten"],
        ["ich / er / sie / es", "machte", "wohnte", "arbeitete"],
        ["du", "machtest", "wohntest", "arbeitetest"],
        ["wir / sie / Sie", "machten", "wohnten", "arbeiteten"],
        ["ihr", "machtet", "wohntet", "arbeitetet"],
      ],
    },
    phrases: [
      p("Früher wohnte ich in einem kleinen Dorf.", "In the past I lived in a small village.", { words: [["früher", "in the past"], ["wohnte", "lived"], ["Dorf", "village"]] }),
      p("Mein Vater arbeitete in einer Fabrik.", "My father worked in a factory.", { words: [["arbeitete", "worked"], ["Fabrik", "factory"]] }),
      p("Wir spielten jeden Tag draußen.", "We played outside every day.", { words: [["spielten", "played"], ["draußen", "outside"]] }),
      p("Meine Oma kochte jeden Sonntag für die ganze Familie.", "My grandma cooked for the whole family every Sunday.", { words: [["kochte", "cooked"], ["ganze", "whole"]] }),
      p("Damals lernte ich Klavier.", "Back then I was learning the piano.", { words: [["damals", "back then"], ["lernte", "learned, was learning"], ["Klavier", "piano"]] }),
      p("Sie lachten die ganze Zeit.", "They laughed the whole time.", { words: [["lachten", "laughed"]] }),
      p("Es regnete den ganzen Nachmittag.", "It rained all afternoon.", { words: [["regnete", "rained"], ["Nachmittag", "afternoon"]] }),
    ],
    dialogue: [
      tutor("Erzähl mal: Wie war deine Kindheit?", "Tell me: what was your childhood like?"),
      you("Früher wohnte ich in {city}.", "Say where you used to live (Präteritum).", ["Früher wohnte ich in einem kleinen Dorf.", "Ich wohnte in {city}."]),
      tutor("Und was machten deine Eltern?", "And what did your parents do?"),
      you("Mein Vater arbeitete in einer Fabrik.", "Say your father worked in a factory.", ["Meine Mutter arbeitete als {job}.", "Mein Vater arbeitete als {job}."]),
      tutor("Und was habt ihr Kinder gemacht?", "And what did you kids do?"),
      you("Wir spielten jeden Tag draußen.", "Say you played outside every day.", ["Wir spielten draußen.", "Wir spielten Fußball."]),
    ],
  },
  {
    title: "Irregular verbs: ging, kam, sah",
    intro:
      "Irregular verbs change their vowel in the Präteritum and take no -te: gehen → ging, kommen → kam, sehen → sah. The ich and er/sie/es forms have no ending at all. Learn them together with the participle you already know: gehen, ging, gegangen.",
    grammar: {
      title: "Präteritum of irregular verbs",
      text: "ich and er/sie/es have no ending; du adds -st (du gingst), wir and sie add -en (wir gingen, sie kamen).",
      table: [
        ["Infinitive", "Präteritum", "Perfekt"],
        ["gehen", "ging", "ist gegangen"],
        ["kommen", "kam", "ist gekommen"],
        ["sehen", "sah", "hat gesehen"],
        ["fahren", "fuhr", "ist gefahren"],
        ["finden", "fand", "hat gefunden"],
        ["geben", "gab", "hat gegeben"],
        ["trinken", "trank", "hat getrunken"],
      ],
    },
    phrases: [
      p("Am Morgen ging ich zum Bahnhof.", "In the morning I went to the station.", { words: [["ging", "went"], ["Bahnhof", "station"]] }),
      p("Der Zug kam eine Stunde zu spät.", "The train came an hour late.", { words: [["kam", "came"], ["zu spät", "late"]] }),
      p("Plötzlich sah ich einen alten Freund.", "Suddenly I saw an old friend.", { words: [["plötzlich", "suddenly"], ["sah", "saw"]] }),
      p("Wir fuhren zusammen nach Hamburg.", "We travelled to Hamburg together.", { words: [["fuhren", "travelled, drove"], ["zusammen", "together"]] }),
      p("Unterwegs fand er eine Geldbörse.", "On the way he found a wallet.", { words: [["unterwegs", "on the way"], ["fand", "found"], ["Geldbörse", "wallet, purse"]] }),
      p("Sie gab mir ihre Telefonnummer.", "She gave me her phone number.", { words: [["gab", "gave"]] }),
      p("Danach tranken wir einen Kaffee.", "Afterwards we had a coffee.", { words: [["danach", "afterwards"], ["tranken", "drank"]] }),
    ],
    dialogue: [
      tutor("Du siehst glücklich aus! Was ist passiert?", "You look happy! What happened?"),
      you("Der Zug kam eine Stunde zu spät.", "Say the train came an hour late.", ["Der Zug kam zu spät.", "Am Morgen ging ich zum Bahnhof."]),
      tutor("Oh nein! Und dann?", "Oh no! And then?"),
      you("Plötzlich sah ich einen alten Freund.", "Say suddenly you saw an old friend.", ["Plötzlich sah ich eine alte Freundin.", "Ich sah einen alten Freund."]),
      tutor("Was für ein Zufall! Was habt ihr gemacht?", "What a coincidence! What did you do?"),
      you("Danach tranken wir einen Kaffee.", "Say that afterwards you had a coffee.", ["Wir tranken einen Kaffee.", "Wir fuhren zusammen nach {city}."]),
    ],
  },
  {
    title: "als or wenn?",
    intro:
      "Both 'als' and 'wenn' can mean 'when', but in the past they're different. 'Als' is for one single event or one period: 'Als ich zehn war, …'. 'Wenn' (often 'immer wenn') is for things that happened again and again. Both send the verb to the end.",
    grammar: {
      title: "als vs. wenn",
      text: "If the 'when' clause comes first, the main clause starts with its verb: Als ich kam, schlief er schon.",
      table: [
        ["Word", "Use", "Example"],
        ["als", "once, or one period in the past", "Als ich klein war, wohnten wir in Köln."],
        ["wenn", "again and again in the past", "Immer wenn es schneite, bauten wir einen Schneemann."],
        ["wenn", "present and future", "Wenn ich Zeit habe, lese ich."],
      ],
    },
    phrases: [
      p("Als ich sechs Jahre alt war, kam ich in die Schule.", "When I was six, I started school.", { accept: ["Als ich 6 Jahre alt war, kam ich in die Schule."], words: [["in die Schule kommen", "start school"]] }),
      p("Als wir nach Deutschland kamen, sprachen wir kein Wort Deutsch.", "When we came to Germany, we didn't speak a word of German.", { words: [["sprachen", "spoke"], ["Wort", "word"]] }),
      p("Immer wenn es schneite, bauten wir einen Schneemann.", "Whenever it snowed, we built a snowman.", { words: [["immer wenn", "whenever"], ["schneite", "snowed"], ["bauten", "built"]] }),
      p("Wenn meine Oma kam, brachte sie immer Schokolade mit.", "Whenever my grandma came, she always brought chocolate.", { words: [["brachte … mit", "brought along (mitbringen)"]], note: "Separable verbs split in the Präteritum too: mitbringen → brachte … mit." }),
      p("Als ich den Brief las, war ich sehr überrascht.", "When I read the letter, I was very surprised.", { words: [["las", "read (past)"], ["überrascht", "surprised"]] }),
      p("Wenn wir Ferien hatten, fuhren wir ans Meer.", "Whenever we had holidays, we went to the sea.", { words: [["Ferien", "school holidays"], ["Meer", "sea"]] }),
      p("Als er anrief, schlief ich schon.", "When he called, I was already asleep.", { words: [["anrief", "called (anrufen)"], ["schlief", "slept, was asleep"]] }),
    ],
    dialogue: [
      tutor("Wann bist du in die Schule gekommen?", "When did you start school?"),
      you("Als ich {number} Jahre alt war.", "Say how old you were (with als).", ["Als ich sechs Jahre alt war, kam ich in die Schule.", "Als ich sechs war."]),
      tutor("Und was hast du im Winter gern gemacht?", "And what did you like doing in winter?"),
      you("Immer wenn es schneite, bauten wir einen Schneemann.", "Say whenever it snowed, you built a snowman.", ["Wenn es schneite, bauten wir einen Schneemann."]),
      tutor("Und in den Ferien?", "And in the holidays?"),
      you("Wenn wir Ferien hatten, fuhren wir ans Meer.", "Say when you had holidays, you went to the sea.", ["Wenn wir Ferien hatten, fuhren wir zu meiner Oma.", "Wir fuhren ans Meer."]),
    ],
  },
  {
    title: "Childhood memories",
    intro:
      "To share memories you need a few useful expressions: 'sich erinnern an' + accusative (remember), 'damals' (back then) and 'früher' (in the past, used to). In conversation people mix tenses freely: Präteritum for sein, haben, es gab and the modals, Perfekt for most other verbs.",
    phrases: [
      p("Ich erinnere mich gern an meine Kindheit.", "I have fond memories of my childhood.", { words: [["sich erinnern an", "remember"], ["Kindheit", "childhood"]] }),
      p("Daran kann ich mich nicht mehr erinnern.", "I can't remember that anymore.", { words: [["daran", "that (an + das)"], ["nicht mehr", "no longer"]] }),
      p("Damals gab es noch kein Internet.", "Back then there was no internet yet.", { words: [["es gab", "there was (es gibt)"]] }),
      p("Mein Lieblingsspielzeug war ein rotes Fahrrad.", "My favourite toy was a red bike.", { words: [["Lieblingsspielzeug", "favourite toy"]] }),
      p("Früher hatte ich Angst vor Hunden.", "I used to be afraid of dogs.", { words: [["Angst haben vor", "be afraid of"]] }),
      p("Meine beste Freundin wohnte direkt nebenan.", "My best friend lived right next door.", { words: [["nebenan", "next door"]] }),
      p("Das waren schöne Zeiten!", "Those were good times!", { words: [["Zeiten", "times"]] }),
    ],
    dialogue: [
      tutor("Woran erinnerst du dich aus deiner Kindheit?", "What do you remember from your childhood?"),
      you("Ich erinnere mich gern an meine Kindheit.", "Say you have fond memories of your childhood.", ["Ich erinnere mich an {thing}.", "Daran kann ich mich nicht mehr erinnern."]),
      tutor("Hattest du ein Lieblingsspielzeug?", "Did you have a favourite toy?"),
      you("Mein Lieblingsspielzeug war ein rotes Fahrrad.", "Say your favourite toy was a red bike.", ["Mein Lieblingsspielzeug war {thing}.", "Ja, ein rotes Fahrrad."]),
      tutor("Damals gab es noch kein Internet, oder?", "Back then there was no internet yet, right?"),
      you("Nein, aber das waren schöne Zeiten!", "Say no, but those were good times.", ["Das waren schöne Zeiten!", "Nein, damals gab es noch kein Internet."]),
    ],
  },
]);
