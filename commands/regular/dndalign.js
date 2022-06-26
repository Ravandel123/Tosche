const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');

module.exports = {
   name: 'dndalign',
   description: 'Checks DnD alignment.',
   usage: '[person]',
   example: 'Tosche',
   execute(message, args) {
      const who = C.recognizeWhoFullText(args[1], message, args[0]);
      C.dcRespondToMsg(message, R.resDndalign(who));
   },
}