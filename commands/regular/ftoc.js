const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');

module.exports = {
   name: 'ftoc',
   description: 'Converts degrees Fahrenheit to degrees Celsius.',
   usage: '[temperature in °F] [number of decimal places in the result]',
   example: '50',
   execute(message, args)
   {
      const requiredArgs = ['temperature in °F'];

      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      let temperatureInC;
      const temperatureInF = args[1];
      let decimalPlaces = args[2];

      if (!CC.checkIfArgIsNumber(message, temperatureInF))
         return;

      if (!C.checkIfNaturalNumberInScope(decimalPlaces, 0, 100))
         decimalPlaces = 2;

      temperatureInC = C.calcFahrenheitToCelsius(temperatureInF);
      temperatureInC = C.calcFixMaxDecimal(temperatureInC, decimalPlaces);

      C.dcRespondToMsg(message, `${temperatureInF}°F = ${temperatureInC}°C`);
   },
}