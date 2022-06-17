const C = require('../../modules/common.js');
const NAMEGEN = require('../../modules/advanced/nameGenerator.js');

module.exports = {
   name: 'name',
   description: 'Generate random name.',
   usage: '[gender] [amount of syllables in generated names (max 4)] [amount of generated names (max 100)]',
   example: 'male 2 10',
   execute(message, args) {
      let response = '';

      if (args[1] == 'count') {
         response = 'Total amount of (assumedly different) names that could be generated: ' + NAMEGEN.totalNamesCount();
      } else {
         let namesAmount = C.checkIfIntInRange(args[3], 1, 100) ? args[3] : 1;

         for (let i = 0; i < namesAmount; i++) {
            response += NAMEGEN.generateRandomName(args[1], args[2]);
            if (i != namesAmount - 1)
               response += ', ';
         }
      }

      C.dcRespondToMsg(message, response);
      message.channel.send({ content: `Only the person who ran the command can do that!`, ephemeral: true });
   },
}