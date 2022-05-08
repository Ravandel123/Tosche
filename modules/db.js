const C = require('./common.js');
const AG = require('./arraysGuild.js');
const SG = require('./schematicsGuild.js');


//----------------------------------------------------------- CHECKERS ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function checkIfMongooseModel(value) {
   return value instanceof mongoose.Model;
}

module.exports.checkIfMongooseModel = checkIfMongooseModel;

// ---------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------- INSERT MANY ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function insertMany(collection, dataToInsert) {
   if (!checkIfMongooseModel(collection) || C.checkIfExists(dataToInsert))
      return Promise.reject(`Wrong input argument!`);

   const res = await collection.insertMany(dataToInsert);
   return res.length > 0 ? Promise.resolve(`Successfully inserted ${res.length} documents.`) : Promise.reject(`No document was inserted!`);
}

// ---------------------------------------------------------------------------------------------------------------