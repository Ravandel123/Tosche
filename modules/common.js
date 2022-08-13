const D = require('discord.js');
const AS = require('./dataSpeech.js');
const SG = require('./schematicsGuild.js');

"use strict";

const MAX_MSG_LENGTH = 2000;
const PREFIX_LENGTH = 2;

//----------------------------------------------------------- CLASSES ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
class PersonGrammar {
   constructor(who) {
      if (!who || strCheckIfAnyMatch(who, ['i', 'me', 'you'])) {
         this._pronoun = 'you';
         this._pronounUC = 'You';
         this._verb = 'are';
         this._pastVerb = 'were';
         this._possessionVerb = 'have';
         this._determiner = 'your';
         this._extraEnding = '';
      } else {
         this._pronoun = who;
         this._pronounUC = strCapitalizeFirstLetter(who);
         this._verb = 'is';
         this._pastVerb = 'was';
         this._possessionVerb = 'has';
         this._determiner = who + '\'s';
         this._extraEnding = 's';
      }

      this._pv = this._pronoun + ' ' + this._verb;
      this._ppv = this._pronoun + ' ' + this._pastVerb;
      this._pposv = this._pronoun + ' ' + this._possessionVerb;
   }

   get pronoun() {
      return this._pronoun;
   }

   get pronounUC() {
      return this._pronounUC;
   }

   get verb() {
      return this._verb;
   }

   get pastVerb() {
      return this._pastVerb;
   }

   get possessionVerb() {
      return this._possessionVerb;
   }

   get determiner() {
      return this._determiner;
   }

   get extraEnding() {
      return this._extraEnding;
   }

   get pv() {
      return this._pv;
   }

   get ppv() {
      return this._ppv;
   }

   get pposv() {
      return this._pposv;
   }
}

module.exports.PersonGrammar = PersonGrammar;

//------------------------------------------------------------------------------------------------------------------
class ButtonData {
   constructor(id, label, emoji, style = `PRIMARY`) {
      this._id = id;
      this._label = label;
      this._emoji = emoji;
      this._style = style;
   }

   get id() {
      return this._id;
   }

   get label() {
      return this._label;
   }

   get emoji() {
      return this._emoji;
   }
   
   get style() {
      return this._style;
   }
}

module.exports.ButtonData = ButtonData;

//------------------------------------------------------------------------------------------------------------------
class SelectOptionData {
   constructor(value, label, emoji, description) {
      this._value = value;
      this._label = label;
      this._emoji = emoji;
      this._description = description;
   }

   get value() {
      return this._value;
   }

   get label() {
      return this._label;
   }

   get emoji() {
      return this._emoji;
   }
   
   get description() {
      return this._description;
   }
}

module.exports.SelectOptionData = SelectOptionData;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- CLIENT DATA ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function checkIfTaskCanBeAssigned(client, id) {
   const member = client.data.members.find(e => e.id == id);
   return !member || member.breakable;
}

   module.exports.checkIfTaskCanBeAssigned = checkIfTaskCanBeAssigned;

//------------------------------------------------------------------------------------------------------------------
function assignNewTask(client, id, collector, breakable = true) {
   let member = client.data.members.find(e => e.id == id);

   if (!member) {
      member = {
         id: id,
         busy: true,
         breakable: breakable,
         collector: collector
      }

      client.data.members.push(member);
      return true;
   }

   if (!member.breakable)
      return false;

   if (member.collector)
      member.collector.stop();

   member.breakable = breakable;
   member.collector = collector;
   return true;
}

module.exports.assignNewTask = assignNewTask;

//------------------------------------------------------------------------------------------------------------------
function finishTask(client, id) {
   const member = client.data.members.find(e => e.id == id);

   if (member) {
      member.busy = false;
      member.breakable = true;
      member.collector = null;
   }
}

module.exports.finishTask = finishTask;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- ARRAYS ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function arrCheckIfNotEmpty(array) {
   return (checkIfArray(array) && array?.length > 0);
}

module.exports.arrCheckIfNotEmpty = arrCheckIfNotEmpty;

//------------------------------------------------------------------------------------------------------------------
function arrGetDimension(array) {
   if (!checkIfArray(array))
      return;

   const dimensions = [];

   for (;;) {
      dimensions.push(array.length);

      if (checkIfArray(array[0]))
         array = array[0];
      else
         break;
   }

   return dimensions.length;
}

module.exports.arrGetDimension = arrGetDimension;

//------------------------------------------------------------------------------------------------------------------
function arrGetRandom(array) {
   if (checkIfArray(array))
      return array[Math.floor(Math.random() * array.length)];
}

module.exports.arrGetRandom = arrGetRandom;

//------------------------------------------------------------------------------------------------------------------
function arrConvertToUnqiue(array) {
   if (checkIfArray(array))
      return [... new Set(array)];
}

module.exports.arrConvertToUnqiue = arrConvertToUnqiue;

//------------------------------------------------------------------------------------------------------------------
function arrGetFirstByFunction(array, findFunction) {
   if (!checkIfArray(array) || !checkIfFunction(findFunction))
      return;

   return array.find(findFunction);
}

module.exports.arrGetFirstByFunction = arrGetFirstByFunction;

//------------------------------------------------------------------------------------------------------------------
function arrGetAllByFunction(array, findFunction) {
   if (!checkIfArray(array) || !checkIfFunction(findFunction))
      return;

   return array.filter(findFunction);
}

module.exports.arrGetAllByFunction = arrGetAllByFunction;

//------------------------------------------------------------------------------------------------------------------
function arrGetObjectByAnyOfItsValues(array, valueToFind) {
   if (!checkIfArray(array) || !checkIfExists(valueToFind))
      return;

   return array.find((e) => Object.values(e).some(e => strCompare(e, valueToFind)));
}

module.exports.arrGetObjectByAnyOfItsValues = arrGetObjectByAnyOfItsValues;

//------------------------------------------------------------------------------------------------------------------
function arrAddTextToAllItems(array, textAtStart = '', textAtEnd = '') {
   return convertByFunction(array, (e) => textAtStart + e + textAtEnd);
}

