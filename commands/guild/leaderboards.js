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
      let leaderboards = {};
      let currentMenu = 'vFishing';
      let startingIndex = 0;

      try {
         leaderboards = await CG.getRecordDoc();
      } catch(error) {
         C.dcRespondToMsg(message, error);
         return;
      }

      const embedMessage = await message.channel.send({
         embeds: generateMessageEmbed(leaderboards, currentMenu, startingIndex),
         components: generateMenu()
      });

      const collector = embedMessage.createMessageComponentCollector();
      collector.on('collect', async i => {
         if (i.isSelectMenu()) {
            if (i.customId === 'menuId')
               currentMenu = i.values[0];
               console.log(i.values[1]);
               console.log(i.values);
         }

         await i.update({ embeds: generatePageEmbed(leaderboards, currentMenu, startingIndex), components: generateMenu() });
      });
   },
}

//-------------------------MENU-------------------------
function generateMenu() {
   const profilePage = [new D.MessageSelectMenu()
      .setCustomId('menuId')
      .setPlaceholder('Select a category to display the records')
      .addOptions(generateMenuItems())];

   return [C.dcCreateRow(profilePage)];
}

function generateMenuItems() {
   const menuArray = [];
   menuArray.push({ label: 'Fishing', value: 'vFishing', emoji: '🐟' });
   menuArray.push({ label: 'Fishing2', value: 'vFishing2', emoji: '🐟🐟🐟' });

   return menuArray;
}

//-------------------------EMBED-------------------------

function generateMessageEmbed(leaderboards, menuItem, startingIndex) {
   return [new D.MessageEmbed()
      .setTitle(generateTitle(menuItem))
      .setDescription(generateContent(leaderboards, menuItem, startingIndex))];
}


//-------------------------PAGES-------------------------
function generateTitle(menuItem) {
   switch (menuItem) {
      case 'vFishing':
         return `Fishing records:`;

      case 'vFishing2':
         return `Fishing test records:`;
   }
}

function generateContent(leaderboards, menuItem, index) {
   switch (menuItem) {
      case 'vFishing':
         return getFishingContent(leaderboards.fish, index);

      case 'vFishing2':
         return getFishingContent2(leaderboards.fish, index);
   }
}

function getFishingContent(content, startingIndex) {
   let result;

   for (let i = startingIndex; i < content.length; i++) {
      result += `**Name**: ${content.fishId}\n` +
                 `**Person**: ${content.ownerId}\n` +
                 `**Weight**: ${content.weight}\n` +
                 `---`;
   }

   return result;
}

function getFishingContent2(content, startingIndex) {
   let result;

   for (let i = startingIndex; i < content.length; i++) {
      result += `**Name**: ${content.fishId}\n` +
                 `**Person**: ${content.ownerId}\n` +
                 `**Weight**: ${content.weight}\n` +
                 `---`;
   }

   return result;
}

   // return `**ID**: ${profile.ownerId}\n` +
          // `**Name**: ${profile.ownerName}\n` +
          // `**Action Points**: ${profile.actionPoints.current}`;
          
// function getCurrenciesInfo(profile) {
   // const currencies = profile.currencies;

   // return `**Amber Drops:** ${currencies.amberDrops}\n` +
          // `**Pearl Flakes:** ${currencies.pearlFlakes}\n` +
          // `**Obsidian Chips:** ${currencies.obsidianChips}\n` +
          // `**Silver Coin:** ${currencies.silverCoins}\n` +
          // `**Gold Coins:** ${currencies.goldCoins}\n` +
          // `**Deltrada Coins:** ${currencies.deltradaCoins}`;
// }