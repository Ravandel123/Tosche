//https://simple.wiktionary.org/wiki/hit
//https://www.lexico.com/grammar/verb-tenses-adding-ed-and-ing
//https://www.gallaudet.edu/tutorial-and-instructional-programs/english-center/grammar-and-vocabulary/verbs/irregular-verb-list/
//https://pl.bab.la/koniugacja/angielski/smite

//A B C D E F G H I J K L M N O P Q R S T U V W X Y Z

//-----------------------------------------------------------GENERAL----------------------------------------------------------
const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

const exceptionsWithA = [
   'eulogy',
   'one',
   'unicorn', 'union', 'united', 'used', 'user'
];

const exceptionsWithAn = [
   'honor', 'honorable', 'honour', 'honourable', 'heir', 'hourglass',
   'university'
];

const exceptionsWithNone = [
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

//-----------------------------------------------------------ADJECTIVES----------------------------------------------------------
const adjAcceptedInsulting = [
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
   'fearful', 'feral', 'ferocious', 'foolish', 'furious', 'furry',
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
   'clever', 'courageous',
   'fearsome', 'focused',
   'mighty',
   'powerful',
   'relentless',
   'stalwart',
   'undying',
   'vigorous'
];

const adjAfflictionsVirtues = adjAfflictions.concat(adjVirtues);


//-----------------------------------------------------------ADVERBS----------------------------------------------------------
const advBase = [
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

//-----------------------------------------------------------NOUNS----------------------------------------------------------
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

//-----------------------------------------------------------VERBS----------------------------------------------------------
const verbsIrregular = [
   ['acquit', 'acquitted', 'acquitted', 'acquitting'],
   ['admit', 'admitted', 'admitted', 'admitting'],
   ['arise', 'arose', 'arisen', 'arising'],
   ['awake', 'awoke', 'awoken', 'awaking'],
   ['be', 'was|were', 'been', 'being'],
   ['begin', 'began', 'begun', 'beginning'],
   ['bleed', 'bled', 'bled', 'bleeding'],
   ['buy', 'bought', 'bought', 'buying'],
   ['commit', 'committed', 'committed', 'committing'],
   ['control', 'controlled', 'controlled', 'controlling'],
   ['cost', 'cost', 'cost', 'costing'],
   ['deter', 'deterred', 'deterred', 'deterring'],
   ['eat', 'ate', 'eaten', 'eating'],
   ['excel', 'excelled', 'excelled', 'excelling'],
   ['feel', 'felt', 'felt', 'feeling'],
   ['fly', 'flew', 'flown', 'flying'],
   ['go', 'went', 'gone', 'going'],
   ['hit', 'hit', 'hit', 'hitting'],
   ['make', 'made', 'made'],
   ['occur', 'occurred', 'occurred', 'occurring'],
   ['patrol', 'patrolled', 'patrolled', 'patrolling'],
   ['prefer', 'preferred', 'preferred', 'preferring'],
   ['quit', 'quit', 'quit', 'quitting'],
   ['refer', 'referred', 'referred', 'referring'],
   ['reset', 'reset', 'reset', 'resetting'],
   ['smite', 'smote', 'smitten', 'smitting'],
   ['strike', 'struck', 'struck|stricken', 'striking'],
   ['submit', 'submitted', 'submitted', 'submiting'],
   ['transfer', 'transferred', 'transferred', 'transferring'],
   ['up', 'upped', 'upped', 'upping']
];

//-----------------------------------------------------------OTHER TERMS----------------------------------------------------------
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

const termsExtremelyGood = [
   'amazing',
   'incredible',
   'out of scale',
   'out of this world'
];

const termsExtremelyBad = [
   'trash',
   'utter garbage'
];

const termsNoDoubt = [
   'absolutely', 'assuredly',
   'beyond a doubt', 'beyond any doubt', 'beyond a question',
   'certainly', 'clearly',
   'definitely',
   'for sure', 
   'incontrovertibly', 'indubitably', 'irrefutably',
   'plainly',
   'surely',
   'truly',
   'undeniably', 'undisputedly', 'unequivocally', 'unmistakably', 'unquestionably',
   'without a doubt'
];

   
//-----------------------------------------------------------EXPORTS----------------------------------------------------------
module.exports = {
   vowels,
   exceptionsWithA,
   exceptionsWithAn,
   exceptionsWithNone,

   adjAfflictions,
   adjVirtues,
   adjAfflictionsVirtues,
   adjAcceptedInsulting,

   advBase,

   nounsAcceptedInsulting,
   pronouns,

   verbsIrregular,

   termsAccuracy,
   termsExtremelyGood,
   termsExtremelyBad,
   termsNoDoubt
};
