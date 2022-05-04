const C = require('../../modules/common.js');
const DSV = require('../../modules/dataServer.js');

module.exports = {
   name: 'prisonbreak',
   cooldown: 300,
   description: 'Attempt to escape from the prison.',
   usage: '',
   example: '',
   execute(message, args) {
      const cmdCaller = C.dcGetMessageAuthorAsMember(message);

      if (!C.dcCheckIfMemberHasRoles(cmdCaller, DSV.rolePrisoners)) {
         C.dcRespondToMsg(message, `What the... You are not a prisoner!`);
         return;
      }

      if (C.chance(25)) {
         C.dcRemoveRolesFromMember(cmdCaller, DSV.rolePrisoners);
         C.dcAddRolesToMember(cmdCaller, DSV.roleDefault);
         C.dcRespondToMsg(message, 'Unbelivable! You have escaped!');
      } else {
         C.dcRespondToMsg(message, 'Did you really think that you would escape?! Not this time!');
      }
   },
}