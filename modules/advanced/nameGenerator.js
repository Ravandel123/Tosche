const C = require("./../common.js");


//----------------------------------------------------------- Constants ----------------------------------------------------------
const C_MaximumSyllablesAmount = 4;

//----------------------------------------------------------- Arrays ----------------------------------------------------------

//A B C D E F G H I J K L M N O P Q R S T U V W X Y Z

//Male

const arrayM1 = [
   [
      'Ash',
      'Bohb', 'Borg', 'Briath', 'Bron',
      'Cain', 'Calh', 'Crim',
      'Dalt', 'Don', 'Dorn', 'Drall', 'Drax',
      'Ferg', 'Feyn', 'Fiur', 'Floyd',
      'Gem', 'Gird', 'Grok', 'Grum', 'Gue', 'Gus',
      'Hexx',
      'Jed', 'Jin',
      'Kahn', 'Kalt', 'Kardd', 'Karg', 'Karth', 'Kel', 'Kraith', 'Krys',
      'Lars', 'Liu',
      'Ned', 'Nef',
      'Pyk',
      'Rab', 'Rey', 'Rod', 'Rook',
      'Sark','Shyn', 'Sizz', 'Soth', 'Spint', 'Squy', 'Styg', 'Styr',
      'Tark', 'Tai', 'Thant', 'Tharj', 'Theo', 'Thrall', 'Torr', 'Tosch',
      'Urnst',
      'Vey', 'Vix', 'Voy','Vlad',
      'Wan', 'Wegg',
      'Xsi',
      'Yog', 'Yott', 'Yurk',
      'Zanj'
   ]
];

