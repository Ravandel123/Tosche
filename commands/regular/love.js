const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');

module.exports = {
   name: 'love',
   aliases: ['flattery', 'compliment'],
   description: 'Reponds with a compliment.',
   usage: '',
   example: 'Clovis',
   execute(message, args) {
      C.dcRespondFromArray(message, R.resLove(args[1]));
   },
}