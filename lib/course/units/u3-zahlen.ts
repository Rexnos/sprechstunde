import { defineUnit, p, tutor, you } from "../define";

export const unit3 = defineUnit(3, "A1", "Zahlen und Zeit", "Count, say your age and phone number, tell the time and name the days.", [
  {
    title: "Numbers 0 to 20",
    intro:
      "Numbers from 0 to 12 have their own names. From 13 to 19 you add '-zehn' (ten): drei + zehn = dreizehn. Note sechzehn and siebzehn lose some letters.",
    phrases: [
      p("null, eins, zwei, drei", "0, 1, 2, 3", { accept: ["0 1 2 3"] }),
      p("vier, fünf, sechs, sieben", "4, 5, 6, 7", { accept: ["4 5 6 7"] }),
      p("acht, neun, zehn", "8, 9, 10", { accept: ["8 9 10"] }),
      p("elf, zwölf", "11, 12", { accept: ["11 12"] }),
      p("dreizehn, vierzehn, fünfzehn", "13, 14, 15", { accept: ["13 14 15"] }),
      p("sechzehn, siebzehn", "16, 17", { accept: ["16 17"] }),
      p("achtzehn, neunzehn, zwanzig", "18, 19, 20", { accept: ["18 19 20"] }),
    ],
    dialogue: [
      tutor("Eins, zwei, drei …", "One, two, three …"),
      you("vier, fünf, sechs", "Continue: four, five, six.", ["4 5 6"]),
      tutor("Sehr gut! Sieben, acht …", "Very good! Seven, eight …"),
      you("neun, zehn", "Continue: nine, ten.", ["9 10"]),
      tutor("Und nach zwölf?", "And after twelve?"),
      you("dreizehn", "Say thirteen.", ["13"]),
    ],
  },
  {
    title: "Age and phone numbers",
    intro:
      "From 21, German says the ones before the tens: 21 is 'einundzwanzig' (one-and-twenty). Age uses sein: 'Ich bin 30 Jahre alt.' Phone numbers are usually read digit by digit or in pairs.",
    grammar: {
      title: "Tens",
      text: "Ones + und + tens, written as one word.",
      table: [
        ["20 zwanzig", "21 einundzwanzig", "25 fünfundzwanzig"],
        ["30 dreißig", "40 vierzig", "50 fünfzig"],
        ["60 sechzig", "70 siebzig", "100 hundert"],
      ],
    },
    phrases: [
      p("Wie alt bist du?", "How old are you? (casual)", { words: [["wie alt", "how old"], ["bist", "are"], ["du", "you"]] }),
      p("Ich bin fünfundzwanzig Jahre alt.", "I'm 25 years old.", { accept: ["Ich bin 25 Jahre alt."], note: "Not 'Ich habe 25 Jahre'. Age uses sein." }),
      p("Ich bin dreißig.", "I'm thirty.", { accept: ["Ich bin 30."] }),
      p("Wie ist deine Telefonnummer?", "What's your phone number?", { words: [["deine", "your"], ["Telefonnummer", "phone number"]] }),
      p("Meine Nummer ist null, eins, fünf, sieben.", "My number is 0-1-5-7.", { accept: ["Meine Nummer ist 0 1 5 7."] }),
      p("Noch einmal, bitte.", "Once more, please.", { words: [["noch einmal", "once more"]] }),
      p("Langsam, bitte.", "Slowly, please."),
    ],
    dialogue: [
      tutor("Wie alt bist du?", "How old are you?"),
      you("Ich bin {age} Jahre alt.", "Say your age.", ["Ich bin {age}."]),
      tutor("Und wie ist deine Telefonnummer?", "And what's your phone number?"),
      you("Noch einmal, bitte.", "You didn't catch that. Ask her to say it once more.", ["Wie bitte?"]),
      tutor("Wie ist deine Telefonnummer?", "What's your phone number?"),
      you("Meine Nummer ist {number}.", "Give a phone number."),
    ],
  },
  {
    title: "What time is it?",
    intro:
      "In everyday speech, times like 'halb drei' mean half TO three (2:30), not half past. For schedules, Germans use the 24-hour clock: 'Es ist vierzehn Uhr' (14:00).",
    phrases: [
      p("Wie spät ist es?", "What time is it?", { words: [["wie spät", "how late"], ["ist es", "is it"]] }),
      p("Es ist acht Uhr.", "It's eight o'clock.", { accept: ["Es ist 8 Uhr."] }),
      p("Es ist Viertel nach drei.", "It's quarter past three.", { words: [["Viertel", "quarter"], ["nach", "after"]], accept: ["Es ist Viertel nach 3."] }),
      p("Es ist halb vier.", "It's half past three (3:30).", { note: "halb vier = half TO four.", accept: ["Es ist halb 4."] }),
      p("Es ist Viertel vor fünf.", "It's quarter to five.", { words: [["vor", "before"]], accept: ["Es ist Viertel vor 5."] }),
      p("Um wie viel Uhr?", "At what time?"),
      p("Um neun Uhr.", "At nine o'clock.", { accept: ["Um 9 Uhr."] }),
    ],
    dialogue: [
      tutor("Entschuldigung, wie spät ist es?", "Excuse me, what time is it?"),
      you("Es ist halb drei.", "Tell him it's 2:30.", ["Es ist halb 3.", "Halb drei."]),
      tutor("Danke! Der Zug kommt um drei Uhr.", "Thanks! The train comes at three o'clock."),
      you("Um drei Uhr? Okay.", "Repeat: at three o'clock? Okay.", ["Um drei Uhr?", "Um 3 Uhr?"]),
    ],
  },
  {
    title: "Days of the week",
    intro:
      "All days end in '-tag' except Mittwoch (mid-week). 'Am Montag' means 'on Monday'. 'Heute' is today, 'morgen' is tomorrow.",
    phrases: [
      p("Montag, Dienstag, Mittwoch", "Monday, Tuesday, Wednesday"),
      p("Donnerstag, Freitag", "Thursday, Friday"),
      p("Samstag, Sonntag", "Saturday, Sunday"),
      p("Heute ist Montag.", "Today is Monday.", { words: [["heute", "today"], ["ist", "is"]] }),
      p("Morgen ist Dienstag.", "Tomorrow is Tuesday."),
      p("Am Wochenende habe ich frei.", "I'm off at the weekend.", { words: [["am Wochenende", "at the weekend"], ["habe frei", "have free time"]] }),
      p("Welcher Tag ist heute?", "What day is it today?"),
    ],
    dialogue: [
      tutor("Welcher Tag ist heute?", "What day is it today?"),
      you("Heute ist {day}.", "Say today's day."),
      tutor("Und morgen?", "And tomorrow?"),
      you("Morgen ist {day}.", "Say tomorrow's day."),
      tutor("Hast du am Wochenende frei?", "Are you off at the weekend?"),
      you("Ja, am Wochenende habe ich frei.", "Say yes, you're off at the weekend.", ["Ja.", "Ja, ich habe frei."]),
    ],
  },
]);
