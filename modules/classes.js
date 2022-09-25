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
      this.queue = [];
   }

   get gotAnyTask() {
      return this.queue.length > 0;
   }

   get currentTaskDescription() {
      return this.gotAnyTask ? queue[0].description : `Currently doing nothing`;
   }

   addTask(description) {
      const uuid = uuidv4();
      this.queue.push(new MemberDataTask(uuid, description));
      console.log(`New UUID: ` + uuid); //to remove
      return uuid;
   }

   isFirst(uuid) {
      return this.queue.length > 0 ? this.queue[0].id == uuid : false;
   }

   async waitForYourTurn(uuid) {
      while (!this.isFirst(uuid)) {
         console.log(`waiting for ` + uuid); //to remove
         await C.sleep(1);
      }
   }

   removeIfFirst(uuid) {
      if (this.queue[0].id == uuid) {
         this.queue.shift();
         console.log(`UUID removed ${uuid}, queue: ` + this.queue.reduce((c, n) => c += n.id + '|', '')); //to remove
         return true;
      }
      console.log(`ERROR!!! UUID ${uuid} NOT removed !!! Queue elements: ` + this.queue.reduce((c, n) => c += n.id + '|', '')); //to remove
      return false;
   }
}

module.exports.MemberData = MemberData;

//------------------------------------------------------------------------------------------------------------------
class MemberDataTask {
   constructor(id, description) {
      this.id = id;
      this.description = description;
   }
}

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