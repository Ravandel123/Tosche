const D = require('discord.js');
const C = require('../../modules/common.js');
const CL_IN = require('../../classes/interactions.js');
const CG = require('../../modules/commonGuild.js');
const FIS = require('../../modules/advanced/fishing.js');

module.exports = {
   name: 'profile',
   description: 'Used to access your Deltrada profile.',
   usage: '[user]',
   example: '',
   async execute(message, args) {
      // if (!CG.cdCheckIfTaskCanBeAssigned(message))
         // return;

      try {
         let userData = {};
         let currentButton = MAIN_BUTTON1.id;
         let currentMenu = MENU1_ITEM_1.value;
         let index = 0;
         let reloadNeeded = false;

         userData.profile = C.checkIfExists(args[1]) ? await CG.getMemberProfile(message, args[1]) : await CG.getMessageAuthorProfile(message);

         const embedMessage = await message.channel.send({
            embeds: generateMessageEmbed(currentButton, currentMenu, userData, index, message),
            components: generateComponents(currentButton, currentMenu, index)
         });

         const collector = embedMessage.createMessageComponentCollector({ time: 3600000 });
         // CG.cdAssignNewTask(message, collector);

         collector.on('collect', async i => {
            if (i.user.id != message.author.id) {
               await i.reply({ content: `Only the person who ran the command can do that!`, ephemeral: true });
               return;
            }

            if (i.isButton()) {
               if (i.customId == 'back' || i.customId == 'forward') {
                  index = i.customId == 'back' ? index - MAX_ITEMS_ON_PAGE : index + MAX_ITEMS_ON_PAGE;
                  reloadNeeded = false;
               } else {
                  currentButton = i.customId;
                  currentMenu = getDefaultMenuForButton(currentButton);
                  index = 0;
                  reloadNeeded = true;
               }
            } else if (i.isStringSelectMenu()) {
               if (i.customId === 'menu') {
                  currentMenu = i.values[0];
                  reloadNeeded = true;
               }
            }

            if (reloadNeeded)
               await loadData(userData, currentMenu, message);

            await i.update({ embeds: generateMessageEmbed(currentButton, currentMenu, userData, index), components: generateComponents(currentButton, currentMenu, index) });
         });

         collector.on('end', async i => {
            // CG.cdFinishTask(message);

            embedMessage.edit({ content: `The profile browser has been closed.`, components: [] });
            embedMessage.suppressEmbeds(true);
         });
      } catch (e) {
         console.log(e);
         C.dcRespondToMsg(message, e);
      }
   },
}


//-------------------------VARIABLES-------------------------
let currentDataLength = 0;
const MAX_ITEMS_ON_PAGE = 5;

const MAIN_BUTTON1 = new CL_IN.ButtonData('character', 'Character', '', 'success');
const MAIN_BUTTON2 = new CL_IN.ButtonData('inventory', 'Inventory', '', 'success');
const MAIN_BUTTON3 = new CL_IN.ButtonData('records', 'Records', '', 'success');

const MENU1_ITEM_1 = new CL_IN.SelectOptionData('info', 'Info', '📋');
const MENU1_ITEM_2 = new CL_IN.SelectOptionData('currencies', 'Currencies', '💰');

const MENU2_ITEM_1 = new CL_IN.SelectOptionData('invFishes', 'Fishes', '🐟');

const MENU3_ITEM_1 = new CL_IN.SelectOptionData('recFishing', 'Fishing', '🐟');

//-------------------------DATA-------------------------
async function loadData(userData, menu, message) {
   switch (menu) {
      case MENU1_ITEM_1.value:
      case MENU1_ITEM_2.value:
         userData.profile = await CG.getMessageAuthorProfile(message);
         break;

      case MENU2_ITEM_1.value:
      case MENU3_ITEM_1.value:
         userData.fishing = await CG.getFishingDocById(message, userData.profile.ownerId);
         break;
   }
}

//-------------------------MENU-------------------------
function generateComponents(button, menu, index) {
   const menuItems = [];

   if (hasPagination(menu))
      menuItems.push(generatePaginationButtons(index));

   menuItems.push(generateMainButtons());
   menuItems.push(generateMenu(button));

   return menuItems;
}

function generateMainButtons() {
   const characterButton = C.dcCreateButton(MAIN_BUTTON1.id, MAIN_BUTTON1.label, '', MAIN_BUTTON1.style);
   //const inventoryButton = C.dcCreateButton(MAIN_BUTTON2.id, MAIN_BUTTON2.label, '', MAIN_BUTTON2.style);
   //const recordsButton = C.dcCreateButton(MAIN_BUTTON3.id, MAIN_BUTTON3.label, '', MAIN_BUTTON3.style);

   //return C.dcCreateRow([characterButton, inventoryButton, recordsButton]);
   return C.dcCreateRow([characterButton]);
}

function getDefaultMenuForButton(buttonId) {
   switch (buttonId) {
      case MAIN_BUTTON1.id:
         return MENU1_ITEM_1.value;
      case MAIN_BUTTON2.id:
         return MENU2_ITEM_1.value;
      case MAIN_BUTTON3.id:
         return MENU3_ITEM_1.value;
   }
}

function hasPagination(menuName) {
   const menusWithPages = [
      MENU2_ITEM_1.value,
      MENU3_ITEM_1.value
   ];

   return C.strCheckIfAnyMatch(menuName, menusWithPages);
}

