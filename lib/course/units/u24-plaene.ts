import { defineUnit, p, tutor, you } from "../define";

export const unit24 = defineUnit(24, "B1", "Pläne und Ziele", "Talk about plans, predictions and resolutions with the future tense, and say why you do things with um … zu and damit.", [
  {
    title: "The future with werden",
    intro:
      "German often uses the present tense for the future: 'Morgen fahre ich nach Berlin.' For plans further ahead, predictions and promises, use Futur I: a form of 'werden' in position 2 and the infinitive at the end: 'Ich werde mehr Sport machen.'",
    grammar: {
      title: "Futur I: werden + infinitive",
      text: "werden is irregular in the du and er/sie/es forms. The infinitive always goes to the end.",
      table: [
        ["", "werden", "Example"],
        ["ich", "werde", "Ich werde mehr lesen."],
        ["du", "wirst", "Wirst du kommen?"],
        ["er / sie / es", "wird", "Es wird regnen."],
        ["wir", "werden", "Wir werden umziehen."],
        ["ihr", "werdet", "Ihr werdet es schaffen."],
        ["sie / Sie", "werden", "Sie werden das sehen."],
      ],
    },
    phrases: [
      p("Nächstes Jahr werde ich nach Spanien ziehen.", "Next year I'll move to Spain.", { words: [["nächstes Jahr", "next year"], ["ziehen", "move (house)"]] }),
      p("Morgen wird es regnen.", "It will rain tomorrow.", { words: [["wird", "will"]] }),
      p("Ich werde dich nie vergessen.", "I'll never forget you.", { words: [["nie", "never"], ["vergessen", "forget"]] }),
      p("Wirst du am Wochenende arbeiten?", "Will you work at the weekend?"),
      p("Wir werden bald heiraten.", "We're going to get married soon.", { words: [["bald", "soon"], ["heiraten", "get married"]] }),
      p("Das wird bestimmt ein schöner Abend.", "That'll surely be a lovely evening.", { words: [["bestimmt", "surely, definitely"]] }),
      p("Keine Sorge, du wirst die Prüfung bestehen.", "Don't worry, you'll pass the exam.", { words: [["keine Sorge", "don't worry"], ["Prüfung", "exam"], ["bestehen", "pass"]] }),
    ],
    dialogue: [
      tutor("Was wirst du nächstes Jahr machen?", "What will you do next year?"),
      you("Nächstes Jahr werde ich nach {city} ziehen.", "Say next year you'll move to a city.", ["Ich werde mehr Deutsch lernen.", "Nächstes Jahr werde ich {thing}."]),
      tutor("Toll! Wirst du dort arbeiten?", "Great! Will you work there?"),
      you("Ja, ich werde dort als {job} arbeiten.", "Say yes, you'll work there as your job.", ["Ja, ich werde dort arbeiten.", "Nein, ich werde studieren."]),
      tutor("Ich habe morgen eine Prüfung und bin sehr nervös.", "I've got an exam tomorrow and I'm very nervous."),
      you("Keine Sorge, du wirst die Prüfung bestehen.", "Reassure them: they'll pass the exam.", ["Du wirst es schaffen!", "Keine Sorge!"]),
    ],
  },
  {
    title: "New Year's resolutions",
    intro:
      "At New Year many Germans make 'gute Vorsätze' (resolutions). You can say them with 'werden' or with 'wollen'. Words like 'endlich' (finally), 'weniger' (less), 'mehr' (more) and 'öfter' (more often) are very useful here.",
    phrases: [
      p("Was sind deine guten Vorsätze für das neue Jahr?", "What are your resolutions for the new year?", { words: [["gute Vorsätze", "resolutions"]] }),
      p("Ich werde endlich mit dem Rauchen aufhören.", "I'll finally stop smoking.", { words: [["endlich", "finally"], ["aufhören mit", "stop, quit"]] }),
      p("Ab Januar werde ich jeden Morgen joggen.", "From January I'll go jogging every morning.", { words: [["ab", "from"]] }),
      p("Ich will weniger Zeit am Handy verbringen.", "I want to spend less time on my phone.", { words: [["weniger", "less"], ["verbringen", "spend (time)"]] }),
      p("Wir wollen öfter zusammen kochen.", "We want to cook together more often.", { words: [["öfter", "more often"]] }),
      p("Ich werde mehr Geld sparen.", "I'm going to save more money.", { words: [["sparen", "save"]] }),
      p("Hoffentlich halte ich durch!", "Hopefully I'll stick with it!", { words: [["hoffentlich", "hopefully"], ["durchhalten", "stick with it, keep going"]] }),
    ],
    dialogue: [
      tutor("Was sind deine guten Vorsätze für das neue Jahr?", "What are your resolutions for the new year?"),
      you("Ich werde mehr Sport machen.", "Say you'll do more sport.", ["Ab Januar werde ich jeden Morgen joggen.", "Ich werde {thing}."]),
      tutor("Gute Idee! Noch etwas?", "Good idea! Anything else?"),
      you("Ich will weniger Zeit am Handy verbringen.", "Say you want to spend less time on your phone.", ["Ich werde mehr Geld sparen.", "Ich will weniger fernsehen."]),
      tutor("Das ist nicht leicht.", "That's not easy."),
      you("Ich weiß. Hoffentlich halte ich durch!", "Say you know, and hopefully you'll stick with it.", ["Hoffentlich halte ich durch!"]),
    ],
  },
  {
    title: "Saying why: um … zu",
    intro:
      "To say what you do something for, use 'um … zu' with the infinitive at the end: 'Ich lerne Deutsch, um in Deutschland zu arbeiten.' It only works when the person is the same in both parts. With separable verbs, 'zu' goes in the middle: 'um früh aufzustehen'.",
    grammar: {
      title: "um … zu + infinitive",
      text: "A comma separates the two parts. The um-part can also come first: Um fit zu bleiben, gehe ich zu Fuß.",
      table: [
        ["Main clause", "um … zu + infinitive"],
        ["Ich lerne Deutsch,", "um in Berlin zu studieren."],
        ["Sie spart Geld,", "um ein Auto zu kaufen."],
        ["Er geht früh ins Bett,", "um morgen fit zu sein."],
        ["Wir rufen an,", "um einen Tisch zu reservieren."],
      ],
    },
    phrases: [
      p("Ich lerne Deutsch, um in Deutschland zu arbeiten.", "I'm learning German in order to work in Germany.", { words: [["um … zu", "in order to"]] }),
      p("Sie spart Geld, um eine Weltreise zu machen.", "She's saving money to travel around the world.", { words: [["Weltreise", "trip around the world"]] }),
      p("Er geht zu Fuß, um fit zu bleiben.", "He walks to stay fit.", { words: [["zu Fuß gehen", "walk, go on foot"]] }),
      p("Ich stehe früh auf, um in Ruhe zu frühstücken.", "I get up early so I can have breakfast in peace.", { words: [["in Ruhe", "in peace"]] }),
      p("Wir brauchen das Geld, um die Miete zu bezahlen.", "We need the money to pay the rent.", { words: [["Miete", "rent"]] }),
      p("Ich rufe an, um einen Termin zu vereinbaren.", "I'm calling to make an appointment.", { words: [["vereinbaren", "arrange, agree on"]] }),
      p("Um gut Deutsch zu sprechen, muss man viel üben.", "To speak German well, you have to practise a lot.", { words: [["üben", "practise"]] }),
    ],
    dialogue: [
      tutor("Warum lernst du Deutsch?", "Why are you learning German?"),
      you("Ich lerne Deutsch, um in Deutschland zu arbeiten.", "Say you're learning German to work in Germany.", ["Um in Deutschland zu arbeiten.", "Um in {city} zu studieren."]),
      tutor("Und warum stehst du so früh auf?", "And why do you get up so early?"),
      you("Um in Ruhe zu frühstücken.", "Say: to have breakfast in peace.", ["Ich stehe früh auf, um in Ruhe zu frühstücken.", "Um Sport zu machen."]),
      tutor("Was ist am wichtigsten, um gut Deutsch zu sprechen?", "What's most important for speaking German well?"),
      you("Man muss viel üben.", "Say you have to practise a lot.", ["Um gut Deutsch zu sprechen, muss man viel üben.", "Viel üben!"]),
    ],
  },
  {
    title: "Learning goals: damit",
    intro:
      "'Damit' (so that) also expresses purpose, but it starts a normal subordinate clause with the verb at the end. You need it when the two parts have different subjects: 'Ich spreche langsam, damit du mich verstehst.' With the same subject, 'um … zu' usually sounds more natural.",
    grammar: {
      title: "um … zu or damit?",
      text: "Same subject: both are possible. Different subjects: only damit.",
      table: [
        ["", "um … zu", "damit"],
        ["same subject", "Ich übe, um besser zu sprechen.", "Ich übe, damit ich besser spreche."],
        ["different subjects", "not possible", "Ich spreche langsam, damit du mich verstehst."],
      ],
    },
    phrases: [
      p("Ich spreche langsam, damit du mich verstehst.", "I'm speaking slowly so that you understand me.", { words: [["damit", "so that"], ["langsam", "slowly"]] }),
      p("Mein Ziel ist die B1-Prüfung im Sommer.", "My goal is the B1 exam in the summer.", { words: [["Ziel", "goal"]] }),
      p("Ich schreibe neue Wörter auf, damit ich sie nicht vergesse.", "I write new words down so that I don't forget them.", { words: [["aufschreiben", "write down"]] }),
      p("Die Lehrerin wiederholt die Regel, damit alle sie verstehen.", "The teacher repeats the rule so that everyone understands it.", { words: [["wiederholen", "repeat"], ["Regel", "rule"]] }),
      p("Ich höre deutsche Podcasts, um mein Hörverstehen zu verbessern.", "I listen to German podcasts to improve my listening comprehension.", { words: [["Hörverstehen", "listening comprehension"], ["verbessern", "improve"]] }),
      p("Bis Dezember möchte ich fließend sprechen.", "By December I'd like to speak fluently.", { words: [["bis", "by"], ["fließend", "fluently"]] }),
      p("Bitte korrigieren Sie mich, damit ich keine Fehler mache.", "Please correct me so that I don't make mistakes.", { words: [["korrigieren", "correct"], ["Fehler", "mistakes"]] }),
    ],
    dialogue: [
      tutor("Was ist dein Ziel beim Deutschlernen?", "What's your goal in learning German?"),
      you("Mein Ziel ist die B1-Prüfung im Sommer.", "Say your goal is the B1 exam in summer.", ["Bis Dezember möchte ich fließend sprechen.", "Mein Ziel ist {thing}."]),
      tutor("Und wie lernst du?", "And how do you learn?"),
      you("Ich höre deutsche Podcasts, um mein Hörverstehen zu verbessern.", "Say you listen to German podcasts to improve your listening.", ["Ich höre deutsche Podcasts.", "Ich schreibe neue Wörter auf."]),
      tutor("Soll ich dich korrigieren?", "Shall I correct you?"),
      you("Ja, bitte, damit ich keine Fehler mache.", "Say yes please, so that you don't make mistakes.", ["Ja, bitte korrigier mich.", "Ja, gern!"]),
    ],
  },
]);
