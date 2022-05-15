const C = require('./common.js');
const SG = require('./schematicsGuild.js');
const MG = require('mongoose');

//----------------------------------------------------------- CHECKERS ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function checkIfMongooseModel(value){
   return value.hasOwnProperty('schema') && value.schema instanceof MG.Schema;
}

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- INSERT MANY ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function insertMany(model, dataToInsert) {
   if (!checkIfMongooseModel(model) || !C.checkIfExists(dataToInsert))
      return Promise.reject(`Wrong input argument!`);

   try {
      const res = await model.insertMany(dataToInsert);
      return res.length > 0 ? Promise.resolve(`Successfully inserted ${res.length} documents.`) : Promise.reject(`No document was inserted!`);
   } catch(error) {
      return Promise.reject(error);
   }
}

module.exports.insertMany = insertMany;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- UPDATE MANY ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function updateMany(model, filter, updateQuery) {
   if (!checkIfMongooseModel(model) || !C.checkIfExists(dataToInsert))
      return Promise.reject(`Wrong input argument!`);

   try {
      const res = await model.updateMany(filter, updateQuery);
      console.log(`res.matchedCount = ${res.matchedCount}`);
      console.log(`res.modifiedCount = ${res.modifiedCount}`);
      console.log(`res.acknowledged = ${res.acknowledged}`);
      console.log(`res.upsertedId = ${res.upsertedId}`);
      console.log(`res.upsertedCount = ${res.upsertedCount}`);
      // return res.length > 0 ? Promise.resolve(`Successfully updated the documents.`) : Promise.reject(`No document was updated!`);
   } catch(error) {
      return Promise.reject(error);
   }
}

module.exports.updateMany = updateMany;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- FIND ----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function findOne(model, filter) {
   if (!checkIfMongooseModel(model) || !C.checkIfObject(filter))
      return Promise.reject(`Wrong input argument!`);

   return Promise.resolve(await model.findOne(filter));
}

module.exports.findOne = findOne;

// ---------------------------------------------------------------------------------------------------------------
