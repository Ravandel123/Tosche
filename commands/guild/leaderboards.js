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
      let currentMenu = 'vFishing';
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
         components: generateMenu(index)
      });

      const collector = embedMessage.createMessageComponentCollector();
      collector.on('collect', async i => {
         if (i.isSelectMenu()) {
            if (i.customId === 'menuId')
               currentMenu = i.values[0];
            console.log(i.values[0])
            console.log(i.values[1])
            console.log(i.values)
         } else if (i.isButton()) {
            index = i.customId == 'backId' ? index - MAX_ITEMS_ON_PAGE : index + MAX_ITEMS_ON_PAGE;
         }

         await i.update({ embeds: generateMessageEmbed(leaderboards, currentMenu, index), components: generateMenu(index) });
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
      item.ownerId = guildMembers.find(e => e.id == item.ownerId)?.displayName ?? `A long-forgotten user`;
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
   menuArray.push({ label: 'Fish', value: 'vFishing', emoji: '🐟' });
   menuArray.push({ label: 'Fish', value: 'vFishing2', emoji: '🐟' });

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
      case 'vFishing':
         return `Fishing records`;

      case 'vFishing2':
         return `Fishing test records:`;
   }
}

function generatePageContent(leaderboards, menuItem, index) {
   switch (menuItem) {
      case 'vFishing':
         return getFishingContent(leaderboards.fish, index);

      case 'vFishing2':
         return getFishingContent2(leaderboards.fish, index);
   }
}

function getFishingContent(content, startingIndex) {
   let result = ``;
   const permissibleMaxIndex = startingIndex + MAX_ITEMS_ON_PAGE;
   const maxIndex = content.length <= permissibleMaxIndex ? content.length : permissibleMaxIndex;

   for (let i = startingIndex; i < maxIndex; i++) {
      result += `🐟 **${content[i].fishId}**\n` +
                `🥇 ${content[i].ownerId}\n` +
                `⚖️ ${content[i].weight} kg (${C.calcKgToImperial(content[i].weight)})\n` +
                `-----\n`;
   }

   return result;
}

function getFishingContent2(content, startingIndex) {
   let result = ``;
   const permissibleMaxIndex = startingIndex + MAX_ITEMS_ON_PAGE;
   const maxIndex = content.length <= permissibleMaxIndex ? content.length : permissibleMaxIndex;

   for (let i = startingIndex; i < maxIndex; i++) {
      result += `🐟 **${content[i].fishId}**\n` +
                `🥇 ${content[i].ownerId}\n` +
                `⚖️ ${content[i].weight} kg (${C.calcKgToImperial(content[i].weight)})\n` +
                `-----\n`;
   }

   return result;
}