const C = require('../../modules/common.js');

module.exports = {
   name: 'directmessage',
   aliases: ['dm'],
   description: 'Sends DM to someone.',
   usage: '[user ID] [message content]',
   example: '554696495190769692 Welcome to Deltrada',
   execute(message, args) {
      C.dcSendDM(message, args[1], message.content.slice(args[0].length + args[1]?.length + 2));
   },
}