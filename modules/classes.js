const C = require('./common.js');
const { v4: uuidv4 } = require('uuid');

//----------------------------------------------------------- SPEECH ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
class PersonGrammar {
   constructor(who) {
      if (!who || C.strCheckIfAnyMatch(who, ['i', 'me', 'you'])) {
         this.pronoun = 'you';
         this.pronounUC = 'You';
         this.verb = 'are';
         this.pastVerb = 'were';
         this.possessionVerb = 'have';
         this.determiner = 'your';
         this.extraEnding = '';
      } else {
         this.pronoun = who;
         this.pronounUC = C.strCapitalizeFirstLetter(who);
         this.verb = 'is';
         this.pastVerb = 'was';
         this.possessionVerb = 'has';
         this.determiner = who + '\'s';
         this.extraEnding = 's';
      }

      this.pv = this.pronoun + ' ' + this.verb;
      this.ppv = this.pronoun + ' ' + this.pastVerb;
      this.pposv = this.pronoun + ' ' + this.possessionVerb;
   }
}

module.exports.PersonGrammar = PersonGrammar;

//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- CLIENT DATA ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
class MemberData {
   constructor(userId, breakable = true, transactionOpen = false, collector = null) {
      this.userId = userId;
      this.breakable = breakable;
      this.transactionOpen = transactionOpen;
      this.collector = collector;
      this.uuidQueue = [];
   }

   get first() {
      return this.uuidQueue.length > 0 ? this.elements[0] : undefined;
   }

   addId() {
      const uuid = uuidv4();
      this.uuidQueue.push(uuid); console.log(`UUID queue:` + this.uuidQueue);
      return uuid;
   }

   removeIfFirst(uuid) {
      if (this.uuidQueue[0] == uuid) {
         this.uuidQueue.shift(); console.log(`UUID removed ${uuid}, queue: ` + this.uuidQueue);
         return true;
      }
console.log(`UUID NOT !!! removed ${uuid}, queue: ` + this.uuidQueue);
      return false;
   }
}

module.exports.MemberData = MemberData;

//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- INTERACTIONS ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
class ButtonData {
   constructor(id, label, emoji, style = `PRIMARY`) {
      this.id = id;
      this.label = label;
      this.emoji = emoji;
      this.style = style;
   }
}

module.exports.ButtonData = ButtonData;

//------------------------------------------------------------------------------------------------------------------
class SelectOptionData {
   constructor(value, label, emoji, description) {
      this.value = value;
      this.label = label;
      this.emoji = emoji;
      this.description = description;
   }
}

module.exports.SelectOptionData = SelectOptionData;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------