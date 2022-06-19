const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');

module.exports = {
   name: 'rate',
   description: 'Rates something.',
   usage: '',
   example: 'Deltrada',
   execute(message, args) {
      C.dcRespondToMsg(message, R.resRate(args[1]));
   },
}