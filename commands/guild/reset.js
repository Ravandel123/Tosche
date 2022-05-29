const D = require('discord.js');
const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const CG = require('../../modules/commonGuild.js');

module.exports = {
   name: 'reset',
   description: 'Resets profile data.',
   usage: '[picture]',
   example: 'picture',
   async execute(message, args) {
      const requiredArgs = [`what you want to reset`];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      try {
         let profile = await CG.getMessageAuthorProfile(message);

         if (C.strCompare(args[1], 'picture'))
            profile.picture = '';

         await profile.save();
      } catch (e) {
         C.dcRespondToMsg(message, e);
      }
   },
}