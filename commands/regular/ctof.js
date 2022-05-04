const commons = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');

module.exports = {
   name: 'ctof',
   description: 'Converts degrees Celsius to degrees Fahrenheit.',
   usage: '[temperature in °C] [number of decimal places in the result]',
   example: '100',
   execute(message, args)
   {
      const requiredArgs = ['temperature in °C'];

      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      let temperatureInF;
      const temperatureInC = args[1];
      let decimalPlaces = args[2];

      if (!CC.checkIfArgIsNumber(message, temperatureInC))
         return;

      if (!commons.checkIfNaturalNumberInScope(decimalPlaces, 0, 100))
         decimalPlaces = 2;

      temperatureInF = commons.calcCelsiusToFahrenheit(temperatureInC);
      temperatureInF = commons.calcFixMaxDecimal(temperatureInF, decimalPlaces);

      commons.dcRespondToMsg(message, `${temperatureInC}°C = ${temperatureInF}°F`);
   },
}