import { defineUnit, p, tutor, you } from "../define";

export const unit34 = defineUnit(34, "B2", "Wissenschaft und Technik", "Describe inventions and processes with the passive with modal verbs and participles used as adjectives.", [
  {
    title: "Passive with modal verbs",
    intro:
      "To say what must, can or should be done, combine a modal verb with the passive infinitive: participle + werden. 'Man muss die Daten prüfen' becomes 'Die Daten müssen geprüft werden.' The modal verb is conjugated in position 2 and 'werden' goes to the very end.",
    grammar: {
      title: "Modal verb + participle + werden",
      text: "The modal can be in the present or Präteritum: 'Das Problem konnte gelöst werden.'",
      table: [
        ["Active (man)", "Passive with modal"],
        ["Man muss die Daten prüfen.", "Die Daten müssen geprüft werden."],
        ["Man kann das Gerät reparieren.", "Das Gerät kann repariert werden."],
        ["Man darf den Raum nicht betreten.", "Der Raum darf nicht betreten werden."],
        ["Man sollte den Versuch wiederholen.", "Der Versuch sollte wiederholt werden."],
      ],
    },
    phrases: [
      p("Die Ergebnisse müssen noch geprüft werden.", "The results still have to be checked.", { words: [["Ergebnisse", "results"], ["geprüft", "checked"]] }),
      p("Das Gerät kann leicht repariert werden.", "The device can be repaired easily.", { words: [["Gerät", "device"]] }),
      p("Der Raum darf nur mit Schutzkleidung betreten werden.", "The room may only be entered in protective clothing.", { words: [["Schutzkleidung", "protective clothing"], ["betreten", "enter"]] }),
      p("Der Versuch sollte mehrmals wiederholt werden.", "The experiment should be repeated several times.", { words: [["Versuch", "experiment"], ["mehrmals", "several times"]] }),
      p("Die Daten mussten gelöscht werden.", "The data had to be deleted.", { words: [["gelöscht", "deleted"]] }),
      p("Das Problem konnte schnell gelöst werden.", "The problem could be solved quickly.", { words: [["gelöst", "solved"]] }),
      p("Was muss noch gemacht werden?", "What still needs to be done?"),
    ],
    dialogue: [
      tutor("Sind die Ergebnisse schon fertig?", "Are the results ready yet?"),
      you("Nein, die Ergebnisse müssen noch geprüft werden.", "Say no, the results still have to be checked.", ["Nein, noch nicht."]),
      tutor("Und der Versuch von gestern?", "And yesterday's experiment?"),
      you("Der Versuch sollte mehrmals wiederholt werden.", "Say the experiment should be repeated several times.", ["Er muss wiederholt werden."]),
      tutor("Kann ich kurz ins Labor gehen?", "Can I pop into the lab?"),
      you("Der Raum darf nur mit Schutzkleidung betreten werden.", "Say the room may only be entered in protective clothing.", ["Nur mit Schutzkleidung."]),
    ],
  },
  {
    title: "Partizip I as an adjective",
    intro:
      "Add -d to an infinitive and you get the Partizip I: steigen → steigend. Used before a noun it takes normal adjective endings and describes something that is happening right now: 'die steigenden Kosten' (the costs that are rising). It's typical of news and written German.",
    grammar: {
      title: "Infinitive + d + adjective ending",
      text: "The Partizip I is active and ongoing: the noun is doing the action.",
      table: [
        ["Infinitive", "Partizip I", "Example"],
        ["steigen", "steigend", "die steigenden Kosten"],
        ["wachsen", "wachsend", "eine wachsende Zahl"],
        ["fehlen", "fehlend", "die fehlenden Daten"],
        ["entscheiden", "entscheidend", "der entscheidende Schritt"],
      ],
    },
    phrases: [
      p("Die steigenden Kosten sind ein großes Problem.", "The rising costs are a big problem.", { words: [["steigend", "rising"], ["Kosten", "costs"]] }),
      p("Eine wachsende Zahl von Menschen nutzt Solarenergie.", "A growing number of people use solar energy.", { words: [["wachsend", "growing"], ["Solarenergie", "solar energy"]] }),
      p("Das war der entscheidende Schritt.", "That was the decisive step.", { words: [["entscheidend", "decisive"], ["Schritt", "step"]] }),
      p("Die fehlenden Daten müssen ergänzt werden.", "The missing data has to be added.", { words: [["fehlend", "missing"], ["ergänzt", "added, completed"]] }),
      p("Wir brauchen eine funktionierende Lösung.", "We need a working solution.", { words: [["funktionierend", "working, functioning"], ["Lösung", "solution"]] }),
      p("Die Forscherin sprach mit leuchtenden Augen von ihrer Arbeit.", "The researcher talked about her work with shining eyes.", { words: [["Forscherin", "researcher (female)"], ["leuchtend", "shining"]] }),
      p("Die folgenden Schritte sind besonders wichtig.", "The following steps are particularly important.", { words: [["folgend", "following"]] }),
    ],
    dialogue: [
      tutor("Warum wurde das Projekt gestoppt?", "Why was the project stopped?"),
      you("Die steigenden Kosten sind ein großes Problem.", "Say the rising costs are a big problem.", ["Wegen der steigenden Kosten."]),
      tutor("Gibt es keine Alternative?", "Is there no alternative?"),
      you("Wir brauchen eine funktionierende Lösung.", "Say you need a working solution.", ["Noch nicht."]),
      tutor("Und was fehlt noch für den Bericht?", "And what's still missing for the report?"),
      you("Die fehlenden Daten müssen ergänzt werden.", "Say the missing data has to be added.", ["Ein paar Daten fehlen noch."]),
    ],
  },
  {
    title: "Partizip II as an adjective",
    intro:
      "The past participle can also stand before a noun with adjective endings. It describes something that has been done to the noun (passive) or a finished change: 'das entwickelte Verfahren' (the process that was developed), 'die gestiegenen Preise' (prices that have gone up).",
    grammar: {
      title: "Partizip I or Partizip II?",
      text: "Partizip I: the noun is doing it now. Partizip II: it has been done to the noun, or the change is complete.",
      table: [
        ["Partizip I (active, ongoing)", "Partizip II (passive or finished)"],
        ["die steigenden Preise", "die gestiegenen Preise"],
        ["das kochende Wasser", "das gekochte Wasser"],
        ["der laufende Motor", "der reparierte Motor"],
      ],
    },
    phrases: [
      p("Das neu entwickelte Verfahren spart viel Energie.", "The newly developed process saves a lot of energy.", { words: [["entwickelt", "developed"], ["Verfahren", "process, method"]] }),
      p("Die gesammelten Daten werden anonym gespeichert.", "The collected data is stored anonymously.", { words: [["gesammelt", "collected"], ["gespeichert", "stored"]] }),
      p("Die gestiegenen Preise ärgern viele Kunden.", "The increased prices annoy many customers.", { words: [["gestiegen", "risen, increased"], ["ärgern", "annoy"]] }),
      p("Das reparierte Gerät funktioniert wieder.", "The repaired device works again.", { words: [["repariert", "repaired"]] }),
      p("Die veröffentlichte Studie bekam viel Aufmerksamkeit.", "The published study got a lot of attention.", { words: [["veröffentlicht", "published"], ["Aufmerksamkeit", "attention"]] }),
      p("Bitte nur abgekochtes Wasser trinken.", "Please only drink boiled water.", { words: [["abgekocht", "boiled"]], note: "Infinitive instructions like this are typical of signs and leaflets." }),
      p("Ein gut geplantes Experiment spart Zeit.", "A well-planned experiment saves time.", { words: [["geplant", "planned"]] }),
    ],
    dialogue: [
      tutor("Was ist das Besondere an der neuen Anlage?", "What's special about the new plant?"),
      you("Das neu entwickelte Verfahren spart viel Energie.", "Say the newly developed process saves a lot of energy.", ["Sie spart viel Energie."]),
      tutor("Und was passiert mit den Daten?", "And what happens to the data?"),
      you("Die gesammelten Daten werden anonym gespeichert.", "Say the collected data is stored anonymously.", ["Sie werden anonym gespeichert."]),
      tutor("Läuft der alte Drucker eigentlich wieder?", "Is the old printer working again, by the way?"),
      you("Ja, das reparierte Gerät funktioniert wieder.", "Say yes, the repaired device works again.", ["Ja, er funktioniert wieder."]),
    ],
  },
  {
    title: "Describing an invention",
    intro:
      "To explain how something works you say what it consists of, what it's for and how it's made, step by step. Processes are usually described in the passive, because the action matters more than the person doing it.",
    grammar: {
      title: "Explaining what something is and how it's made",
      text: "Combine these with the passive and with sequence words.",
      table: [
        ["Expression", "Meaning"],
        ["Das Gerät besteht aus …", "The device consists of …"],
        ["Es dient dazu, … zu …", "Its purpose is to …"],
        ["Es wird verwendet, um … zu …", "It is used to …"],
        ["zunächst … anschließend … schließlich", "first … then … finally"],
      ],
    },
    phrases: [
      p("Das Gerät besteht aus drei Teilen.", "The device consists of three parts.", { accept: ["Das Gerät besteht aus 3 Teilen."], words: [["bestehen aus", "consist of"], ["Teilen", "parts"]] }),
      p("Es dient dazu, Wasser zu reinigen.", "Its purpose is to purify water.", { words: [["dienen", "serve"], ["reinigen", "clean, purify"]] }),
      p("Die Erfindung wird in Krankenhäusern verwendet.", "The invention is used in hospitals.", { words: [["Erfindung", "invention"], ["verwendet", "used"]] }),
      p("Zunächst wird das Material erhitzt.", "First the material is heated.", { words: [["zunächst", "first"], ["erhitzt", "heated"]] }),
      p("Anschließend wird es in eine Form gegossen.", "Then it is poured into a mould.", { words: [["anschließend", "then, afterwards"], ["Form", "mould, shape"], ["gegossen", "poured"]] }),
      p("Schließlich muss das Produkt getestet werden.", "Finally the product has to be tested.", { words: [["schließlich", "finally"]] }),
      p("Wer hat das Telefon erfunden?", "Who invented the telephone?", { words: [["erfunden", "invented"]] }),
    ],
    dialogue: [
      tutor("Was ist das denn für ein Gerät?", "What kind of device is that?"),
      you("Es dient dazu, Wasser zu reinigen.", "Say its purpose is to purify water.", ["Das ist ein Wasserfilter."]),
      tutor("Und woraus besteht es?", "And what does it consist of?"),
      you("Das Gerät besteht aus drei Teilen.", "Say the device consists of three parts.", ["Das Gerät besteht aus 3 Teilen.", "Es besteht aus {number} Teilen."]),
      tutor("Wie wird es hergestellt?", "How is it made?"),
      you("Zunächst wird das Material erhitzt.", "Say first the material is heated.", ["Zuerst wird das Material erhitzt."]),
    ],
  },
]);
