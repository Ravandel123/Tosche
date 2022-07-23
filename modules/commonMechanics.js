const C = require('./common.js');
const AG = require('./arraysGuild.js');


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
function getHitLocation() {
   return C.arrGetRandom(arrayHitLocations);
}

module.exports.getHitLocation = getHitLocation;

// OK---------------------------------------------------------------------------------------------------------------
function combat(user1, user2) {
   const u1WS = getSkillWeapon(user1, 'unarmed'); //change to get from currently equipped weapon
   const u2WS = getSkillWeapon(user2, 'unarmed'); //change to get from currently equipped weapon

   return opposedRolls(u1WS, u2WS);
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
   const currentHp = profile.resources.health;
   const hourlyHpRegen = getToughnessBonus(profile) * 2;

   profile.resources.health = currentHp + hourlyHpRegen < maxHp ? currentHp + hourlyHpRegen : maxHp;
}

module.exports.regenerateHourlyHp = regenerateHourlyHp;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- TESTS AND ROLLS ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function opposedRolls(value1, value2) {
   const u1Roll = rollDice();
   const u2Roll = rollDice();

   const u1SL = getSL(value1, u1Roll.roll);
   const u2SL = getSL(value2, u2Roll.roll);

   let result = {};
   if (u1SL === 0 && u2SL === 0) {
      const u1PositiveZero = C.checkIfNumberIsPositive(u1SL);
      const u2PositiveZero = C.checkIfNumberIsPositive(u2SL);

      result.wasSuccessful = u1PositiveZero != u2PositiveZero
                              ? u1PositiveZero
                              : value1 != value2
                                 ? value1 > value2
                                 : true;
   } else if (u1SL == u2SL) {
      result.wasSuccessful = value1 != value2 ? value1 > value2 : true;
   } else {
      result.wasSuccessful = u1SL > u2SL;
   }

   result.SL = result.wasSuccessful ? u1SL - u2SL : u2SL - u1SL;

   return result;
}

module.exports.combat = combat;

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
function getSL(skill, roll) {
   const difference = (skill - roll) / 10;
   return difference > 0 ? Math.floor(difference) : Math.ceil(difference);
}

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- WEAPON SKILLS ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function getSkillWeapon(profile, weaponSkillName) {
   if (!C.checkIfProfile(profile) || !C.strCheckIfAnyMatch(weaponSkillName, AG.weaponTypes))
      return;

   return profile.skills.weapon.melee.current + profile.skills.weapon[weaponSkillName].current;
}

module.exports.getSkillWeapon = getSkillWeapon;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------