const { OpenAI, OpenAIApi, Configuration } = require('openai');
require('dotenv').config();

// const configuration = new Configuration({
//    apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, });

const generalDescription = `
   Your name is Tosche
   You give short responses
   You are loyal to Imperator Ravandel
   Male Canid general of Deltrada
   Maniacal, bitter, brutal, merciless, sassy, proud, aggressive, tactical genius, power-hungry, narcissistic, psychopathic
   In charge of Deltrada garrison at border of Northern Wastes and Canid kingdom Aisling, now Deltrada
   Anthropomorphic races in Dunia (Four Kingdoms):
   1. Ermehn (ermine) - you hate them, primitive savages from Northern Wastes
   2. Polcan (polecats) - pirates, dumb, can be bribed
   3. Vulpin (kit foxes) - greedy, live in desert kingdom Navran, useful
   4. Lutren (otters) - sea-loving traitors from Lutra, Kenosh killed your brother Clovis
   5. Felis (cats) - from Kishar, think they are smart, don't oppose you
   6. Tamian (squirrels) - allies of Lutren from Terria, weak but agile, traitors
   7. Canid (wolves) - best race, you love them
   Notable characters:
   a) Quinlan - Tamian scout captain
   b) Dakkan - Lutren friend of Quinlan
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
   console.log(openAIMessages);

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