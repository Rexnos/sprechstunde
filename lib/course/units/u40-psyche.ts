import { defineUnit, p, tutor, you } from "../define";

export const unit40 = defineUnit(40, "B2", "Körper und Psyche", "Talk about stress, burnout and wellbeing, sound natural with modal particles, and use alternatives to the passive.", [
  {
    title: "Modal particles: doch, ja, mal",
    intro:
      "Small words like doch, ja and mal don't change the facts of a sentence, but they change its tone completely. They make requests friendlier, show surprise or remind someone of something they already know. Native speakers use them all the time; without them German can sound stiff.",
    grammar: {
      title: "What the particles do",
      text: "Modal particles are unstressed and usually come after the verb and pronouns.",
      table: [
        ["Particle", "Effect", "Example"],
        ["doch", "urges, or reminds: you know that", "Mach doch eine Pause!"],
        ["ja", "surprise, or shared knowledge", "Du siehst ja müde aus!"],
        ["mal", "softens a request, makes it casual", "Kannst du mir mal helfen?"],
      ],
    },
    phrases: [
      p("Du siehst ja müde aus!", "You look tired!", { note: "'ja' shows surprise at something obvious." }),
      p("Mach doch mal eine Pause!", "Why don't you take a break!", { note: "'doch mal' turns an order into friendly advice." }),
      p("Das weißt du doch!", "You know that!", { note: "'doch' reminds someone of something they should know." }),
      p("Ich habe ja gesagt, dass es zu viel ist.", "I did say it was too much.", { note: "'ja' refers to something both people know." }),
      p("Schau mal, ich mache mir Sorgen um dich.", "Look, I'm worried about you.", { words: [["sich Sorgen machen um", "worry about"]] }),
      p("Ruf doch einfach beim Arzt an.", "Just call the doctor.", { words: [["einfach", "just, simply"]] }),
      p("Kannst du mir mal helfen?", "Could you give me a hand?"),
    ],
    dialogue: [
      tutor("Hallo! Du siehst ja müde aus!", "Hi! You look tired!"),
      you("Ja, ich schlafe in letzter Zeit schlecht.", "Say yes, you've been sleeping badly lately.", ["Ja, ich bin total müde."]),
      tutor("Mach doch mal eine Pause!", "Why don't you take a break!"),
      you("Das geht nicht, ich habe so viel zu tun.", "Say that's not possible, you have so much to do.", ["Keine Zeit!"]),
      tutor("Ruf doch einfach beim Arzt an.", "Just call the doctor."),
      you("Du hast ja recht. Das mache ich.", "Say they're right (use ja) and you'll do it.", ["Du hast recht.", "Gute Idee."]),
    ],
  },
  {
    title: "eben, halt, denn, schon: talking about stress",
    intro:
      "'eben' and 'halt' say 'that's just how it is, nothing to be done' ('halt' is more colloquial and southern). 'denn' makes questions sound interested rather than blunt, and 'schon' reassures. You'll hear them all when people talk about stress and burnout.",
    grammar: {
      title: "More modal particles",
      text: "'denn' only appears in questions.",
      table: [
        ["Particle", "Effect", "Example"],
        ["eben", "that's just how it is", "So ist das eben."],
        ["halt", "same, more colloquial", "Ich bin halt gestresst."],
        ["denn", "softens a question, shows interest", "Was ist denn los?"],
        ["schon", "reassures", "Das wird schon wieder."],
      ],
    },
    phrases: [
      p("Was ist denn los mit dir?", "What's the matter with you?", { note: "Without 'denn' this would sound abrupt." }),
      p("Ich bin halt total gestresst.", "I'm just totally stressed.", { words: [["gestresst", "stressed"]] }),
      p("So ist das eben im Job.", "That's just how it is at work."),
      p("Das wird schon wieder.", "It'll be all right.", { note: "A common way to comfort someone." }),
      p("Ich fühle mich ausgebrannt.", "I feel burned out.", { words: [["ausgebrannt", "burned out"]] }),
      p("Ich kann nachts nicht abschalten.", "I can't switch off at night.", { words: [["abschalten", "switch off, relax"]] }),
      p("Vielleicht ist das schon ein Burnout.", "Maybe it's already burnout.", { words: [["Burnout", "burnout"]] }),
    ],
    dialogue: [
      tutor("Was ist denn los mit dir?", "What's the matter with you?"),
      you("Ich bin halt total gestresst.", "Say you're just totally stressed (use halt).", ["Ich bin total gestresst."]),
      tutor("Schon wieder die Arbeit?", "Work again?"),
      you("Ja, so ist das eben im Job.", "Say yes, that's just how it is at work.", ["Ja, leider."]),
      tutor("Das wird schon wieder. Schläfst du denn gut?", "It'll be all right. So are you sleeping well?"),
      you("Nein, ich kann nachts nicht abschalten.", "Say no, you can't switch off at night.", ["Nein, nicht so gut."]),
    ],
  },
  {
    title: "Alternatives to the passive",
    intro:
      "Instead of 'kann … werden' or 'muss … werden', formal German often uses shorter forms. 'sich lassen' + infinitive means 'can be done', 'sein + zu' + infinitive means 'can' or 'must be done', and adjectives in -bar mean '-able'. You'll find them on medicine leaflets and in official texts.",
    grammar: {
      title: "Passiversatz",
      text: "sein + zu can mean 'must' or 'can'; context decides. With separable verbs, zu goes in the middle: einzunehmen.",
      table: [
        ["Form", "Meaning", "Example"],
        ["sich lassen + infinitive", "can be done", "Das Problem lässt sich lösen."],
        ["sein + zu + infinitive", "must / can be done", "Die Regeln sind zu beachten."],
        ["verb stem + bar", "can be done (-able)", "Die Krankheit ist heilbar."],
      ],
    },
    phrases: [
      p("Das Problem lässt sich lösen.", "The problem can be solved.", { note: "= Das Problem kann gelöst werden." }),
      p("Stress lässt sich nicht ganz vermeiden.", "Stress can't be avoided completely.", { words: [["vermeiden", "avoid"]] }),
      p("Die Hinweise des Arztes sind unbedingt zu beachten.", "The doctor's advice must definitely be followed.", { words: [["Hinweise", "advice, instructions"], ["unbedingt", "definitely"], ["beachten", "follow, observe"]] }),
      p("Die Tabletten sind nach dem Essen einzunehmen.", "The tablets are to be taken after meals.", { words: [["einnehmen", "take (medicine)"]] }),
      p("Viele Krankheiten sind heute heilbar.", "Many diseases are curable today.", { words: [["heilbar", "curable"]] }),
      p("Das Arbeitspensum ist kaum machbar.", "The workload is barely manageable.", { words: [["Arbeitspensum", "workload"], ["machbar", "doable, manageable"]] }),
      p("Die Schmerzen waren kaum auszuhalten.", "The pain was almost unbearable.", { words: [["aushalten", "bear, endure"]] }),
    ],
    dialogue: [
      tutor("Was hat die Ärztin gesagt?", "What did the doctor say?"),
      you("Die Tabletten sind nach dem Essen einzunehmen.", "Say the tablets are to be taken after meals.", ["Ich soll die Tabletten nach dem Essen nehmen."]),
      tutor("Und dein Rücken? Kann man da etwas machen?", "And your back? Can anything be done?"),
      you("Ja, das Problem lässt sich lösen.", "Say yes, the problem can be solved.", ["Ja, mit Physiotherapie."]),
      tutor("Und wie geht es dir bei der Arbeit?", "And how are things at work?"),
      you("Das Arbeitspensum ist kaum machbar.", "Say the workload is barely manageable.", ["Es ist zu viel."]),
    ],
  },
  {
    title: "Wellbeing and balance",
    intro:
      "Talking about mental health is becoming more normal in Germany. People speak about finding an Ausgleich (a balance, something to unwind with), setting Grenzen (boundaries) and learning to say no. Modal particles help you give advice without sounding bossy.",
    phrases: [
      p("Sport ist für mich ein wichtiger Ausgleich.", "Sport is an important way for me to unwind.", { words: [["Ausgleich", "balance, way to unwind"]] }),
      p("Ich habe gelernt, Nein zu sagen.", "I've learned to say no."),
      p("Man muss eben Grenzen setzen.", "You just have to set boundaries.", { words: [["Grenzen setzen", "set boundaries"]] }),
      p("Seitdem ich meditiere, schlafe ich besser.", "Since I started meditating, I sleep better.", { words: [["seitdem", "since (conjunction)"], ["meditieren", "meditate"]] }),
      p("Abends ist mein Handy ausgeschaltet.", "In the evenings my phone is switched off.", { words: [["ausgeschaltet", "switched off"]] }),
      p("Psychische Probleme sind leider immer noch ein Tabu.", "Mental health problems are unfortunately still a taboo.", { words: [["psychisch", "mental, psychological"]] }),
      p("Hol dir doch professionelle Hilfe.", "Why don't you get professional help?", { words: [["sich Hilfe holen", "get help"]] }),
    ],
    dialogue: [
      tutor("Was machst du gegen Stress?", "What do you do about stress?"),
      you("Sport ist für mich ein wichtiger Ausgleich.", "Say sport is an important way for you to unwind.", ["Ich mache {sport}.", "Ich meditiere."]),
      tutor("Und bei der Arbeit? Sagst du auch mal Nein?", "And at work? Do you ever say no?"),
      you("Ja, ich habe gelernt, Nein zu sagen.", "Say yes, you've learned to say no.", ["Nein, das fällt mir schwer."]),
      tutor("Toll. Hast du noch einen Tipp für mich?", "Great. Do you have another tip for me?"),
      you("Man muss eben Grenzen setzen.", "Say you just have to set boundaries.", ["Mach doch mal eine Pause!"]),
    ],
  },
]);
