//A B C D E F G H I J K L M N O P Q R S T U V W X Y Z

const charactersIrl = ['Dinly', 'Lanaar', 'Me', 'Ravandel', 'Catz', 'You', 'Nachtkind', 'Alban', 'Storyteller', 'Chini'];
const charactersSpecial = ['Everybody', 'Nobody'];
const charactersBwd = [
   'Asha', 'Ashtor', 'Beck', 'Bevan', 'Cain', 'Clovis', 'Crim', 'Dakkan', 'Eira', 'Hardin', 'Janik', 'Kenosh',
   'Mitra', 'Quinlan', 'Rathik', 'Rhosyn', 'Rook', 'Sigrid', 'Theo', 'Tosch', 'Tosche', 'Yurk'
];
const charactersBadGuys = [
   'Clovis',
   'Darth Vader',
   'Hannibal Lecter',
   'Saruman', 'Sauron',
   'Tosch', 'Tosche',
   'Voldemort'
];
const charactersIrlOnly = charactersIrl.concat(charactersSpecial);
const charactersAll = charactersIrl.concat(charactersSpecial, charactersBwd, charactersBadGuys);


const additionalFunnyWords = ['lol', 'yes-yes', 'lmao', 'xD'];


const dndAlignments = ['Lawful Good', 'Lawful Neutral', 'Lawful Evil', 'Neutral Good', 'True Neutral', 'Neutral Evil', 'Chaotic Evil', 'Chaotic Neutral', 'Chaotic Good'];


const currenciesIrl = ['bucks', '$', '€', '£'];
const currenciesFantasy = ['copper', 'silver', 'gold'];
const currenciesBwd = ['obsidian chips', 'pearl flakes', 'amber drops', 'ermehn slaves'];
const currenciesAll = currenciesIrl.concat(currenciesFantasy, currenciesBwd);

const bodyShapes = [
   { name: 'gaunt', chance: 5, minBMI: 14.5, maxBMI: 16.99 },
   { name: 'underweight', chance: 12, minBMI: 17, maxBMI: 18.49 },
   { name: 'normal', chance: 60, minBMI: 18.5, maxBMI: 24.99 },
   { name: 'overweight', chance: 12, minBMI: 25, maxBMI: 29.99 },
   { name: 'obese', chance: 3, minBMI: 30, maxBMI: 100 },
   { name: 'beefy', chance: 8, minBMI: 25, maxBMI: 45 }
];


//-----------------------------------------------------------Exports----------------------------------------------------------
module.exports = {
   charactersBadGuys,
   charactersIrlOnly,
   charactersAll,
   additionalFunnyWords,
   dndAlignments,
   currenciesAll,
   bodyShapes
};