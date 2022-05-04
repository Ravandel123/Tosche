const C = require('./common.js');
const AC = require('./arraysCommon.js');

//----------------------------------------------------------- GENERATION ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function genRandomMultiplier(maxDigitScope, nextDigitChance = 50) {
   if (!C.checkIfNumber(maxDigitScope))
      return;

   let multiplier = 1;

   for (let i = 0; i < maxDigitScope; i++) {
      multiplier = multiplier * 10;

      if (C.chance(nextDigitChance))
         break;
   }

   return multiplier;
}

module.exports.genRandomMultiplier = genRandomMultiplier;

// OK---------------------------------------------------------------------------------------------------------------
function genPerson() {
   return C.chance(75) ? C.arrGetRandom(AC.arrayCharactersIrlOnly) : C.arrGetRandom(AC.arrayCharactersAll);
}

module.exports.genPerson = genPerson;

// OK---------------------------------------------------------------------------------------------------------------
function genPersonalInsult() {
   const adjective = C.chance(75) ? C.arrGetRandom(AC.adjectivesAcceptedInsulting) + ' ' : '';
   return `${adjective}${C.arrGetRandom(AC.nounsAcceptedInsulting)}`;
}

module.exports.genPersonalInsult = genPersonalInsult;

// OK---------------------------------------------------------------------------------------------------------------
function genAccuracy(capitalize = false) {
   const result = C.arrGetRandom(AC.arrayAccuracy) + ' ';

   return capitalize ? C.strCapitalizeFirstLetter(result) : result;
}

module.exports.genAccuracy = genAccuracy;

// OK---------------------------------------------------------------------------------------------------------------
function genFunnyEnding(endingChar = '.') {
   return (C.chance(25) ? ', ' + C.arrGetRandom(AC.arrayAdditionalFunnyWords) : '') + endingChar;
}

module.exports.genFunnyEnding = genFunnyEnding;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- MODIFICATION ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function addFunnyEndingToAll(arraySentences, endingChar = '.') {
   if (!C.checkIfArray(arraySentences))
      return;

   const ending = genFunnyEnding(endingChar);

   return C.arrAddTextToAllItems(arraySentences, '', ending);
}

module.exports.addFunnyEndingToAll = addFunnyEndingToAll;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------