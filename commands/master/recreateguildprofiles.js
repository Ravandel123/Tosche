const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');
const DB = ('../../modules/db.js');
const SG = require('../../modules/schematicsGuild.js');

module.exports = {
   name: 'recreateguildprofiles',
   description: 'Recreates guild profiles.',
   usage: '',
   example: '',
   async execute(message, args) {
      const guildMembers = C.dcGetAllMembers(message);
      const profiles = [];

      for (const member of guildMembers) {
         profiles.push();
         
         
         // try {
            // await CG.getProfileById(message, member[1].id);
         // } catch(error) {
            // C.dcRespondToMsg(message, error);
            // return;
         // }
      }
      
      await SG.character.insertMany(profiles).then(function() {
          C.dcRespondToMsg(message, `Profiles recreated successfully.`);
      }).catch(function(error) {
          console.log(error)      // Failure
      });

      // C.dcRespondToMsg(message, `Profiles recreated successfully.`);
   }
}