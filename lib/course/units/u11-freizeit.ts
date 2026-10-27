import { defineUnit, p, tutor, you } from "../define";

export const unit11 = defineUnit(11, "A1", "Freizeit und Wetter", "Talk about hobbies, the weather, dates and what you want to do.", [
  {
    title: "Hobbies: gern, lieber, am liebsten",
    intro:
      "To say you like doing something, put 'gern' after the verb: 'Ich lese gern.' (I like reading.) 'lieber' means you prefer something, and 'am liebsten' says what you like best of all. 'nicht gern' means you don't like it.",
    grammar: {
      title: "gern – lieber – am liebsten",
      text: "gern goes after the verb. 'Am liebsten' often starts the sentence, so the verb comes next (verb second!).",
      table: [
        ["Word", "Example", "English"],
        ["gern", "Ich lese gern.", "I like reading."],
        ["nicht gern", "Ich koche nicht gern.", "I don't like cooking."],
        ["lieber", "Ich wandere lieber.", "I prefer hiking."],
        ["am liebsten", "Am liebsten höre ich Musik.", "Best of all I like listening to music."],
      ],
    },
    phrases: [
      p("Was machst du gern in deiner Freizeit?", "What do you like doing in your free time?", { words: [["gern", "gladly, with pleasure"], ["Freizeit", "free time"]] }),
      p("Ich lese gern.", "I like reading."),
      p("Ich spiele gern Fußball.", "I like playing football.", { words: [["spiele", "play"], ["Fußball", "football"]] }),
      p("Ich koche nicht gern.", "I don't like cooking."),
      p("Ich fahre gern Rad, aber ich wandere lieber.", "I like cycling, but I prefer hiking.", { words: [["Rad fahren", "cycle"], ["wandere", "hike"], ["lieber", "rather, preferably"]] }),
      p("Am liebsten höre ich Musik.", "Best of all I like listening to music.", { words: [["am liebsten", "most of all"], ["höre", "listen to, hear"]] }),
      p("Was ist dein Hobby?", "What's your hobby?"),
    ],
    dialogue: [
      tutor("Was machst du gern in deiner Freizeit?", "What do you like doing in your free time?"),
      you("Ich {verb} gern.", "Say something you like doing.", ["Ich lese gern.", "Ich spiele gern Fußball."]),
      tutor("Schön! Und was machst du am liebsten?", "Nice! And what do you like doing best?"),
      you("Am liebsten höre ich Musik.", "Say what you like doing best of all.", ["Am liebsten {verb} ich."]),
      tutor("Kochst du gern?", "Do you like cooking?"),
      you("Nein, ich koche nicht gern.", "Say no, you don't like cooking.", ["Ja, ich koche gern."]),
    ],
  },
  {
    title: "The weather and the seasons",
    intro:
      "Weather sentences usually start with 'Es': 'Es regnet' (it's raining), 'Es ist kalt' (it's cold). The four seasons are der Frühling, der Sommer, der Herbst and der Winter, and you say 'im Sommer' for 'in summer'.",
    phrases: [
      p("Wie ist das Wetter heute?", "What's the weather like today?", { words: [["Wetter", "weather"]] }),
      p("Die Sonne scheint.", "The sun is shining.", { words: [["Sonne", "sun"], ["scheint", "shines"]] }),
      p("Es regnet.", "It's raining."),
      p("Es ist kalt und windig.", "It's cold and windy.", { words: [["kalt", "cold"], ["windig", "windy"]] }),
      p("Es sind zwanzig Grad.", "It's twenty degrees.", { accept: ["Es sind 20 Grad."], words: [["Grad", "degrees"]] }),
      p("Im Sommer ist es oft heiß.", "In summer it's often hot.", { words: [["oft", "often"], ["heiß", "hot"]] }),
      p("Im Winter schneit es manchmal.", "In winter it sometimes snows.", { words: [["schneit", "snows"], ["manchmal", "sometimes"]] }),
      p("Meine Lieblingsjahreszeit ist der Herbst.", "My favourite season is autumn.", { words: [["Lieblings-", "favourite"], ["Jahreszeit", "season"], ["Herbst", "autumn"]] }),
    ],
    dialogue: [
      tutor("Wie ist das Wetter heute bei dir?", "What's the weather like where you are today?"),
      you("Es regnet.", "Say it's raining.", ["Die Sonne scheint.", "Es ist kalt.", "Es ist {weather}."]),
      tutor("Hier sind es zwanzig Grad. Was ist deine Lieblingsjahreszeit?", "It's twenty degrees here. What's your favourite season?"),
      you("Meine Lieblingsjahreszeit ist der {season}.", "Name your favourite season.", ["Der Sommer.", "Ich mag den Herbst."]),
    ],
  },
  {
    title: "Months and dates",
    intro:
      "For dates, German uses ordinal numbers: 'der erste' (the first), 'der zweite' (the second). Up to 19 you add '-te', from 20 you add '-ste'. After 'am' (on) they end in '-en': 'am ersten Mai' (on the first of May).",
    grammar: {
      title: "Ordinal numbers for dates",
      text: "In writing, a dot after the number shows it's an ordinal: der 3. Mai = der dritte Mai. A few are irregular: erste, dritte, siebte.",
      table: [
        ["Date", "Heute ist der …", "am …"],
        ["1.", "erste", "ersten"],
        ["2.", "zweite", "zweiten"],
        ["3.", "dritte", "dritten"],
        ["7.", "siebte", "siebten"],
        ["4.–19.", "vierte, zehnte …", "vierten, zehnten …"],
        ["20. and up", "zwanzigste …", "zwanzigsten …"],
      ],
    },
    phrases: [
      p("Der Wievielte ist heute?", "What's the date today?", { words: [["der Wievielte", "which number (date)"]] }),
      p("Heute ist der dritte Oktober.", "Today is the third of October.", { accept: ["Heute ist der 3. Oktober."] }),
      p("Wann hast du Geburtstag?", "When is your birthday?", { words: [["Geburtstag", "birthday"]] }),
      p("Ich habe am ersten Mai Geburtstag.", "My birthday is on the first of May.", { accept: ["Ich habe am 1. Mai Geburtstag."] }),
      p("Der Kurs beginnt am zwanzigsten Januar.", "The course starts on the twentieth of January.", { accept: ["Der Kurs beginnt am 20. Januar."], words: [["Kurs", "course"], ["beginnt", "begins"]] }),
      p("Im August fahren wir in den Urlaub.", "In August we're going on holiday.", { words: [["Urlaub", "holiday, vacation"]] }),
      p("Heiligabend ist am vierundzwanzigsten Dezember.", "Christmas Eve is on the twenty-fourth of December.", { accept: ["Heiligabend ist am 24. Dezember."], words: [["Heiligabend", "Christmas Eve"]], note: "In Germany, presents are opened on the evening of the 24th." }),
    ],
    dialogue: [
      tutor("Wann hast du Geburtstag?", "When is your birthday?"),
      you("Ich habe am {date} Geburtstag.", "Say the date of your birthday.", ["Am ersten Mai.", "Ich habe am ersten Mai Geburtstag."]),
      tutor("Super! Und der Wievielte ist heute?", "Great! And what's the date today?"),
      you("Heute ist der {date}.", "Say today's date.", ["Heute ist der dritte Oktober."]),
      tutor("Was machst du im Sommer?", "What are you doing in the summer?"),
      you("Im August fahren wir in den Urlaub.", "Say in August you're going on holiday.", ["Ich fahre in den Urlaub."]),
    ],
  },
  {
    title: "Want, would like, may (wollen, möchten, dürfen)",
    intro:
      "These modal verbs work like 'können' and 'müssen': the modal is in position 2 and the main verb goes to the end. 'wollen' is a firm 'want', 'möchten' a polite 'would like', and 'dürfen' means 'may' or 'be allowed to'.",
    grammar: {
      title: "wollen, möchten, dürfen",
      text: "ich and er/sie/es always have the same form: ich will, er will. 'nicht dürfen' means 'must not': Hier darf man nicht rauchen.",
      table: [
        ["", "wollen (want)", "möchten (would like)", "dürfen (may)"],
        ["ich", "will", "möchte", "darf"],
        ["du", "willst", "möchtest", "darfst"],
        ["er / sie / es", "will", "möchte", "darf"],
        ["wir / Sie", "wollen", "möchten", "dürfen"],
      ],
    },
    phrases: [
      p("Ich will am Wochenende wandern.", "I want to go hiking at the weekend.", { words: [["will", "want"]], note: "'Ich will' does not mean 'I will'!" }),
      p("Wir wollen ans Meer fahren.", "We want to go to the seaside.", { words: [["ans Meer", "to the sea"]] }),
      p("Möchtest du mitkommen?", "Would you like to come along?", { words: [["mitkommen", "come along"]] }),
      p("Ich möchte Gitarre spielen lernen.", "I'd like to learn to play the guitar.", { words: [["Gitarre", "guitar"], ["lernen", "learn"]] }),
      p("Darf ich hier fotografieren?", "Am I allowed to take photos here?", { words: [["darf", "may"], ["fotografieren", "take photos"]] }),
      p("Hier darf man nicht rauchen.", "You're not allowed to smoke here.", { words: [["man", "one, you"], ["rauchen", "smoke"]] }),
      p("Darf ich das Fenster aufmachen?", "May I open the window?", { words: [["aufmachen", "open"]] }),
    ],
    dialogue: [
      tutor("Was willst du am Wochenende machen?", "What do you want to do at the weekend?"),
      you("Ich will am Wochenende wandern.", "Say you want to go hiking at the weekend.", ["Ich will {verb}.", "Ich will wandern."]),
      tutor("Toll! Darf ich mitkommen?", "Great! May I come along?"),
      you("Ja, natürlich! Möchtest du am Samstag kommen?", "Say yes, of course, and ask if they'd like to come on Saturday.", ["Ja, natürlich!", "Ja, gern!"]),
      tutor("Ja, Samstag passt gut.", "Yes, Saturday suits me well."),
    ],
  },
]);
