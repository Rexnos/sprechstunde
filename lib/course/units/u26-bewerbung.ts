import { defineUnit, p, tutor, you } from "../define";

export const unit26 = defineUnit(26, "B1", "Bewerbung und Beruf", "Talk about your CV, write a cover letter and formal emails, handle a job interview, and express contrast with obwohl and trotzdem.", [
  {
    title: "Your CV (Lebenslauf)",
    intro:
      "A German CV ('Lebenslauf') is usually set out as a table, newest first, with sections like 'Berufserfahrung' (work experience), 'Ausbildung' (education, training) and 'Kenntnisse' (skills). When you talk about it, you use the Perfekt, plus 'von … bis' for periods of time.",
    phrases: [
      p("Von 2018 bis 2021 habe ich Informatik studiert.", "From 2018 to 2021 I studied computer science.", { accept: ["Von zweitausendachtzehn bis zweitausendeinundzwanzig habe ich Informatik studiert."], words: [["Informatik", "computer science"]] }),
      p("Danach habe ich eine Ausbildung zum Mechaniker gemacht.", "After that I trained as a mechanic.", { words: [["Ausbildung", "vocational training"], ["zum Mechaniker", "as a mechanic"], ["Mechaniker", "mechanic"]], note: "You do an 'Ausbildung zum/zur …' (training to become …); 'als' is also heard in speech." }),
      p("Ich habe zwei Jahre im Vertrieb gearbeitet.", "I worked in sales for two years.", { accept: ["Ich habe 2 Jahre im Vertrieb gearbeitet."], words: [["Vertrieb", "sales"]] }),
      p("Meine Muttersprache ist Arabisch.", "My native language is Arabic.", { words: [["Muttersprache", "native language"]] }),
      p("Ich habe gute Kenntnisse in Excel.", "I have a good knowledge of Excel.", { words: [["Kenntnisse", "knowledge, skills"]] }),
      p("Ich habe ein Praktikum bei einer Bank gemacht.", "I did an internship at a bank.", { words: [["Praktikum", "internship"]] }),
      p("Ich bin teamfähig und arbeite gern selbstständig.", "I'm a team player and like working independently.", { words: [["teamfähig", "good in a team"], ["selbstständig", "independently"]] }),
    ],
    dialogue: [
      tutor("Erzählen Sie mir von Ihrer Ausbildung.", "Tell me about your education."),
      you("Von 2018 bis 2021 habe ich {thing} studiert.", "Say what you studied from 2018 to 2021.", ["Ich habe {thing} studiert.", "Ich habe eine Ausbildung als {job} gemacht."]),
      tutor("Und Ihre Berufserfahrung?", "And your work experience?"),
      you("Ich habe zwei Jahre im Vertrieb gearbeitet.", "Say you worked in sales for two years.", ["Ich habe {number} Jahre als {job} gearbeitet.", "Ich habe ein Praktikum bei einer Bank gemacht."]),
      tutor("Welche Sprachen sprechen Sie?", "Which languages do you speak?"),
      you("Meine Muttersprache ist {language}, und ich spreche Deutsch und Englisch.", "Say what your native language is and that you speak German and English.", ["Meine Muttersprache ist {language}."]),
    ],
  },
  {
    title: "The cover letter (Anschreiben)",
    intro:
      "A cover letter ('Anschreiben') uses fixed formal phrases. You open with 'Sehr geehrte Frau …,' or 'Sehr geehrter Herr …,', say which job you're applying for and why you're a good fit, and close with 'Mit freundlichen Grüßen'. The formal 'Sie' and 'Ihr' are always capitalised.",
    phrases: [
      p("Sehr geehrte Damen und Herren,", "Dear Sir or Madam,", { note: "Use this when you don't know the name. After the comma, the letter continues with a small letter." }),
      p("Hiermit bewerbe ich mich um die Stelle als Verkäuferin.", "I hereby apply for the position of sales assistant.", { words: [["hiermit", "hereby"], ["Verkäuferin", "sales assistant (female)"]] }),
      p("Ich habe Ihre Anzeige im Internet gelesen.", "I read your advertisement on the internet.", { words: [["Anzeige", "advertisement"]] }),
      p("Die Stelle interessiert mich sehr.", "I'm very interested in the position.", { words: [["interessieren", "interest"]] }),
      p("Ich bin zuverlässig, flexibel und lerne schnell.", "I'm reliable, flexible and learn quickly.", { words: [["zuverlässig", "reliable"]] }),
      p("Über eine Einladung zu einem Vorstellungsgespräch freue ich mich sehr.", "I would be very pleased to be invited to an interview.", { words: [["Einladung", "invitation"], ["Vorstellungsgespräch", "job interview"]] }),
      p("Mit freundlichen Grüßen", "Kind regards", { note: "The standard closing of any formal letter or email. No comma after it." }),
    ],
    dialogue: [
      tutor("Wie fangen wir den Brief an?", "How do we start the letter?"),
      you("Sehr geehrte Damen und Herren,", "Give the formal opening for when you don't know the name.", ["Sehr geehrte Frau {name},", "Sehr geehrter Herr {name},"]),
      tutor("Gut. Und der erste Satz?", "Good. And the first sentence?"),
      you("Hiermit bewerbe ich mich um die Stelle als {job}.", "Say you hereby apply for the position (name the job).", ["Ich bewerbe mich um die Stelle als {job}."]),
      tutor("Und wie endet der Brief?", "And how does the letter end?"),
      you("Mit freundlichen Grüßen", "Give the standard formal closing.", ["Mit freundlichen Grüßen {name}"]),
    ],
  },
  {
    title: "The interview: obwohl and trotzdem",
    intro:
      "'Obwohl' (although) starts a subordinate clause, so the verb goes to the end: 'Obwohl ich wenig Erfahrung habe, lerne ich schnell.' 'Trotzdem' (nevertheless, still) is an adverb: it sits in position 1 or right after the verb, and the verb stays in position 2. Both are handy for turning a weakness into a strength.",
    grammar: {
      title: "obwohl vs. trotzdem",
      text: "Same meaning, different word order.",
      table: [
        ["Word", "Word order", "Example"],
        ["obwohl", "verb at the end", "Obwohl die Arbeit hart ist, macht sie mir Spaß."],
        ["trotzdem", "verb in position 2", "Die Arbeit ist hart. Trotzdem macht sie mir Spaß."],
      ],
    },
    phrases: [
      p("Obwohl ich wenig Erfahrung habe, lerne ich sehr schnell.", "Although I have little experience, I learn very quickly.", { words: [["obwohl", "although"], ["Erfahrung", "experience"]] }),
      p("Die Bezahlung ist nicht so gut, trotzdem gefällt mir die Arbeit.", "The pay isn't that good; nevertheless I like the work.", { words: [["Bezahlung", "pay"], ["trotzdem", "nevertheless"]] }),
      p("Obwohl ich müde war, bin ich zur Arbeit gegangen.", "Although I was tired, I went to work."),
      p("Ich hatte Fieber, trotzdem bin ich ins Büro gefahren.", "I had a temperature, but I still drove to the office."),
      p("Warum möchten Sie bei uns arbeiten?", "Why would you like to work for us?"),
      p("Was sind Ihre Stärken und Schwächen?", "What are your strengths and weaknesses?", { words: [["Stärken", "strengths"], ["Schwächen", "weaknesses"]] }),
      p("Manchmal bin ich zu ungeduldig, aber ich arbeite daran.", "Sometimes I'm too impatient, but I'm working on it.", { words: [["ungeduldig", "impatient"], ["daran", "on it"]] }),
    ],
    dialogue: [
      tutor("Warum möchten Sie bei uns arbeiten?", "Why would you like to work for us?"),
      you("Ihre Firma ist sehr modern und die Stelle interessiert mich.", "Say their company is very modern and the job interests you.", ["Die Stelle interessiert mich sehr."]),
      tutor("Sie haben aber wenig Erfahrung.", "But you have little experience."),
      you("Obwohl ich wenig Erfahrung habe, lerne ich sehr schnell.", "Say that although you have little experience, you learn very quickly.", ["Das stimmt, trotzdem lerne ich sehr schnell.", "Ich lerne sehr schnell."]),
      tutor("Was ist Ihre größte Schwäche?", "What's your biggest weakness?"),
      you("Manchmal bin ich zu ungeduldig, aber ich arbeite daran.", "Say sometimes you're too impatient, but you're working on it.", ["Ich bin manchmal zu ungeduldig."]),
    ],
  },
  {
    title: "Formal emails",
    intro:
      "Formal emails follow the same rules as letters but are shorter. Useful building blocks: 'Ich schreibe Ihnen, weil …', 'Könnten Sie mir bitte mitteilen, …', 'Im Anhang finden Sie …' and 'Ich freue mich auf Ihre Antwort.' End with 'Mit freundlichen Grüßen' or the slightly warmer 'Viele Grüße'.",
    phrases: [
      p("Ich schreibe Ihnen, weil ich eine Frage zur Stelle habe.", "I'm writing to you because I have a question about the position."),
      p("Im Anhang finden Sie meinen Lebenslauf.", "Please find my CV attached.", { words: [["im Anhang", "attached"], ["Lebenslauf", "CV"]] }),
      p("Könnten Sie mir bitte mitteilen, wann das Gespräch stattfindet?", "Could you please let me know when the interview takes place?", { words: [["mitteilen", "let know, inform"], ["stattfinden", "take place"]] }),
      p("Leider kann ich den Termin am Montag nicht wahrnehmen.", "Unfortunately I can't make the appointment on Monday.", { words: [["einen Termin wahrnehmen", "keep an appointment"]] }),
      p("Vielen Dank für Ihre schnelle Antwort.", "Thank you very much for your quick reply.", { words: [["Antwort", "reply"]] }),
      p("Ich freue mich auf Ihre Antwort.", "I look forward to your reply.", { words: [["sich freuen auf", "look forward to"]] }),
      p("Viele Grüße", "Best wishes", { note: "Friendly but still polite; fine once you've exchanged a few emails." }),
    ],
    dialogue: [
      tutor("Sie haben eine E-Mail von der Firma bekommen. Wie beginnen Sie Ihre Antwort?", "You've got an email from the company. How do you start your reply?"),
      you("Vielen Dank für Ihre schnelle Antwort.", "Thank them for their quick reply.", ["Vielen Dank für Ihre E-Mail."]),
      tutor("Das Gespräch ist am Montag. Passt das?", "The interview is on Monday. Does that work?"),
      you("Leider kann ich den Termin am Montag nicht wahrnehmen.", "Say unfortunately you can't make Monday's appointment.", ["Leider kann ich am Montag nicht.", "Ja, der Termin passt gut."]),
      tutor("Haben Sie Ihren Lebenslauf schon geschickt?", "Have you sent your CV yet?"),
      you("Ja, im Anhang finden Sie meinen Lebenslauf.", "Say yes, the CV is attached.", ["Im Anhang finden Sie meinen Lebenslauf."]),
    ],
  },
]);
