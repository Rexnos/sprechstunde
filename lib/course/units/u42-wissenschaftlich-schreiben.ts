import { defineUnit, p, tutor, you } from "../define";

export const unit42 = defineUnit(42, "C1", "Wissenschaftlich schreiben", "Describe graphs and statistics, cite and paraphrase sources, and structure a paper or talk with academic connectors.", [
  {
    title: "Describing graphs and statistics",
    intro:
      "Describing data needs small but precise prepositions: 'um' gives the size of a change, 'auf' the new value, 'bei' the current level. 'Der Anteil stieg um fünf Prozentpunkte auf dreißig Prozent.' Verbs of change come in pairs: steigen / zunehmen (rise), sinken / zurückgehen (fall), and 'konstant bleiben' (stay level).",
    grammar: {
      title: "um, auf, von … auf, bei",
      text: "Careful with Prozent and Prozentpunkt: from 10 to 12 percent is a rise of 2 Prozentpunkte, but of 20 Prozent.",
      table: [
        ["expression", "meaning", "example"],
        ["um", "by (size of the change)", "Der Anteil stieg um fünf Prozentpunkte."],
        ["auf", "to (the new value)", "… auf dreißig Prozent."],
        ["von … auf", "from … to", "Er sank von vierzig auf fünfundzwanzig Prozent."],
        ["bei", "at (a level)", "Die Quote liegt bei acht Prozent."],
        ["zurückgehen", "fall, decline", "Die Zahl ist deutlich zurückgegangen."],
      ],
    },
    phrases: [
      p("Die Grafik zeigt die Entwicklung der Arbeitslosenquote in den letzten zehn Jahren.", "The graph shows the development of the unemployment rate over the last ten years.", { accept: ["Die Grafik zeigt die Entwicklung der Arbeitslosenquote in den letzten 10 Jahren."], words: [["Grafik", "graph, chart"], ["Arbeitslosenquote", "unemployment rate"]] }),
      p("Der Anteil der Radfahrer stieg um fünf Prozentpunkte auf dreißig Prozent.", "The share of cyclists rose by five percentage points to thirty percent.", { accept: ["Der Anteil der Radfahrer stieg um 5 Prozentpunkte auf 30 Prozent."], words: [["Anteil", "share, proportion"], ["Prozentpunkt", "percentage point"]] }),
      p("Die Zahl der Geburten ist deutlich zurückgegangen.", "The number of births has fallen significantly.", { words: [["Geburten", "births"], ["zurückgehen", "decline, fall"]] }),
      p("Seitdem bleibt der Wert weitgehend konstant.", "Since then the figure has remained largely constant.", { words: [["Wert", "value, figure"], ["weitgehend", "largely"]] }),
      p("Die Quote liegt derzeit bei rund acht Prozent.", "The rate currently stands at around eight percent.", { accept: ["Die Quote liegt derzeit bei rund 8 Prozent."], words: [["derzeit", "currently"], ["rund", "around, roughly"]] }),
      p("Auffällig ist der starke Einbruch im Jahr der Pandemie.", "What stands out is the sharp drop in the year of the pandemic.", { words: [["auffällig", "striking"], ["Einbruch", "slump, sharp drop"]] }),
      p("Fast die Hälfte der Befragten gab an, täglich Sport zu treiben.", "Almost half of the respondents said they exercise every day.", { words: [["die Befragten", "the respondents"], ["angeben", "state"]] }),
    ],
    dialogue: [
      tutor("Was zeigt die Grafik?", "What does the graph show?"),
      you("Die Grafik zeigt, wie sich {topic} in den letzten zehn Jahren entwickelt hat.", "Say what development the graph shows over the last ten years.", ["Die Grafik zeigt die Entwicklung der Arbeitslosenquote in den letzten zehn Jahren."]),
      tutor("Und was fällt Ihnen besonders auf?", "And what strikes you in particular?"),
      you("Auffällig ist der starke Einbruch im Jahr der Pandemie.", "Say the sharp drop in the pandemic year stands out.", ["Besonders auffällig ist der starke Rückgang.", "Mir fällt der starke Einbruch auf."]),
      tutor("Und wo liegt der Wert heute?", "And where does the figure stand today?"),
      you("Er liegt derzeit bei rund {number} Prozent.", "Say it currently stands at around a certain percentage.", ["Derzeit liegt er bei etwa {number} Prozent."]),
    ],
  },
  {
    title: "Citing and paraphrasing sources",
    intro:
      "Academic German marks clearly whose idea is whose. Besides Konjunktiv I, you'll use 'laut' and 'zufolge' (which follows its noun: 'der Studie zufolge'), 'nach Ansicht von' and verbs like 'betonen', 'hinweisen auf' and 'sich berufen auf'. Paraphrasing in your own words shows you've understood the source.",
    grammar: {
      title: "Naming the source",
      text: "'zufolge' is a postposition: the dative noun comes first. 'laut' usually takes the dative too when there's an article.",
      table: [
        ["expression", "structure", "example"],
        ["laut", "+ dative", "Laut der Studie …"],
        ["zufolge", "dative + zufolge", "Der Studie zufolge …"],
        ["nach Ansicht von", "+ dative", "Nach Ansicht von Fachleuten …"],
        ["wie … betont", "clause, verb last", "Wie die Autorin betont, …"],
        ["sich berufen auf", "+ accusative", "Sie beruft sich auf neue Daten."],
      ],
    },
    phrases: [
      p("Der Studie zufolge schlafen Jugendliche immer weniger.", "According to the study, young people are sleeping less and less.", { words: [["zufolge", "according to (after the noun)"], ["Jugendliche", "young people, teenagers"]] }),
      p("Wie die Autorin betont, sind die Ergebnisse nur vorläufig.", "As the author stresses, the results are only preliminary.", { words: [["betonen", "stress, emphasise"], ["vorläufig", "preliminary"]] }),
      p("Nach Ansicht vieler Fachleute greift diese Erklärung zu kurz.", "In the view of many experts, this explanation falls short.", { words: [["Ansicht", "view, opinion"], ["Fachleute", "experts"], ["zu kurz greifen", "fall short"]] }),
      p("Schmidt weist darauf hin, dass die Stichprobe sehr klein war.", "Schmidt points out that the sample was very small.", { words: [["hinweisen auf", "point out"], ["Stichprobe", "sample"]] }),
      p("Die Autoren berufen sich auf Daten aus zwölf Ländern.", "The authors draw on data from twelve countries.", { accept: ["Die Autoren berufen sich auf Daten aus 12 Ländern."], words: [["sich berufen auf", "refer to, draw on"]] }),
      p("Mit anderen Worten ist die Ursache noch unklar.", "In other words, the cause is still unclear.", { words: [["Ursache", "cause"]] }),
      p("Diese These lässt sich durch mehrere Studien belegen.", "This thesis can be supported by several studies.", { words: [["These", "thesis, claim"], ["belegen", "prove, back up"]] }),
    ],
    dialogue: [
      tutor("Was sagt die Studie über Jugendliche?", "What does the study say about young people?"),
      you("Der Studie zufolge schlafen Jugendliche immer weniger.", "Report it using 'zufolge': young people are sleeping less and less.", ["Laut der Studie schlafen Jugendliche immer weniger.", "Die Studie zeigt, dass Jugendliche immer weniger schlafen."]),
      tutor("Ist das Ergebnis denn sicher?", "Is the result certain, though?"),
      you("Nein, die Autorin weist darauf hin, dass die Stichprobe sehr klein war.", "Say no, the author points out the sample was very small.", ["Nein, die Stichprobe war sehr klein.", "Nicht ganz, die Ergebnisse sind nur vorläufig."]),
      tutor("Wie würden Sie das in einem Satz zusammenfassen?", "How would you sum that up in one sentence?"),
      you("Mit anderen Worten ist die Ursache noch unklar.", "Say in other words, the cause is still unclear.", ["Kurz gesagt, man weiß es noch nicht genau."]),
    ],
  },
  {
    title: "Academic connectors",
    intro:
      "Academic texts link ideas with connectors that are rare in speech. 'folglich', 'demzufolge' and 'somit' draw conclusions; 'hingegen' and 'wohingegen' contrast; 'insofern … als' limits a claim (to the extent that). Most are adverbs, so the verb follows them directly in position 2; 'wohingegen' and 'als' send the verb to the end.",
    grammar: {
      title: "Connectors and word order",
      text: "Adverbs: verb next. Subordinating words: verb last. 'hingegen' often stands after the subject instead of at the start.",
      table: [
        ["connector", "meaning", "word order"],
        ["folglich, somit", "consequently, thus", "position 1, verb follows"],
        ["demzufolge", "accordingly, as a result", "position 1, verb follows"],
        ["hingegen", "on the other hand", "often after subject or verb"],
        ["wohingegen", "whereas", "subordinate clause, verb last"],
        ["insofern … als", "to the extent that", "als clause, verb last"],
        ["darüber hinaus", "moreover", "position 1, verb follows"],
      ],
    },
    phrases: [
      p("Die Kosten sind gestiegen, folglich müssen wir sparen.", "Costs have risen, and consequently we have to economise.", { words: [["folglich", "consequently"], ["sparen", "save, economise"]] }),
      p("Die Daten sind unvollständig, demzufolge ist Vorsicht geboten.", "The data are incomplete, so caution is called for.", { words: [["demzufolge", "accordingly, as a result"], ["geboten sein", "be called for"]] }),
      p("In Städten nimmt die Bevölkerung zu, auf dem Land hingegen ab.", "In cities the population is growing, whereas in rural areas it is shrinking.", { words: [["zunehmen / abnehmen", "increase / decrease"], ["hingegen", "on the other hand"]] }),
      p("Die Methode ist insofern problematisch, als sie sehr teuer ist.", "The method is problematic insofar as it is very expensive.", { words: [["insofern … als", "insofar as"]] }),
      p("Darüber hinaus wurden keine Langzeitfolgen untersucht.", "Moreover, no long-term effects were examined.", { words: [["darüber hinaus", "moreover"], ["Langzeitfolgen", "long-term effects"]] }),
      p("Somit lässt sich die erste Hypothese bestätigen.", "Thus the first hypothesis can be confirmed.", { words: [["somit", "thus"], ["bestätigen", "confirm"]] }),
      p("Ältere Befragte lesen Zeitung, wohingegen Jüngere sich online informieren.", "Older respondents read newspapers, whereas younger ones get their news online.", { words: [["wohingegen", "whereas"]] }),
    ],
    dialogue: [
      tutor("Die Kosten sind gestiegen. Was folgt daraus?", "Costs have risen. What follows from that?"),
      you("Folglich müssen wir sparen.", "Say that consequently you have to economise.", ["Demzufolge müssen wir sparen.", "Wir müssen folglich sparen."]),
      tutor("Und wie entwickelt sich die Bevölkerung auf dem Land?", "And how is the population developing in rural areas?"),
      you("Auf dem Land hingegen nimmt die Bevölkerung ab.", "Say that in rural areas, by contrast, the population is shrinking.", ["Auf dem Land nimmt die Bevölkerung hingegen ab."]),
      tutor("Halten Sie die Methode für gut?", "Do you think the method is good?"),
      you("Sie ist insofern problematisch, als sie sehr teuer ist.", "Say it's problematic insofar as it's very expensive.", ["Sie ist teuer und somit problematisch."]),
    ],
  },
  {
    title: "Structuring a paper or a talk",
    intro:
      "A clear structure is half the battle in academic work. Announce what's coming, signal each transition and end with a conclusion and an outlook. German uses many fixed formulas for this, such as 'Die vorliegende Arbeit untersucht …' or 'Damit komme ich zum letzten Punkt.'",
    grammar: {
      title: "Signposting formulas",
      text: "Learn one formula for each part and you'll never get stuck.",
      table: [
        ["part", "typical formula"],
        ["introduction", "Die vorliegende Arbeit untersucht …"],
        ["overview", "Zunächst …, im Anschluss daran …, abschließend …"],
        ["transition", "Damit komme ich zu …"],
        ["conclusion", "Zusammenfassend lässt sich festhalten, dass …"],
        ["outlook", "Offen bleibt die Frage, ob …"],
      ],
    },
    phrases: [
      p("Die vorliegende Arbeit untersucht den Einfluss sozialer Medien auf das Leseverhalten.", "This paper examines the influence of social media on reading habits.", { words: [["die vorliegende Arbeit", "the present paper"], ["Einfluss", "influence"], ["Leseverhalten", "reading habits"]] }),
      p("In meinem Vortrag gehe ich auf drei Aspekte ein.", "In my talk I'll address three aspects.", { words: [["Vortrag", "talk, lecture"], ["eingehen auf", "address, go into"]] }),
      p("Zunächst möchte ich den Forschungsstand kurz skizzieren.", "First I'd like to briefly outline the state of research.", { words: [["zunächst", "first, to begin with"], ["Forschungsstand", "state of research"], ["skizzieren", "outline"]] }),
      p("Im Anschluss daran stelle ich die Methode vor.", "After that I'll present the method.", { words: [["im Anschluss daran", "following that"]] }),
      p("Damit komme ich zum letzten Punkt.", "That brings me to the last point."),
      p("Abschließend lässt sich festhalten, dass weitere Forschung nötig ist.", "In conclusion, it can be said that further research is needed.", { words: [["abschließend", "in conclusion"], ["festhalten", "state, record"]] }),
      p("Ich danke Ihnen für Ihre Aufmerksamkeit und freue mich auf Ihre Fragen.", "Thank you for your attention, I look forward to your questions.", { words: [["Aufmerksamkeit", "attention"]] }),
    ],
    dialogue: [
      tutor("Sie haben zehn Minuten. Wie beginnen Sie Ihren Vortrag?", "You have ten minutes. How do you start your talk?"),
      you("In meinem Vortrag gehe ich auf drei Aspekte ein.", "Say you'll address three aspects in your talk.", ["Ich möchte heute über drei Aspekte sprechen."]),
      tutor("Und womit fangen Sie an?", "And what do you start with?"),
      you("Zunächst möchte ich den Forschungsstand kurz skizzieren.", "Say first you'd like to briefly outline the state of research.", ["Zuerst skizziere ich kurz den Forschungsstand."]),
      tutor("Die Zeit ist fast um. Wie schließen Sie?", "Time is almost up. How do you finish?"),
      you("Abschließend lässt sich festhalten, dass weitere Forschung nötig ist.", "Conclude that further research is needed.", ["Ich danke Ihnen für Ihre Aufmerksamkeit.", "Zusammenfassend lässt sich sagen, dass weitere Forschung nötig ist."]),
    ],
  },
]);
