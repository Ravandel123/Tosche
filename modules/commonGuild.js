const SETTINGS = require('./serverSettings.js');
const C = require('./common.js');
const CL_GD = require('../classes/guildData.js');
const CM = require('./commonMechanics.js');
const DG = require('./dataGuild.js');
const SG = require('./schematicsGuild.js');
const DB = require('./db.js');
const DSV = require('./dataServer.js');

"use strict";


//----------------------------------------------------------- GENERAL ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
/**
 * Checks if a user is the server owner
 *
 * @param {Discord.GuildMember} member - The member to check.
 * @returns {boolean} True if the member is the server owner, false otherwise.
 */
function checkIfServerOwner(member) {
   return member.id == DSV.ownerID;
}

module.exports.checkIfServerOwner = checkIfServerOwner;

//------------------------------------------------------------------------------------------------------------------
/**
 * Checks if a user is Tosche
 *
 * @param {Discord.GuildMember} member - The member to check.
 * @returns {boolean} True if the member is Tosche, false otherwise.
 */
function checkIfTosche(member) {
   return member.id == DSV.botID;
}

module.exports.checkIfTosche = checkIfTosche;

//---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- CLIENT DATA ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function cdGetOrCreateMemberData(element, id) {
   const clt = C.dcCheckIfMessage(element) ? element.client : element;
   let memberData = clt.data.getMemberData(id);

   if (!memberData) {
      memberData = new CL_GD.MemberData(id);
	  clt.data.addOrUpdateMember(id, memberData);
   }

   return memberData;
}

module.exports.cdGetOrCreateMemberData = cdGetOrCreateMemberData;

//------------------------------------------------------------------------------------------------------------------
function cdCheckIfTaskCanBeAssigned(message, id = message.author.id, who = 'you') {
   const memberData = message.client.data.getMemberData(id);

   if (!memberData || !memberData.gotAnyTask)
      return true;

   const firstPart = C.strCapitalizeFirstLetter(who) + (C.strCheckIfAnyMatch(who, ['you', 'i']) ? ` are` : ` is`);
   C.dcRespondToMsg(message, `${firstPart} too busy right now!`);

   return false;
}

module.exports.cdCheckIfTaskCanBeAssigned = cdCheckIfTaskCanBeAssigned;

//------------------------------------------------------------------------------------------------------------------
function cdAssignNewTask(message, collector, transcationOpen = false, id = message.author.id) {
   let memberData = message.client.data.getMemberData(id);

   if (!memberData) {
      memberData = new CL_GD.MemberData(id, transcationOpen, collector);

      message.client.data.addOrUpdateMember(id, memberData);
      return true;
   }

   if (memberData.collector)
      memberData.collector.stop();

   memberData.collector = collector;
   return true;
}

module.exports.cdAssignNewTask = cdAssignNewTask;

//------------------------------------------------------------------------------------------------------------------
function cdFinishTask(message, id = message.author.id) {
   const memberData = message.client.data.getMemberData(id);

   if (memberData && memberData.collector) {
      memberData.collector.stop();
      memberData.collector = null;
   }
}

module.exports.cdFinishTask = cdFinishTask;

//------------------------------------------------------------------------------------------------------------------
function cdCanAct(message, userProfile) {
   if (CM.canTakeAction(userProfile, message, userProfile.ownerName) && cdCheckIfTaskCanBeAssigned(message, userProfile.ownerId, userProfile.ownerName))
      return true;
}

module.exports.cdCanAct = cdCanAct;

//------------------------------------------------------------------------------------------------------------------
async function cdWaitForAvailableTransaction(memberData, message, messageContent) {
   let responseMsg;
   let msgContent = messageContent;

   if (message && msgContent && memberData && memberData.transactionOpen)
      responseMsg = await C.dcSendMsgToChannelAndGetItsRef(message, msgContent);

   while (memberData && memberData.transactionOpen) {
      if (responseMsg) {
         msgContent += '.';
         responseMsg.edit(msgContent);

         if (msgContent.slice(-3) == '...')
            msgContent = messageContent;
      }

      console.log(`The transaction for member ${memberData.userId} is still in progress!`);
      await C.sleep(5);
   }

   if (responseMsg)
      responseMsg.delete();

   return Promise.resolve();
}

