const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const DC = require('../../modules/dataCommon.js');

module.exports = {
   name: 'bmiforheight',
   description: 'Lists BMI body shapes and their weight range based on given height in cm.',
   usage: '[height in cm]',
   example: '176',
   execute(message, args) {
      const requiredArgs = ['height in cm'];

      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      if (!CC.checkIfArgIsNumber(message, args[1]))
         return;

      let msg = '';

      for (let i = 0; i < DC.bodyShapes.length; i++) {
         const currentBMI = DC.bodyShapes[i];
         const minWeight = C.calcBMIWeight(args[1], currentBMI.minBMI);
         const maxWeight = C.calcBMIWeight(args[1], currentBMI.maxBMI);

         msg = msg + `${C.strCapitalizeFirstLetter(currentBMI.name)}: **${minWeight} kg - ${maxWeight} kg** // **${C.calcKgToImperial(minWeight)} - ${C.calcKgToImperial(maxWeight)}**\n`;
      }

      C.dcRespondToMsg(message, msg);
   },
}