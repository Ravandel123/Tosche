const D = require('discord.js');
const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');

module.exports = {
   name: 'profile',
   description: 'Used to access your Deltrada profile.',
   usage: '[user]',
   example: '',
   async execute(message, args) {
      let userProfile;
      let currentMenu = 'main';

      try {
         userProfile = C.checkIfExists(args[1]) ? await CG.getMemberProfile(message, args[1]) : await CG.getMessageAuthorProfile(message);
      } catch(error) {
         C.dcRespondToMsg(message, error);
         return;
      }

      const embedMessage = await message.channel.send({
         embeds: generatePageEmbed(userProfile, currentMenu),
         components: generateMenu()
      });

      const filter = i => i.user.id == message.author.id;
      const collector = embedMessage.createMessageComponentCollector({ filter });
      collector.on('collect', async i => {
         if (i.isSelectMenu()) {
            if (i.customId === 'chapterId') {
               console.log(`i.values = ${i.values}`);
               currentMenu = i.values[0];
            }
         }

         await i.update({ embeds: generatePageEmbed(userProfile, currentMenu), components: generateMenu() });
      });
   },
}

function generatePageEmbed(profile, menuItem) {
   return [new D.MessageEmbed()
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
function generatePageContent(profile, menuItem) {
   switch (menuItem) {
      case 'main':
         return getMainProfileInfo(profile);

      case 'currencies':
         return getCurrenciesInfo(profile);
   }
}

function getMainProfileInfo(profile) {
   return `Profile of ${C.strBold(profile.ownerTag)}` +
          `\n--------------------------------------------------` + 
          `\n**ID**: ${profile.ownerId}` +
          `\n**Name**: ${profile.ownerName}` +
          `\n**Action Points**: ${profile.actionPoints.current}`;
}

function getCurrenciesInfo(profile) {
   const currencies = profile.currencies;

   return `Currencies of ${C.strBold(profile.ownerName)}` + 
          `\n--------------------------------------------------` +
          `\n**Amber Drops:** ${currencies.amberDrops}` +
          `\n**Pearl Flakes:** ${currencies.pearlFlakes}` +
          `\n**Obsidian Chips:** ${currencies.obsidianChips}` +
          `\n**Silver Coin:** ${currencies.silverCoins}` +
          `\n**Gold Coins:** ${currencies.goldCoins}` +
          `\n**Deltrada Coins:** ${currencies.deltradaCoins}`;
}