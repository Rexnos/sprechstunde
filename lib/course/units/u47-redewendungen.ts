import { defineUnit, p, tutor, you } from "../define";

export const unit47 = defineUnit(47, "C1", "Redewendungen und Sprachgefühl", "Use common idioms, combine modal particles, recognise irony and understatement, and look back on your German in nuanced language.", [
  {
    title: "Idioms everyone uses",
    intro:
      "Idioms ('Redewendungen') are where German gets colourful: bears tap-dance, people step into little pots of fat and stand on garden hoses. You don't need to use dozens, but recognising the common ones is essential, and dropping one in at the right moment makes you sound genuinely fluent.",
    grammar: {
      title: "Literally … and what it means",
      text: "Idioms are fixed: change a word and the effect is lost.",
      table: [
        ["idiom", "literally", "meaning"],
        ["Da steppt der Bär.", "the bear tap-dances there", "it's a great party"],
        ["ins Fettnäpfchen treten", "step into the little pot of fat", "put your foot in it"],
        ["jemandem die Daumen drücken", "press your thumbs for someone", "keep your fingers crossed"],
        ["auf dem Schlauch stehen", "stand on the hose", "not get it, be slow on the uptake"],
        ["Tomaten auf den Augen haben", "have tomatoes on your eyes", "not see the obvious"],
        ["um den heißen Brei herumreden", "talk around the hot porridge", "beat around the bush"],
      ],
    },
    phrases: [
      p("Komm doch mit, da steppt heute Abend der Bär!", "Come along, it's going to be a great party tonight!", { words: [["steppen", "tap-dance"], ["Bär", "bear"]] }),
      p("Ich bin voll ins Fettnäpfchen getreten.", "I really put my foot in it.", { words: [["Fettnäpfchen", "little pot of fat"], ["voll", "totally (colloquial)"]] }),
      p("Ich drück dir die Daumen für die Prüfung!", "Fingers crossed for your exam!", { words: [["Daumen", "thumbs"]], note: "Germans press their thumbs instead of crossing fingers." }),
      p("Sorry, ich steh gerade auf dem Schlauch.", "Sorry, I'm not getting it right now.", { words: [["Schlauch", "hose"]] }),
      p("Hast du Tomaten auf den Augen?", "Are you blind or what?"),
      p("Red nicht um den heißen Brei herum!", "Stop beating around the bush!", { words: [["Brei", "porridge, mush"]] }),
      p("Das ist nicht mein Bier.", "That's not my problem.", { note: "Literally 'that's not my beer'." }),
    ],
    dialogue: [
      tutor("Morgen habe ich mein Vorstellungsgespräch.", "Tomorrow I have my job interview."),
      you("Ich drück dir die Daumen!", "Say you'll keep your fingers crossed.", ["Ich drücke dir die Daumen!", "Viel Erfolg!"]),
      tutor("Danke! Letztes Mal habe ich den Chef nach seiner Frau gefragt. Die beiden hatten sich gerade getrennt.", "Thanks! Last time I asked the boss about his wife. They had just separated."),
      you("Oh je, da bist du ja voll ins Fettnäpfchen getreten.", "Say oh dear, you really put your foot in it.", ["Da bist du ins Fettnäpfchen getreten."]),
      tutor("Genau. Danach gehen wir übrigens alle ins Rex. Da steppt der Bär!", "Exactly. By the way, afterwards we're all going to the Rex. It'll be a great party!"),
      you("Moment, ich steh auf dem Schlauch. Was ist das Rex?", "Say hang on, you're not getting it, and ask what the Rex is.", ["Sorry, ich steh auf dem Schlauch."]),
    ],
  },
  {
    title: "Particle combinations",
    intro:
      "At C1, modal particles start to come in pairs, and their order is fixed: 'doch mal', 'ja wohl', 'denn eigentlich', 'eben nur'. Each pair adds a precise attitude: 'Ruf doch mal an!' is a warm nudge, while 'Das ist ja wohl die Höhe!' is pure outrage. You'll hear them constantly; start using them in small doses.",
    grammar: {
      title: "Common combinations",
      text: "The order doesn't change: never 'mal doch' or 'wohl ja'.",
      table: [
        ["combination", "effect", "example"],
        ["doch mal", "friendly, encouraging request", "Komm doch mal vorbei!"],
        ["ja wohl", "indignation, or a confident assumption", "Das ist ja wohl nicht dein Ernst!"],
        ["doch wohl", "expecting agreement, slightly reproachful", "Du hast doch wohl nicht …?"],
        ["denn eigentlich", "curious or challenging question", "Was willst du denn eigentlich?"],
        ["eben nur", "resigned: that's all it is", "Das war eben nur ein Versuch."],
        ["schon mal", "in advance, for now", "Fang schon mal an!"],
      ],
    },
    phrases: [
      p("Ruf doch mal an, wenn du Zeit hast!", "Give me a call some time when you're free!"),
      p("Das ist ja wohl nicht dein Ernst!", "You can't be serious!", { words: [["Ernst", "seriousness"]] }),
      p("Was willst du denn eigentlich von mir?", "What is it you actually want from me?"),
      p("Das war eben nur ein erster Versuch.", "That was only a first attempt, that's all."),
      p("Du hast doch wohl nicht den Schlüssel vergessen?", "Surely you haven't forgotten the key?"),
      p("Fangt schon mal an, ich komme gleich nach.", "Go ahead and start, I'll be along in a minute.", { words: [["nachkommen", "follow, come later"]] }),
      p("Das ist ja wohl die Höhe!", "That's the absolute limit!", { words: [["die Höhe", "the limit (literally: the height)"]] }),
    ],
    dialogue: [
      tutor("Ich habe deinen Kuchen aus Versehen aufgegessen.", "I accidentally ate your cake."),
      you("Das ist ja wohl nicht dein Ernst!", "React with indignation: they can't be serious!", ["Das ist ja wohl die Höhe!"]),
      tutor("Sorry! Er war einfach zu lecker.", "Sorry! It was just too tasty."),
      you("Na gut, es war eben nur ein Kuchen.", "Say fine, it was only a cake after all.", ["Schon gut, es war ja nur ein Kuchen."]),
      tutor("Ich backe dir am Wochenende einen neuen.", "I'll bake you a new one at the weekend."),
      you("Dann komm doch mal am Sonntag vorbei!", "Warmly invite them to drop by on Sunday.", ["Komm doch mal vorbei!"]),
    ],
  },
  {
    title: "Irony and understatement",
    intro:
      "Germans have a reputation for being direct, but irony and understatement are everywhere. 'Gar nicht mal so schlecht' is real praise, while 'Na toll!' or 'Super gemacht!' in a flat voice means the opposite. Double negatives such as 'nicht ganz unproblematisch' are typical understatement in professional German: they mean 'this is a real problem'.",
    grammar: {
      title: "What is said, what is meant",
      text: "Tone and context decide. The same words can be sincere or ironic.",
      table: [
        ["said", "meant"],
        ["Gar nicht mal so schlecht.", "Very good, actually."],
        ["Das ist nicht ganz unproblematisch.", "That's a real problem."],
        ["Das hast du ja super hingekriegt.", "You've made a mess of that."],
        ["Ich war schon mal ausgeschlafener.", "I'm exhausted."],
        ["Herrliches Wetter heute! (in the rain)", "The weather is awful."],
      ],
    },
    phrases: [
      p("Na toll, jetzt regnet es auch noch.", "Oh great, now it's raining as well.", { note: "Ironic: the speaker is annoyed." }),
      p("Das hast du ja super hingekriegt.", "Well, you've made a fine job of that.", { words: [["hinkriegen", "manage, pull off (colloquial)"]], note: "Usually ironic. Sincere only with a warm tone." }),
      p("Der Plan ist nicht ganz unproblematisch.", "The plan isn't entirely without problems."),
      p("Das war gar nicht mal so schlecht.", "That wasn't bad at all, actually.", { note: "Understatement: real praise." }),
      p("Ich war schon mal ausgeschlafener.", "I've been better rested.", { words: [["ausgeschlafen", "well rested"]] }),
      p("Er ist nicht gerade der Fleißigste.", "He's not exactly the most hard-working.", { words: [["nicht gerade", "not exactly"], ["fleißig", "hard-working"]] }),
      p("Das kann man so sehen, muss man aber nicht.", "You can see it that way, but you don't have to."),
    ],
    dialogue: [
      tutor("Wie war deine Präsentation?", "How was your presentation?"),
      you("Gar nicht mal so schlecht, ehrlich gesagt.", "Say with understatement that it wasn't bad at all.", ["Das war gar nicht mal so schlecht."]),
      tutor("Und was sagst du zum neuen Projektplan?", "And what do you think of the new project plan?"),
      you("Der ist nicht ganz unproblematisch.", "Say with understatement that it's problematic.", ["Der Plan ist nicht ganz unproblematisch."]),
      tutor("Oh, und es fängt gerade an zu regnen. Ich habe keinen Schirm.", "Oh, and it's just starting to rain. I haven't got an umbrella."),
      you("Na toll, das passt ja perfekt.", "Respond ironically: oh great, that's just perfect.", ["Na toll!", "Super, genau das hat noch gefehlt."]),
    ],
  },
  {
    title: "Looking back on the course",
    intro:
      "You've come a long way, from the alphabet to irony and nominal style. In this last lesson you look back on your learning in nuanced German: what helped, what was hard and where you want to go next. Fittingly, a few proverbs about effort and practice join in.",
    phrases: [
      p("Aller Anfang ist schwer.", "Every beginning is hard.", { note: "A proverb: the start is always the hardest part." }),
      p("Übung macht den Meister.", "Practice makes perfect.", { words: [["Meister", "master"]] }),
      p("Rückblickend war die Grammatik gar nicht das Schwierigste.", "Looking back, the grammar wasn't actually the hardest part.", { words: [["rückblickend", "looking back, in retrospect"]] }),
      p("Am meisten hat mir das regelmäßige Sprechen geholfen.", "What helped me most was speaking regularly.", { words: [["regelmäßig", "regular"]] }),
      p("Ich habe mich oft durchbeißen müssen.", "I often had to grit my teeth and keep going.", { words: [["sich durchbeißen", "struggle through"]], note: "Modal + infinitive in the Perfekt: 'habe … müssen', not 'gemusst'." }),
      p("Mittlerweile träume ich sogar auf Deutsch.", "By now I even dream in German.", { words: [["mittlerweile", "by now, meanwhile"]] }),
      p("Ich möchte mein Deutsch weiter verfeinern.", "I'd like to keep refining my German.", { words: [["verfeinern", "refine"]] }),
    ],
    dialogue: [
      tutor("Sie haben den ganzen Kurs geschafft. Herzlichen Glückwunsch!", "You've completed the whole course. Congratulations!"),
      you("Vielen Dank! Aller Anfang ist schwer, aber es hat sich gelohnt.", "Thank them and say every beginning is hard, but it was worth it.", ["Danke! Es hat sich gelohnt."]),
      tutor("Was hat Ihnen am meisten geholfen?", "What helped you most?"),
      you("Am meisten hat mir {thing} geholfen.", "Say what helped you most.", ["Am meisten hat mir das regelmäßige Sprechen geholfen."]),
      tutor("Und wie geht es jetzt weiter?", "And what comes next?"),
      you("Ich möchte mein Deutsch weiter verfeinern, zum Beispiel mit {activity}.", "Say you want to keep refining your German, and how.", ["Ich lese jetzt deutsche Romane.", "Ich übe einfach weiter, denn Übung macht den Meister."]),
    ],
  },
]);