const arrayM2 = [
   [
      'A', 'Ad', 'Ag', 'Ais', 'Aj', 'Al', 'An', 'Ap', 'Ar', 'As', 'Ash', 'Ax', 'Ay',
      'Ba', 'Bal', 'Ban', 'Be', 'Bi', 'Bid', 'Bloom', 'Bof', 'Bra', 'Bro', 'Brog', 'Bu', 'Bun',
      'Ca', 'Cair', 'Cal', 'Char', 'Chri', 'Chu', 'Ci', 'Clan', 'Cla', 'Clo', 'Co', 'Con', 'Cor', 'Cuth',
      'Da', 'Dak', 'Dal', 'Dar', 'Dark', 'De', 'Del', 'Der', 'Des', 'Di', 'Dra',
      'E', 'Ed', 'El', 'En',
      'Fa', 'Fal', 'Faf', 'Fah', 'Fal', 'Fe', 'Fer', 'Fi', 'Fla', 'Flo',
      'Ga', 'Gag',  'Gal', 'Gan', 'Gar', 'Gas', 'Gaz', 'Ge', 'Ger', 'Gil', 'Gim', 'Ghe', 'Gra', 'Grac', 'Gret', 'Grin', 'Gru', 'Gun', 'Gy',
      'Ha', 'Har', 'Has', 'Hag', 'Har', 'He', 'Hi', 'Hil', 'Hjol', 'Ho', 'Hroth', 'Hu',
      'I', 'Ig', 'Il', 'In',
      'Ja', 'Jar', 'Jas', 'Je', 'Jer', 'Jho', 'Jo', 'Ju',
      'Ka', 'Kas', 'Ke', 'Ki', 'Kil', 'Khor', 'Ko', 'Kor', 'Krel', 'Kur', 'Kyr',
      'La', 'Lai', 'Lar', 'Leh', 'Lem', 'Let', 'Lo', 'Loy',
      'Ma', 'Mad', 'Mag', 'Mal', 'Man', 'Mer', 'Mi', 'Mis', 'Mon', 'Mor', 'Mul', 'Mun', 'My', 'Myr',
      'Na', 'Ne', 'Nim', 'No', 'Nor', 'Ny',
      'O', 'Or', 'Os', 'Oys',
      'Pa', 'Phe', 'Pir', 'Po',
      'Qu', 'Quim', 'Quin',
      'Ra', 'Ran', 'Rash', 'Rez', 'Ri', 'Rit', 'Ro', 'Ru', 'Ry',
      'Sa', 'San', 'Sha', 'Shak', 'Sip', 'Skun', 'So', 'Sol', 'Sou', 'Stor', 'Stra', 'Sy',
      'Ta', 'Tar', 'Te', 'Ted', 'Tem', 'Tha', 'The', 'Tho', 'Thu', 'Thor', 'Tol', 'Tro', 'Ty',
      'U', 'Ul', 'Uv',
      'Vad', 'Ver', 'Vi', 'Vir', 'Vo',
      'Wa', 'War', 'Wer', 'Wil', 'Whit', 'Wol', 'Wor', 'Wy', 'Wys',
      'Xar', 'Xe', 'Xiao', 'Xy',
      'Y',
      'Zam', 'Zol', 'Zu', 'Zy'
   ],
   [
      'ah', 'al', 'an', 'art',
      'bac', 'bal', 'bar', 'ben', 'berg', 'bert', 'bin', 'bion', 'boz', 'bu', 'bus', 'by',
      'ce', 'chin', 'chus', 'com', 'comb', 'con', 'cus', 'cy',
      'dal', 'dalf', 'dan', 'dar', 'dek', 'den', 'der', 'din', 'dit', 'do', 'dor', 'doth', 'dox', 'dreth', 'dro', 'dross', 'dun', 'dush', 'dut', 'dwin',
      'fax', 'fir', 'fner', 'fred', 'fric', 'fus',
      'gal', 'gar', 'gash', 'gem', 'ger', 'gham', 'gil', 'go', 'gor', 'gos', 'grim', 'guk', 'gus',
      'ham', 'hel', 'hias', 'hild',
      'ine', 'it',
      'jit',
      'ka', 'kai', 'kal', 'kan', 'kar', 'ker', 'kes', 'kial', 'kin', 'kix', 'kon', 'krus', 'ku', 'kul',
      'lach', 'lan', 'land', 'las', 'dler', 'le', 'lem', 'lex', 'ley', 'li', 'lich', 'lid', 'lin', 'linn', 'lion', 'lis', 'lith', 'lix', 'lon', 'loo', 'lor', 'lu',
      'mab', 'mar', 'mer', 'mien', 'min', 'mir', 'mog', 'moth', 'mus', 'myr',
      'nak', 'nan', 'nar', 'nard', 'nath', 'nax', 'nay', 'ne', 'nen', 'ner', 'niel', 'nil', 'ning', 'nis', 'no', 'nor', 'nos', 'nosh', 'nur', 'nus', 'nuz',
      'od', 'ok', 'on',
      'pai', 'par', 'pih', 'pus',
      'raih', 'ralt', 'ran', 'rath', 'reg', 'rel', 'rek', 'ren', 'ret', 'reth', 'rey', 'ric', 'rick', 'rik', 'ril', 'rin', 'rion', 'ris', 'rish', 'rius', 'rlon', 'rod', 'rog', 'rold', 'ron', 'rosh', 'ru', 'run', 'rus', 'ry', 'ryk', 'rys',
      'sa', 'sar', 'sel', 'ser', 'sham', 'shan', 'shnard', 'sin', 'sis', 'son', 'stan', 'stian', 'storn', 'stral',
      'tal', 'tan', 'tar', 'te', 'tex', 'thas', 'thik', 'thran', 'ti', 'tner', 'ton', 'tor', 'tos', 'tram', 'trim',
      'ur',
      'van', 'vath', 'ven', 'vian', 'vius', 'vis', 'vin', 'von', 'vor', 'vyn',
      'wald', 'wall', 'war', 'well', 'wick', 'win', 'wulf',
      'xon',
      'ym', 'ymr',
      'zar', 'zem', 'zil', 'zir', 'zis', 'znak', 'zok', 'zuss'
   ]
];