module.exports.arrAddTextToAllItems = arrAddTextToAllItems;

//------------------------------------------------------------------------------------------------------------------
function arrGetRandomFromPopulated1D(array2DToPopulate) {
   return arrGetRandom(arrGetPopulatedFrom2D(array2DToPopulate));
}

module.exports.arrGetRandomFromPopulated1D = arrGetRandomFromPopulated1D;

//------------------------------------------------------------------------------------------------------------------
function arr2DCheckItemExistence(array, itemToFind, columnToSearch) {
   if (!checkIfArray(array) || !itemToFind || !checkIfInt(columnToSearch))
      return;

   let found = false;

   for (let i = 0, j = array.length; i < j; i++) {
      if (array[i][columnToSearch] == itemToFind) {
         found = true;
         break;
      }
   }

   return found;
}

module.exports.arr2DCheckItemExistence = arr2DCheckItemExistence;

//------------------------------------------------------------------------------------------------------------------
function arr2DGetItemRow(array, itemToFind, columnToSearch = 0) {
   if (!checkIfArray(array) || !checkIfExists(itemToFind) || !checkIfInt(columnToSearch))
      return;

   let index;

   for (let i = 0, j = array.length; i < j; i++) {
      if (array[i][columnToSearch] == itemToFind) {
         index = i;
         break;
      }
   }

   return index;
}

module.exports.arr2DGetItemRow = arr2DGetItemRow;

//------------------------------------------------------------------------------------------------------------------
function arr2DGetItemColumnValue(array, itemToFind, columnToReturn, columnToSearch = -1) {
   if (!checkIfArray(array) || !checkIfExists(itemToFind) || !checkIfNaturalNumber(columnToReturn) || !checkIfInt(columnToSearch))
      return;

   for (let i = 0, ii = array.length; i < ii; i++) {
      if (columnToSearch < 0) {
         for (let j = 0, jj = array[i].length; j < jj; j++)
            if (array[i][j] == itemToFind)
               return array[i][columnToReturn];
      } else {
         if (array[i][columnToSearch] == itemToFind)
            return array[i][columnToReturn];
      }
   }
}

module.exports.arr2DGetItemColumnValue = arr2DGetItemColumnValue;

//------------------------------------------------------------------------------------------------------------------
function arrGetPopulatedFrom2D(array2D) {
   if (arrGetDimension(array2D) < 2)
      return;

   const populated1DArray = [];

   for (let i = 0, j = array2D.length; i < j; i++)
      for (let ii = 0, jj = array2D[i][1]; ii < jj; ii++)
         populated1DArray.push(array2D[i][0]);

   return populated1DArray;
}

module.exports.arrGetPopulatedFrom2D = arrGetPopulatedFrom2D;

//------------------------------------------------------------------------------------------------------------------
function arrGenerateFromFrequency(array, keyName, valueName) {
   if (!checkIfArray(array) || !checkAllByFunction(array, e => e[keyName] !== undefined && checkIfNaturalNumber(e[valueName])))
      return;

   const resultArray = [];

   for (item of array) {
      for (let i = 0; i < item[valueName]; i++)
         resultArray.push(item[keyName]);
    }

   return resultArray;
}

module.exports.arrGenerateFromFrequency = arrGenerateFromFrequency;

//------------------------------------------------------------------------------------------------------------------
function arrRandomFromFrequency(array, keyName, valueName) {
   return arrGetRandom(arrGenerateFromFrequency(array, keyName, valueName));
}

module.exports.arrRandomFromFrequency = arrRandomFromFrequency;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- RANDOM -----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function rnd(max = 100) {
   if (!checkIfNumber(max))
      return;

   return Math.floor(Math.random() * (max + 1));
}

module.exports.rnd = rnd;

//------------------------------------------------------------------------------------------------------------------
function rndNo0(max = 100) {
   if (!checkIfNumber(max))
      return;

   return Math.floor(Math.random() * max) + 1;
}

module.exports.rndNo0 = rndNo0;

//------------------------------------------------------------------------------------------------------------------
function rndBetween(min, max, decimalPlaces = 0) {
   if (!checkIfNumber(min) || !checkIfNumber(max))
      return;

   const result = +min + Math.random() * (+max - +min);
   return roundNumber(result, decimalPlaces);
}

module.exports.rndBetween = rndBetween;

//------------------------------------------------------------------------------------------------------------------
function chance(chanceOfSuccess) {
   if (!checkIfNumber(chanceOfSuccess))
      return;

   return rnd(99) < chanceOfSuccess;
}

module.exports.chance = chance;

//------------------------------------------------------------------------------------------------------------------
function generateRandomMultiplier(maxDigitScope) {
   if (!checkIfNumber(maxDigitScope))
      return;

   let multiplier = 1;

   for (let i = 0; i < maxDigitScope; i++) {
      multiplier = multiplier * 10;

      if (chance(50))
         break;
   }

   return multiplier;
}

module.exports.generateRandomMultiplier = generateRandomMultiplier;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- SCHEMATICS -----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function checkIfProfile(value) {
   return value instanceof SG.profile;
}

module.exports.checkIfProfile = checkIfProfile;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- TEXT -----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function strRemoveSpaces(string) {
   if (!checkIfString(string))
      return;

   return string.replace(/\s/g, '');
}

module.exports.strRemoveSpaces = strRemoveSpaces;

//------------------------------------------------------------------------------------------------------------------
function strGetFirstChar(string) {
   if (!checkIfString(string))
      return;

   return string.charAt(0);
}

module.exports.strGetFirstChar = strGetFirstChar;

//------------------------------------------------------------------------------------------------------------------
function strGetLastChar(string) {
   if (!checkIfString(string))
      return;

   return string.charAt(string.length - 1);
}

module.exports.strGetLastChar = strGetLastChar;

//------------------------------------------------------------------------------------------------------------------
function strGetCharAt(string, index) {
   if (!checkIfString(string) || (index < 0 ? Math.abs(index) : index + 1) > string.length)
      return;

   return index >= 0 ? string.charAt(index) : string.charAt(string.length + index);
}

