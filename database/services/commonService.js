/**
 * Generic find document by ID
 */
async function findById(model, id) {
   try {
      const result = await model.findById(id);
      if (!result) {
         throw new Error('Document not found!');
      }
      return result;
   } catch (error) {
      console.error('Error finding document:', error);
      throw error;
   }
}

/**
 * Generic create document
 */
async function createDocument(model, data) {
   try {
      const document = new model(data);
      await document.save();
      return document;
   } catch (error) {
      console.error('Error creating document:', error);
      throw error;
   }
}

/**
 * Generic update document
 */
async function updateDocument(model, id, updates) {
   try {
      const result = await model.findByIdAndUpdate(id, updates, { new: true });
      if (!result) {
         throw new Error('Document not found');
      }
      return result;
   } catch (error) {
      console.error('Error updating document:', error);
      throw error;
   }
}

/**
 * Generic delete document
 */
async function deleteDocument(model, id) {
   try {
      const result = await model.findByIdAndDelete(id);
      if (!result) {
         throw new Error('Document not found');
      }
      return result;
   } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
   }
}

module.exports = {
   findById,
   createDocument,
   updateDocument,
   deleteDocument
};