const { prefixM } = require('../../config.json');
const { showCommands } = require('../../modules/commonCommands.js');

module.exports = {
   name: 'commands',
   description: 'Lists all Master commands or shows info about a specific command.',
   aliases: ['command'],
   usage: '[command name]',
   example: 'profile',
   async execute(message, args) {
      const { commandsM } = message.client;
      showCommands(commandsM, message, args[1], prefixM, 'admin');
   },
}