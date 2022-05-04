const C = require('../../modules/common.js');
const DB = require('../../modules/db.js');

module.exports = {
   name: 'recreateguildprofiles',
   description: 'Recreates guild profiles.',
   usage: '',
   example: '',
   async execute(message, args) {
      const guildMembers = C.dcGetAllMembers(message);

      for (const member of guildMembers) {
         try {
            await DB.gGetProfileById(message, member[1].id);
         } catch(error) {
            C.dcRespondToMsg(message, error);
            return;
         }
      }
      C.dcRespondToMsg(message, `Profiles recreated successfully.`);
   }
}