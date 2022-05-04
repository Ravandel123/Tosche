const C = require('../../modules/common.js');

module.exports = {
   name: 'roll',
   description: 'Rolls the dice.',
   usage: '',
   example: '2d12',
   execute(message, args) {
      let numberOfRolls;
      let typeOfDice;
      let rollsIndividual = '[';
      let rollsTotal = 0;

      if (!args[1]) {
         numberOfRolls = 1;
         typeOfDice = 6;
      } else {
         const rollData = C.strToLowerCase(args[1]).split('d');
         numberOfRolls = C.checkIfNaturalNumber(rollData[0]) ? rollData[0] : 1;
         typeOfDice = C.checkIfNaturalNumber(rollData[1]) ? rollData[1] : 6;
      }

      for (let i = 0; i < numberOfRolls; i++) {
         rollValue = C.rndNo0(typeOfDice);
         rollsIndividual = rollsIndividual + rollValue;

         if (i != numberOfRolls - 1)
            rollsIndividual = rollsIndividual + ', ';

         rollsTotal = rollsTotal + rollValue;
      }

      C.dcRespondToMsg(message, `Result: ${rollsIndividual}] Total amount: ${rollsTotal}`);
   },
}