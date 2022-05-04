const commons = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const { prefix } = require('../../config.json');

module.exports = {
   name: 'choose',
   description: 'Chooses one of the given options.',
   usage: '[choice1|choice2|choice3|...|choiceN]',
   example: 'Tosche is awesome|Tosche is amazing|Tosche is great',
   execute(message, args)
   {
      const requiredArgs = ['choices separated by |']

      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return

      const clearedChoices = message.content.slice(prefix.length + args[0].length - 1)
      const choices = clearedChoices.split('|')

      commons.dcRespondFromArray(message, choices)
   },
}