const arrayM3 = [
   [
      'A', 'Ad', 'Ai', 'Al', 'Ar', 'As',
      'Ba', 'Bo', 'Bra',
      'Co', 'Cus',
      'Da', 'De',
      'E', 'El', 'Er', 'Ez',
      'Fle',
      'Ge', 'Gur',
      'Ha', 'Has', 'He', 'Hem',
      'I', 'In',
      'Ja', 'Je', 'Jed',
      'Ka', 'Krel', 'Kres',
      'Le',
      'Ma', 'Mar', 'Mi', 'Mo',
      'Nor',
      'Pi', 'Po',
      'Ra', 'Ru',
      'Sa', 'Sar', 'Sco', 'Se', 'She',
      'Tal', 'Te', 'Ter', 'Tho', 'To', 'Ty',
      'U',
      'Va', 'Vil', 'Vla',
      'We',
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
      'ka', 'ken', 'ki',
      'la', 'le', 'les', 'li', 'lis', 'lix',
      'ma', 'me', 'mo',
      'na', 'nat', 'ne', 'ni', 'nis', 'no',
      'que',
      'ra', 'rai', 'ran', 're', 'ri', 'ro', 'run', 'rus',
      'sa', 'san', 'se', 'ser', 'si', 'sia',
      'ta', 'te', 'tha', 'than', 'tid', 'tral',
      'u',
      'van', 've', 'ves',
      'zi'
   ],
   [
      'aki', 'al', 'an',
      'bald',
      'con',
      'del', 'dor', 'doth', 'dram',
      'gar', 'gark', 'go', 'goth', 'gus',
      'id',
      'kan', 'kas', 'kith', 'kon',
      'la', 'lack', 'le', 'lin', 'lo', 'loth',
      'mar', 'mer', 'min', 'mir', 'mish', 'mo', 'mon', 'my',
      'nen', 'ni', 'niel', 'nis', 'nius', 'nog', 'nor',
      'on', 'os',
      'ram', 'rar', 'rard', 're', 'ri', 'rian', 'rim', 'rio', 'ris', 'rith', 'ro', 'rogg', 'rug',
      'sar', 'sel', 'shan', 'shar', 'shi', 'shnar', 'son', 'sos',
      'tar', 'te', 'til', 'tin', 'tis', 'tius', 'tos', 'trius',
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
      'Ma',
      'The',
      'Xer'
   ],
   [
      'ba', 'bi',
      'da', 'dhi', 'di', 'don',
      'e',
      'ham', 'ho',
      'li', 'lu',
      'mu',
      'o'
   ],
   [
      'ba',
      'da', 'do',
      'li',
      'ma',
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
      'ret', 'ro', 'rus',
      'si'
   ]
];


//Female

const arrayF1 = [
   [
      'Ash',
      'Beck',
      'Gem', 'Gwenn',
      'Shi', 'Styg',
      'Voy',
      'Yar',
      'Xsi'
   ]
];

const arrayF2 = [
   [
      'A', 'An', 'Ar', 'As', 'Au',
      'Ba', 'Bris',
      'Ca', 'Cai', 'Chan', 'Char', 'Chas', 'Ci', 'Cie', 'Cy',
      'Dia',
      'Ei',
      'Fio',
      'Gret',
      'Ha', 'Hol',
      'Is',
      'Ja',
      'Ka', 'Ki', 'Kyr',
      'Lu', 'Ly',
      'Ma', 'Mag', 'Man', 'Me', 'Mi', 'Mir', 'Mo',
      'Na', 'Ny',
      'O', 'Ou',
      'Pa', 'Pre', 'Py',
      'Rei', 'Rho', 'Ris', 'Ro',
      'San', 'Shar', 'Shi', 'Shu', 'Si', 'Sor', 'Syl', 'Syn',
      'Ta', 'Thu', 'Ti', 'Ty',
      'Ve', 'Ver', 'Vra',
      'Zo'
   ],
   [
      'ala',
      'ca', 'chin',
      'dish', 'dra',
      'ga', 'gar', 'gird',
      'le', 'li', 'lid', 'ly',
      'mus',
      'na', 'nar', 'nik', 'nka', 'nya',
      'pa',
      'qua',
      'ra', 're', 'ri', 'riam', 'ril', 'ris', 'rist',
      'sa', 'san', 'se', 'sha', 'shu', 'sic', 'sio', 'sis', 'ska', 'syn',
      'ti', 'tlin', 'tra',
      'va', 'via',
      'ya'
   ]
];

