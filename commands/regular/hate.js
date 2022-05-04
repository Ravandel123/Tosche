const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');

module.exports = {
   name: 'hate',
   aliases: ['insult'],
   description: 'Reponds with an insult.',
   usage: '',
   example: '',
   execute(message, args) {
      C.dcRespondFromArray(message, R.resHate());
   },
}