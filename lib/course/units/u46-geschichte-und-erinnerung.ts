import { defineUnit, p, tutor, you } from "../define";

export const unit46 = defineUnit(46, "C1", "Geschichte und Erinnerung", "Narrate history formally in the Präteritum, use participial clauses, and talk about Germany's division, reunification and culture of remembrance.", [
  {
    title: "Telling history in the Präteritum",
    intro:
      "Written history uses the Präteritum throughout, even for verbs you'd put in the Perfekt when speaking. Strong verbs change their stem (fliehen → floh, verlassen → verließ). Linking adverbs such as 'daraufhin' (as a result), 'kurz darauf' (shortly afterwards) and 'infolgedessen' (consequently) connect events in time and cause.",
    grammar: {
      title: "Key verbs of history",
      text: "Learn the three forms together. Weak verbs simply add -te (teilen → teilte).",
      table: [
        ["infinitive", "Präteritum", "Partizip II"],
        ["entstehen", "entstand", "entstanden"],
        ["fliehen", "floh", "geflohen"],
        ["verlassen", "verließ", "verlassen"],
        ["beginnen", "begann", "begonnen"],
        ["gelingen", "gelang", "gelungen"],
        ["errichten", "errichtete", "errichtet"],
      ],
    },
    phrases: [
      p("Nach dem Zweiten Weltkrieg wurde Deutschland in vier Besatzungszonen aufgeteilt.", "After the Second World War, Germany was divided into four occupation zones.", { words: [["Weltkrieg", "world war"], ["Besatzungszone", "occupation zone"], ["aufteilen", "divide up"]] }),
      p("Im Jahr 1949 entstanden zwei deutsche Staaten.", "In 1949 two German states came into being.", { words: [["entstehen", "come into being, emerge"], ["Staat", "state"]], note: "The Federal Republic in May, the GDR in October." }),
      p("Millionen Menschen verließen die DDR in Richtung Westen.", "Millions of people left the GDR for the West.", { words: [["verließen", "left"], ["DDR", "GDR, East Germany"]] }),
      p("Im August 1961 begann die DDR mit dem Bau der Mauer.", "In August 1961 the GDR began building the Wall.", { words: [["begann", "began"], ["Bau", "construction"], ["Mauer", "wall"]] }),
      p("Daraufhin wurde die Grenze fast vollständig abgeriegelt.", "As a result, the border was almost completely sealed off.", { words: [["daraufhin", "as a result, thereupon"], ["abriegeln", "seal off"]] }),
      p("Nur wenigen gelang danach noch die Flucht.", "Only a few managed to escape after that.", { words: [["gelingen", "succeed (jemandem gelingt etwas)"], ["Flucht", "escape"]] }),
      p("Die Teilung prägte das Leben ganzer Generationen.", "The division shaped the lives of entire generations.", { words: [["Teilung", "division"], ["prägen", "shape, leave a mark on"]] }),
    ],
    dialogue: [
      tutor("Wie kam es zu den zwei deutschen Staaten?", "How did the two German states come about?"),
      you("Nach dem Krieg wurde Deutschland in vier Besatzungszonen aufgeteilt, und 1949 entstanden zwei Staaten.", "Explain: after the war there were four occupation zones, and in 1949 two states emerged.", ["Im Jahr 1949 entstanden zwei deutsche Staaten."]),
      tutor("Und warum baute die DDR die Mauer?", "And why did the GDR build the Wall?"),
      you("Weil Millionen Menschen die DDR in Richtung Westen verließen.", "Say because millions of people were leaving the GDR for the West.", ["Zu viele Menschen flohen in den Westen."]),
      tutor("Was bedeutete das für die Menschen?", "What did that mean for people?"),
      you("Die Teilung prägte das Leben ganzer Generationen.", "Say the division shaped the lives of entire generations.", ["Viele Familien wurden getrennt."]),
    ],
  },
  {
    title: "Participial clauses",
    intro:
      "A participial clause shrinks a subordinate clause down to its participle: 'Als wir in Berlin angekommen waren, …' becomes 'In Berlin angekommen, …'. Partizip II shows something completed or passive, Partizip I something happening at the same time. The implied subject must be the subject of the main clause. They're elegant in written narrative, and fixed ones like 'genau genommen' are common in speech too.",
    grammar: {
      title: "Subordinate clause → participial clause",
      text: "Drop the conjunction, the subject and the auxiliary. The participle goes to the end of the short clause.",
      table: [
        ["subordinate clause", "participial clause"],
        ["Als sie in Berlin angekommen war, …", "In Berlin angekommen, …"],
        ["Weil er von der Nachricht überrascht war, …", "Von der Nachricht überrascht, …"],
        ["Während sie vor Freude weinten, …", "Vor Freude weinend, …"],
        ["Wie bereits erwähnt wurde, …", "Wie bereits erwähnt, …"],
        ["Wenn man es genau nimmt, …", "Genau genommen …"],
      ],
    },
    phrases: [
      p("In Berlin angekommen, fuhren wir direkt zur Bernauer Straße.", "Having arrived in Berlin, we went straight to Bernauer Straße.", { words: [["angekommen", "arrived"]], note: "Bernauer Straße is home to the Berlin Wall Memorial." }),
      p("Von der Nachricht völlig überrascht, strömten die Menschen zu den Grenzübergängen.", "Completely surprised by the news, people streamed to the border crossings.", { words: [["strömen", "stream, pour"], ["Grenzübergang", "border crossing"]] }),
      p("Vor Freude weinend, lagen sich Fremde in den Armen.", "Weeping with joy, strangers fell into each other's arms.", { words: [["weinend", "weeping"], ["sich in den Armen liegen", "embrace each other"]] }),
      p("Wie bereits erwähnt, verlief die Revolution friedlich.", "As already mentioned, the revolution was peaceful.", { words: [["erwähnt", "mentioned"], ["verlaufen", "proceed, go"]] }),
      p("Genau genommen öffnete sich die Grenze nach einem Versprecher.", "Strictly speaking, the border opened after a slip of the tongue.", { words: [["genau genommen", "strictly speaking"], ["Versprecher", "slip of the tongue"]], note: "On 9 November 1989 an East German official announced by mistake that new travel rules applied 'immediately'." }),
      p("Zu Hause angekommen, schaltete sie sofort den Fernseher ein.", "Once she got home, she immediately switched on the TV.", { words: [["einschalten", "switch on"]] }),
      p("Kurz gesagt, niemand hatte damit gerechnet.", "In short, nobody had expected it.", { words: [["kurz gesagt", "in short"], ["rechnen mit", "expect"]] }),
    ],
    dialogue: [
      tutor("Erzählen Sie: Was haben Sie in Berlin gemacht?", "Tell me: what did you do in Berlin?"),
      you("In Berlin angekommen, fuhren wir direkt zur Gedenkstätte Berliner Mauer.", "Use a participial clause: having arrived in Berlin, you went straight to the Berlin Wall Memorial.", ["In Berlin angekommen, gingen wir zuerst zur Bernauer Straße."]),
      tutor("Und wie war es dort?", "And what was it like there?"),
      you("Von den Geschichten tief beeindruckt, blieben wir den ganzen Nachmittag.", "Say that, deeply impressed by the stories, you stayed all afternoon.", ["Wir waren tief beeindruckt."]),
      tutor("Hatten Sie danach noch Energie?", "Did you still have any energy afterwards?"),
      you("Kaum. Im Hotel angekommen, schlief ich sofort ein.", "Say hardly: once at the hotel, you fell asleep straight away.", ["Nein, ich war total müde."]),
    ],
  },
  {
    title: "The Wende and reunification",
    intro:
      "In autumn 1989 the 'friedliche Revolution' (peaceful revolution) swept the GDR, with mass protests like the Monday demonstrations in Leipzig and the slogan 'Wir sind das Volk'. On 9 November 1989 the Wall opened, and on 3 October 1990 Germany was reunified. Germans often call this whole period simply 'die Wende' (the turning point).",
    phrases: [
      p("Im Herbst 1989 gingen in Leipzig jeden Montag Tausende auf die Straße.", "In autumn 1989, thousands took to the streets in Leipzig every Monday.", { words: [["Herbst", "autumn"], ["auf die Straße gehen", "take to the streets, protest"]] }),
      p("Am neunten November 1989 fiel die Mauer.", "On the ninth of November 1989 the Wall fell.", { accept: ["Am 9. November 1989 fiel die Mauer."], words: [["fallen", "fall"]] }),
      p("Die friedliche Revolution kam ohne Blutvergießen aus.", "The peaceful revolution happened without bloodshed.", { words: [["auskommen ohne", "manage without"], ["Blutvergießen", "bloodshed"]] }),
      p("Seit dem dritten Oktober 1990 ist Deutschland wiedervereinigt.", "Germany has been reunified since the third of October 1990.", { accept: ["Seit dem 3. Oktober 1990 ist Deutschland wiedervereinigt."], words: [["wiedervereinigt", "reunified"]] }),
      p("Der Tag der Deutschen Einheit ist ein Feiertag.", "German Unity Day is a public holiday.", { words: [["Einheit", "unity"], ["Feiertag", "public holiday"]], note: "It's on 3 October." }),
      p("Viele Ostdeutsche verloren nach der Wende ihre Arbeit.", "Many East Germans lost their jobs after the Wende.", { words: [["verloren", "lost"], ["die Wende", "the turning point (1989/90)"]] }),
      p("Die Unterschiede zwischen Ost und West sind noch nicht ganz verschwunden.", "The differences between East and West haven't completely disappeared yet.", { words: [["Unterschied", "difference"], ["verschwinden", "disappear"]] }),
    ],
    dialogue: [
      tutor("Wann fiel die Mauer?", "When did the Wall fall?"),
      you("Am neunten November 1989.", "Give the date.", ["Am 9. November 1989.", "Im November 1989."]),
      tutor("Und warum ist dann der dritte Oktober der Nationalfeiertag?", "So why is the third of October the national holiday?"),
      you("Weil Deutschland am dritten Oktober 1990 wiedervereinigt wurde.", "Say because Germany was reunified on 3 October 1990.", ["Am 3. Oktober 1990 wurde Deutschland wiedervereinigt."]),
      tutor("Richtig. Außerdem ist der neunte November der Jahrestag der Novemberpogrome von 1938.", "Right. Also, the ninth of November is the anniversary of the November pogroms of 1938."),
      you("Das wusste ich nicht. Das macht das Datum schwierig.", "Say you didn't know that, and that it makes the date difficult.", ["Ach so, das erklärt einiges."]),
    ],
  },
  {
    title: "Remembrance culture",
    intro:
      "'Erinnerungskultur' is how a society remembers its past. In Germany, remembering the crimes of National Socialism is central: the Memorial to the Murdered Jews of Europe opened in Berlin in 2005, and the artist Gunter Demnig has laid more than 100,000 'Stolpersteine' (small brass plaques in the pavement) in front of victims' last homes. GDR history is remembered at places like the Berlin Wall Memorial.",
    grammar: {
      title: "Verbs of remembering",
      text: "'gedenken' takes the genitive, a typical feature of elevated style.",
      table: [
        ["verb", "case / preposition", "example"],
        ["erinnern an", "+ accusative", "Das Denkmal erinnert an die Opfer."],
        ["sich erinnern an", "+ accusative", "Ich erinnere mich an den Tag."],
        ["gedenken", "+ genitive", "Wir gedenken der Opfer."],
        ["mahnen zu", "+ dative", "Die Gedenkstätte mahnt zur Wachsamkeit."],
      ],
    },
    phrases: [
      p("Das Denkmal erinnert an die ermordeten Juden Europas.", "The memorial commemorates the murdered Jews of Europe.", { words: [["Denkmal", "memorial, monument"], ["ermordet", "murdered"]] }),
      p("Vor diesem Haus liegen drei Stolpersteine.", "There are three Stolpersteine in front of this house.", { words: [["Stolperstein", "'stumbling stone', a brass memorial plaque"]] }),
      p("Auf jedem Stein stehen Name, Geburtsjahr und Schicksal eines Menschen.", "Each stone bears a person's name, year of birth and fate.", { words: [["Geburtsjahr", "year of birth"], ["Schicksal", "fate"]] }),
      p("Wir gedenken der Opfer.", "We commemorate the victims.", { words: [["gedenken", "commemorate (+ genitive)"], ["Opfer", "victims"]] }),
      p("Die Gedenkstätte zeigt, wie die Grenze funktionierte.", "The memorial site shows how the border worked.", { words: [["Gedenkstätte", "memorial site"]] }),
      p("Erinnern heißt, Verantwortung für die Zukunft zu übernehmen.", "Remembering means taking responsibility for the future.", { words: [["Verantwortung übernehmen", "take responsibility"]] }),
      p("Zeitzeugen gibt es immer weniger.", "There are fewer and fewer contemporary witnesses.", { words: [["Zeitzeuge", "contemporary witness"]] }),
    ],
    dialogue: [
      tutor("Was sind diese kleinen Messingplatten im Gehweg?", "What are these little brass plaques in the pavement?"),
      you("Das sind Stolpersteine. Sie erinnern an Opfer des Nationalsozialismus.", "Explain that they're Stolpersteine commemorating victims of National Socialism.", ["Das sind Stolpersteine.", "Sie erinnern an Menschen, die hier gewohnt haben."]),
      tutor("Und was steht darauf?", "And what's written on them?"),
      you("Auf jedem Stein stehen Name, Geburtsjahr und Schicksal eines Menschen.", "Say each stone bears a person's name, year of birth and fate.", ["Name und Schicksal der Menschen."]),
      tutor("Warum ist Erinnerung heute noch so wichtig?", "Why is remembrance still so important today?"),
      you("Weil es immer weniger Zeitzeugen gibt.", "Give a reason, for example that there are fewer and fewer witnesses.", ["Erinnern heißt, Verantwortung für die Zukunft zu übernehmen."]),
    ],
  },
]);
