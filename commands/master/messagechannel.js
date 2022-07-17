const C = require('../../modules/common.js');

module.exports = {
   name: 'messagechannel',
   aliases: ['mc'],
   description: 'Sends message to a channel.',
   usage: '[channel ID] [message content]',
   example: '837636256572637215 Welcome to Deltrada',
   execute(message, args) {

      let x = C.dcGetChannelByID(message, args[1]);
      console.log(x);
      // C.dcSendMsgToChannel(channel, msg);
      // client.channels.cache.find(channel => channel.name === arguments[1]).send(message.content.slice(Config.prefix.length + command.length + arguments[1].length + 1))
   },
}