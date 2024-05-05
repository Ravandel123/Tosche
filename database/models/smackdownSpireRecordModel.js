const MG = require('mongoose');

const characterStatsSchema = new MG.Schema({
   // character: {
   //    type: MG.Schema.Types.ObjectId,
   //    ref: 'profile' //!!!Change to character later
   // },
   character: { type: String },
   wins: { type: Number, default: 0 },
   draws: { type: Number, default: 0 },
   losses: { type: Number, default: 0 }
});

const modeStatsSchema = new MG.Schema({
   eloRating: { type: Number, default: 500 },
   overallWins: { type: Number, default: 0 },
   overallDraws: { type: Number, default: 0 },
   overallLosses: { type: Number, default: 0 },
   characterStats: [characterStatsSchema]
});

const smackdownSpireRecordSchema = new MG.Schema({
   // controlledCharacter: {
   //    type: MG.Schema.Types.ObjectId, 
   //    ref: 'profile', //!!!Change to character later
   //    required: true
   // },
   controlledCharacter: { type: String },
   sparring: modeStatsSchema,
   duel: modeStatsSchema,
   clash: modeStatsSchema
});

const SmackdownSpireRecordModel = MG.model('SmackdownSpireRecord', smackdownSpireRecordSchema);

module.exports = SmackdownSpireRecordModel;