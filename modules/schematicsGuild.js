const MG = require('mongoose');

//---------------------------------------------------------------------------------------------------------------
const gProfileSchema = new MG.Schema({
   ownerId: String,
   ownerTag: String,
   ownerName: String,
   actionPoints: {
      current: { type: Number, default: 0 },
      totalEarned: { type: Number, default: 0 },
      },
   attributes: {
      strength: { type: Number, default: 1 },
      toughness: { type: Number, default: 1 },
      stamina: { type: Number, default: 1 },
      agility: { type: Number, default: 1 },
      dexterity: { type: Number, default: 1 },
      perception: { type: Number, default: 1 },
      intelligence: { type: Number, default: 1 },
      willpower: { type: Number, default: 1 },
      charisma: { type: Number, default: 1 },
      luck: { type: Number, default: 1 },
   },
   fightClub: {
      fame: { type: Number, default: 0 },
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
   fishing,
   record
};






