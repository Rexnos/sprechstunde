import { defineUnit, p, tutor, you } from "../define";

export const unit38 = defineUnit(38, "B2", "Kunst und Kultur", "Describe art, films and books with extended participial attributes and write a short review.", [
  {
    title: "Extended participial attributes",
    intro:
      "Written German can pack a whole relative clause in front of a noun: 'das Buch, das von vielen Kritikern gelobt wurde' becomes 'das von vielen Kritikern gelobte Buch'. Read these from the article to the noun, then go back and add the middle part. You'll meet them constantly in reviews and newspapers.",
    grammar: {
      title: "From relative clause to participial attribute",
      text: "The participle (with an adjective ending) goes right before the noun; everything else from the relative clause goes between the article and the participle.",
      table: [
        ["Relative clause", "Participial attribute"],
        ["das Buch, das von vielen Kritikern gelobt wurde", "das von vielen Kritikern gelobte Buch"],
        ["die Künstlerin, die in Berlin lebt", "die in Berlin lebende Künstlerin"],
        ["der Film, der vor zwanzig Jahren gedreht wurde", "der vor zwanzig Jahren gedrehte Film"],
        ["das Gemälde, das lange vergessen war", "das lange vergessene Gemälde"],
      ],
    },
    phrases: [
      p("Das von vielen Kritikern gelobte Buch hat mich enttäuscht.", "The book praised by many critics disappointed me.", { words: [["Kritiker", "critic"], ["gelobt", "praised"], ["enttäuscht", "disappointed"]] }),
      p("Die in Berlin lebende Künstlerin stellt in Paris aus.", "The Berlin-based artist is exhibiting in Paris.", { words: [["lebend", "living"], ["ausstellen", "exhibit"]] }),
      p("Der vor zwanzig Jahren gedrehte Film ist heute Kult.", "The film shot twenty years ago is a cult classic today.", { accept: ["Der vor 20 Jahren gedrehte Film ist heute Kult."], words: [["gedreht", "shot, filmed"], ["Kult", "cult (classic)"]] }),
      p("Das lange vergessene Gemälde wurde wiederentdeckt.", "The long-forgotten painting was rediscovered.", { words: [["Gemälde", "painting"], ["wiederentdeckt", "rediscovered"]] }),
      p("Die zum ersten Mal gezeigte Ausstellung zieht viele Besucher an.", "The exhibition, shown for the first time, is attracting many visitors.", { words: [["Ausstellung", "exhibition"], ["anziehen", "attract"]] }),
      p("Ein von allen unterschätzter Regisseur hat den Preis gewonnen.", "A director everyone underestimated has won the award.", { words: [["unterschätzt", "underestimated"], ["Regisseur", "director"]] }),
      p("Die auf einer wahren Geschichte basierende Serie ist sehr spannend.", "The series, based on a true story, is very gripping.", { words: [["basierend auf", "based on"], ["spannend", "gripping, exciting"]] }),
    ],
    dialogue: [
      tutor("Hast du das neue Buch von Mara Klein gelesen?", "Have you read Mara Klein's new book?"),
      you("Ja, aber das von vielen Kritikern gelobte Buch hat mich enttäuscht.", "Say yes, but the book praised by many critics disappointed you.", ["Ja, es hat mich enttäuscht.", "Nein, noch nicht."]),
      tutor("Echt? Und kennst du die Serie über die Familie Brandt?", "Really? And do you know the series about the Brandt family?"),
      you("Ja, die auf einer wahren Geschichte basierende Serie ist sehr spannend.", "Say yes, the series based on a true story is very gripping.", ["Ja, sie ist sehr spannend."]),
      tutor("Wollen wir am Samstag in die neue Ausstellung gehen?", "Shall we go to the new exhibition on Saturday?"),
      you("Gern, ich habe Zeit.", "Say you'd love to, you're free.", ["Gern!", "Leider habe ich keine Zeit."]),
    ],
  },
  {
    title: "Describing a painting",
    intro:
      "To describe a picture, move through it in order: what it shows, what is in the foreground and background, then how the colours and mood affect you. 'wirken' (to seem, to come across as) is the key verb for impressions.",
    grammar: {
      title: "Useful phrases for describing a picture",
      text: "darstellen is separable: 'Das Bild stellt … dar.'",
      table: [
        ["Expression", "Meaning"],
        ["Das Bild stellt … dar.", "The picture shows / depicts …"],
        ["Im Vordergrund sieht man …", "In the foreground you see …"],
        ["Im Hintergrund erkennt man …", "In the background you can make out …"],
        ["Die Farben wirken …", "The colours seem …"],
      ],
    },
    phrases: [
      p("Das Bild stellt eine Szene aus dem Alltag dar.", "The picture depicts an everyday scene.", { words: [["darstellen", "depict, show"], ["Alltag", "everyday life"]] }),
      p("Im Vordergrund sieht man eine lesende Frau.", "In the foreground you see a woman reading.", { words: [["Vordergrund", "foreground"], ["lesend", "reading"]] }),
      p("Im Hintergrund erkennt man eine Stadt im Nebel.", "In the background you can make out a city in the fog.", { words: [["Hintergrund", "background"], ["erkennen", "make out, recognise"], ["Nebel", "fog"]] }),
      p("Die dunklen Farben wirken bedrückend.", "The dark colours seem oppressive.", { words: [["wirken", "seem, come across"], ["bedrückend", "oppressive, depressing"]] }),
      p("Was will uns der Künstler damit sagen?", "What is the artist trying to tell us?", { words: [["Künstler", "artist"]] }),
      p("Moderne Kunst spricht mich nicht besonders an.", "Modern art doesn't really appeal to me.", { words: [["ansprechen", "appeal to"]] }),
      p("Das Werk entstand kurz nach dem Krieg.", "The work was created shortly after the war.", { words: [["Werk", "work (of art)"], ["entstehen", "be created, come into being"]] }),
    ],
    dialogue: [
      tutor("Was sieht man auf diesem Bild?", "What can you see in this picture?"),
      you("Im Vordergrund sieht man eine lesende Frau.", "Say that in the foreground you see a woman reading.", ["Man sieht eine Frau."]),
      tutor("Und wie wirkt das Bild auf dich?", "And how does the picture come across to you?"),
      you("Die dunklen Farben wirken bedrückend.", "Say the dark colours seem oppressive.", ["Es wirkt traurig.", "Es gefällt mir sehr."]),
      tutor("Ich frage mich, was der Künstler damit sagen will.", "I wonder what the artist is trying to say."),
      you("Das Werk entstand kurz nach dem Krieg.", "Point out that the work was created shortly after the war.", ["Vielleicht geht es um den Krieg."]),
    ],
  },
  {
    title: "Films and books",
    intro:
      "When you talk about a film or a book, Germans ask 'Worum geht es?' (What's it about?) and 'Wo spielt er?' (Where is it set?). 'spielen' here means 'to be set'. Then you comment on the characters, the plot and the ending.",
    phrases: [
      p("Der Film spielt im Berlin der Zwanzigerjahre.", "The film is set in 1920s Berlin.", { words: [["spielen", "be set (story)"], ["Zwanzigerjahre", "the twenties"]] }),
      p("Die Hauptfigur ist eine junge Ärztin.", "The main character is a young doctor.", { words: [["Hauptfigur", "main character"]] }),
      p("Es geht um eine Frau, die ihre Vergangenheit sucht.", "It's about a woman who is searching for her past.", { words: [["es geht um", "it's about"], ["Vergangenheit", "past"]] }),
      p("Die Handlung ist ziemlich vorhersehbar.", "The plot is fairly predictable.", { words: [["Handlung", "plot"], ["vorhersehbar", "predictable"]] }),
      p("Die Schauspieler sind großartig.", "The actors are brilliant.", { words: [["Schauspieler", "actors"], ["großartig", "brilliant"]] }),
      p("Das Ende hat mich völlig überrascht.", "The ending completely surprised me.", { words: [["völlig", "completely"]] }),
      p("Das Buch ist besser als die Verfilmung.", "The book is better than the film adaptation.", { words: [["Verfilmung", "film adaptation"]] }),
    ],
    dialogue: [
      tutor("Was hast du zuletzt gesehen?", "What did you watch most recently?"),
      you("Einen Film über eine Frau, die ihre Vergangenheit sucht.", "Say a film about a woman who is searching for her past.", ["Ich habe {title} gesehen."]),
      tutor("Und wo spielt er?", "And where is it set?"),
      you("Der Film spielt im Berlin der Zwanzigerjahre.", "Say the film is set in 1920s Berlin.", ["Er spielt in {city}."]),
      tutor("Und, lohnt er sich?", "So, is it worth seeing?"),
      you("Ja, die Schauspieler sind großartig.", "Say yes, the actors are brilliant.", ["Na ja, die Handlung ist ziemlich vorhersehbar."]),
    ],
  },
  {
    title: "Writing a review",
    intro:
      "A Rezension (review) introduces the work, praises what works, names weaknesses and ends with a recommendation. Formal phrases like 'Besonders gelungen ist …' and 'Insgesamt …' give it structure, and participial attributes keep it compact.",
    grammar: {
      title: "The parts of a review",
      text: "Mix praise and criticism, and finish with a clear verdict.",
      table: [
        ["Part", "Typical phrase"],
        ["introduction", "In ihrem neuen Roman erzählt die Autorin …"],
        ["praise", "Besonders gelungen ist …"],
        ["criticism", "Eine Schwäche des Films ist …"],
        ["verdict", "Insgesamt ist das Buch sehr empfehlenswert."],
      ],
    },
    phrases: [
      p("In ihrem neuen Roman erzählt die Autorin von ihrer Kindheit.", "In her new novel the author writes about her childhood.", { words: [["Roman", "novel"], ["Kindheit", "childhood"]] }),
      p("Besonders gelungen ist die Musik.", "The music is particularly good.", { words: [["gelungen", "successful, well done"]] }),
      p("Eine Schwäche des Films ist die zu lange Mitte.", "One weakness of the film is the overlong middle.", { words: [["Schwäche", "weakness"]] }),
      p("Die Dialoge wirken etwas künstlich.", "The dialogue seems a bit artificial.", { words: [["künstlich", "artificial"]] }),
      p("Insgesamt ist das Buch sehr empfehlenswert.", "Overall the book is highly recommended.", { words: [["insgesamt", "overall"], ["empfehlenswert", "recommendable"]] }),
      p("Ich gebe dem Film vier von fünf Sternen.", "I give the film four out of five stars.", { accept: ["Ich gebe dem Film 4 von 5 Sternen."], words: [["Sternen", "stars"]] }),
      p("Wer spannende Krimis mag, wird hier nicht enttäuscht.", "Anyone who likes exciting crime stories won't be disappointed.", { words: [["Krimis", "crime stories"]] }),
    ],
    dialogue: [
      tutor("Ich schreibe eine Rezension. Wie fandest du die Musik?", "I'm writing a review. What did you think of the music?"),
      you("Besonders gelungen ist die Musik.", "Say the music is particularly good.", ["Die Musik war toll."]),
      tutor("Und gibt es auch Schwächen?", "And are there weaknesses too?"),
      you("Die Dialoge wirken etwas künstlich.", "Say the dialogue seems a bit artificial.", ["Eine Schwäche ist die zu lange Mitte."]),
      tutor("Wie viele Sterne würdest du geben?", "How many stars would you give?"),
      you("Ich gebe dem Film {number} von fünf Sternen.", "Say how many stars out of five you'd give.", ["Vier von fünf Sternen."]),
    ],
  },
]);
