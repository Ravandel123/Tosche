module.exports = {
   name: 'ready',
   once: true,
   execute(client) {
      console.log(`----------------------------------------------------------------------------------------------------`);
      console.log(`Ready to fight for Aisling!`);
      console.log(`Connected to:`);
      client.guilds.cache.forEach(guild => console.log(`Name: ${guild.name}, ID: ${guild.id}`));
      client.user.setStatus('available');
      client.user.setPresence({ activities: [{ name: `Total War: Dunia, Deluxe Edition` }] });
   },
};


