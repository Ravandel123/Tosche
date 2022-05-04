const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const R = require('../../modules/responses.js');
const NAMEGEN = require('../../modules/advanced/nameGenerator.js');

module.exports = {
   name: 'createname',
   description: 'Generates random names with the given syllable.',
   usage: '[syllable] [gender] [position of the given syllable (1-4)] [amount of the syllables in generated names (max 4)] [amount of the generated names (max 100)]',
   example: 'Clo male 1 2 15',
   execute(message, args) {
      if (!CC.checkArgsAmount(message, args, ['syllable']))
         return;

      const gender = args[2] ?? C.arrGetRandom(['m', 'f']);
      if (!C.strCheckIfAnyMatch(gender, NAMEGEN.arrGenderAliases)) {
         C.dcRespondFromArray(message, R.resIssue(`**${gender}** isn't a proper gender name or gender alias`));
         return;
      }

      const positionIndex = args[3] ?? C.rndBetween(1, 4);
      if (!CC.checkIfArgIsNaturalNumberInScope(message, positionIndex, 1, 4))
         return;

      const syllablesAmount = args[4] ?? C.rndBetween(positionIndex, 4);
      if (!CC.checkIfArgIsNaturalNumberInScope(message, syllablesAmount, positionIndex, 4))
         return;

      const namesAmount = args[5] ?? 1;
      if (!CC.checkIfArgIsNaturalNumberInScope(message, namesAmount, 1, 100))
         return;


      let response = '';

      for (let i = 0; i < namesAmount; i++) {
         response += NAMEGEN.createRandomName(args[1], gender, positionIndex, syllablesAmount);

         if (i != namesAmount - 1)
            response += ', ';
      }

      C.dcRespondToMsg(message, response);
   },
}