const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');
const DB = require('../../modules/db.js');

module.exports = {
   name: 'profile',
   description: 'Used to access your Deltrada profile.',
   usage: '[user]',
   example: '',
   async execute(message, args) {
      let userProfile;

      try {
         userProfile = C.checkIfExists(args[1]) ? await CG.getMemberProfile(message, args[1]) : await CG.getMessageAuthorProfile(message);
      } catch (error) {
         C.dcRespondToMsg(message, error);
         return;
      }

      C.dcRespondToMsg(message, getUserInfo(userProfile, args[2]));
   },
}

function getUserInfo(profile, argument) {
   let msg = '';

   if (C.strCompare(argument, 'currencies'))
      msg = getCurrenciesInfo(profile);
   else
      msg = getMainProfileInfo(profile);

   return msg;
}

function getMainProfileInfo(profile) {
   return `Profile of ${C.strBold(profile.ownerTag)}` +
          `\n--------------------------------------------------` + 
          `\n**ID**: ${profile.ownerId}` +
          `\n**Name**: ${profile.ownerName}` +
          `\n**Action Points**: ${profile.actionPoints.current}`;
}

function getCurrenciesInfo(profile) {
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