module.exports.strGetCharAt = strGetCharAt;

//------------------------------------------------------------------------------------------------------------------
function strToLowerCase(value) {
   return convertByFunction(value, (e) => checkIfString(e) ? e.toLowerCase() : e);
}

module.exports.strToLowerCase = strToLowerCase;

//------------------------------------------------------------------------------------------------------------------
function strCapitalizeFirstLetter(value, extraCheck = true) {
   return convertByFunction(value, (e) => {
      if (!checkIfString(e))
         return e;

      if (extraCheck && e.startsWith('http'))
         return e;

      return e.charAt(0).toUpperCase() + e.slice(1)
   });
}

module.exports.strCapitalizeFirstLetter = strCapitalizeFirstLetter;

//------------------------------------------------------------------------------------------------------------------
function strGetSyllablesAmount(wordToCheck) {
   if (!checkIfString(wordToCheck))
      return;

   let word = wordToCheck.toLowerCase();
   let additionalSyllables = 0;

   if (word.length > 3) {
      if (word.substring(0,4) == 'some') {
         word = word.replace('some', '');
         additionalSyllables++;
      }
   }

   word = word.replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, '');
   word = word.replace(/^y/, '');

   let syl = word.match(/[aeiouy]{1,2}/g);
   if (syl)
      return syl.length + additionalSyllables;
}

module.exports.strGetSyllablesAmount = strGetSyllablesAmount;

//------------------------------------------------------------------------------------------------------------------
function strDecapitalizeFirstLetter(value) {
   return convertByFunction(value, (e) => checkIfString(e) ? e.charAt(0).toLowerCase() + e.slice(1) : e);
}

module.exports.strDecapitalizeFirstLetter = strDecapitalizeFirstLetter;

//------------------------------------------------------------------------------------------------------------------
function strBold(string) {
   if (!string)
      return;

   return '**' + string + '**';
}

module.exports.strBold = strBold;

//------------------------------------------------------------------------------------------------------------------
function strItalics(string) {
   if (!string)
      return;

   return '*' + string + '*';
}

module.exports.strItalics = strItalics;

//------------------------------------------------------------------------------------------------------------------
function strUnderline(string) {
   if (!string)
      return;

   return '__' + string + '__';
}

module.exports.strUnderline = strUnderline;

//------------------------------------------------------------------------------------------------------------------
function strCompare(string1, string2, ignoreCase = true) {
   if (!checkIfExists(string1) || !checkIfExists(string2))
      return;

   return ignoreCase ? strToLowerCase(string1) == strToLowerCase(string2) : string1 == string2;
}

module.exports.strCompare = strCompare;

//------------------------------------------------------------------------------------------------------------------
function strCheckIfContains(string, fragment, ignoreCase = true) {
   if (!checkIfExists(string))
      return;

   let fixedString = convertToString(string);
   let fixedFragment = convertToString(fragment);

   if (ignoreCase) {
      fixedString = strToLowerCase(fixedString);
      fixedFragment = strToLowerCase(fixedFragment);
   }

   return fixedString.indexOf(fixedFragment) != -1;
}

module.exports.strCheckIfContains = strCheckIfContains;

//------------------------------------------------------------------------------------------------------------------
function strCheckIfContainsAny(value, array, ignoreCase = true) {
   if (!checkIfExists(value) || !checkIfArray(array))
      return;

   if (checkIfArray(value)) {
      for (arr of value) {
         if (checkIfAnyByFunction(array, e => strCheckIfContains(arr, e, ignoreCase)))
            return true;
       }
   } else {
      if (checkIfAnyByFunction(array, e => strCheckIfContains(value, e, ignoreCase)))
         return true;
   }

   return false;
}

module.exports.strCheckIfContainsAny = strCheckIfContainsAny;

//------------------------------------------------------------------------------------------------------------------
function strCheckIfContainsAll(string, array, ignoreCase = true) {
   if (!checkIfExists(string) || !checkIfArray(array))
      return;

   for (const text of array) {
      if (!strCheckIfContains(string, text, ignoreCase))
         return false;
   }

   return true;
}

module.exports.strCheckIfContainsAll = strCheckIfContainsAll;

//------------------------------------------------------------------------------------------------------------------
function strCheckIfAnyMatch(string, array, ignoreCase = true) {
   if (!checkIfString(string) || !checkIfArray(array))
      return;

   return ignoreCase ? checkIfAnyMatch(strToLowerCase(string), strToLowerCase(array)) : checkIfAnyMatch(string, array);
}

module.exports.strCheckIfAnyMatch = strCheckIfAnyMatch;


//------------------------------------------------------------------------------------------------------------------
function strCheckIfVowel(letter) {
   if (!checkIfString(letter))
      return;

   return strCheckIfAnyMatch(letter, AS.vowels);
}

//------------------------------------------------------------------------------------------------------------------
function strRemoveBetween(string, startIndex, endIndex) {
   if (!checkIfString(string) || !checkIfNaturalNumber(startIndex) || !checkIfNaturalNumber(endIndex))
      return;

   if (endIndex < startIndex)
      startIndex = endIndex;

  let part1 = string.substring(0, startIndex);
  let part2 = string.substring(endIndex);

  return part1 + part2;
}

module.exports.strRemoveBetween = strRemoveBetween;

