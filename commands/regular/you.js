const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');

module.exports = {
   name: 'you',
   description: 'Responds to a direct provocation attempt.',
   usage: '',
   example: 'are an awesome general, Tosche',
   execute(message, args) {
      C.dcRespondToMsg(message, R.resYou());
   },
}