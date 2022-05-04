const C = require('./../modules/common.js');



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
 