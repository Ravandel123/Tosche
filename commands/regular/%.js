const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');
const CC = require('../../modules/commonCommands.js');

module.exports = {
   name: '%',
   description: 'Shows percent of something applied to someone.',
   usage: '[percent of what] [applied to who]',
   example: 'awesome Tosch',
   execute(message, args) {
      const requiredArgs = ['percent of something'];

      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      const who = args[2] ? args[2] : C.recognizeWhoOneArg(args[2], message);

      C.dcRespondFromArray(message, R.resPercentSpecial(who, args[1]));
   },
}