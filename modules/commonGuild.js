const C = require('./common.js');
const AG = require('./arraysGuild.js');
const SG = require('./schematicsGuild.js');
const DB = require('./db.js');

//----------------------------------------------------------- PROFILE ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function checkIfProfile(value) {
   return value instanceof SG.profile;
}

// OK---------------------------------------------------------------------------------------------------------------
async function getMessageAuthorProfile(message) {
   return Promise.resolve(getProfileById(message, message.author.id));
}

module.exports.getMessageAuthorProfile = getMessageAuthorProfile;

// OK---------------------------------------------------------------------------------------------------------------
async function getProfileById(message, id) {
   if (!C.dcCheckIfMessage(message) || !id)
      return Promise.reject(`Wrong input argument!`);

   let profileDoc = await DB.findOne(SG.profile, { ownerId: id });
   if (!profileDoc) {
      profileDoc = createNewGuildProfileFromID(message, id);
      if (!profileDoc)
         return Promise.reject(`Unable to find or create guild profile! The user ${member} doesn't exist or is not in Deltrada!`);

      try {
         await profileDoc.save();
      } catch(error) {
         return Promise.reject(error);
      }
   }

   return Promise.resolve(profileDoc);
}

module.exports.getProfileById = getProfileById;

// OK---------------------------------------------------------------------------------------------------------------
async function getMemberProfile(message, nameOrMention) {
   let foundID = C.getMemberIdByNameOrMention(message, nameOrMention);

   if (C.dcCheckIfCollection(foundID)) {
      const membersAmount = foundID.size;

      if (membersAmount == 0) {
         return Promise.reject(`No users found!`);
      } else if (membersAmount > 1) {
         let msg = `Found more than 1 user!\nUsers found: `;
         const memberNames = foundID.map(e => e.displayName);

         memberNames.forEach(e => msg += `${e}; `);

         return Promise.reject(msg);
      } else {
         foundID = foundID.at(0).id;
      }
   }

   return Promise.resolve(getProfileById(message, foundID));
}

module.exports.getMemberProfile = getMemberProfile;

// OK---------------------------------------------------------------------------------------------------------------
function createNewGuildProfile(member) {
   if (!C.dcCheckIfMember(member))
      return;

   //Main
   const profileDoc = new SG.profile({
      ownerId: member.id,
      ownerTag: member?.user.tag,
      ownerName: member.displayName,
   });

   profileDoc.currencies = {
      amberDrops : C.rndNo0(10),
      pearlFlakes : C.rndNo0(10),
      obsidianChips : C.rndNo0(10),
      silverCoins : C.rndNo0(10),
      goldCoins : C.rndNo0(10),
      deltradaCoins : C.rndNo0(100),
   }

   return profileDoc;
}

module.exports.createNewGuildProfile = createNewGuildProfile;

// OK---------------------------------------------------------------------------------------------------------------
function createNewGuildProfileFromID(message, id) {
   const member = C.dcGetMemberByID(message, id);
   return createNewGuildProfile(member);
}

module.exports.createNewGuildProfileFromID = createNewGuildProfileFromID;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- ACTION POINTS ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function modifyActionPointsForAll(amount) {
   await DB.updateMany(SG.profile, {}, {$inc: {"actionPoints.current" : amount, "actionPoints.totalEarned" : amount}});
}

module.exports.modifyActionPointsForAll = modifyActionPointsForAll;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- CURRENCIES ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function getCurrencyObject(currencyAlias) {
   return C.arrGetObjectByAnyOfItsValues(AG.currencies, currencyAlias);
}

module.exports.getCurrencyObject = getCurrencyObject;

// OK---------------------------------------------------------------------------------------------------------------
function transferCurrency(message, source, target, amount, currency) {
   if (!checkIfProfile(source) || !checkIfProfile(target) || !C.checkIfNaturalNumber(amount) || !C.checkIfAnyByFunction(AG.currencies, e => C.strCompare(e.nameDB, currency.nameDB)))
      return;

   if (source.currencies[currency.nameDB] < amount) {
      C.dcRespondToMsg(message, `You are too poor to give ${target.ownerName} ${amount} ${currency.name}`, `You have only ${amount} ${currency.name}!`);
      return;
   }

   source.currencies[currency.nameDB] -= amount;
   target.currencies[currency.nameDB] += amount;

   return true;
}

module.exports.transferCurrency = transferCurrency;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- RECORD ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function getRecordDoc() {
   const recordDoc = await DB.findOne(SG.record, {}) ?? new SG.record({});
   return Promise.resolve(recordDoc);
}

module.exports.getRecordDoc = getRecordDoc;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- FISHING ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function checkIfFishingDoc(value) {
   return value instanceof SG.fishing;
}

// OK---------------------------------------------------------------------------------------------------------------
async function getMessageAuthorFishingDoc(message) {
   return Promise.resolve(getFishingDocById(message, message.author.id));
}

module.exports.getMessageAuthorFishingDoc = getMessageAuthorFishingDoc;

