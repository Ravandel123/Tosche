const C = require('./common.js');
const AG = require('./arraysGuild.js');
const { gCharacter } = require('./guildSchematics.js');


//----------------------------------------------------------- PROFILES ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function gGetMsgAuthorProfile(message) {
   if (!C.dcCheckIfMessage(message))
      return Promise.reject(`Wrong input argument!`);

   let profile = await gCharacter.findOne({ ownerId: message.author.id });

   if (!profile) {
      try {
         profile = await createNewGuildProfile(message.member);
      } catch(error) {
         return Promise.reject(error);
      }
   }

   return new Promise(resolve => { resolve(profile); });
}

module.exports.gGetMsgAuthorProfile = gGetMsgAuthorProfile;

// OK---------------------------------------------------------------------------------------------------------------
async function gGetProfileById(message, id) {
   if (!C.dcCheckIfMessage(message) || !id)
      return Promise.reject(`Wrong input argument!`);

   let profile = await gCharacter.findOne({ ownerId: id });

   if (!profile) {
      const member = C.dcGetMemberByID(message.guild, id);
      if (member) {
         try {
            profile = await createNewGuildProfile(member);
         } catch(error) {
            return Promise.reject(error);
         }
      } else {
         return Promise.reject(`The user doesn't exist or is not in Deltrada!`);
      }
   }

   return new Promise(resolve => { resolve(profile); });
}

module.exports.gGetProfileById = gGetProfileById;

// OK---------------------------------------------------------------------------------------------------------------
async function gGetColGuildChar() {
   return await gCharacter;
}

module.exports.gGetColGuildChar = gGetColGuildChar;

// OK---------------------------------------------------------------------------------------------------------------
async function gGetAllProfiles() {
   return await gCharacter.find({});
}

module.exports.gGetAllProfiles = gGetAllProfiles;

// ---------------------------------------------------------------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function gModifyActionPointsForAll(amount) {
   const guildProfiles = await gGetColGuildChar();
   await guildProfiles.updateMany({}, {$inc: {"actionPoints.current" : amount, "actionPoints.totalEarned" : amount}});
}

module.exports.gModifyActionPointsForAll = gModifyActionPointsForAll;

// OK---------------------------------------------------------------------------------------------------------------
async function createNewGuildProfile(user) {
   if (!C.dcCheckIfMember(user))
      return Promise.reject(`Unable to create guild profile! The user is not a valid guild member: \n${user}`);

   let currencyAmount;

   //Main
   const profile = new gCharacter({
      ownerId: user.id,
      ownerTag: user?.user.tag,
      ownerName: user.displayName,
   });

   profile.currencies = {
      amberDrops : C.rndNo0(10),
      pearlFlakes : C.rndNo0(10),
      obsidianChips : C.rndNo0(10),
      silverCoins : C.rndNo0(10),
      goldCoins : C.rndNo0(10),
      deltradaCoins : C.rndNo0(100),
   }

   try {
      await profile.save().catch(err => console.log(err));
   } catch(error) {
      return Promise.reject(error);
   }

   return new Promise(resolve => { resolve(profile); });
}

module.exports.createNewGuildProfile = createNewGuildProfile;

// ---------------------------------------------------------------------------------------------------------------