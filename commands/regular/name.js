const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const R = require('../../modules/responses.js');
const NAMEGEN = require('../../modules/advanced/nameGenerator.js');

module.exports = {
   name: 'name',
   description: 'Generate random name.',
   usage: '[gender] [amount of syllables in generated names (max 4)] [amount of generated names (max 100)]',
   example: 'male 2 10',
   execute(message, args) {
      if (args[1] == 'count') {
         C.dcRespondToMsg(message, `Total amount of (assumedly different) names that could be generated: ${NAMEGEN.totalNamesCount()}`);
         return;
      }

      const gender = args[1] ?? C.arrGetRandom(['m', 'f']);
      if (!C.strCheckIfAnyMatch(gender, NAMEGEN.arrGenderAliases) && !C.strCompare(gender, 'count')) {
         C.dcRespondFromArray(message, R.resIssue(`**${gender}** isn't a proper gender name/alias`));
         return;
      }

      const syllablesAmount = args[2] ?? C.rndBetween(1, 4);
      if (!CC.checkIfArgIsNaturalNumberInScope(message, syllablesAmount, 1, 4))
         return;

      const namesAmount = args[3] ?? 1;
      if (!CC.checkIfArgIsNaturalNumberInScope(message, namesAmount, 1, 100))
         return;


      let response = '';

      for (let i = 0; i < namesAmount; i++) {
         response += NAMEGEN.generateRandomName(gender, syllablesAmount);
         if (i != namesAmount - 1)
            response += ', ';
      }

      C.dcRespondToMsg(message, response);
   },
}