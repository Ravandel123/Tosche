const C = require('../../modules/common.js')
const nameGenerator = require('../../modules/advanced/nameGenerator.js')


module.exports = {
   name: 'name',
   description: 'Generate random name.',
   usage: '[gender] [amount of syllables in generated names] [amount of generated names]',
   example: 'male 2 10',
   execute(message, args)
   {
      let response = ''
      let textGender = C.strToLowerCase(args[1])
      
      if(textGender == 'count')
         response = 'Total amount of (assumedly different) names that could be generated: ' + nameGenerator.TotalNamesCount()
      else
      {
         let namesAmount = C.checkIfIntInRange(args[3], 1, 300) ? args[3] : 1;

         for (let i = 0; i < namesAmount; i++)
         {
            response += nameGenerator.GenerateRandomName(args[1], args[2])
            if (i != namesAmount - 1)
               response += ', '
         }
      }

      C.dcRespondToMsg(message, response)
   },
}