const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const C = require('../../modules/common.js');
const { getSmackdownLeaderboard } = require('../../database/services/smackdownSpireRecordService');

const MAX_ITEMS_ON_PAGE = 10;

module.exports = {
   name: 'leaderboards',
   aliases: ['leaderboard'],
   description: 'Shows Deltrada leaderboards.',
   usage: '',
   example: '',
   async execute(message, args) {
      let leaderboards = {};
      let currentMenu = 'smackdown';
      let index = 0;

      try {
         if (currentMenu === 'smackdown') {
               leaderboards.smackdown = await getSmackdownLeaderboard();
         }
         // Add other menus as needed
      } catch (error) {
         C.dcRespondToMsg(message, error);
         return;
      }

      const embedMessage = await message.channel.send({
         embeds: [generateMessageEmbed(leaderboards, currentMenu, index)],
         components: generateMenu(index, leaderboards, currentMenu)
      });

      const collector = embedMessage.createMessageComponentCollector({ time: 3600000 });
      collector.on('collect', async i => {
         if (i.isButton()) {
               index = i.customId === 'back' ? index - MAX_ITEMS_ON_PAGE : index + MAX_ITEMS_ON_PAGE;
         }

         await i.update({ embeds: [generateMessageEmbed(leaderboards, currentMenu, index)], components: generateMenu(index, leaderboards, currentMenu) });
      });

      collector.on('end', async () => {
         embedMessage.edit({ content: `The leaderboard browser was closed.`, components: [] });
         embedMessage.suppressEmbeds(true);
      });
   },
};

//-------------------------UTILITY-------------------------
function generateMessageEmbed(leaderboards, currentMenu, index) {
   const embed = new EmbedBuilder().setColor('#0099ff').setTitle('Leaderboard');

   if (currentMenu === 'smackdown') {
      const smackdownData = leaderboards.smackdown.slice(index, Math.min(index + MAX_ITEMS_ON_PAGE, leaderboards.smackdown.length));
      smackdownData.forEach((data, idx) => {
         const userId = data?.controlledCharacter || 'Unknown';
         const eloRating = data?.sparring?.eloRating || 'N/A';
         embed.addFields({ name: `#${index + idx + 1}`, value: `<@${userId}>: ${eloRating} ELO` });
      });
   }

   return embed;
}

function generateMenu(index, leaderboards, currentMenu) {
   const row = new ActionRowBuilder();
   const components = [];
   if (currentMenu === 'smackdown') {
      if (index > 0) {
         components.push(new ButtonBuilder().setCustomId('back').setLabel('Back').setStyle(ButtonStyle.Primary));
      }
      if (index + MAX_ITEMS_ON_PAGE < leaderboards.smackdown.length) {
         components.push(new ButtonBuilder().setCustomId('next').setLabel('Next').setStyle(ButtonStyle.Primary));
      }
   }
   if (components.length > 0) {
      row.addComponents(components);
      return [row];
   }
   return [];
}