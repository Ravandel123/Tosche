const MG = require('mongoose');

//---------------------------------------------------------------------------------------------------------------
const gProfileSchema = new MG.Schema({
   ownerId: String,
   ownerTag: String,
   ownerName: String,
   picture: String,
   actionPoints: {
      current: { type: Number, default: 0 },
      totalEarned: { type: Number, default: 0 },
   },
   resources: {
      hp: { type: Number, default: 1 },
      insanity: { type: Number, default: 0 },
      fate: { type: Number, default: 0 },
      fortune: { type: Number, default: 0 },
      resilience: { type: Number, default: 0 },
      resolve: { type: Number, default: 0 },
   },
   attributes: {
      strength: { type: Number, default: 10 },
      toughness: { type: Number, default: 10 },
      stamina: { type: Number, default: 10 },
      agility: { type: Number, default: 10 },
      dexterity: { type: Number, default: 10 },
      perception: { type: Number, default: 10 },
      intelligence: { type: Number, default: 10 },
      willpower: { type: Number, default: 10 },
      charisma: { type: Number, default: 10 },
      luck: { type: Number, default: 10 },
   },
   skills: {
      cooking : { 
         current: { type: Number, default: 1 },
         progress: { type: Number, default: 0 },
      },
      fishing: { 
         current: { type: Number, default: 1 },
         progress: { type: Number, default: 0 },
      },
   },
   weaponSkills: {
      melee: { 
         current: { type: Number, default: 1 },
         progress: { type: Number, default: 0 },
      },
      ranged: { 
         current: { type: Number, default: 1 },
         progress: { type: Number, default: 0 },
      },
      unarmed: { 
         current: { type: Number, default: 1 },
         progress: { type: Number, default: 0 },
      },
   },
   currencies: {
      amberDrops: Number,
      pearlFlakes: Number,
      obsidianChips: Number,
      silverCoins: Number,
      goldCoins: Number,
      deltradaCoins: Number,
   }
});

const profile = MG.model('gProfile', gProfileSchema);

//---------------------------------------------------------------------------------------------------------------
const gFightClubSchema = new MG.Schema({
   ownerId: String,
   fame: { type: String, default: 0 }
});

const fightClub = MG.model('gFighClub', gFightClubSchema);

//---------------------------------------------------------------------------------------------------------------
const gFishingSchema = new MG.Schema({
   ownerId: String,
   rod: {
      id: String,
      condition: Number
   },
   bait: {
      id: String,
      amount: Number
   },
   records: [{
      id: String,
      weight: Number,
   }],
   fish: [{
      id: String,
      weight: Number,
   }]
});

const fishing = MG.model('gFishing', gFishingSchema);

//---------------------------------------------------------------------------------------------------------------
const gRecordSchema = new MG.Schema({
   fish: [{
      fishId: String,
      place1Id: String,
      place1Weight: Number,
      place2Id: { type: String, default: '' },
      place2Weight: { type: Number, default: 0 },
      place3Id: { type: String, default: '' },
      place3Weight: { type: Number, default: 0 },
   }]
});

const record = MG.model('gRecord', gRecordSchema);

//---------------------------------------------------------------------------------------------------------------
module.exports = {
   profile,
   fightClub,
   fishing,
   record
};