//------------------------------------------------------------------------------------------------------------------
function strRemoveAllSpecialChars(string) {
   if (!checkIfString(string))
      return;

   return string.replace(/[ `~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}

module.exports.strRemoveAllSpecialChars = strRemoveAllSpecialChars;

//------------------------------------------------------------------------------------------------------------------
function strAddArticle(string, makeBold = false) {
   if (!checkIfString(string))
      return;

   let result = '';
   const firstLetter = strGetFirstChar(string);

   if (strCheckIfAnyMatch(string, AS.exceptionsWithA)) {
      result = 'a ';
   } else if (strCheckIfAnyMatch(string, AS.exceptionsWithAn)) {
      result = 'an ';
   } else if (strCheckIfAnyMatch(string, AS.exceptionsWithNone)) {
      result = '';
   } else if (strCheckIfAnyMatch(string, AS.vowels)) {
      result = 'an ';
   } else {
      result = 'a ';
   }

   return makeBold ? `${result}**${string}**` : `${result}${string}`;
}

module.exports.strAddArticle = strAddArticle;

//------------------------------------------------------------------------------------------------------------------
function strAddEndingApostrophe(string) {
   if (!checkIfString(string))
      return;

   const ending = strCompare(strGetLastChar(string), 's') ? '\'' : '\'s';

   return string + ending;
}
module.exports.strAddEndingApostrophe = strAddEndingApostrophe;

//------------------------------------------------------------------------------------------------------------------
function strGetPastTense(verb) {
   if (!checkIfString(verb))
      return;

   const irregularVerb = arr2DGetItemColumnValue(AS.verbsIrregular, strToLowerCase(verb), 1, 0);
   if (irregularVerb)
      return irregularVerb;

   if (verb.length < 3)
      return verb + 'ed';

   const syllablesAmount = strGetSyllablesAmount(verb);
   const lastChar1 = strGetLastChar(verb);
   const lastChar2 = strGetCharAt(verb, -2);
   const lastChar3 = strGetCharAt(verb, -3);
   const lastChar1Vowel = strCheckIfVowel(lastChar1);
   const lastChar2Vowel = strCheckIfVowel(lastChar2);
   const lastChar3Vowel = strCheckIfVowel(lastChar3);

   let pastTenseVerb;

   if (syllablesAmount == 1 && !lastChar1Vowel && lastChar2Vowel && !lastChar3Vowel && !['w', 'x', 'y'].includes(lastChar1)) {
      pastTenseVerb = verb + lastChar1 + 'ed';
   } else if (lastChar1 == 'y' && !lastChar2Vowel) {
      pastTenseVerb = verb.slice(0, -1) + 'ied';
   } else {
      switch(strToLowerCase(lastChar1)) {
         case 'c':
            pastTenseVerb = verb + 'ked';
            break;

         case 'e':
            pastTenseVerb = verb + 'd';
            break;

         default:
            pastTenseVerb = verb + 'ed';
            break;
      }
   }

   return strToLowerCase(pastTenseVerb);
}

module.exports.strGetPastTense = strGetPastTense;

//------------------------------------------------------------------------------------------------------------------
function strGetBasicPronoun(string) {
   if (strCompare(string, 'female'))
      return 'she';
   else if (strCompare(string, 'male'))
      return 'he';

   return;
}

module.exports.strGetBasicPronoun = strGetBasicPronoun;

//------------------------------------------------------------------------------------------------------------------
function strGetPronoun(string, version = 1) {
   if (!checkIfString(string))
      return;

   const stringLowered = strToLowerCase(string);
   let result = arr2DGetItemColumnValue(AS.pronouns, stringLowered, version, 0);

   if (!result)
      result = strAddEndingApostrophe(string);

   return result;
}

module.exports.strGetPronoun = strGetPronoun;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- TIME ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function sleep(s) {
   return new Promise(resolve => setTimeout(resolve, s * 1000));
}

module.exports.sleep = sleep;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- OBJECTS ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function objCompare(object1, object2) {
   if (!checkAllByFunction([object1, object2], checkIfObject))
      return;

   const keys1 = Object.keys(object1);
   const keys2 = Object.keys(object2);

   if (keys1.length !== keys2.length)
      return false;

   for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = checkIfObject(val1) && checkIfObject(val2);

      if (areObjects && !objCompare(val1, val2) || !areObjects && val1 !== val2)
         return false;
   }

   return true;
}

module.exports.objCompare = objCompare;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- VALIDATION ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function checkIfExists(itemToCheck) {
   return itemToCheck || itemToCheck == 0;
}

module.exports.checkIfExists = checkIfExists;

//------------------------------------------------------------------------------------------------------------------
function checkIfNumberIsPositive(value) {
   if (value === 0)
      return value.toLocaleString()[0] !== "-";

   return value > 0;
}

module.exports.checkIfNumberIsPositive = checkIfNumberIsPositive;

//------------------------------------------------------------------------------------------------------------------
function checkAllByFunction(objectToCheck, checkFunction) {
   if (!checkIfExists(objectToCheck) || !checkIfFunction(checkFunction))
      return;

   if (checkIfArray(objectToCheck))
      return objectToCheck.every(checkFunction);
   else
      return checkFunction(objectToCheck);
}

module.exports.checkAllByFunction = checkAllByFunction;

//------------------------------------------------------------------------------------------------------------------
function checkIfAnyByFunction(objectToCheck, checkFunction) {
   if (!checkIfExists(objectToCheck) || !checkIfFunction(checkFunction))
      return;

   if (checkIfArray(objectToCheck))
      return objectToCheck.some(checkFunction);
   else
      return checkFunction(objectToCheck);
}

module.exports.checkIfAnyByFunction = checkIfAnyByFunction;

//------------------------------------------------------------------------------------------------------------------
function checkIfAnyMatch(soughtItem, objectToCheck, checkType = false) {
   return checkIfAnyByFunction(objectToCheck, e => checkType ? e === soughtItem : e == soughtItem);
}

module.exports.checkIfAnyMatch = checkIfAnyMatch;

//------------------------------------------------------------------------------------------------------------------
function checkIfArray(value) {
   return Array.isArray(value);
}

module.exports.checkIfArray = checkIfArray;

//------------------------------------------------------------------------------------------------------------------
function checkIfFunction(value) {
   return value instanceof Function;
}

module.exports.checkIfFunction = checkIfFunction;

//------------------------------------------------------------------------------------------------------------------
function checkIfObject(value) {
   return typeof value === 'object' && !checkIfArray(value);
}

module.exports.checkIfObject = checkIfObject;

//------------------------------------------------------------------------------------------------------------------
function checkIfNumber(value) {
   return !isNaN(value);
}

module.exports.checkIfNumber = checkIfNumber;

//------------------------------------------------------------------------------------------------------------------
function checkIfString(value) {
   return typeof value == 'string';
}

module.exports.checkIfString = checkIfString;

//------------------------------------------------------------------------------------------------------------------
function checkIfNaturalNumber(value) {
   return checkIfInt(value) && value >= 0;
}

module.exports.checkIfNaturalNumber = checkIfNaturalNumber;

//------------------------------------------------------------------------------------------------------------------
function checkIfNaturalNumberInScope(value, min, max) {
   return checkIfInt(value) && value >= 0 && value >= min && value <= max;
}

module.exports.checkIfNaturalNumberInScope = checkIfNaturalNumberInScope;

//------------------------------------------------------------------------------------------------------------------
function checkIfInt(objectToCheck, convertToNumberFirst = true) {
   return checkAllByFunction(objectToCheck, (e) => Number.isInteger(convertToNumberFirst ? Number(e) : e));
}

module.exports.checkIfInt = checkIfInt;

//------------------------------------------------------------------------------------------------------------------
function checkIfIntInRange(value, min, max, convertToNumberFirst = true) {
   if (!checkIfInt([value, min, max], convertToNumberFirst))
      return;

   return +value >= +min && +value <= +max;
}

module.exports.checkIfIntInRange = checkIfIntInRange;

//------------------------------------------------------------------------------------------------------------------
function chackIfImageUrl(url) {
   return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

module.exports.chackIfImageUrl = chackIfImageUrl;

//------------------------------------------------------------------------------------------------------------------
function checkIfValidHttpUrl(string) {
   let url;

   try {
      url = new URL(string);
   } catch (_) {
      return false;  
   }

   return url.protocol === "http:" || url.protocol === "https:";
}

module.exports.checkIfValidHttpUrl = checkIfValidHttpUrl;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- CONVERTERS ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function convertByFunction(objectToConvert, convertFunction) {
   if (!checkIfExists(objectToConvert) || !checkIfFunction(convertFunction))
      return;

   if (checkIfArray(objectToConvert))
      return objectToConvert.map(convertFunction);
   else
      return convertFunction(objectToConvert);
}

module.exports.convertByFunction = convertByFunction;

//------------------------------------------------------------------------------------------------------------------
function convertToInt(value) {
   return convertByFunction(value, (e) => parseInt(e));
}

module.exports.convertToInt = convertToInt;

//------------------------------------------------------------------------------------------------------------------
function convertToString(value) {
   return convertByFunction(value, (e) => e.toString());
}

module.exports.convertToString = convertToString;

//------------------------------------------------------------------------------------------------------------------
function roundNumber(value, decimalPlaces = 0) {
   if (!checkIfNumber(value) || !checkIfNaturalNumber(decimalPlaces))
      return;

   const n = Math.pow(10, decimalPlaces);
   return Math.round((value + Number.EPSILON) * n) / n;
}

module.exports.roundNumber = roundNumber;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- DISCORD ----------------------------------------------------------

//https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/frequently-asked-questions.md
//https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/understanding/roles.md
//https://discordjs.guide/additional-info/changes-in-v12.html#collection

//-------------------------------------------------------Channels-------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function dcGetChannel(element) {
   if (dcCheckIfMessage(element))
      return element.channel;
   else if (dcCheckIfChannel(element))
      return element;
}

module.exports.dcGetChannel = dcGetChannel;

//------------------------------------------------------------------------------------------------------------------
function dcGetChannelByName(element, channelName) {
   if (!checkIfExists(channelName))
      return;

   const searchFunction = e => e.name === channelName;

   if (dcCheckIfGuild(element))
      return element.channels.cache.find(searchFunction);
   else if (dcCheckIfGuildMessage(element))
      return element.guild.channels.cache.find(searchFunction);
}

module.exports.dcGetChannelByName = dcGetChannelByName;

//------------------------------------------------------------------------------------------------------------------
function dcGetChannelByID(message, channelID) {
   if (!dcCheckIfMessage(message) || !checkIfExists(channelID))
      return;

   return message.client?.channels?.cache.find(e => e.id === channelID);
}

module.exports.dcGetChannelByID = dcGetChannelByID;

//------------------------------------------------------------------------------------------------------------------
async function dcGetCreateOrUnarchiveThread(channel, threadName, member) {
   if (!dcCheckIfGuildChannel(channel) || dcCheckIfThread(channel) || !checkIfExists(threadName) || !dcCheckIfMember(member))
      return Promise.reject(`Wrong input data!`);

   await channel.threads.fetchArchived(); //Needed for loading archived threads to cache
   let thread = channel.threads.cache.find(t => t.name === threadName);

   if (!thread) {
      thread = await channel.threads.create({
         name: threadName,
         autoArchiveDuration: 60,
         reason: '',
      });
   } else {
      if (thread.archived)
         await thread.setArchived(false);

      if (thread.joinable)
         await thread.join();
   }

   await thread.members.add(member.id);

   return Promise.resolve(thread);
}

module.exports.dcGetCreateOrUnarchiveThread = dcGetCreateOrUnarchiveThread;

// ---------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------Checkers-------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function dcCheckIfCollection(value) {
   return value instanceof D.Collection;
}

module.exports.dcCheckIfCollection = dcCheckIfCollection;

//------------------------------------------------------------------------------------------------------------------
function dcCheckIfMessage(value) {
   return value instanceof D.Message;
}

module.exports.dcCheckIfMessage = dcCheckIfMessage;

//------------------------------------------------------------------------------------------------------------------
function dcCheckIfMessageComponents(value) {
   return checkAllByFunction(value, e => e instanceof D.ButtonBuilder || e instanceof D.SelectMenuBuilder)
}

module.exports.dcCheckIfMessage = dcCheckIfMessage;

//------------------------------------------------------------------------------------------------------------------
function dcCheckIfGuildMessage(message) {
   if (!dcCheckIfMessage(message))
      return;

   return message.guild;
}

module.exports.dcCheckIfGuildMessage = dcCheckIfGuildMessage;

//------------------------------------------------------------------------------------------------------------------
function dcCheckIfChannel(value) {
   return value instanceof D.TextChannel;
}

module.exports.dcCheckIfChannel = dcCheckIfChannel;

//------------------------------------------------------------------------------------------------------------------
function dcCheckIfGuildChannel(value) {
   return (dcCheckIfChannel(value) && value.guild !== undefined);
}

module.exports.dcCheckIfGuildChannel = dcCheckIfGuildChannel;

//------------------------------------------------------------------------------------------------------------------
function dcCheckIfThread(value) {
   return value instanceof D.ThreadChannel ;
}

module.exports.dcCheckIfThread = dcCheckIfThread;

//------------------------------------------------------------------------------------------------------------------
function dcCheckIfRole(value) {
   return value instanceof D.Role;
}

module.exports.dcCheckIfRole = dcCheckIfRole;

//------------------------------------------------------------------------------------------------------------------
function dcCheckIfMember(value) {
   return value instanceof D.GuildMember;
}

module.exports.dcCheckIfMember = dcCheckIfMember;

//------------------------------------------------------------------------------------------------------------------
function dcCheckIfGuild(value) {
   return value instanceof D.Guild;
}

module.exports.dcCheckIfGuild = dcCheckIfGuild;

//------------------------------------------------------------------------------------------------------------------
function dcCheckIfDM(message) {
   if (!dcCheckIfMessage(message))
      return;

   return message.channel.type === 'dm';
}

module.exports.dcCheckIfDM = dcCheckIfDM;

// ---------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------Messages-------------------------------------------------------
// OK ---------------------------------------------------------------------------------------------------------------
function deleteMessages(message, amount) {
   if (!dcCheckIfMessage(message) || !checkIfIntInRange(amount, 0, 99))
      return;

   message.channel.bulkDelete(++amount, true)
      .catch(error => {
         message.reply(`An error occured while deleting messages! ${error}`);
      });
}

module.exports.deleteMessages = deleteMessages;

// OK ---------------------------------------------------------------------------------------------------------------
function dcSendMsg(message, msgContent, msgType = 'channel') {
   if (!dcCheckIfMessage(message))
      return;

   const finalMsg = getFixedMessageContent(msgContent);
   if (!finalMsg)
      return;

   switch(msgType) {
      case 'channel':
         dcSendMsgToChannel(message.channel, finalMsg);
         break;
      case 'dm':
         runFunctionOnAll(finalMsg, e => { if (e) message.author.send(e) });
         break;
      case 'reply':
         runFunctionOnAll(finalMsg, e => { if (e) message.reply(e) });
         break;
      default:
         break;
   }
}

module.exports.dcSendMsg = dcSendMsg;

//------------------------------------------------------------------------------------------------------------------
function dcSendMsgToChannel(channel, msgContent) {
   if (!dcCheckIfChannel(channel) || !checkIfExists(msgContent))
      return;

   const finalMsg = getFixedMessageContent(msgContent);
   if (!finalMsg)
      return;

   runFunctionOnAll(finalMsg, e => { if (e) channel.send(e) });
}

module.exports.dcSendMsgToChannel = dcSendMsgToChannel;

//------------------------------------------------------------------------------------------------------------------
async function dcSendMsgToChannelAndGetItsRef(msgOrChannel, msgContent) {
   if (!checkIfExists(msgContent))
      return Promise.reject(`You cannot send an empty message!`);

   if (convertToString(msgContent).length > MAX_MSG_LENGTH)
      return Promise.reject(`The message is too long! It can't be longer than ${MAX_MSG_LENGTH} characters!`);

   const channel = dcGetChannel(msgOrChannel);
   if (!channel)
      return Promise.reject(`Wrong input data!`);

   const msgReference = await channel?.send(msgContent);
   return Promise.resolve(msgReference);
}

module.exports.dcSendMsgToChannelAndGetItsRef = dcSendMsgToChannelAndGetItsRef;

//------------------------------------------------------------------------------------------------------------------
function dcRespondToMsg(message, msgContent) {
   dcSendMsg(message, msgContent, 'channel');
}

module.exports.dcRespondToMsg = dcRespondToMsg;

//------------------------------------------------------------------------------------------------------------------
function dcSendDM(message, userID, msgContent) {
   if (!msgContent)
      return;

   const user = dcGetUserByID(message, userID);
   if (user)
      user.send(msgContent);
}

module.exports.dcSendDM = dcSendDM;

//------------------------------------------------------------------------------------------------------------------
function dcSendDMToAuthor(message, msgContent) {
   dcSendMsg(message, msgContent, 'dm');
}

module.exports.dcSendDMToAuthor = dcSendDMToAuthor;

//------------------------------------------------------------------------------------------------------------------
function dcReplyToMsg(message, msgContent) {
   dcSendMsg(message, msgContent, 'reply');
}

module.exports.dcReplyToMsg = dcReplyToMsg;

//------------------------------------------------------------------------------------------------------------------
function dcRespondFromArray(message, array, msgType = 'channel') {
   if (!checkIfArray(array))
      return;

   dcSendMsg(message, arrGetRandom(array), msgType);
}

module.exports.dcRespondFromArray = dcRespondFromArray;

// ---------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------Roles-------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function dcGetRoleByName(element, roleName) {
   if (!checkIfExists(roleName))
      return;

   const searchFunction = e => e.name == roleName;

   if (dcCheckIfMember(element) || dcCheckIfGuildMessage(element))
      return element.guild.roles.cache.find(searchFunction);
   else if (dcCheckIfGuild(element))
      return element.roles.cache.find(searchFunction);
}

module.exports.dcGetRoleByName = dcGetRoleByName;

//------------------------------------------------------------------------------------------------------------------
function dcAddRoleToMember(member, roleName) {
   const role = dcGetRoleByName(member, roleName);

   if (role)
      member.roles.add(role);
}

module.exports.dcAddRoleToMember = dcAddRoleToMember;

//------------------------------------------------------------------------------------------------------------------
function dcRemoveRoleFromMember(member, roleName) {
   const role = dcGetRoleByName(member, roleName);

   if (role)
      member.roles.remove(role);
}

module.exports.dcRemoveRoleFromMember = dcRemoveRoleFromMember;

//------------------------------------------------------------------------------------------------------------------
function dcCheckIfMemberHasRole(member, roleName) {
   if (dcCheckIfMember(member) && roleName)
      return member.roles.cache.some(e => e.name == roleName);
}

module.exports.dcCheckIfMemberHasRole = dcCheckIfMemberHasRole;

// ---------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------Users-------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function dcGetUserByID(message, userID) {
   if (!dcCheckIfMessage(message) || !userID)
      return;

   return message.client?.users?.cache?.get(userID);
}

