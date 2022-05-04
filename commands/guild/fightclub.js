const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const CG = require('../../modules/commonGuild.js');
const DB = require('../../modules/db.js');

module.exports = {
   name: 'fightclub',
   description: 'Used to access Fight Club.',
   usage: '[join]\nOR [duel] [user]',
   example: '',
   async execute(message, args) {
      const requiredArgs = [`action (i.e. duel)`];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      if (C.strCompare(args[1], 'duel')) {
         if (!message.client.data.arena.fightInProgress) {
            const requiredDuelArgs = [`action (i.e. duel)`, `user name`];
            if (!CC.checkArgsAmount(message, args, requiredDuelArgs))
               return;

            const userID = CC.getUserFromNameOrMention(message, args[2]);
            if (!userID)
               return;

            message.client.data.arena.fightInProgress = true;
            try {
               let msg;
               const user1 = await DB.gGetMsgAuthorProfile(message);
               const user2 = await DB.gGetProfileById(message, userID);
               await duel(message, user1, user2);
            } catch (error) {
               C.dcRespondToMsg(message, error);
            }
            message.client.data.arena.fightInProgress = false;
         } else {
            C.dcRespondToMsg(message, `The fight is already on! Wait until it is over.`);
         }
      } else {
         C.dcRespondToMsg(message, `There is no fight club action called ${args[1]}.`);
      }
   },
}

async function duel(message, user1, user2) {
   const user1Name = user1.ownerName;
   const user2Name = user2.ownerName;
   const user1Attributes = user1.fightClub.attributes;
   const user2Attributes = user2.fightClub.attributes;

   if (C.strCompare(user1.ownerId, user2.ownerId)) {
      C.dcRespondToMsg(message, `You can't fight with yourself!`);
      return;
   }

   let msg, roll1, roll2, dmg, agressor, defender, winner;
   let hp1 = user1.ownerId == '392728479696814092' ? 1000000 : 100; //user1Attributes.hp;
   let hp2 = user2.ownerId == '392728479696814092' ? 1000000 : 100; //user2Attributes.hp;
   const fightClubChannel = C.dcGetChannelByName(message.guild, 'fightclub');

   msg = `---------------------------------------------------------------------------------------------\n` + 
         `Get ready for the next fight! **${user1Name}** has challenged **${user2Name}** for a duel!`;

   C.dcSendMsgToChannel(fightClubChannel, msg);
   await C.sleep(0.5);
   C.dcSendMsgToChannel(fightClubChannel, C.arrGetRandom(arrayStartGif));
   await C.sleep(0.5);
   C.dcSendMsgToChannel(fightClubChannel, `-----------------------------------------------------------`);
   await C.sleep(3);

   do {
      roll1 = C.rndNo0(100);
      roll2 = C.rndNo0(100);

      if (roll1 == roll2)
         continue;

      dmg = C.rndNo0(20);

      if (roll1 > roll2) {
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

      C.dcSendMsgToChannel(fightClubChannel, msg);
      await C.sleep(2.5);
   } while (hp1 > 0 && hp2 > 0);

   winner = hp1 > hp2 ? user1Name : user2Name;
   C.dcSendMsgToChannel(fightClubChannel, `**${winner}** has won!`);
   C.dcSendMsgToChannel(fightClubChannel, C.arrGetRandom(arrayFinalGif));
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
   `https://tenor.com/view/hot-shots-charlie-sheen-pumped-up-gif-12092168`,
   `https://tenor.com/view/bring-it-on-mouse-cinderella-gus-gif-5410023`,
   `https://tenor.com/view/kick-box-king-face-exploded-hot-shots-hot-shots-kick-boxing-fight-gif-16757770`,
   `https://tenor.com/view/mad-angry-rage-ring-wrestling-gif-7783212`,
   `https://c.tenor.com/3dMsN2Syj0UAAAAC/bruce-lee-fight.gif`,
   `https://giphy.com/gifs/doge-dogecoin-fight-me-YBt4HbXaLt8GpN5xZ7`,
   `https://giphy.com/gifs/SkyTV-fight-me-abu-4WFEIrm9czxm8YclzW`,
   `https://giphy.com/gifs/mrparadise-roc-nation-mr-paradise-l44QoyDmxjK3jfH8c`,
   `https://giphy.com/gifs/yandel-roc-nation-3og0IJt3WawCxO8wCc`,
   `https://tenor.com/view/morpheus-matrix-fight-matrix-the-matrix-come-gif-22614532`
];

const arrayFinalGif = [
   `https://tenor.com/view/hotshots-fight-gif-10795291`,
   `https://tenor.com/view/ko-street-fighter-knock-out-gif-14130089`,
   `https://tenor.com/view/dean-winchester-punch-mad-angry-gif-13850258`,
   `https://tenor.com/view/bruce-lee-kick-burusu-li-burusu-ri-gif-5264759`,
   `https://tenor.com/view/the-three-stooges-moe-fighting-gif-13218733`,
   `https://tenor.com/view/hit-in-the-face-vi-arcane-smack-beat-up-gif-23854308`,
   `https://giphy.com/gifs/VVSFILMS-fight-mma-kick-YhHSjXadL2eOc3T2Ww`,
   `https://giphy.com/gifs/case-knockout-joshua-ou5FtFV6fwdk4`,
   `https://tenor.com/view/kick-ongbak-tonyjaa-stunt-fire-gif-7588037`,
   `https://media3.giphy.com/media/1JRyNx67X4IhYN94nb/giphy360p.mp4?cid=ecf05e47yn3ihfuhwa824hrpe3mu3zyhe9qu8e8tlxfia5wi&rid=giphy360p.mp4&ct=v`,
   `https://tenor.com/view/scottadkins-boyka-kick-gif-5443958`
];