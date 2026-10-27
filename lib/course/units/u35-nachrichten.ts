import { defineUnit, p, tutor, you } from "../define";

export const unit35 = defineUnit(35, "B2", "Nachrichten", "Report what others said with Konjunktiv I and II, talk about the news and quote sources.", [
  {
    title: "Reported speech: Konjunktiv I",
    intro:
      "News reports pass on what people said without taking responsibility for it. For that, German uses the Konjunktiv I: 'Er sagt, er sei krank.' In practice you mostly need the er/sie/es forms. Take the stem and add -e: er komme, sie habe, man müsse. 'sein' is irregular: er sei.",
    grammar: {
      title: "Konjunktiv I (er / sie / es)",
      text: "Infinitive stem + -e, so the vowel changes of the present disappear: er kann → er könne, er nimmt → er nehme. The word 'dass' is optional; without it the verb stays in position 2.",
      table: [
        ["Infinitive", "er / sie / es", "Example"],
        ["sein", "sei", "Er sagt, er sei krank."],
        ["haben", "habe", "Sie sagt, sie habe keine Zeit."],
        ["können", "könne", "Er sagt, er könne nicht kommen."],
        ["müssen", "müsse", "Sie sagt, man müsse warten."],
        ["wissen", "wisse", "Er sagt, er wisse nichts."],
      ],
    },
    phrases: [
      p("Er sagt, er sei krank.", "He says he's ill.", { words: [["sei", "is (Konjunktiv I of sein)"]] }),
      p("Sie sagt, sie habe heute keine Zeit.", "She says she has no time today.", { words: [["habe", "has (Konjunktiv I)"]] }),
      p("Der Minister sagte, er sei mit dem Ergebnis zufrieden.", "The minister said he was satisfied with the result.", { words: [["Ergebnis", "result"], ["zufrieden", "satisfied"]], note: "The Konjunktiv I doesn't change when the reporting verb is in the past." }),
      p("Die Polizei teilte mit, die Straße sei wieder frei.", "The police announced that the road was clear again.", { words: [["mitteilen", "announce, inform"]] }),
      p("Der Sprecher sagte, man müsse abwarten.", "The spokesperson said one had to wait and see.", { words: [["Sprecher", "spokesperson"], ["abwarten", "wait and see"]] }),
      p("Die Firma erklärt, sie könne die Preise nicht senken.", "The company states that it can't lower its prices.", { words: [["erklären", "state, explain"], ["senken", "lower"]] }),
      p("Er behauptet, er wisse von nichts.", "He claims he knows nothing about it.", { words: [["behaupten", "claim"]] }),
    ],
    dialogue: [
      tutor("Tom hat angerufen und gesagt: „Ich bin krank.“", "Tom called and said: “I'm ill.”"),
      you("Er sagt, er sei krank.", "Report what Tom says, using Konjunktiv I.", ["Tom sagt, er sei krank."]),
      tutor("Und Anna hat geschrieben: „Ich habe heute keine Zeit.“", "And Anna wrote: “I have no time today.”"),
      you("Sie sagt, sie habe heute keine Zeit.", "Report what Anna says.", ["Anna sagt, sie habe keine Zeit."]),
      tutor("Was hat der Sprecher im Radio gesagt?", "What did the spokesperson say on the radio?"),
      you("Der Sprecher sagte, man müsse abwarten.", "Say the spokesperson said one had to wait and see.", ["Er sagte, man müsse abwarten."]),
    ],
  },
  {
    title: "Past, future and the Konjunktiv II substitute",
    intro:
      "For the past in reported speech, use habe or sei + participle: 'Er sagt, er habe es gesehen.' For the future, use werde + infinitive. When the Konjunktiv I looks exactly like the normal present (mostly in the plural: sie haben), switch to the Konjunktiv II: 'Sie sagen, sie hätten nichts gehört.'",
    grammar: {
      title: "From direct to indirect speech",
      text: "If Konjunktiv I and indicative are identical, use Konjunktiv II (e.g. hätten, würden) so the reader can see it's reported.",
      table: [
        ["Direct speech", "Indirect speech"],
        ["„Ich habe es gesehen.“", "Er sagt, er habe es gesehen."],
        ["„Ich bin gefahren.“", "Er sagt, er sei gefahren."],
        ["„Ich werde kommen.“", "Er sagt, er werde kommen."],
        ["„Wir haben Zeit.“", "Sie sagen, sie hätten Zeit."],
      ],
    },
    phrases: [
      p("Sie erklärte, sie habe davon nichts gewusst.", "She explained that she had known nothing about it.", { words: [["davon", "about it"], ["gewusst", "known"]] }),
      p("Der Zeuge sagte, er sei sofort weggelaufen.", "The witness said he had run away immediately.", { words: [["Zeuge", "witness"], ["weggelaufen", "run away"]] }),
      p("Er behauptet, er werde nicht zurücktreten.", "He claims he won't resign.", { words: [["zurücktreten", "resign"]] }),
      p("Die Nachbarn sagen, sie hätten nichts gehört.", "The neighbours say they heard nothing.", { note: "'sie haben' would look like the indicative, so the Konjunktiv II 'hätten' is used." }),
      p("Die Experten meinen, die Preise würden weiter steigen.", "The experts think prices will keep rising.", { words: [["weiter steigen", "keep rising"]], note: "'sie werden' looks like the indicative, so it becomes 'würden'." }),
      p("Der Bürgermeister versprach, die Schule werde renoviert.", "The mayor promised that the school would be renovated.", { words: [["Bürgermeister", "mayor"], ["versprechen", "promise"]] }),
      p("Die Firma gibt an, sie habe keine Fehler gemacht.", "The company states that it made no mistakes.", { words: [["angeben", "state, claim"]] }),
    ],
    dialogue: [
      tutor("Hast du gehört? Bei Müllers wurde eingebrochen!", "Did you hear? The Müllers' house was broken into!"),
      you("Ja, und die Nachbarn sagen, sie hätten nichts gehört.", "Say yes, and the neighbours say they heard nothing.", ["Die Nachbarn sagen, sie hätten nichts gehört."]),
      tutor("Hat jemand den Täter gesehen?", "Did anyone see the burglar?"),
      you("Ein Zeuge sagt, er habe einen Mann gesehen.", "Say a witness says he saw a man.", ["Ein Zeuge sagt, er habe jemanden gesehen."]),
      tutor("Und was sagt die Polizei?", "And what do the police say?"),
      you("Die Polizei sagt, sie werde den Fall prüfen.", "Say the police say they will look into the case.", ["Die Polizei sagt, sie ermittle noch."]),
    ],
  },
  {
    title: "Following the news",
    intro:
      "To pass on news you name the source: 'laut', 'nach Angaben', 'wie … berichtet'. The modal verb 'sollen' also marks a rumour or a claim you can't confirm: 'Der Politiker soll Geld angenommen haben' (he is said to have accepted money).",
    grammar: {
      title: "Naming the source",
      text: "'laut' takes the dative (or genitive in formal writing); 'zufolge' comes after the noun.",
      table: [
        ["Expression", "Meaning"],
        ["laut einer Studie", "according to a study"],
        ["nach Angaben der Polizei", "according to the police"],
        ["wie die Zeitung berichtet", "as the newspaper reports"],
        ["Berichten zufolge", "according to reports"],
        ["Er soll … haben.", "He is said to have …"],
      ],
    },
    phrases: [
      p("Hast du heute schon die Nachrichten gesehen?", "Have you seen the news today?", { words: [["Nachrichten", "news"]] }),
      p("Laut einer neuen Studie schlafen Jugendliche zu wenig.", "According to a new study, teenagers sleep too little.", { words: [["laut", "according to"], ["Jugendliche", "teenagers"]] }),
      p("Nach Angaben der Polizei wurde niemand verletzt.", "According to the police, nobody was injured.", { words: [["nach Angaben", "according to"], ["verletzt", "injured"]] }),
      p("Wie die Zeitung berichtet, soll das Stadion abgerissen werden.", "As the newspaper reports, the stadium is to be demolished.", { words: [["berichten", "report"], ["abgerissen", "demolished"]] }),
      p("Der Politiker soll Geld angenommen haben.", "The politician is said to have accepted money.", { words: [["angenommen", "accepted"]], note: "'sollen' + past infinitive passes on a claim without confirming it." }),
      p("Die Meldung hat sich als falsch herausgestellt.", "The report turned out to be false.", { words: [["Meldung", "news item, report"], ["sich herausstellen als", "turn out to be"]] }),
      p("Ich informiere mich meistens online.", "I usually get my news online.", { words: [["sich informieren", "get information"]] }),
    ],
    dialogue: [
      tutor("Hast du heute schon die Nachrichten gesehen?", "Have you seen the news today?"),
      you("Ja, laut einer neuen Studie schlafen Jugendliche zu wenig.", "Say yes: according to a new study teenagers sleep too little.", ["Nein, noch nicht.", "Ja, kurz."]),
      tutor("Wo informierst du dich normalerweise?", "Where do you usually get your news?"),
      you("Ich informiere mich meistens online.", "Say you usually get your news online.", ["Meistens im Radio.", "Ich lese die Zeitung."]),
      tutor("Hast du das von dem Politiker gehört?", "Did you hear about that politician?"),
      you("Ja, er soll Geld angenommen haben.", "Say yes, he's said to have accepted money.", ["Ja, angeblich hat er Geld angenommen."]),
    ],
  },
  {
    title: "Reported questions and requests",
    intro:
      "Reported questions use 'ob' (yes/no questions) or the question word, with the verb at the end in Konjunktiv I or II. Reported commands and requests use 'sollen': 'Ruf mich an!' becomes 'Sie sagt, ich solle sie anrufen.' In everyday speech many people use the normal indicative here.",
    grammar: {
      title: "Questions and commands in reported speech",
      text: "Questions: ob / question word + verb at the end. Commands: sollen (Konjunktiv I: solle).",
      table: [
        ["Direct", "Indirect"],
        ["„Kommt er?“", "Sie fragt, ob er komme."],
        ["„Wo wohnt sie?“", "Er fragt, wo sie wohne."],
        ["„Ruf mich an!“", "Sie sagt, ich solle sie anrufen."],
        ["„Seien Sie leise!“", "Er sagt, wir sollten leise sein."],
      ],
    },
    phrases: [
      p("Der Journalist fragte, ob die Regierung davon gewusst habe.", "The journalist asked whether the government had known about it.", { words: [["Regierung", "government"]] }),
      p("Sie wollte wissen, wann die Wahl stattfinde.", "She wanted to know when the election would take place.", { words: [["Wahl", "election"], ["stattfinden", "take place"]] }),
      p("Mein Chef sagt, ich solle ihn zurückrufen.", "My boss says I should call him back.", { words: [["solle", "should (Konjunktiv I of sollen)"], ["zurückrufen", "call back"]] }),
      p("Die Ärztin meinte, er solle mehr schlafen.", "The doctor said he should sleep more.", { words: [["meinen", "say, think"]] }),
      p("Er fragte mich, ob ich Zeit hätte.", "He asked me if I had time.", { note: "'ich habe' would look like the indicative, so 'hätte' is used." }),
      p("Die Zuschauer wurden gebeten, ruhig zu bleiben.", "The audience was asked to stay calm.", { words: [["Zuschauer", "audience, spectators"], ["gebeten", "asked"]] }),
      p("Sie betonte, man werde nicht aufgeben.", "She stressed that they would not give up.", { words: [["betonen", "stress, emphasise"], ["aufgeben", "give up"]] }),
    ],
    dialogue: [
      tutor("Hat jemand für mich angerufen?", "Did anyone call for me?"),
      you("Ja, deine Mutter. Sie fragt, ob du am Sonntag Zeit hättest.", "Say yes, your mother: she's asking whether you have time on Sunday.", ["Ja, deine Mutter hat angerufen."]),
      tutor("Hat sie sonst noch etwas gesagt?", "Did she say anything else?"),
      you("Sie sagt, du sollst sie zurückrufen.", "Say she says you should call her back.", ["Du sollst sie zurückrufen.", "Sie sagt, du sollest sie zurückrufen."]),
      tutor("Und was hat die Ärztin zu Opa gesagt?", "And what did the doctor tell Grandpa?"),
      you("Sie meinte, er solle mehr schlafen.", "Say she said he should sleep more.", ["Er solle mehr schlafen."]),
    ],
  },
]);
