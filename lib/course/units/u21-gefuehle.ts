import { defineUnit, p, tutor, you } from "../define";

export const unit21 = defineUnit(21, "A2", "Gefühle und Freizeit", "Talk about feelings and interests with reflexive verbs and make plans with friends.", [
  {
    title: "Reflexive verbs (sich freuen, sich beeilen)",
    intro:
      "Reflexive verbs come with 'sich': the action points back to the subject. 'Ich freue mich' means I'm happy, literally 'I gladden myself'. The reflexive pronoun matches the subject: mich, dich, sich, uns, euch, sich.",
    grammar: {
      title: "Reflexive pronouns (accusative)",
      text: "Only er/sie/es and sie/Sie have the special form 'sich'. The others look like normal accusative pronouns.",
      table: [
        ["Subject", "Pronoun", "Example"],
        ["ich", "mich", "Ich beeile mich."],
        ["du", "dich", "Du ärgerst dich."],
        ["er / sie / es", "sich", "Sie freut sich."],
        ["wir", "uns", "Wir treffen uns."],
        ["ihr", "euch", "Ihr beeilt euch."],
        ["sie / Sie", "sich", "Sie setzen sich."],
      ],
    },
    phrases: [
      p("Ich freue mich sehr.", "I'm very happy.", { words: [["sich freuen", "be happy, be glad"]] }),
      p("Beeil dich, der Bus kommt!", "Hurry up, the bus is coming!", { words: [["sich beeilen", "hurry"]] }),
      p("Wir müssen uns beeilen.", "We have to hurry.", { note: "With a modal verb the pronoun stays near the front, the infinitive goes to the end." }),
      p("Setzen Sie sich bitte.", "Please sit down.", { words: [["sich setzen", "sit down"]] }),
      p("Er ärgert sich über den Stau.", "He's annoyed about the traffic jam.", { words: [["sich ärgern über", "be annoyed about"], ["Stau", "traffic jam"]] }),
      p("Ich fühle mich heute nicht gut.", "I don't feel well today.", { words: [["sich fühlen", "feel"]] }),
      p("Ruh dich ein bisschen aus!", "Have a bit of a rest!", { words: [["sich ausruhen", "rest"]] }),
    ],
    dialogue: [
      tutor("Wie geht's? Du siehst müde aus.", "How are you? You look tired."),
      you("Ich fühle mich heute nicht gut.", "Say you don't feel well today.", ["Ich bin sehr müde.", "Es geht mir nicht gut."]),
      tutor("Oh nein. Ruh dich ein bisschen aus!", "Oh no. Have a bit of a rest!"),
      you("Das geht nicht, ich muss mich beeilen.", "Say you can't, you have to hurry.", ["Ich muss mich beeilen."]),
      tutor("Warum denn?", "Why's that?"),
      you("Mein Zug fährt in zehn Minuten.", "Say your train leaves in ten minutes.", ["Mein Zug fährt in {number} Minuten.", "Ich habe einen Termin."]),
    ],
  },
  {
    title: "Looking forward to it (sich freuen auf / über)",
    intro:
      "Many reflexive verbs take a fixed preposition. 'sich freuen auf' is about something in the future, 'sich freuen über' is about something that is already here. To ask about the thing, use wo(r) + preposition: 'Worauf freust du dich?'",
    grammar: {
      title: "Reflexive verbs with a preposition",
      text: "auf and über take the accusative here. Learn the verb and its preposition together.",
      table: [
        ["Verb", "Meaning", "Question"],
        ["sich freuen auf", "look forward to", "Worauf freust du dich?"],
        ["sich freuen über", "be pleased about", "Worüber freust du dich?"],
        ["sich ärgern über", "be annoyed about", "Worüber ärgerst du dich?"],
        ["sich interessieren für", "be interested in", "Wofür interessierst du dich?"],
      ],
    },
    phrases: [
      p("Ich freue mich auf das Wochenende.", "I'm looking forward to the weekend."),
      p("Sie freut sich über das Geschenk.", "She's pleased about the present."),
      p("Worauf freust du dich am meisten?", "What are you looking forward to most?", { words: [["worauf", "to what"], ["am meisten", "most"]] }),
      p("Ich interessiere mich für Kunst und Musik.", "I'm interested in art and music.", { words: [["sich interessieren für", "be interested in"], ["Kunst", "art"]] }),
      p("Wofür interessierst du dich?", "What are you interested in?"),
      p("Ich ärgere mich über das schlechte Wetter.", "I'm annoyed about the bad weather."),
      p("Wir freuen uns schon auf den Urlaub.", "We're already looking forward to the holiday."),
    ],
    dialogue: [
      tutor("Worauf freust du dich am meisten?", "What are you looking forward to most?"),
      you("Ich freue mich auf das Wochenende.", "Say you're looking forward to the weekend.", ["Ich freue mich auf den Urlaub.", "Ich freue mich auf {thing}."]),
      tutor("Ich auch! Wofür interessierst du dich eigentlich?", "Me too! What are you actually interested in?"),
      you("Ich interessiere mich für {thing}.", "Say what you're interested in.", ["Ich interessiere mich für Kunst und Musik.", "Ich interessiere mich für Sport."]),
      tutor("Und worüber ärgerst du dich?", "And what annoys you?"),
      you("Ich ärgere mich über das schlechte Wetter.", "Say you're annoyed about the bad weather.", ["Ich ärgere mich über den Stau.", "Über nichts!"]),
    ],
  },
  {
    title: "Meeting up with friends (sich treffen, sich verabreden)",
    intro:
      "To make plans you need 'sich treffen' (meet up) and 'sich verabreden' (arrange to meet). With 'wir' the pronoun is 'uns': 'Wollen wir uns am Freitag treffen?' Suggest, accept or say no politely.",
    phrases: [
      p("Wollen wir uns am Freitag treffen?", "Shall we meet up on Friday?", { words: [["sich treffen", "meet up"]] }),
      p("Wo treffen wir uns?", "Where shall we meet?"),
      p("Treffen wir uns vor dem Kino?", "Shall we meet in front of the cinema?", { words: [["vor", "in front of"]] }),
      p("Ich habe mich mit Lena verabredet.", "I've arranged to meet Lena.", { words: [["sich verabreden", "arrange to meet"]], note: "In the Perfekt the pronoun comes right after haben." }),
      p("Hast du Lust, ins Konzert zu gehen?", "Do you fancy going to the concert?", { words: [["Lust haben", "feel like, fancy"], ["Konzert", "concert"]] }),
      p("Am Freitag habe ich leider keine Zeit.", "Unfortunately I don't have time on Friday."),
      p("Wir treffen uns um sieben am Eingang.", "We'll meet at seven at the entrance.", { accept: ["Wir treffen uns um 7 am Eingang."], words: [["Eingang", "entrance"]] }),
    ],
    dialogue: [
      tutor("Hast du Lust, ins Konzert zu gehen?", "Do you fancy going to the concert?"),
      you("Ja, gern! Wann denn?", "Say yes, gladly, and ask when.", ["Ja, super!", "Leider habe ich keine Zeit."]),
      tutor("Am Samstag. Wollen wir uns vorher treffen?", "On Saturday. Shall we meet beforehand?"),
      you("Ja, wo treffen wir uns?", "Say yes and ask where you'll meet.", ["Gute Idee!"]),
      tutor("Vor dem Konzerthaus, um sieben?", "In front of the concert hall, at seven?"),
      you("Super, ich freue mich!", "Say great, you're looking forward to it.", ["Okay, bis Samstag!", "Perfekt, ich freue mich darauf."]),
    ],
  },
  {
    title: "Feelings and applying (sich bewerben, sich entschuldigen)",
    intro:
      "Some reflexive verbs are about bigger moments: applying for a job (sich bewerben), apologising (sich entschuldigen), getting used to something (sich gewöhnen an). In the Perfekt they all take haben: 'Ich habe mich beworben.'",
    phrases: [
      p("Ich habe mich um eine neue Stelle beworben.", "I've applied for a new job.", { words: [["sich bewerben um", "apply for"], ["beworben", "applied"]] }),
      p("Er hat sich bei ihr entschuldigt.", "He apologised to her.", { words: [["sich entschuldigen", "apologise"]] }),
      p("Ich habe mich an das Wetter gewöhnt.", "I've got used to the weather.", { words: [["sich gewöhnen an", "get used to"]] }),
      p("Wir haben uns lange nicht gesehen.", "We haven't seen each other for a long time.", { note: "'uns' can also mean 'each other'." }),
      p("Sie hat sich sehr über die Nachricht gefreut.", "She was very pleased about the news."),
      p("Mach dir keine Sorgen!", "Don't worry!", { words: [["sich Sorgen machen", "worry"]], note: "Here the pronoun is dative: mir, dir." }),
    ],
    dialogue: [
      tutor("Hallo! Wir haben uns lange nicht gesehen!", "Hi! We haven't seen each other for a long time!"),
      you("Stimmt! Wie geht es dir?", "Say that's true and ask how they are.", ["Ja, das stimmt!"]),
      tutor("Gut! Ich habe mich um eine neue Stelle beworben.", "Good! I've applied for a new job."),
      you("Toll! Ich freue mich für dich.", "Say great, you're happy for them.", ["Super!", "Viel Glück!"]),
      tutor("Aber ich bin so nervös!", "But I'm so nervous!"),
      you("Mach dir keine Sorgen!", "Tell them not to worry.", ["Das schaffst du!"]),
    ],
  },
]);
