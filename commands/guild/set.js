const D = require('discord.js');
const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const CG = require('../../modules/commonGuild.js');

module.exports = {
   name: 'set',
   description: 'Sets profile data.',
   usage: '[picture] [pictureURL]',
   example: '',
   async execute(message, args) {
      const requiredArgs = [`what you want to set`, `value to assign`];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      try {
         let profile = await CG.getMessageAuthorProfile(message);
         
         if (C.strCompare(args[1], 'picture'))
            profile.picture = args[2];

         await profile.save();
      } catch (e) {
         C.dcRespondToMsg(message, e);
      }
   },
}