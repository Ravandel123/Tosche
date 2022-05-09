const C = require("../modules/common.js");

module.exports = {
   name: 'messageUpdate',
   execute(oldMessage, newMessage, client) {
      if (newMessage.guild.id != 553933942193913856)
         return;

      newMessage.guild.channels.cache.find(c => c.name == 'espionage')?.send(
      `A message has been edited.\n` +
      `Author: ${oldMessage.author}\n` +
      `Channel: ${oldMessage.channel}\n` +
      `Old message: ${oldMessage}\n` +
      `New message: ${newMessage}\n` +
      `--------------------------------------------------`);

      C.dcValidateForBannedWords(newMessage);
   },
};