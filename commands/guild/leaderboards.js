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
			.setTitle('My Modal');
		// Add components to modal
		// Create the text input components
		const favoriteColorInput = new D.TextInputComponent()
			.setCustomId('favoriteColorInput')
		    // The label is the prompt the user sees for this input
			.setLabel("What's your favorite color?")
		    // Short means only a single line of text
			.setStyle('SHORT');
		const hobbiesInput = new D.TextInputComponent()
			.setCustomId('hobbiesInput')
			.setLabel("What's some of your favorite hobbies?")
		    // Paragraph means multiple lines of text.
			.setStyle('PARAGRAPH');
		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new D.MessageActionRow().addComponents(favoriteColorInput);
		const secondActionRow = new D.MessageActionRow().addComponents(hobbiesInput);
		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);
		// Show the modal to the user
		

   
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


      const collector = embedMessage.createMessageComponentCollector({ componentType: 'BUTTON' });
      collector.on('collect', async i => {
         if (i.user.id != message.author.id) {
            await i.reply({ content: `Only the person who ran the command can use this menu!`, ephemeral: true });
            return;
         }

         await i.showModal(modal);

         // await i.update({ embeds: generatePageEmbed(user.profile, currentMenu), components: generateMenu() });
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