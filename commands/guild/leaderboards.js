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
      let currentEmbed = 'fishing';
      let currentIndex = 0;

      try {
         leaderboards.fishing = await CG.getRecordDoc();
      } catch(error) {
         C.dcRespondToMsg(message, error);
         return;
      }





      const embedMessage = await message.channel.send({
         embeds: generatePageEmbed(user.profile, currentMenu),
         components: generateMenu()
      });

      const collector = embedMessage.createMessageComponentCollector({ componentType: 'SELECT_MENU' });
      collector.on('collect', async i => {
         if (i.user.id != message.author.id) {
            await i.reply({ content: `Only the person who ran the command can use this menu!`, ephemeral: true });
            return;
         }

         if (i.isSelectMenu()) {
            if (i.customId === 'menuId')
               currentMenu = i.values[0];
         }

         await i.update({ embeds: generatePageEmbed(user.profile, currentMenu), components: generateMenu() });
      });
   },
}

function generatePageEmbed(profile, menuItem) {
   return [new D.MessageEmbed()
      .setTitle(generatePageTitle(profile, menuItem))
      .setDescription(generatePageContent(profile, menuItem))];
}

function generateMenu() {
   const profilePage = [new D.MessageSelectMenu()
      .setCustomId('menuId')
      .setPlaceholder('Select the information to display')
      .addOptions(generateMenuItems())];

   return [C.dcCreateRow(profilePage)];
}

function generateMenuItems() {
   const menuArray = [];
   menuArray.push({ label: 'Main', value: 'main', emoji: '📋' });
   menuArray.push({ label: 'Currencies', value: 'currencies', emoji: '💰' });

   return menuArray;
}

//-------------------------PAGES-------------------------
function generatePageTitle(profile, menuItem) {
   switch (menuItem) {
      case 'main':
         return `Profile of ${C.strBold(profile.ownerTag)}`;

      case 'currencies':
         return `Currencies of ${C.strBold(profile.ownerName)}`;
   }
}

function generatePageContent(profile, menuItem) {
   switch (menuItem) {
      case 'main':
         return getMainProfileInfo(profile);

      case 'currencies':
         return getCurrenciesInfo(profile);
   }
}

function getMainProfileInfo(profile) {
   return `**ID**: ${profile.ownerId}\n` +
          `**Name**: ${profile.ownerName}\n` +
          `**Action Points**: ${profile.actionPoints.current}`;
}

function getCurrenciesInfo(profile) {
   const currencies = profile.currencies;

   return `**Amber Drops:** ${currencies.amberDrops}\n` +
          `**Pearl Flakes:** ${currencies.pearlFlakes}\n` +
          `**Obsidian Chips:** ${currencies.obsidianChips}\n` +
          `**Silver Coin:** ${currencies.silverCoins}\n` +
          `**Gold Coins:** ${currencies.goldCoins}\n` +
          `**Deltrada Coins:** ${currencies.deltradaCoins}`;
}