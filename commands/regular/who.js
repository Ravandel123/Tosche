const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');

module.exports = {
   name: 'who',
   description: 'Responds with a name of a person from this server or a fictional character.',
   usage: '',
   example: 'is Tosch\'s favourite person?',
   execute(message, args) {
      C.dcRespondToMsg(message, R.resWho());
   },
}