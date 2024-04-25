const C = require("./../common.js");

//A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
//----------------------------------------------------------- Constants ----------------------------------------------------------
const MAX_SYLLABLES_AMOUNT = 4;
const arrMaleAliases = ['m', 'male', 'man'];
const arrFemaleAliases = ['f', 'female', 'woman'];

const arrGenderAliases = arrMaleAliases.concat(arrFemaleAliases);
module.exports.arrGenderAliases = arrGenderAliases;

//----------------------------------------------------------- Syllables Arrays ----------------------------------------------------------

//Male

const arrayM1 = [
   [
      'Ash',
      'Bohb', 'Borg', 'Briath', 'Brand', 'Bron',
      'Cain', 'Calh', 'Crim',
      'Dalt', 'Don', 'Dorn', 'Drall', 'Drax',
      'Ferg', 'Feyn', 'Fiur', 'Fizz', 'Floyd',
      'Gem', 'Gird', 'Gnar', 'Greg', 'Grok', 'Grum', 'Gue', 'Gus',
      'Hexx',
      'Jax', 'Jed', 'Jhin', 'Jin',
      'Kahn', 'Kalt', 'Kardd', 'Karg', 'Karth', 'Kayn', 'Kel', 'Kled', 'Kraith', 'Krys',
      'Lars', 'Liu',
      'Ned', 'Nef',
      'Ornn',
      'Pyk',
      'Rab', 'Rey', 'Rod', 'Rook',
      'Sark', 'Sett', 'Shen', 'Shyn', 'Sizz', 'Soth', 'Spint', 'Squy', 'Styg', 'Styr',
      'Tark', 'Tai', 'Thant', 'Tharj', 'Theo', 'Thrall', 'Torr', 'Tosch',
      'Urnst',
      'Vey', 'Vix', 'Voy','Vlad',
      'Wan', 'Wegg',
      'Xsi',
      'Yog', 'Yott', 'Yurk',
      'Zac', 'Zanj', 'Zed', 'Ziggs'
   ]
];

