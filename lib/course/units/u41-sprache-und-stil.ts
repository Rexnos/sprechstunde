import { defineUnit, p, tutor, you } from "../define";

export const unit41 = defineUnit(41, "C1", "Sprache und Stil", "Switch confidently between registers, turn clauses into noun phrases and back, and build new words with prefixes and suffixes.", [
  {
    title: "Formal, neutral, colloquial",
    intro:
      "German shifts register more sharply than English. The same question can be 'Könnten Sie mir bitte mitteilen, …' (formal), 'Kannst du mir sagen, …' (neutral) or 'Sag mal, …' (colloquial). Casual speech also swaps whole words: 'kriegen' for 'bekommen', 'kapieren' for 'verstehen'. Choosing the right level matters as much as getting the grammar right.",
    grammar: {
      title: "One meaning, three registers",
      text: "Formal words belong in letters, reports and official contexts; colloquial ones among friends. Neutral words work almost everywhere.",
      table: [
        ["formal", "neutral", "colloquial"],
        ["erhalten", "bekommen", "kriegen"],
        ["nachvollziehen", "verstehen", "kapieren"],
        ["beginnen", "anfangen", "loslegen"],
        ["finanzielle Mittel", "Geld", "Kohle"],
        ["Ich bedaure.", "Es tut mir leid.", "Sorry."],
      ],
    },
    phrases: [
      p("Könnten Sie mir bitte mitteilen, bis wann die Unterlagen vorliegen müssen?", "Could you please let me know by when the documents have to be submitted?", { words: [["mitteilen", "inform, let know"], ["Unterlagen", "documents"], ["vorliegen", "be available, be submitted"]], note: "Formal: Konjunktiv II plus 'mitteilen' instead of 'sagen'." }),
      p("Kannst du mir sagen, bis wann ich das abgeben muss?", "Can you tell me by when I have to hand it in?", { words: [["abgeben", "hand in"]] }),
      p("Hast du kapiert, was der Chef will?", "Did you get what the boss wants?", { words: [["kapieren", "get, understand (colloquial)"]] }),
      p("Ich hab echt keinen Bock mehr.", "I really can't be bothered anymore.", { words: [["hab", "have (colloquial for habe)"], ["Bock haben", "feel like it (slang)"]], note: "Very colloquial. Fine with friends, never in a meeting." }),
      p("Wir haben Ihre Nachricht erhalten.", "We have received your message.", { words: [["erhalten", "receive (formal)"]] }),
      p("Das ist in einem Bewerbungsgespräch völlig fehl am Platz.", "That's completely out of place in a job interview.", { words: [["fehl am Platz", "out of place"], ["Bewerbungsgespräch", "job interview"]] }),
      p("Im Alltag klingt das ziemlich steif.", "In everyday life that sounds rather stiff.", { words: [["Alltag", "everyday life"], ["steif", "stiff"]] }),
    ],
    dialogue: [
      tutor("Stellen Sie sich vor, Sie schreiben an eine Behörde. Wie sagen Sie „Ich hab das Geld noch nicht gekriegt“?", "Imagine you're writing to an authority. How do you say 'I haven't got the money yet'?"),
      you("Ich habe den Betrag leider noch nicht erhalten.", "Say formally that unfortunately you haven't received the amount yet.", ["Ich habe das Geld noch nicht erhalten.", "Den Betrag habe ich leider noch nicht erhalten."]),
      tutor("Gut. Und unter Freunden: „Ich bedaure, dass ich nicht kommen kann“?", "Good. And among friends: 'I regret that I cannot come'?"),
      you("Sorry, ich kann leider nicht kommen.", "Say it casually: sorry, you can't come.", ["Tut mir leid, ich kann nicht kommen.", "Sorry, ich schaff's nicht."]),
      tutor("Und wie fragen Sie eine Kollegin höflich, aber nicht steif, nach der Frist?", "And how do you ask a colleague about the deadline politely but not stiffly?"),
      you("Kannst du mir sagen, bis wann ich das abgeben muss?", "Ask her by when you have to hand it in.", ["Weißt du, bis wann ich das abgeben muss?", "Bis wann muss ich das abgeben?"]),
    ],
  },
  {
    title: "Nominal and verbal style",
    intro:
      "Nominal style packs a whole clause into a noun phrase: the verb becomes a noun, its subject or object moves into the genitive, and adverbs become adjectives. It's dense and typical of reports and official texts. At C1 you should be able to build it and, just as importantly, unpack it into readable verbal style.",
    grammar: {
      title: "Clause → noun phrase",
      text: "Each conjunction has a matching preposition. The subject or object of the clause becomes a genitive (or 'von' + dative without an article).",
      table: [
        ["verbal", "nominal", "conjunction → preposition"],
        ["Weil die Preise gestiegen sind, …", "Wegen des Anstiegs der Preise …", "weil → wegen"],
        ["Obwohl es stark regnete, …", "Trotz des starken Regens …", "obwohl → trotz"],
        ["Wenn man das Gerät falsch benutzt, …", "Bei falscher Benutzung des Geräts …", "wenn → bei"],
        ["Nachdem der Vertrag unterschrieben wurde, …", "Nach der Unterzeichnung des Vertrags …", "nachdem → nach"],
        ["Um die Kosten zu senken, …", "Zur Senkung der Kosten …", "um … zu → zur / zum"],
        ["Indem man Abläufe vereinfacht, …", "Durch die Vereinfachung von Abläufen …", "indem → durch"],
      ],
    },
    phrases: [
      p("Wegen des starken Anstiegs der Mieten ziehen viele Familien aufs Land.", "Because of the sharp rise in rents, many families are moving to the countryside.", { words: [["Anstieg", "rise, increase"], ["aufs Land", "to the countryside"]] }),
      p("Weil die Mieten stark gestiegen sind, ziehen viele Familien aufs Land.", "Because rents have gone up sharply, many families are moving to the countryside.", { note: "The verbal version of the sentence above: easier to read aloud." }),
      p("Bei Nichtbeachtung der Regeln droht eine Strafe.", "Anyone ignoring the rules faces a penalty.", { words: [["Nichtbeachtung", "non-observance"], ["drohen", "threaten, loom"]] }),
      p("Wer die Regeln nicht beachtet, muss mit einer Strafe rechnen.", "Anyone who doesn't follow the rules can expect a penalty.", { words: [["beachten", "observe, follow"], ["rechnen mit", "expect"]] }),
      p("Nach Abschluss der Bauarbeiten wird die Straße wieder geöffnet.", "Once the construction work is finished, the road will reopen.", { words: [["Abschluss", "completion"], ["Bauarbeiten", "construction work"]] }),
      p("Zur Verbesserung der Luftqualität wurden Fahrverbote eingeführt.", "Driving bans were introduced to improve air quality.", { words: [["Verbesserung", "improvement"], ["Fahrverbot", "driving ban"], ["einführen", "introduce"]] }),
      p("Das liest sich wie ein Amtsschreiben.", "That reads like an official letter.", { words: [["Amtsschreiben", "letter from an authority"]], note: "A typical criticism of text with too many nouns." }),
    ],
    dialogue: [
      tutor("Formulieren Sie bitte verbal: „Nach Abschluss der Bauarbeiten wird die Straße geöffnet.“", "Please rephrase verbally: 'After completion of the construction work, the road will be opened.'"),
      you("Wenn die Bauarbeiten abgeschlossen sind, wird die Straße geöffnet.", "Unpack it into a clause with 'wenn' or 'nachdem'.", ["Nachdem die Bauarbeiten abgeschlossen sind, wird die Straße geöffnet.", "Sobald die Bauarbeiten abgeschlossen sind, wird die Straße wieder geöffnet."]),
      tutor("Sehr gut. Und jetzt umgekehrt: „Weil die Mieten gestiegen sind, …“", "Very good. Now the other way round: 'Because rents have risen, …'"),
      you("Wegen des Anstiegs der Mieten …", "Turn it into a noun phrase with 'wegen'.", ["Aufgrund des Anstiegs der Mieten …", "Wegen des Mietanstiegs …"]),
      tutor("Genau. Welcher Stil passt besser in eine E-Mail an Freunde?", "Exactly. Which style suits an email to friends better?"),
      you("Der verbale Stil, der klingt natürlicher.", "Say verbal style, because it sounds more natural.", ["Der verbale Stil.", "Verbal, das klingt natürlicher."]),
    ],
  },
  {
    title: "Nouns from verbs and adjectives",
    intro:
      "Abstract nouns are often built with suffixes, and they're always feminine. '-ung' turns verbs into nouns (entscheiden → die Entscheidung), '-heit' and '-keit' turn adjectives into nouns (frei → die Freiheit, möglich → die Möglichkeit). '-keit' follows adjectives ending in -ig, -lich, -bar and -sam; a few others take '-igkeit' (müde → die Müdigkeit).",
    grammar: {
      title: "-ung, -heit, -keit",
      text: "All three suffixes make feminine nouns, and the plural always ends in -en.",
      table: [
        ["base word", "suffix", "noun"],
        ["entscheiden", "-ung", "die Entscheidung"],
        ["begeistern", "-ung", "die Begeisterung"],
        ["frei", "-heit", "die Freiheit"],
        ["gelassen", "-heit", "die Gelassenheit"],
        ["ehrlich", "-keit", "die Ehrlichkeit"],
        ["schwierig", "-keit", "die Schwierigkeit"],
        ["müde", "-igkeit", "die Müdigkeit"],
      ],
    },
    phrases: [
      p("Die Entscheidung ist uns nicht leichtgefallen.", "The decision wasn't easy for us.", { words: [["Entscheidung", "decision"], ["leichtfallen", "come easily"]] }),
      p("Für mich zählt vor allem Ehrlichkeit.", "For me, honesty is what counts most.", { words: [["zählen", "count, matter"], ["Ehrlichkeit", "honesty"]] }),
      p("Wir sehen keine Möglichkeit, den Termin zu verschieben.", "We see no way of postponing the appointment.", { words: [["Möglichkeit", "possibility, way"], ["verschieben", "postpone"]] }),
      p("Die Müdigkeit kam erst nach der Prüfung.", "The tiredness only came after the exam.", { words: [["Müdigkeit", "tiredness"]], note: "müde → Müdigkeit: '-igkeit' even though 'müde' has no -ig." }),
      p("Die Schwierigkeit liegt im Detail.", "The difficulty lies in the details.", { words: [["Schwierigkeit", "difficulty"]] }),
      p("Bei aller Begeisterung sollten wir die Kosten nicht vergessen.", "For all our enthusiasm, we shouldn't forget the costs.", { words: [["bei aller", "for all, despite all"], ["Begeisterung", "enthusiasm"]] }),
      p("Mit zunehmender Erfahrung wächst auch die Gelassenheit.", "As experience grows, so does composure.", { words: [["zunehmend", "increasing"], ["Gelassenheit", "composure, calm"]] }),
    ],
    dialogue: [
      tutor("Welches Nomen steckt in „möglich“?", "Which noun is hidden in 'möglich'?"),
      you("Die Möglichkeit.", "Give the noun with -keit.", ["Möglichkeit."]),
      tutor("Und in „entscheiden“?", "And in 'entscheiden'?"),
      you("Die Entscheidung.", "Give the noun with -ung.", ["Entscheidung."]),
      tutor("Was ist Ihnen bei Kollegen am wichtigsten?", "What matters most to you in colleagues?"),
      you("Für mich zählt vor allem {quality}.", "Name a quality as a noun (Ehrlichkeit, Zuverlässigkeit …).", ["Für mich zählt vor allem Ehrlichkeit.", "Am wichtigsten ist mir Zuverlässigkeit."]),
    ],
  },
  {
    title: "-lich, -los, ver-, ent-, miss-",
    intro:
      "Suffixes and prefixes shift meaning precisely. '-los' means 'without' (sprachlos, hilflos), '-lich' often means 'like' or 'able to be' (freundlich, verständlich). On verbs, 'ent-' signals removal or release (entlasten, entfernen), 'ver-' often means 'wrongly' or 'used up' (sich verlaufen, verschwenden), and 'miss-' means 'badly' or 'wrongly' (missverstehen, misslingen).",
    grammar: {
      title: "What the affixes add",
      text: "Recognising the affix often lets you guess a word you've never seen.",
      table: [
        ["affix", "meaning", "examples"],
        ["-los", "without", "sprachlos, arbeitslos"],
        ["-lich", "like, able to be", "verständlich, unvermeidlich"],
        ["ent-", "removal, release", "entlasten, entkoffeiniert"],
        ["ver-", "wrongly, used up", "sich verlaufen, verschwenden"],
        ["miss-", "badly, wrongly", "missverstehen, misslingen"],
      ],
    },
    phrases: [
      p("Da war ich einfach sprachlos.", "I was simply speechless.", { words: [["sprachlos", "speechless"]] }),
      p("Ihre Erklärung war leicht verständlich.", "Your explanation was easy to understand.", { words: [["verständlich", "understandable"]] }),
      p("Ich glaube, wir haben uns missverstanden.", "I think we misunderstood each other.", { words: [["missverstehen", "misunderstand"]] }),
      p("Der erste Versuch ist leider misslungen.", "Unfortunately the first attempt failed.", { words: [["misslingen", "fail, go wrong"]], note: "Perfekt with 'sein': 'ist misslungen'." }),
      p("Wir haben uns in der Altstadt verlaufen.", "We got lost in the old town.", { words: [["sich verlaufen", "get lost (on foot)"]] }),
      p("Die neue Software soll das Team entlasten.", "The new software is meant to take the pressure off the team.", { words: [["entlasten", "relieve, take pressure off"]] }),
      p("Hör auf, so viel Zeit zu verschwenden!", "Stop wasting so much time!", { words: [["verschwenden", "waste"]] }),
    ],
    dialogue: [
      tutor("Sie wirken irritiert. Was ist los?", "You seem irritated. What's wrong?"),
      you("Ich glaube, wir haben uns missverstanden.", "Say you think you misunderstood each other.", ["Ich glaube, da gab es ein Missverständnis.", "Wir haben uns wohl missverstanden."]),
      tutor("Oh, das tut mir leid. War meine Erklärung unverständlich?", "Oh, I'm sorry. Was my explanation hard to understand?"),
      you("Nein, sie war eigentlich leicht verständlich, aber ich habe nicht genau zugehört.", "Say no, it was actually easy to understand, but you didn't listen carefully.", ["Nein, sie war verständlich.", "Nein, das lag an mir."]),
      tutor("Kein Problem. Sollen wir es noch einmal durchgehen?", "No problem. Shall we go through it again?"),
      you("Ja, gern. Das wäre sehr hilfreich.", "Say yes, that would be very helpful.", ["Ja, bitte.", "Gern, danke."]),
    ],
  },
]);