module.exports.dcGetUserByID = dcGetUserByID;

// ---------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------Members-------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function getMemberIdByNameOrMention(message, nameOrMention) {
   return dcGetMemberIDFromMention(nameOrMention) ?? dcGetAllMembersByNick(message, nameOrMention);
}

module.exports.getMemberIdByNameOrMention = getMemberIdByNameOrMention;

//------------------------------------------------------------------------------------------------------------------
function dcGetMemberByID(element, userID) {
   if (!userID)
      return;

   if (dcCheckIfGuild(element))
      return element.members?.cache.get(userID);
   else if (dcCheckIfGuildMessage(element))
      return element.guild.members.cache.get(userID);
}

module.exports.dcGetMemberByID = dcGetMemberByID;

//------------------------------------------------------------------------------------------------------------------
function dcGetMessageAuthorAsMember(message) {
   if (dcCheckIfGuildMessage(message))
      return message.member;
}

module.exports.dcGetMessageAuthorAsMember = dcGetMessageAuthorAsMember;

//------------------------------------------------------------------------------------------------------------------
function dcGetAllMembersByNick(element, nick) {
   if (!checkIfExists(nick))
      return;

   const searchFunction = e => strCheckIfContains(e.displayName, nick);

   if (dcCheckIfGuildMessage(element))
      return element.guild.members.cache.filter(searchFunction);
   else (dcCheckIfGuild(element))
      return element.guild.members.cache.filter(searchFunction);
}

