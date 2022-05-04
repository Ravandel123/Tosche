const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');

module.exports = {
   name: 'cmtoimperial',
   description: 'Converts cm to imperial units of measurement.',
   usage: '[number of cm] [number of decimal places]',
   example: '150.22 3',
   execute(message, args) {
      const requiredArgs = ['number of cm'];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      if (!CC.checkIfArgIsNumber(message, args[1]))
         return;

      const precision = C.checkIfNaturalNumber(args[2]) ? args[2] : 0;

      C.dcRespondToMsg(message, `${args[1]} cm = ${C.calcCmToImperial(args[1], precision)}`);
   },
}