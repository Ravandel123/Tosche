const { ownerID } = require('../config.json');

module.exports = {
   name: 'guildMemberRemove',
   execute(member, client) {
      member.guild.channels.cache.find(c => c.name == 'main-gate')?.send(`${member.user.username} left through the gate! Walked right through! Get that deserter back!`);
      client.users.cache.get(ownerID).send(`${member.user.username} has escaped!`);
   },
};


