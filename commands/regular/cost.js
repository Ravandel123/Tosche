const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');

module.exports = {
   name: 'cost',
   aliases: ['price', 'value'],
   description: 'Gives the cost of something.',
   usage: '',
   example: 'of Tosche\'s autograph',
   execute(message, args) {
      C.dcRespondFromArray(message, R.resCost());
   },
}