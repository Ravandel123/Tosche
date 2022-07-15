const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');

module.exports = {
   name: 'syllables',
   description: 'Returns the amount of syllables in the word.',
   usage: '[word]',
   example: 'deltrada',
   execute(message, args) {
      const requiredArgs = ['a word'];

      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      const syllablesAmount = C.strGetSyllablesAmount(args[1]);
      const msg = syllablesAmount > 0 ? `The word '${args[1]}' has ${syllablesAmount} syllable(s).` : `The word '${args[1]}' has no syllables.`

      C.dcRespondToMsg(message, msg);
   },
}
