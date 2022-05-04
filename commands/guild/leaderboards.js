const D = require('discord.js');
const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');
const FIS = require('../../modules/advanced/fishing.js');

const MAX_ITEMS_ON_PAGE = 3;

module.exports = {
   name: 'leaderboards',
   aliases: ['leaderboard'],
   description: 'Shows Deltrada leaderboards.',
   usage: '',
   example: '',
   async execute(message, args) {
      //!!!TO RESTORE
      C.dcSendMsg(message, 'Leaderboards temporary disabled.');
      return;



      let leaderboards = {};
      let currentMenu = 'fish';
      let index = 0;

      try {
         leaderboards = await CG.getRecordDoc();
      } catch(error) {
         C.dcRespondToMsg(message, error);
         return;
      }

      leaderboards = translateData(leaderboards, message);

      const embedMessage = await message.channel.send({
         embeds: generateMessageEmbed(leaderboards, currentMenu, index),
         components: generateMenu(index, leaderboards, 'fish')
      });

      const collector = embedMessage.createMessageComponentCollector({ time: 3600000 });
      collector.on('collect', async i => {
         if (i.isStringSelectMenu()) {
            currentMenu = i.values[0];
            index = 0;
         } else if (i.isButton()) {
            index = i.customId == 'back' ? index - MAX_ITEMS_ON_PAGE : index + MAX_ITEMS_ON_PAGE;
         }

         await i.update({ embeds: generateMessageEmbed(leaderboards, currentMenu, index), components: generateMenu(index, leaderboards, currentMenu) });
      });

      collector.on('end', async i => {
         embedMessage.edit({ content: `The leaderboard browser has been closed.`, components: [] });
         embedMessage.suppressEmbeds(true);
      });
   },
}

//-------------------------UTILITY-------------------------
function translateData(leaderboards, message) {
   const guildMembers = C.dcGetAllMembers(message);
   let result = leaderboards;

   //Fish
   for (item of result.fish) {
      item.fishId = FIS.getFishNameById(item.fishId);
      item.place1Id = guildMembers.find(e => e.id == item.place1Id)?.displayName ?? `A long-forgotten user`;
      item.place2Id = guildMembers.find(e => e.id == item.place2Id)?.displayName ?? `A long-forgotten user`;
      item.place3Id = guildMembers.find(e => e.id == item.place3Id)?.displayName ?? `A long-forgotten user`;
   }

   return result;
}

//-------------------------MENU-------------------------
function generateMenu(index, data, currentMenu) {
   const recordsMenu = C.dcCreateSelectMenu('menu', 'Select a category to display the records', generateMenuItems());
   const backButton = C.dcCreateButton('back', 'Previous', '⬅️', 'primary', index == 0);
   const forwardButton = C.dcCreateButton('forward', 'Next', '➡️', 'primary', index + MAX_ITEMS_ON_PAGE >= data[currentMenu].length);

   return [C.dcCreateRow([backButton, forwardButton]), C.dcCreateRow(recordsMenu)];
}

function generateMenuItems() {
   const menuArray = [];
   menuArray.push({ label: 'Fish', value: 'fish', emoji: '🐟' });

   return menuArray;
}

//-------------------------EMBED-------------------------

function generateMessageEmbed(leaderboards, menuItem, startingIndex) {
   return [new D.EmbedBuilder()
      .setTitle(generateTitle(menuItem))
      .setDescription(generatePageContent(leaderboards, menuItem, startingIndex))];
}

//-------------------------PAGES-------------------------
function generateTitle(menuItem) {
   switch (menuItem) {
      case 'fish':
         return `Fishing records`;

      case 'tmp':
         return `Fishing test records:`;
   }
}

function generatePageContent(leaderboards, menuItem, index) {
   switch (menuItem) {
      case 'fish':
         return getFishingContent(leaderboards.fish, index);

      case 'tmp':
         return getFishingContent(leaderboards.fish, index);
   }
}

function getFishingContent(content, startingIndex) {
   let result = ``;
   const possibleMaxIndex = startingIndex + MAX_ITEMS_ON_PAGE;
   const maxIndex = content.length <= possibleMaxIndex ? content.length : possibleMaxIndex;
   
   for (let i = startingIndex; i < maxIndex; i++) {
      result += `**${content[i].fishId}** 🐟 \n` +
                `🥇 ${content[i].place1Id}: ${C.getFullKgToImperial(content[i].place1Weight)})\n`;

      if (content[i].place2Weight > 0)
         result += `🥈 ${content[i].place2Id}: ${C.getFullKgToImperial(content[i].place2Weight)})\n`;

      if (content[i].place3Weight > 0)
         result += `🥉 ${content[i].place3Id}: ${C.getFullKgToImperial(content[i].place3Weight)})\n`;

      result += `-----\n`;
   }

   return result;
}