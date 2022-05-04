const C = require('../../modules/common.js');

module.exports = {
   name: 'prisonbreak',
   cooldown: 300,
   description: 'Attempt to escape from the prison.',
   usage: '',
   example: '',
   execute(message, args)
   {
      const member = C.dcGetMessageAuthorAsMember(message)

      if (!C.dcCheckIfMemberHasRole(member, 'Prisoner')) {
         C.dcRespondToMsg(message, 'You are not a prisoner!')
      } else {
         if (C.chance(25)) {
            C.dcAddRoleToMember(member, 'Comrade')
            C.dcRemoveRoleFromMember(member, 'Prisoner')
            C.dcRespondToMsg(message, 'Unbelivable! You have escaped!')
         } else {
            C.dcRespondToMsg(message, 'Did you really think that you would escape?! Not this time!')
         }
      }
   },
}