const { ownerID } = require('../config.json');

module.exports = {
   name: 'guildMemberRemove',
   execute(member, client) {
      member.guild.channels.cache.find(c => c.name == 'main-gate').send(`${member.user.username} left through the gate! Walked right through! <@!380485376759824385>! <@!355719279967993856>! Get that fugitive!`);
      client.users.cache.get(ownerID).send(`${member.user.username} has escaped!`);
   },
};


