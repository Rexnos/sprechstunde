import { defineUnit, p, tutor, you } from "../define";

export const unit44 = defineUnit(44, "C1", "Medien und Wahrheit", "Report claims with distance using the subjective modal verbs, judge how likely something is, check sources and talk critically about the media.", [
  {
    title: "He is said to … he claims to …",
    intro:
      "Modal verbs have a second, 'subjective' use in which they comment on whether a statement is true. 'sollen' passes on what others say: 'Der Minister soll davon gewusst haben' (he is said to have known). 'wollen' reports what someone claims about themselves, with a hint of doubt: 'Er will nichts gewusst haben' (he claims not to have known). For the past, use the modal plus the Perfekt infinitive (gewusst haben, gesehen haben).",
    grammar: {
      title: "Subjective sollen and wollen",
      text: "Present: modal + infinitive. Past: modal + Partizip II + haben / sein.",
      table: [
        ["form", "meaning", "example"],
        ["sollen + infinitive", "it is said that", "Er soll sehr reich sein."],
        ["sollen + Perfekt infinitive", "it is said that he did", "Er soll das Geld genommen haben."],
        ["wollen + infinitive", "claims to …", "Sie will die Chefin persönlich kennen."],
        ["wollen + Perfekt infinitive", "claims to have …", "Er will nichts gewusst haben."],
      ],
    },
    phrases: [
      p("Der Minister soll von dem Skandal gewusst haben.", "The minister is said to have known about the scandal.", { words: [["soll … gewusst haben", "is said to have known"], ["Skandal", "scandal"]] }),
      p("Er will nichts gewusst haben.", "He claims not to have known anything.", { words: [["will … gewusst haben", "claims to have known"]] }),
      p("Die Sängerin soll heimlich geheiratet haben.", "The singer is said to have married in secret.", { words: [["heimlich", "secretly"]] }),
      p("Der Zeuge will den Täter genau gesehen haben.", "The witness claims to have seen the culprit clearly.", { words: [["Zeuge", "witness"], ["Täter", "perpetrator, culprit"]] }),
      p("Das Restaurant soll hervorragend sein.", "The restaurant is supposed to be excellent.", { words: [["hervorragend", "excellent"]] }),
      p("Sie will das Buch in einer Woche geschrieben haben.", "She claims to have written the book in a week."),
      p("Angeblich wurde nichts gestohlen.", "Supposedly nothing was stolen.", { words: [["angeblich", "supposedly, allegedly"], ["stehlen", "steal"]] }),
    ],
    dialogue: [
      tutor("Hast du die Nachrichten gelesen? Was ist mit dem Minister?", "Have you read the news? What's up with the minister?"),
      you("Er soll von dem Skandal gewusst haben.", "Say he's said to have known about the scandal.", ["Der Minister soll von dem Skandal gewusst haben.", "Angeblich wusste er von dem Skandal."]),
      tutor("Und was sagt er selbst dazu?", "And what does he say about it himself?"),
      you("Er will nichts gewusst haben.", "Say he claims not to have known anything.", ["Er behauptet, nichts gewusst zu haben."]),
      tutor("Glaubst du ihm?", "Do you believe him?"),
      you("Ehrlich gesagt, nicht so ganz.", "Say honestly, not entirely.", ["Nein, eher nicht.", "Ich bin skeptisch."]),
    ],
  },
  {
    title: "How likely is it?",
    intro:
      "The modal verbs also grade how sure you are. 'muss' means you're almost certain, 'müsste' means it should be so if all is normal, 'dürfte' (Konjunktiv II of dürfen) means probably, and 'kann' or 'könnte' mean it's possible. 'kann nicht' means it's impossible. With a Perfekt infinitive you can speculate about the past: 'Er muss sich verrechnet haben.'",
    grammar: {
      title: "From certain to impossible",
      text: "Sorted by how sure the speaker is.",
      table: [
        ["modal", "certainty", "example"],
        ["muss", "almost certain", "Das muss ein Fehler sein."],
        ["müsste", "very probable (if all is normal)", "Er müsste schon da sein."],
        ["dürfte", "probable", "Das dürfte stimmen."],
        ["kann / könnte", "possible", "Das könnte eine Fälschung sein."],
        ["kann nicht", "impossible", "Das kann nicht stimmen."],
      ],
    },
    phrases: [
      p("Das Foto dürfte eine Fälschung sein.", "The photo is probably a fake.", { words: [["dürfte", "is probably"], ["Fälschung", "fake, forgery"]] }),
      p("Die Zahl müsste eigentlich stimmen.", "The figure ought to be correct, really.", { words: [["müsste", "ought to, should"]] }),
      p("Das kann unmöglich stimmen.", "That can't possibly be true.", { words: [["unmöglich", "impossibly, can't possibly"]] }),
      p("Der Artikel könnte von einer Maschine geschrieben worden sein.", "The article could have been written by a machine.", { note: "Passive Perfekt infinitive: geschrieben worden sein." }),
      p("Der Autor muss sich verrechnet haben.", "The author must have miscalculated.", { words: [["sich verrechnen", "miscalculate"]] }),
      p("Bis Mittag dürften alle Ergebnisse vorliegen.", "All the results should be in by noon.", { words: [["vorliegen", "be available"]] }),
      p("Die Quelle dürfte kaum seriös sein.", "The source is hardly likely to be reputable.", { words: [["kaum", "hardly"], ["seriös", "reputable, trustworthy"]] }),
    ],
    dialogue: [
      tutor("Schau mal, dieses Foto: ein Hai auf der Autobahn!", "Look at this photo: a shark on the motorway!"),
      you("Das dürfte eine Fälschung sein.", "Say it's probably a fake.", ["Das ist bestimmt eine Fälschung.", "Das kann unmöglich stimmen."]),
      tutor("Aber es wurde zehntausendmal geteilt.", "But it's been shared ten thousand times."),
      you("Das heißt gar nichts. Die Quelle dürfte kaum seriös sein.", "Say that means nothing, and the source is hardly likely to be reputable.", ["Das heißt nichts.", "Viele Leute teilen Dinge, ohne sie zu prüfen."]),
      tutor("Und die Zahl im Text? Hunderte Haie?", "And the number in the text? Hundreds of sharks?"),
      you("Der Autor muss sich verrechnet haben.", "Say the author must have miscalculated.", ["Die Zahl kann nicht stimmen."]),
    ],
  },
  {
    title: "Checking claims",
    intro:
      "Before you share something, check it: Who is behind the source? Is there a date? Do reputable media report it too? Useful verbs are 'überprüfen' (verify), 'belegen' (back up with evidence) and 'widerlegen' (refute). A 'Falschmeldung' is a false report, and a 'Faktencheck' is what newsrooms do to expose it.",
    phrases: [
      p("Wer steckt eigentlich hinter dieser Seite?", "Who is actually behind this site?", { words: [["stecken hinter", "be behind"]] }),
      p("Die Behauptung lässt sich nicht belegen.", "The claim can't be backed up with evidence.", { words: [["Behauptung", "claim"], ["belegen", "back up, prove"]] }),
      p("Ein Faktencheck hat die Meldung inzwischen widerlegt.", "A fact check has since disproved the report.", { words: [["Meldung", "report, news item"], ["widerlegen", "refute, disprove"]] }),
      p("Das Zitat wurde aus dem Zusammenhang gerissen.", "The quote was taken out of context.", { words: [["Zitat", "quote"], ["aus dem Zusammenhang reißen", "take out of context"]] }),
      p("Bevor ich etwas teile, überprüfe ich die Quelle.", "Before I share anything, I check the source.", { words: [["teilen", "share"], ["überprüfen", "check, verify"]] }),
      p("Die Falschmeldung verbreitete sich rasend schnell.", "The false report spread like wildfire.", { words: [["sich verbreiten", "spread"], ["rasend schnell", "incredibly fast"]] }),
      p("Seriöse Medien haben nichts darüber berichtet.", "Reputable media haven't reported anything about it.", { words: [["berichten über", "report on"]] }),
    ],
    dialogue: [
      tutor("Meine Tante hat mir geschrieben, dass das Bargeld nächstes Jahr abgeschafft wird.", "My aunt wrote to me that cash will be abolished next year."),
      you("Wer steckt eigentlich hinter dieser Nachricht?", "Ask who is actually behind this message.", ["Woher hat sie das?", "Was ist die Quelle?"]),
      tutor("Keine Ahnung, irgendein Kanal im Internet.", "No idea, some channel on the internet."),
      you("Seriöse Medien haben nichts darüber berichtet.", "Say reputable media haven't reported anything about it.", ["Das klingt nach einer Falschmeldung."]),
      tutor("Was soll ich ihr antworten?", "What should I reply to her?"),
      you("Sag ihr, sie soll vorher die Quelle überprüfen.", "Say she should check the source first.", ["Schick ihr einen Faktencheck."]),
    ],
  },
  {
    title: "Media criticism",
    intro:
      "Talking about the media means talking about balance and bias: is the coverage ('Berichterstattung') balanced ('ausgewogen') or one-sided ('einseitig')? Are news and opinion kept apart? Social networks add filter bubbles and headlines written mainly for clicks. These words help you argue about it with nuance.",
    phrases: [
      p("Die Berichterstattung war ziemlich einseitig.", "The coverage was rather one-sided.", { words: [["Berichterstattung", "coverage, reporting"], ["einseitig", "one-sided"]] }),
      p("Viele Schlagzeilen sollen vor allem Klicks erzeugen.", "Many headlines are mainly meant to generate clicks.", { words: [["Schlagzeile", "headline"], ["erzeugen", "generate"]] }),
      p("In sozialen Netzwerken landet man schnell in einer Filterblase.", "On social networks you quickly end up in a filter bubble.", { words: [["landen", "end up"], ["Filterblase", "filter bubble"]] }),
      p("Der Sender bemüht sich um eine ausgewogene Darstellung.", "The broadcaster strives for balanced coverage.", { words: [["Sender", "broadcaster, channel"], ["sich bemühen um", "strive for"], ["ausgewogen", "balanced"]] }),
      p("Mich stört, dass Meinung und Nachricht vermischt werden.", "What bothers me is that opinion and news get mixed up.", { words: [["stören", "bother"], ["vermischen", "mix up"]] }),
      p("Die Pressefreiheit ist ein hohes Gut.", "Freedom of the press is a precious asset.", { words: [["Pressefreiheit", "freedom of the press"], ["ein hohes Gut", "a precious asset"]] }),
      p("Man sollte sich aus verschiedenen Quellen informieren.", "You should get your information from various sources.", { words: [["Quellen", "sources"]] }),
    ],
    dialogue: [
      tutor("Wie fanden Sie die Berichterstattung über den Streik?", "What did you think of the coverage of the strike?"),
      you("Ich fand sie ziemlich einseitig.", "Say you found it rather one-sided.", ["Die Berichterstattung war ziemlich einseitig.", "Ich fand sie ausgewogen."]),
      tutor("Woran machen Sie das fest?", "What are you basing that on?"),
      you("Mich stört, dass Meinung und Nachricht vermischt werden.", "Say what bothers you is that opinion and news get mixed up.", ["Es kamen nur die Arbeitgeber zu Wort."]),
      tutor("Und wie informieren Sie sich selbst?", "And how do you keep yourself informed?"),
      you("Ich informiere mich aus verschiedenen Quellen, zum Beispiel {source}.", "Say you use various sources and name one.", ["Aus verschiedenen Quellen.", "Ich lese mehrere Zeitungen."]),
    ],
  },
]);
