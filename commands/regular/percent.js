const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');

module.exports = {
   name: 'percent',
   description: 'Gives the percentage of something.',
   usage: '',
   example: 'of the population that likes Tosche',
   execute(message, args) {
      C.dcRespondFromArray(message, R.resAmount(2, '%'));
   },
}