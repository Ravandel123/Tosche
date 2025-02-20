const C = require('../../modules/common.js');

module.exports = {
   name: 'timestamp',
   description: 'Converts the date/time to discord timestamp format.',
   usage: '[date (YYYY-MM-DD)] [time (HH:MM)] [format (t/T/f/F/d/D/R)]',
   example: '2025-02-20 15:00',
   execute(message, args) {
      const inputArgument = args[2] ? `${args[1]} ${args[2]}` : args[1];
      const relativeDateTime = getDiscordTimestamp(inputArgument, args[3]);

      C.dcRespondToMsg(message, relativeDateTime);
   },
}

function getDiscordTimestamp(inputTime = Date.now(), format = 'F') {
   const legalFormats = ['t', 'T', 'f', 'F', 'd', 'D', 'R'];

   if (!legalFormats.includes(format)) {
      return `Wrong date/time format (${format})!`;
   }

   let date;

   if (inputTime instanceof Date) {
      date = inputTime;
   } else if (typeof inputTime === 'number' || typeof inputTime === 'string') {
      if (isNumeric(inputTime)) {
         date = new Date(convertToNumber(inputTime));
      } else {
         date = new Date(inputTime);
      }
   } else {
      return `Invalid time input. Provide a Date, timestamp (number), or date string.`;
   }

   if (isNaN(date.getTime())) {
      return `Invalid date/time provided!`;
   }

   const unixTime = Math.floor(date.getTime() / 1000);
   return `<t:${unixTime}:${format}>\n\nFor copy paste (remove a space before '>'):\n<t:${unixTime}:${format} >`;
}

function isNumeric(str) {
   if (typeof str !== "string") {
      return false;
   }

   return !isNaN(str) && !isNaN(parseFloat(str));
 }

 function convertToNumber(str) {
   if (isNumeric(str)) {
      return Number(str);
   }

   return NaN;
 }