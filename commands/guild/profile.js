const D = require('discord.js');
const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');

module.exports = {
   name: 'profile',
   description: 'Used to access your Deltrada profile.',
   usage: '[user]',
   example: '',
   async execute(message, args) {
      try {
         let userData = {};
         let embedContent;
         let currentButton = MAIN_BUTTON1.id;
         let currentMenu = MENU1_ITEM_1.value;
         let index = 0;

         userData.profile = C.checkIfExists(args[1]) ? await CG.getMemberProfile(message, args[1]) : await CG.getMessageAuthorProfile(message);
         embedContent = await generateMessageEmbed(currentButton, currentMenu, userData, index, message);

         const embedMessage = await message.channel.send({
            // embeds: generateMessageEmbed(currentButton, currentMenu, userData, index, message),
            embeds: embedContent,
            components: generateComponents(currentButton, currentMenu, index)
         });

         const collector = embedMessage.createMessageComponentCollector();
         collector.on('collect', async i => {
            if (i.user.id != message.author.id) {
               await i.reply({ content: `Only the person who ran the command can do that!`, ephemeral: true });
               return;
            }

            if (i.isButton()) {
               currentButton = i.customId;
               currentMenu = getDefaultMenuForButton(currentButton);
               index = 0;
            } else if (i.isSelectMenu()) {
               if (i.customId === 'menu')
                  currentMenu = i.values[0];
            }

            embedContent = await generateMessageEmbed(currentButton, currentMenu, userData, index, message);
            await i.update({ embeds: embedContent, components: generateComponents(currentButton, currentMenu, index) });
            // await i.update({ embeds: generateMessageEmbed(currentButton, currentMenu, userData, index, message), components: generateComponents(currentButton, currentMenu, index) });
         });
      } catch (e) {
         console.log(e);
         C.dcRespondToMsg(message, `An error occured while showing this profile!`);
      }
   },
}


//-------------------------CONST-------------------------
const MAX_ITEMS_ON_PAGE = 3;

const MAIN_BUTTON1 = new C.ButtonData('character', 'Character', '', 'SUCCESS');
const MAIN_BUTTON2 = new C.ButtonData('inventory', 'Inventory', '', 'SUCCESS');
const MAIN_BUTTON3 = new C.ButtonData('records', 'Records', '', 'SUCCESS');

const MENU1_ITEM_1 = new C.SelectOptionData('info', 'Info', '📋');
const MENU1_ITEM_2 = new C.SelectOptionData('currencies', 'Currencies', '💰');

const MENU2_ITEM_1 = new C.SelectOptionData('invFishes', 'Fishes', '🐟');

const MENU3_ITEM_1 = new C.SelectOptionData('recFishing', 'Fishing', '🐟');


//-------------------------MENU-------------------------
function generateComponents(button, menu, index) {
   const menuItems = [];

   if (hasPagination(menu))
      menuItems.push(generatePaginationButtons, index);

   menuItems.push(generateMainButtons());
   menuItems.push(generateMenu(button));

   return menuItems;
}

function generateMainButtons() {
   const characterButton = C.dcCreateButton(MAIN_BUTTON1.id, MAIN_BUTTON1.label, '', MAIN_BUTTON1.style);
   const inventoryButton = C.dcCreateButton(MAIN_BUTTON2.id, MAIN_BUTTON2.label, '', MAIN_BUTTON2.style);
   const recordsButton = C.dcCreateButton(MAIN_BUTTON3.id, MAIN_BUTTON3.label, '', MAIN_BUTTON3.style);

   return C.dcCreateRow([characterButton, inventoryButton, recordsButton]);
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
async function generateMessageEmbed(button, menu, userData, index, message) {
   const image = generateEmbedImage(menu);
   const thumbnailImage = generateThumbnailImage(userData, menu);

   const embedContent = await generateEmbedContent(menu, userData, index, message);
   const embed = new D.MessageEmbed()
      .setTitle(generateEmbedTitle(menu, userData))
      .setDescription(embedContent)
      // .setDescription(generateEmbedContent(menu, userData, index, message))
      .setAuthor({ name: userData.profile.ownerName, iconURL: 'https://i.pinimg.com/564x/37/8d/12/378d129d35c7c2a8d4d5e76c94660036.jpg' });

   if (image)
      embed.setImage(image);

   if (thumbnailImage)
      embed.setThumbnail(thumbnailImage);

   return Promise.resolve([embed]);
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

async function generateEmbedContent(menu, userData, index, message) {
   let result;

   switch (menu) {
      case MENU1_ITEM_1.value:
         result = getCharacterInfo(userData.profile);
         break;

      case MENU1_ITEM_2.value:
         result = getCurrenciesInfo(userData.profile);
         break;

      case MENU2_ITEM_1.value:
         result = getCharacterInfo(userData.profile);
         break;

      case MENU3_ITEM_1.value:
         if (!userData.fishing) {
            userData.fishing = await CG.getMessageAuthorFishingDoc(message);
            console.log("Wczytalo sie");
         }

         result = getCharacterInfo(userData.profile);
         // return getFishingRecordsInfo(userData, index);
   }

   return Promise.resolve(result);
}

//-------------------------CONTENT-------------------------
function getCharacterInfo(profile) {
   return `**Tag**: ${profile.ownerTag}\n` +
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

function getFishingRecordsInfo(fishingRecords, index) {
   
   
   // let result = ``;
   // const possibleMaxIndex = startingIndex + MAX_ITEMS_ON_PAGE;
   // const maxIndex = content.length <= possibleMaxIndex ? content.length : possibleMaxIndex;
   
   // for (let i = startingIndex; i < maxIndex; i++) {
      // result += `**${content[i].fishId}** 🐟 \n` +
                // `🥇 ${content[i].place1Id}: ${content[i].place1Weight} kg (${C.calcKgToImperial(content[i].place1Weight)})\n`;

      // if (content[i].place2Weight > 0)
         // result += `🥈 ${content[i].place2Id}: ${content[i].place2Weight} kg (${C.calcKgToImperial(content[i].place2Weight)})\n`;

      // if (content[i].place3Weight > 0)
         // result += `🥉 ${content[i].place3Id}: ${content[i].place3Weight} kg (${C.calcKgToImperial(content[i].place3Weight)})\n`;

      // result += `-----\n`;
   // }

   // return result;
}