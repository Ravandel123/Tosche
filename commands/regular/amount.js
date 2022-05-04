const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');

module.exports = {
   name: 'amount',
   description: 'Gives the amount of something.',
   usage: '',
   example: 'of Tosche\'s elite troops in Deltrada',
   execute(message, args) {
      C.dcRespondFromArray(message, R.resAmount());
   },
}