function generatePaginationButtons(index) {
   const backButton = C.dcCreateButton('back', 'Previous', '⬅️', 'primary', index == 0);
   const forwardButton = C.dcCreateButton('forward', 'Next', '➡️', 'primary', index + MAX_ITEMS_ON_PAGE >= currentDataLength);

   return C.dcCreateRow([backButton, forwardButton]);
}

function generateMenu(buttonId) {
   const menuArray = [];

   switch (buttonId) {
      case MAIN_BUTTON1.id:
         menuArray.push({ label: MENU1_ITEM_1.label, value: MENU1_ITEM_1.value, emoji: MENU1_ITEM_1.emoji });
         menuArray.push({ label: MENU1_ITEM_2.label, value: MENU1_ITEM_2.value, emoji: MENU1_ITEM_2.emoji });
         break;
      case MAIN_BUTTON2.id:
         menuArray.push({ label: MENU2_ITEM_1.label, value: MENU2_ITEM_1.value, emoji: MENU2_ITEM_1.emoji });
         break;
      case MAIN_BUTTON3.id:
         menuArray.push({ label: MENU3_ITEM_1.label, value: MENU3_ITEM_1.value, emoji: MENU3_ITEM_1.emoji });
         break;
   }

   return C.dcCreateRow(C.dcCreateSelectMenu('menu', 'Select the information to display', menuArray));
}


//-------------------------EMBED-------------------------
function generateMessageEmbed(button, menu, userData, index) {
   const image = generateEmbedImage(menu);
   const thumbnailImage = generateThumbnailImage(userData, menu);

   const embed = new D.EmbedBuilder()
      .setTitle(generateEmbedTitle(menu, userData))
      .setDescription(generateEmbedContent(menu, userData, index))
      .setAuthor({ name: userData.profile.ownerName, iconURL: 'https://i.pinimg.com/564x/37/8d/12/378d129d35c7c2a8d4d5e76c94660036.jpg'});

   if (image)
      embed.setImage(image);

   if (thumbnailImage)
      embed.setThumbnail(thumbnailImage);

   return [embed];
}

function generateEmbedImage(menu) {
   switch (menu) {
      case MENU1_ITEM_1.value:
         return 'https://i.imgur.com/iSpEc6r.png';

      default:
         return '';
   }
}

function generateThumbnailImage(userData, menu) {
   switch (menu) {
      case MENU1_ITEM_1.value:
         return userData.profile.picture;

      default:
         return '';
   }
}

function generateEmbedTitle(menu, userData) {
   const ln = '---------------';

   switch (menu) {
      case MENU1_ITEM_1.value:
         return ln + ' Profile ' + ln;

      case MENU1_ITEM_2.value:
         return ln + ' Currencies ' + ln;

      case MENU2_ITEM_1.value:
         return ln + ' Fishes ' + ln;

      case MENU3_ITEM_1.value:
         return ln + ' Fishing records ' + ln;
   }
}

function generateEmbedContent(menu, userData, index) {
   switch (menu) {
      case MENU1_ITEM_1.value:
         return getInfoCharacter(userData.profile);

      case MENU1_ITEM_2.value:
         return getInfoCurrencies(userData.profile);

      case MENU2_ITEM_1.value:
         return getInventoryFishes(userData.fishing.fish, index);

      case MENU3_ITEM_1.value:
         return getRecordsFishing(userData.fishing.records, index);
   }
}

//-------------------------CONTENT-------------------------
function getInfoCharacter(profile) {
   return `**Tag**: ${profile.ownerTag}\n` +
          `**Id**: ${profile.ownerId}\n` +
          `**Action Points**: ${profile.actionPoints?.current}`;
}

function getInfoCurrencies(profile) {
   const currencies = profile.currencies;

   return `**Amber Drops:** ${currencies.amberDrops}\n` +
          `**Pearl Flakes:** ${currencies.pearlFlakes}\n` +
          `**Obsidian Chips:** ${currencies.obsidianChips}\n` +
          `**Silver Coin:** ${currencies.silverCoins}\n` +
          `**Gold Coins:** ${currencies.goldCoins}\n` +
          `**Deltrada Coins:** ${currencies.deltradaCoins}`;
}

function getInventoryFishes(fishes, startingIndex) {
   currentDataLength = fishes.length;

   let result = ``;
   const possibleMaxIndex = startingIndex + MAX_ITEMS_ON_PAGE;
   const maxIndex = currentDataLength <= possibleMaxIndex ? currentDataLength : possibleMaxIndex;

   for (let i = startingIndex; i < maxIndex; i++) {
      result += `**${i}. ${FIS.getFishNameById(fishes[i].id)}**\n` +
                `${C.getFullKgToImperial(fishes[i].weight)}\n\n`;
   }

   return result;
}

function getRecordsFishing(fishingRecords, startingIndex) {
   currentDataLength = fishingRecords.length;

   let result = ``;
   const possibleMaxIndex = startingIndex + MAX_ITEMS_ON_PAGE;
   const maxIndex = currentDataLength <= possibleMaxIndex ? currentDataLength : possibleMaxIndex;

   for (let i = startingIndex; i < maxIndex; i++) {
      result += `**${i}. ${FIS.getFishNameById(fishingRecords[i].id)}**\n` +
                `${C.getFullKgToImperial(fishingRecords[i].weight)}\n\n`;
   }

   return result;
}