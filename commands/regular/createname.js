const C = require('../../modules/common.js');
const { CreateRandomName } = require('../../modules/advanced/nameGenerator.js');

module.exports = {
   name: 'createname',
   description: 'Generates random names with the given syllable.',
   usage: '[gender] [syllable] [position of the given syllable] [amount of the syllables in generated names] [amount of the generated names]',
   example: 'male Clo 1 2 15',
   execute(message, args)
   {
      let response = ''
      let namesAmount = C.checkIfIntInRange(args[5], 1, 300) ? args[5] : 1;

      //Add function for multiple names creation and validate arguments inside
      for (let i = 0; i < namesAmount; i++)
      {
         response += CreateRandomName(args[1], args[2], args[3], args[4])

         if (i != namesAmount - 1)
            response += ', '
      }

      C.dcRespondToMsg(message, response)
   },
}