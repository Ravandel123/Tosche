const C = require('../../modules/common.js');

module.exports = {
   name: 'messagechannel',
   aliases: ['mc'],
   description: 'Sends message to a channel.',
   usage: '[channel ID] [message content]',
   example: '837636256572637215 Welcome to Deltrada',
   execute(message, args) {
      const channel = C.dcGetChannelByID(message, args[1]);
      if (channel)
         C.dcSendMsgToChannel(channel, message.content.slice(args[0].length + args[1]?.length + 2));
   },
}