const { dcRespondToMsg } = require('../../modules/common.js');
const { resWho } = require('../../modules/responses.js');


module.exports = {
   name: 'who',
   description: 'Responds with a name of a person from this server or a fictional character.',
   usage: '',
   example: 'is Tosch\'s favourite person?',
   execute(message, args) {
      dcRespondToMsg(message, resWho());
   },
}