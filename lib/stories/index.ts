// Short original A1 stories, one per course unit, read aloud by the local voice.
// Every non-function word has a glossary entry so tapping any word shows a meaning.

export type StorySentence = { de: string; en: string };
export type StoryQuestion = { q: string; options: string[]; answer: string };
export type Story = {
  id: string;
  unitId: string;
  title: string;
  blurb: string;
  sentences: StorySentence[];
  glossary: Record<string, string>;
  questions: StoryQuestion[];
};

/** Small words learners meet everywhere; they don't need a glossary entry. */
export const FUNCTION_WORDS = new Set(
  "ich du er sie es wir ihr und oder aber der die das den dem ein eine einen ist bin bist sind nicht auch sehr ja nein in im ins mit zu zum zur am an auf aus von bei nach um für so dann noch hier was wie wo".split(" "),
);

const s = (de: string, en: string): StorySentence => ({ de, en });
const q = (question: string, answer: string, ...others: string[]): StoryQuestion => ({ q: question, options: [answer, ...others], answer });

export const STORIES: Story[] = [
  {
    id: "guten-morgen",
    unitId: "u1",
    title: "Guten Morgen, Herr Braun!",
    blurb: "Anna meets her neighbour on the way to work.",
    sentences: [
      s("Es ist Montag.", "It's Monday."),
      s("Anna geht zur Arbeit.", "Anna is going to work."),
      s("Sie sieht Herrn Braun.", "She sees Mr Braun."),
      s("„Guten Morgen, Herr Braun! Wie geht es Ihnen?“", "“Good morning, Mr Braun! How are you?”"),
      s("„Gut, danke. Und Ihnen?“", "“Good, thanks. And you?”"),
      s("„Sehr gut, danke!“", "“Very good, thanks!”"),
      s("Am Abend sagt Anna: „Tschüss! Bis morgen!“", "In the evening Anna says: “Bye! See you tomorrow!”"),
    ],
    glossary: {
      montag: "Monday", anna: "Anna (name)", geht: "goes", arbeit: "work", sieht: "sees", herrn: "Mr (after a verb)", braun: "Braun (surname)",
      guten: "good", morgen: "morning; tomorrow", herr: "Mr", ihnen: "you (polite)", gut: "good", danke: "thanks", abend: "evening",
      sagt: "says", tschüss: "bye", bis: "until, see you",
    },
    questions: [
      q("What day is it?", "Monday", "Friday", "Sunday"),
      q("How is Mr Braun?", "Good", "Not so good", "Tired"),
      q("What does Anna say in the evening?", "Bye, see you tomorrow", "Good morning", "Thank you very much"),
    ],
  },
  {
    id: "neu-in-berlin",
    unitId: "u2",
    title: "Neu in Berlin",
    blurb: "Ravi introduces himself and his new neighbour.",
    sentences: [
      s("Ich heiße Ravi.", "My name is Ravi."),
      s("Ich komme aus Indien.", "I'm from India."),
      s("Jetzt wohne ich in Berlin.", "Now I live in Berlin."),
      s("Ich arbeite als Entwickler.", "I work as a developer."),
      s("Ich spreche Englisch und ein bisschen Deutsch.", "I speak English and a little German."),
      s("Meine Nachbarin heißt Jana.", "My neighbour is called Jana."),
      s("Sie kommt aus Hamburg.", "She comes from Hamburg."),
      s("Jana ist Lehrerin.", "Jana is a teacher."),
    ],
    glossary: {
      heiße: "am called", ravi: "Ravi (name)", komme: "come", indien: "India", jetzt: "now", wohne: "live", berlin: "Berlin",
      arbeite: "work", als: "as", entwickler: "developer", spreche: "speak", englisch: "English", bisschen: "bit (ein bisschen = a little)",
      deutsch: "German", meine: "my", nachbarin: "neighbour (female)", heißt: "is called", jana: "Jana (name)", kommt: "comes",
      hamburg: "Hamburg", lehrerin: "teacher (female)",
    },
    questions: [
      q("Where is Ravi from?", "India", "Germany", "England"),
      q("What is Ravi's job?", "Developer", "Teacher", "Student"),
      q("Who is Jana?", "His neighbour", "His sister", "His boss"),
    ],
  },
  {
    id: "wie-spaet",
    unitId: "u3",
    title: "Hast du heute Zeit?",
    blurb: "Tom's Saturday and a phone call from Lena.",
    sentences: [
      s("Heute ist Samstag.", "Today is Saturday."),
      s("Tom ist zwanzig Jahre alt.", "Tom is twenty years old."),
      s("Er hat am Wochenende frei.", "He's off at the weekend."),
      s("Um zehn Uhr trinkt er Kaffee.", "At ten o'clock he drinks coffee."),
      s("Um halb drei ruft Lena an.", "At half past two Lena calls."),
      s("„Hast du heute Zeit?“", "“Do you have time today?”"),
      s("„Ja! Um sieben Uhr?“", "“Yes! At seven o'clock?”"),
      s("„Super, bis um sieben!“", "“Great, see you at seven!”"),
    ],
    glossary: {
      heute: "today", samstag: "Saturday", tom: "Tom (name)", zwanzig: "twenty", jahre: "years", alt: "old", hat: "has",
      wochenende: "weekend", frei: "free, off", zehn: "ten", uhr: "o'clock", trinkt: "drinks", kaffee: "coffee",
      halb: "half (halb drei = 2:30)", drei: "three", ruft: "calls (ruft … an = phones)", lena: "Lena (name)", hast: "have",
      zeit: "time", sieben: "seven", super: "great", bis: "until, see you",
    },
    questions: [
      q("How old is Tom?", "20", "12", "30"),
      q("When does Lena call?", "At 2:30", "At 3:30", "At 10:00"),
      q("When do they meet?", "At 7 o'clock", "At 10 o'clock", "At half past two"),
    ],
  },
  {
    id: "im-cafe",
    unitId: "u4",
    title: "Im Café am Montag",
    blurb: "Lena orders coffee and cake and pays.",
    sentences: [
      s("Lena geht ins Café.", "Lena goes to the café."),
      s("Der Kellner fragt: „Was möchten Sie?“", "The waiter asks: “What would you like?”"),
      s("„Ich möchte einen Kaffee mit Milch, bitte.“", "“I'd like a coffee with milk, please.”"),
      s("„Und ein Stück Apfelkuchen.“", "“And a piece of apple cake.”"),
      s("Der Kuchen schmeckt sehr gut.", "The cake tastes very good."),
      s("„Zahlen, bitte! Was kostet das?“", "“The bill, please! How much is it?”"),
      s("„Sechs Euro fünfzig.“", "“Six euros fifty.”"),
      s("Lena zahlt mit Karte.", "Lena pays by card."),
    ],
    glossary: {
      lena: "Lena (name)", geht: "goes", café: "café", kellner: "waiter", fragt: "asks", möchten: "would like (polite)", möchte: "would like",
      kaffee: "coffee", milch: "milk", bitte: "please", stück: "piece", apfelkuchen: "apple cake", kuchen: "cake", schmeckt: "tastes",
      gut: "good", zahlen: "to pay (Zahlen, bitte = the bill, please)", kostet: "costs", sechs: "six", euro: "euro(s)", fünfzig: "fifty",
      zahlt: "pays", karte: "card",
    },
    questions: [
      q("What does Lena drink?", "Coffee with milk", "Tea", "Water"),
      q("How much does it cost?", "6.50 €", "5.60 €", "7.00 €"),
      q("How does Lena pay?", "By card", "In cash", "She doesn't pay"),
    ],
  },
  {
    id: "neue-jacke",
    unitId: "u5",
    title: "Eine neue Jacke",
    blurb: "Max goes shopping for a jacket.",
    sentences: [
      s("Max sucht eine Jacke.", "Max is looking for a jacket."),
      s("Im Geschäft sind viele Jacken.", "There are lots of jackets in the shop."),
      s("Die rote Jacke gefällt ihm.", "He likes the red jacket."),
      s("Aber sie ist zu klein.", "But it's too small."),
      s("„Haben Sie das auch in Größe L?“", "“Do you also have this in size L?”"),
      s("„Ja, aber nur in Blau.“", "“Yes, but only in blue.”"),
      s("Max probiert die blaue Jacke an.", "Max tries on the blue jacket."),
      s("Sie passt gut. Er nimmt sie.", "It fits well. He takes it."),
    ],
    glossary: {
      max: "Max (name)", sucht: "looks for", jacke: "jacket", geschäft: "shop", viele: "many", jacken: "jackets", rote: "red",
      gefällt: "pleases (gefällt ihm = he likes)", ihm: "him", klein: "small", haben: "have", größe: "size", l: "L (size)", nur: "only",
      blau: "blue", probiert: "tries (probiert … an = tries on)", blaue: "blue", passt: "fits", gut: "well, good", nimmt: "takes",
    },
    questions: [
      q("What is Max looking for?", "A jacket", "Shoes", "A bag"),
      q("What's wrong with the red jacket?", "It's too small", "It's too expensive", "He doesn't like the colour"),
      q("Which jacket does Max take?", "The blue one", "The red one", "None"),
    ],
  },
  {
    id: "meine-familie",
    unitId: "u6",
    title: "Meine Familie",
    blurb: "Raj and Priya's child talks about the family.",
    sentences: [
      s("Das ist meine Familie.", "This is my family."),
      s("Mein Vater heißt Raj und meine Mutter heißt Priya.", "My father is called Raj and my mother is called Priya."),
      s("Ich habe einen Bruder und eine Schwester.", "I have a brother and a sister."),
      s("Mein Bruder ist groß und lustig.", "My brother is tall and funny."),
      s("Meine Schwester ist zehn Jahre alt.", "My sister is ten years old."),
      s("Wir haben einen Hund.", "We have a dog."),
      s("Am Sonntag kochen wir zusammen.", "On Sunday we cook together."),
    ],
    glossary: {
      meine: "my", mein: "my", familie: "family", vater: "father", heißt: "is called", raj: "Raj (name)", mutter: "mother",
      priya: "Priya (name)", habe: "have", bruder: "brother", schwester: "sister", groß: "tall, big", lustig: "funny", zehn: "ten",
      jahre: "years", alt: "old", haben: "have", hund: "dog", sonntag: "Sunday", kochen: "cook", zusammen: "together",
    },
    questions: [
      q("How many brothers and sisters does the speaker have?", "Two", "One", "None"),
      q("How old is her sister?", "10", "12", "20"),
      q("What does the family do on Sunday?", "They cook together", "They go to the cinema", "They work"),
    ],
  },
  {
    id: "saras-tag",
    unitId: "u7",
    title: "Ein Tag von Sara",
    blurb: "Sara's working day, from getting up to going to bed.",
    sentences: [
      s("Sara steht um sechs Uhr auf.", "Sara gets up at six o'clock."),
      s("Sie duscht und frühstückt.", "She showers and has breakfast."),
      s("Um sieben Uhr fährt sie mit dem Bus zur Arbeit.", "At seven she takes the bus to work."),
      s("Die Arbeit fängt um acht Uhr an.", "Work starts at eight."),
      s("Am Mittag isst sie in der Kantine.", "At noon she eats in the canteen."),
      s("Nach der Arbeit kauft sie ein.", "After work she goes shopping."),
      s("Am Abend kocht sie und liest ein Buch.", "In the evening she cooks and reads a book."),
      s("Um zehn Uhr geht sie ins Bett.", "At ten she goes to bed."),
    ],
    glossary: {
      sara: "Sara (name)", steht: "stands (steht … auf = gets up)", sechs: "six", uhr: "o'clock", duscht: "showers",
      frühstückt: "has breakfast", sieben: "seven", fährt: "goes, rides", bus: "bus", arbeit: "work", fängt: "catches (fängt … an = starts)",
      acht: "eight", mittag: "noon", isst: "eats", kantine: "canteen", kauft: "buys (kauft ein = goes shopping)", ein: "a; (kauft ein = shops)",
      abend: "evening", kocht: "cooks", liest: "reads", buch: "book", zehn: "ten", geht: "goes", bett: "bed",
    },
    questions: [
      q("When does Sara get up?", "At 6", "At 7", "At 8"),
      q("How does she get to work?", "By bus", "By car", "On foot"),
      q("What does she do in the evening?", "She cooks and reads", "She goes to the cinema", "She works"),
    ],
  },
  {
    id: "zum-bahnhof",
    unitId: "u8",
    title: "Zum Bahnhof",
    blurb: "Paul finds the station in Munich, and then there's a delay.",
    sentences: [
      s("Paul ist in München.", "Paul is in Munich."),
      s("Er muss zum Bahnhof gehen.", "He has to go to the station."),
      s("„Entschuldigung, wo ist der Bahnhof?“", "“Excuse me, where is the station?”"),
      s("„Gehen Sie geradeaus und dann links.“", "“Go straight ahead and then left.”"),
      s("„Ist das weit?“ „Nein, nur zehn Minuten.“", "“Is it far?” “No, only ten minutes.”"),
      s("Am Bahnhof kauft Paul eine Fahrkarte nach Berlin.", "At the station Paul buys a ticket to Berlin."),
      s("Der Zug fährt von Gleis drei.", "The train leaves from platform three."),
      s("Aber der Zug hat Verspätung!", "But the train is delayed!"),
    ],
    glossary: {
      paul: "Paul (name)", münchen: "Munich", muss: "must, has to", bahnhof: "station", gehen: "go", entschuldigung: "excuse me",
      geradeaus: "straight ahead", links: "left", weit: "far", nur: "only", zehn: "ten", minuten: "minutes", kauft: "buys",
      fahrkarte: "ticket", berlin: "Berlin", zug: "train", fährt: "goes, leaves", gleis: "platform", drei: "three", hat: "has",
      verspätung: "delay",
    },
    questions: [
      q("Where is Paul?", "In Munich", "In Berlin", "In Hamburg"),
      q("How far is the station?", "Ten minutes", "An hour", "Two minutes"),
      q("What's the problem at the end?", "The train is delayed", "There are no tickets", "Paul is on the wrong platform"),
    ],
  },
];

export function getStory(id: string): Story | undefined {
  return STORIES.find((st) => st.id === id);
}

/** Splits a sentence into words and the punctuation around them, for tap-to-translate. */
export function storyTokens(sentence: string): { text: string; key: string | null }[] {
  return sentence.split(/(\s+)/).map((chunk) => {
    const key = chunk.toLowerCase().replace(/[„“”"'.,!?:;–-]/g, "");
    return { text: chunk, key: key && /\p{L}/u.test(key) ? key : null };
  });
}
