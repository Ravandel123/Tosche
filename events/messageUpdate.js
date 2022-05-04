const CC = require('../modules/commonCommands.js');
const C = require('../modules/common.js');

module.exports = {
   name: 'messageUpdate',
   execute(oldMessage, newMessage, client) {
      if (newMessage.guild?.id != '553933942193913856' || oldMessage.author?.id == '553959824577134593')
         return;

      const editedMessageContent = `A message has been edited.\n` +
         `Author: ${oldMessage.author}\n` +
         `Channel: ${oldMessage.channel}\n` +
         `Old message: ${oldMessage}\n` +
         `New message: ${newMessage}\n` +
         `--------------------------------------------------`;

      C.dcSendMsgToChannel(newMessage.guild.channels.cache.find(e => e.name == 'espionage'), editedMessageContent);
      CC.dcValidateForBannedWords(newMessage);
   },
};