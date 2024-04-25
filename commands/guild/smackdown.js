const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const CG = require('../../modules/commonGuild.js');
const CM = require('../../modules/commonMechanics.js');
const DB = require('../../modules/db.js');

module.exports = {
   name: 'smackdown',
   aliases: ['sd'],
   description: 'Used to call a smackdown spire command.',
   usage: '[sparring/duel] [user]',
   example: 'sparring Ravandel',
   async execute(message, args) {
      const requiredArgs = [`action (sparring, duel)`, `user name`];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      if (initialCheck(message, args[1])) {
         message.client.data.smackdownSpire.fightInProgress = true;

         try {
            let user1 = {};
            let user2 = {};

            user1.profile = await CG.getMessageAuthorProfile(message);
            user2.profile = await CG.getMemberProfile(message, args[2]);

            const smackdownSpireChannel = C.dcGetChannelByName(message.guild, 'smackdown-spire');

            if (additionalCheck(user1.profile, user2.profile, smackdownSpireChannel)) {
               switch (args[1].toLowerCase()) {
                  case 'sparring':
                     await sparring(user1.profile, user2.profile, smackdownSpireChannel);
                     break;

                  case 'duel': //trzeba sprawdzic raz jeszcze cdCheckIfTaskCanBeAssigned przy klikaniu buttona zeby sie nie sypnal jak ktos zwleka, jak przeciwnik kliknie buttona to robi assign new test
                     if (CG.cdCanAct(user1.profile, message) && CG.cdCanAct(user2.profile, message)) {
                        const challengeAccepted = await collectChoice(user2.profile.ownerId, user1.profile.ownerId, C.dcGetChannelByName(message.guild, 'fight-club2'));
                        if (challengeAccepted)
                           C.dcRespondToMsg(message, 'dziala');
                        else
                           C.dcRespondToMsg(message, 'nie dziala');
                        
                        // CG.cdAssignNewTask(message, undefined, false);
                        // CG.cdAssignNewTask(message, undefined, false);
                        // await duel(user1.profile, user2.profile, smackdownSpireChannel);
                        // CG.cdFinishTask(message);
                        // CG.cdFinishTask(message, user2.profile.ownerId);
                     }
                     break;
               }
            }
         } catch(error) {
            C.dcRespondToMsg(message, error);
         }

         message.client.data.smackdownSpire.fightInProgress = false;
      }
   },
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function initialCheck(message, command) {
   let msgContent = '';
   let result = true;

   if (message.client.data.smackdownSpire.fightInProgress) {
      msgContent = `The fight is already on! Wait until it is over.`;
      result = false;
   } else if (!C.strCheckIfAnyMatch(command, ['sparring', 'duel'])) {
      msgContent = `There is no smackdown action called ${command}.`;
      result = false;
   }

   if (msgContent)
      C.dcRespondToMsg(message, msgContent);

   return result;
}

//------------------------------------------------------------------------------------------------------------------
function additionalCheck(user1, user2, smackdownSpireChannel) {
   let msgContent = '';
   let result = true;

   if (!smackdownSpireChannel) {
      msgContent = `There is no place to fight!`;
      result = false;
   } else if (C.strCompare(user1.ownerId, user2.ownerId)) {
      msgContent = `You can't fight with yourself!`;
      result = false;
   }

   if (msgContent)
      C.dcRespondToMsg(message, msgContent);

   return result;
}

//------------------------------------------------------------------------------------------------------------------
async function collectChoice(targetId, challengerId, channel) {
   const msgContent = `<@!${targetId}>!\n<@!${challengerId}> has challenged you for a duel!`;
   const acceptButton = C.dcCreateButton('acceptId', 'Accept', '', 'success');
   const declineButton = C.dcCreateButton('declineId', 'Decline', '', 'danger');

   const buttons = [acceptButton, declineButton];
   const row = C.dcCreateRow(buttons);
   const mainMessage = await channel.send({ content: msgContent, components: [row] });

   let finalChoice = false;
   const filter = i => {
      if (i.user.id == targetId)
         return true;

      i.reply({ content: `That decision is not meant for you!`, ephemeral: true });
   }
   const choiceCollector = mainMessage.createMessageComponentCollector({filter, time: 10000});

   choiceCollector.on('collect', async i => {
      if (i.customId == 'acceptId') {
         finalChoice = true;
         await i.update({ content: `You have accepted the challenge!`, components: []});
      } else {
         await i.update({ content: `You rejected the challenge!`, components: []});
      }

      choiceCollector.stop();
   });

   return new Promise(resolve => {
      choiceCollector.on('end', async i => {
         if (i.size == 0)
            mainMessage.edit({ content: `It looks you are not interesting in the challenge...`, components: [] });

         resolve(finalChoice);
      });
   });
}

//------------------------------------------------------------------------------------------------------------------
async function sparring(profile1, profile2, smackdownSpireChannel) {
   profile1.resources.health = CM.getMaxHp(profile1);
   profile2.resources.health = CM.getMaxHp(profile2);

   await fight(profile1, profile2, smackdownSpireChannel, 'sparring');
}

//------------------------------------------------------------------------------------------------------------------
async function duel(profile1, profile2, smackdownSpireChannel) {
   await fight(profile1, profile2, smackdownSpireChannel, 'duel');

   CM.modifyActionPoints(profile1, -1);
   CM.modifyActionPoints(profile2, -1);

   await profile1.save();
   await profile2.save();
}

//------------------------------------------------------------------------------------------------------------------
async function fight(profile1, profile2, smackdownSpireChannel, modeName) {
   let msg = `---------------------------------------------------------------------------------------------\n` + 
         `Get ready for the next fight! **${profile1.ownerName}** has challenged **${profile2.ownerName}** for a ${modeName}!`;

   C.dcSendMsgToChannel(smackdownSpireChannel, msg);
   await C.sleep(0.5);
   C.dcSendMsgToChannel(smackdownSpireChannel, C.arrGetRandom(arrayStartGif));
   await C.sleep(0.5);
   C.dcSendMsgToChannel(smackdownSpireChannel, `-----------------------------------------------------------`);
   await C.sleep(3);

   //roll initiative //take stamina into account
   let attacker;
   let defender;

   if (C.chance(50)) {
      attacker = profile1;
      defender = profile2;
   } else {
      attacker = profile2;
      defender = profile1;
   }

   do {
      const attackResult = CM.combat(attacker, defender);
      let damage = -1;

      if (attackResult.wasSuccessful) {
         damage = CM.calculateDamage(attackResult.SL, attacker, defender);
         defender.resources.health -= damage;
      }

      msg = getCombatMsg(profile1, profile2, attacker, defender, damage);
      C.dcSendMsgToChannel(smackdownSpireChannel, msg);

      const tmp = defender;
      defender = attacker;
      attacker = tmp;

      await C.sleep(1.5);
   } while (attacker.resources.health > 0 && defender.resources.health > 0);

   const winner = profile1.resources.health > profile2.resources.health ? profile1 : profile2;
   C.dcSendMsgToChannel(smackdownSpireChannel, `**${winner.ownerName}** has won!`);
   C.dcSendMsgToChannel(smackdownSpireChannel, C.arrGetRandom(arrayFinalGif));
}

//------------------------------------------------------------------------------------------------------------------
function getCombatMsg(profile1, profile2, attacker, defender, damage) {
   const moveName = C.arrGetRandom(arrayMoves);
   const hitLocation = getMoreInterestingHitLocationName(CM.getHitLocation());
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
      msg += `**${C.strAddEndingApostrophe(profile1.ownerName)}** HP: ${profile1.resources.health}\n` +
             `**${C.strAddEndingApostrophe(profile2.ownerName)}** HP: ${profile2.resources.health}\n`;

   msg +=`-----------------------------------------------------------`;

   return msg;
}

//------------------------------------------------------------------------------------------------------------------
function getMoreInterestingHitLocationName(bodyPart) {
   switch (bodyPart) {
      case 'head':
         return C.arrGetRandom(['head', 'face', 'jaw', 'nose', 'snout']);

      case 'torso':
         return C.arrGetRandom(['thorax', 'torso', 'midsection', 'flank']);

      case 'primary arm':
      case 'secondary arm':
         return C.arrGetRandom(['hand', 'arm', 'elbow', 'wrist']);

      case 'right leg':
      case 'left leg':
         return C.arrGetRandom(['foot', 'shin', 'knee', 'hip', 'ankle']);
   }
}


const arrayMoves = [
   'bash', 'boot',
   'hit',
   'kick',
   'pound', 'pummel', 'punch',
   'slap', 'smack', 'smash', 'strike',
   'thump',
   'whack'
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
   `https://tenor.com/view/tekken7-tekken-dragunov-roast-roasted-gif-9144136`,
   `https://tenor.com/view/mortal-kombat-bring-it-ninja-gif-14796040`,
   `https://tenor.com/view/impressive-nice-take-this-kung-fu-furious-gif-11744617`,
   `https://tenor.com/view/ip-man-bow-thank-you-gif-25480985`,
   `https://tenor.com/view/spongebob-squarepants-fight-me-ready-to-fight-lets-fight-fight-gif-16248214`,
   `https://tenor.com/view/street-streetfighter-ryu-gif-5217654`,
   `https://tenor.com/view/mortal-kombat-mortal-kombat9-mortal-kombat2011-sub-zero-gif-21185320`,
   `https://tenor.com/view/thank-you-very-much-gif-20078420`,
   `https://media4.giphy.com/media/zY4kzuQh16OPu/giphy.gif?cid=ecf05e477ecu43j731mmt15row4vycy3wdcyse2iixs69kc9&rid=giphy.gif&ct=g`,
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
   `https://tenor.com/view/ip-man-scott-adkins-ip-man4-gif-18324465`,
   `https://tenor.com/view/kick-ongbak-tonyjaa-stunt-fire-gif-7588037`,
   `https://media3.giphy.com/media/1JRyNx67X4IhYN94nb/giphy360p.mp4?cid=ecf05e47yn3ihfuhwa824hrpe3mu3zyhe9qu8e8tlxfia5wi&rid=giphy360p.mp4&ct=v`,
   `https://tenor.com/view/scottadkins-boyka-kick-gif-5443958`,
   `https://tenor.com/view/karate-female-gif-18452002`,
   `https://tenor.com/view/adriano-celentano-adrian-la-volpe-kick-gif-15732060`,
   `https://tenor.com/view/yubi-furry-fursuit-knock-out-punch-gif-25027965`,
   `https://tenor.com/view/morgan-morgan-charrière-mma-fight-win-gif-14756789`,
   `https://tenor.com/view/adriano-celentano-adrian-la-volpe-kick-gif-15505088`,
   `https://tenor.com/view/face-smash-wall-hit-serious-man-gif-14519552`
];