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
      //Initial Check
      if (!C.cdCheckIfTaskCanBeAssigned(message, message.author.id))
         return;

      const profile = await CG.getMessageAuthorProfile(message);
      if (!CM.canTakeAction(user1.profile, message))
         return;

      //Main
      const fishingThread = await getOrCreateFishingThread(message);
      if (fishingThread)
         await startFishing(message, fishingThread);
   },
}

async function getOrCreateFishingThread(message) {
   //Check if you are already on the fishing channel/thread
   if (FIS.checkIfThreadIsFishingSpot(message.channel))
      return Promise.resolve(message.channel);

   //Check if you can fish on this channel
   let replyMsg, fishingThread;
   const spots = FIS.getFishingSpotsForArea(message.channel.name);

   if (C.arrCheckIfNotEmpty(spots)) {
      const buttonSpots = C.convertByFunction(spots, e => C.dcCreateButton(e.name, C.strCapitalizeFirstLetter(e.name)));
      const rowSpots = C.dcCreateRow(buttonSpots);

      replyMsg = await message.reply({ content: `Where would you like to fish?`, components: [rowSpots] });
   } else {
      const fishingAreas = FIS.getAllFishingLocations().join(`\n`);
      const msgContent = `**You can't fish here! Consider going to the following areas:**\n${fishingAreas}`;
      await message.reply({ content: msgContent, components: [] });
      return Promise.resolve(fishingThread);
   }

   const filter = i => i.user.id == message.author.id;
   const locationCollector = replyMsg.createMessageComponentCollector({ filter, componentType: D.ComponentType.Button, time: 10000 });
   C.cdAssignNewTask(message, message.author.id, true, locationCollector);

   locationCollector.on('collect', async i => {
      fishingThread = await C.dcGetCreateOrUnarchiveThread(message.channel, i.customId, C.dcGetMemberByID(message.guild, message.author.id));
      await i.update({ content: `Now go to the <#${fishingThread.id}>!`, components: [] });
      locationCollector.stop();
   });

   return new Promise(resolve => {
      locationCollector.on('end', async i => {
         C.cdFinishTask(message, message.author.id);

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

   const embed = [new D.EmbedBuilder()
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
   const fishingCollector = mainMessage.createMessageComponentCollector({ filter, componentType: D.ComponentType.Button});
   C.cdAssignNewTask(message, message.author.id, true, fishingCollector);
   
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
         await mainMessage.edit({ content: `There's something on the line! Quickly, reel in!`, components: [C.dcCreateRow([C.dcCreateButton('reelIn', `*Reel in*`)])] });
         await C.sleep(C.rndNo0(3));
         fishingCollector.stop();
      } else if (i.customId === 'reelIn') {
         fishCaught = true;
         await i.update({ content: `Congratulations <@!${message.author.id}>! You caught ${C.strAddArticle(fish.name, true)}! It weighs **${C.getFullKgToImperial(fish.data.weight)}**!`, components: [] });
         fishingCollector.stop();
      }
   });

   fishingCollector.on('end', async i => {
      C.cdFinishTask(message, message.author.id);

      if (i.size == 1) {
         mainMessage.edit({ content: R.fishCatchFailed(fishingSpot.name, fish), components: [] });
      } else {
         try {
            const result = await CG.addFishToMessageOwnerFishingDoc(message, fish.data);
            const member = C.dcGetMemberByID(message, result.previousRecordHolder);
            const response = R.fishRecord(result, fish, member?.displayName);

            if (response)
               thread.send(response);
         } catch(error) {
            C.dcRespondToMsg(mainMessage, error);
         }
      }
   });
}