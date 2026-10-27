import { defineUnit, p, tutor, you } from "../define";

export const unit33 = defineUnit(33, "B2", "Arbeit der Zukunft", "Make assumptions and predictions about the future of work with Futur I and II and modal adverbs.", [
  {
    title: "Predictions and assumptions",
    intro:
      "You already know the Futur I (werden + infinitive) for plans. At B2 it is mostly used for predictions and guesses. With 'wohl' it even makes a guess about the present: 'Er wird wohl im Meeting sein' means 'He's probably in the meeting'. Modal adverbs show how sure you are.",
    grammar: {
      title: "How sure are you? Modal adverbs",
      text: "Put the adverb after the conjugated verb, or in position 1 with the verb right after it: 'Vermutlich wird es regnen.'",
      table: [
        ["Certainty", "Adverbs", "Example"],
        ["very sure", "sicher, bestimmt", "Das wird bestimmt teuer."],
        ["quite sure", "wahrscheinlich, vermutlich, wohl", "Er wird wohl krank sein."],
        ["not sure", "vielleicht, möglicherweise", "Vielleicht wird es klappen."],
        ["very unlikely", "kaum, wohl kaum", "Das wird kaum passieren."],
      ],
    },
    phrases: [
      p("In zehn Jahren wird vieles anders sein.", "In ten years a lot will be different.", { accept: ["In 10 Jahren wird vieles anders sein."], words: [["vieles", "a lot, many things"]] }),
      p("Vermutlich werden viele Menschen von zu Hause arbeiten.", "Presumably many people will work from home.", { words: [["vermutlich", "presumably"]] }),
      p("Er wird wohl noch im Meeting sein.", "He's probably still in the meeting.", { words: [["wohl", "probably"]], note: "Futur I + 'wohl' is a guess about now, not about the future." }),
      p("Wahrscheinlich wird sich die Arbeitswelt stark verändern.", "The working world will probably change a lot.", { words: [["Arbeitswelt", "world of work"], ["sich verändern", "change"]] }),
      p("Das wird bestimmt nicht so einfach.", "That surely won't be so easy.", { words: [["bestimmt", "surely, definitely"]] }),
      p("Möglicherweise wird es ganz neue Berufe geben.", "There may be completely new professions.", { words: [["möglicherweise", "possibly"], ["Berufe", "professions"]] }),
      p("Büros werden kaum ganz verschwinden.", "Offices will hardly disappear completely.", { words: [["kaum", "hardly"], ["verschwinden", "disappear"]] }),
    ],
    dialogue: [
      tutor("Wo ist eigentlich Frau Berger?", "Where is Ms Berger, by the way?"),
      you("Sie wird wohl noch im Meeting sein.", "Guess that she's probably still in the meeting.", ["Sie ist wahrscheinlich im Meeting.", "Sie wird wohl im Homeoffice sein."]),
      tutor("Glaubst du, dass wir in zehn Jahren noch ins Büro gehen?", "Do you think we'll still go to the office in ten years?"),
      you("Vermutlich werden viele Menschen von zu Hause arbeiten.", "Say that presumably many people will work from home.", ["Wahrscheinlich nicht so oft.", "Ich glaube, vieles wird anders sein."]),
      tutor("Und die Büros? Werden sie verschwinden?", "And offices? Will they disappear?"),
      you("Büros werden kaum ganz verschwinden.", "Say that offices will hardly disappear completely.", ["Das glaube ich nicht.", "Wahrscheinlich nicht."]),
    ],
  },
  {
    title: "What will have happened (Futur II)",
    intro:
      "The Futur II says that something will be finished by a point in the future: 'Bis Freitag werde ich den Bericht geschrieben haben.' Much more often, though, Germans use it with 'wohl' to guess what has happened: 'Er wird den Termin wohl vergessen haben' (he has probably forgotten).",
    grammar: {
      title: "Futur II: werden + participle + haben/sein",
      text: "werden goes in position 2; the participle and haben or sein go to the very end. Verbs that take sein in the Perfekt take sein here too.",
      table: [
        ["Use", "Form", "Example"],
        ["finished by a future time", "werden … Partizip + haben", "Bis Montag werde ich es geschrieben haben."],
        ["guess about the past", "werden … wohl … Partizip + haben", "Sie wird den Zug wohl verpasst haben."],
        ["with sein verbs", "werden … Partizip + sein", "Er wird schon gegangen sein."],
      ],
    },
    phrases: [
      p("Bis Freitag werde ich das Projekt abgeschlossen haben.", "By Friday I will have finished the project.", { words: [["abgeschlossen", "completed, finished"]] }),
      p("Er wird den Termin wohl vergessen haben.", "He has probably forgotten the appointment.", { words: [["vergessen", "forgotten"]] }),
      p("Sie wird schon nach Hause gegangen sein.", "She'll have gone home already.", { note: "gehen takes sein in the Perfekt, so the Futur II ends in 'gegangen sein'." }),
      p("In zwanzig Jahren werden Maschinen viele Aufgaben übernommen haben.", "In twenty years machines will have taken over many tasks.", { accept: ["In 20 Jahren werden Maschinen viele Aufgaben übernommen haben."], words: [["Aufgaben", "tasks"], ["übernommen", "taken over"]] }),
      p("Die E-Mail wird wohl im Spam gelandet sein.", "The email has probably ended up in spam.", { words: [["gelandet", "landed, ended up"]] }),
      p("Bis dahin werden wir uns daran gewöhnt haben.", "By then we'll have got used to it.", { words: [["bis dahin", "by then"], ["sich gewöhnen an", "get used to"]] }),
      p("Das wird ein Missverständnis gewesen sein.", "That will have been a misunderstanding.", { words: [["Missverständnis", "misunderstanding"]] }),
    ],
    dialogue: [
      tutor("Markus hat noch nicht geantwortet. Komisch, oder?", "Markus hasn't replied yet. Strange, isn't it?"),
      you("Die E-Mail wird wohl im Spam gelandet sein.", "Guess that the email has probably ended up in spam.", ["Er wird die E-Mail wohl nicht gelesen haben.", "Er wird den Termin wohl vergessen haben."]),
      tutor("Und wann bist du mit dem Projekt fertig?", "And when will you be done with the project?"),
      you("Bis Freitag werde ich das Projekt abgeschlossen haben.", "Say that by Friday you will have finished the project.", ["Bis {day} werde ich fertig sein.", "Bis Freitag werde ich fertig sein."]),
      tutor("Super. Und wo ist Lena?", "Great. And where's Lena?"),
      you("Sie wird schon nach Hause gegangen sein.", "Guess that she'll have gone home already.", ["Sie wird wohl schon gegangen sein."]),
    ],
  },
  {
    title: "Working from home",
    intro:
      "Homeoffice is the everyday German word for working from home. To weigh it up you need phrases for advantages and disadvantages and for consequences. Notice that most of them introduce a 'dass' clause, so the verb goes to the end.",
    grammar: {
      title: "Talking about pros, cons and consequences",
      text: "All of these are followed by a dass clause with the verb at the end.",
      table: [
        ["Expression", "Meaning"],
        ["Ein Vorteil ist, dass …", "One advantage is that …"],
        ["Der größte Nachteil besteht darin, dass …", "The biggest disadvantage is that …"],
        ["Das führt dazu, dass …", "That leads to … / means that …"],
        ["Das hat zur Folge, dass …", "The result is that …"],
      ],
    },
    phrases: [
      p("Ich arbeite zwei Tage pro Woche im Homeoffice.", "I work from home two days a week.", { accept: ["Ich arbeite 2 Tage pro Woche im Homeoffice."], words: [["pro Woche", "a week"], ["Homeoffice", "working from home"]] }),
      p("Ein großer Vorteil ist, dass ich nicht pendeln muss.", "A big advantage is that I don't have to commute.", { words: [["Vorteil", "advantage"], ["pendeln", "commute"]] }),
      p("Der größte Nachteil besteht darin, dass man sich isoliert fühlt.", "The biggest disadvantage is that you feel isolated.", { words: [["Nachteil", "disadvantage"], ["bestehen in", "consist in"], ["isoliert", "isolated"]] }),
      p("Die ständigen Videokonferenzen sind anstrengend.", "The constant video calls are exhausting.", { words: [["ständig", "constant"], ["Videokonferenzen", "video calls"], ["anstrengend", "exhausting"]] }),
      p("Das führt dazu, dass Arbeit und Freizeit verschwimmen.", "That means work and free time blur together.", { words: [["führen zu", "lead to"], ["verschwimmen", "blur"]] }),
      p("Ich kann mir meine Zeit flexibler einteilen.", "I can organise my time more flexibly.", { words: [["sich einteilen", "organise, divide up"], ["flexibler", "more flexibly"]] }),
      p("Mir fehlt der Kontakt zu den Kollegen.", "I miss contact with my colleagues.", { note: "'fehlen' works backwards: the thing missed is the subject, the person is dative." }),
    ],
    dialogue: [
      tutor("Arbeiten Sie eigentlich im Homeoffice?", "Do you actually work from home?"),
      you("Ja, ich arbeite {number} Tage pro Woche im Homeoffice.", "Say how many days a week you work from home.", ["Nein, ich arbeite immer im Büro.", "Ja, ab und zu."]),
      tutor("Und, wie finden Sie das?", "And how do you like it?"),
      you("Ein großer Vorteil ist, dass ich nicht pendeln muss.", "Say a big advantage is that you don't have to commute.", ["Ich kann mir meine Zeit flexibler einteilen."]),
      tutor("Gibt es auch Nachteile?", "Are there any disadvantages?"),
      you("Mir fehlt der Kontakt zu den Kollegen.", "Say you miss contact with your colleagues.", ["Die ständigen Videokonferenzen sind anstrengend.", "Manchmal fühle ich mich isoliert."]),
    ],
  },
  {
    title: "AI and jobs",
    intro:
      "Künstliche Intelligenz (KI) is a hot topic in every German office. To discuss it you'll use 'werden' a lot, so keep its three jobs apart: 'become' on its own, the future with an infinitive, and the passive with a participle.",
    grammar: {
      title: "Three jobs of werden",
      text: "Look at what comes at the end of the clause: nothing, an infinitive or a participle.",
      table: [
        ["Use", "Structure", "Example"],
        ["become", "werden + noun/adjective", "Die KI wird immer besser."],
        ["future", "werden + infinitive", "Die KI wird viele Jobs verändern."],
        ["passive", "werden + participle", "Viele Aufgaben werden automatisiert."],
      ],
    },
    phrases: [
      p("Künstliche Intelligenz wird viele Berufe verändern.", "Artificial intelligence will change many professions.", { words: [["künstliche Intelligenz", "artificial intelligence (KI)"]] }),
      p("Routineaufgaben werden zunehmend automatisiert.", "Routine tasks are increasingly being automated.", { words: [["zunehmend", "increasingly"], ["automatisiert", "automated"]] }),
      p("Ich glaube kaum, dass Maschinen Pflegekräfte ersetzen werden.", "I hardly think machines will replace care workers.", { words: [["Pflegekräfte", "care workers"], ["ersetzen", "replace"]] }),
      p("Wer sich nicht weiterbildet, wird es schwer haben.", "Anyone who doesn't keep learning will have a hard time.", { words: [["sich weiterbilden", "do further training"], ["es schwer haben", "have a hard time"]] }),
      p("Die Technik wird immer besser.", "The technology keeps getting better.", { words: [["immer besser", "better and better"]] }),
      p("Kreative Fähigkeiten werden an Bedeutung gewinnen.", "Creative skills will become more important.", { words: [["Fähigkeiten", "skills"], ["an Bedeutung gewinnen", "gain importance"]] }),
      p("Niemand weiß genau, wie es weitergeht.", "Nobody knows exactly what will happen next.", { words: [["weitergehen", "go on, continue"]] }),
    ],
    dialogue: [
      tutor("Hast du Angst, dass die KI deinen Job übernimmt?", "Are you afraid AI will take over your job?"),
      you("Nein, aber sie wird meinen Beruf sicher verändern.", "Say no, but it will certainly change your profession.", ["Ein bisschen schon.", "Nein, eigentlich nicht."]),
      tutor("Welche Aufgaben werden denn wegfallen?", "So which tasks will disappear?"),
      you("Routineaufgaben werden zunehmend automatisiert.", "Say routine tasks are increasingly being automated.", ["Vermutlich die Routineaufgaben."]),
      tutor("Und was sollte man jetzt tun?", "And what should people do now?"),
      you("Wer sich nicht weiterbildet, wird es schwer haben.", "Say anyone who doesn't keep learning will have a hard time.", ["Man sollte sich weiterbilden."]),
    ],
  },
]);
