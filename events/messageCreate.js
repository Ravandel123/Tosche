const C = require("../modules/common.js");
const R = require('../modules/responses.js');
const AC = require("../modules/arraysCommon.js");
const { Collection } = require('discord.js');
const {
   prefix,
   prefixRP,
   prefixG,
   prefixM,
   ownerID,
} = require('../config.json');

const cooldowns = new Collection();

module.exports = {
   name: 'messageCreate',
   async execute(message, client) {
      try {
         if (message.author.bot)
            return;

         if (!C.dcValidateForBannedWords(message))
            return;

         let prefixLength, commandName, command, commands, arguments;

         if (message.content.startsWith(prefix)) {
            prefixLength = prefix.length;
         } else if (message.content.startsWith(prefixG)) {
            if (message.guildId != '553933942193913856') {
               C.dcReplyToMsg(message, `You can only use guild commands on Deltrada!`);
               return;
            }
            prefixLength = prefixG.length;
         } else if (message.content.startsWith(prefixRP)) {
            if (message.guildId != '553933942193913856') {
               C.dcReplyToMsg(message, `You can only use role playing commands on Deltrada!`);
               return;
            }
            prefixLength = prefixRP.length;
         } else if (message.content.startsWith(prefixM) && message.author.id == ownerID) {
            prefixLength = prefixM.length;
         } else {
            defaultBehavior(message);
            return;
         }

         commandName = message.content.slice(prefixLength).trim().split(/ +/g);
         commandName = commandName.shift().toLowerCase();
         arguments = message.content.split(/[ ]+/);

         if (message.content.startsWith(prefix))
            commands = client.commands;
         else if (message.content.startsWith(prefixG))
            commands = client.commandsG;
         else if (message.content.startsWith(prefixRP))
            commands = client.commandsRP;
         else if (message.content.startsWith(prefixM) && message.author.id == ownerID)
            commands = client.commandsM;

         if (commands)
            command = commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

         if (!command)
            return;

         if (!cooldowns.has(command.name))
            cooldowns.set(command.name, new Collection());

         const now = Date.now();
         const timestamps = cooldowns.get(command.name);
         const cooldownAmount = (command.cooldown || 0.5) * 1000;

         if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
               const timeLeft = (expirationTime - now) / 1000;
               return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
         }

         timestamps.set(message.author.id, now);
         setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

         try {
            command.execute(message, arguments);
         } catch (error) {
            console.error(error);
            C.dcReplyToMsg(message, `There was an error trying to execute that command!`);
         }
      } catch(err) {
         console.error(err);
      }
   }
}

function defaultBehavior(message) {
   const msgContent = message.content.toLowerCase();

   if (C.strCheckIfContains(msgContent, 'clovis'))
      message.react('😢');

   if (C.strCheckIfContains(msgContent, 'tosch'))
      C.chance(65) ? C.dcRespondToMsg(message, C.arrGetRandom(R.resYou())) : C.dcRespondToMsg(message, C.arrGetRandom(R.resHate()));
}
