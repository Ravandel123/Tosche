const C = require('../../modules/common.js');
const DB = require('../../modules/db.js');

module.exports = {
   name: 'updatedb',
   description: 'Updates the guild profiles.',
   usage: '',
   example: '',
   async execute(message, args) {
      let guildProfiles = await DB.gGetColGuildChar();
      let profile;

      if (args[2])
         profile = await DB.gGetProfileById(message, args[2]);
      else
         profile = await DB.gGetMsgAuthorProfile(message);


      if (args[1] == 'add') {
         //---------------OK---------------
         // let actionPoints = {
            // current: 48,
            // totalEarned: 261,
         // };
         // await guildProfiles.updateMany({actionPoints : {$exists : false}}, {$set : {actionPoints}}); //Sets or adds a field if it doesn't exist
         // await guildProfiles.updateMany({}, {$set : {actionPoints}}); //Sets or adds a field
         //-----
         // await guildProfiles.updateMany({}, {$inc: {"actionPoints.current" : -5}}); //Changes the value of a field
         // await guildProfiles.updateMany({}, {$inc: {"actionPoints.current" : 5, "actionPoints.totalEarned" : 15}}); //Changes the value of many fields
         //-----


         //---------------DO IT---------------
         // let fish1 = [];
         // for (let i = 0; i < 1000; i++)
            // fish1.push({
               // name: 'fish1234567890',
               // tags: ['a', 'b', 'c','a', 'b', 'c','a', 'b', 'c','a', 'b', 'c','a', 'b', 'c','a', 'b', 'c']
            // });

         // await guildProfiles.updateMany({}, { $push: { fish: fish1 } });
         // message.reply("DONE XD");

         // await guildProfiles.updateMany({ }, { $set : { fame : 2} })
         // await guildProfiles.updateMany({ ownerId: '392728479696814092' }, { $addToSet: { currencies: { amount : 100 } } }) //SIMILAR AS PUSH
         // await guildProfiles.updateMany({ ownerId: profile.ownerId }, { $push: { currencies: { name: 'Pearl Flakes' , amount: 5} } })
         // await guildProfiles.updateMany({ ownerId: profile.ownerId }, { $push: { currencies: { 
         // $each:[ { name: 'Obsidian Chips', amount: 5 }, { name: 'Amber Drops' }, { name: 'Gold Coins', amount: 15 } ] } } })
         
         // const res = await guildProfiles.updateMany({ ownerId: profile.ownerId }, { $addToSet: { currencies: { 
         // $each:[ 
         // { name: 'amber drops', amount: commons.rndNo0(10) },
         // { name: 'pearl flakes', amount: commons.rndNo0(10) },
         // { name: 'obsidian chips', amount: commons.rndNo0(10) },
         // { name: 'silver coins', amount: commons.rndNo0(10) },
         // { name: 'gold coins', amount: commons.rndNo0(10) },
         // { name: 'deltrada coins', amount: commons.rndNo0(100) }
         // ] } } })

         // console.log(res.n)
         // console.log(res.nModified)

         // await guildProfiles.updateMany({ ownerId: profile.ownerId }, { $addToSet: { currencies: { 
         // $each:[ { name: 'Obsidian Chips', amount: 5 }, { name: 'Amber Drops' }, { name: 'Gold Coins', amount: 15 } ] } } })

         // await guildProfiles.updateMany({ ownerName: 'Ravandel' }, { fame: 20 })

         // await guildProfiles.updateOne({ ownerName: 'Ravandel' }, { fame: 20 })

         // console.log(profile.ownerName);
         // profile.ownerName = "Imperator Ravandel";
         // await profile.save();


         // profile.currencies.push({ name: 'Obsidian Chips', amount: 5 })
         // profile.currencies.push({ name: 'Amber Drops' })
         // profile.currencies.push({ name: 'Gold Coins', amount: 15 })
         // await profile.save()

         //const res = await guildProfiles.findOne({ ownerName : 'Ravandel' , currencies : { $elemMatch : { name : 'Gold Coins', amount : { $gt : 10, $lte: 12 } } } })
         // const res = await guildProfiles.updateMany({ ownerName : 'Ravandel' , currencies : { $elemMatch : { name : 'Amber Drops' } } }, { $set: { 'currencies.$.name' : 'Amber XD' } })
         // const res = await guildProfiles.updateMany({ ownerName : 'Ravandel' , currencies : { $elemMatch : { name : 'Amber Drops' } } }, { $set: { 'currencies.$.amount' : 123 } })

      } else if (args[1] == 'remove') {
         //---------------OK---------------
         // const res = await guildProfiles.updateMany({$unset : { actionPoints : ""} }); //REMOVE ACTION POINTS
         
         
         
         // const res = await guildProfiles.updateMany({ ownerId: profile.ownerId }, {$unset : { currencies : ""} })
         // const res = await guildProfiles.updateMany({$unset : { fame : "" } })
         // const res = await guildProfiles.updateMany({ }, {$unset : { currencies : ""} })
         
         // const res = await guildProfiles.updateMany({ ownerId: message.author.id }, { $pull: { currencies: { name: 'ermehn slaves' } } })
         // const res = await guildProfiles.updateMany({ }, { $pull: { currencies: { name: 'ermehn slaves' } } })
         
         // await guildProfiles.updateMany({ ownerId: message.author.id }, { $pull: { currencies: { name: { $regex: '.*' + 'Amber' + '.*' } } } })
         

         // await guildProfiles.updateMany({ ownerId: message.author.id }, { $pull: { currencies: { name: 'Obsidian Chips' } } })
         // await guildProfiles.updateMany({ ownerId: message.author.id }, { $pull: { currencies: { name: 'Gold Coins' } } })
         // await guildProfiles.updateMany({ ownerId: message.author.id }, { $pull: { currencies: { name: { $regex: '.*' + 'Amber' + '.*' } } } })

         // await guildProfiles.save();
         // console.log(res.n);
         // console.log(res.nModified);
      // } else {
         // const res = await guildProfiles.updateMany({ ownerName: 'Ravandel' }, { fame: 20 })
         // const res = await guildProfiles.updateMany({ ownerName: 'Ravandel', currencies: { name: 'Amber Drops' } }, { fame: 20 }) //NIE DZIALA ZNAJDOWANIE
         // const res = await guildProfiles.updateMany({ ownerName: 'Ravandel' }, { $addToSet: { currencies: { amount : 100 } } })
         
         // guildProfiles = C.convertByFunction(guildProfiles, e => Object.assign(e, { fame : 33 }));
         // guildProfiles = guildProfiles.map(e => Object.assign(e, { fame : 33 }));
         // console.log(guildProfiles);
         // await guildProfiles.save(); //ERROR it is not the same query or something?
         
         //const res = await guildProfiles.updateMany({ ownerName : 'Ravandel',  currencies : { name : { $in : 'Amber Drops' } } } , { fame: 20 })

         // const res = await guildProfiles.updateMany({ ownerName : 'Ravandel' , currencies : { $elemMatch : { name : 'Amber Drops' } } }, { $set: { "currencies.$.name" : 'Amber XD' } })
         
         // const res = await guildProfiles.updateMany({ ownerName : 'Ravandel' , currencies : { $elemMatch : { name : 'Amber Drops' } } },
         // { $set: { "currencies.$.name" : 'Amber XD' } })
         
         // const res = await guildProfiles.updateMany({ ownerName : 'Ravandel' , currencies : { $elemMatch : { name : 'Amber Drops' } } }, { $set: { 'currencies.$.amount' : 123 } })
         // console.log(res.n)
         // console.log(res.nModified)
         // console.log(res)
      }
   },
}