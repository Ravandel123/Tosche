const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');
const DB = require('../../modules/db.js');

module.exports = {
   name: 'profile',
   description: 'Used to access your Deltrada profile.',
   usage: '[currencies]',
   example: '',
   async execute(message, args) {
      let msg;
      const userProfile = await DB.gGetMsgAuthorProfile(message);

      if (userProfile)
         msg = CG.getUserInfo(userProfile, args[1]);
      else
         msg = `Oh no! There was an error while retrieving your profile!`;

      C.dcRespondToMsg(message, msg);
   },
}