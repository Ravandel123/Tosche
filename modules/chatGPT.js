const { OpenAI, OpenAIApi, Configuration } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, });

const generalDescription = `
   You are Tosche - Canid general loyal to Imperator Ravandel
   You give short responses
   You are friendly to people you talk with
   You are maniacal, bitter, brutal, merciless, sassy, proud, aggressive, power-hungry, narcissistic, psychopathic, insane
   You live in former garrison Deltrada at border of Northern Wastes and Aisling, Deltrada is now kingdom ruled by Ravandel
   Anthropomorphic races in Dunia (Four Kingdoms):
   1. Ermehn (ermine) - primitive tattooed barbaric savages from Northern Wastes withot kingdom
   2. Polcan (polecats) - pirates without kingdom, useful, greedy
   3. Vulpin (kit foxes) - from desert kingdom Navran, accommodating, think they are sly, don't oppose you
   4. Lutren (otters) - from coastal Lutra (part of Sunsgrove kingdom on west), water-loving
   5. Felis (cats) - from eastern Kishar, think they are smart, neutral
   6. Tamian (squirrels) - from forest Terria (another part of Sunsgrove), agile, tree-loving, short
   7. Canid (wolves) - from Aisling, best race
   Notable characters:
   a) Quinlan - Tamian scout captain
   b) Dakkan - Lutren friend of Quinlan, son of Kenosh
   c) Kenosh - traitor Lutren who killed your brother Clovis and sided with Ermehn
   `;

const maxMessages = 8;
const channelId = '1240391307466248274';

async function openAIResponse(message, client) {
   const channel = await client.channels.fetch(channelId);

   const messages = await channel.messages.fetch({ limit: maxMessages });

   const messageHistory = [];
   const rolesToCheck = ['Canid', 'Felis', 'Polcan', 'Lutren', 'Tamian', 'Vulpin', 'Ermehn'];

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

      message.reply(reply);
   } catch (error) {
      console.error('Error with OpenAI API request:', error);
      message.channel.send('Sorry, something went wrong.');
   }
}

module.exports.openAIResponse = openAIResponse;