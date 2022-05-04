const C = require('./common.js');
const R = require('./responses.js');

//----------------------------------------------------------- MAIN -----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
async function showCommands(commands, message, commandName, prefix, groupName) {
   let data;

   if (!commandName) {
      data = `Here's a list of all ${groupName} commands:\n`;
      data += commands.map(command => command.name).join(', ');
      data += `\nYou can send \`${prefix}commands [command name]\` to get info on a specific command.`;

      C.dcReplyToMsg(message, data);
   } else {
      const name = commandName.toLowerCase();
      const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

      if (!command)
         return C.dcReplyToMsg(message, `that's not a valid command!`);

      data = `**Name:** ${command.name}\n`;

      if (command.aliases) data += `**Aliases:** ${command.aliases.join(', ')}\n`;
      if (command.cooldown) data += `**Cooldown:** ${command.cooldown}\n`;
      if (command.description) data += `**Description:** ${command.description}\n`;
      if (command.usage) data += `**Usage:** ${prefix}${command.name} ${command.usage}\n`;
      if (command.example) data += `**Example 1:** ${prefix}${command.name} ${command.example}\n`;
      if (command.otherexample) data += `**Example 2:** ${prefix}${command.name} ${command.otherexample}\n`;

      C.dcRespondToMsg(message, data);
   }
}

module.exports.showCommands = showCommands;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- GETTERS -----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function getUserFromNameOrMention(message, string) {
   let userID = C.dcGetMemberIDFromMention(string);

   if (!userID) {
      const members = C.dcGetAllMembersByNick(message, string);
      if (checkFoundMembers(message, members))
         userID = members.at(0).id;
   }

   return userID;
}

module.exports.getUserFromNameOrMention = getUserFromNameOrMention;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- CHECKERS -----------------------------------------------------------
// OK---------------------------------------------------------------------------------------------------------------
function checkFoundMembers(message, membersCollection) {
   if (!C.dcCheckIfCollection(membersCollection))
      return;

   const membersAmount = membersCollection.size;

   if (membersAmount == 0) {
      C.dcReplyToMsg(message, `No users found!`);
   } else if (membersAmount > 1) {
      let msg = `Found more than 1 user!\nUsers found: `;
      const memberNames = membersCollection.map(e => e.displayName);

      memberNames.forEach(e => msg += `${e}; `);

      C.dcSendMsg(message, msg, 'reply');
   } else {
      return true;
   }
}

module.exports.checkFoundMembers = checkFoundMembers;

// OK---------------------------------------------------------------------------------------------------------------
function checkArgsAmount(message, args, requiredArgs) {
   if (!C.checkIfArray(args) || !C.checkIfArray(requiredArgs))
      return;

   const missingArgs = [];
   let isOK = true;

   for (let i = 0; i < requiredArgs.length; i++)
      if (!args[i + 1]) {
         missingArgs.push(requiredArgs[i]);
         isOK = false;
      }

   if (!isOK)
      C.dcRespondFromArray(message, R.resMissingArgs(missingArgs));

   return isOK;
}

module.exports.checkArgsAmount = checkArgsAmount;

// OK---------------------------------------------------------------------------------------------------------------
function checkIfArgIsNumber(message, argument) {
   if (!C.dcCheckIfMessage(message))
      return;

   let isOK = false;

   if (!C.checkIfNumber(argument))
      C.dcSendMsg(message, `${argument} is not a number!`, 'reply');
   else
      isOK = true;

   return isOK;
}

module.exports.checkIfArgIsNumber = checkIfArgIsNumber;

// OK---------------------------------------------------------------------------------------------------------------
function checkIfArgIsNaturalNumber(message, argument) {
   if (!C.dcCheckIfMessage(message))
      return;

   let isOK = false;

   if (!C.checkIfNaturalNumber(argument))
      C.dcSendMsg(message, `${argument} is not a natural number!`, 'reply');
   else
      isOK = true;

   return isOK;
}

module.exports.checkIfArgIsNaturalNumber = checkIfArgIsNaturalNumber;

// OK---------------------------------------------------------------------------------------------------------------
function checkIfArgIsNaturalNumberInScope(message, argument, min, max) {
   if (!C.dcCheckIfMessage(message))
      return;

   let isOK = false;

   if (!C.checkIfNaturalNumberInScope(argument, min, max))
      C.dcSendMsg(message, `${argument} is not a natural number between ${min} and ${max}!`, 'reply');
   else
      isOK = true;

   return isOK;
}

module.exports.checkIfArgIsNaturalNumberInScope = checkIfArgIsNaturalNumberInScope;
// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------