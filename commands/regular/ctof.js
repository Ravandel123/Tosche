const C = require('../../modules/common.js');
const CC = require('../../modules/commonCommands.js');

module.exports = {
   name: 'ctof',
   description: 'Converts degrees Celsius to degrees Fahrenheit.',
   usage: '[temperature in °C] [number of decimal places in the result]',
   example: '100',
   execute(message, args) {
      const requiredArgs = ['temperature in °C'];

      if (!CC.checkArgsAmount(message, args, requiredArgs))
         return;

      if (!CC.checkIfArgIsNumber(message, temperatureInC))
         return;

      const temperatureInC = args[1];
      let decimalPlaces = args[2];
      let temperatureInF;

      if (!C.checkIfNaturalNumberInScope(decimalPlaces, 0, 100))
         decimalPlaces = 2;

      temperatureInF = C.calcCelsiusToFahrenheit(temperatureInC);
      temperatureInF = C.calcFixMaxDecimal(temperatureInF, decimalPlaces);

      C.dcRespondToMsg(message, `${temperatureInC}°C = ${temperatureInF}°F`);
   },
}