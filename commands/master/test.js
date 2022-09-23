const D = require('discord.js');
const C = require('../../modules/common.js');
const CL = require('../../modules/classes.js');
const CG = require('../../modules/commonGuild.js');
const CC = require('../../modules/commonCommands.js');
const DG = require('../../modules/dataGuild.js');
const G = require('../../modules/common.js');
const R = require('../../modules/responses.js');
const DB = require('../../modules/db.js');
const SG = require('../../modules/schematicsGuild.js');
const { v4: uuidv4 } = require('uuid');

module.exports = {
   name: 'test',
   description: 'Tests stuff.',
   usage: '',
   example: '',
   async execute(message, args) {


      // const memberData = CG.cdGetOrCreateMemberData(message.client, message.author.id);
      // memberData.transactionOpen = true;
      // await C.sleep(args[1]);
      // memberData.transactionOpen = false;
      
      
      
      const memberData = CG.cdGetOrCreateMemberData(message, message.author.id);
      const uuid1 = memberData.addId();
      const uuid2 = memberData.addId();

      testExecute(memberData, uuid1);
      testExecute(memberData, uuid2);


   },
}

async function testExecute(memberData, uuid) {

   while (!memberData.isFirst(uuid)) {
      console.log('waiting ' + uuid);
      await C.sleep(1);
   }
   
   console.log(`Weszlo z ${uuid}`);
   await C.sleep(3);
   console.log(`Wyszlo z ${uuid}`);
   if (memberData.removeIfFirst(uuid))
      console.log(`Task ${uuid} finished correctly`);
}