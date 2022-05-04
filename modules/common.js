const D = require('discord.js');
const AC = require('./arraysCommon.js');

const MAX_MSG_LENGTH = 2000;
const PREFIX_LENGTH = 2;

//----------------------------------------------------------- CLASSES ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
class PersonGrammar {
   constructor(who) {
      if (!who || checkIfAnyMatch(who, ['i', 'me', 'you'])) {
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

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- ARRAYS ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function arrCheckIfNotEmpty(array) {
   return (checkIfArray(array) && array?.length > 0);
}

module.exports.arrCheckIfNotEmpty = arrCheckIfNotEmpty;

// OK---------------------------------------------------------------------------------------------------------------
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

// OK---------------------------------------------------------------------------------------------------------------
function arrGetRandom(array) {
   if (checkIfArray(array))
      return array[Math.floor(Math.random() * array.length)];
}

module.exports.arrGetRandom = arrGetRandom;

// OK---------------------------------------------------------------------------------------------------------------
function arrConvertToUnqiue(array) {
   if (checkIfArray(array))
      return [... new Set(array)];
}

module.exports.arrConvertToUnqiue = arrConvertToUnqiue;

// OK---------------------------------------------------------------------------------------------------------------
function arrGetFirstByFunction(array, findFunction) {
   if (!checkIfArray(array) || !checkIfFunction(findFunction))
      return;

   return array.find(findFunction);
}

module.exports.arrGetFirstByFunction = arrGetFirstByFunction;

// OK---------------------------------------------------------------------------------------------------------------
function arrGetAllByFunction(array, findFunction) {
   if (!checkIfArray(array) || !checkIfFunction(findFunction))
      return;

   return array.filter(findFunction);
}

module.exports.arrGetAllByFunction = arrGetAllByFunction;

// OK---------------------------------------------------------------------------------------------------------------
function arrGetObjectByAnyOfItsValues(array, valueToFind) {
   if (!checkIfArray(array) || !checkIfExists(valueToFind))
      return;

   return array.find((e) => Object.values(e).some(e => strCompare(e, valueToFind)));
}

module.exports.arrGetObjectByAnyOfItsValues = arrGetObjectByAnyOfItsValues;

// OK---------------------------------------------------------------------------------------------------------------
function arrAddTextToAllItems(array, textAtStart = '', textAtEnd = '') {
   return convertByFunction(array, (e) => textAtStart + e + textAtEnd);
}

module.exports.arrAddTextToAllItems = arrAddTextToAllItems;

// OK---------------------------------------------------------------------------------------------------------------
function arrGetRandomFromPopulated1D(array2DToPopulate) {
   return arrGetRandom(arrGetPopulatedFrom2D(array2DToPopulate));
}

module.exports.arrGetRandomFromPopulated1D = arrGetRandomFromPopulated1D;

// OK---------------------------------------------------------------------------------------------------------------
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

// OK---------------------------------------------------------------------------------------------------------------
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

// OK---------------------------------------------------------------------------------------------------------------
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

// OK---------------------------------------------------------------------------------------------------------------
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

// OK---------------------------------------------------------------------------------------------------------------
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

// OK---------------------------------------------------------------------------------------------------------------
function arrRandomFromFrequency(array, keyName, valueName) {
   return arrGetRandom(arrGenerateFromFrequency(array, keyName, valueName));
}

module.exports.arrRandomFromFrequency = arrRandomFromFrequency;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- RANDOM -----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function rnd(max = 100) {
   if (!checkIfNumber(max))
      return;

   return Math.floor(Math.random() * (max + 1));
}

module.exports.rnd = rnd;

// OK---------------------------------------------------------------------------------------------------------------
function rndNo0(max = 100) {
   if (!checkIfNumber(max))
      return;

   return Math.floor(Math.random() * max) + 1;
}

module.exports.rndNo0 = rndNo0;

// OK---------------------------------------------------------------------------------------------------------------
function rndBetween(min, max, decimalPlaces = 0) {
   if (!checkIfNumber(min) || !checkIfNumber(max))
      return;

   const result = min + Math.random() * (max - min);
   return roundNumber(result, decimalPlaces);
}

module.exports.rndBetween = rndBetween;

// OK---------------------------------------------------------------------------------------------------------------
function chance(chanceOfSuccess) {
   if (!checkIfNumber(chanceOfSuccess))
      return;

   return rnd(99) < chanceOfSuccess;
}

module.exports.chance = chance;

// OK---------------------------------------------------------------------------------------------------------------
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


//----------------------------------------------------------- TEXT -----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function strRemoveSpaces(string) {
   if (!checkIfString(string))
      return;

   return string.replace(/\s/g, '');
}

module.exports.strRemoveSpaces = strRemoveSpaces;

// OK---------------------------------------------------------------------------------------------------------------
function strGetFirstChar(string) {
   if (!checkIfString(string))
      return;

   return string.charAt(0);
}

module.exports.strGetFirstChar = strGetFirstChar;

// OK---------------------------------------------------------------------------------------------------------------
function strGetLastChar(string) {
   if (!checkIfString(string))
      return;

   return string.charAt(string.length - 1);
}

module.exports.strGetLastChar = strGetLastChar;

// OK---------------------------------------------------------------------------------------------------------------
function strToLowerCase(value) {
   return convertByFunction(value, (e) => checkIfString(e) ? e.toLowerCase() : e);
}

module.exports.strToLowerCase = strToLowerCase;

// OK---------------------------------------------------------------------------------------------------------------
function strCapitalizeFirstLetter(value) {
   return convertByFunction(value, (e) => checkIfString(e) ? e.charAt(0).toUpperCase() + e.slice(1) : e);
}

module.exports.strCapitalizeFirstLetter = strCapitalizeFirstLetter;


// OK---------------------------------------------------------------------------------------------------------------
function strDecapitalizeFirstLetter(value) {
   return convertByFunction(value, (e) => checkIfString(e) ? e.charAt(0).toLowerCase() + e.slice(1) : e);
}

module.exports.strDecapitalizeFirstLetter = strDecapitalizeFirstLetter;

// OK---------------------------------------------------------------------------------------------------------------
function strBold(string) {
   if (!string)
      return;

   return '**' + string + '**';
}

module.exports.strBold = strBold;

// OK---------------------------------------------------------------------------------------------------------------
function strItalics(string) {
   if (!string)
      return;

   return '*' + string + '*';
}

module.exports.strItalics = strItalics;

// OK---------------------------------------------------------------------------------------------------------------
function strUnderline(string) {
   if (!string)
      return;

   return '__' + string + '__';
}

module.exports.strUnderline = strUnderline;

// OK---------------------------------------------------------------------------------------------------------------
function strCompare(string1, string2, ignoreCase = true) {
   if (!checkIfExists(string1) || !checkIfExists(string2))
      return;

   return ignoreCase ? strToLowerCase(string1) == strToLowerCase(string2) : string1 == string2;
}

module.exports.strCompare = strCompare;

// OK---------------------------------------------------------------------------------------------------------------
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

// OK---------------------------------------------------------------------------------------------------------------
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

// OK---------------------------------------------------------------------------------------------------------------
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

// OK---------------------------------------------------------------------------------------------------------------
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

// OK---------------------------------------------------------------------------------------------------------------
function strRemoveAllSpecialChars(string) {
   if (!checkIfString(string))
      return;

   return string.replace(/[ `~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}

module.exports.strRemoveAllSpecialChars = strRemoveAllSpecialChars;

// OK---------------------------------------------------------------------------------------------------------------
function strAddArticle(string) {
   if (!checkIfString(string))
      return;

   let result = '';
   const stringLowered = strToLowerCase(string);
   const firstLetter = strGetFirstChar(stringLowered);

   if (checkIfAnyMatch(stringLowered, AC.arrayExceptionsWithA)) {
      result = 'a ';
   } else if (checkIfAnyMatch(stringLowered, AC.arrayExceptionsWithAn)) {
      result = 'an ';
   } else if (checkIfAnyMatch(stringLowered, AC.arrayExceptionsWithNone)) {
      result = '';
   } else {
      switch(firstLetter) {
         case 'a':
         case 'e':
         case 'i':
         case 'o':
         case 'u':
         case 'y':
           result = 'an ';
           break;

         default:
           result = 'a ';
      }
   }

   return result + string;
}

module.exports.strAddArticle = strAddArticle;

// OK---------------------------------------------------------------------------------------------------------------
function strAddEndingApostrophe(string) {
   if (!checkIfString(string))
      return;

   const ending = strCompare(strGetLastChar(string), 's') ? '\'' : '\'s';

   return string + ending;
}
module.exports.strAddEndingApostrophe = strAddEndingApostrophe;

// OK---------------------------------------------------------------------------------------------------------------
function strGetBasicPronoun(string) {
   if (strCompare(string, 'female'))
      return 'she';
   else if (strCompare(string, 'male'))
      return 'he';

   return;
}

module.exports.strGetBasicPronoun = strGetBasicPronoun;

// OK---------------------------------------------------------------------------------------------------------------
function strGetPronoun(string, version = 1) {
   if (!checkIfString(string))
      return;

   const stringLowered = strToLowerCase(string);
   let result = arr2DGetItemColumnValue(AC.arrayPronouns, stringLowered, version, 0);

   if (!result)
      result = strAddEndingApostrophe(string);

   return result;
}

module.exports.strGetPronoun = strGetPronoun;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- TIME ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function sleep(s) {
   return new Promise(resolve => setTimeout(resolve, s * 1000));
}

module.exports.sleep = sleep;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- OBJECTS ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
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
// OK---------------------------------------------------------------------------------------------------------------
function checkIfExists(itemToCheck) {
   return itemToCheck || itemToCheck == 0;
}

module.exports.checkIfExists = checkIfExists;

// OK---------------------------------------------------------------------------------------------------------------
function checkAllByFunction(objectToCheck, checkFunction) {
   if (!checkIfExists(objectToCheck) || !checkIfFunction(checkFunction))
      return;

   if (checkIfArray(objectToCheck))
      return objectToCheck.every(checkFunction);
   else
      return checkFunction(objectToCheck);
}

module.exports.checkAllByFunction = checkAllByFunction;

// OK---------------------------------------------------------------------------------------------------------------
function checkIfAnyByFunction(objectToCheck, checkFunction) {
   if (!checkIfExists(objectToCheck) || !checkIfFunction(checkFunction))
      return;

   if (checkIfArray(objectToCheck))
      return objectToCheck.some(checkFunction);
   else
      return checkFunction(objectToCheck);
}

module.exports.checkIfAnyByFunction = checkIfAnyByFunction;

// OK---------------------------------------------------------------------------------------------------------------
function checkIfAnyMatch(soughtItem, objectToCheck, checkType = false) {
   return checkIfAnyByFunction(objectToCheck, e => checkType ? e === soughtItem : e == soughtItem);
}

module.exports.checkIfAnyMatch = checkIfAnyMatch;

// OK---------------------------------------------------------------------------------------------------------------
function checkIfArray(value) {
   return Array.isArray(value);
}

module.exports.checkIfArray = checkIfArray;

// OK---------------------------------------------------------------------------------------------------------------
function checkIfFunction(value) {
   return value instanceof Function;
}

module.exports.checkIfFunction = checkIfFunction;

// OK---------------------------------------------------------------------------------------------------------------
function checkIfObject(value) {
   return typeof value === 'object';
}

module.exports.checkIfObject = checkIfObject;

// OK---------------------------------------------------------------------------------------------------------------
function checkIfNumber(value) {
   return !isNaN(value);
}

module.exports.checkIfNumber = checkIfNumber;

// OK---------------------------------------------------------------------------------------------------------------
function checkIfString(value) {
   return typeof value == 'string';
}

module.exports.checkIfString = checkIfString;

// OK---------------------------------------------------------------------------------------------------------------
function checkIfNaturalNumber(value) {
   return checkIfInt(value) && value >= 0;
}

module.exports.checkIfNaturalNumber = checkIfNaturalNumber;

// OK---------------------------------------------------------------------------------------------------------------
function checkIfNaturalNumberInScope(value, min, max) {
   return checkIfInt(value) && value >= 0 && value >= min && value <= max;
}

module.exports.checkIfNaturalNumberInScope = checkIfNaturalNumberInScope;

// OK---------------------------------------------------------------------------------------------------------------
function checkIfInt(objectToCheck, convertToNumberFirst = true) {
   return checkAllByFunction(objectToCheck, (e) => Number.isInteger(convertToNumberFirst ? Number(e) : e));
}

module.exports.checkIfInt = checkIfInt;

// OK---------------------------------------------------------------------------------------------------------------
function checkIfIntInRange(value, min, max, convertToNumberFirst = true) {
   if (!checkIfInt([value, min, max], convertToNumberFirst))
      return;

   return +value >= +min && +value <= +max;
}

module.exports.checkIfIntInRange = checkIfIntInRange;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- CONVERTERS ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function convertByFunction(objectToConvert, convertFunction) {
   if (!checkIfExists(objectToConvert) || !checkIfFunction(convertFunction))
      return;

   if (checkIfArray(objectToConvert))
      return objectToConvert.map(convertFunction);
   else
      return convertFunction(objectToConvert);
}

module.exports.convertByFunction = convertByFunction;

// OK---------------------------------------------------------------------------------------------------------------
function convertToInt(value) {
   return convertByFunction(value, (e) => parseInt(e));
}

module.exports.convertToInt = convertToInt;

// OK---------------------------------------------------------------------------------------------------------------
function convertToString(value) {
   return convertByFunction(value, (e) => e.toString());
}

module.exports.convertToString = convertToString;

// OK---------------------------------------------------------------------------------------------------------------
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

//-------------------------------------------------------Checkers-------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function dcCheckIfCollection(value) {
   return value instanceof D.Collection;
}

module.exports.dcCheckIfCollection = dcCheckIfCollection;

// OK---------------------------------------------------------------------------------------------------------------
function dcCheckIfMessage(value) {
   return value instanceof D.Message;
}

module.exports.dcCheckIfMessage = dcCheckIfMessage;

// OK---------------------------------------------------------------------------------------------------------------
function dcCheckIfMessageComponents(value) {
   return checkAllByFunction(value, e => e instanceof D.MessageButton || e instanceof D.MessageSelectMenu)
}

module.exports.dcCheckIfMessage = dcCheckIfMessage;

// OK---------------------------------------------------------------------------------------------------------------
function dcCheckIfGuildMessage(message) {
   if (!dcCheckIfMessage(message))
      return;

   return message.guild;
}

module.exports.dcCheckIfGuildMessage = dcCheckIfGuildMessage;

// OK---------------------------------------------------------------------------------------------------------------
function dcCheckIfChannel(value) {
   return value instanceof D.Channel;
}

module.exports.dcCheckIfChannel = dcCheckIfChannel;

// OK---------------------------------------------------------------------------------------------------------------
function dcCheckIfGuildChannel(value) {
   return (dcCheckIfChannel(value) && value.guild !== undefined);
}

module.exports.dcCheckIfGuildChannel = dcCheckIfGuildChannel;

// OK---------------------------------------------------------------------------------------------------------------
function dcCheckIfThread(value) {
   return (dcCheckIfChannel(value) && value.isThread());
}

module.exports.dcCheckIfThread = dcCheckIfThread;

// OK---------------------------------------------------------------------------------------------------------------
function dcCheckIfRole(value) {
   return value instanceof D.Role;
}

module.exports.dcCheckIfRole = dcCheckIfRole;

// OK---------------------------------------------------------------------------------------------------------------
function dcCheckIfMember(value) {
   return value instanceof D.GuildMember;
}

module.exports.dcCheckIfMember = dcCheckIfMember;

// OK---------------------------------------------------------------------------------------------------------------
function dcCheckIfGuild(value) {
   return value instanceof D.Guild;
}

module.exports.dcCheckIfGuild = dcCheckIfGuild;

// OK---------------------------------------------------------------------------------------------------------------
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
         runFunctionOnAll(finalMsg, e => message.author.send(e));
         break;
      case 'reply':
         runFunctionOnAll(finalMsg, e => message.reply(e));
         break;
      default:
         break;
   }
}

module.exports.dcSendMsg = dcSendMsg;

// OK---------------------------------------------------------------------------------------------------------------
function dcSendMsgToChannel(channel, msgContent) {
   if (!dcCheckIfChannel(channel) || !checkIfExists(msgContent))
      return;

   const finalMsg = getFixedMessageContent(msgContent);
   if (!finalMsg)
      return;

   runFunctionOnAll(finalMsg, e => channel.send(e));
}

module.exports.dcSendMsgToChannel = dcSendMsgToChannel;

// OK---------------------------------------------------------------------------------------------------------------
function dcSendMsgToChannel2(message, channelName, msgContent) {
   if (!dcCheckIfMessage(message) || !checkIfExists(channelName) || !checkIfExists(msgContent))
      return;

   const channel = dcGetChannelByName(message.guild, channelName);
   if (!checkIfExists(channelName))
      return;

   const finalMsg = getFixedMessageContent(msgContent);
   if (!finalMsg)
      return;

   runFunctionOnAll(finalMsg, e => channel.send(e));
}

module.exports.dcSendMsgToChannel2 = dcSendMsgToChannel2;

// OK---------------------------------------------------------------------------------------------------------------
function dcRespondToMsg(message, msgContent) {
   dcSendMsg(message, msgContent, 'channel');
}

module.exports.dcRespondToMsg = dcRespondToMsg;

// OK---------------------------------------------------------------------------------------------------------------
function dcSendDMToAuthor(message, msgContent) {
   dcSendMsg(message, msgContent, 'dm');
}

module.exports.dcSendDMToAuthor = dcSendDMToAuthor;

// OK---------------------------------------------------------------------------------------------------------------
function dcReplyToMsg(message, msgContent) {
   dcSendMsg(message, msgContent, 'reply');
}

module.exports.dcReplyToMsg = dcReplyToMsg;

// OK---------------------------------------------------------------------------------------------------------------
function dcRespondFromArray(message, array) {
   if (!checkIfArray(array))
      return;

   dcRespondToMsg(message, arrGetRandom(array));
}

module.exports.dcRespondFromArray = dcRespondFromArray;

// OK---------------------------------------------------------------------------------------------------------------
function dcValidateForBannedWords(message) {
   if (!dcCheckIfMessage(message))
      return;

   const messageContent = strToLowerCase(message.content);
   const messageText = strRemoveAllSpecialChars(messageContent);
   if (strCheckIfContainsAny([messageContent, messageText], AC.arrayBannedWords)) {
      dcRespondToMsg(message, `Oops, it looks like you said a forbidden word ${message.author}!`);
      message.delete();
      return false;
   }

   return true;
}

module.exports.dcValidateForBannedWords = dcValidateForBannedWords;

// ---------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------Roles-------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function dcGetRoleByName(member, roleName) {
   if (!dcCheckIfMember(member) || !roleName)
      return;

   return member.guild.roles.cache.find(r => r.name === roleName);
}

module.exports.dcGetRoleByName = dcGetRoleByName;

// OK---------------------------------------------------------------------------------------------------------------
function dcAddRoleToMember(member, roleName) {
   const role = dcGetRoleByName(member, roleName);

   if (role)
      member.roles.add(role);
}

module.exports.dcAddRoleToMember = dcAddRoleToMember;

// OK---------------------------------------------------------------------------------------------------------------
function dcRemoveRoleFromMember(member, roleName) {
   const role = dcGetRoleByName(member, roleName);

   if (role)
      member.roles.remove(role);
}

module.exports.dcRemoveRoleFromMember = dcRemoveRoleFromMember;

// OK---------------------------------------------------------------------------------------------------------------
function dcCheckIfMemberHasRole(member, roleName) {
   if (!dcCheckIfMember(member) || !roleName)
      return;

   return member.roles.cache.some(r => r.name === roleName);
}

module.exports.dcCheckIfMemberHasRole = dcCheckIfMemberHasRole;

// ---------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------Members-------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function dcGetMemberByID(guild, userID) {
   if (!dcCheckIfGuild(guild) || !userID)
      return;

   return guild.members?.cache.get(userID);
}

module.exports.dcGetMemberByID = dcGetMemberByID;

// OK---------------------------------------------------------------------------------------------------------------
function dcGetMessageAuthorAsMember(message) {
   if (!dcCheckIfMessage(message))
      return;

   return message.member;
}

module.exports.dcGetMessageAuthorAsMember = dcGetMessageAuthorAsMember;

// OK---------------------------------------------------------------------------------------------------------------
function dcGetAllMembersByNick(message, string) {
   if (!dcCheckIfGuildMessage(message) || !checkIfExists(string))
      return;

   return message.guild.members.cache.filter((e => strCheckIfContains(e.displayName, string)));
}

module.exports.dcGetAllMembersByNick = dcGetAllMembersByNick;

// OK---------------------------------------------------------------------------------------------------------------
function dcGetAllMembers(message) {
   if (!dcCheckIfGuildMessage(message))
      return;

   return message.guild.members.cache;
}

module.exports.dcGetAllMembers = dcGetAllMembers;

// OK---------------------------------------------------------------------------------------------------------------
function dcGetMentionedMember(message) {
   if (!dcCheckIfMessage(message))
      return;

   return message.mentions?.members?.first();
}

module.exports.dcGetMentionedMember = dcGetMentionedMember;

// OK---------------------------------------------------------------------------------------------------------------
function dcGetMemberIDFromMention(mention) {
   if (!strCheckIfContainsAll(mention, ['<@', '>']))
      return;

   const mentionStart = mention.indexOf('<@!') == -1 ? mention.indexOf('<@') + 2 : mention.indexOf('<@') + 3;

   return mention.substr(mentionStart, 18);
}

module.exports.dcGetMemberIDFromMention = dcGetMemberIDFromMention;
// ---------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------Channels-------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function dcGetChannelByName(guild, channelName) {
   if (!dcCheckIfGuild(guild))
      return;

   return guild.channels.cache.find(channel => channel.name === channelName);
}

module.exports.dcGetChannelByName = dcGetChannelByName;

// OK---------------------------------------------------------------------------------------------------------------
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

   return new Promise(resolve => { resolve(thread); });
}

module.exports.dcGetCreateOrUnarchiveThread = dcGetCreateOrUnarchiveThread;

// ---------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------Interactions-------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function dcCreateRow(components) {
   if(!dcCheckIfMessageComponents(components))
      return;

   return new D.MessageActionRow()
      .addComponents(components);
}

module.exports.dcCreateRow = dcCreateRow;

// OK---------------------------------------------------------------------------------------------------------------
function dcCreateButton(id, label, style = `PRIMARY`) {
   const availableStyles = [`PRIMARY`, `SECONDARY`, `SUCCESS`, `DANGER`, `LINK`];
   if (!checkIfExists(id) || !checkIfExists(label) || !checkIfAnyMatch(style, availableStyles))
      return;

   return new D.MessageButton()
      .setCustomId(id)
      .setLabel(label)
      .setStyle(style);
}

module.exports.dcCreateButton = dcCreateButton;

// ---------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------Internal-------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
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
// OK---------------------------------------------------------------------------------------------------------------
function calcBMI(height, weight) {
   if (!checkIfNumber(height) || !checkIfNumber(weight))
      return;

   const heightInMeters = height / 100;
   const bmi = weight / (heightInMeters * heightInMeters);

   return Math.round((bmi + Number.EPSILON) * 100) / 100;
}

module.exports.calcBMI = calcBMI;

// OK---------------------------------------------------------------------------------------------------------------
function calcBMIWeight(height, bmi) {
   if (!checkIfNumber(height) || !checkIfNumber(bmi))
      return;

   const heightInMeters = height / 100;
   const weight = heightInMeters * heightInMeters * bmi;

   return Math.round(weight);
}

module.exports.calcBMIWeight = calcBMIWeight;

// OK---------------------------------------------------------------------------------------------------------------
function calcFixMaxDecimal(value, maxDecimal = 2) {
   if (!checkIfNumber(value) || !checkIfNaturalNumber(maxDecimal))
      return;

   const decimal = Math.pow(10, maxDecimal);

   return Math.round((value + Number.EPSILON) * decimal) / decimal;
}

module.exports.calcFixMaxDecimal = calcFixMaxDecimal;

// OK---------------------------------------------------------------------------------------------------------------
function calcCmToImperial(centimeters, decimalPlaces = 0) {
   if (!checkIfNumber(centimeters))
      return;

   const totalInches = convertToInches(centimeters);
   const totalFeet = getTotalFeet(totalInches);
   const leftoverInches = getLeftoverInches(totalInches, decimalPlaces);

   return `${totalFeet}' ${leftoverInches}''`;
}

module.exports.calcCmToImperial = calcCmToImperial;

// OK---------------------------------------------------------------------------------------------------------------
function calcKgToImperial(kilograms, decimalPlaces = 0) {
   if (!checkIfNumber(kilograms))
      return;

   const totalOunces = convertToOunces(kilograms);
   const totalPounds = getTotalPounds(totalOunces);
   const leftoverOunces = getLeftoverOunces(totalOunces, decimalPlaces);

   return `${totalPounds} lb ${leftoverOunces} oz`;
}

module.exports.calcKgToImperial = calcKgToImperial;

// OK---------------------------------------------------------------------------------------------------------------
function calcFahrenheitToCelsius(value) {
   if (!checkIfNumber(value))
      return;

   return (value - 32) * 5 / 9;
}

module.exports.calcFahrenheitToCelsius = calcFahrenheitToCelsius;

// OK---------------------------------------------------------------------------------------------------------------
function calcCelsiusToFahrenheit(value) {
   if (!checkIfNumber(value))
      return;

   return (value * 9 / 5) + 32;
}

module.exports.calcCelsiusToFahrenheit = calcCelsiusToFahrenheit;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- OTHER ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function runFunctionOnAll(objectToRunOn, functionToRun) {
   if (!checkIfExists(objectToRunOn) || !checkIfFunction(functionToRun))
      return;

   if (checkIfArray(objectToRunOn))
      objectToRunOn.forEach(functionToRun);
   else
      functionToRun(objectToRunOn);
}

module.exports.runFunctionOnAll = runFunctionOnAll;

// OK---------------------------------------------------------------------------------------------------------------
function recognizeWhoFullText(argument, message, command) {
   if (!dcCheckIfMessage(message) || !command)
      return;

   return (checkIfAnyMatch(argument, ['i', 'me']) || !argument) ? message.author.toString() : message.content.slice(command.length + 1);
}

module.exports.recognizeWhoFullText = recognizeWhoFullText;

// OK---------------------------------------------------------------------------------------------------------------
function recognizeWhoOneArg(argument, message) {
   if (!dcCheckIfMessage(message))
      return;

   return (checkIfAnyMatch(argument, ['i', 'me']) || !argument) ? message.author.toString() : argument;
}

module.exports.recognizeWhoOneArg = recognizeWhoOneArg;

// OK---------------------------------------------------------------------------------------------------------------
function recognizeWhoOneArgNoAuthor(argument, message) {
   if (!dcCheckIfMessage(message))
      return;

   return (checkIfAnyMatch(argument, ['i', 'me']) || !argument) ? 'you' : argument;
}

module.exports.recognizeWhoOneArgNoAuthor = recognizeWhoOneArgNoAuthor;

// OK---------------------------------------------------------------------------------------------------------------
function slicePrefix(argumentWithPrefix) {
   if (!checkIfString(argumentWithPrefix))
      return;

   return argumentWithPrefix.substring(PREFIX_LENGTH);
}

module.exports.slicePrefix = slicePrefix;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- INTERNALS ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function convertToInches(centimeters) {
   if (!checkIfNumber(centimeters))
      return;

   return centimeters * 0.39370078740157;
}

// OK---------------------------------------------------------------------------------------------------------------
function convertToOunces(kilograms) {
   if (!checkIfNumber(kilograms))
      return;

   return kilograms * 35.27396194958;
}

// OK---------------------------------------------------------------------------------------------------------------
function getTotalFeet(inches) {
   if (!checkIfNumber(inches))
      return;

   return Math.floor(inches / 12);
}

// OK---------------------------------------------------------------------------------------------------------------
function getTotalPounds(ounces) {
   if (!checkIfNumber(ounces))
      return;

   return Math.floor(ounces / 16);
}

// OK---------------------------------------------------------------------------------------------------------------
function getLeftoverInches(inches, decimalPlaces = 0) {
   if (!checkIfNumber(inches))
      return;

   return roundNumber(inches % 12, decimalPlaces);
}

// OK---------------------------------------------------------------------------------------------------------------
function getLeftoverOunces(ounces, decimalPlaces = 0) {
   if (!checkIfNumber(ounces))
      return;

   return roundNumber(ounces % 16, decimalPlaces);
}

//---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------