const SETTINGS = require('./serverSettings.js');
const C = require('./common.js');

const R = require('./responses.js');

"use strict";

//----------------------------------------------------------- MAIN -----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
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
         return C.dcReplyToMsg(message, `That's not a valid command!`);

      data = `**Name:** ${command.name}\n`;

      if (command.aliases)
         data += `**Aliases:** ${command.aliases.join(', ')}\n`;
      if (command.description)
         data += `**Description:** ${command.description}\n`;
      if (command.requirements)
         data += `**Requirements:** ${command.requirements}\n`;
      if (command.cooldown)
         data += `**Cooldown:** ${command.cooldown}\n`;
      if (command.usage)
         data += `**Usage:** ${prefix}${command.name} ${command.usage}\n`;
      if (command.example) {
         const exampleTemplate = `**Example:** ${prefix}${command.name} `;
         data += exampleTemplate + (C.checkIfArray(command.example) ? command.example.join(`\n${exampleTemplate}`) : `${command.example}\n`);
      }

      C.dcRespondToMsg(message, data);
   }
}

module.exports.showCommands = showCommands;

//------------------------------------------------------------------------------------------------------------------
function dcValidateForBannedWords(message) {
   if (!C.dcCheckIfMessage(message))
      return;

   const messageContent = C.strToLowerCase(message.content);
   const messageText = C.strRemoveAllSpecialChars(messageContent);
   if (C.strCheckIfContainsAny([messageContent, messageText], SETTINGS.bannedWords)) {
      C.dcRespondToMsg(message, `Oops, it looks like you said a forbidden word ${message.author}!`);
      message.delete();
      return false;
   }

   return true;
}

module.exports.dcValidateForBannedWords = dcValidateForBannedWords;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



//----------------------------------------------------------- CHECKERS -----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------------------------------
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


//----------------------------------------------------------- MAIN -----------------------------------------------------------
// showCommands(commands, message, commandName, prefix, groupName)
// dcValidateForBannedWords(message)

//----------------------------------------------------------- CHECKERS -----------------------------------------------------------
// checkArgsAmount(message, args, requiredArgs)
// checkIfArgIsNumber(message, argument)
// checkIfArgIsNaturalNumber(message, argument)
// checkIfArgIsNaturalNumberInScope(message, argument, min, max)
