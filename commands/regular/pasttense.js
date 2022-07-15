const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');

module.exports = {
   name: 'pasttense',
   description: 'Returns the past tense of a verb.',
   usage: '[verb]',
   example: '',
   execute(message, args) {
      const requiredArgs = ['a verb to convert to past tense'];

      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      C.dcRespondToMsg(message, `${args[1]} -> ${C.strGetPastTense(args[1])}`);
   },
}
