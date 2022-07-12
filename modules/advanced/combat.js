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
   result.roll = rndNo0(100);
   result.isCrit = isCritical(result.roll);

   return result;
}

// OK---------------------------------------------------------------------------------------------------------------
function isCritical(value) {
   return value == 100 || value % 10 == Math.floor(value / 10);
}

// OK---------------------------------------------------------------------------------------------------------------
function getSL(skill, roll) {
   const difference = (skill - roll) / 10;
   return difference > 0 ? Math.floor(difference) : Math.ceil(difference);
}

function combat(user1, user2) {
   const u1Roll = rollAttack();
   const u2Roll = rollAttack();

   const u1WS = CG.getSkillWeapon(user1, 'unarmed'); //change to get from currently equipped weapon
   const u2WS = CG.getSkillWeapon(user2, 'unarmed'); //change to get from currently equipped weapon

   const u1SL = getSL(u1WS, u1Roll);
   const u2SL = getSL(u2WS, u2Roll);

   let attackSucceeded;
   if (u1SL === 0 && u2SL === 0) {
      const u1PositiveZero = C.checkIfNumberIsPositive(u1SL);
      const u2PositiveZero = C.checkIfNumberIsPositive(u2SL);

      attackSucceeded = u1PositiveZero != u2PositiveZero ? u1PositiveZero : u1WS != u2WS ? u1WS > u2WS : false;
   } else if (u1SL == u2SL) {
      attackSucceeded = u1WS != u2WS ? u1WS > u2WS : false;
   } else {
      attackSucceeded = u1SL > u2SL;
   }

   let result = {};
   result.SL = attackSucceeded ? u1SL - u2SL : u2SL - u1SL;

   return result;
}





   //wygrywa ten kto ma wiecej WS jak jest ten sam SL




   // var wsRoll1, wsRoll2, dmgRoll1, dmgRoll2, finalDmg, testSucceeded, successLevel1, successLevel2, testResult1, testResult2, attackSucceeded, hitLocation, msg

   // var character1 = (arguments[1] != null && arguments[1] != ' ') ? arguments[1] : 'you'
   // var ws1 = (arguments[2] != null && arguments[2] != ' ') ? arguments[2] : RndNo0(100)
   // var character2 = (arguments[3] != null && arguments[3] != ' ') ? arguments[3] : 'the enemy'
   // var ws2 = (arguments[4] != null && arguments[4] != ' ') ? arguments[4] : RndNo0(100)

   // wsRoll1 = Roll100()
   // wsRoll2 = Roll100()

   // testResult1 = ws1 - wsRoll1
   // testResult2 = ws2 - wsRoll2
   
   // testSucceeded = testResult1 > 0

   // successLevel1 = GetSuccessLevel(testResult1)
   // successLevel2 = GetSuccessLevel(testResult2)

   // if(successLevel1 == successLevel2) {
     // if(ws1 == ws2)
       // attackSucceeded = testResult1 == testResult2 ? chance(50) : testResult1 > testResult2
     // else
       // attackSucceeded = ws1 > ws2
   // } else {
     // attackSucceeded = successLevel1 > successLevel2
   // }

   // if(attackSucceeded) {
     // hitLocation = arrGetRandomFromPopulated1D(hitLocationsList)
     
     // dmgRoll1 = RndNo0(6)
     // dmgRoll2 = RndNo0(6)

     // finalDmg = testSucceeded ? Math.max(dmgRoll1, dmgRoll2) : Math.min(dmgRoll1, dmgRoll2)
     
     // if(strCompare(hitLocation, 'head'))
       // finalDmg = finalDmg * 2

     // msg = '**' + strCapitalizeFirstLetter(character1) + ' hit ' + character2 + ' in the ' + hitLocation + ' for ' + finalDmg + ' damage!**\n\n' +
     // '*' + strCapitalizeFirstLetter(character1) + ' rolled ' + wsRoll1 + ' against ' + ws1 + ' (SL: ' + successLevel1 + ')*\n' +
     // '*' + strCapitalizeFirstLetter(character2) + ' rolled ' + wsRoll2 + ' against ' + ws2 + ' (SL: ' + successLevel2 + ')*'
   // } else {
     // msg = '**' + strCapitalizeFirstLetter(character1) + ' missed!**\n\n' +
     // '*' + strCapitalizeFirstLetter(character1) + ' rolled ' + wsRoll1 + ' against ' + ws1 + ' (SL: ' + successLevel1 + ')*\n' +
     // '*' + strCapitalizeFirstLetter(character2) + ' rolled ' + wsRoll2 + ' against ' + ws2 + ' (SL: ' + successLevel2 + ')*'
   // }

   // message.channel.send(msg)
// }


// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------