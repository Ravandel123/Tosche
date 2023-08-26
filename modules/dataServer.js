
//----------------------------------------------------------- IDS ----------------------------------------------------------
const ownerID = '392728479696814092';
const botID = '553959824577134593';
const serverID = '553933942193913856';


//----------------------------------------------------------- CHANNELS ----------------------------------------------------------
const channelPrison1 = 'detainee-quarters';
const channelPrison2 = 'prison';
const channelPrison3 = 'the-dark-cell';

//----------------------------------------------------------- ROLES ----------------------------------------------------------
const roleDefault = 'Comrade';
const roleGuard = 'Guard';

const rolePrisoner1 = 'Detainee';
const rolePrisoner2 = 'Prisoner';
const rolePrisoner3 = 'Chained Inmate';
const rolePrisoners = rolePrisoner1.concat(rolePrisoner2, rolePrisoner3);



//----------------------------------------------------------- Exports ----------------------------------------------------------
module.exports = {
   ownerID,
   botID,
   serverID,

   channelPrison1,
   channelPrison2,
   channelPrison3,

   roleDefault,
   roleGuard,
   rolePrisoner1,
   rolePrisoner2,
   rolePrisoner3,
   rolePrisoners
};