const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const CG = require('../../modules/commonGuild.js');
const DSV = require('../../modules/dataServer.js');

module.exports = {
   name: 'jail',
   description: 'Jails a nasty troublemaker.',
   usage: '[name/discord ID]',
   example: 'Lanaar',
   execute(message, args) {
   //    const requiredArgs = [`who you want to jail`];
   //    if (!CC.checkArgsAmount(message, args, requiredArgs))
   //       return;

   //    const member = C.dcGetMessageAuthorAsMember(message);

   //    //Must be the server owner or a guard & can't be in prison
   //    if (!CG.checkIfServerOwner(message.author) && !C.dcCheckIfMemberHasRole(member, DSV.roleGuard)) {
   //       C.dcRespondToMsg(message, 'You are not a guard!');
   //       return;
   //    } else if (C.dcCheckIfMemberHasRole(member, DSV.rolePrisoner)) {
   //       C.dcRespondToMsg(message, `You can't do that! You are in prison!`);
   //       return;
   //    }

   //    const targetedMember = C.getMemberByNameOrMention(message, args[1]);
      



   //    if (!C.dcCheckIfMemberHasRole(member, DSV.roleGuard) && !C.dcCheckIfMemberHasRole(member, DSV.rolePrisoner)) {
   //       C.dcRespondToMsg(message, 'You are not a prisoner!');
   //    } else {
   //       if (C.chance(25)) {
   //          C.dcAddRoleToMember(member, 'Comrade');
   //          C.dcRemoveRoleFromMember(member, 'Prisoner');
   //          C.dcRespondToMsg(message, 'Unbelivable! You have escaped!');
   //       } else {
   //          C.dcRespondToMsg(message, 'Did you really think that you would escape?! Not this time!');
   //       }
   //    }
   },
}