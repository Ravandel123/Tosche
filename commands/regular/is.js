const C = require('../../modules/common.js');
const R = require('../../modules/responses.js');

module.exports = {
   name: 'is',
   aliases: ['am', 'are', 'can', 'could', 'did', 'do', 'does', 'have', 'had', 'has', 'shall', 'should', 'was', 'were', 'will', 'would'],
   description: 'Responds to a common question.',
   usage: '',
   example: 'Tosche the best?',
   execute(message, args) {

      C.dcRespondToMsg(message, R.resIs());
   },
}