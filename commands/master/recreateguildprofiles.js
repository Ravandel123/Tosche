const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');
const SG = require('../../modules/schematicsGuild.js');
const DB = require('../../modules/db.js');

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

      try {
         const result = await DB.insertMany(SG.profile, profiles);
         C.dcRespondToMsg(message, result);
      } catch(error) {
         C.dcRespondToMsg(message, error);
      }
   }
}