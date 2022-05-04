const C = require('./common.js');
const SG = require('./schematicsGuild.js');
const MG = require('mongoose');

//----------------------------------------------------------- CHECKERS ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function checkIfMongooseModel(value){
   return value.hasOwnProperty('schema') && value.schema instanceof MG.Schema;
}

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- INSERT MANY ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
async function insertMany(model, dataToInsert) {
   if (!checkIfMongooseModel(model) || !C.checkIfExists(dataToInsert))
      return Promise.reject(`Wrong input argument!`);

   try {
      const res = await model.insertMany(dataToInsert);
      return res.length > 0 ? Promise.resolve(`Successfully inserted ${res.length} documents.`) : Promise.resolve(`No document was inserted!`);
   } catch(error) {
      return Promise.reject(error);
   }
}

module.exports.insertMany = insertMany;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- UPDATE MANY ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
async function updateMany(model, filter, updateQuery) {
   if (!checkIfMongooseModel(model) || !C.checkIfObject(filter) || !C.checkIfObject(updateQuery))
      return Promise.reject(`Wrong input argument!`);

   try {
      const res = await model.updateMany(filter, updateQuery);
      return res.modifiedCount > 0 ? Promise.resolve(`Successfully updated ${res.modifiedCount} documents.`) : Promise.resolve(`No document was updated!`);
   } catch(error) {
      return Promise.reject(error);
   }
}

module.exports.updateMany = updateMany;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- FIND ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
async function findOne(model, filter) {
   if (!checkIfMongooseModel(model) || !C.checkIfObject(filter))
      return Promise.reject(`Wrong input argument!`);

   return Promise.resolve(await model.findOne(filter));
}

module.exports.findOne = findOne;

// ---------------------------------------------------------------------------------------------------------------
