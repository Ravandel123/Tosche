const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');
const CC = require('../../modules/commonCommands.js');
const DB = require('../../modules/db.js');

module.exports = {
   name: 'profileof',
   description: 'Used to access a Deltrada profile of the given user.',
   usage: '[user] [currencies]',
   example: `<@!392728479696814092>` + ' currencies',
   async execute(message, args) {
      const requiredArgs = [`user name`];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      const userID = CC.getUserFromNameOrMention(message, args[1]);
      if (!userID)
         return;

      let msg;

      try {
         const userProfile = await DB.gGetProfileById(message, userID);
         msg = CG.getUserInfo(userProfile, args[2]);
      } catch (error) {
         msg = error;
      }

      C.dcRespondToMsg(message, msg);
   },
}