export interface KanaChar {
  character: string;
  romaji: string;
  row: string;
  strokeHint: string;
}

export const HIRAGANA: KanaChar[] = [
  // Vowels
  { character: "あ", romaji: "a", row: "vowel", strokeHint: "3 strokes: horizontal, vertical curve, diagonal" },
  { character: "い", romaji: "i", row: "vowel", strokeHint: "2 strokes: two curved lines" },
  { character: "う", romaji: "u", row: "vowel", strokeHint: "2 strokes: short top, curved body" },
  { character: "え", romaji: "e", row: "vowel", strokeHint: "2 strokes: horizontal top, curved body" },
  { character: "お", romaji: "o", row: "vowel", strokeHint: "3 strokes: horizontal, vertical, curved tail" },
  // K row
  { character: "か", romaji: "ka", row: "k", strokeHint: "3 strokes: horizontal, vertical, diagonal" },
  { character: "き", romaji: "ki", row: "k", strokeHint: "4 strokes: two horizontals, vertical, curve" },
  { character: "く", romaji: "ku", row: "k", strokeHint: "1 stroke: angular line" },
  { character: "け", romaji: "ke", row: "k", strokeHint: "3 strokes: vertical, horizontal, curved" },
  { character: "こ", romaji: "ko", row: "k", strokeHint: "2 strokes: two horizontal curves" },
  // S row
  { character: "さ", romaji: "sa", row: "s", strokeHint: "3 strokes: horizontal, vertical, curve" },
  { character: "し", romaji: "shi", row: "s", strokeHint: "1 stroke: single curve" },
  { character: "す", romaji: "su", row: "s", strokeHint: "2 strokes: horizontal, looping curve" },
  { character: "せ", romaji: "se", row: "s", strokeHint: "3 strokes: vertical, horizontal, curve" },
  { character: "そ", romaji: "so", row: "s", strokeHint: "1 stroke: zigzag curve" },
  // T row
  { character: "た", romaji: "ta", row: "t", strokeHint: "4 strokes: horizontal, vertical, cross, curve" },
  { character: "ち", romaji: "chi", row: "t", strokeHint: "2 strokes: horizontal, curved body" },
  { character: "つ", romaji: "tsu", row: "t", strokeHint: "1 stroke: curved sweep" },
  { character: "て", romaji: "te", row: "t", strokeHint: "1 stroke: horizontal with curve" },
  { character: "と", romaji: "to", row: "t", strokeHint: "2 strokes: vertical, horizontal curve" },
  // N row
  { character: "な", romaji: "na", row: "n", strokeHint: "4 strokes: horizontal, vertical, cross, loop" },
  { character: "に", romaji: "ni", row: "n", strokeHint: "3 strokes: vertical, two horizontals" },
  { character: "ぬ", romaji: "nu", row: "n", strokeHint: "2 strokes: curved with loop" },
  { character: "ね", romaji: "ne", row: "n", strokeHint: "2 strokes: vertical, looping curve" },
  { character: "の", romaji: "no", row: "n", strokeHint: "1 stroke: circular sweep" },
  // H row
  { character: "は", romaji: "ha", row: "h", strokeHint: "3 strokes: vertical, horizontal, curve" },
  { character: "ひ", romaji: "hi", row: "h", strokeHint: "1 stroke: single curve" },
  { character: "ふ", romaji: "fu", row: "h", strokeHint: "4 strokes: dot, three curves" },
  { character: "へ", romaji: "he", row: "h", strokeHint: "1 stroke: mountain shape" },
  { character: "ほ", romaji: "ho", row: "h", strokeHint: "4 strokes: vertical, horizontals, curve" },
  // M row
  { character: "ま", romaji: "ma", row: "m", strokeHint: "3 strokes: horizontals, vertical, loop" },
  { character: "み", romaji: "mi", row: "m", strokeHint: "2 strokes: curved lines" },
  { character: "む", romaji: "mu", row: "m", strokeHint: "3 strokes: complex curves" },
  { character: "め", romaji: "me", row: "m", strokeHint: "2 strokes: curved with loop" },
  { character: "も", romaji: "mo", row: "m", strokeHint: "3 strokes: horizontal, vertical, curve" },
  // Y row
  { character: "や", romaji: "ya", row: "y", strokeHint: "3 strokes: curved lines" },
  { character: "ゆ", romaji: "yu", row: "y", strokeHint: "2 strokes: curved body" },
  { character: "よ", romaji: "yo", row: "y", strokeHint: "2 strokes: horizontal, vertical curve" },
  // R row
  { character: "ら", romaji: "ra", row: "r", strokeHint: "2 strokes: horizontal, curve" },
  { character: "り", romaji: "ri", row: "r", strokeHint: "2 strokes: two vertical curves" },
  { character: "る", romaji: "ru", row: "r", strokeHint: "1 stroke: curved with loop" },
  { character: "れ", romaji: "re", row: "r", strokeHint: "2 strokes: vertical, curve" },
  { character: "ろ", romaji: "ro", row: "r", strokeHint: "1 stroke: angular curve" },
  // W row
  { character: "わ", romaji: "wa", row: "w", strokeHint: "2 strokes: vertical, curve" },
  { character: "を", romaji: "wo", row: "w", strokeHint: "3 strokes: horizontal, vertical, curve" },
  // N
  { character: "ん", romaji: "n", row: "special", strokeHint: "1 stroke: wavy curve" },
];

