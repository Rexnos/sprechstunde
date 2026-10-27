import { defineUnit, p, tutor, you } from "../define";

export const unit16 = defineUnit(16, "A2", "Arbeit und Beruf", "Talk about jobs and your working day, and say what was, what you had and what you had to do.", [
  {
    title: "Jobs and the workplace",
    intro:
      "'Was sind Sie von Beruf?' asks about someone's job. You answer 'Ich bin …' or 'Ich arbeite als …' without an article: 'Ich bin Ingenieurin.' 'Seit' + dative with the present tense says how long something has been going on.",
    phrases: [
      p("Was sind Sie von Beruf?", "What do you do for a living?", { words: [["von Beruf", "by profession"]] }),
      p("Ich arbeite als Krankenpfleger in einem Krankenhaus.", "I work as a nurse in a hospital.", { words: [["Krankenpfleger", "nurse (male)"], ["Krankenhaus", "hospital"]], note: "A female nurse is 'Krankenpflegerin'." }),
      p("Ich bin selbstständig.", "I'm self-employed.", { words: [["selbstständig", "self-employed"]] }),
      p("Ich arbeite Teilzeit.", "I work part-time.", { words: [["Teilzeit", "part-time"]], note: "Full-time is 'Vollzeit'." }),
      p("Ich arbeite seit drei Jahren bei einer Firma in München.", "I've been working at a company in Munich for three years.", { accept: ["Ich arbeite seit 3 Jahren bei einer Firma in München."], words: [["seit drei Jahren", "for three years"], ["Firma", "company"]], note: "German uses the present tense with 'seit' where English uses 'have been …ing'." }),
      p("Meine Kollegen sind sehr nett.", "My colleagues are very nice.", { words: [["Kollegen", "colleagues"]] }),
      p("Mein Chef ist oft gestresst.", "My boss is often stressed.", { words: [["Chef", "boss"], ["gestresst", "stressed"]] }),
    ],
    dialogue: [
      tutor("Was sind Sie von Beruf?", "What do you do for a living?"),
      you("Ich bin {job}.", "Say what your job is.", ["Ich arbeite als {job}."]),
      tutor("Interessant! Und wo arbeiten Sie?", "Interesting! And where do you work?"),
      you("Ich arbeite bei einer Firma in {city}.", "Say you work at a company in your city.", ["Ich bin selbstständig.", "Ich arbeite zu Hause."]),
      tutor("Seit wann arbeiten Sie dort?", "How long have you been working there?"),
      you("Seit {number} Jahren.", "Say for how many years.", ["Seit einem Jahr."]),
    ],
  },
  {
    title: "Yesterday at work (war, hatte)",
    intro:
      "For 'sein' and 'haben', Germans prefer the simple past (Präteritum) even when speaking: 'Ich war im Büro', 'Ich hatte viel Arbeit'. It's shorter than 'Ich bin gewesen' or 'Ich habe gehabt'.",
    grammar: {
      title: "Präteritum of sein and haben",
      text: "Note that ich and er/sie/es have the same form.",
      table: [
        ["", "sein", "haben"],
        ["ich", "war", "hatte"],
        ["du", "warst", "hattest"],
        ["er / sie / es", "war", "hatte"],
        ["wir", "waren", "hatten"],
        ["ihr", "wart", "hattet"],
        ["sie / Sie", "waren", "hatten"],
      ],
    },
    phrases: [
      p("Gestern war ein langer Tag.", "Yesterday was a long day.", { words: [["war", "was"], ["lang", "long"]] }),
      p("Ich hatte viele Termine.", "I had a lot of appointments.", { words: [["hatte", "had"], ["Termine", "appointments, meetings"]] }),
      p("Die Besprechung war sehr langweilig.", "The meeting was very boring.", { words: [["Besprechung", "meeting"], ["langweilig", "boring"]] }),
      p("Wir hatten keine Zeit für eine Pause.", "We had no time for a break.", { words: [["Pause", "break"]] }),
      p("Wo warst du heute Morgen?", "Where were you this morning?", { words: [["heute Morgen", "this morning"]] }),
      p("Ich war beim Kunden.", "I was at the client's.", { words: [["Kunden", "client, customer"]] }),
      p("Hattest du einen guten Tag?", "Did you have a good day?"),
    ],
    dialogue: [
      tutor("Hallo! Hattest du einen guten Tag?", "Hi! Did you have a good day?"),
      you("Nein, gestern war ein langer Tag.", "Say no, yesterday was a long day.", ["Ja, danke!", "Es war ein langer Tag."]),
      tutor("Was war los?", "What was going on?"),
      you("Ich hatte viele Termine.", "Say you had a lot of appointments.", ["Ich hatte viel Arbeit."]),
      tutor("Und wo warst du heute Morgen?", "And where were you this morning?"),
      you("Ich war beim Kunden.", "Say you were at the client's.", ["Ich war im Büro.", "Ich war beim Arzt."]),
    ],
  },
  {
    title: "Had to, could, wanted to",
    intro:
      "Modal verbs also use the Präteritum in the past: 'musste' (had to), 'konnte' (could, was able to), 'wollte' (wanted to), 'durfte' (was allowed to). They drop any umlaut and add -te. The main verb stays at the end as usual.",
    grammar: {
      title: "Präteritum of modal verbs",
      text: "Stem without umlaut + -te. ich and er/sie/es are the same again.",
      table: [
        ["", "müssen", "können", "wollen", "dürfen"],
        ["ich / er / sie", "musste", "konnte", "wollte", "durfte"],
        ["du", "musstest", "konntest", "wolltest", "durftest"],
        ["wir / sie / Sie", "mussten", "konnten", "wollten", "durften"],
      ],
    },
    phrases: [
      p("Ich musste gestern Überstunden machen.", "I had to do overtime yesterday.", { words: [["musste", "had to"], ["Überstunden", "overtime"]] }),
      p("Ich konnte nicht kommen, weil ich krank war.", "I couldn't come because I was ill.", { words: [["konnte", "could, was able to"]] }),
      p("Wir mussten den Bericht bis Freitag schreiben.", "We had to write the report by Friday.", { words: [["Bericht", "report"], ["bis", "by, until"]] }),
      p("Er wollte früher nach Hause gehen.", "He wanted to go home earlier.", { words: [["wollte", "wanted to"], ["früher", "earlier"]] }),
      p("Als Kind wollte ich Pilot werden.", "As a child I wanted to be a pilot.", { words: [["als Kind", "as a child"], ["werden", "become"]] }),
      p("Früher durfte man im Büro rauchen.", "In the past you were allowed to smoke in the office.", { words: [["früher", "in the past"], ["durfte", "was allowed to"], ["man", "one, you"]] }),
      p("Konntest du den Chef erreichen?", "Were you able to reach the boss?", { words: [["erreichen", "reach (by phone)"]] }),
    ],
    dialogue: [
      tutor("Warum warst du gestern nicht beim Essen?", "Why weren't you at the dinner yesterday?"),
      you("Ich musste gestern Überstunden machen.", "Say you had to do overtime yesterday.", ["Ich musste arbeiten.", "Ich konnte nicht kommen."]),
      tutor("Schon wieder? Warum?", "Again? Why?"),
      you("Wir mussten den Bericht bis Freitag schreiben.", "Say you had to write the report by Friday.", ["Wir mussten einen Bericht schreiben."]),
      tutor("Konntest du den Chef erreichen?", "Were you able to reach the boss?"),
      you("Nein, er wollte früher nach Hause gehen.", "Say no, he wanted to go home earlier.", ["Nein, ich konnte ihn nicht erreichen.", "Ja, ich konnte ihn erreichen."]),
    ],
  },
  {
    title: "A job ad and an interview",
    intro:
      "Job ads ('Stellenanzeigen') say what a company is looking for: 'Wir suchen …'. In an interview ('Vorstellungsgespräch') you talk about your experience in the Perfekt and ask practical questions about hours and the start date.",
    phrases: [
      p("Wir suchen ab sofort einen Koch in Vollzeit.", "We're looking for a full-time cook, starting immediately.", { words: [["ab sofort", "starting now"], ["Koch", "cook"], ["Vollzeit", "full-time"]] }),
      p("Haben Sie Erfahrung in diesem Bereich?", "Do you have experience in this field?", { words: [["Erfahrung", "experience"], ["Bereich", "field, area"]] }),
      p("Ich habe fünf Jahre als Kellnerin gearbeitet.", "I worked as a waitress for five years.", { accept: ["Ich habe 5 Jahre als Kellnerin gearbeitet."], words: [["Kellnerin", "waitress"]] }),
      p("Ich spreche gut Englisch und ein bisschen Spanisch.", "I speak good English and a little Spanish."),
      p("Wie sind die Arbeitszeiten?", "What are the working hours?", { words: [["Arbeitszeiten", "working hours"]] }),
      p("Ich möchte mich um die Stelle bewerben.", "I'd like to apply for the position.", { words: [["sich bewerben um", "apply for"], ["Stelle", "job, position"]], note: "'mich' belongs to the verb 'sich bewerben'. You'll learn these verbs in Unit 21." }),
      p("Wann kann ich anfangen?", "When can I start?", { words: [["anfangen", "start"]] }),
    ],
    dialogue: [
      tutor("Guten Tag! Sie interessieren sich für die Stelle als Koch?", "Hello! You're interested in the job as a cook?"),
      you("Ja, ich möchte mich um die Stelle bewerben.", "Say yes, you'd like to apply for the position.", ["Ja, genau."]),
      tutor("Haben Sie Erfahrung in diesem Bereich?", "Do you have experience in this field?"),
      you("Ja, ich habe {number} Jahre in einem Restaurant gearbeitet.", "Say yes, and how many years you worked in a restaurant.", ["Ja, ich habe in einem Restaurant gearbeitet."]),
      tutor("Sehr gut. Haben Sie noch Fragen?", "Very good. Do you have any questions?"),
      you("Wie sind die Arbeitszeiten?", "Ask what the working hours are.", ["Wann kann ich anfangen?"]),
    ],
  },
]);
