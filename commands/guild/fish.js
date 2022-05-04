const D = require('discord.js');
const C = require('../../modules/common.js');
const FIS = require('../../modules/advanced/fishing.js');
const R = require('../../modules/responses.js');

const CG = require('../../modules/commonGuild.js');

module.exports = {
   name: 'fish',
   description: 'Cast a fishing rod and focus.',
   usage: '',
   example: '',
   async execute(message, args) {
      const fishingThread = await getOrCreateFishingThread(message);
      if (fishingThread)
         await startFishing(message, fishingThread);
   },
}

async function getOrCreateFishingThread(message) {
   if (FIS.checkIfThreadIsFishingSpot(message.channel))
      return new Promise(resolve => { resolve(message.channel) });

   let replyMsg, fishingThread;
   const spots = FIS.getFishingSpotsForArea(message.channel.name);

   if (C.arrCheckIfNotEmpty(spots)) {
      const buttonSpots = C.convertByFunction(spots, e => C.dcCreateButton(e.name, C.strCapitalizeFirstLetter(e.name)));
      const rowLocations = C.dcCreateRow(buttonSpots);

      replyMsg = await message.reply({ content: `Where would you like to fish?`, components: [rowLocations] });
   } else {
      const fishingAreas = FIS.getAllFishingLocations().join(`\n`);
      const msgContent = `**You can't fish here! Consider going to the following areas:**\n${fishingAreas}`;
      await message.reply({ content: msgContent, components: [] });
      return new Promise(resolve => { resolve(fishingThread) });
   }

   const filter = i => i.user.id == message.author.id;
   const locationCollector = replyMsg.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 10000 });
   locationCollector.on('collect', async i => {
      fishingThread = await C.dcGetCreateOrUnarchiveThread(message.channel, i.customId, C.dcGetMemberByID(message.guild, message.author.id));
      await i.update({ content: `Now go to the <#${fishingThread.id}>!`, components: [] });
      locationCollector.stop();
   });

   return new Promise(resolve => {
      locationCollector.on('end', async i => {
         if (i.size == 0)
            replyMsg.edit({ content: `It looks you are not interesting in fishing...`, components: [] });

         resolve(fishingThread);
      });
   });
}

async function startFishing(message, thread) {
   const fishingSpot = FIS.getFishingSpotFromThread(thread);
   if (!fishingSpot)
      return;

   const embed = [new D.MessageEmbed()
      .setImage(fishingSpot.img)
      ];
   await thread.send({ embeds: embed});

   let msgContent = `Are you read to start fishing <@!${message.author.id}>?`;
   const startButtons = [C.dcCreateButton('start', `*Cast your fishing rod*`)];
   const rowStart = C.dcCreateRow(startButtons);
   const mainMessage = await thread.send({ content: msgContent, components: [rowStart] });

   const fish = FIS.generateRandomFishFromSpot(fishingSpot);
   if (!fish)
      return;

   let fishCaught = false;

   const filter = i => i.user.id == message.author.id;
   const fishingCollector = mainMessage.createMessageComponentCollector({ filter, componentType: 'BUTTON'});
   fishingCollector.on('collect', async i => {
      if (i.customId === 'start') {
         msgContent = `You cast your fishing rod, and wait`;
         await i.update({ content: msgContent, components: [] });

         for (let t = 0; t < C.rndNo0(7); t++) {
            if (fishCaught)
               return;

            msgContent += `.`;
            await i.editReply({ content: msgContent , components: [] });
            await C.sleep(1);
         }
         await mainMessage.edit({ content: `There's something on the line! Quickly, reel in!` , components: [C.dcCreateRow([C.dcCreateButton('reelIn', `*Reel in*`)])] });
         await C.sleep(C.rndNo0(3));
         fishingCollector.stop();
      } else if (i.customId === 'reelIn') {
         fishCaught = true;
         await i.update({ content: `Congratulations <@!${message.author.id}>! You caught ${C.strAddArticle(fish.name)}! It weights ${fish.weight} kg (${C.calcKgToImperial(fish.weight)})!`, components: [] });
         fishingCollector.stop();
      }
   });

   fishingCollector.on('end', async i => {
      if (i.size == 1)
         mainMessage.edit({ content: R.fishCatchFailed(fishingSpot.name, fish), components: [] });
   });
}