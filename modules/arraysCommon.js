//A B C D E F G H I J K L M N O P Q R S T U V W X Y Z


const arrayCharactersIrl = ['VVooly', 'Dinly', 'Dagos', 'Jeri', 'Me', 'Ravandel', 'Catz', 'You', 'Wolf Scribe'];
const arrayCharactersSpecial = ['Everybody', 'Nobody'];
const arrayCharactersBwd = [
   'Asha', 'Ashtor', 'Beck', 'Bevan', 'Cain', 'Clovis', 'Crim', 'Dakkan', 'Eira', 'Hardin', 'Janik', 'Kenosh',
   'Mitra', 'Quinlan', 'Rathik', 'Rhosyn', 'Rook', 'Sigrid', 'Theo', 'Tosch', 'Tosche', 'Yurk'
];
const arrayCharactersIrlOnly = arrayCharactersIrl.concat(arrayCharactersSpecial);
const arrayCharactersAll = arrayCharactersIrl.concat(arrayCharactersSpecial, arrayCharactersBwd);


const arrayBannedWords = [
   'cunt',
   'dick',
   'faggot', 'fuck',
   'kurva', 'kurwa',
   'niga', 'nigga', 'nigger',
   'e621.net', 'furaffinity.net', 'weasyl.com'
];

const arrayAdditionalFunnyWords = ['lol', 'yes-yes', 'lmao'];


const arrayDnDAlignments = ['Lawful Good', 'Lawful Neutral', 'Lawful Evil', 'Neutral Good', 'True Neutral', 'Neutral Evil', 'Chaotic Evil', 'Chaotic Neutral', 'Chaotic Good'];


const arrayAccuracy = [
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


const arrayCurrenciesIrl = ['bucks', '$', '€', '£'];
const arrayCurrenciesFantasy = ['copper', 'silver', 'gold'];
const arrayCurrenciesBwd = ['obsidian chips', 'pearl flakes', 'amber drops', 'ermehn heads', 'ermehn slaves'];
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
//Articles
const arrayExceptionsWithA = [
   'eulogy',
   'one',
   'unicorn', 'union', 'united', 'used', 'user'
];

const arrayExceptionsWithAn = [
   'honor', 'honorable', 'honour', 'honourable', 'heir', 'hourglass',
   'university'
];

const arrayExceptionsWithNone = [
   'advice', 'art',
   'baseball', 'biology', 'butter',
   'coffee', 'computer science', 'currency',
   'electricity',
   'furniture',
   'gas',
   'happiness', 'history', 'hockey',
   'information',
   'love', 'luggage',
   'mathematics', 'money', 'music',
   'news',
   'power',
   'rice',
   'scenery', 'sugar',
   'tennis', 'travel',
   'volleyball',
   'water', 'work'
];

//Adjectives
const adjectivesAcceptedInsulting = [
   'abrrant', 'abominable', 'absurd', 'abusive', 'adorable', 'aggressive','alcoholic', 'amateur', 'amusing',
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
const arrayPronouns = [
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
   arrayBannedWords,
   arrayAdditionalFunnyWords,
   arrayDnDAlignments,
   arrayAccuracy,
   arrayCurrenciesAll,
   arrayBodyShapes,

   arrayExceptionsWithA,
   arrayExceptionsWithAn,
   arrayExceptionsWithNone,
   adjectivesAcceptedInsulting,
   nounsAcceptedInsulting,
   arrayPronouns,
};