module.exports.dcGetAllMembersByNick = dcGetAllMembersByNick;

//------------------------------------------------------------------------------------------------------------------
function dcGetAllMembers(element) {
   if (dcCheckIfGuildMessage(element))
      return element.guild.members.cache;
   else if (dcCheckIfGuild(element))
      return element.members.cache;
}

module.exports.dcGetAllMembers = dcGetAllMembers;

//------------------------------------------------------------------------------------------------------------------
function dcGetMentionedMember(message) {
   if (dcCheckIfMessage(message))
      return message.mentions?.members?.first();
}

module.exports.dcGetMentionedMember = dcGetMentionedMember;

//------------------------------------------------------------------------------------------------------------------
function dcGetMemberIDFromMention(mention) {
   if (!strCheckIfContainsAll(mention, ['<@', '>']))
      return;

   const mentionStart = mention.indexOf('<@!') == -1 ? mention.indexOf('<@') + 2 : mention.indexOf('<@') + 3;

   return mention.substr(mentionStart, 18);
}

module.exports.dcGetMemberIDFromMention = dcGetMemberIDFromMention;

// ---------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------Interactions-------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function dcCreateRow(components) {
   if(dcCheckIfMessageComponents(components))
      return new D.ActionRowBuilder()
         .addComponents(components);
}