// OK---------------------------------------------------------------------------------------------------------------
async function getFishingDocById(message, id) {
   if (!C.dcCheckIfMessage(message) || !id)
      return Promise.reject(`Wrong input argument!`);

   const fishingDoc = await DB.findOne(SG.fishing, { ownerId: id }) ?? createNewFishingDocFromID(message, id);
   if (!fishingDoc)
      return Promise.reject(`Unable to find or create fishing profile! The user ${member} doesn't exist or is not in Deltrada!`);

   try {
      await fishingDoc.save();
   } catch(error) {
      return Promise.reject(error);
   }

   return Promise.resolve(fishingDoc);
}

module.exports.getFishingDocById = getFishingDocById;

// OK---------------------------------------------------------------------------------------------------------------
function createNewFishingDocFromID(message, id) {
   const member = C.dcGetMemberByID(message, id);
   return createNewFishingDoc(member);
}

module.exports.createNewFishingDocFromID = createNewFishingDocFromID;

// OK---------------------------------------------------------------------------------------------------------------
function createNewFishingDoc(member) {
   if (!C.dcCheckIfMember(member))
      return;

   const fishingDoc = new SG.fishing({
      ownerId: member.id
   });

   return fishingDoc;
}

module.exports.createNewFishingDoc = createNewFishingDoc;

// OK---------------------------------------------------------------------------------------------------------------
async function addFishToFishingDoc(fishingDoc, fishToAdd) {
   if (!checkIfFishingDoc(fishingDoc) || !fishToAdd)
      return Promise.reject(`Wrong input argument!`);

   const records = await getRecordDoc();
   let errors = '';

   fishingDoc.fish.push(fishToAdd);
   const result = updateFishingRecords(fishingDoc, fishToAdd, records);

   await fishingDoc.save()
      .catch(error => {
         console.log(error)
         errors += error;
      });

   await records.save()
      .catch(error => {
         console.log(error)
         errors += error;
      });

   if (errors != '')
      return Promise.reject(errors);

   return Promise.resolve(result);
}

module.exports.addFishToFishingDoc = addFishToFishingDoc;

// OK---------------------------------------------------------------------------------------------------------------
async function addFishToMessageOwnerFishingDoc(message, fish) {
   try {
      const fishingDoc = await getMessageAuthorFishingDoc(message);
      const result = await addFishToFishingDoc(fishingDoc, fish);
      return Promise.resolve(result);
   } catch(error) {
      return Promise.reject(error);
   }
}

module.exports.addFishToMessageOwnerFishingDoc = addFishToMessageOwnerFishingDoc;

// OK---------------------------------------------------------------------------------------------------------------
function updateFishingRecords(fishingDoc, fish, serverRecords) {
   let result = {
      previousPersonalRecord: -1,
      previousServerRecord: -1,
      currentPlace: -1,
      previousRecordHolder: ''
   };

   if (!fishingDoc.records.some(e => e.id == fish.id)) {
      result.previousPersonalRecord = 0;
      fishingDoc.records.push(fish);
   } else {
      fishingDoc.records.forEach(e => {
         if (e.id == fish.id && e.weight < fish.weight) {
            result.previousPersonalRecord = e.weight;
            e.weight = fish.weight;
         }
      });
   }

   if (!serverRecords.fish.some(e => e.fishId == fish.id)) {
      result.currentPlace = 0;
      const newFishingDoc = {
         fishId: fish.id,
         place1Id: fishingDoc.ownerId,
         place1Weight: fish.weight
      };
      serverRecords.fish.push(newFishingDoc);
   } else {
      serverRecords.fish.forEach((e, index) => {
         if (e.fishId == fish.id) {
            if (e.place1Weight < fish.weight) {
               // result.previousRecordHolder = e.place1Id;
               // result.previousServerRecord = e.place1Weight;
               // result.currentPlace = 1;
               setFishingResult(result, e, 1);
               moveFishingRecordDown(serverRecords.fish[index], 1);
               serverRecords.fish[index].place1Id = fishingDoc.ownerId;
               serverRecords.fish[index].place1Weight = fish.weight;
            } else if (e.place2Weight < fish.weight) {
               // result.previousRecordHolder = e.place2Id;
               // result.previousServerRecord = e.place2Weight;
               // result.currentPlace = 2;
               setFishingResult(result, e, 2);
               moveFishingRecordDown(serverRecords.fish[index], 2);
               serverRecords.fish[index].place2Id = fishingDoc.ownerId;
               serverRecords.fish[index].place2Weight = fish.weight;
            } else if (e.place3Weight < fish.weight) {
               // result.previousRecordHolder = e.place3Id;
               // result.previousServerRecord = e.place3Weight;
               // result.currentPlace = 3;
               setFishingResult(result, e, 3);
               serverRecords.fish[index].place3Id = fishingDoc.ownerId;
               serverRecords.fish[index].place3Weight = fish.weight;
            }
         }
      });
   }

   return result;
}

// OK---------------------------------------------------------------------------------------------------------------
function setFishingResult(result, element, place) {
   const defaultBeginning = 'place' + place;

   result.previousRecordHolder = element[defaultBeginning + 'Id'];
   result.previousServerRecord = element[defaultBeginning + 'Weight'];
   result.currentPlace = place;
}

// OK---------------------------------------------------------------------------------------------------------------
function moveFishingRecordDown(records, place) {
   if (place < 3) {
      records.place3Id = records.place2Id;
      records.place3Weight = records.place2Weight;
   }

   if (place < 2) {
      records.place2Id = records.place1Id;
      records.place2Weight = records.place1Weight;
   }
}

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------