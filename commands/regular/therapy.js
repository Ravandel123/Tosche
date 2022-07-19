const D = require('discord.js');
const C = require('../../modules/common.js');

module.exports = {
   name: 'therapy',
   description: 'Tosche gonna diagnose how crazy you are.',
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
      const categoryInput = new D.TextInputBuilder()
         .setCustomId('categoryInput')
         .setLabel("What is the category of your problem?")
         .setStyle('SHORT');
      const explanationInput = new D.TextInputBuilder()
         .setCustomId('explanationInput')
         .setLabel("Explain your problem.")
         .setStyle('PARAGRAPH');
      const firstActionRow = new D.ActionRowBuilder().addComponents(categoryInput);
      const secondActionRow = new D.ActionRowBuilder().addComponents(explanationInput);
      modal.addComponents(firstActionRow, secondActionRow);

      const collector = embedMessage.createMessageComponentCollector({ time: 10000 });
      collector.on('collect', async i => {
         if (i.user.id != message.author.id) {
            await i.reply({ content: `Only the person who ran the command can use this menu!`, ephemeral: true });
            return;
         }

         const filter = (interaction) => interaction.customId === customId;

         await i.showModal(modal);
         i.editReply({ content: `Therapy in progress...`, components: [] });
         await i.awaitModalSubmit({ filter, time: 120000 })
            .then(async i => {
               const catInput = await i.fields.getTextInputValue('categoryInput');
               const expInput = await i.fields.getTextInputValue('explanationInput');
               console.log(`${message.author.tag} - Input: ${catInput}, Explanation: ${expInput}`);
               await i.update({ content: `Thanks for your submission! My diagnose: you are clearly ${C.arrGetRandom(insanities)}. Have a nice day!`, components: [] });
            })
            .catch(() => {
               embedMessage.edit({ content: `Sorry, your time ran out. Come next time!`, components: [] });
            });
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