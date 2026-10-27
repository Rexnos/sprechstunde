import { defineUnit, p, tutor, you } from "../define";

export const unit36 = defineUnit(36, "B2", "Bildung und Lernen", "Talk about education systems, lifelong learning and regrets using the Konjunktiv II of the past.", [
  {
    title: "If I had known … (Konjunktiv II past)",
    intro:
      "To imagine how the past could have been different, use hätte or wäre + past participle. Choose hätte or wäre just as in the Perfekt: 'Wenn ich das gewusst hätte, wäre ich zu Hause geblieben.' Both clauses usually use this form.",
    grammar: {
      title: "hätte / wäre + participle",
      text: "The same verbs that take sein in the Perfekt take wäre here.",
      table: [
        ["", "with haben", "with sein"],
        ["ich", "hätte … gelernt", "wäre … gegangen"],
        ["du", "hättest … gelernt", "wärst … gegangen"],
        ["er / sie / es", "hätte … gelernt", "wäre … gegangen"],
        ["wir / sie / Sie", "hätten … gelernt", "wären … gegangen"],
      ],
    },
    phrases: [
      p("Wenn ich das gewusst hätte, wäre ich zu Hause geblieben.", "If I had known that, I would have stayed at home.", { words: [["gewusst", "known"], ["geblieben", "stayed"]] }),
      p("Wenn ich mehr gelernt hätte, hätte ich die Prüfung bestanden.", "If I had studied more, I would have passed the exam.", { words: [["Prüfung", "exam"], ["bestanden", "passed"]] }),
      p("Ich wäre fast durchgefallen.", "I almost failed.", { words: [["fast", "almost"], ["durchfallen", "fail (an exam)"]] }),
      p("Ohne deine Hilfe hätte ich das nie geschafft.", "Without your help I would never have managed it.", { words: [["geschafft", "managed"]] }),
      p("Hättest du mich doch angerufen!", "If only you had called me!", { note: "Verb first + 'doch' turns it into a wish about the past." }),
      p("Wenn der Bus pünktlich gewesen wäre, wäre ich nicht zu spät gekommen.", "If the bus had been on time, I wouldn't have been late.", { words: [["pünktlich", "on time"]] }),
      p("Das hätte ich nicht gedacht.", "I wouldn't have thought that."),
    ],
    dialogue: [
      tutor("Wie war die Prüfung?", "How was the exam?"),
      you("Nicht gut. Ich wäre fast durchgefallen.", "Say not good, you almost failed.", ["Ich wäre fast durchgefallen."]),
      tutor("Oh nein! Was ist passiert?", "Oh no! What happened?"),
      you("Wenn ich mehr gelernt hätte, hätte ich die Prüfung bestanden.", "Say that if you had studied more you would have passed.", ["Ich habe zu wenig gelernt."]),
      tutor("Ich hätte dir gern geholfen.", "I would have liked to help you."),
      you("Danke, beim nächsten Mal frage ich dich.", "Thank them and say you'll ask them next time.", ["Danke!", "Das ist nett, danke."]),
    ],
  },
  {
    title: "I should have … (regrets)",
    intro:
      "Regrets need a modal verb in the Konjunktiv II past: 'Ich hätte früher anfangen sollen' (I should have started earlier). The sentence ends with two infinitives, the main verb and the modal. It's always 'hätte', even with verbs like gehen.",
    grammar: {
      title: "hätte + infinitive + modal infinitive",
      text: "In a subordinate clause, hätte comes before the two infinitives: '…, dass ich mehr hätte lernen sollen.'",
      table: [
        ["Meaning", "German"],
        ["I should have …", "Ich hätte … lernen sollen."],
        ["I could have …", "Ich hätte … studieren können."],
        ["I would have had to …", "Ich hätte … arbeiten müssen."],
        ["in a dass clause", "…, dass ich mehr hätte lernen sollen."],
      ],
    },
    phrases: [
      p("Ich hätte früher anfangen sollen.", "I should have started earlier.", { words: [["früher", "earlier"]] }),
      p("Wir hätten mehr üben müssen.", "We would have had to practise more.", { words: [["üben", "practise"]] }),
      p("Du hättest Medizin studieren können.", "You could have studied medicine."),
      p("Ich bereue, dass ich das Studium abgebrochen habe.", "I regret dropping out of university.", { words: [["bereuen", "regret"], ["abbrechen", "drop out, break off"]] }),
      p("Im Nachhinein ist man immer klüger.", "With hindsight you're always wiser.", { words: [["im Nachhinein", "with hindsight"], ["klüger", "wiser"]] }),
      p("Ich hätte nicht so viel Zeit verschwenden sollen.", "I shouldn't have wasted so much time.", { words: [["verschwenden", "waste"]] }),
      p("Das hättest du mir sagen sollen!", "You should have told me that!"),
    ],
    dialogue: [
      tutor("Bereust du etwas aus deiner Schulzeit?", "Do you regret anything from your school days?"),
      you("Ja, ich hätte mehr Sprachen lernen sollen.", "Say yes, you should have learned more languages.", ["Ich hätte früher anfangen sollen.", "Nein, eigentlich nicht."]),
      tutor("Du hättest doch später noch Kurse machen können.", "You could have taken courses later, though."),
      you("Stimmt, aber ich hatte keine Zeit.", "Say that's true, but you had no time.", ["Stimmt."]),
      tutor("Na ja, im Nachhinein ist man immer klüger.", "Oh well, with hindsight you're always wiser."),
      you("Da hast du recht.", "Say they're right.", ["Das stimmt.", "Genau."]),
    ],
  },
  {
    title: "Schools and universities",
    intro:
      "In Germany children go to the Grundschule first and then, usually after four years, to different types of secondary school. The Abitur qualifies you for university; many young people instead do an Ausbildung, combining work in a company with lessons at a Berufsschule.",
    grammar: {
      title: "The German education system at a glance",
      text: "It varies between the federal states, but this is the basic pattern.",
      table: [
        ["Stage", "School or path", "Age"],
        ["primary", "Grundschule", "6–10"],
        ["secondary", "Gymnasium, Realschule, Gesamtschule", "10–18"],
        ["school leaving exam", "Abitur", "about 18"],
        ["after school", "Ausbildung or Studium", "from 16"],
      ],
    },
    phrases: [
      p("In Deutschland dauert die Grundschule meistens vier Jahre.", "In Germany primary school usually lasts four years.", { accept: ["In Deutschland dauert die Grundschule meistens 4 Jahre."], words: [["Grundschule", "primary school"]] }),
      p("Mit dem Abitur darf man an einer Universität studieren.", "With the Abitur you're allowed to study at a university.", { words: [["Abitur", "school leaving exam (like A levels)"]] }),
      p("Viele junge Leute machen eine Ausbildung.", "Many young people do vocational training.", { words: [["Ausbildung", "vocational training, apprenticeship"]] }),
      p("Bei der dualen Ausbildung lernt man im Betrieb und in der Berufsschule.", "In dual training you learn at the company and at vocational school.", { words: [["Betrieb", "company, workplace"], ["Berufsschule", "vocational school"]] }),
      p("An staatlichen Universitäten gibt es kaum Studiengebühren.", "There are hardly any tuition fees at state universities.", { words: [["staatlich", "state, public"], ["Studiengebühren", "tuition fees"]] }),
      p("Welchen Abschluss haben Sie?", "What qualification do you have?", { words: [["Abschluss", "qualification, degree"]] }),
      p("Ich habe einen Master in Informatik.", "I have a master's in computer science.", { words: [["Informatik", "computer science"]] }),
    ],
    dialogue: [
      tutor("Welchen Abschluss haben Sie?", "What qualification do you have?"),
      you("Ich habe einen {degree} in {subject}.", "Say what degree you have and in which subject.", ["Ich habe eine Ausbildung gemacht.", "Ich habe Abitur."]),
      tutor("Wie ist das Schulsystem in Ihrem Land?", "What's the school system like in your country?"),
      you("Bei uns dauert die Grundschule {number} Jahre.", "Say how many years primary school lasts where you come from.", ["Es ist ganz anders als in Deutschland."]),
      tutor("Und muss man für das Studium bezahlen?", "And do you have to pay to go to university?"),
      you("Ja, die Studiengebühren sind ziemlich hoch.", "Say yes, tuition fees are quite high.", ["Nein, es gibt kaum Studiengebühren."]),
    ],
  },
  {
    title: "Lifelong learning",
    intro:
      "Weiterbildung (further training) and the Volkshochschule (adult education centre) are part of working life in Germany. In formal and written German, conditions in the past often drop 'wenn' and start with the verb: 'Hätte ich das früher gewusst, …'",
    grammar: {
      title: "Conditions without wenn",
      text: "Put hätte or wäre in position 1 instead of using wenn. The main clause follows after the comma.",
      table: [
        ["With wenn", "Without wenn (verb first)"],
        ["Wenn ich Zeit gehabt hätte, …", "Hätte ich Zeit gehabt, …"],
        ["Wenn es billiger gewesen wäre, …", "Wäre es billiger gewesen, …"],
        ["Wenn ich mehr Zeit hätte, …", "Hätte ich mehr Zeit, …"],
      ],
    },
    phrases: [
      p("Man lernt nie aus.", "You never stop learning.", { note: "A common saying." }),
      p("Mit fünfzig habe ich noch ein Fernstudium angefangen.", "At fifty I started a distance-learning degree.", { accept: ["Mit 50 habe ich noch ein Fernstudium angefangen."], words: [["Fernstudium", "distance learning"]] }),
      p("Hätte ich das früher gewusst, hätte ich mich schon längst angemeldet.", "Had I known that earlier, I'd have signed up long ago.", { words: [["schon längst", "long ago"], ["sich anmelden", "sign up"]] }),
      p("Die Firma bezahlt mir eine Weiterbildung.", "The company is paying for further training for me.", { words: [["Weiterbildung", "further training"]] }),
      p("Ich habe mir das Programmieren selbst beigebracht.", "I taught myself programming.", { words: [["sich etwas beibringen", "teach yourself something"]] }),
      p("Es ist nie zu spät, etwas Neues zu lernen.", "It's never too late to learn something new."),
      p("Wäre der Kurs nicht online gewesen, hätte ich nicht teilnehmen können.", "If the course hadn't been online, I couldn't have taken part.", { words: [["teilnehmen", "take part"]] }),
    ],
    dialogue: [
      tutor("Lernst du gerade etwas Neues?", "Are you learning anything new at the moment?"),
      you("Ja, ich mache gerade eine Weiterbildung.", "Say yes, you're doing further training at the moment.", ["Ja, ich lerne {subject}.", "Ja, Deutsch natürlich!"]),
      tutor("Toll! Und wie hast du davon erfahren?", "Great! And how did you hear about it?"),
      you("Durch eine Kollegin. Hätte ich das früher gewusst, hätte ich mich schon längst angemeldet.", "Say through a colleague, and that had you known earlier you'd have signed up long ago.", ["Durch eine Kollegin.", "Im Internet."]),
      tutor("Ist das nicht anstrengend neben der Arbeit?", "Isn't that tiring alongside work?"),
      you("Doch, aber es ist nie zu spät, etwas Neues zu lernen.", "Say yes, but it's never too late to learn something new.", ["Ein bisschen, aber es lohnt sich."]),
    ],
  },
]);
