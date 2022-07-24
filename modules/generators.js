const C = require('./common.js');
const AC = require('./arraysCommon.js');
const AS = require('./arraysSpeech.js');

"use strict";

//----------------------------------------------------------- GENERATION ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------------------------------
function genPerson() {
   return C.chance(75) ? C.arrGetRandom(AC.charactersIrlOnly) : C.arrGetRandom(AC.charactersAll);
}

module.exports.genPerson = genPerson;

//------------------------------------------------------------------------------------------------------------------
function genPersonalInsult() {
   const adjective = C.chance(75) ? C.arrGetRandom(AS.adjAcceptedInsulting) + ' ' : '';
   return `${adjective}${C.arrGetRandom(AS.nounsAcceptedInsulting)}`;
}

module.exports.genPersonalInsult = genPersonalInsult;

//------------------------------------------------------------------------------------------------------------------
function genAccuracy(capitalize = false) {
   const result = C.arrGetRandom(AS.termsAccuracy) + ' ';

   return capitalize ? C.strCapitalizeFirstLetter(result) : result;
}

module.exports.genAccuracy = genAccuracy;

//------------------------------------------------------------------------------------------------------------------
function genFunnyEnding(endingChar = '.', chanceForEnding = 25) {
   if (C.checkIfNumber(chanceForEnding))
      return (C.chance(chanceForEnding) ? `, ${C.arrGetRandom(AC.additionalFunnyWords)}` : '') + endingChar;
}

module.exports.genFunnyEnding = genFunnyEnding;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- MODIFICATION ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function addFunnyEnding(sentence) {
   if (!C.checkIfString(sentence))
      return;

   return C.chance(25) ? `${sentence.slice(0, -1)}, ${C.arrGetRandom(AC.additionalFunnyWords)}${sentence.slice(sentence.length - 1)}` : sentence;
}

module.exports.addFunnyEnding = addFunnyEnding;

//------------------------------------------------------------------------------------------------------------------
function addFunnyEndingToAll(arraySentences, endingChar = '.') {
   if (!C.checkIfArray(arraySentences))
      return;

   const ending = genFunnyEnding(endingChar);

   return C.arrAddTextToAllItems(arraySentences, '', ending);
}

module.exports.addFunnyEndingToAll = addFunnyEndingToAll;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------