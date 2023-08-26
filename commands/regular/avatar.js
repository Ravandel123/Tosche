const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');

module.exports = {
   name: 'avatar',
   description: `Shows user's avatar.`,
   usage: '[mention]',
   example: `<@!392728479696814092>`,
   execute(message, args) {
      const who = args[1] ? C.getMemberByNameOrMention(message, args[1]) : message.author;
      if (who) {
         C.dcRespondToMsg(message, who.displayAvatarURL());
      }
   },
}