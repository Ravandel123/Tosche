const { ownerID } = require('../config.json');

module.exports = {
   name: 'guildMemberAdd',
   execute(member, client) {
      member.guild.channels.cache.find(c => c.name == 'main-gate').send(`Well, well, well... Who do we have here? <@!${member.user.id}> looks like someone who might have been involved in my brother\'s murder. Will find it out soon...`);
      member.user.send('Welcome stranger! Our imperator has been already informed about your arrival. Remember to read and obey our rules on bulletin-board channel. And for the list of my commands use\nh!commands\nHave fun and see you soon in our dungeon!');
      client.users.cache.get(ownerID).send(`${member.user.username} has arrived!`);
   },
};


