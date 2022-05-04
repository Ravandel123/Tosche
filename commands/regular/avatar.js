const commons = require('../../modules/common.js')
const discord = require('discord.js');

module.exports = {
   name: 'avatar',
   description: 'Shows user\'s avatar.',
   usage: '[mention]',
   example: `<@!392728479696814092>`,
   execute(message, args) {

      let who;

      if (args[1])
         who = commons.dcGetMentionedMember(message);
      else
         who = message.author;

      if (!who) {
         commons.dcRespondToMsg(message, `User ${args[1]} not found!`);
         return;
      }
      // const emb = new discord.MessageEmbed().setImage(who.displayAvatarURL()).setTitle(who.username);
      // message.channel.send(emb);
      commons.dcRespondToMsg(message, who.displayAvatarURL());
   },
}