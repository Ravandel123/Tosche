const C = require('./common.js');
const AC = require('./arraysCommon.js');
const AS = require('./arraysSpeech.js');

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
   return C.chance(75) ? C.arrGetRandom(AC.charactersIrlOnly) : C.arrGetRandom(AC.charactersAll);
}

module.exports.genPerson = genPerson;

// OK---------------------------------------------------------------------------------------------------------------
function genPersonalInsult() {
   const adjective = C.chance(75) ? C.arrGetRandom(AS.adjectivesAcceptedInsulting) + ' ' : '';
   return `${adjective}${C.arrGetRandom(AS.nounsAcceptedInsulting)}`;
}

module.exports.genPersonalInsult = genPersonalInsult;

// OK---------------------------------------------------------------------------------------------------------------
function genAccuracy(capitalize = false) {
   const result = C.arrGetRandom(AS.termsAccuracy) + ' ';

   return capitalize ? C.strCapitalizeFirstLetter(result) : result;
}

module.exports.genAccuracy = genAccuracy;

// OK---------------------------------------------------------------------------------------------------------------
function genFunnyEnding(endingChar = '.', chanceForEnding = 25) {
   if (C.checkIfNumber(chanceForEnding))
      return (C.chance(chanceForEnding) ? `, ${C.arrGetRandom(AC.additionalFunnyWords)}` : '') + endingChar;
}

module.exports.genFunnyEnding = genFunnyEnding;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- MODIFICATION ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function addFunnyEnding(sentence) {
   if (C.checkIfString(sentence))
      return sentence.slice(0, -1) + ', ' + C.arrGetRandom(AC.additionalFunnyWords) + sentence.slice(sentence.length - 1);
}

module.exports.addFunnyEnding = addFunnyEnding;

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