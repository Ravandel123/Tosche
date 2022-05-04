const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const CG = require('../../modules/commonGuild.js');
const DB = require('../../modules/db.js');

module.exports = {
   name: 'sendpolcanthugs',
   description: 'Sends polcan thugs.',
   usage: '[user]',
   example: '',
   async execute(message, args) {
      if (!message.client.data.smackdownSpire.fightInProgress) {
         message.client.data.smackdownSpire.fightInProgress = true;
         
         try {
            let msg;
            const user1 = await CG.getMemberProfile(message, args[1]);
            await duel(message, user1);
         } catch(error) {
            C.dcRespondToMsg(message, error);
         }
         
         message.client.data.smackdownSpire.fightInProgress = false;
      } else {
         C.dcRespondToMsg(message, `The fight is already on! Wait until it is over.`);
      }
   },
}

async function duel(message, user1) {
   const user1Name = user1.ownerName;
   const p1 = `Little polcan thug`;
   const p2 = `Big polcan thug`;
   const p3 = `Huge polcan thug`;

   let msg, roll1, roll2, dmg, agressor, defender, winner;
   let hp1 = user1.ownerId == '392728479696814092' ? 1000000 : 100;
   let hpPolcan1 = 50;
   let hpPolcan2 = 120;
   let hpPolcan3 = 150;

   const smackdownSpireChannel = C.dcGetChannelByName(message.guild, 'smackdown-spire');

   msg = `---------------------------------------------------------------------------------------------\n` + 
         `**${user1Name}** get ready for some beating!`;

   C.dcSendMsgToChannel(smackdownSpireChannel, msg);
   await C.sleep(0.5);
   C.dcSendMsgToChannel(smackdownSpireChannel, C.arrGetRandom(arrayStartGif));
   await C.sleep(0.5);
   C.dcSendMsgToChannel(smackdownSpireChannel, `-----------------------------------------------------------`);
   await C.sleep(2);

   do {
      for (let i = 0; i < 3; i++) {
         if (hp1 <= 0) {
            break;
         } else if (i == 0 && hpPolcan1 > 0) {
            dmg = C.rndNo0(10);
            user2Name = p1;
            hp2 = hpPolcan1;
         } else if (i == 1 && hpPolcan2 > 0) {
            dmg = C.rndNo0(25);
            user2Name = p2;
            hp2 = hpPolcan2;
         } else if (hpPolcan3 > 0) {
            dmg = C.rndNo0(50);
            user2Name = p3;
            hp2 = hpPolcan3;
         } else if (hpPolcan1 > 0 || hpPolcan2 > 0 || hpPolcan3 > 0) {
            continue;
         } else {
            break;
         }

         roll1 = C.rndNo0(100);
         roll2 = C.rndNo0(100);

         if (roll1 == roll2)
            continue;

         if (roll1 > roll2) {
            dmg = user1.ownerId == '392728479696814092' ? C.rndNo0(100) : C.rndNo0(20);
            hp2 -= dmg;
            agressor = user1Name;
            defender = user2Name;
         } else {
            hp1 -= dmg;
            agressor = user2Name;
            defender = user1Name;
         }

         msg = `**${agressor}** ${C.arrGetRandom(arrayMoves)} **${C.strAddEndingApostrophe(defender)}** ${C.arrGetRandom(arrayPlacesToHit)} for ${dmg} damage!\n` +
               `**${C.strAddEndingApostrophe(user1Name)}** HP: ${hp1}\n` +
               `**${C.strAddEndingApostrophe(user2Name)}** HP: ${hp2}\n` +
               `-----------------------------------------------------------`;

         C.dcSendMsgToChannel(smackdownSpireChannel, msg);
         if (user2Name == p1) {
            hpPolcan1 = hp2;
         } else if (user2Name == p2) {
            hpPolcan2 = hp2;
         } else if (user2Name == p3) {
            hpPolcan3 = hp2;
         }
         await C.sleep(2);
      }
   } while (hp1 > 0 && (hpPolcan1 > 0 || hpPolcan2 > 0 || hpPolcan3 > 0));

   if (hp1 > 0)
      C.dcSendMsgToChannel(smackdownSpireChannel, `Incredible! **${user1Name}** has defeated the polcan thugs!`);
   else
      C.dcSendMsgToChannel(smackdownSpireChannel, `The polcan thugs have taught **${user1Name}** a lesson!`);

   C.dcSendMsgToChannel(smackdownSpireChannel, C.arrGetRandom(arrayFinalGif));
}

const arrayMoves = [
   'hit',
   'kicked',
   'punched',
   'smashed'
];

const arrayPlacesToHit = [
   'arm',
   'chest',
   'guts',
   'head',
   'knee',
   'leg'
];

const arrayStartGif = [
   `https://tenor.com/view/ferret-pets-gif-11182280`
];

const arrayFinalGif = [
   `https://tenor.com/view/ferret-stare-licking-lips-smell-check-gif-21267159`
];