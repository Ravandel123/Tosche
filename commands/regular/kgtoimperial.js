const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');

module.exports = {
   name: 'kgtoimperial',
   description: 'Converts kg to imperial units of measurement.',
   usage: '[number of kg] [number of decimal places]',
   example: '77.12 4',
   execute(message, args) {
      const requiredArgs = ['number of kg'];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      if (!CC.checkIfArgIsNumber(message, args[1]))
         return;

      const precision = C.checkIfNaturalNumber(args[2]) ? args[2] : 0;

      C.dcRespondToMsg(message, `${args[1]} kg = ${C.calcKgToImperial(args[1], precision)}`);
   },
}