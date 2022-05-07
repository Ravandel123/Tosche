const C = require('./common.js');
const AG = require('./arraysGuild.js');
const SG = require('./schematicsGuild.js');


// OK----------------------------------------------------------- PROFILE ----------------------------------------------------------
function checkIfProfile(value) {
   return value instanceof SG.character;
}

module.exports.checkIfProfile = checkIfProfile;

// OK---------------------------------------------------------------------------------------------------------------
async function getMessageAuthorProfile(message) {
   return Promise.resolve(getProfileById(message, message.author.id));
}

module.exports.getMessageAuthorProfile = getMessageAuthorProfile;

// OK---------------------------------------------------------------------------------------------------------------
async function getProfileById(message, id) {
   if (!C.dcCheckIfMessage(message) || !id)
      return Promise.reject(`Wrong input argument!`);

   const profile = await SG.character.findOne({ ownerId: id }) ?? createNewGuildProfileFromID(message, id);
   if (!profile)
      return Promise.reject(`Unable to find or create guild profile! The user ${member} doesn't exist or is not in Deltrada!`);

   try {
      await profile.save();
   } catch(error) {
      return Promise.reject(error);
   }

   return Promise.resolve(profile);
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
   if (!C.dcCheckIfMember(member)) {
      console.log(`nie dziala : ${member}`);
      return;
   }

   //Main
   const profile = new SG.character({
      ownerId: member.id,
      ownerTag: member?.user.tag,
      ownerName: member.displayName,
   });

   profile.currencies = {
      amberDrops : C.rndNo0(10),
      pearlFlakes : C.rndNo0(10),
      obsidianChips : C.rndNo0(10),
      silverCoins : C.rndNo0(10),
      goldCoins : C.rndNo0(10),
      deltradaCoins : C.rndNo0(100),
   }

   return profile;
}

module.exports.createNewGuildProfile = createNewGuildProfile;

function createNewGuildProfileFromID(message, id) {
   const member = C.dcGetMemberByID(message, id);
   return createNewGuildProfile(member);
}


// OK---------------------------------------------------------------------------------------------------------------
function getMainProfileInfo(profile) {
   if (!checkIfProfile(profile))
      return;

   return `Profile of ${C.strBold(profile.ownerTag)}` +
          `\n--------------------------------------------------` + 
          `\n**ID**: ${profile.ownerId}` +
          `\n**Name**: ${profile.ownerName}` +
          `\n**Action Points**: ${profile.actionPoints.current}`;
}

module.exports.getMainProfileInfo = getMainProfileInfo;

// OK---------------------------------------------------------------------------------------------------------------
function getCurrenciesInfo(profile) {
   if (!checkIfProfile(profile))
      return;

   const currencies = profile.currencies;

   let msg = `Currencies of ${C.strBold(profile.ownerName)}` + 
             `\n--------------------------------------------------` +
             `\n**Amber Drops:** ${currencies.amberDrops}` +
             `\n**Pearl Flakes:** ${currencies.pearlFlakes}` +
             `\n**Obsidian Chips:** ${currencies.obsidianChips}` +
             `\n**Silver Coin:** ${currencies.silverCoins}` +
             `\n**Gold Coins:** ${currencies.goldCoins}` +
             `\n**Deltrada Coins:** ${currencies.deltradaCoins}`;

   return msg;
}

module.exports.getCurrenciesInfo = getCurrenciesInfo

// OK---------------------------------------------------------------------------------------------------------------
function getUserInfo(profile, argument) {
   let msg = '';

   if (C.strCompare(argument, 'currencies'))
      msg = getCurrenciesInfo(profile);
   else
      msg = getMainProfileInfo(profile);

   return msg;
}

module.exports.getUserInfo = getUserInfo;

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
