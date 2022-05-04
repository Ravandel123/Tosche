module.exports = {
   name: 'messageDelete',
   execute(message, client) {
      message.guild.channels.cache.find(c => c.name == 'espionage').send(
      `A message has been deleted.\n` +
      `Author: ${message.author}\n` +
      `Channel: ${message.channel}\n` +
      `Message: ${message}\n` +
      `--------------------------------------------------`);
   },
};