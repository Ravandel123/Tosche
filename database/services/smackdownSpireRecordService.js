const SmackdownSpireRecord = require('../models/smackdownSpireRecordModel');
const commonService = require('./commonService');

async function getSmackdownSpireRecordById(id) {
   return commonService.findById(SmackdownSpireRecord, id);
}

async function createSmackdownSpireRecord(data) {
   return commonService.createDocument(SmackdownSpireRecord, data);
}

async function updateSmackdownSpireRecord(id, updates) {
   return commonService.updateDocument(SmackdownSpireRecord, id, updates);
}

async function deleteSmackdownSpireRecord(id) {
   return commonService.deleteDocument(SmackdownSpireRecord, id);
}

async function findOrCreateSmackdownSpireRecord(characterId) {
   try {
      let smackdownSpireRecordDocument = await SmackdownSpireRecord.findOne({ controlledCharacter: characterId });

      if (!smackdownSpireRecordDocument) {
         const newDocument = new SmackdownSpireRecord({
            controlledCharacter: characterId,
            sparring: {},
            duel: {},
            clash: {}
         });
         smackdownSpireRecordDocument = await createSmackdownSpireRecord(newDocument);
      }

      return smackdownSpireRecordDocument;
   } catch (error) {
      console.error('Error finding or creating SmackdownSpireRecord document: ', error);
      throw error;
   }
}

async function updateEloRating(recordId, mode, newRating) {
   const update = {};
   update[`${mode}.eloRating`] = newRating;

   return SmackdownSpireRecord.findByIdAndUpdate(recordId, update, { new: true });
}

module.exports = {
   getSmackdownSpireRecordById,
   createSmackdownSpireRecord,
   updateSmackdownSpireRecord,
   deleteSmackdownSpireRecord,
   findOrCreateSmackdownSpireRecord,
   updateEloRating
};
