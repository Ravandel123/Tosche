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

   const profileDoc = await DB.findOne(SG.profile, { ownerId: id }) ?? createNewGuildProfileFromID(message, id);
   if (!profileDoc)
      return Promise.reject(`Unable to find or create guild profile! The user ${member} doesn't exist or is not in Deltrada!`);

   try {
      await profileDoc.save();
   } catch(error) {
      return Promise.reject(error);
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


   fishingDoc.fish.push(fishToAdd);
   // fishingProfile.records.push(fishingProfile.fish[0]);

   await fishingDoc.save()
   .catch(error => {
      console.log(error)
      return Promise.reject(error);
   });

   return Promise.resolve();
}

module.exports.addFishToFishingDoc = addFishToFishingDoc;

// OK---------------------------------------------------------------------------------------------------------------
async function addFishToMessageOwnerFishingDoc(message, fish) {
   try {
      const fishingDoc = await getMessageAuthorFishingDoc(message);
      await addFishToFishingDoc(fishingDoc, fish);
      return Promise.resolve();
   } catch(error) {
      return Promise.reject(error);
   }
}

module.exports.addFishToMessageOwnerFishingDoc = addFishToMessageOwnerFishingDoc;
// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------