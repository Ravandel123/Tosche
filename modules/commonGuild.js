const C = require('./common.js');
const AG = require('./arraysGuild.js');
const { gCharacter } = require('./guildSchematics.js');


// OK----------------------------------------------------------- PROFILE ----------------------------------------------------------
function checkIfProfile(value) {
   return value instanceof gCharacter;
}

module.exports.checkIfProfile = checkIfProfile;

// OK---------------------------------------------------------------------------------------------------------------
function getMainProfileInfo(profile) {
   if (!checkIfProfile(profile))
      return;

   return `Profile of ${C.strBold(profile.ownerTag)}` +
          `\n--------------------------------------------------` + 
          `\n**ID**: ${profile.ownerId}` +
          `\n**Name**: ${profile.ownerName}` +
          `\n**Action Points**: ${profile.actionPoints.current}`;
}

module.exports.getMainProfileInfo = getMainProfileInfo;

// OK---------------------------------------------------------------------------------------------------------------
function getCurrenciesInfo(profile) {
   if (!checkIfProfile(profile))
      return;

   const currencies = profile.currencies;

   let msg = `Currencies of ${C.strBold(profile.ownerName)}` + 
             `\n--------------------------------------------------` +
             `\n**Amber Drops:** ${currencies.amberDrops}` +
             `\n**Pearl Flakes:** ${currencies.pearlFlakes}` +
             `\n**Obsidian Chips:** ${currencies.obsidianChips}` +
             `\n**Silver Coin:** ${currencies.silverCoins}` +
             `\n**Gold Coins:** ${currencies.goldCoins}` +
             `\n**Deltrada Coins:** ${currencies.deltradaCoins}`;

   return msg;
}

module.exports.getCurrenciesInfo = getCurrenciesInfo

// OK---------------------------------------------------------------------------------------------------------------
function getUserInfo(profile, argument) {
   let msg = '';

   if (C.strCompare(argument, 'currencies'))
      msg = getCurrenciesInfo(profile);
   else
      msg = getMainProfileInfo(profile);

   return msg;
}

module.exports.getUserInfo = getUserInfo;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- CURRENCIES ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function getCurrencyObject(currencyAlias) {
   return C.arrGetObjectByAnyOfItsValues(AG.currencies, currencyAlias);
}

module.exports.getCurrencyObject = getCurrencyObject;

// OK---------------------------------------------------------------------------------------------------------------
function transferCurrency(message, source, target, amount, currency) {
   if (!checkIfProfile(source) || !checkIfProfile(target) || !C.checkIfNaturalNumber(amount) || !C.checkIfAnyByFunction(AG.currencies, e => C.strCompare(e.nameDB, currency.nameDB)))
      return;

   if (source.currencies[currency.nameDB] < amount) {
      C.dcRespondToMsg(message, `You are too poor to give ${target.ownerName} ${amount} ${currency.name}`, `You have only ${amount} ${currency.name}!`);
      return;
   }

   source.currencies[currency.nameDB] -= amount;
   target.currencies[currency.nameDB] += amount;

   return true;
}

module.exports.transferCurrency = transferCurrency;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