const arrayM2 = [
   [
      'A', 'Ad', 'Ag', 'Ais', 'Aj', 'Ak', 'Al', 'An', 'Ap', 'Ar', 'As', 'Ash', 'Ax', 'Ay',
      'Ba', 'Bal', 'Ban', 'Be', 'Bi', 'Bid', 'Bloom', 'Bof', 'Bra', 'Bro', 'Brog', 'Bu', 'Bun',
      'Ca', 'Cair', 'Cal', 'Char', 'Chri', 'Chu', 'Ci', 'Clan', 'Cla', 'Clo', 'Co', 'Con', 'Cor', 'Cuth',
      'Da', 'Dak', 'Dal', 'Dar', 'Dark', 'De', 'Del', 'Der', 'Des', 'Di', 'Dra',
      'E', 'Ed', 'Ek', 'El', 'En',
      'Fa', 'Fal', 'Faf', 'Fah', 'Fal', 'Fe', 'Fer', 'Fi', 'Fla', 'Flo',
      'Ga', 'Gag',  'Gal', 'Gan', 'Gar', 'Gas', 'Gaz', 'Ge', 'Ger', 'Gil', 'Gim', 'Ghe', 'Gra', 'Grac', 'Gret', 'Grin', 'Gru', 'Gun', 'Gy',
      'Ha', 'Har', 'Has', 'Hag', 'Har', 'He', 'Hi', 'Hil', 'Hjol', 'Ho', 'Hroth', 'Hu',
      'I', 'Ig', 'Il', 'In',
      'Ja', 'Jar', 'Jas', 'Je', 'Jer', 'Jho', 'Jo', 'Ju',
      'Ka', 'Kar', 'Kas', 'Ke', `Kha'`, 'Ki', 'Kil', 'Khor', 'Ko', 'Kor', 'Krel', 'Kur', 'Kyr',
      'La', 'Lai', 'Lar', 'Leh', 'Lem', 'Let', 'Lo', 'Loy', 'Lu',
      'Ma', 'Mad', 'Mag', 'Mal', 'Man', 'Mer', 'Mi', 'Mis', 'Mon', 'Mor', 'Mul', 'Mun', 'My', 'Myr',
      'Na', 'Ne', 'Nim', 'No', 'Nor', 'Ny',
      'O', 'Or', 'Os', 'Oys',
      'Pa', 'Phe', 'Pir', 'Po',
      'Qu', 'Quim', 'Quin',
      'Ra', 'Ran', 'Rash', 'Ren', 'Rez', 'Ri', 'Rit', 'Ro', 'Ru', 'Ry',
      'Sa', 'San', 'Sha', 'Shak', 'Sip', 'Skar', 'Skun', 'So', 'Sol', 'Sou', 'Stor', 'Stra', 'Swa', 'Sy',
      'Ta', 'Tar', 'Te', 'Ted', 'Tem', 'Tha', 'The', 'Tho', 'Thu', 'Thor', 'Tol', 'Tro', 'Ty',
      'U', 'Ul', 'Ur', 'Uv',
      'Va', 'Vad', 'Vei', 'Ver', 'Vi', 'Vie', 'Vir', 'Vo',
      'Wa', 'War', 'Wer', 'Wil', 'Whit', 'Wol', 'Wor', 'Wy', 'Wys',
      'Xar', 'Xe', 'Xiao', 'Xy',
      'Y', 'Yo',
      'Zam', 'Zol', 'Zu', 'Zy'
   ],
   [
      'ah', 'al', 'an', 'art',
      'bac', 'bal', 'bar', 'ben', 'berg', 'bert', 'bin', 'bion', 'boz', 'bu', 'bus', 'by',
      'ce', 'chin', 'chus', 'cian', 'co', 'com', 'comb', 'con', 'cus', 'cy',
      'dal', 'dalf', 'dan', 'dar', 'dek', 'den', 'der', 'din', 'dit', 'do', 'dor', 'doth', 'dox', 'dreth', 'dro', 'dross', 'dun', 'dush', 'dut', 'dwin', 'dyr',
      'fax', 'fir', 'fner', 'fred', 'fric', 'fus',
      'gal', 'gar', 'gas', 'gash', 'gem', 'ger', 'gham', 'gil', 'go', 'gor', 'gos', 'got', 'grim', 'guk', 'gus',
      'ham', 'hel', 'hias', 'hild',
      'in', 'ine', 'it',
      'jit',
      'ka', 'kai', 'kal', 'kan', 'kar', 'ker', 'kes', 'kial', 'kin', 'kix', 'ko', 'kon', 'krus', 'ku', 'kul',
      'lach', 'laf', 'lan', 'land', 'las', 'dler', 'le', 'lem', 'lex', 'ley', 'li', 'lich', 'lid', 'lin', 'linn', 'lio', 'lion', 'lis', 'lith', 'lix', 'lon', 'loo', 'lor', 'lu',
      'mab', 'mar', 'mer', 'mien', 'min', 'mir', 'mog', 'moth', 'mus', 'myr',
      'nak', 'nan', 'nar', 'nard', 'nath', 'nax', 'nay', 'ne', 'nen', 'ner', 'niel', 'nil', 'ning', 'nis', 'no', 'nor', 'nos', 'nosh', 'nur', 'nus', 'nuz',
      'od', 'ok', 'on',
      'pai', 'par', 'pih', 'pus',
      'raih', 'ralt', 'ran', 'rath', 'reg', 'rel', 'rek', 'ren', 'ret', 'reth', 'rey', 'ric', 'rick', 'rik', 'ril', 'rin', 'rion', 'ris', 'rish', 'rius', 'rlon', 'rod', 'rog', 'rold', 'ron', 'rosh', 'ru', 'run', 'rus', 'rvan', 'ry', 'ryk', 'rys',
      'sa', 'sar', 'sel', 'ser', 'sham', 'shan', 'shnard', 'sin', 'sis', 'son', 'stan', 'stian', 'storn', 'stral',
      'tal', 'tan', 'tar', 'te', 'tex', 'thas', 'thik', 'thran', 'thus', 'ti', 'tner', 'ton', 'tor', 'tos', 'tram', 'trim',
      'um', 'ur',
      'van', 'vath', 'ven', 'vern', 'vian', 'vius', 'vis', 'vin', 'von', 'vor', 'vyn',
      'wald', 'wall', 'war', 'well', 'wick', 'win', 'wulf',
      'xon',
      'ym', 'ymr',
      'zar', 'zem', 'zil', 'zir', 'zis', 'zix', 'znak', 'zok', 'zuss'
   ]
];

