const C = require('../modules/common.js');

module.exports = {
   name: 'messageDelete',
   execute(message, client) {
      if (message.guild?.id != '553933942193913856' || message.author?.id == '553959824577134593')
         return;

      const deletedMessageContent = `A message has been edited.\n` +
         `A message has been deleted.\n` +
         `Author: ${message.author}\n` +
         `Channel: ${message.channel}\n` +
         `Message: ${message}\n` +
         `--------------------------------------------------`;

      C.dcSendMsgToChannel(message.guild.channels.cache.find(e => e.name == 'espionage'), deletedMessageContent);
   },
};