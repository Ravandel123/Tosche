const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');

module.exports = {
   name: 'resolve',
   description: `Tests someone's resolve.`,
   usage: '',
   example: `Tosche`,
   async execute(message, args) {
      const who = C.recognizeWhoFullText(args[1], message, args[0]);
      let msgContent = `${C.strAddEndingApostrophe(who)} resolve is tested.`;

      try {
         const responseMsg = await C.dcSendMsgToChannelAndGetItsRef(message, msgContent);
         for (let i = 0; i < 2; i++) {
            await C.sleep(1);
            msgContent += '.';
            responseMsg.edit(msgContent);
         }
         await C.sleep(1.5);
      } catch (e) {
         C.dcRespondToMsg(message, e);
      }

      C.dcRespondToMsg(message, R.resResolve(who));
   },
}