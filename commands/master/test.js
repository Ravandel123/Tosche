const D = require('discord.js');
const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');
const CC = require('../../modules/commonCommands.js');
const AG = require('../../modules/arraysGuild.js');
const G = require('../../modules/common.js');
const DB = require('../../modules/db.js');
const S = require('../../modules/guildSchematics.js');

module.exports = {
   name: 'test',
   description: 'Tests stuff.',
   usage: '',
   example: '',
   async execute(message, args) {

   const newFishing = new S.gFishing({
      ownerId: message.author.id
   });

   // profile.currencies = {
      // amberDrops : C.rndNo0(10),
      // pearlFlakes : C.rndNo0(10),
      // obsidianChips : C.rndNo0(10),
      // silverCoins : C.rndNo0(10),
      // goldCoins : C.rndNo0(10),
      // deltradaCoins : C.rndNo0(100),
   // }

   try {
      await newFishing.save().catch(err => console.log(err));
   } catch(error) {
      console.log(error)
   }

   console.log(newFishing);

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

