export interface VocabWord {
  id: string;
  word: string;
  furigana: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
  category: string;
}

export const N5_VOCABULARY: VocabWord[] = [
  { id: "n5-001", word: "食べる", furigana: "たべる", meaning: "to eat", example: "朝ごはんを食べる。", exampleMeaning: "I eat breakfast.", category: "verbs" },
  { id: "n5-002", word: "飲む", furigana: "のむ", meaning: "to drink", example: "水を飲む。", exampleMeaning: "I drink water.", category: "verbs" },
  { id: "n5-003", word: "見る", furigana: "みる", meaning: "to see / to watch", example: "テレビを見る。", exampleMeaning: "I watch TV.", category: "verbs" },
  { id: "n5-004", word: "聞く", furigana: "きく", meaning: "to listen / to ask", example: "音楽を聞く。", exampleMeaning: "I listen to music.", category: "verbs" },
  { id: "n5-005", word: "読む", furigana: "よむ", meaning: "to read", example: "本を読む。", exampleMeaning: "I read a book.", category: "verbs" },
  { id: "n5-006", word: "書く", furigana: "かく", meaning: "to write", example: "手紙を書く。", exampleMeaning: "I write a letter.", category: "verbs" },
  { id: "n5-007", word: "話す", furigana: "はなす", meaning: "to speak / to talk", example: "日本語を話す。", exampleMeaning: "I speak Japanese.", category: "verbs" },
  { id: "n5-008", word: "行く", furigana: "いく", meaning: "to go", example: "学校に行く。", exampleMeaning: "I go to school.", category: "verbs" },
  { id: "n5-009", word: "来る", furigana: "くる", meaning: "to come", example: "友達が来る。", exampleMeaning: "A friend is coming.", category: "verbs" },
  { id: "n5-010", word: "帰る", furigana: "かえる", meaning: "to return / to go home", example: "家に帰る。", exampleMeaning: "I go home.", category: "verbs" },
  { id: "n5-011", word: "大きい", furigana: "おおきい", meaning: "big / large", example: "大きい犬がいる。", exampleMeaning: "There is a big dog.", category: "adjectives" },
  { id: "n5-012", word: "小さい", furigana: "ちいさい", meaning: "small / little", example: "小さい猫が好き。", exampleMeaning: "I like small cats.", category: "adjectives" },
  { id: "n5-013", word: "新しい", furigana: "あたらしい", meaning: "new", example: "新しい本を買った。", exampleMeaning: "I bought a new book.", category: "adjectives" },
  { id: "n5-014", word: "古い", furigana: "ふるい", meaning: "old (things)", example: "古い家に住んでいる。", exampleMeaning: "I live in an old house.", category: "adjectives" },
  { id: "n5-015", word: "高い", furigana: "たかい", meaning: "expensive / tall", example: "この山は高い。", exampleMeaning: "This mountain is tall.", category: "adjectives" },
  { id: "n5-016", word: "学校", furigana: "がっこう", meaning: "school", example: "学校は楽しい。", exampleMeaning: "School is fun.", category: "nouns" },
  { id: "n5-017", word: "先生", furigana: "せんせい", meaning: "teacher", example: "先生は優しい。", exampleMeaning: "The teacher is kind.", category: "nouns" },
  { id: "n5-018", word: "学生", furigana: "がくせい", meaning: "student", example: "私は学生です。", exampleMeaning: "I am a student.", category: "nouns" },
  { id: "n5-019", word: "友達", furigana: "ともだち", meaning: "friend", example: "友達と遊ぶ。", exampleMeaning: "I play with friends.", category: "nouns" },
  { id: "n5-020", word: "家族", furigana: "かぞく", meaning: "family", example: "家族は四人です。", exampleMeaning: "My family has four people.", category: "nouns" },
  { id: "n5-021", word: "天気", furigana: "てんき", meaning: "weather", example: "今日は天気がいい。", exampleMeaning: "The weather is nice today.", category: "nouns" },
  { id: "n5-022", word: "時間", furigana: "じかん", meaning: "time", example: "時間がない。", exampleMeaning: "There is no time.", category: "nouns" },
  { id: "n5-023", word: "電車", furigana: "でんしゃ", meaning: "train", example: "電車で行く。", exampleMeaning: "I go by train.", category: "nouns" },
  { id: "n5-024", word: "今日", furigana: "きょう", meaning: "today", example: "今日は月曜日です。", exampleMeaning: "Today is Monday.", category: "time" },
  { id: "n5-025", word: "明日", furigana: "あした", meaning: "tomorrow", example: "明日は休みです。", exampleMeaning: "Tomorrow is a day off.", category: "time" },
];

export const SAMPLE_STORY = {
  id: "story-001",
  title: "はじめての日本",
  titleEn: "First Time in Japan",
  level: "N5",
  paragraphs: [
    {
      japanese: "私は先月、日本に行きました。",
      furigana: "わたしはせんげつ、にほんにいきました。",
      english: "Last month, I went to Japan.",
      vocabulary: [
        { word: "先月", reading: "せんげつ", meaning: "last month" },
        { word: "日本", reading: "にほん", meaning: "Japan" },
        { word: "行きました", reading: "いきました", meaning: "went" },
      ],
    },
    {
      japanese: "東京はとても大きい町です。",
      furigana: "とうきょうはとてもおおきいまちです。",
      english: "Tokyo is a very big city.",
      vocabulary: [
        { word: "東京", reading: "とうきょう", meaning: "Tokyo" },
        { word: "大きい", reading: "おおきい", meaning: "big" },
        { word: "町", reading: "まち", meaning: "city/town" },
      ],
    },
    {
      japanese: "毎日、電車に乗りました。",
      furigana: "まいにち、でんしゃにのりました。",
      english: "Every day, I rode the train.",
      vocabulary: [
        { word: "毎日", reading: "まいにち", meaning: "every day" },
        { word: "電車", reading: "でんしゃ", meaning: "train" },
        { word: "乗りました", reading: "のりました", meaning: "rode" },
      ],
    },
    {
      japanese: "日本の食べ物はおいしかったです。",
      furigana: "にほんのたべものはおいしかったです。",
      english: "Japanese food was delicious.",
      vocabulary: [
        { word: "食べ物", reading: "たべもの", meaning: "food" },
        { word: "おいしかった", reading: "おいしかった", meaning: "was delicious" },
      ],
    },
    {
      japanese: "また日本に行きたいです。",
      furigana: "またにほんにいきたいです。",
      english: "I want to go to Japan again.",
      vocabulary: [
        { word: "また", reading: "また", meaning: "again" },
        { word: "行きたい", reading: "いきたい", meaning: "want to go" },
      ],
    },
  ],
};
