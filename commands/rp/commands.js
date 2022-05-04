const { prefixRP } = require('../../config.json');
const { showCommands } = require('../../modules/commonCommands.js');

module.exports = {
   name: 'commands',
   description: 'Lists all RP commands or shows info about a specific command.',
   aliases: ['command'],
   usage: '[command name]',
   example: 'attack',
   async execute(message, args) {
      const { commandsRP } = message.client;
      showCommands(commandsRP, message, args[1], prefixRP, 'RP');
   },
}