export const KATAKANA: KanaChar[] = [
  // Vowels
  { character: "ア", romaji: "a", row: "vowel", strokeHint: "2 strokes: horizontal, diagonal" },
  { character: "イ", romaji: "i", row: "vowel", strokeHint: "2 strokes: diagonal, vertical" },
  { character: "ウ", romaji: "u", row: "vowel", strokeHint: "3 strokes: dot, two lines" },
  { character: "エ", romaji: "e", row: "vowel", strokeHint: "3 strokes: three horizontal/vertical" },
  { character: "オ", romaji: "o", row: "vowel", strokeHint: "3 strokes: horizontal, vertical, diagonal" },
  // K row
  { character: "カ", romaji: "ka", row: "k", strokeHint: "2 strokes: angular lines" },
  { character: "キ", romaji: "ki", row: "k", strokeHint: "3 strokes: horizontals and vertical" },
  { character: "ク", romaji: "ku", row: "k", strokeHint: "2 strokes: diagonal, curve" },
  { character: "ケ", romaji: "ke", row: "k", strokeHint: "3 strokes: angular lines" },
  { character: "コ", romaji: "ko", row: "k", strokeHint: "2 strokes: angular box shape" },
  // S row
  { character: "サ", romaji: "sa", row: "s", strokeHint: "3 strokes: horizontals, vertical" },
  { character: "シ", romaji: "shi", row: "s", strokeHint: "3 strokes: two dots, curve" },
  { character: "ス", romaji: "su", row: "s", strokeHint: "2 strokes: angular lines" },
  { character: "セ", romaji: "se", row: "s", strokeHint: "2 strokes: vertical, horizontal" },
  { character: "ソ", romaji: "so", row: "s", strokeHint: "2 strokes: two diagonal lines" },
  // T row
  { character: "タ", romaji: "ta", row: "t", strokeHint: "3 strokes: angular lines" },
  { character: "チ", romaji: "chi", row: "t", strokeHint: "3 strokes: horizontal, angular" },
  { character: "ツ", romaji: "tsu", row: "t", strokeHint: "3 strokes: two dots, curve" },
  { character: "テ", romaji: "te", row: "t", strokeHint: "3 strokes: horizontals, vertical" },
  { character: "ト", romaji: "to", row: "t", strokeHint: "2 strokes: vertical, horizontal" },
  // N row
  { character: "ナ", romaji: "na", row: "n", strokeHint: "2 strokes: horizontal, diagonal" },
  { character: "ニ", romaji: "ni", row: "n", strokeHint: "2 strokes: two horizontals" },
  { character: "ヌ", romaji: "nu", row: "n", strokeHint: "2 strokes: diagonal cross" },
  { character: "ネ", romaji: "ne", row: "n", strokeHint: "4 strokes: complex angular" },
  { character: "ノ", romaji: "no", row: "n", strokeHint: "1 stroke: diagonal line" },
  // H row
  { character: "ハ", romaji: "ha", row: "h", strokeHint: "2 strokes: two diagonals" },
  { character: "ヒ", romaji: "hi", row: "h", strokeHint: "2 strokes: vertical, horizontal" },
  { character: "フ", romaji: "fu", row: "h", strokeHint: "1 stroke: curved line" },
  { character: "ヘ", romaji: "he", row: "h", strokeHint: "1 stroke: mountain shape" },
  { character: "ホ", romaji: "ho", row: "h", strokeHint: "4 strokes: cross with diagonals" },
  // M row
  { character: "マ", romaji: "ma", row: "m", strokeHint: "2 strokes: horizontal, angular" },
  { character: "ミ", romaji: "mi", row: "m", strokeHint: "3 strokes: three diagonals" },
  { character: "ム", romaji: "mu", row: "m", strokeHint: "2 strokes: angular lines" },
  { character: "メ", romaji: "me", row: "m", strokeHint: "2 strokes: cross shape" },
  { character: "モ", romaji: "mo", row: "m", strokeHint: "3 strokes: horizontals, vertical" },
  // Y row
  { character: "ヤ", romaji: "ya", row: "y", strokeHint: "2 strokes: angular lines" },
  { character: "ユ", romaji: "yu", row: "y", strokeHint: "2 strokes: angular box" },
  { character: "ヨ", romaji: "yo", row: "y", strokeHint: "3 strokes: three lines" },
  // R row
  { character: "ラ", romaji: "ra", row: "r", strokeHint: "2 strokes: horizontal, curve" },
  { character: "リ", romaji: "ri", row: "r", strokeHint: "2 strokes: two verticals" },
  { character: "ル", romaji: "ru", row: "r", strokeHint: "2 strokes: vertical, angular" },
  { character: "レ", romaji: "re", row: "r", strokeHint: "1 stroke: angular line" },
  { character: "ロ", romaji: "ro", row: "r", strokeHint: "3 strokes: box shape" },
  // W row
  { character: "ワ", romaji: "wa", row: "w", strokeHint: "2 strokes: vertical, curve" },
  { character: "ヲ", romaji: "wo", row: "w", strokeHint: "3 strokes: horizontal, angular" },
  // N
  { character: "ン", romaji: "n", row: "special", strokeHint: "2 strokes: dot, curve" },
];

export const KANA_ROWS = [
  { id: "vowel", label: "Vowels (あ行)" },
  { id: "k", label: "K Row (か行)" },
  { id: "s", label: "S Row (さ行)" },
  { id: "t", label: "T Row (た行)" },
  { id: "n", label: "N Row (な行)" },
  { id: "h", label: "H Row (は行)" },
  { id: "m", label: "M Row (ま行)" },
  { id: "y", label: "Y Row (や行)" },
  { id: "r", label: "R Row (ら行)" },
  { id: "w", label: "W Row (わ行)" },
  { id: "special", label: "N (ん)" },
];
