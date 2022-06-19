module.exports = {
   name: 'messageDelete',
   execute(message, client) {
      if (message.guild?.id != '553933942193913856' || message.author?.id == '553959824577134593')
         return;

      message.guild.channels.cache.find(c => c.name == 'espionage')?.send(
      `A message has been deleted.\n` +
      `Author: ${message.author}\n` +
      `Channel: ${message.channel}\n` +
      `Message: ${message}\n` +
      `--------------------------------------------------`);
   },
};