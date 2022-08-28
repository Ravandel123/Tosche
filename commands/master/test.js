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

module.exports = {
   name: 'test',
   description: 'Tests stuff.',
   usage: '',
   example: '',
   async execute(message, args) {
      CG.profilesUpdate1h(message.guild, message.author.id);

   // let fishingProfile;

   // if (!args[1]) {
      // fishingProfile = new SG.fishing({
         // ownerId: message.author.id
      // });

      // try {
         // await fishingProfile.save().catch(err => console.log(err));
      // } catch(error) {
         // console.log(error)
      // }

   // } else {
      // fishingProfile = await SG.fishing.findOne({ ownerId: message.author.id });
      // fishingProfile.fish.push({
         // id: `fish_smallmouthBass`,
         // weight: C.rndNo0(10)
      // });
      // fishingProfile.records.push(fishingProfile.fish[0]);

      // fishingProfile.rod = { id: 'xd', condition: 2.15 };
   // }

   // try {
      // await fishingProfile.save().catch(err => console.log(err));
   // } catch(error) {
      // console.log(error)
   // }

   // console.log(fishingProfile);

   // ownerId: String,
   // rod: {
      // id: String,
      // condition: Number
   // },
   // bait: {
      // id: String,
      // amount: Number
   // },
   // records: [{
      // id: String,
      // weight: Number,
   // }],
   // fish: [{
      // id: String,
      // weight: Number,
   // }]





   },
}

