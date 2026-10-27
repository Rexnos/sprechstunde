import { defineUnit, p, tutor, you } from "../define";

export const unit43 = defineUnit(43, "C1", "Recht und Verwaltung", "Use Funktionsverbgefüge, understand contracts and your rights as a tenant, and write a formal letter to an authority.", [
  {
    title: "Funktionsverbgefüge",
    intro:
      "A Funktionsverbgefüge pairs a noun with a 'light' verb (treten, stellen, nehmen, bringen) that carries little meaning of its own: 'in Kraft treten' simply means 'become valid'. They're everywhere in legal and administrative German. Learn them as fixed blocks, because the preposition and article can't be changed.",
    grammar: {
      title: "Common Funktionsverbgefüge",
      text: "Most have a simple verb as a more neutral alternative.",
      table: [
        ["Funktionsverbgefüge", "simple verb", "meaning"],
        ["in Kraft treten", "gültig werden", "come into force"],
        ["zur Verfügung stellen", "bereitstellen", "make available"],
        ["in Anspruch nehmen", "nutzen", "make use of, take up"],
        ["zur Sprache bringen", "ansprechen", "raise (a topic)"],
        ["eine Entscheidung treffen", "entscheiden", "make a decision"],
        ["infrage kommen", "möglich sein", "be an option"],
        ["zur Kenntnis nehmen", "registrieren", "take note of"],
      ],
    },
    phrases: [
      p("Das neue Gesetz tritt am ersten Januar in Kraft.", "The new law comes into force on the first of January.", { accept: ["Das neue Gesetz tritt am 1. Januar in Kraft."], words: [["in Kraft treten", "come into force"]] }),
      p("Die Firma stellt allen Mitarbeitern einen Laptop zur Verfügung.", "The company provides all employees with a laptop.", { words: [["zur Verfügung stellen", "make available, provide"]] }),
      p("Sie können eine kostenlose Beratung in Anspruch nehmen.", "You can take advantage of a free consultation.", { words: [["in Anspruch nehmen", "make use of"], ["Beratung", "advice, consultation"]] }),
      p("Ich möchte in der Sitzung ein Problem zur Sprache bringen.", "I'd like to raise a problem in the meeting.", { words: [["Sitzung", "meeting, session"], ["zur Sprache bringen", "raise, bring up"]] }),
      p("Wir müssen bis Freitag eine Entscheidung treffen.", "We have to make a decision by Friday.", { words: [["eine Entscheidung treffen", "make a decision"]] }),
      p("Ein Umzug kommt für uns derzeit nicht infrage.", "Moving is out of the question for us at the moment.", { words: [["infrage kommen", "be an option"]], note: "Also written 'in Frage'." }),
      p("Wir haben Ihren Einwand zur Kenntnis genommen.", "We have taken note of your objection.", { words: [["Einwand", "objection"], ["zur Kenntnis nehmen", "take note of"]], note: "Often polite for 'we heard you, but nothing changes'." }),
    ],
    dialogue: [
      tutor("Ab wann gilt die neue Regelung?", "From when does the new rule apply?"),
      you("Sie tritt am ersten Januar in Kraft.", "Say it comes into force on the first of January.", ["Am ersten Januar tritt sie in Kraft.", "Ab dem ersten Januar."]),
      tutor("Bekommen die Mitarbeiter Unterstützung?", "Do employees get support?"),
      you("Ja, sie können eine kostenlose Beratung in Anspruch nehmen.", "Say yes, they can take up free advice.", ["Ja, die Firma stellt eine Beratung zur Verfügung."]),
      tutor("Gibt es noch etwas, das Sie zur Sprache bringen möchten?", "Is there anything else you'd like to raise?"),
      you("Ja, ich möchte das Thema {topic} zur Sprache bringen.", "Say you'd like to raise a certain topic.", ["Nein, danke, das war alles."]),
    ],
  },
  {
    title: "Contracts",
    intro:
      "Contracts ('Verträge') have their own vocabulary: the term ('Laufzeit'), the notice period ('Kündigungsfrist'), automatic renewal and the right of withdrawal ('Widerrufsrecht'), which gives you fourteen days for many contracts made online or by phone. Watch out for conditions hidden in 'das Kleingedruckte'.",
    grammar: {
      title: "Contract language",
      text: "These fixed expressions appear in almost every contract.",
      table: [
        ["expression", "meaning"],
        ["sofern", "provided that"],
        ["sofern nicht anders vereinbart", "unless otherwise agreed"],
        ["fristgerecht", "within the deadline"],
        ["mit sofortiger Wirkung", "with immediate effect"],
        ["unter Vorbehalt", "with reservations, provisionally"],
      ],
    },
    phrases: [
      p("Der Vertrag kann mit einer Frist von drei Monaten gekündigt werden.", "The contract can be terminated with three months' notice.", { words: [["Frist", "period, deadline"], ["kündigen", "cancel, terminate"]] }),
      p("Bitte lesen Sie das Kleingedruckte sorgfältig durch.", "Please read the small print carefully.", { words: [["das Kleingedruckte", "the small print"], ["sorgfältig", "carefully"]] }),
      p("Der Vertrag verlängert sich automatisch um ein weiteres Jahr.", "The contract renews automatically for another year.", { words: [["sich verlängern", "be extended, renew"]], note: "Common in business contracts. Consumer contracts signed since March 2022 may only roll over indefinitely, cancellable with one month's notice." }),
      p("Mit Ihrer Unterschrift erklären Sie sich mit den Bedingungen einverstanden.", "By signing, you agree to the terms.", { words: [["Unterschrift", "signature"], ["sich einverstanden erklären", "agree, consent"], ["Bedingungen", "terms, conditions"]] }),
      p("Innerhalb von vierzehn Tagen können Sie den Vertrag widerrufen.", "You can withdraw from the contract within fourteen days.", { accept: ["Innerhalb von 14 Tagen können Sie den Vertrag widerrufen."], words: [["widerrufen", "withdraw from, revoke"]] }),
      p("Sofern nicht anders vereinbart, gilt deutsches Recht.", "Unless otherwise agreed, German law applies.", { words: [["vereinbaren", "agree"], ["Recht", "law"]] }),
      p("Diese Klausel ist rechtlich unwirksam.", "This clause is legally invalid.", { words: [["Klausel", "clause"], ["unwirksam", "invalid, void"]] }),
    ],
    dialogue: [
      tutor("Ich möchte den Wartungsvertrag unserer Firma kündigen. Geht das sofort?", "I'd like to cancel our company's maintenance contract. Can that be done right away?"),
      you("Nein, er kann nur mit einer Frist von drei Monaten gekündigt werden.", "Say no, it can only be cancelled with three months' notice.", ["Leider nicht, die Kündigungsfrist beträgt drei Monate."]),
      tutor("Oh nein. Und wenn ich gar nichts mache?", "Oh no. And if I do nothing at all?"),
      you("Dann verlängert er sich automatisch um ein weiteres Jahr.", "Say then it renews automatically for another year.", ["Dann verlängert sich der Vertrag automatisch."]),
      tutor("Das stand bestimmt im Kleingedruckten.", "That was probably in the small print."),
      you("Genau. Lies das Kleingedruckte nächstes Mal sorgfältig durch.", "Agree, and tell them to read the small print carefully next time.", ["Ja, das solltest du nächstes Mal genau lesen."]),
    ],
  },
  {
    title: "Tenancy law",
    intro:
      "German tenancy law ('Mietrecht') protects tenants quite strongly. The deposit ('Kaution') may be at most three months' basic rent, every year there's a statement of service charges ('Nebenkostenabrechnung'), and if something is seriously broken you may be entitled to a rent reduction ('Mietminderung'). Landlords need a legitimate reason, such as personal need ('Eigenbedarf'), to give notice.",
    phrases: [
      p("Die Kaution darf höchstens drei Kaltmieten betragen.", "The deposit may not exceed three months' basic rent.", { words: [["Kaution", "deposit"], ["Kaltmiete", "basic rent (without heating and service charges)"], ["betragen", "amount to"]] }),
      p("Die Heizung ist seit zwei Wochen defekt.", "The heating has been broken for two weeks.", { words: [["Heizung", "heating"], ["defekt", "broken, faulty"]] }),
      p("Bis zur Reparatur mindern wir die Miete.", "We're reducing the rent until it's repaired.", { words: [["mindern", "reduce"]], note: "Tell the landlord about the defect first. The amount depends on how serious it is." }),
      p("Die Nebenkostenabrechnung kommt mir viel zu hoch vor.", "The service-charge statement seems far too high to me.", { words: [["Nebenkosten", "service charges, utilities"], ["vorkommen", "seem"]] }),
      p("Der Vermieter hat wegen Eigenbedarf gekündigt.", "The landlord has given notice on grounds of personal need.", { words: [["Vermieter", "landlord"], ["Eigenbedarf", "personal need (for the landlord or family)"]] }),
      p("Als Mieter haben Sie das Recht, die Belege einzusehen.", "As a tenant you have the right to inspect the receipts.", { words: [["Mieter", "tenant"], ["Belege", "receipts, supporting documents"], ["einsehen", "inspect"]] }),
      p("Ich würde mich an den Mieterverein wenden.", "I would turn to the tenants' association.", { words: [["sich wenden an", "turn to, contact"], ["Mieterverein", "tenants' association"]] }),
    ],
    dialogue: [
      tutor("Was ist denn los? Du siehst frustriert aus.", "What's wrong? You look frustrated."),
      you("Die Heizung ist seit zwei Wochen defekt.", "Say the heating has been broken for two weeks.", ["Unsere Heizung funktioniert seit zwei Wochen nicht."]),
      tutor("Hast du den Vermieter informiert?", "Have you told the landlord?"),
      you("Ja, schriftlich. Bis zur Reparatur mindern wir die Miete.", "Say yes, in writing, and that you're reducing the rent until it's repaired.", ["Ja, aber er reagiert nicht."]),
      tutor("Vorsicht, informier dich vorher genau.", "Careful, get proper information first."),
      you("Keine Sorge, ich wende mich an den Mieterverein.", "Say don't worry, you'll turn to the tenants' association.", ["Ich lasse mich beim Mieterverein beraten."]),
    ],
  },
  {
    title: "A letter to the authorities",
    intro:
      "A formal letter to an authority ('Behörde') follows fixed rules: a 'Betreff' line instead of a title, 'Sehr geehrte Damen und Herren,' with a comma and a lowercase start to the next line, and 'Mit freundlichen Grüßen' with no comma. If you disagree with an official decision ('Bescheid'), you usually have one month to lodge an objection ('Widerspruch').",
    grammar: {
      title: "Building blocks of a formal letter",
      text: "After the comma in the greeting, the first word of the letter is lowercase unless it's a noun.",
      table: [
        ["part", "formula"],
        ["subject line", "Widerspruch gegen Ihren Bescheid vom 3. März"],
        ["greeting", "Sehr geehrte Damen und Herren,"],
        ["opening", "hiermit lege ich Widerspruch gegen … ein."],
        ["request", "Ich bitte Sie, … zu prüfen."],
        ["enclosure", "Eine Kopie des Mietvertrags liegt bei."],
        ["closing", "Mit freundlichen Grüßen"],
      ],
    },
    phrases: [
      p("Sehr geehrte Damen und Herren,", "Dear Sir or Madam,", { note: "Use 'Sehr geehrte Frau …' or 'Sehr geehrter Herr …' when you know the name." }),
      p("Hiermit lege ich Widerspruch gegen Ihren Bescheid ein.", "I hereby lodge an objection to your decision.", { words: [["hiermit", "hereby"], ["Widerspruch einlegen", "lodge an objection"], ["Bescheid", "official decision, notice"]] }),
      p("Ich bitte Sie, meinen Antrag erneut zu prüfen.", "I ask you to review my application again.", { words: [["Antrag", "application"], ["erneut", "again"]] }),
      p("Die erforderlichen Unterlagen füge ich diesem Schreiben bei.", "I enclose the required documents with this letter.", { words: [["erforderlich", "required"], ["beifügen", "enclose"], ["Schreiben", "letter (formal)"]] }),
      p("Für Rückfragen stehe ich Ihnen gern zur Verfügung.", "I'm happy to answer any further questions.", { words: [["Rückfragen", "follow-up questions"], ["zur Verfügung stehen", "be available"]] }),
      p("Ich bitte um eine schriftliche Bestätigung.", "I request written confirmation.", { words: [["Bestätigung", "confirmation"]] }),
      p("Mit freundlichen Grüßen", "Kind regards", { note: "No comma after it in German letters." }),
    ],
    dialogue: [
      tutor("Sie haben einen Bescheid vom Amt bekommen und sind nicht einverstanden. Wie beginnen Sie den Brief?", "You've received a decision from the authority and don't agree. How do you start the letter?"),
      you("Sehr geehrte Damen und Herren, hiermit lege ich Widerspruch gegen Ihren Bescheid ein.", "Open formally and lodge an objection.", ["Hiermit lege ich Widerspruch gegen Ihren Bescheid ein."]),
      tutor("Gut. Und was möchten Sie vom Amt?", "Good. And what do you want the authority to do?"),
      you("Ich bitte Sie, meinen Antrag erneut zu prüfen.", "Ask them to review your application again.", ["Bitte prüfen Sie meinen Antrag erneut."]),
      tutor("Wie beenden Sie das Schreiben?", "How do you end the letter?"),
      you("Für Rückfragen stehe ich Ihnen gern zur Verfügung. Mit freundlichen Grüßen", "Offer to answer questions and close formally.", ["Mit freundlichen Grüßen"]),
    ],
  },
]);
