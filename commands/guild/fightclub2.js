const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const CG = require('../../modules/commonGuild.js');
const DB = require('../../modules/db.js');
const CBT = require('../../modules/advanced/combat.js');

module.exports = {
   name: 'fightclub2',
   description: 'Used to access Fight Club.',
   usage: '[sparring/duel] [user]',
   example: '',
   async execute(message, args) {
      const requiredArgs = [`action (sparring, duel)`, `user name`];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      if (!message.client.data.fightClub.fightInProgress) {
         message.client.data.fightClub.fightInProgress = true;

         if (C.strCompare(args[1], 'sparring')) {
            try {
               let user1 = {};
               let user2 = {};

               user1.profile = await CG.getMessageAuthorProfile(message);
               user2.profile = await CG.getMemberProfile(message, args[2]);
               await sparring(message, user1, user2);
            } catch(error) {
               C.dcRespondToMsg(message, error);
            }

            message.client.data.fightClub.fightInProgress = false;
         } else {
            C.dcRespondToMsg(message, `There is no fight club action called ${args[1]}.`);
         }
      } else {
         C.dcRespondToMsg(message, `The fight is already on! Wait until it is over.`);
      }
   },
}

async function sparring(message, user1, user2) {
   if (C.strCompare(user1.ownerId, user2.ownerId)) {
      C.dcRespondToMsg(message, `You can't fight with yourself!`);
      return;
   }

   const fightClubChannel = C.dcGetChannelByName(message.guild, 'fight-club-2');
   if (!fightClubChannel) {
      C.dcRespondToMsg(message, `There is no place to fight!`);
      return;
   }

   msg = `---------------------------------------------------------------------------------------------\n` + 
         `Get ready for the next fight! **${user1.ownerName}** has challenged **${user2.ownerName}** for a sparring!`;

   C.dcSendMsgToChannel(fightClubChannel, msg);
   await C.sleep(0.5);
   C.dcSendMsgToChannel(fightClubChannel, C.arrGetRandom(arrayStartGif));
   await C.sleep(0.5);
   C.dcSendMsgToChannel(fightClubChannel, `-----------------------------------------------------------`);
   await C.sleep(3);

   //roll initiative //take stamina into account
   let attacker = user1;
   let defender = user2;

   do {
      const attackResult = CBT.combat(attacker, defender);
      let damage = -1;

      if (attackResult.attackSucceeded) {
         damage = CBT.calculateDamage(attackResult.SL, attacker, defender);
         defender.resources.hp -= damage;
      }

      msg = getCombatMsg(user1, user2, attacker, defender, damage);
      C.dcSendMsgToChannel(fightClubChannel, msg);
   } while (attacker.resources.hp > 0 && defender.resources.hp > 0);

   const winner = user1.resources.hp > user2.resources.hp ? user1 : user2;
   C.dcSendMsgToChannel(fightClubChannel, `**${winner}** has won!`);
   C.dcSendMsgToChannel(fightClubChannel, C.arrGetRandom(arrayFinalGif));
}

function getCombatMsg(user1, user2, attacker, defender, damage) {
   const hitLocation = CBT.getHitLocation();
   const moveName = C.arrGetRandom(arrayMoves);
   let msg;
   let showHP = false;


   if (damage > 0) {
      msg = `**${attacker.ownerName}** ${C.strGetPastTense(moveName)} **${C.strAddEndingApostrophe(defender.ownerName)}** ${hitLocation} for ${damage} damage!\n`;
      showHP = true;
   } else if (damage == 0) {
      msg = `**${attacker.ownerName}** ${C.strGetPastTense(moveName)} **${C.strAddEndingApostrophe(defender.ownerName)}** ${hitLocation} but caused no damage!\n`;
   } else {
      msg = `**${attacker.ownerName}** tried to ${moveName} **${C.strAddEndingApostrophe(defender.ownerName)}** ${hitLocation}, but missed!\n`;
   }

   if (showHP)
      msg += `**${C.strAddEndingApostrophe(user1.ownerName)}** HP: ${user1.resources.hp}\n` +
             `**${C.strAddEndingApostrophe(user2.ownerName)}** HP: ${user2.resources.hp}\n`;

   msg +=`-----------------------------------------------------------`;

   return msg;
}

const arrayMoves = [
   'hit',
   'kick',
   'punch',
   'smash'
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