const arrayM3 = [
   [
      'A', 'Ad', 'Ai', 'Al', 'Ar', 'As', 'Au',
      'Ba', 'Bo', 'Bra',
      'Co', 'Cus',
      'Da', 'De',
      'E', 'El', 'Er', 'Ez',
      'Fle',
      'Ge', 'Gur',
      'Ha', 'Has', 'He', 'Hem',
      'I', 'In',
      'Ja', 'Je', 'Jed',
      'Ka', 'Kas', 'Krel', 'Kres',
      'Le',
      'Ma', 'Mal', 'Mar', 'Mi', 'Mo',
      'Nor',
      'Pi', 'Po',
      'Ra', 'Ru',
      'Sa', 'Sar', 'Sco', 'Se', 'She',
      'Tal', 'Te', 'Ter', 'Tho', 'To', 'Ty',
      'U',
      'Va', 'Vil', 'Vla',
      'We',
      'Ya',
      'Zi'
   ],
   [
      'an', 'ar',
      'ba', 'bar', 'bas', 'bhe', 'bo',
      'ca', 'chi', 'ci',
      'da', 'dai', 'dar', 'di',
      'e', 'en',
      'fi', 'fre',
      'gna',
      'hin', 'ho',
      'ja', 'jan',
      'ka', 'ken', 'ki', 'kun',
      'la', 'le', 'les', 'li', 'lis', 'lix',
      'ma', 'me', 'mo',
      'na', 'nat', 'ne', 'ni', 'nis', 'no',
      'o',
      'phe',
      'que',
      'ra', 'rai', 'ran', 're', 'ri', 'ro', 'run', 'rus',
      'sa', 'san', 'se', 'ser', 'si', 'sia', 'su',
      'ta', 'te', 'tha', 'than', 'tid', 'tral',
      'u',
      'van', 've', 'ves',
      'za', 'zi'
   ],
   [
      'aki', 'al', 'an',
      'bald',
      'con',
      'del', 'din', 'dor', 'doth', 'dram',
      'gar', 'gark', 'go', 'goth', 'gus',
      'har',
      'id',
      'kai', 'kan', 'kas', 'kith', 'kon',
      'la', 'lack', 'le', 'lin', 'lion', 'lios', 'lo', 'loth',
      'mar', 'mer', 'min', 'mir', 'mish', 'mo', 'mon', 'my',
      'nen', 'ni', 'niel', 'nis', 'nius', 'nog', 'nor',
      'o', 'on', 'os',
      'ram', 'rar', 'rard', 're', 'ri', 'rian', 'rim', 'rio', 'ris', 'rith', 'ro', 'rogg', 'rug',
      'sar', 'sel', 'shan', 'shar', 'shi', 'shnar', 'son', 'sos', 'star',
      'taj', 'tar', 'te', 'til', 'tin', 'tis', 'tius', 'tos', 'trius',
      'us',
      'vain', 'vald', 'vich',
      'won',
      'xi', 'xion', 'xor',
      'zar', 'zum'
   ]
];

