const D = require('discord.js');
const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');
const CC = require('../../modules/commonCommands.js');
const CG = require('../../modules/commonGuild.js');

module.exports = {
   name: 'set',
   description: 'Sets profile data.',
   usage: '[picture] [pictureURL]',
   example: 'picture https://www.westerndeep.net/wp-content/uploads/2011/12/crim_new.png',
   async execute(message, args) {
      const requiredArgs = [`what you want to set`, `value to assign`];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      const memberData = CG.cdGetOrCreateMemberData(message.guild.client, message.author.id);
      if (memberData.gotAnyTask) {
         C.dcRespondToMsg(message, R.resBusy(memberData.currentTaskDescription));
         return;
      }

      const taskId = memberData.addTask(`Changing profile data`);

      await memberData.waitForYourTurn(taskId);
      try {
         const profile = await CG.getMessageAuthorProfile(message);

         switch (C.strToLowerCase(args[1])) {
            case 'picture':
               await setPicture(message, profile, args[2]);
               break;

            default:
               C.dcRespondToMsg(message, `You can't set '${args[1]}'!`);
         }

      } catch (e) {
         C.dcRespondToMsg(message, e);
      }
      await memberData.removeIfFirst(taskId);
   },
}

async function setPicture(message, profile, picture) {
   if (C.chackIfImageUrl(picture) && C.checkIfValidHttpUrl(picture)) {
      profile.picture = picture;
      await profile.save();
      C.dcRespondToMsg(message, `Your profile picture has been changed.`);
   } else {
      C.dcRespondToMsg(message, `${picture} is not a valid image url!`);
   }
}