module.exports.cdWaitForAvailableTransaction = cdWaitForAvailableTransaction;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- CURRENCIES ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function getCurrencyObject(currencyAlias) {
   return C.arrGetObjectByAnyOfItsValues(DG.currencies, currencyAlias);
}

module.exports.getCurrencyObject = getCurrencyObject;

//------------------------------------------------------------------------------------------------------------------
function transferCurrency(message, source, target, amount, currency) {
   if (!C.checkIfProfile(source) || !C.checkIfProfile(target) || !C.checkIfNaturalNumber(amount) || !C.checkIfAnyByFunction(DG.currencies, e => C.strCompare(e.nameDB, currency.nameDB)))
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


//----------------------------------------------------------- SMACKDOWN SPIRE ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
async function getSmackdownSpireDoc() {
   const recordDoc = await DB.findOne(SG.record, {}) ?? new SG.record({});
   return Promise.resolve(recordDoc);
}

module.exports.getSmackdownSpireDoc = getSmackdownSpireDoc;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- FISHING ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function checkIfFishingDoc(value) {
   return value instanceof SG.fishing;
}

//------------------------------------------------------------------------------------------------------------------
async function getMessageAuthorFishingDoc(message) {
   return Promise.resolve(getFishingDocById(message, message.author.id));
}

module.exports.getMessageAuthorFishingDoc = getMessageAuthorFishingDoc;

//------------------------------------------------------------------------------------------------------------------
async function getFishingDocById(message, id) {
   if (!C.dcCheckIfMessage(message) || !id)
      return Promise.reject(`Wrong input argument!`);

   let fishingDoc = await DB.findOne(SG.fishing, { ownerId: id });
   if (!fishingDoc) {
      try {
         fishingDoc = createNewFishingDocFromID(message, id);
         await fishingDoc.save();
      } catch(error) {
         return Promise.reject(error);
      }
   }

   if (!fishingDoc)
      return Promise.reject(`Unable to find or create fishing profile! The user ${member} doesn't exist or is not in Deltrada!`);

   return Promise.resolve(fishingDoc);
}

module.exports.getFishingDocById = getFishingDocById;

//------------------------------------------------------------------------------------------------------------------
function createNewFishingDocFromID(message, id) {
   const member = C.dcGetMemberByID(message, id);
   return createNewFishingDoc(member);
}

module.exports.createNewFishingDocFromID = createNewFishingDocFromID;

//------------------------------------------------------------------------------------------------------------------
function createNewFishingDoc(member) {
   if (!C.dcCheckIfMember(member))
      return;

   const fishingDoc = new SG.fishing({
      ownerId: member.id
   });

   return fishingDoc;
}

module.exports.createNewFishingDoc = createNewFishingDoc;

//------------------------------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------------------------------
function setFishingResult(result, element, placeNumber) {
   const defaultBeginning = 'place' + placeNumber;

   result.previousRecordHolder = element[defaultBeginning + 'Id'];
   result.previousServerRecord = element[defaultBeginning + 'Weight'];
   result.currentPlace = placeNumber;
}

//------------------------------------------------------------------------------------------------------------------
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


//----------------------------------------------------------- PERIODIC----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
async function mainUpdate1h(client) {
   const deltrada = client.guilds.cache.get(SETTINGS.deltradaId);
   const members = C.dcGetAllMembers(deltrada);
   for (const member of members) {
      profilesUpdate1h(deltrada, member[1]);
   }
}

module.exports.mainUpdate1h = mainUpdate1h;

//------------------------------------------------------------------------------------------------------------------
async function profilesUpdate1h(guild, member) {
   const memberData = cdGetOrCreateMemberData(guild.client, member.id);
   const taskId = memberData.addTask(`Profile update - 1h`);

   await memberData.waitForYourTurn(taskId);
   try {
      const profile = await getProfileById(guild, member.id);
      CM.regenerateHp1h(profile);
      CM.modifyActionPoints(profile, 1);
      updateGuildProfileToCurrentGuildData(profile, member);
      await profile.save();
   } catch {
      console.log(`Error while doing hourly update for user with ID: ${member.id}`);
   }
   await memberData.removeIfFirst(taskId);
}

module.exports.profilesUpdate1h = profilesUpdate1h;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- PROFILE ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
async function getMessageAuthorProfile(message) {
   return Promise.resolve(getProfileById(message, message.author.id));
}

module.exports.getMessageAuthorProfile = getMessageAuthorProfile;

//------------------------------------------------------------------------------------------------------------------
async function getProfileById(element, id) {
   if (!C.dcCheckIfMessage(element) && !C.dcCheckIfGuild(element) || !id)
      return Promise.reject(`Wrong input argument!`);

   let profileDoc = await DB.findOne(SG.profile, { ownerId: id });
   if (!profileDoc) {
      profileDoc = createNewGuildProfileFromID(element, id);
      if (!profileDoc)
         return Promise.reject(`Unable to find or create guild profile! The user with ID '${id}' doesn't exist or is not a member of Deltrada!`);

      try {
         await profileDoc.save();
      } catch(error) {
         return Promise.reject(error);
      }
   }

   return Promise.resolve(profileDoc);
}

module.exports.getProfileById = getProfileById;

//------------------------------------------------------------------------------------------------------------------
async function getMemberProfile(message, nameOrMention) {
   const found = C.getFoundMembers(message, nameOrMention);

   if (!C.checkIfStringOfNumbers(found))
      return Promise.reject(found);

   return Promise.resolve(getProfileById(message, found));
}

module.exports.getMemberProfile = getMemberProfile;

//------------------------------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------------------------------
function createNewGuildProfileFromID(element, id) {
   const member = C.dcGetMemberByID(element, id);
   return createNewGuildProfile(member);
}

module.exports.createNewGuildProfileFromID = createNewGuildProfileFromID;

//------------------------------------------------------------------------------------------------------------------
function updateGuildProfileToCurrentGuildData(profile, member) {

   if (profile.ownerTag != member.user.tag) {
      profile.ownerTag = member.user.tag;
   }

   if (profile.ownerName != member.displayName) {
      profile.ownerName = member.displayName;
   } 
}

module.exports.createNewGuildProfileFromID = createNewGuildProfileFromID;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- RECORDS ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
async function getRecordDoc() {
   const recordDoc = await DB.findOne(SG.record, {}) ?? new SG.record({});
   return Promise.resolve(recordDoc);
}

module.exports.getRecordDoc = getRecordDoc;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- CLIENT DATA ----------------------------------------------------------
// checkIfServerOwner(member)
// checkIfTosche(member)

//----------------------------------------------------------- CLIENT DATA ----------------------------------------------------------
// cdGetOrCreateMemberData(element, id)
// cdCheckIfTaskCanBeAssigned(message, id = message.author.id, who = 'you')
// cdAssignNewTask(message, collector, transcationOpen = false, id = message.author.id)
// cdFinishTask(message, id = message.author.id)
// cdCanAct(message, userProfile)
// cdWaitForAvailableTransaction(memberData, message, messageContent)

//----------------------------------------------------------- CURRENCIES ----------------------------------------------------------
// getCurrencyObject(currencyAlias)
// transferCurrency(message, source, target, amount, currency)

//----------------------------------------------------------- SMACKDOWN SPIRE ----------------------------------------------------------
// getSmackdownSpireDoc()

//----------------------------------------------------------- FISHING ----------------------------------------------------------
// checkIfFishingDoc(value)
// getMessageAuthorFishingDoc(message)
// getFishingDocById(message, id)
// createNewFishingDocFromID(message, id)
// createNewFishingDoc(member)
// addFishToFishingDoc(fishingDoc, fishToAdd)
// addFishToMessageOwnerFishingDoc(message, fish)
// updateFishingRecords(fishingDoc, fish, serverRecords)
// setFishingResult(result, element, placeNumber)
// moveFishingRecordDown(records, placeNumber)

//----------------------------------------------------------- PERIODIC----------------------------------------------------------
// mainUpdate1h(client)
// profilesUpdate1h(guild, id)

//----------------------------------------------------------- PROFILE ----------------------------------------------------------
// getMessageAuthorProfile(message)
// getProfileById(element, id)
// getMemberProfile(message, nameOrMention)
// createNewGuildProfile(member)
// createNewGuildProfileFromID(element, id)
// updateGuildProfileToCurrentGuildData(profile, member)

//----------------------------------------------------------- RECORDS ----------------------------------------------------------
// getRecordDoc()