const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');

module.exports = {
   name: 'roll',
   description: 'Rolls the dice.',
   usage: '',
   example: '2d12',
   execute(message, args) {
      let numberOfRolls;
      let typeOfDice;

      var rollsIndividuals = '[';
      var rollsTotalAmount = 0;

      if (!args[1]) {
         numberOfRolls = 1;
         typeOfDice = 6;
      } else {
         const rollData = args[1].split('d');
         numberOfRolls = C.checkIfNaturalNumber(rollData[0]) ? rollData[0] : 1;
         typeOfDice = C.checkIfNaturalNumber(rollData[1]) ? rollData[1] : 6;
      }

      for (let i = 0; i < numberOfRolls; i++) {
         rollValue = RndNo0(typeOfDice);
         rollsIndividuals = rollsIndividuals + rollValue;

         if (i != numberOfRolls - 1)
            rollsIndividuals = rollsIndividuals + ', ';

         rollsTotalAmount = rollsTotalAmount + rollValue;
      }

      C.dcRespondToMsg(message, `Result: ${rollsIndividuals}] Total amount: ${rollsTotalAmount}`);
   },
}