module.exports.dcCreateRow = dcCreateRow;

//------------------------------------------------------------------------------------------------------------------
function dcCreateButton(id, label, emoji, style = 'primary', isDisabled = false) {
   const stylesMap = new Map([
      ['primary', D.ButtonStyle.Primary],
      ['secondary', D.ButtonStyle.Secondary],
      ['success', D.ButtonStyle.Success],
      ['danger', D.ButtonStyle.Danger],
      ['link', D.ButtonStyle.Link]
   ]);

   const buttonStyle = stylesMap.get(style);

   if (checkIfExists(id) && buttonStyle) {
      const button = new D.ButtonBuilder()
         .setCustomId(id)
         .setStyle(buttonStyle)
         .setDisabled(isDisabled);

      if (label)
         button.setLabel(label)

      if (emoji)
         button.setEmoji(emoji);

      return button;
   }
}

module.exports.dcCreateButton = dcCreateButton;

//------------------------------------------------------------------------------------------------------------------
function dcCreateSelectMenu(id, placeholderText, options) {
   if (checkIfExists(id) && checkIfString(placeholderText) && checkIfExists(options))
      return new D.SelectMenuBuilder()
         .setCustomId(id)
         .setPlaceholder(placeholderText)
         .addOptions(options);
}

module.exports.dcCreateSelectMenu = dcCreateSelectMenu;

// ---------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------Internal-------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function getFixedMessageContent(msgContent) {
   if (!checkIfExists(msgContent))
      return;

   let finalMsg = [];
   let currentContent = msgContent;

   if (checkIfArray(currentContent)) {
      if (checkAllByFunction(currentContent, e => convertToString(e).length <= MAX_MSG_LENGTH))
         finalMsg = currentContent;
      else
         currentContent = currentContent.join('');
   } else if (currentContent.length <= MAX_MSG_LENGTH) {
      finalMsg.push(currentContent);
   }

   if (finalMsg.length == 0) {
      currentContent = convertToString(currentContent);

      do {
         finalMsg.push(currentContent.slice(0, MAX_MSG_LENGTH));
         currentContent = currentContent.slice(MAX_MSG_LENGTH, currentContent.length);

         if (currentContent.length != 0 && currentContent.length <= MAX_MSG_LENGTH)
            finalMsg.push(currentContent);
      } while (currentContent.length > MAX_MSG_LENGTH);
   }

   return finalMsg;
}

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- CALCULATION ----------------------------------------------------------
//-------------------------------------------------------Main-------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function calcBMI(height, weight) {
   if (!checkIfNumber(height) || !checkIfNumber(weight))
      return;

   const heightInMeters = height / 100;
   const bmi = weight / (heightInMeters * heightInMeters);

   return Math.round((bmi + Number.EPSILON) * 100) / 100;
}

