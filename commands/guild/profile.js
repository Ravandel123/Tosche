const D = require('discord.js');
const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');

module.exports = {
   name: 'profile',
   description: 'Used to access your Deltrada profile.',
   usage: '[user]',
   example: '',
   async execute(message, args) {
      let userData = {};
      let currentButton = MAIN_BUTTON1;
      let currentMenu = MENU1_ITEM_1;
      let index = 0;

      try {
         userData.profile = C.checkIfExists(args[1]) ? await CG.getMemberProfile(message, args[1]) : await CG.getMessageAuthorProfile(message);
      } catch(error) {
         C.dcRespondToMsg(message, error);
         return;
      }

      const embedMessage = await message.channel.send({
         embeds: generateMessageEmbed(userData, currentMenu, message),
         components: generateComponents(currentButton, currentMenu, index)
      });

      const collector = embedMessage.createMessageComponentCollector();
      collector.on('collect', async i => {
         if (i.user.id != message.author.id) {
            await i.reply({ content: `Only the person who ran the command can do that!`, ephemeral: true });
            return;
         }

         if (i.isSelectMenu()) {
            if (i.customId === 'menu')
               currentMenu = i.values[0];
         } else if (i.isButton()) {
            currentButton = i.customId;
         }

         await i.update({ embeds: generateMessageEmbed(userData, currentMenu, message), components: generateComponents(currentButton, currentMenu, index) });
      });
   },
}

//-------------------------CONST-------------------------
const MAX_ITEMS_ON_PAGE = 3;

const MAIN_BUTTON1 = 'character';
const MAIN_BUTTON2 = 'inventory';
const MAIN_BUTTON3 = 'records';

const MENU1_ITEM_1 = 'info';
const MENU1_ITEM_2 = 'currencies';


//-------------------------EMBED-------------------------
function generateMessageEmbed(userData, menuItem, message) {
   return [new D.MessageEmbed()
      .setTitle(generateEmbedTitle(userData, menuItem))
      .setImage('https://i.imgur.com/iSpEc6r.png')
      .setFooter(generateEmbedContent(userData, menuItem))];
      // .setDescription(generateEmbedContent(userData, menuItem))];
}

function generateEmbedTitle(userData, menuItem) {
   switch (menuItem) {
      case MENU1_ITEM_1:
         return `Profile of ${C.strBold(userData.profile?.ownerTag)}`;

      case MENU1_ITEM_2:
         return `Currencies of ${C.strBold(userData.profile?.ownerName)}`;
   }
}

function generateEmbedContent(userData, menuItem) {
   switch (menuItem) {
      case MENU1_ITEM_1:
         return getMainProfileInfo(userData.profile);

      case MENU1_ITEM_2:
         return getCurrenciesInfo(userData.profile);
   }
}

function getMainProfileInfo(profile) {
   return `**ID**: ${profile.ownerId}\n` +
          `**Name**: ${profile.ownerName}\n` +
          `**Action Points**: ${profile.actionPoints?.current}`;
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

//-------------------------MENU-------------------------
function generateComponents(currentButton, currentMenu, index) {
   const menuItems = [];

   if (hasPagination(currentMenu))
      menuItems.push(generatePaginationButtons, index);

   menuItems.push(generateMainButtons());
   menuItems.push(C.dcCreateRow(generateMenu(currentButton)));

   return menuItems;
}

function generateMainButtons() {
   const characterButton = C.dcCreateButton(MAIN_BUTTON1, C.strCapitalizeFirstLetter(MAIN_BUTTON1), 'SUCCESS');
   const inventoryButton = C.dcCreateButton(MAIN_BUTTON2, C.strCapitalizeFirstLetter(MAIN_BUTTON2), 'SUCCESS');
   const recordsButton = C.dcCreateButton(MAIN_BUTTON3, C.strCapitalizeFirstLetter(MAIN_BUTTON3), 'SUCCESS');

   return C.dcCreateRow([characterButton, inventoryButton, recordsButton]);
}

function hasPagination(menuName) {
   const menusWithPages = ['recordsFishing'];

   return C.strCheckIfAnyMatch(menuName, menusWithPages);
}

function generatePaginationButtons(index) {
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
      .setDisabled(true);

   return C.dcCreateRow([backButton, forwardButton]);
}

function generateMenu(button) {
   const menuArray = [];

   if (C.strCompare(button, MAIN_BUTTON1)) {
      menuArray.push({ label: C.strCapitalizeFirstLetter(MENU1_ITEM_1), value: MENU1_ITEM_1, emoji: '📋' });
      menuArray.push({ label: C.strCapitalizeFirstLetter(MENU1_ITEM_2), value: MENU1_ITEM_2, emoji: '💰' });
   }

   return C.dcCreateSelectMenu('menu', 'Select the information to display', menuArray);
}