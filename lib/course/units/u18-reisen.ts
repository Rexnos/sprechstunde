import { defineUnit, p, tutor, you } from "../define";

export const unit18 = defineUnit(18, "A2", "Reisen und Urlaub", "Book a hotel, say where you're going, tell holiday stories and deal with travel problems.", [
  {
    title: "Where are you going? (nach, in, an, zu)",
    intro:
      "German uses different prepositions for 'to' depending on the place. 'nach' is for cities and most countries, 'in' + accusative for countries with an article and for mountains, 'an' + accusative for water, and 'zu' for people and buildings.",
    grammar: {
      title: "Going somewhere: which preposition?",
      text: "Wohin? takes the accusative after in and an. Wo? takes the dative: in den Bergen, am Meer, bei Freunden.",
      table: [
        ["Place", "Wohin?", "Wo?"],
        ["city, country", "nach Spanien", "in Spanien"],
        ["country with article", "in die Schweiz", "in der Schweiz"],
        ["mountains", "in die Berge", "in den Bergen"],
        ["sea, lake", "ans Meer", "am Meer"],
        ["person", "zu meiner Tante", "bei meiner Tante"],
      ],
    },
    phrases: [
      p("Wohin fährst du in den Ferien?", "Where are you going in the holidays?", { words: [["Ferien", "holidays"]] }),
      p("Wir fahren im Sommer ans Meer.", "We're going to the seaside in summer.", { words: [["ans Meer", "to the sea"]], note: "'ans' = 'an das'." }),
      p("Ich fliege nach Italien.", "I'm flying to Italy.", { words: [["fliegen", "fly"]] }),
      p("Im Winter fahren wir in die Berge.", "In winter we go to the mountains.", { words: [["Berge", "mountains"]] }),
      p("Sie reist in die Schweiz.", "She's travelling to Switzerland.", { words: [["reisen", "travel"], ["die Schweiz", "Switzerland"]], note: "A few countries have an article: die Schweiz, die Türkei, die USA." }),
      p("Wir besuchen unsere Freunde und wohnen bei ihnen.", "We're visiting our friends and staying with them.", { words: [["bei ihnen", "at their place"]] }),
      p("Am Wochenende fahre ich zu meinen Eltern.", "At the weekend I'm going to my parents'.", { words: [["zu meinen Eltern", "to my parents'"]] }),
    ],
    dialogue: [
      tutor("Wohin fährst du in den Ferien?", "Where are you going in the holidays?"),
      you("Ich fahre nach {city}.", "Say where you're going.", ["Ich fahre ans Meer.", "Ich fahre in die Berge."]),
      tutor("Toll! Fliegst du oder fährst du mit dem Zug?", "Great! Are you flying or going by train?"),
      you("Ich fliege.", "Say you're flying.", ["Ich fahre mit dem Zug.", "Ich fahre mit dem Auto."]),
      tutor("Wohnst du im Hotel?", "Are you staying in a hotel?"),
      you("Nein, ich wohne bei Freunden.", "Say no, you're staying with friends.", ["Ja, ich wohne im Hotel."]),
    ],
  },
  {
    title: "Booking a hotel room",
    intro:
      "When you book a room you give the dates, the number of people and the kind of room you want. Useful words: das Einzelzimmer, das Doppelzimmer, mit Frühstück, die Übernachtung (one night's stay).",
    phrases: [
      p("Ich möchte ein Doppelzimmer reservieren.", "I'd like to book a double room.", { words: [["Doppelzimmer", "double room"], ["reservieren", "book, reserve"]] }),
      p("Vom zehnten bis zum fünfzehnten Juli.", "From the tenth to the fifteenth of July.", { accept: ["Vom 10. bis zum 15. Juli."], words: [["vom … bis zum", "from … to"]] }),
      p("Was kostet eine Übernachtung?", "How much is one night?", { words: [["Übernachtung", "overnight stay"]] }),
      p("Ist das Frühstück im Preis inklusive?", "Is breakfast included in the price?", { words: [["Preis", "price"], ["inklusive", "included"]] }),
      p("Hat das Zimmer einen Balkon?", "Does the room have a balcony?"),
      p("Wir kommen erst spät am Abend an.", "We won't arrive until late in the evening.", { words: [["erst", "not until"], ["ankommen", "arrive"]] }),
      p("Gibt es im Hotel WLAN?", "Is there wifi in the hotel?", { words: [["WLAN", "wifi"]] }),
    ],
    dialogue: [
      tutor("Hotel Seeblick, guten Tag!", "Hotel Seeblick, hello!"),
      you("Guten Tag, ich möchte ein Doppelzimmer reservieren.", "Say hello and that you'd like to book a double room.", ["Ich möchte ein Einzelzimmer reservieren."]),
      tutor("Gern. Für wann?", "Certainly. For when?"),
      you("Vom zehnten bis zum fünfzehnten Juli.", "Give the dates: from the tenth to the fifteenth of July.", ["Vom 10. bis zum 15. Juli.", "Für {number} Nächte."]),
      tutor("Das geht. Das Zimmer kostet neunzig Euro pro Nacht.", "That's possible. The room costs ninety euros a night."),
      you("Ist das Frühstück im Preis inklusive?", "Ask if breakfast is included.", ["Mit Frühstück?"]),
    ],
  },
  {
    title: "How was your holiday?",
    intro:
      "Holiday stories use the Perfekt you learned in Unit 13. Many travel verbs take 'sein' because they describe movement: Wir sind geflogen, gefahren, geschwommen, gewandert. Remember: 'war' and 'hatte' are usually in the Präteritum.",
    phrases: [
      p("Wie war dein Urlaub?", "How was your holiday?", { words: [["Urlaub", "holiday"]] }),
      p("Wir sind zwei Wochen in Spanien gewesen.", "We spent two weeks in Spain.", { accept: ["Wir sind 2 Wochen in Spanien gewesen."], words: [["gewesen", "been"]] }),
      p("Ich bin jeden Tag im Meer geschwommen.", "I swam in the sea every day.", { words: [["geschwommen", "swum"]] }),
      p("Wir sind viel in den Bergen gewandert.", "We hiked a lot in the mountains.", { words: [["gewandert", "hiked"]] }),
      p("Das Wetter war fantastisch.", "The weather was fantastic."),
      p("Wir haben viele Fotos gemacht.", "We took a lot of photos.", { words: [["Fotos machen", "take photos"]] }),
      p("Leider hat es drei Tage geregnet.", "Unfortunately it rained for three days.", { accept: ["Leider hat es 3 Tage geregnet."], words: [["geregnet", "rained"]] }),
    ],
    dialogue: [
      tutor("Hallo! Wie war dein Urlaub?", "Hi! How was your holiday?"),
      you("Super! Das Wetter war fantastisch.", "Say great, the weather was fantastic.", ["Er war super!", "Leider hat es viel geregnet."]),
      tutor("Wo bist du gewesen?", "Where were you?"),
      you("Ich bin in {country} gewesen.", "Say which country you were in.", ["Ich war in {country}.", "Ich war am Meer."]),
      tutor("Und was hast du gemacht?", "And what did you do?"),
      you("Ich bin jeden Tag im Meer geschwommen.", "Say you swam in the sea every day.", ["Ich bin viel gewandert.", "Ich habe viele Fotos gemacht."]),
    ],
  },
  {
    title: "Travel problems",
    intro:
      "Things go wrong on holiday: a train is late, a suitcase is missing, the room is noisy. Describe the problem politely and say what you need. Many of these sentences use the Perfekt: 'Ich habe meinen Pass verloren.'",
    phrases: [
      p("Mein Zug hat eine Stunde Verspätung.", "My train is an hour late.", { words: [["Verspätung", "delay"]] }),
      p("Ich habe meinen Anschluss verpasst.", "I missed my connection.", { words: [["Anschluss", "connection"], ["verpassen", "miss"]] }),
      p("Mein Koffer ist nicht angekommen.", "My suitcase didn't arrive.", { words: [["Koffer", "suitcase"], ["angekommen", "arrived"]] }),
      p("Ich habe meinen Pass verloren.", "I've lost my passport.", { words: [["Pass", "passport"], ["verloren", "lost"]] }),
      p("Die Heizung in meinem Zimmer funktioniert nicht.", "The heating in my room isn't working.", { words: [["Heizung", "heating"], ["funktionieren", "work"]] }),
      p("Das Zimmer ist leider sehr laut.", "Unfortunately the room is very noisy.", { words: [["laut", "loud, noisy"]] }),
      p("Kann ich ein anderes Zimmer bekommen?", "Can I have a different room?", { words: [["anderes", "other, different"], ["bekommen", "get"]] }),
    ],
    dialogue: [
      tutor("Guten Abend. Wie kann ich Ihnen helfen?", "Good evening. How can I help you?"),
      you("Die Heizung in meinem Zimmer funktioniert nicht.", "Say the heating in your room isn't working.", ["Das Zimmer ist sehr laut.", "Die Dusche funktioniert nicht."]),
      tutor("Oh, das tut mir leid. Welche Zimmernummer haben Sie?", "Oh, I'm sorry. What's your room number?"),
      you("Zimmer {number}.", "Give your room number.", ["Ich habe Zimmer {number}."]),
      tutor("Heute Abend kann leider kein Techniker kommen.", "Unfortunately no technician can come this evening."),
      you("Kann ich ein anderes Zimmer bekommen?", "Ask if you can have a different room.", ["Gibt es ein anderes Zimmer?"]),
    ],
  },
]);
