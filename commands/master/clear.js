const C = require('../../modules/common.js');

module.exports = {
   name: 'clear',
   aliases: ['clean'],
   description: 'Deletes specific amount of messages from the current channel.',
   usage: '[amount]',
   example: '7',
   execute(message, args) {
      if (!C.checkIfNaturalNumber(args[1])) {
         message.reply(`${args[1]} is not a valid amount!`);
         return;
      }

      let amount = C.convertToInt(args[1]);

      while (amount > 99) {
         C.deleteMessages(message, 99);
         amount -= 99;
      }

      C.deleteMessages(message, amount);
   },
}