const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');

module.exports = {
   name: 'avatar',
   description: `Shows user's avatar.`,
   usage: '[mention]',
   example: `<@!392728479696814092>`,
   execute(message, args) {
      const who = CC.getMemberByNameOrMention(message, args[1] ?? message.author.id);
      if (who)
         C.dcRespondToMsg(message, who.displayAvatarURL());
   },
}