const C = require("./../common.js");

//----------------------------------------------------------- ARRAYS -----------------------------------------------------------
const arrHitLocations = [
   ['head', 14],
   ['torso', 42],
   ['primary arm', 10],
   ['primary hand', 9],
   ['secondary arm', 6],
   ['secondary hand', 5],
   ['right thigh', 4],
   ['right foot', 3],
   ['left thigh', 4],
   ['left foot', 3]
]

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- MAIN -----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function rollAttack() {
   let roll1 = C.rndNo0();
   let roll2 = C.rndNo0();

   const isCrit = roll1 == roll2;




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
}

module.exports.showCommands = showCommands;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------