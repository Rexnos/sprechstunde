import { defineUnit, p, tutor, you } from "../define";

export const unit29 = defineUnit(29, "B1", "Wünsche und Träume", "Talk about wishes, dreams and unreal situations with Konjunktiv II, and give friendly advice.", [
  {
    title: "Wishes: wäre, hätte, würde",
    intro:
      "Konjunktiv II talks about things that aren't real. You already know 'hätte gern' and 'würde' from polite requests. Now use them for wishes: 'Ich wäre gern Pilotin.' 'Ich würde gern um die Welt reisen.' 'Wenn ich doch nur … hätte!' expresses a strong wish.",
    grammar: {
      title: "Konjunktiv II of sein, haben, werden",
      text: "Most verbs use würde + infinitive. sein and haben have their own forms: wäre, hätte.",
      table: [
        ["", "sein", "haben", "werden"],
        ["ich", "wäre", "hätte", "würde"],
        ["du", "wärst", "hättest", "würdest"],
        ["er / sie / es", "wäre", "hätte", "würde"],
        ["wir / sie / Sie", "wären", "hätten", "würden"],
        ["ihr", "wärt", "hättet", "würdet"],
      ],
    },
    phrases: [
      p("Ich wäre gern Schauspielerin.", "I'd like to be an actress.", { words: [["wäre", "would be"], ["Schauspielerin", "actress"]] }),
      p("Ich hätte gern einen großen Garten.", "I'd love to have a big garden.", { words: [["hätte", "would have"]] }),
      p("Wenn ich doch nur mehr Zeit hätte!", "If only I had more time!", { words: [["wenn … doch nur", "if only"]] }),
      p("Ich würde gern um die Welt reisen.", "I'd love to travel around the world.", { words: [["um die Welt", "around the world"]] }),
      p("Wir wären jetzt lieber am Strand.", "We'd rather be at the beach now.", { words: [["lieber", "rather"]] }),
      p("Hättest du gern Kinder?", "Would you like to have children?"),
      p("Mein größter Traum ist ein eigenes Café.", "My biggest dream is a café of my own.", { words: [["Traum", "dream"], ["eigenes", "own"]] }),
    ],
    dialogue: [
      tutor("Was wärst du gern von Beruf?", "What would you like to be?"),
      you("Ich wäre gern {job}.", "Say what you'd like to be.", ["Ich wäre gern Schauspielerin.", "Ich wäre gern Pilot."]),
      tutor("Und was ist dein größter Traum?", "And what's your biggest dream?"),
      you("Ich würde gern um die Welt reisen.", "Say you'd love to travel around the world.", ["Mein größter Traum ist {thing}.", "Ich hätte gern einen großen Garten."]),
      tutor("Warum machst du das nicht?", "Why don't you do it?"),
      you("Wenn ich doch nur mehr Zeit hätte!", "Sigh: if only you had more time!", ["Ich habe keine Zeit.", "Wenn ich doch nur mehr Geld hätte!"]),
    ],
  },
  {
    title: "If I had more time … (unreal conditions)",
    intro:
      "For unreal conditions, put Konjunktiv II in both parts: 'Wenn ich mehr Zeit hätte, würde ich mehr lesen.' The wenn-clause has its verb at the end; the main clause then starts with its verb. Most verbs use 'würde' + infinitive; sein, haben and the modals use their own forms (wäre, hätte, könnte, müsste).",
    grammar: {
      title: "Unreal conditions",
      text: "Compare the real condition 'Wenn ich Zeit habe, lese ich' (and I often do) with the unreal one below (but I don't have time).",
      table: [
        ["wenn-clause (verb at the end)", "main clause (verb first)"],
        ["Wenn ich mehr Geld hätte,", "würde ich ein Haus kaufen."],
        ["Wenn das Wetter besser wäre,", "könnten wir grillen."],
        ["Wenn ich nicht arbeiten müsste,", "würde ich ans Meer fahren."],
      ],
    },
    phrases: [
      p("Wenn ich mehr Zeit hätte, würde ich ein Instrument lernen.", "If I had more time, I'd learn an instrument."),
      p("Wenn ich reich wäre, würde ich nicht mehr arbeiten.", "If I were rich, I wouldn't work anymore.", { words: [["reich", "rich"]] }),
      p("Wenn das Wetter besser wäre, könnten wir grillen.", "If the weather were better, we could have a barbecue.", { words: [["grillen", "have a barbecue"]] }),
      p("Was würdest du machen, wenn du im Lotto gewinnen würdest?", "What would you do if you won the lottery?", { words: [["im Lotto gewinnen", "win the lottery"]] }),
      p("Ich würde meiner Familie ein Haus kaufen.", "I'd buy my family a house."),
      p("Wenn ich nicht arbeiten müsste, würde ich ans Meer fahren.", "If I didn't have to work, I'd go to the sea.", { words: [["müsste", "would have to"]] }),
      p("Das wäre schön!", "That would be nice!"),
    ],
    dialogue: [
      tutor("Was würdest du machen, wenn du im Lotto gewinnen würdest?", "What would you do if you won the lottery?"),
      you("Ich würde meiner Familie ein Haus kaufen.", "Say you'd buy your family a house.", ["Ich würde um die Welt reisen.", "Ich würde nicht mehr arbeiten."]),
      tutor("Und wenn du mehr Zeit hättest?", "And if you had more time?"),
      you("Wenn ich mehr Zeit hätte, würde ich ein Instrument lernen.", "Say if you had more time, you'd learn an instrument.", ["Dann würde ich ein Instrument lernen.", "Wenn ich mehr Zeit hätte, würde ich {thing}."]),
      tutor("Heute ist das Wetter leider schlecht.", "Unfortunately the weather is bad today."),
      you("Schade! Wenn das Wetter besser wäre, könnten wir grillen.", "Say it's a pity: if the weather were better, you could have a barbecue.", ["Wenn das Wetter besser wäre, könnten wir grillen."]),
    ],
  },
  {
    title: "Giving advice",
    intro:
      "Konjunktiv II is the standard way to give advice gently: 'An deiner Stelle würde ich …' (If I were you, I'd …), 'Du solltest …' (You should …), 'Es wäre besser, wenn …'. It sounds much friendlier than an imperative.",
    phrases: [
      p("An deiner Stelle würde ich mit dem Chef sprechen.", "If I were you, I'd talk to the boss.", { words: [["an deiner Stelle", "in your place, if I were you"]] }),
      p("Du solltest mehr schlafen.", "You should sleep more.", { words: [["solltest", "should"]] }),
      p("Wenn ich du wäre, würde ich die Wohnung nehmen.", "If I were you, I'd take the flat."),
      p("Es wäre besser, wenn du heute zu Hause bleibst.", "It would be better if you stayed at home today."),
      p("Sie sollten nicht so viel arbeiten.", "You shouldn't work so much."),
      p("Hast du einen Rat für mich?", "Do you have any advice for me?", { words: [["Rat", "advice"]] }),
      p("Was würden Sie mir empfehlen?", "What would you recommend?", { words: [["empfehlen", "recommend"]] }),
    ],
    dialogue: [
      tutor("Ich bin immer so müde. Hast du einen Rat für mich?", "I'm always so tired. Do you have any advice for me?"),
      you("Du solltest mehr schlafen.", "Say they should sleep more.", ["Du solltest weniger arbeiten.", "Du solltest mehr Sport machen."]),
      tutor("Und mein Chef gibt mir so viel Arbeit!", "And my boss gives me so much work!"),
      you("An deiner Stelle würde ich mit dem Chef sprechen.", "Say that if you were them, you'd talk to the boss.", ["Wenn ich du wäre, würde ich mit dem Chef sprechen."]),
      tutor("Heute habe ich auch noch Kopfschmerzen.", "And today I've got a headache too."),
      you("Es wäre besser, wenn du heute zu Hause bleibst.", "Say it would be better if they stayed at home today.", ["Du solltest zu Hause bleiben."]),
    ],
  },
  {
    title: "Daydreams: könnte, müsste, dürfte",
    intro:
      "Konjunktiv II of the modal verbs is perfect for daydreaming: 'könnte' (could), 'müsste' (would have to), 'dürfte' (would be allowed to). 'Ich wünschte, …' (I wish …) is followed by Konjunktiv II too: 'Ich wünschte, ich hätte mehr Mut.'",
    grammar: {
      title: "Konjunktiv II of modal verbs",
      text: "Take the Präteritum (konnte, musste, durfte) and add an umlaut.",
      table: [
        ["", "können", "müssen", "dürfen"],
        ["ich / er / sie", "könnte", "müsste", "dürfte"],
        ["du", "könntest", "müsstest", "dürftest"],
        ["wir / sie / Sie", "könnten", "müssten", "dürften"],
      ],
    },
    phrases: [
      p("Stell dir vor, wir würden auf einer Insel leben!", "Imagine if we lived on an island!", { words: [["sich vorstellen", "imagine"], ["Insel", "island"]] }),
      p("Dann könnten wir jeden Tag schwimmen.", "Then we could swim every day.", { words: [["könnten", "could"]] }),
      p("Ich müsste nie wieder früh aufstehen.", "I'd never have to get up early again.", { words: [["nie wieder", "never again"]] }),
      p("Es wäre toll, wenn wir uns öfter sehen könnten.", "It would be great if we could see each other more often."),
      p("Ich wünschte, ich könnte fliegen.", "I wish I could fly.", { words: [["ich wünschte", "I wish"]] }),
      p("Das klingt zu schön, um wahr zu sein.", "That sounds too good to be true.", { words: [["klingen", "sound"], ["wahr", "true"]] }),
      p("Träum weiter!", "Dream on!"),
    ],
    dialogue: [
      tutor("Stell dir vor, wir würden auf einer Insel leben!", "Imagine if we lived on an island!"),
      you("Dann könnten wir jeden Tag schwimmen.", "Say then you could swim every day.", ["Das wäre toll!", "Dann könnten wir jeden Tag am Strand liegen."]),
      tutor("Und wir müssten nie wieder arbeiten.", "And we'd never have to work again."),
      you("Das klingt zu schön, um wahr zu sein.", "Say that sounds too good to be true.", ["Das wäre schön!", "Träum weiter!"]),
      tutor("Ich wünschte, ich könnte fliegen.", "I wish I could fly."),
      you("Träum weiter!", "Tease them: dream on!", ["Ich auch!", "Ich wünschte, ich könnte das auch."]),
    ],
  },
]);
