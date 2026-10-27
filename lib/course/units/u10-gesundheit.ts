import { defineUnit, p, tutor, you } from "../define";

export const unit10 = defineUnit(10, "A1", "Gesundheit", "Say what hurts, talk to a doctor and a pharmacist, and give advice.", [
  {
    title: "What hurts?",
    intro:
      "To say something hurts, Germans say 'Mir tut … weh' (literally 'to me … does pain'). With plural body parts it becomes 'Mir tun … weh'. For aches you can also add '-schmerzen' to a body part: 'Ich habe Kopfschmerzen.'",
    grammar: {
      title: "Saying what hurts",
      text: "'tut' for one thing, 'tun' for several. '-schmerzen' (pains) joins onto the body part to make one word.",
      table: [
        ["Pattern", "Example", "English"],
        ["Mir tut … weh.", "Mir tut der Kopf weh.", "My head hurts."],
        ["Mir tun … weh.", "Mir tun die Füße weh.", "My feet hurt."],
        ["Ich habe …schmerzen.", "Ich habe Bauchschmerzen.", "I have a stomach ache."],
      ],
    },
    phrases: [
      p("Mir tut der Kopf weh.", "My head hurts.", { words: [["mir", "(to) me"], ["Kopf", "head"], ["tut … weh", "hurts"]] }),
      p("Mir tut der Rücken weh.", "My back hurts.", { words: [["Rücken", "back"]] }),
      p("Mir tun die Füße weh.", "My feet hurt.", { words: [["Füße", "feet"]] }),
      p("Mein Hals tut weh.", "My throat hurts.", { words: [["Hals", "throat, neck"]], note: "Instead of 'Mir tut der … weh' you can also say 'Mein … tut weh'." }),
      p("Ich habe Bauchschmerzen.", "I have a stomach ache.", { words: [["Bauch", "stomach, belly"], ["Schmerzen", "pains"]] }),
      p("Ich habe Zahnschmerzen.", "I have toothache.", { words: [["Zahn", "tooth"]] }),
      p("Ich habe Fieber.", "I have a temperature.", { words: [["Fieber", "fever"]] }),
      p("Ich bin erkältet.", "I have a cold.", { words: [["erkältet", "having a cold"]] }),
    ],
    dialogue: [
      tutor("Was ist los? Du siehst müde aus.", "What's wrong? You look tired."),
      you("Mir tut der Kopf weh.", "Say your head hurts.", ["Ich habe Kopfschmerzen.", "Mir tut der {part} weh."]),
      tutor("Oh nein! Hast du auch Fieber?", "Oh no! Do you have a temperature too?"),
      you("Nein, aber ich bin erkältet.", "Say no, but you have a cold.", ["Nein.", "Ja, ich habe Fieber."]),
    ],
  },
  {
    title: "At the doctor's",
    intro:
      "At the doctor's ('beim Arzt') you are asked 'Was fehlt Ihnen?' (What's the matter?). Say what hurts and how long you've had it with 'seit' (since, for). If you can't work, the doctor gives you a sick note, 'eine Krankschreibung'.",
    phrases: [
      p("Was fehlt Ihnen?", "What's the matter with you?", { words: [["fehlt", "is missing, is wrong"]] }),
      p("Seit wann haben Sie das?", "How long have you had that?", { words: [["seit wann", "since when"]] }),
      p("Seit drei Tagen.", "For three days.", { accept: ["Seit 3 Tagen."], note: "German uses the present tense with 'seit' for things that are still going on." }),
      p("Ich habe Husten und Schnupfen.", "I have a cough and a runny nose.", { words: [["Husten", "cough"], ["Schnupfen", "runny nose, cold"]] }),
      p("Ich kann nicht gut schlafen.", "I can't sleep well."),
      p("Machen Sie bitte den Mund auf.", "Please open your mouth.", { words: [["Mund", "mouth"], ["machen … auf", "open"]] }),
      p("Ich schreibe Ihnen ein Rezept.", "I'll write you a prescription.", { words: [["Rezept", "prescription"]] }),
      p("Ich brauche eine Krankschreibung.", "I need a sick note.", { words: [["Krankschreibung", "sick note"]] }),
    ],
    dialogue: [
      tutor("Guten Tag. Was fehlt Ihnen?", "Hello. What's the matter?"),
      you("Ich habe Husten und Schnupfen.", "Say you have a cough and a runny nose.", ["Mir tut der Hals weh.", "Ich habe Fieber."]),
      tutor("Seit wann haben Sie das?", "How long have you had that?"),
      you("Seit drei Tagen.", "Say for three days.", ["Seit {number} Tagen.", "Seit gestern."]),
      tutor("Machen Sie bitte den Mund auf.", "Please open your mouth."),
      you("Ich brauche auch eine Krankschreibung.", "Say you also need a sick note.", ["Ich brauche eine Krankschreibung."]),
    ],
  },
  {
    title: "Giving advice (the imperative)",
    intro:
      "To tell someone what to do, use the imperative. For 'Sie', put the verb first and keep 'Sie': 'Nehmen Sie …!' For 'du', take the du-form, drop the '-st' and drop 'du': du trinkst → 'Trink!'. Add 'bitte' to sound friendly.",
    grammar: {
      title: "The imperative",
      text: "Sie-form: verb + Sie. du-form: the du-form without -st (no 'du'). Verbs that change e → i keep the i: du nimmst → nimm! Verbs that add an umlaut lose it: du schläfst → schlaf!",
      table: [
        ["Verb", "Sie", "du"],
        ["trinken", "Trinken Sie!", "Trink!"],
        ["bleiben", "Bleiben Sie!", "Bleib!"],
        ["nehmen", "Nehmen Sie!", "Nimm!"],
        ["schlafen", "Schlafen Sie!", "Schlaf!"],
      ],
    },
    phrases: [
      p("Trinken Sie viel Wasser.", "Drink lots of water.", { words: [["viel", "a lot of"]] }),
      p("Nehmen Sie die Tabletten dreimal am Tag.", "Take the tablets three times a day.", { words: [["Tabletten", "tablets"], ["dreimal", "three times"]] }),
      p("Bleiben Sie zwei Tage im Bett.", "Stay in bed for two days.", { accept: ["Bleiben Sie 2 Tage im Bett."], words: [["bleiben", "stay"]] }),
      p("Trink viel Tee!", "Drink lots of tea!", { note: "The du-form, for friends and family." }),
      p("Bleib heute zu Hause!", "Stay at home today!", { words: [["zu Hause", "at home"]] }),
      p("Nimm eine Tablette!", "Take a tablet!"),
      p("Geh doch zum Arzt!", "Why don't you go to the doctor?", { words: [["doch", "(softens advice)"]] }),
      p("Gute Besserung!", "Get well soon!", { words: [["Besserung", "recovery"]] }),
    ],
    dialogue: [
      tutor("Ich bin erkältet und mir tut der Hals weh.", "I have a cold and my throat hurts."),
      you("Trink viel Tee!", "Tell your friend to drink lots of tea.", ["Trink viel Wasser!"]),
      tutor("Ja, gute Idee. Ich muss aber arbeiten.", "Yes, good idea. But I have to work."),
      you("Bleib heute zu Hause!", "Tell them to stay at home today.", ["Geh doch zum Arzt!"]),
      tutor("Okay, du hast recht.", "Okay, you're right."),
      you("Gute Besserung!", "Wish them a quick recovery."),
    ],
  },
  {
    title: "At the pharmacy",
    intro:
      "In Germany, even simple medicines like painkillers are sold only in the 'Apotheke' (pharmacy), not in the supermarket. Ask for 'etwas gegen …' (something for …). Some medicines need a prescription, 'ein Rezept'.",
    phrases: [
      p("Ich brauche etwas gegen Kopfschmerzen.", "I need something for a headache.", { words: [["etwas", "something"], ["gegen", "against, for"]] }),
      p("Haben Sie etwas gegen Husten?", "Do you have anything for a cough?"),
      p("Hier ist mein Rezept.", "Here is my prescription."),
      p("Brauche ich dafür ein Rezept?", "Do I need a prescription for it?", { words: [["dafür", "for it"]] }),
      p("Das gibt es ohne Rezept.", "You can get that without a prescription.", { words: [["es gibt", "there is, you can get"], ["ohne", "without"]] }),
      p("Wie oft muss ich die Tabletten nehmen?", "How often do I have to take the tablets?", { words: [["wie oft", "how often"]] }),
      p("Nehmen Sie zwei Tabletten nach dem Essen.", "Take two tablets after meals.", { accept: ["Nehmen Sie 2 Tabletten nach dem Essen."], words: [["nach dem Essen", "after eating"]] }),
    ],
    dialogue: [
      tutor("Guten Tag. Was kann ich für Sie tun?", "Hello. What can I do for you?"),
      you("Ich brauche etwas gegen Kopfschmerzen.", "Say you need something for a headache.", ["Haben Sie etwas gegen Kopfschmerzen?", "Ich brauche etwas gegen {problem}."]),
      tutor("Diese Tabletten sind gut.", "These tablets are good."),
      you("Brauche ich dafür ein Rezept?", "Ask if you need a prescription for them.", ["Brauche ich ein Rezept?"]),
      tutor("Nein, das gibt es ohne Rezept.", "No, you can get them without a prescription."),
      you("Wie oft muss ich die Tabletten nehmen?", "Ask how often you have to take the tablets."),
      tutor("Nehmen Sie zwei Tabletten nach dem Essen. Gute Besserung!", "Take two tablets after meals. Get well soon!"),
    ],
  },
]);
