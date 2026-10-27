import { defineUnit, p, tutor, you } from "../define";

export const unit27 = defineUnit(27, "B1", "Gesundheit und Sport", "Use the passive to say what is done at the doctor's and in hospital, deal with health insurance and talk about healthy habits.", [
  {
    title: "The passive: what is being done",
    intro:
      "The passive puts the action in focus, not the person doing it: 'Der Patient wird untersucht' (The patient is being examined). Build it with 'werden' in position 2 and the past participle at the end. You already know both parts from the future tense and the Perfekt.",
    grammar: {
      title: "Passiv Präsens: werden + Partizip II",
      text: "Here werden doesn't mean 'will': with a participle it makes the passive.",
      table: [
        ["", "werden", "Partizip II"],
        ["ich", "werde", "untersucht"],
        ["du", "wirst", "operiert"],
        ["er / sie / es", "wird", "behandelt"],
        ["wir / sie / Sie", "werden", "geimpft"],
      ],
    },
    phrases: [
      p("Der Patient wird gerade untersucht.", "The patient is being examined right now.", { words: [["untersuchen", "examine"]] }),
      p("Hier wird Blut abgenommen.", "Blood is taken here.", { words: [["Blut abnehmen", "take blood"]] }),
      p("Das Rezept wird in der Apotheke eingelöst.", "The prescription is filled at the pharmacy.", { words: [["Rezept", "prescription"], ["einlösen", "redeem, fill"]] }),
      p("Morgen werde ich am Knie operiert.", "I'm having an operation on my knee tomorrow.", { words: [["Knie", "knee"], ["operieren", "operate on"]] }),
      p("Die Tabletten werden dreimal am Tag genommen.", "The tablets are taken three times a day.", { words: [["dreimal", "three times"]] }),
      p("Wann wird mein Bein geröntgt?", "When is my leg going to be X-rayed?", { words: [["Bein", "leg"], ["röntgen", "X-ray"]] }),
      p("Kinder werden hier kostenlos behandelt.", "Children are treated free of charge here.", { words: [["kostenlos", "free of charge"], ["behandeln", "treat"]] }),
    ],
    dialogue: [
      tutor("Warum bist du so nervös?", "Why are you so nervous?"),
      you("Morgen werde ich am Knie operiert.", "Say you're having a knee operation tomorrow.", ["Morgen werde ich operiert.", "Ich werde morgen operiert."]),
      tutor("Oh! Dauert das lange?", "Oh! Does it take long?"),
      you("Nein, nur eine Stunde.", "Say no, just an hour.", ["Ich weiß es nicht.", "Nein, nicht lange."]),
      tutor("Und was passiert vorher?", "And what happens before that?"),
      you("Vorher wird Blut abgenommen.", "Say blood is taken beforehand.", ["Vorher wird mein Knie geröntgt.", "Vorher wird mir Blut abgenommen."]),
    ],
  },
  {
    title: "Health insurance: who does what (von + dative)",
    intro:
      "To say who does the action in a passive sentence, use 'von' + dative: 'Die Kosten werden von der Krankenkasse übernommen.' In Germany almost everyone has a 'Krankenkasse' (health insurance) and shows their 'Versichertenkarte' (insurance card) at the doctor's.",
    phrases: [
      p("Die Kosten werden von der Krankenkasse übernommen.", "The costs are covered by the health insurance.", { words: [["Kosten", "costs"], ["Krankenkasse", "health insurance"], ["übernehmen", "cover, take on"]] }),
      p("Die Überweisung wird vom Hausarzt geschrieben.", "The referral is written by the family doctor.", { words: [["Überweisung", "referral"], ["Hausarzt", "family doctor, GP"]] }),
      p("Bei welcher Krankenkasse sind Sie versichert?", "Which health insurance are you with?", { words: [["versichert", "insured"]] }),
      p("Haben Sie Ihre Versichertenkarte dabei?", "Do you have your insurance card with you?", { words: [["Versichertenkarte", "insurance card"], ["dabeihaben", "have with you"]] }),
      p("Für den Facharzt brauche ich eine Überweisung.", "I need a referral for the specialist.", { words: [["Facharzt", "specialist"]] }),
      p("Die Brille wird leider nicht bezahlt.", "Unfortunately the glasses aren't paid for.", { words: [["Brille", "glasses"]] }),
      p("Der Termin wird von der Praxis bestätigt.", "The appointment is confirmed by the practice.", { words: [["Praxis", "(doctor's) practice"], ["bestätigen", "confirm"]] }),
    ],
    dialogue: [
      tutor("Guten Tag, haben Sie Ihre Versichertenkarte dabei?", "Hello, do you have your insurance card with you?"),
      you("Ja, hier ist sie.", "Say yes, here it is.", ["Ja, bitte schön.", "Moment, ja, hier."]),
      tutor("Bei welcher Krankenkasse sind Sie versichert?", "Which health insurance are you with?"),
      you("Ich bin bei der {name} versichert.", "Say which health insurance you're with.", ["Bei der {name}."]),
      tutor("Für den Facharzt brauchen Sie eine Überweisung.", "You need a referral for the specialist."),
      you("Wird die Überweisung vom Hausarzt geschrieben?", "Ask if the referral is written by the family doctor.", ["Wer schreibt die Überweisung?", "Bekomme ich die Überweisung vom Hausarzt?"]),
    ],
  },
  {
    title: "Healthy habits",
    intro:
      "To talk about a healthy lifestyle you'll need 'sich ernähren' (eat, nourish yourself) and 'sich bewegen' (move, get exercise). The passive without a person is common on signs and in general statements: 'Hier wird nicht geraucht' (No smoking here).",
    phrases: [
      p("Ich ernähre mich gesund und esse wenig Fleisch.", "I eat healthily and don't eat much meat.", { words: [["sich ernähren", "eat, nourish oneself"]] }),
      p("Man sollte sich jeden Tag mindestens dreißig Minuten bewegen.", "You should get at least thirty minutes of exercise every day.", { accept: ["Man sollte sich jeden Tag mindestens 30 Minuten bewegen."], words: [["mindestens", "at least"], ["sich bewegen", "move, get exercise"]] }),
      p("Ich gehe dreimal pro Woche ins Fitnessstudio.", "I go to the gym three times a week.", { words: [["Fitnessstudio", "gym"]] }),
      p("Seit ich jogge, schlafe ich viel besser.", "Since I started jogging, I sleep much better.", { words: [["seit", "since"]] }),
      p("In unserer Familie wird viel Sport gemacht.", "Our family does a lot of sport.", { note: "Passive without a person: the focus is on the activity." }),
      p("Hier wird nicht geraucht.", "No smoking here.", { words: [["rauchen", "smoke"]] }),
      p("Ich trinke kaum noch Cola.", "I hardly drink cola anymore.", { words: [["kaum noch", "hardly … anymore"]] }),
    ],
    dialogue: [
      tutor("Was machst du für deine Gesundheit?", "What do you do for your health?"),
      you("Ich ernähre mich gesund und esse wenig Fleisch.", "Say you eat healthily and not much meat.", ["Ich ernähre mich gesund.", "Ich mache viel Sport."]),
      tutor("Und machst du Sport?", "And do you do sport?"),
      you("Ich gehe dreimal pro Woche ins Fitnessstudio.", "Say you go to the gym three times a week.", ["Ich gehe {number} Mal pro Woche joggen.", "Ich gehe ins Fitnessstudio."]),
      tutor("Merkst du einen Unterschied?", "Do you notice a difference?"),
      you("Ja, seit ich jogge, schlafe ich viel besser.", "Say yes, since you started jogging you sleep much better.", ["Ja, ich schlafe viel besser.", "Ja, ich fühle mich besser."]),
    ],
  },
  {
    title: "At the hospital",
    intro:
      "In a hospital ('Krankenhaus') you'll deal with the 'Notaufnahme' (emergency department), the 'Station' (ward) and the 'Besuchszeiten' (visiting hours). Many sentences here use the passive, because what matters is what is done to the patient, not who does it.",
    phrases: [
      p("Wo ist die Notaufnahme?", "Where's the emergency department?", { words: [["Notaufnahme", "A&E, emergency department"]] }),
      p("Auf welcher Station liegt Frau Weber?", "Which ward is Mrs Weber on?", { words: [["Station", "ward"], ["liegen", "lie, be (in hospital)"]] }),
      p("Wann sind die Besuchszeiten?", "When are visiting hours?", { words: [["Besuchszeiten", "visiting hours"]] }),
      p("Der Patient wird morgen entlassen.", "The patient will be discharged tomorrow.", { words: [["entlassen", "discharge"]] }),
      p("Ich habe starke Schmerzen in der Brust.", "I have severe chest pain.", { words: [["Schmerzen", "pain"], ["Brust", "chest"]] }),
      p("Sie dürfen vor der Operation nichts essen.", "You mustn't eat anything before the operation.", { note: "'nicht dürfen' means 'must not'." }),
      p("Gute Besserung und bis bald!", "Get well soon and see you soon!"),
    ],
    dialogue: [
      tutor("Krankenhaus Nord, Information. Wie kann ich helfen?", "North Hospital, information desk. How can I help?"),
      you("Auf welcher Station liegt Frau {name}?", "Ask which ward a patient is on.", ["Ich möchte Frau {name} besuchen.", "Wo liegt Herr {name}?"]),
      tutor("Station drei, im zweiten Stock.", "Ward three, on the second floor."),
      you("Danke. Wann sind die Besuchszeiten?", "Say thanks and ask when visiting hours are.", ["Wann sind die Besuchszeiten?"]),
      tutor("Von vierzehn bis neunzehn Uhr. Sie wird übrigens morgen entlassen.", "From 2 to 7 pm. By the way, she's being discharged tomorrow."),
      you("Oh, das ist schön!", "Say that's nice.", ["Das freut mich!", "Super!"]),
    ],
  },
]);
