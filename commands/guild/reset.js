const D = require('discord.js');
const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const CG = require('../../modules/commonGuild.js');

module.exports = {
   name: 'reset',
   description: 'Resets the specified profile data.',
   usage: '[picture/task]',
   example: [
      `picture`,
      `task`
   ],
   async execute(message, args) {
      const requiredArgs = [`what you want to reset`];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      const memberData = CG.cdGetOrCreateMemberData(message.guild.client, message.author.id);
      if (memberData.gotAnyTask) {
         C.dcRespondToMsg(message, R.resBusy(memberData.currentTaskDescription));
         return;
      }

      const taskId = memberData.addTask(`Resetting profile data`);

      await memberData.waitForYourTurn(taskId);
      switch (C.strToLowerCase(args[1])) {
         case 'picture':
            await resetPicture(message);
            break;

         default:
            C.dcRespondToMsg(message, `You can't reset '${args[1]}'!`);
      }
      await memberData.removeIfFirst(taskId);
   },
}

//------------------------------------------------------------------------------------------------------------------
async function resetPicture(message) {
   try {
      const profile = await CG.getMessageAuthorProfile(message);

      profile.picture = '';
      await profile.save();
      C.dcRespondToMsg(message, `Your profile picture has been reset.`);
   } catch (e) {
      C.dcRespondToMsg(message, e);
   }
}