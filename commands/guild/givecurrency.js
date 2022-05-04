const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');
const CC = require('../../modules/commonCommands.js');
const R = require('../../modules/responses.js');
const DB = require('../../modules/db.js');

module.exports = {
   name: 'givecurrency',
   description: 'Gives a certain amount of the specified currency to another user. ' +
   'You must either enter the currency name without spaces or use an alias using the first letters of the currency.',
   usage: '[user mention] [name of the currency] [amount]',
   example: `<@!392728479696814092>` + ' silvercoins 5',
   otherexample: `<@!392728479696814092>` + ' sc 5',
   async execute(message, args) {
      const requiredArgs = ['user name', 'name of the currency', 'amount'];
      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      let ownerProfile, ownerCurrency, targetProfile, targetCurrency;
      let amountToGive = args[3];

      const currency = CG.getCurrencyObject(args[2]);
      if (!currency) {
         C.dcRespondFromArray(message, R.resIssue(`${args[2]} isn't a legit currency`));
         return;
      }

      if (!CC.checkIfArgIsNaturalNumberInScope(message, amountToGive, 1, 1000000))
         return;

      amountToGive = C.convertToInt(amountToGive);

      const targetID = CC.getUserFromNameOrMention(message, args[1]);
      if (!targetID)
         return;

      try {
         ownerProfile = await DB.gGetMsgAuthorProfile(message);
         targetProfile = await DB.gGetProfileById(message, targetID);
      } catch(error) {
         C.dcRespondToMsg(message, error);
         return;
      }

      if (ownerProfile.ownerId == targetProfile.ownerId) {
         C.dcRespondFromArray(message, R.resIssue(`You cannot give money to yourself`));
         return;
      }

      if (!CG.transferCurrency(message, ownerProfile, targetProfile, amountToGive, currency))
         return;

      try {
         await ownerProfile.save();
         await targetProfile.save();
      } catch(error) {
         C.dcRespondToMsg(message, error);
         return;
      }

      C.dcRespondToMsg(message, `You gave ${amountToGive} ${currency.name} to ${targetProfile.ownerName}.`);
   },
}