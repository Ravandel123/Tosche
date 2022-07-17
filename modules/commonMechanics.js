const C = require('./common.js');
const AG = require('./arraysGuild.js');
const CG = require('./commonGuild.js');


//----------------------------------------------------------- CONSTANTS ----------------------------------------------------------
const HP_PER_T = 10;
const HP_PER_S = 5;
const HP_PER_WP = 5;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------- ARRAYS -----------------------------------------------------------
const arrayHitLocations = C.arrGetPopulatedFrom2D(AG.bodyLocations);


// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- ATTRIBUTES ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function getStrengthBonus(profile) {
   if (C.checkIfProfile(profile))
      return Math.floor(profile.attributes.strength / 10);
}

module.exports.getStrengthBonus = getStrengthBonus;

// OK---------------------------------------------------------------------------------------------------------------
function getToughnessBonus(profile) {
   if (C.checkIfProfile(profile))
      return Math.floor(profile.attributes.toughness / 10);
}

module.exports.getToughnessBonus = getToughnessBonus;

function getWillpowerBonus(profile) {
   if (C.checkIfProfile(profile))
      return Math.floor(profile.attributes.willpower / 10);
}

module.exports.getWillpowerBonus = getWillpowerBonus;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- COMBAT -----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function rollDice() {
   let result = {};
   result.roll = C.rndNo0(100);
   result.isDouble = isDouble(result.roll);

   return result;
}

// OK---------------------------------------------------------------------------------------------------------------
function isDouble(value) {
   return value == 100 || value % 10 == Math.floor(value / 10);
}

// OK---------------------------------------------------------------------------------------------------------------
function getHitLocation() {
   return C.arrGetRandom(arrayHitLocations);
}

module.exports.getHitLocation = getHitLocation;

// OK---------------------------------------------------------------------------------------------------------------
function getSL(skill, roll) {
   const difference = (skill - roll) / 10;
   return difference > 0 ? Math.floor(difference) : Math.ceil(difference);
}

// OK---------------------------------------------------------------------------------------------------------------
function combat(user1, user2) {
   const u1Roll = rollAttack();
   const u2Roll = rollAttack();

   const u1WS = getSkillWeapon(user1, 'unarmed'); //change to get from currently equipped weapon
   const u2WS = getSkillWeapon(user2, 'unarmed'); //change to get from currently equipped weapon

   const u1SL = getSL(u1WS, u1Roll.roll);
   const u2SL = getSL(u2WS, u2Roll.roll);

   let result = {};
   if (u1SL === 0 && u2SL === 0) {
      const u1PositiveZero = C.checkIfNumberIsPositive(u1SL);
      const u2PositiveZero = C.checkIfNumberIsPositive(u2SL);

      result.wasSuccessful = u1PositiveZero != u2PositiveZero ? u1PositiveZero : u1WS != u2WS ? u1WS > u2WS : false;
   } else if (u1SL == u2SL) {
      result.wasSuccessful = u1WS != u2WS ? u1WS > u2WS : false;
   } else {
      result.wasSuccessful = u1SL > u2SL;
   }

   result.SL = result.wasSuccessful ? u1SL - u2SL : u2SL - u1SL;

   return result;
}

module.exports.combat = combat;

// OK---------------------------------------------------------------------------------------------------------------
function calculateDamage(SL, attacker, defender) {
   const finalDmg = SL + getStrengthBonus(attacker) - getToughnessBonus(defender); //add armor bonus, weapon bonus etc
   return finalDmg < 0 ? 0 : finalDmg;
}

module.exports.calculateDamage = calculateDamage;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- RESOURCES ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function getMaxHp(profile) {
   if (!C.checkIfProfile(profile))
      return;

   return getStrengthBonus(profile) * HP_PER_S + getWillpowerBonus(profile) * HP_PER_WP + getToughnessBonus(profile) * HP_PER_T;
}

module.exports.getMaxHp = getMaxHp;

// OK---------------------------------------------------------------------------------------------------------------
function regenerateHourlyHp(profile) {
   if (!C.checkIfProfile(profile))
      return;

   const maxHp = getMaxHp(profile);
   const currentHp = profile.resources.hp;
   const hourlyHpRegen = getToughnessBonus(profile) * 2;

   profile.resources.hp = currentHp + hourlyHpRegen < maxHp ? currentHp + hourlyHpRegen : maxHp;
}

module.exports.regenerateHourlyHp = regenerateHourlyHp;


// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- WEAPON SKILLS ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function getSkillWeapon(profile, weaponSkillName) {
   if (!C.checkIfProfile(profile) || !C.strCheckIfAnyMatch(weaponSkillName, AG.weaponTypes))
      return;

   return profile.weaponSkills.melee.current + profile.weaponSkills[weaponSkillName].current;
}

module.exports.getSkillWeapon = getSkillWeapon;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------