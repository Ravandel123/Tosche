const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const AC = require('../../modules/arraysCommon.js');

module.exports = {
   name: 'bmi',
   description: 'Calculates your BMI (Body Mass Index).',
   usage: '[height in cm] [weight in kg]',
   example: '170 68',
   execute(message, args) {
      const requiredArgs = ['height in cm', 'weight in kg'];

      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      if (!CC.checkIfArgIsNumber(message, args[1]) || !CC.checkIfArgIsNumber(message, args[2]))
         return;

      const bmi = C.calcBMI(args[1], args[2]);
      let possibleBodyShapes = C.arrGetAllByFunction(AC.arrayBodyShapes, (e) => bmi >= e.minBMI && bmi <= e.maxBMI);
      possibleBodyShapes = possibleBodyShapes.map(e => e.name).join(' or ');

      C.dcRespondToMsg(message, `BMI: ${bmi} (${possibleBodyShapes})`);
   },
}