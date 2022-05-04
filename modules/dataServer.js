
//----------------------------------------------------------- IDS ----------------------------------------------------------
const ownerID = '392728479696814092';
const botID = '553959824577134593';
const serverID = '553933942193913856';


//----------------------------------------------------------- CHANNELS ----------------------------------------------------------
const channelPrison1 = { name: 'detainee-quarters', id: '1142435056586084463' };
const channelPrison2 = { name: 'prison', id: '1142435088613777489' };
const channelPrison3 = { name: 'the-dark-cell', id: '1142435118577889382' };

//----------------------------------------------------------- ROLES ----------------------------------------------------------
const roleBot = 'Useful Tool';
const roleDefault = 'Comrade';
const roleGuard = 'Guard';

const rolePrisoner1 = 'Detainee';
const rolePrisoner2 = 'Prisoner';
const rolePrisoner3 = 'Chained Inmate';
const rolePrisoners = [rolePrisoner1, rolePrisoner2, rolePrisoner3];



//----------------------------------------------------------- Exports ----------------------------------------------------------
module.exports = {
   ownerID,
   botID,
   serverID,

   channelPrison1,
   channelPrison2,
   channelPrison3,

   roleBot,
   roleDefault,
   roleGuard,
   rolePrisoner1,
   rolePrisoner2,
   rolePrisoner3,
   rolePrisoners
};