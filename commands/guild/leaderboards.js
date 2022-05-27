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
      let leaderboards = {};
      let currentMenuName = 'fish';
      let index = 0;

      try {
         leaderboards = await CG.getRecordDoc();
      } catch(error) {
         C.dcRespondToMsg(message, error);
         return;
      }

      leaderboards = translateData(leaderboards, message);

      const embedMessage = await message.channel.send({
         embeds: generateMessageEmbed(leaderboards, currentMenuName, index),
         components: generateMenu(index, leaderboards, 'fish')
      });

      const collector = embedMessage.createMessageComponentCollector();
      collector.on('collect', async i => {
         if (i.isSelectMenu()) {
            currentMenuName = i.values[0];
            index = 0;
         } else if (i.isButton()) {
            index = i.customId == 'backId' ? index - MAX_ITEMS_ON_PAGE : index + MAX_ITEMS_ON_PAGE;
         }

         await i.update({ embeds: generateMessageEmbed(leaderboards, currentMenuName, index), components: generateMenu(index, leaderboards, currentMenuName) });
      });
   },
}

//-------------------------UTILITY-------------------------
function translateData(leaderboards, message) {
   const guildMembers = C.dcGetAllMembers(message);
   let result = leaderboards;

   //Fish
   for (item of result.fish) {
      item.fishId = FIS.getFishNameId(item.fishId);
      item.place1Id = guildMembers.find(e => e.id == item.place1Id)?.displayName ?? `A long-forgotten user`;
      item.place2Id = guildMembers.find(e => e.id == item.place2Id)?.displayName ?? `A long-forgotten user`;
      item.place3Id = guildMembers.find(e => e.id == item.place3Id)?.displayName ?? `A long-forgotten user`;
   }

   return result;
}

//-------------------------MENU-------------------------
function generateMenu(index, data, currentMenuName) {
   const recordsMenu = [new D.MessageSelectMenu()
      .setCustomId('menuId')
      .setPlaceholder('Select a category to display the records')
      .addOptions(generateMenuItems())];

   const backButton = new D.MessageButton()
      .setCustomId('backId')
      .setLabel('Previous')
      .setEmoji('⬅️')
      .setStyle('PRIMARY')
      .setDisabled(index == 0);

   const forwardButton = new D.MessageButton()
      .setCustomId('forwardId')
      .setLabel('Next')
      .setEmoji('➡️')
      .setStyle('PRIMARY')
      .setDisabled(index * 3 >= data[currentMenuName].length);

   return [C.dcCreateRow([backButton, forwardButton]), C.dcCreateRow(recordsMenu)];
}

function generateMenuItems() {
   const menuArray = [];
   menuArray.push({ label: 'Fish', value: 'fish', emoji: '🐟' });

   return menuArray;
}

//-------------------------EMBED-------------------------

function generateMessageEmbed(leaderboards, menuItem, startingIndex) {
   return [new D.MessageEmbed()
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
                `🥇 ${content[i].place1Id}: ${content[i].place1Weight} kg (${C.calcKgToImperial(content[i].place1Weight)})\n`;

      if (content[i].place2Weight > 0)
         result += `🥈 ${content[i].place2Id}: ${content[i].place2Weight} kg (${C.calcKgToImperial(content[i].place2Weight)})\n`;

      if (content[i].place3Weight > 0)
         result += `🥉 ${content[i].place3Id}: ${content[i].place3Weight} kg (${C.calcKgToImperial(content[i].place3Weight)})\n`;

      result += `-----\n`;
   }

   return result;
}