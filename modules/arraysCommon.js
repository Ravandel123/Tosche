//A B C D E F G H I J K L M N O P Q R S T U V W X Y Z

const arrayCharactersIrl = ['VVooly', 'Dinly', 'Lanaar', 'Me', 'Ravandel', 'Catz', 'You', 'Nachtkind'];
const arrayCharactersSpecial = ['Everybody', 'Nobody'];
const arrayCharactersBwd = [
   'Asha', 'Ashtor', 'Beck', 'Bevan', 'Cain', 'Clovis', 'Crim', 'Dakkan', 'Eira', 'Hardin', 'Janik', 'Kenosh',
   'Mitra', 'Quinlan', 'Rathik', 'Rhosyn', 'Rook', 'Sigrid', 'Theo', 'Tosch', 'Tosche', 'Yurk'
];
const arrayCharactersIrlOnly = arrayCharactersIrl.concat(arrayCharactersSpecial);
const arrayCharactersAll = arrayCharactersIrl.concat(arrayCharactersSpecial, arrayCharactersBwd);


const arrayAdditionalFunnyWords = ['lol', 'yes-yes', 'lmao', 'xD'];


const arrayDnDAlignments = ['Lawful Good', 'Lawful Neutral', 'Lawful Evil', 'Neutral Good', 'True Neutral', 'Neutral Evil', 'Chaotic Evil', 'Chaotic Neutral', 'Chaotic Good'];


const arrayCurrenciesIrl = ['bucks', '$', '€', '£'];
const arrayCurrenciesFantasy = ['copper', 'silver', 'gold'];
const arrayCurrenciesBwd = ['obsidian chips', 'pearl flakes', 'amber drops', 'ermehn slaves'];
const arrayCurrenciesAll = arrayCurrenciesIrl.concat(arrayCurrenciesFantasy, arrayCurrenciesBwd);

const arrayBodyShapes = [
  {name: 'gaunt', chance: 5, minBMI: 14.5, maxBMI: 16.99},
  {name: 'underweight', chance: 12, minBMI: 17, maxBMI: 18.49},
  {name: 'normal', chance: 60, minBMI: 18.5, maxBMI: 24.99},
  {name: 'overweight', chance: 12, minBMI: 25, maxBMI: 29.99},
  {name: 'obese', chance: 3, minBMI: 30, maxBMI: 100},
  {name: 'beefy', chance: 8, minBMI: 25, maxBMI: 45}
];

//-----------------------------------------------------------Speech parts----------------------------------------------------------
const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

const termsAccuracy = [
   '',
   'almost',
   'below',
   'definitely',
   'exactly',
   'less than',
   'more than',
   'over',
   'precisely',
   'probably'
];

//Adjectives
const adjectivesAcceptedInsulting = [
   'aberrant', 'abominable', 'absurd', 'abusive', 'adorable', 'aggressive','alcoholic', 'amateur', 'amusing',
   'barbaric', 'bioluminescent', 'bizzare', 'brutal',
   'cave-dwelling', 'crazy', 'creepy', 'cute',
   'delusional', 'domesticated', 'drooly', 'drunken',
   'extraterrestrial',
   'feral', 'ferocious', 'funny', 'furry',
   'gargantuan', 'gross',
   'hideous', 'hilarious', 'hungry',
   'inane', 'innocent', 'interesting', 'insane', 'irrational',
   'lazy', 'lobotomized',
   'mad', 'magical', 'maniacal', 'meaningless', 'monstrous','mutantic',
   'naive', 'narcissistic', 'nasty',
   'programmed', 'provocative',
   'ridiculous',
   'silly', 'starving',
   'useful',
   'tamed',
   'untamed', 'useless',
   'valuable', 'verdant', 'vile', 'violent',
   'wild'
];

const adjAfflictions = [
   'aberrant', 'abusive', 'aggressive', 'alcoholic', 'anxious', 
   'barbaric', 'brainwashed', 
   'cannibalistic', 'crazy',
   'degenerate', 'delusional', 'depressive', 'destructive', 'deviant', 'dumb',
   'fearful', 'feral', 'frocious', 'foolish', 'furious', 'furry',
   'heartless', 'hopeless',
   'idiotic', 'imbecilic', 'inane', 'insane', 'irrational',
   'lazy', 
   'maniacal', 'mindless', 'murderous', 'mutantic',
   'narcissistic',
   'paranoid', 'pathethic', 'pathologic', 'perverse', 'primitive', 'psychopathic',
   'racist', 'rapturous', 'ravenous',
   'selfish', 'stupid'
];

