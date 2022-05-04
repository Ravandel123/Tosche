const D = require('discord.js');
const C = require('../../modules/common.js');
const BWD = require('../../modules/arraysBWD.js');

module.exports = {
   name: 'comic',
   description: 'Shows BtWD comic.',
   usage: '',
   example: '',
   async execute(message, args) {
      let chapter = `prologue`;
      let page = 0;

      const embedMessage = await message.channel.send({
         embeds: generatePageEmbed(chapter, page),
         components: createPageMovementRow(chapter, page)
      });

      const collector = embedMessage.createMessageComponentCollector();
      collector.on('collect', async i => {
         if (i.isButton()) {
            i.customId === 'backId' ? page-- : page++;
         } else if (i.isSelectMenu()) {
            if (i.customId === 'chapterId') {
               chapter = i.values[0];
               page = 0;
            } else
               page = parseInt(i.values[0]);
         }

         await i.update({ embeds: generatePageEmbed(chapter, page), components: createPageMovementRow(chapter, page) });
      });
   },
}

function generatePageEmbed(chapter, page) {
   return [new D.MessageEmbed()
      .setTitle(`${BWD[chapter].name}: ${page == 0 ? 'Title' : 'Page ' + page}`)
      .setImage(BWD[chapter].pages[page])];
}

function createPageMovementRow(chapter, page) {
   const backButton = new D.MessageButton()
      .setCustomId(`backId`)
      .setLabel(`Previous`)
      .setEmoji(`⬅️`)
      .setStyle(`PRIMARY`)
      .setDisabled(page == 0);

   const forwardButton = new D.MessageButton()
      .setCustomId(`forwardId`)
      .setLabel(`Next`)
      .setEmoji(`➡️`)
      .setStyle(`PRIMARY`)
      .setDisabled(page == BWD[chapter].pages.length - 1);

   const chapterMenu = [new D.MessageSelectMenu()
      .setCustomId('chapterId')
      .setPlaceholder('Change chapter')
      .addOptions(generateChapterArray())];

   const chapterPage = [new D.MessageSelectMenu()
      .setCustomId('pageId')
      .setPlaceholder('Jump to a page')
      .addOptions(generatePageArray(chapter))];

   return [C.dcCreateRow([backButton, forwardButton]), C.dcCreateRow(chapterMenu), C.dcCreateRow(chapterPage)];
}

function generateChapterArray() {
   const chapterArray = [];

   for (const key in BWD)
      chapterArray.push({ label: BWD[key].name, value: key });

   return chapterArray;
}

function generatePageArray(chapter) {
   const pageArray = [];
   const chapterLength = BWD[chapter].pages.length;
   const jump = Math.ceil(chapterLength / 25);

   for (let i = 0; i < chapterLength; i += jump)
      pageArray.push({ label: i.toString(), value: i.toString() });

   return pageArray;
}