const arrayF3 = [
   [
      'A', 'Ac', 'Ad', 'Ak',
      'Cal', 'Cas', 'Cris',
      'Da',
      'E',
      'Ga', 'Gun', 'Gri',
      'I',
      'Je',
      'Kay', 'Kin',
      'La', 'Le', 'Lo',
      'Me', 'Mir', 'Mu',
      'Ne',
      'O',
      'Se', 'Seh', 'Sep', 'Syl',
      'Ta',
      'Va'
   ],
   [
      'bet', 'bi',
      'cal', 'cta',
      'de', 'dra', 'dria', 'du',
      'e',
      'ge', 'gnis',
      'hin',
      'i',
      'ke', 'kro',
      'lan', 'le', 'les', 'li', 'lia', 'lo',
      'me', 'mi', 'mo',
      'na', 'no',
      'o',
      'pha',
      're', 'ri', 'rien', 'ro', 'ru',
      'sel',
      'ta', 'tia', 'tien',
      'va', 'vay'
   ],
   [
      'bel',
      'da', 'dia',
      'ha',
      'ia',
      'la', 'lei', 'lia',
      'ka',
      'ma', 'myth',
      'na', 'nas', 'ne', 'nia',
      'ra', 're', 'ria','rin', 'roth',
      'sa', 'sha', 'sia',
      'ta', 'tha', 'tra',
      'va', 'via',
      'ya'
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
      'na',
      're',
      'se', 'sio',
      'ta', 'the', 'tho',
      'xu'
   ],
   [
      'am',
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


//----------------------------------------------------------- Private Functions ----------------------------------------------------------

function ReturnValidatedGender(A_gender)
{
   let gender = C.strToLowerCase(A_gender)

   if (gender == 'm' || gender == 'male')
      gender = 'male'
   else if (gender == 'f' || gender == 'female')
      gender = 'female'
   else
      gender = C.chance(50) ? 'male' : 'female'

   return gender
}

function ReturnSyllablesArray(A_gender, A_syllablesAmount)
{
   let syllablesArray = []
   let gender = ReturnValidatedGender(A_gender)
   const syllablesAmount = C.checkIfIntInRange(A_syllablesAmount, 1, 4) ? A_syllablesAmount : C.rndBetween(1, 4);

   if (C.strCompare(gender, 'male'))
      syllablesArray = arraysMale[syllablesAmount - 1]
   else
      syllablesArray = arraysFemale[syllablesAmount - 1]

   return syllablesArray
}

//----------------------------------------------------------- Public Functions ----------------------------------------------------------

function TotalNamesCount()
{
   let namesMCount = (arrayM1[0].length) + ((arrayM2[0].length) * (arrayM2[1].length)) + ((arrayM3[0].length) * (arrayM3[1].length) * (arrayM3[2].length)) + ((arrayM4[0].length) * (arrayM4[1].length) * (arrayM4[2].length) * (arrayM4[3].length))
   let namesFCount = (arrayF1[0].length) + ((arrayF2[0].length) * (arrayF2[1].length)) + ((arrayF3[0].length) * (arrayF3[1].length) * (arrayF3[2].length)) + ((arrayF4[0].length) * (arrayF4[1].length) * (arrayF4[2].length) * (arrayF4[3].length))

   return namesMCount + namesFCount
}

function GenerateRandomName(A_gender, A_syllablesAmount)
{
   let name = ''
   let syllablesAmount = A_syllablesAmount ? A_syllablesAmount : C.rndNo0(4)
   let syllablesArray = ReturnSyllablesArray(A_gender, syllablesAmount)

   for (let i = 0; i < syllablesArray.length; i++)
      name = name + C.arrGetRandom(syllablesArray[i])

   return name
}

function CreateRandomName(A_gender, A_syllable, A_syllablePosition, A_syllablesAmount) {
   let name = ''
   let syllable = !A_syllable ? 'Tosch' : C.convertToString(A_syllable)
   let syllablePosition = C.checkIfIntInRange(A_syllablePosition, 1, 4) ? A_syllablePosition : C.rndBetween(1, 4);
   let syllablesAmount = C.checkIfIntInRange(A_syllablesAmount, syllablePosition, 4) ? A_syllablesAmount : C.rndBetween(syllablePosition, 4);

   let syllablesArray = ReturnSyllablesArray(A_gender, syllablesAmount)

   for (let i = 0; i < syllablesArray.length; i++) {
      if (i == syllablePosition - 1)
         name = name + syllable
      else
         name = name + C.arrGetRandom(syllablesArray[i])
   }

   name = C.strToLowerCase(name)
   name = C.strCapitalizeFirstLetter(name)

   return name
}


//----------------------------------------------------------- Exports ----------------------------------------------------------

module.exports.TotalNamesCount = TotalNamesCount
module.exports.GenerateRandomName = GenerateRandomName
module.exports.CreateRandomName = CreateRandomName
