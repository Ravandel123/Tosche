const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');

module.exports = {
   name: 'you',
   description: 'Responds to a direct provocation attempt.',
   usage: '',
   example: 'are awesome general Tosch',
   execute(message, args) {
      C.dcRespondFromArray(message, R.resYou());
   },
}