module.exports.calcBMI = calcBMI;

//------------------------------------------------------------------------------------------------------------------
function calcBMIWeight(height, bmi) {
   if (!checkIfNumber(height) || !checkIfNumber(bmi))
      return;

   const heightInMeters = height / 100;
   const weight = heightInMeters * heightInMeters * bmi;

   return Math.round(weight);
}

module.exports.calcBMIWeight = calcBMIWeight;

//------------------------------------------------------------------------------------------------------------------
function calcFixMaxDecimal(value, maxDecimal = 2) {
   if (!checkIfNumber(value) || !checkIfNaturalNumber(maxDecimal))
      return;

   const decimal = Math.pow(10, maxDecimal);

   return Math.round((value + Number.EPSILON) * decimal) / decimal;
}

module.exports.calcFixMaxDecimal = calcFixMaxDecimal;

//------------------------------------------------------------------------------------------------------------------
function calcCmToImperial(centimeters, decimalPlaces = 0) {
   if (!checkIfNumber(centimeters))
      return;

   const totalInches = convertToInches(centimeters);
   const totalFeet = getTotalFeet(totalInches);
   const leftoverInches = getLeftoverInches(totalInches, decimalPlaces);

   return `${totalFeet}' ${leftoverInches}''`;
}

module.exports.calcCmToImperial = calcCmToImperial;

//------------------------------------------------------------------------------------------------------------------
function calcKgToImperial(kilograms, decimalPlaces = 0) {
   if (!checkIfNumber(kilograms))
      return;

   const totalOunces = convertToOunces(kilograms);
   const totalPounds = getTotalPounds(totalOunces);
   const leftoverOunces = getLeftoverOunces(totalOunces, decimalPlaces);

   return `${totalPounds} lb ${leftoverOunces} oz`;
}

module.exports.calcKgToImperial = calcKgToImperial;

//------------------------------------------------------------------------------------------------------------------
function calcFahrenheitToCelsius(value) {
   if (!checkIfNumber(value))
      return;

   return (value - 32) * 5 / 9;
}

module.exports.calcFahrenheitToCelsius = calcFahrenheitToCelsius;

//------------------------------------------------------------------------------------------------------------------
function calcCelsiusToFahrenheit(value) {
   if (!checkIfNumber(value))
      return;

   return (value * 9 / 5) + 32;
}

module.exports.calcCelsiusToFahrenheit = calcCelsiusToFahrenheit;

// ---------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------Other-------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function getFullKgToImperial(kilograms, decimalPlaces = 0) {
   return `${kilograms} kg (${calcKgToImperial(kilograms, decimalPlaces = 0)})`;
}

module.exports.getFullKgToImperial = getFullKgToImperial;


//------------------------------------------------------------------------------------------------------------------
function getFullCmToImperial(centimeters, decimalPlaces = 0) {
   return `${centimeters} cm (${calcCmToImperial(centimeters, decimalPlaces = 0)})`;
}

module.exports.getFullCmToImperial = getFullCmToImperial;

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- OTHER ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function runFunctionOnAll(objectToRunOn, functionToRun) {
   if (!checkIfExists(objectToRunOn) || !checkIfFunction(functionToRun))
      return;

   if (checkIfArray(objectToRunOn))
      objectToRunOn.forEach(functionToRun);
   else
      functionToRun(objectToRunOn);
}

module.exports.runFunctionOnAll = runFunctionOnAll;

//------------------------------------------------------------------------------------------------------------------
function recognizeWhoFullText(argument, message, command) {
   if (!dcCheckIfMessage(message) || !command)
      return;

   return (strCheckIfAnyMatch(argument, ['i', 'me']) || !argument) ? message.author.toString() : message.content.slice(command.length + 1);
}

module.exports.recognizeWhoFullText = recognizeWhoFullText;

//------------------------------------------------------------------------------------------------------------------
function recognizeWhoOneArg(argument, message) {
   if (!dcCheckIfMessage(message))
      return;

   return (strCheckIfAnyMatch(argument, ['i', 'me']) || !argument) ? message.author.toString() : argument;
}

module.exports.recognizeWhoOneArg = recognizeWhoOneArg;

//------------------------------------------------------------------------------------------------------------------
function recognizeWhoOneArgNoAuthor(argument, message) {
   if (!dcCheckIfMessage(message))
      return;

   return (strCheckIfAnyMatch(argument, ['i', 'me']) || !argument) ? 'you' : argument;
}

module.exports.recognizeWhoOneArgNoAuthor = recognizeWhoOneArgNoAuthor;

//------------------------------------------------------------------------------------------------------------------
function slicePrefix(argumentWithPrefix) {
   if (!checkIfString(argumentWithPrefix))
      return;

   return argumentWithPrefix.substring(PREFIX_LENGTH);
}

module.exports.slicePrefix = slicePrefix;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- INTERNALS ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function convertToInches(centimeters) {
   if (!checkIfNumber(centimeters))
      return;

   return centimeters * 0.39370078740157;
}

//------------------------------------------------------------------------------------------------------------------
function convertToOunces(kilograms) {
   if (!checkIfNumber(kilograms))
      return;

   return kilograms * 35.27396194958;
}

//------------------------------------------------------------------------------------------------------------------
function getTotalFeet(inches) {
   if (!checkIfNumber(inches))
      return;

   return Math.floor(inches / 12);
}

//------------------------------------------------------------------------------------------------------------------
function getTotalPounds(ounces) {
   if (!checkIfNumber(ounces))
      return;

   return Math.floor(ounces / 16);
}

//------------------------------------------------------------------------------------------------------------------
function getLeftoverInches(inches, decimalPlaces = 0) {
   if (!checkIfNumber(inches))
      return;

   return roundNumber(inches % 12, decimalPlaces);
}

//------------------------------------------------------------------------------------------------------------------
function getLeftoverOunces(ounces, decimalPlaces = 0) {
   if (!checkIfNumber(ounces))
      return;

   return roundNumber(ounces % 16, decimalPlaces);
}

//---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------