const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');
const CG = require('../../modules/commonGuild.js');
const DSV = require('../../modules/dataServer.js');

module.exports = {
   name: 'jail',
   description: 'Jails a nasty troublemaker.',
   usage: '[user] [level of prison (1-3)]',
   example: 'Lanaar',
   execute(message, args) {
      const requiredArgs = [`who you want to jail`];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      const cmdCaller = C.dcGetMessageAuthorAsMember(message);

      //Must be the server owner or a guard & can't be in prison
      if (!CG.checkIfServerOwner(cmdCaller) && !C.dcCheckIfMemberHasRole(cmdCaller, DSV.roleGuard)) {
         C.dcRespondToMsg(message, 'Really pushing your luck, huh? Guards get the reins, not you!');
         return;
      } else if (C.dcCheckIfMemberHasRole(cmdCaller, DSV.rolePrisoners)) {
         C.dcRespondToMsg(message, `Attempting to jail someone while confined yourself? Looks like you're already behind those bars. Try again once you've earned your freedom!`);
         return;
      }

      const cmdTarget = C.getMemberByNameOrMention(message, args[1]);
      if (!cmdTarget) {
         return;
      }

      C.dcRemoveRoleFromMember(cmdTarget, DSV.roleDefault);
      C.dcAddRoleToMember(cmdTarget, DSV.rolePrisoner1);




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