const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');

module.exports = {
   name: 'chance',
   aliases: ['chances'],
   description: 'Gives the chance for something.',
   usage: '',
   example: 'that Tosche will rule Dunia.',
   execute(message, args) {
      C.dcRespondFromArray(message, R.resChance());
   },
}