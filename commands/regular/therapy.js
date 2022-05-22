const D = require('discord.js');
const C = require('../../modules/common.js');

module.exports = {
   name: 'therapy',
   description: 'Shows Deltrada leaderboards.',
   usage: '',
   example: '',
   async execute(message, args) {

      const button1 = C.dcCreateButton('button1', `Sure, let's go!`);
      const row = C.dcCreateRow(button1);
      const embedMessage = await message.channel.send({ content : 'Time for a therapy!', components: [row] });

      const customId = 'm' + embedMessage.id;
      const modal = new D.Modal()
         .setCustomId(customId)
         .setTitle('Therapy with Tosche');
      const categoryInput = new D.TextInputComponent()
         .setCustomId('categoryInput')
         .setLabel("What is the category of your problem?")
         .setStyle('SHORT');
      const explanationInput = new D.TextInputComponent()
         .setCustomId('explanationInput')
         .setLabel("Explain your problem.")
         .setStyle('PARAGRAPH');
      const firstActionRow = new D.MessageActionRow().addComponents(categoryInput);
      const secondActionRow = new D.MessageActionRow().addComponents(explanationInput);
      modal.addComponents(firstActionRow, secondActionRow);

      const collector = embedMessage.createMessageComponentCollector({ time: 7000 });
      collector.on('collect', async i => {
         if (i.user.id != message.author.id) {
            await i.reply({ content: `Only the person who ran the command can use this menu!`, ephemeral: true });
            return;
         }
         
         i.showModal(modal);
         i.editReply({ content: `Therapy in progress...`, components: [] });
         // const collected = await i.awaitModalSubmit({ filter, time: 2000 }).catch(() => null);
         const collected = await i.awaitModalSubmit({ filter, time: 2000 }).catch(err => console.log(err));
         if (collected) {
            console.log("XD");
         }
         

         // await i.showModal(modal);
         // await i.editReply({ content: `Therapy in progress...`, components: [] });

         // const filter = (interaction) => interaction.customId === customId;
         // await i.awaitModalSubmit({ filter, time: 2000 })
            // .then(async i => {
               // const favoriteColor = await i.fields.getTextInputValue('categoryInput');
               // const hobbies = await i.fields.getTextInputValue('explanationInput');
               // await i.update({ content: `Thanks for your submission! My diagnose: you are clearly ${C.arrGetRandom(insanities)}. Have a nice day!`, components: [] });
            // })
            // .catch(err => {
               // console.log(err);
               // embedMessage.edit({ content: `Sorry, your time ran out. Come next time!`, components: [] });
            // });

      });

      collector.on('end', async i => {
      if (i.size == 0)
         embedMessage.edit({ content: `It looks like you are not interested in my diagnose. A shame.`, components: [] });

      });
   },
}

const insanities = [
   'bananas',
   'crackbrained', 'crazy',
   'hysterical',
   'insane',
   'looney', 'lunatic',
   'mad', 'maniac', 'maniacal', 'mental',
   'nuts', 'nutso', 'nutsy', 'nutty',
   'paranoid', 'psycho', 'psychopathic', 'psychotic',
   'schizophrenic',
   'wacko', 'whacky'
];