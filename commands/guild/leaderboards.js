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

      const modal = new D.Modal()
         .setCustomId('myModal')
         .setTitle('Therapy with Tosche');
      const categoryInput = new D.TextInputComponent()
         .setCustomId('categoryInput')
         .setLabel("What is the category of your problem?")
         .setStyle('SHORT');
      const explanationInput = new D.TextInputComponent()
         .setCustomId('explanationInput')
         .setLabel("Explain your problem.")
         .setStyle('PARAGRAPH');
      const firstActionRow = new D.MessageActionRow().addComponents(categoryInput);
      const secondActionRow = new D.MessageActionRow().addComponents(explanationInput);
      modal.addComponents(firstActionRow, secondActionRow);


      // let user = {};
      // let currentMenu = 'main';

      // try {
         // user.profile = C.checkIfExists(args[1]) ? await CG.getMemberProfile(message, args[1]) : await CG.getMessageAuthorProfile(message);
      // } catch(error) {
         // C.dcRespondToMsg(message, error);
         // return;
      // }

      const button1 = C.dcCreateButton('button1', 'choose color');
      const row = C.dcCreateRow(button1);
      const embedMessage = await message.channel.send({ content : "TEST", components: [row] });


      const collector = embedMessage.createMessageComponentCollector();
      collector.on('collect', async i => {
         if (i.user.id != message.author.id) {
            await i.reply({ content: `Only the person who ran the command can use this menu!`, ephemeral: true });
            return;
         }

         await i.deferUpdate();
         await i.showModal(modal);
         i.awaitModalSubmit({ time: 1500000 })
            .then(async i => {
               const favoriteColor = await i.fields.getTextInputValue('categoryInput');
               const hobbies = await i.fields.getTextInputValue('explanationInput');
               console.log(`${favoriteColor}: ${hobbies}`)
            })
            .catch(err => console.log(err));
      });
   },
}

// function generatePageEmbed(profile, menuItem) {
   // return [new D.MessageEmbed()
      // .setTitle(generatePageTitle(profile, menuItem))
      // .setDescription(generatePageContent(profile, menuItem))];
// }

// function generateMenu() {
   // const profilePage = [new D.MessageSelectMenu()
      // .setCustomId('menuId')
      // .setPlaceholder('Select the information to display')
      // .addOptions(generateMenuItems())];

   // return [C.dcCreateRow(profilePage)];
// }

// function generateMenuItems() {
   // const menuArray = [];
   // menuArray.push({ label: 'Main', value: 'main', emoji: '📋' });
   // menuArray.push({ label: 'Currencies', value: 'currencies', emoji: '💰' });

   // return menuArray;
// }

// -------------------------PAGES-------------------------
// function generatePageTitle(profile, menuItem) {
   // switch (menuItem) {
      // case 'main':
         // return `Profile of ${C.strBold(profile.ownerTag)}`;

      // case 'currencies':
         // return `Currencies of ${C.strBold(profile.ownerName)}`;
   // }
// }

// function generatePageContent(profile, menuItem) {
   // switch (menuItem) {
      // case 'main':
         // return getMainProfileInfo(profile);

      // case 'currencies':
         // return getCurrenciesInfo(profile);
   // }
// }

// function getMainProfileInfo(profile) {
   // return `**ID**: ${profile.ownerId}\n` +
          // `**Name**: ${profile.ownerName}\n` +
          // `**Action Points**: ${profile.actionPoints.current}`;
// }

// function getCurrenciesInfo(profile) {
   // const currencies = profile.currencies;

   // return `**Amber Drops:** ${currencies.amberDrops}\n` +
          // `**Pearl Flakes:** ${currencies.pearlFlakes}\n` +
          // `**Obsidian Chips:** ${currencies.obsidianChips}\n` +
          // `**Silver Coin:** ${currencies.silverCoins}\n` +
          // `**Gold Coins:** ${currencies.goldCoins}\n` +
          // `**Deltrada Coins:** ${currencies.deltradaCoins}`;
// }