const arrayM4 = [
   [
      'A', 'Ad', 'Al', 'Am',
      'E',
      'I',
      'Ma', 'Mor',
      'The', 'Tryn',
      'Xer'
   ],
   [
      'ba', 'bi',
      'da', 'de', 'dhi', 'di', 'don',
      'e',
      'ham', 'ho',
      'li', 'lu',
      'mu',
      'o'
   ],
   [
      'ba',
      'da', 'do',
      'kai',
      'li',
      'ma', 'me',
      'na',
      'ra',
      'shpu',
      'va'
   ],
   [
      'cius',
      'dek',
      'e', 'el',
      'in',
      'kan',
      'lu',
      'nir',
      're', 'ret', 'ro', 'rus',
      'ser', 'si'
   ]
];


//Female

const arrayF1 = [
   [
      'Ash',
      'Beck',
      'Gem', 'Gwenn', 'Gwenn',
      'Shi', 'Styg',
      'Vex', 'Vi', 'Voy',
      'Yar',
      'Xsi'
   ]
];

const arrayF2 = [
   [
      'A', 'An', 'Ar', 'As', 'Au',
      'Ba', `Bel'`, 'Bris',
      'Ca', 'Cai', 'Cait', 'Chan', 'Char', 'Chas', 'Ci', 'Cie', 'Cor', 'Cy',
      'Dia',
      'Ei',
      'Fio',
      'Gret',
      'Ha', 'Hol',
      'Is',
      'Ja', 'Jan', 
      'Ka', `Kai'`, 'Ki', 'Kyr',
      'Lil', 'Lu', 'Ly',
      'Ma', 'Mag', 'Man', 'Me', 'Mi', 'Mir', 'Mo',
      'Na', 'Ny',
      'O', 'Ou',
      'Pa', 'Pre', 'Py',
      'Rei', `Rek'`, 'Rho', 'Ri', 'Ris', 'Ro',
      'San', 'Sen', 'Shar', 'Shi', 'Shu', 'Si', 'Sor', 'Syl', 'Syn',
      'Ta', 'Thu', 'Ti', 'Ty',
      'Vay', 'Ve', 'Ver', 'Vra',
      'Xa',
      'Ze', 'Zo', 'Zy'
   ],
   [
      'ala',
      'ca', 'chin',
      'dish', 'dra',
      'ga', 'gar', 'gird',
      'ki',
      'le', 'li', 'lia', 'lid', 'ly', 'lyn',
      'mi', 'mus',
      'na', 'nar', 'ne', 'nik', 'nka', 'nya',
      'pa',
      'qua',
      'ra', 're', 'ri', 'riam', 'ril', 'ris', 'rist',
      'sa', 'sai', 'san', 'se', 'sha', 'shu', 'sic', 'sio', 'sis', 'ska', 'syn',
      'ti', 'tlin', 'tra',
      'va', 'ven', 'veth','via', 'vir',
      'ya', 'yah'
   ]
];

const arrayF3 = [
   [
      'A', 'Ac', 'Ad', 'Ak',
      'Ca', 'Cal', 'Cas', 'Cris',
      'Da',
      'E',
      'Ga', 'Gun', 'Gri',
      'I',
      'Je',
      'Ka', 'Kay', 'Kin',
      'La', 'Le', 'Lis', 'Lo',
      'Me', 'Mir', 'Mor', 'Mu',
      'Ne',
      'O',
      'Sa', 'Se', 'Seh', 'Sep', 'Shy', 'Syl',
      'Ta', 'Tris',
      'Va',
      'Yu',
      'Za'
   ],
   [
      'bet', 'bi',
      'cal', 'cta',
      'de', 'dra', 'dria', 'du',
      'e',
      'fi',
      'ga', 'ge', 'gnis',
      'hin',
      'i',
      'ka', 'ke', 'kro',
      'lan', 'le', 'les', 'li', 'lia', 'lis', 'lo',
      'me', 'mi', 'mil', 'mo',
      'na', 'ni', 'no',
      'o',
      'pha',
      're', 'ri', 'rian', 'rien', 'ro', 'ru',
      'san', 'sel',
      'ta', 'tia', 'tien',
      'u',
      'va', 'vay', 've'
   ],
   [
      'bel',
      'da', 'dia', 'dra',
      'ha',
      'ia',
      'la', 'le', 'lei', 'li', 'lia', 'lyn', 'lynn',
      'ka',
      'ma', 'mi', 'myth',
      'na', 'nas', 'ne', 'nia',
      'ra', 're', 'ria','rin', 'roth',
      'sa', 'se', 'sha', 'sia',
      'ta', 'tha', 'tra',
      'va', 'via',
      'ya', 'yah'
   ]
];

