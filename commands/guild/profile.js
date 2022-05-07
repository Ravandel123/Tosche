const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');
const DB = require('../../modules/db.js');

module.exports = {
   name: 'profile',
   description: 'Used to access your Deltrada profile.',
   usage: '[user]',
   example: '',
   async execute(message, args) {
      let userProfile, msg;

      try {
         userProfile = C.checkIfExists(args[1]) ? await CG.getMemberProfile(message, args[1]) : await CG.getMessageAuthorProfile(message);
      } catch (error) {
         C.dcRespondToMsg(message, error);
         return;
      }

      if (userProfile)
         msg = CG.getUserInfo(userProfile, args[1]);
      else
         msg = `Oh no! There was an error while retrieving your profile!`;

      C.dcRespondToMsg(message, msg);
   },
}