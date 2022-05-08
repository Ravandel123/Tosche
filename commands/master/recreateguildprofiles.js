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
         profiles.push(CG.createNewGuildProfile(member[1]));

      const res = await SG.character.insertMany(profiles);
      console.log(res);
      
      
      
      // .then(function() {
          // C.dcRespondToMsg(message, `Profiles recreated successfully.`);
      // }).catch(function(error) {
          // C.dcRespondToMsg(message, error);
      // });
   }
}