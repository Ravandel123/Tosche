const C = require('./../common.js');

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const arrFish = [
   {
      id: `fish_bluegill`,
      name: `Bluegill`,
      minWeight: 0.1,
      avgWeight: 0.5,
      maxWeight: 2,
      locations: [`river`, `pond`, `lake`],
      bait: ['']
   },
   {
      id: `fish_smallmouthBass`,
      name: `Smallmouth Bass`,
      minWeight: 0.1,
      avgWeight: 2.7,
      maxWeight: 5.5,
      locations: [`river`, `lake`],
      bait: ['']
   },
   {
      id: `fish_channelCatfish`,
      name: `Channel Catfish`,
      minWeight: 0.5,
      avgWeight: 8.0,
      maxWeight: 26.0,
      locations: [`river`, `pond`, `lake`],
      bait: ['']
   },
   {
      id: `fish_commonCarp`,
      name: `Common Carp`,
      minWeight: 0.5,
      avgWeight: 14.0,
      maxWeight: 45.0,
      locations: [`pond`, `lake`],
      bait: ['']
   },
   {
      id: `fish_commonPerch`,
      name: `Common Perch`,
      minWeight: 0.1,
      avgWeight: 2.0,
      maxWeight: 3.5,
      locations: [`river`, `pond`, `lake`],
      bait: ['']
   }
];

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const arrFishingSpots = [
   {
      name: `pond`,
      area: `deltrada-area`,
      img: `https://i.pinimg.com/564x/bf/6f/ca/bf6fcac9b91bb5016e57a8d17507a08c.jpg`,
      fish: [
         { id: `fish_bluegill`, prevalence : 10 },
         { id: `fish_channelCatfish`, prevalence : 1 },
         { id: `fish_commonCarp`, prevalence : 1 },
         { id: `fish_commonPerch`, prevalence : 4 }
      ]
   },
   {
      name: `river`,
      area: `deltrada-area`,
      img: `https://i.pinimg.com/564x/bb/c7/c8/bbc7c839aaeafbfab270bb2ee500693d.jpg`,
      fish: [
         { id: `fish_bluegill`, prevalence : 10 },
         { id: `fish_smallmouthBass`, prevalence : 2 },
         { id: `fish_commonPerch`, prevalence : 4 }
      ]
   },
   {
      name: `lake`,
      area: `lake-felnach`,
      img: ``,
      fish: [
      ]
   }
];

module.exports = {
   arrFish,
   arrFishingSpots
};

//----------------------------------------------------------- FUNCTIONS ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function checkIfThreadIsFishingSpot(thread) {
   if (!C.dcCheckIfThread(thread))
      return;

   const spots = getFishingSpotsForArea(thread.parent.name);
   return spots.some(e => C.strCompare(e.name, thread.name));
}

module.exports.checkIfThreadIsFishingSpot = checkIfThreadIsFishingSpot;

//------------------------------------------------------------------------------------------------------------------
function getAllFishingLocations() {
   return C.arrConvertToUnqiue(arrFishingSpots.map(e => e.area));
}

module.exports.getAllFishingLocations = getAllFishingLocations;

//------------------------------------------------------------------------------------------------------------------
function getFishingSpotsForArea(areaName) {
   if (C.checkIfExists(areaName))
      return arrFishingSpots.filter(e => C.strCompare(e.area, areaName));
}

module.exports.getFishingSpotsForArea = getFishingSpotsForArea;

//------------------------------------------------------------------------------------------------------------------
function getFishingSpot(areaName, spotName) {
   if (C.checkIfExists(areaName) && C.checkIfExists(spotName))
      return arrFishingSpots.find(e => e.area == areaName && e.name == spotName);
}

module.exports.getFishingSpot = getFishingSpot;

//------------------------------------------------------------------------------------------------------------------
function getFishingSpotFromThread(thread) {
   if (C.dcCheckIfThread(thread))
      return getFishingSpot(thread.parent.name, thread.name);
}

module.exports.getFishingSpotFromThread = getFishingSpotFromThread;

//------------------------------------------------------------------------------------------------------------------
function getFishById(fishId) {
   return arrFish.find(e => e.id == fishId);
}

module.exports.getFishById = getFishById;

//------------------------------------------------------------------------------------------------------------------
function getFishNameById(fishId) {
   return getFishById(fishId)?.name;
}

module.exports.getFishNameById = getFishNameById;
//------------------------------------------------------------------------------------------------------------------
function generateRandomFishFromSpot(fishingSpot) {
   const fish = getRandomFishFromSpot(fishingSpot);

   fish.data = {
      id: fish.id,
      weight: C.rndBetween(fish.minWeight, fish.avgWeight, 2)
   };

   return fish;
}

module.exports.generateRandomFishFromSpot = generateRandomFishFromSpot;


//----------------------------------------------------------- INTERNAL ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function getRandomFishFromSpot(fishingSpot) {
   const fishID = C.arrRandomFromFrequency(fishingSpot.fish, `id`, `prevalence`);
   return arrFish.find(e => e.id == fishID);
}
//---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------