const arrayF4 = [
   [
      'A', 'An',
      'Be',
      'Ca', 'Cas',
      'De',
      'Ge',
      'I',
      'Jo',
      'Ka',
      'Se',
      'Vi',
      'Y',
   ],
   [
      'a',
      'ca',
      'de', 'do', 'dus',
      'ju',
      'na',
      'ra', 're',
      'se', 'sio',
      'ta', 'the', 'tho',
      'xu'
   ],
   [
      'a', 'am',
      'fa', 'fen',
      'i',
      'lai',
      'mi',
      'ni', 'no',
      'pe','phi',
      'ri',
      'sa',
      'tri',
      'u'
   ],
   [
      'ce',
      'de',
      'e',
      'ia',
      'mei',
      'na', 'ne', 'ni',
      'racht',
      'sa', 'si',
      'ta',
      'za'
   ]
];

const arraysMale = [arrayM1, arrayM2, arrayM3, arrayM4];
const arraysFemale = [arrayF1, arrayF2, arrayF3, arrayF4];


//----------------------------------------------------------- FUNCTIONS ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function totalNamesCount() {
   const namesMCount = (arrayM1[0].length) + ((arrayM2[0].length) * (arrayM2[1].length)) + ((arrayM3[0].length) * (arrayM3[1].length) * (arrayM3[2].length)) + ((arrayM4[0].length) * (arrayM4[1].length) * (arrayM4[2].length) * (arrayM4[3].length));
   const namesFCount = (arrayF1[0].length) + ((arrayF2[0].length) * (arrayF2[1].length)) + ((arrayF3[0].length) * (arrayF3[1].length) * (arrayF3[2].length)) + ((arrayF4[0].length) * (arrayF4[1].length) * (arrayF4[2].length) * (arrayF4[3].length));

   return namesMCount + namesFCount;
}

module.exports.totalNamesCount = totalNamesCount;

//------------------------------------------------------------------------------------------------------------------
function generateRandomName(gender, syllablesAmount) {
   const syllablesArray = returnSyllablesArray(gender, syllablesAmount);
   if (!syllablesArray)
      return;

   let name = '';

   for (let i = 0; i < syllablesArray.length; i++)
      name = name + C.arrGetRandom(syllablesArray[i]);

   return name;
}

module.exports.generateRandomName = generateRandomName;

//------------------------------------------------------------------------------------------------------------------
function createRandomName(syllable, gender, syllablePosition, syllablesAmount) {
   if (!C.checkIfString(syllable) || !C.checkIfIntInRange(syllablePosition, 1, MAX_SYLLABLES_AMOUNT))
      return;

   const syllablesArray = returnSyllablesArray(gender, syllablesAmount);
   if (!syllablesArray)
      return;

   let name = '';

   for (let i = 0; i < syllablesArray.length; i++) {
      if (i == syllablePosition - 1)
         name = name + syllable;
      else
         name = name + C.arrGetRandom(syllablesArray[i]);
   }

   return name;
}

module.exports.createRandomName = createRandomName;


//----------------------------------------------------------- INTERNALS ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function returnSyllablesArray(gender, syllablesAmount) {
   if (!C.checkIfIntInRange(syllablesAmount, 1, MAX_SYLLABLES_AMOUNT))
      return;

   if (C.strCheckIfAnyMatch(gender, arrMaleAliases))
      return arraysMale[syllablesAmount - 1];
   else if (C.strCheckIfAnyMatch(gender, arrFemaleAliases))
      return arraysFemale[syllablesAmount - 1];
}

//---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------