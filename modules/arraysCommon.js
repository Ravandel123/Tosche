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


//-----------------------------------------------------------Exports----------------------------------------------------------
module.exports = {
   arrayCharactersIrlOnly,
   arrayCharactersAll,
   arrayAdditionalFunnyWords,
   arrayDnDAlignments,
   arrayCurrenciesAll,
   arrayBodyShapes
};