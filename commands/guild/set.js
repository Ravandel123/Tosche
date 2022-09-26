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

      const taskId = memberData.addTask(`Chaning profile data`);

      await memberData.waitForYourTurn(taskId);
      try {
         const profile = await CG.getMessageAuthorProfile(message);

         if (C.strCompare(args[1], 'picture')) {
            if (C.chackIfImageUrl(args[2]) && C.checkIfValidHttpUrl(args[2])) {
               profile.picture = args[2];
               C.dcRespondToMsg(message, `Your profile picture has been changed.`);
            } else {
               C.dcRespondToMsg(message, `${args[2]} is not a valid image url!`);
            }
         }

         await profile.save();
      } catch (e) {
         C.dcRespondToMsg(message, e);
      }
      await memberData.removeIfFirst(taskId);
   },
}