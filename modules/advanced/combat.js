const C = require('./../common.js');
const AG = require('./../arraysGuild.js');
const CG = require('./../commonGuild.js');

//----------------------------------------------------------- ARRAYS -----------------------------------------------------------
const arrayHitLocations = C.arrGetPopulatedFrom2D(AG.bodyLocations);

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- MAIN -----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function rollAttack() {
   let result = {};
   result.roll = C.rndNo0(100);
   result.isCrit = isCritical(result.roll);

   return result;
}

// OK---------------------------------------------------------------------------------------------------------------
function isCritical(value) {
   return value == 100 || value % 10 == Math.floor(value / 10);
}

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
                                                                                                         console.log(`u1Roll: ${u1Roll}`);
                                                                                                         console.log(`u2Roll: ${u2Roll}`);
   const u1WS = CG.getSkillWeapon(user1, 'unarmed'); //change to get from currently equipped weapon
   const u2WS = CG.getSkillWeapon(user2, 'unarmed'); //change to get from currently equipped weapon
                                                                                                         console.log(`u1WS: ${u1WS}`);
                                                                                                         console.log(`u2WS: ${u2WS}`);
   const u1SL = getSL(u1WS, u1Roll.roll);
   const u2SL = getSL(u2WS, u2Roll.roll);
                                                                                                         console.log(`u1SL: ${u1SL}`);
                                                                                                         console.log(`u2SL: ${u2SL}`);
   let result = {};
   if (u1SL === 0 && u2SL === 0) {
      const u1PositiveZero = C.checkIfNumberIsPositive(u1SL);
      const u2PositiveZero = C.checkIfNumberIsPositive(u2SL);

      result.attackSucceeded = u1PositiveZero != u2PositiveZero ? u1PositiveZero : u1WS != u2WS ? u1WS > u2WS : false;
   } else if (u1SL == u2SL) {
      result.attackSucceeded = u1WS != u2WS ? u1WS > u2WS : false;
   } else {
      result.attackSucceeded = u1SL > u2SL;
   }

   result.SL = result.attackSucceeded ? u1SL - u2SL : u2SL - u1SL;

   return result;
}

module.exports.combat = combat;

// OK---------------------------------------------------------------------------------------------------------------
function calculateDamage(SL, attacker, defender) {
   const finalDmg = SL + CG.getStrengthBonus(attacker) - CG.getToughnessBonus(defender); //add armor bonus, weapon bonus etc
   return finalDmg < 0 ? 0 : finalDmg;
}

module.exports.calculateDamage = calculateDamage;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------