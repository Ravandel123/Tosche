const D = require('discord.js');
const C = require('../../modules/common.js');
const BWD = require('../../modules/dataBWD.js');

module.exports = {
   name: 'comic',
   description: 'Shows BtWD comic.',
   usage: '',
   example: '',
   async execute(message, args) {
      let chapter = 'prologue';
      let page = 0;

      const embedMessage = await message.channel.send({
         embeds: generatePageEmbed(chapter, page),
         components: generatePageMovementRow(chapter, page)
      });

      const collector = embedMessage.createMessageComponentCollector({ time: 3600000 });
      collector.on('collect', async i => {
         if (i.isButton()) {
            switch(i.customId) {
               case 'back':
                  page--;
                  break;
               case 'forward':
                  page++;
                  break;
               case 'random':
                  chapter = Object.keys(BWD)[C.rnd(Object.keys(BWD).length - 1)];
                  page =  C.rnd(BWD[chapter].pages.length - 1);
                  break;
               default:
                  break;
            }
         } else if (i.isStringSelectMenu()) {
            if (i.customId === 'chapterId') {
               chapter = i.values[0];
               page = 0;
            } else {
               page = parseInt(i.values[0]);
            }
         }

         await i.update({ embeds: generatePageEmbed(chapter, page), components: generatePageMovementRow(chapter, page) });
      });

      collector.on('end', async i => {
         embedMessage.edit({ content: `The comic browser has been closed.`, components: [] });
         embedMessage.suppressEmbeds(true);
      });
   },
}

function generatePageEmbed(chapter, page) {
   return [new D.EmbedBuilder()
      .setTitle(`${BWD[chapter].name}: ${page == 0 ? 'Title' : 'Page ' + page}`)
      .setURL(generatePageUrl(chapter, page))
      .setImage(BWD[chapter].pages[page])];
}

function generatePageMovementRow(chapter, page) {
   const randomButton = C.dcCreateButton('random', '', '🎲', 'danger');
   const backButton = C.dcCreateButton('back', 'Previous', '⬅️', 'primary', page == 0);
   const forwardButton = C.dcCreateButton('forward', 'Next', '➡️', 'primary', page == BWD[chapter].pages.length - 1);
   const chapterMenu = C.dcCreateSelectMenu('chapterId', 'Change chapter', generateChapterArray());
   const pageMenu = C.dcCreateSelectMenu('pageId', 'Jump to a page', generatePageArray(chapter));

   return [C.dcCreateRow([backButton, randomButton, forwardButton]), C.dcCreateRow(chapterMenu), C.dcCreateRow(pageMenu)];
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

function generatePageUrl(chapter, page) {
   const baseUrl = `https://www.westerndeep.net/comic/`;
   const chapterUrl = BWD[chapter].exceptions.get(page) ?? BWD[chapter].regularUrl + page;

   return baseUrl + chapterUrl;
}