const adjVirtues = [
   'courageous',
   'focused',
   'powerful',
   'stalwart',
   'vigorous'
];

const adjAfflictionsVirtues = adjAfflictions.concat(adjVirtues);

//Adverbs
const baseAdverbsList = [
   'absentmindedly', 'absolutely', 'abstractedly', 'abundantly', 'adoringly', 'aggressively', 'attractively', 'awkwardly',
   'beautifully', 'briskly', 'brutally',
   'cannibalistically', 'carefully', 'cautiously', 'cheerfully', 'cheerily', 'competitively', 'completely', 'conservatively', 'contritely', 'copiously', 'correctly', 'cosmically',
   'deadly',
   'eagerly', 'effectively', 'effortlessly', 'entirely', 'excellently', 'exceptionally', 'excessively', 'extravagantly', 'extremely',
   'famously', 'fantastically', 'faultlessly', 'feebly', 'foolishly', 'frantically', 'furiously',
   'gently', 'gingerly', 'girlishly', 'gorgeously', 'gracefully', 'graciously', 'grimly', 'guardedly',
   'half-heartedly', 'happily', 'heartlessly', 'hungrily',
   'idiotically', 'idly', 'inattentively',
   'lazily', 'lifelessly', 'loyally',
   'magnificently', 'maniacally', 'mega', 'mindlessly', 'mutantically',
   'narcissistically', 'nimbly',
   'overly',
   'perfectly', 'pathetically', 'pleasantly', 'plentifully', 'practically', 'primitively', 'profusely', 'properly', 'purely',
   'quietly', 'questioningly', 'quite', 'quizzically', 
   'ravenously', 'really', 'recklessly', 'remorsefully', 'rightly', 'ruefully', 'ruthlessly',
   'savagely ', 'silently', 'slightly', 'sloppily', 'splendidly', 'stupidly', 'stylishly', 'superbly', 'sunnily', 'super',
   'terribly', 'thirstily', 'totally',
   'ultra', 'unabashedly', 'unevenly', 'urgently', 'utterly',
   'very', 'viciously',
   'warily', 'weakly', 'well', 'wishfully', 'witlessly', 'wholly', 'worriedly'
];

//Nouns
const nounsAcceptedInsulting = [
   'abomination',
   'bastard',
   'causal', 'clown',
   'dork', 'dummy',
   'fanatic', 'freak', 'furry',
   'greenpaw',
   'lunatic',
   'madman', 'maniac', 'monster', 'mutant',
   'nerd', 'newbie', 'noob', 'nutjob',
   'peasant', 'psycho', 'psychopath',
   'savage', 'sicko', 'slave', 'sociopath',
   'troglodyte', 'troll',
   'wacko', 'weirdo',
   'zombie'
];

//Other
const pronouns = [
   [`my`, `my`, `mine`],
   [`i`, `my`, `mine`],
   [`me`, `my`, `mine`],
   [`you`, `your`, `yours`],
   [`he`, `his`, `his`],
   [`she`, `her`, `hers`],
   [`it`, `its`, `its`],
   [`we`, `our`, `ours`],
   [`they`, `their`, `theirs`],
   [`nobody`, `no one's`, `no one's`],
   [`everybody`, `everyone's`, `everyone's`]
];


//-----------------------------------------------------------Exports----------------------------------------------------------
module.exports = {
   arrayCharactersIrlOnly,
   arrayCharactersAll,
   arrayAdditionalFunnyWords,
   arrayDnDAlignments,
   termsAccuracy,
   arrayCurrenciesAll,
   arrayBodyShapes,

   vowels,
   adjAfflictions,
   adjVirtues,
   adjAfflictionsVirtues,
   adjectivesAcceptedInsulting,
   baseAdverbsList,
   nounsAcceptedInsulting,
   pronouns,
};