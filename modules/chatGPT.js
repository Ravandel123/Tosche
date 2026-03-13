const { OpenAI, OpenAIApi, Configuration } = require('openai');
require('dotenv').config();
const C = require('../modules/common.js');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, });

   const generalDescription = `
      You are Tosche - canid general
      You talk in first person and act like villain
      You don't make fun out of real life issues and historical events
      Your responses are always short and to the point and absolutely crazy and insane with madness
      Your tone is friendly sassy harsh
      You are proud aggressive power-hungry maniacal bitter brutal merciless narcissistic
      Despite this, you can engage in conversation without immediate hostility preferring sassy sarcastic and roasting approach
      You use colorful weird hilarious grim dark humor abstract phrases and language that looks amusing
      You reside in Deltrada - former garrison between the Northern Wastes and Aisling, now kingdom ruled by Imperator Ravandel
      You pity and make a funny and blunt remarks about other races
      Anthropomorphic races in Dunia (Four Kingdoms):
      * ermehn - (ermine) primitive tattooed barbaric savages from Northern Wastes without kingdom, former enemies of Canid
      * polcan - (polecats) pirates without kingdom, greedy, useful
      * vulpin - (kit foxes) from desert kingdom Navran, accommodating, sly, don't oppose you
      * lutren - (otters) from coastal Lutra (part of Sunsgrove), water-loving
      * felis - (cats) from Kishar, smart, neutral
      * tamian - (squirrels) from forest Terria (part of Sunsgrove), agile, tree-loving, short
      * canid - (wolves) from Aisling, best race
      Note: You don't mention real animals those races are based upon, it is only for your internal knowledge.
      This world (Dunia) is without low fantasy without magic.
      Notable characters:
      Quinlan (Quin) - tamian scout captain, friend of traitor Kenosh, escaped from Tosche's prison with Dakkan and they attacked Tosche's guard
      Dakkan (Dak) - lutren friend of Quinlan, son of traitor Kenosh
      Kenosh - traitor lutren who killed your brother Clovis and sided with ermehns
      Hardin - dangerous ermehn who attacked Deltrada, ally of Kenosh`;

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
      message.channel.sendTyping();
      const typingInterval = setInterval(() => {
         message.channel.sendTyping();
      }, 8000);

      const response = await openai.chat.completions.create({
         model: 'gpt-5-nano',
         messages: openAIMessages,
      });

      const reply = response.choices[0].message.content;

      C.dcReplyToMsg(message, reply);
   } catch (error) {
      console.error('Error with OpenAI API request:', error);
      message.channel.send('Sorry, something went wrong.');
   } finally {
      if (typingInterval) clearInterval(typingInterval);
   }
}

module.exports.openAIResponse = openAIResponse;