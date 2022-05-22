const D = require('discord.js');
const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');

module.exports = {
   name: 'leaderboards',
   aliases: ['leaderboard'],
   description: 'Shows Deltrada leaderboards.',
   usage: '',
   example: '',
   async execute(message, args) {

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

      const button1 = C.dcCreateButton('button1', `Sure, let's go!`);
      const row = C.dcCreateRow(button1);
      const embedMessage = await message.channel.send({ content : "Time for a therapy!", components: [firstActionRow, secondActionRow] });


      const collector = embedMessage.createMessageComponentCollector();
      collector.on('collect', async i => {
         if (i.user.id != message.author.id) {
            await i.reply({ content: `Only the person who ran the command can use this menu!`, ephemeral: true });
            return;
         }

         if (i.isButton()) {
            i.editReply({ content: `Therapy in progress...`, components: [] });
         } else {
            console.log(i);
            // i.editReply({ content: i., components: [] });
         }
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