const D = require('discord.js');
const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const CG = require('../../modules/commonGuild.js');

module.exports = {
   name: 'reset',
   description: 'Resets profile data.',
   usage: '[picture/task]',
   example: [
      `picture`,
      `task`
   ],
   async execute(message, args) {
      const requiredArgs = [`what you want to reset`];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      switch (C.strToLowerCase(args[1])) {
         case 'picture':
            await resetPicture(message);
            break;

         case 'task':
            resetTask(message);
            break;

         default:
            C.dcRespondToMsg(message, `You can't reset '${args[1]}'!`);
      }
   },
}

async function resetPicture(message) {
   try {
      let profile = await CG.getMessageAuthorProfile(message);

      profile.picture = '';
      await profile.save();
      C.dcRespondToMsg(message, `Your profile picture has been reseted.`);
   } catch (e) {
      C.dcRespondToMsg(message, e);
   }
}

function resetTask(message) {
   if (CG.cdCheckIfTaskCanBeAssigned(message))
      CG.cdFinishTask(message);
   else
      C.dcRespondToMsg(message, `Unable to reset your task!`);
}