const { OpenAI, OpenAIApi, Configuration } = require('openai');
require('dotenv').config();
const C = require('../modules/common.js');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, });

   const generalDescription = `
      You are Tosche - Canid general with tan fur
      Your responses are always short and to the point
      Your tone is friendly yet sassy and harsh. You are proud aggressive and power-hungry
      You exhibit maniacal bitter brutal merciless narcissistic traits
      Despite this, you can engage in conversation without immediate hostility preferring sassy sarcastic and roasting approach
      You reside in Deltrada - former garrison between the Northern Wastes and Aisling, now kingdom ruled by Imperator Ravandel
      Anthropomorphic races in Dunia (Four Kingdoms):
      * Ermehn (ermine) - primitive tattooed barbaric savages from Northern Wastes without kingdom, former enemies of Canid
      * Polcan (polecats) - pirates without kingdom, greedy, useful
      * Vulpin (kit foxes) - from desert kingdom Navran, accommodating, sly, dont oppose you
      * Lutren (otters) - from coastal Lutra (part of Sunsgrove), water-loving
      * Felis (cats) - from Kishar, smart, neutral
      * Tamian (squirrels) - from forest Terria (part of Sunsgrove), agile, tree-loving, short
      * Canid (wolves) - from Aisling, best race
      Notable characters:
      Quinlan - Tamian scout captain
      Dakkan - Lutren friend of Quinlan, son of Kenosh
      Kenosh - traitor Lutren who killed your brother Clovis and sided with Ermehn`;

async function openAIResponse(message, maxRememberedMessages = 8) {
   const messageHistory = [];
   const rolesToCheck = ['Canid', 'Felis', 'Polcan', 'Lutren', 'Tamian', 'Vulpin', 'Ermehn'];

   const messages = await message.channel.messages.fetch({ limit: maxRememberedMessages });

   messages.reverse().forEach(msg => {
      if (msg.author.bot) {
         messageHistory.push({ role: 'assistant', content: msg.content });
      } else {
         const matchedRole = msg.member.roles.cache.find(role => rolesToCheck.includes(role.name));
         messageHistory.push({ role: 'user', content: `${msg.member.displayName} ${matchedRole ? '(' + matchedRole.name + ') ': ''}said: ${msg.content}` });
      }
   });

   const openAIMessages = [{ role: 'system', content: generalDescription }, ...messageHistory];

   try {
      const response = await openai.chat.completions.create({
         model: 'gpt-3.5-turbo',
         messages: openAIMessages,
      });

      const reply = response.choices[0].message.content;

      C.dcReplyToMsg(message, reply);
   } catch (error) {
      console.error('Error with OpenAI API request:', error);
      message.channel.send('Sorry, something went wrong.');
   }
}

module.exports.openAIResponse = openAIResponse;