const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');
const SG = require('../../modules/schematicsGuild.js');

module.exports = {
   name: 'recreateguildprofiles',
   description: 'Recreates guild profiles.',
   usage: '',
   example: '',
   async execute(message, args) {
      const guildMembers = C.dcGetAllMembers(message);
      const profiles = [];

      for (const member of guildMembers)
         // profiles.push(CG.createNewGuildProfile(member[1]));
         profiles.push('x');


      SG.character.insertMany(profiles).then(function() {
          console.log("Data inserted")  // Success
      }).catch(function(error){
          console.log(error)      // Failure
      });

      // try {
         // await SG.character.insertMany(profiles);
         // C.dcRespondToMsg(message, `Profiles recreated successfully.`);
      // } catch(error) {
         // C.dcRespondToMsg(message, error);
      // }
   }
}