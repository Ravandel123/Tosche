const { prefixG } = require('../../config.json');
const { showCommands } = require('../../modules/commonCommands.js');

module.exports = {
   name: 'commands',
   description: 'Lists all Guild commands or shows info about a specific command.',
   aliases: ['command'],
   usage: '[command name]',
   example: 'profile',
   async execute(message, args) {
      const { commandsG } = message.client;
      showCommands(commandsG, message, args[1], prefixG, 'guild');
   },
}