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
      let currentButton = MAIN_BUTTON1.id;
      let currentMenu = MENU1_ITEM_1.value;
      let index = 0;

      try {
         userData.profile = C.checkIfExists(args[1]) ? await CG.getMemberProfile(message, args[1]) : await CG.getMessageAuthorProfile(message);
      } catch(error) {
         C.dcRespondToMsg(message, error);
         return;
      }

      const embedMessage = await message.channel.send({
         embeds: generateMessageEmbed(userData, currentButton, currentMenu),
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
            i.deferUpdate();
            currentButton = i.customId;
            return;
         }

         await i.update({ embeds: generateMessageEmbed(userData, currentButton, currentMenu), components: generateComponents(currentButton, currentMenu, index) });
      });
   },
}


//-------------------------CONST-------------------------
const MAX_ITEMS_ON_PAGE = 3;

const MAIN_BUTTON1 = new C.ButtonData('character', 'Character', '', 'SUCCESS');
const MAIN_BUTTON2 = new C.ButtonData('inventory', 'Inventory', '', 'SUCCESS');
const MAIN_BUTTON3 = new C.ButtonData('records', 'Records', '', 'SUCCESS');

const MENU1_ITEM_1 = new C.SelectOptionData('info', 'Info', '📋');
const MENU1_ITEM_2 = new C.SelectOptionData('currencies', 'Currencies', '💰');

const MENU2_ITEM_1 = 'invFishes';

const MENU3_ITEM_1 = 'recFishes';


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
   const characterButton = C.dcCreateButton(MAIN_BUTTON1.id, MAIN_BUTTON1.label, '', MAIN_BUTTON1.style);
   const inventoryButton = C.dcCreateButton(MAIN_BUTTON2.id, MAIN_BUTTON2.label, '', MAIN_BUTTON2.style);
   const recordsButton = C.dcCreateButton(MAIN_BUTTON3.id, MAIN_BUTTON3.label, '', MAIN_BUTTON3.style);

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

function generateMenu(buttonId) {
   const menuArray = [];

   if (C.strCompare(buttonId, MAIN_BUTTON1.id)) {
      menuArray.push({ label: MENU1_ITEM_1.label, value: MENU1_ITEM_1.value, emoji: MENU1_ITEM_1.emoji });
      menuArray.push({ label: MENU1_ITEM_2.label, value: MENU1_ITEM_2.value, emoji: MENU1_ITEM_2.emoji });
   }

   return C.dcCreateSelectMenu('menu', 'Select the information to display', menuArray);
}


//-------------------------EMBED-------------------------
function generateMessageEmbed(userData, button, menu) {
   const image = generateEmbedImage(menu);

   const embed = new D.MessageEmbed()
      .setTitle(generateEmbedTitle(userData, button, menu))
      .setDescription(generateEmbedContent(userData, button, menu));

   if (image)
      embed.setImage(image);

   return [embed];
}

function generateEmbedTitle(userData, button, menu) {
   switch (menu) {
      case MENU1_ITEM_1.value:
         return `Profile of ${C.strBold(userData.profile?.ownerTag)}`;

      case MENU1_ITEM_2.value:
         return `Currencies of ${C.strBold(userData.profile?.ownerName)}`;
   }
}

function generateEmbedImage(menu) {
   switch (menu) {
      case MENU1_ITEM_1.value:
         return 'https://i.imgur.com/iSpEc6r.png';

      default:
         return '';
   }
}

function generateEmbedContent(userData, button, menu) {
   switch (menu) {
      case MENU1_ITEM_1.value:
         return getCharacterInfo(userData.profile);

      case MENU1_ITEM_2.value:
         return getCurrenciesInfo(userData.profile);
   }
}

//-------------------------CONTENT-------------------------
function getCharacterInfo(profile) {
   return `**Name**: ${profile.ownerName}\n` +
          `**Id**: ${profile.ownerId}\n` +
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