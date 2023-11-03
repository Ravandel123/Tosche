const C = require('./../modules/common.js');
const { v4: uuidv4 } = require('uuid');


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
       return this.gotAnyTask ? this.queue[0].description : `Currently doing nothing`;
    }
 
    //Adds task to the user's queue.
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
      //timeout
    }
 }