const C = require('./common.js');
const AG = require('./arraysGuild.js');
const SG = require('./schematicsGuild.js');


//----------------------------------------------------------- PROFILES ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function gGetColGuildChar() {
   return await SG.character;
}

module.exports.gGetColGuildChar = gGetColGuildChar;

OK---------------------------------------------------------------------------------------------------------------
// async function gGetAllProfiles() {
   // return await SG.character.find({});
// }

// module.exports.gGetAllProfiles = gGetAllProfiles;

// ---------------------------------------------------------------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function gModifyActionPointsForAll(amount) {
   // const guildProfiles = await gGetColGuildChar();
   // await guildProfiles.updateMany({}, {$inc: {"actionPoints.current" : amount, "actionPoints.totalEarned" : amount}});
   await SG.character.updateMany({}, {$inc: {"actionPoints.current" : amount, "actionPoints.totalEarned" : amount}});
}

module.exports.gModifyActionPointsForAll = gModifyActionPointsForAll;



// ---------------------------------------------------------------------------------------------------------------