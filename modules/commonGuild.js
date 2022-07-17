const SETTINGS = require('./serverSettings.js');
const C = require('./common.js');
const AG = require('./arraysGuild.js');
const SG = require('./schematicsGuild.js');
const DB = require('./db.js');

//----------------------------------------------------------- CONSTANTS ----------------------------------------------------------
const HP_PER_T = 10;
const HP_PER_S = 5;
const HP_PER_WP = 5;




//----------------------------------------------------------- ACTION POINTS ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function modifyActionPointsForAll(amount) {
   await DB.updateMany(SG.profile, {}, {$inc: {"actionPoints.current" : amount, "actionPoints.totalEarned" : amount}});
}

module.exports.modifyActionPointsForAll = modifyActionPointsForAll;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- ATTRIBUTES ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function getStrengthBonus(profile) {
   if (checkIfProfile(profile))
      return Math.floor(profile.attributes.strength / 10);
}

module.exports.getStrengthBonus = getStrengthBonus;

// OK---------------------------------------------------------------------------------------------------------------
function getToughnessBonus(profile) {
   if (checkIfProfile(profile))
      return Math.floor(profile.attributes.toughness / 10);
}

module.exports.getToughnessBonus = getToughnessBonus;

function getWillpowerBonus(profile) {
   if (checkIfProfile(profile))
      return Math.floor(profile.attributes.willpower / 10);
}

module.exports.getWillpowerBonus = getWillpowerBonus;

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


//----------------------------------------------------------- FIGHT CLUB ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function getFightClubDoc() {
   const recordDoc = await DB.findOne(SG.record, {}) ?? new SG.record({});
   return Promise.resolve(recordDoc);
}

module.exports.getFightClubDoc = getFightClubDoc;

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
               setFishingResult(result, e, 1);
               moveFishingRecordDown(serverRecords.fish[index], 1);
               serverRecords.fish[index].place1Id = fishingDoc.ownerId;
               serverRecords.fish[index].place1Weight = fish.weight;
            } else if (e.place2Weight < fish.weight) {
               setFishingResult(result, e, 2);
               moveFishingRecordDown(serverRecords.fish[index], 2);
               serverRecords.fish[index].place2Id = fishingDoc.ownerId;
               serverRecords.fish[index].place2Weight = fish.weight;
            } else if (e.place3Weight < fish.weight) {
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
function setFishingResult(result, element, placeNumber) {
   const defaultBeginning = 'place' + placeNumber;

   result.previousRecordHolder = element[defaultBeginning + 'Id'];
   result.previousServerRecord = element[defaultBeginning + 'Weight'];
   result.currentPlace = placeNumber;
}

// OK---------------------------------------------------------------------------------------------------------------
function moveFishingRecordDown(records, placeNumber) {
   if (placeNumber < 3 && records.place2Weight > 0) {
      records.place3Id = records.place2Id;
      records.place3Weight = records.place2Weight;
   }

   if (placeNumber < 2) {
      records.place2Id = records.place1Id;
      records.place2Weight = records.place1Weight;
   }
}

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- PERIODIC AND DEFAULT----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function checkMemberAvailability(profile) {
   
   
}

module.exports.checkMemberAvailability = checkMemberAvailability;

// OK---------------------------------------------------------------------------------------------------------------
async function profilesHourlyUpdate(guild, id) {
   try {
      let profile = await getProfileById(guild, id);
      regenerateHourlyHp(profile);
      await profile.save();
   } catch {
      console.log(`Error while doing hourly update for user with ID: ${id}`);
   }
}

// OK---------------------------------------------------------------------------------------------------------------
async function mainHourlyUpdate(client) {
   modifyActionPointsForAll(1);

   const deltrada = client.guilds.cache.get(SETTINGS.deltradaId);
   const members = C.dcGetAllMembers(deltrada);
   for (const member of members)
      profilesHourlyUpdate(deltrada, member[1].id);
}

module.exports.mainHourlyUpdate = mainHourlyUpdate;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- PROFILE ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function checkIfProfile(value) {
   return value instanceof SG.profile;
}

// OK---------------------------------------------------------------------------------------------------------------
async function getMessageAuthorProfile(element) {
   return Promise.resolve(getProfileById(element, message.author.id));
}

module.exports.getMessageAuthorProfile = getMessageAuthorProfile;

// OK---------------------------------------------------------------------------------------------------------------
async function getProfileById(element, id) {
   if (!C.dcCheckIfMessage(element) && !C.dcCheckIfGuild(element) || !id)
      return Promise.reject(`Wrong input argument!`);

   let profileDoc = await DB.findOne(SG.profile, { ownerId: id });
   if (!profileDoc) {
      profileDoc = createNewGuildProfileFromID(element, id);
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
   let found = C.getMemberIdByNameOrMention(message, nameOrMention);

   if (C.dcCheckIfCollection(found)) {
      const membersAmount = found.size;

      if (membersAmount == 0) {
         return Promise.reject(`No users found!`);
      } else if (membersAmount > 1) {
         let msg = `Found more than 1 user!\nUsers found: `;
         const memberNames = found.map(e => e.displayName);

         memberNames.forEach(e => msg += `${e}; `);

         return Promise.reject(msg);
      } else {
         found = found.at(0).id;
      }
   }

   return Promise.resolve(getProfileById(message, found));
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
function createNewGuildProfileFromID(element, id) {
   const member = C.dcGetMemberByID(element, id);
   return createNewGuildProfile(member);
}

module.exports.createNewGuildProfileFromID = createNewGuildProfileFromID;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- RECORDS ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function getRecordDoc() {
   const recordDoc = await DB.findOne(SG.record, {}) ?? new SG.record({});
   return Promise.resolve(recordDoc);
}

module.exports.getRecordDoc = getRecordDoc;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- RESOURCES ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function getMaxHp(profile) {
   if (!checkIfProfile(profile))
      return;

   return getStrengthBonus(profile) * HP_PER_S + getWillpowerBonus(profile) * HP_PER_WP + getToughnessBonus(profile) * HP_PER_T;
}

module.exports.getMaxHp = getMaxHp;

// OK---------------------------------------------------------------------------------------------------------------
function regenerateHourlyHp(profile) {
   if (!checkIfProfile(profile))
      return;

   const maxHp = getMaxHp(profile);
   const currentHp = profile.resources.hp;
   const hourlyHpRegen = getToughnessBonus(profile) * 2;

   profile.resources.hp = currentHp + hourlyHpRegen < maxHp ? currentHp + hourlyHpRegen : maxHp;
}

module.exports.getMaxHp = getMaxHp;


// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- SKILLS ----------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- WEAPON SKILLS ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function getSkillWeapon(user, weaponSkillName) {
   if (!checkIfProfile(user) || !C.strCheckIfAnyMatch(weaponSkillName, AG.weaponTypes))
      return;

   return user.weaponSkills.melee.current + user.weaponSkills[weaponSkillName].current;
}

module.exports.getSkillWeapon = getSkillWeapon;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------