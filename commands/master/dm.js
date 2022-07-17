const C = require('../../modules/common.js');

module.exports = {
   name: 'dm',
   description: 'Sends DM to someone.',
   usage: '[user ID] [message content]',
   example: '554696495190769692 Welcome to Deltrada',
   execute(message, args) {
      C.dcSendDM(message, args[1], message.content.slice(args[1]?.length + 1));
      console.log('0= ' + args[0]);
      console.log('1= ' + args[1]);
      console.log('2= ' + args[2]);
      console.log('3= ' + args[3]);
      // message.client.users.cache.get(arguments[1])
      // .send(message.content.slice(Config.prefix.length + command.length + arguments[1].length + 1))
   },
}