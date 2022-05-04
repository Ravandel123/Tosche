const { prefix } = require('../../config.json');
const { showCommands } = require('../../modules/commonCommands.js');

module.exports = {
   name: 'commands',
   description: 'Lists all commands or shows info about a specific command.',
   aliases: ['command'],
   usage: '[command name]',
   example: 'name',
   async execute(message, args) {
      const { commands } = message.client;
      showCommands(commands, message, args[1], prefix, 'regular');
   },
}