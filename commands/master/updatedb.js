const C = require('../../modules/common.js');
const CG = require('../../modules/commonGuild.js');
const DB = require('../../modules/db.js');
const SG = require('../../modules/schematicsGuild.js');

module.exports = {
   name: 'updatedb',
   description: 'Updates db.',
   usage: '',
   example: '',
   async execute(message, args) {
      if (args[1] == 'hourly') {
         CG.mainUpdate1h(message.client);
         return;
      }

      let guildProfiles = await SG.profile;
      let records = await SG.record;
      let profile;

      if (args[2])
         profile = await CG.getProfileById(message, args[2]);
      else
         profile = await CG.getMessageAuthorProfile(message);



      // let members = C.dcGetAllMembers(message);

      // for (const member of members) {
         // defaultUpdate(message, member[1].id).then((value) => {
            // console.log(value)
         // });
      // }

      // await C.sleep(2);

      // for (const member of members) {
         // let xd = await defaultUpdate(message, member[1].id);
         // console.log(`Other: ${xd}`);
      // }







      await updateGuildProfiles(guildProfiles);







      // if (args[1] == 'add') {
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

         // const res = await guildProfiles.findOne({ ownerName : 'Ravandel' , currencies : { $elemMatch : { name : 'Gold Coins', amount : { $gt : 10, $lte: 12 } } } })
         // const res = await guildProfiles.updateMany({ ownerName : 'Ravandel' , currencies : { $elemMatch : { name : 'Amber Drops' } } }, { $set: { 'currencies.$.name' : 'Amber XD' } })
         // const res = await guildProfiles.updateMany({ ownerName : 'Ravandel' , currencies : { $elemMatch : { name : 'Amber Drops' } } }, { $set: { 'currencies.$.amount' : 123 } })

      // } else if (args[1] == 'remove') {
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
      // } else if (args[1] == 'change') {
         // records.updateMany({}, { $rename: { fish.ownerId: 'place1Id' } }, { multi: true }, function(err, blocks) {
          // if(err) { throw err; }
          // console.log('done!');
         // });
         
         
      // }
   },
}

async function defaultUpdate(message, id) {
   let profile = await CG.getProfileById(message, id);
   profile.actionPoints.current += 1;
   await profile.save();
   // console.log(`${id} updated!!!`);
   return Promise.resolve(`${id} updated!!!`);
}





async function updateGuildProfiles(guildProfiles) {
   //ALL STUFF NEED TO BE FIRST IN SCHEMATICS, EVEN FOR REMOVAL
   // const filter = {ownerId: '466378653216014359'};
   const filter = {};




   // const swimming = {
      // current: 1,
      // progress: 0,
   // };

   const skills = {
      general: {
         cooking : {
            current: 1,
            progress: 0,
         },
         fishing: {
            current: 1,
            progress: 0,
         },
         swimming: {
            current: 1,
            progress: 0,
         },
      },
      weapon: {
         melee: {
            current: 1,
            progress: 0,
         },
         ranged: {
            current: 1,
            progress: 0,
         },
         unarmed: {
            current: 1,
            progress: 0,
         },
      },
   };

   // await guildProfiles.updateMany({ownerId: '466378653216014359', "skills.swimming" : {$exists : false}}, {$set : {"skills.swimming" : swimming}}); //ADD SKILL
   // await guildProfiles.updateMany({ownerId: '466378653216014359'}, {$unset : {smackdownSpire : ""}});

   // await guildProfiles.updateMany(filter, {$unset : {weaponSkills : ""}});
   await guildProfiles.updateMany(filter, {$unset : {"resources.hp" : ""}});
   // await guildProfiles.updateMany(filter, {$set : {skills : skills}});
   // await guildProfiles.updateMany(filter, {$rename:{"resources.hp" : "resources.health"}});



//----------------------------------------------------------------------------------------------------------------------
   // let actionPoints = {
      // current: 0,
      // totalEarned: 0,
   // };

   // let resources = {
      // hp: 10,
      // hunger: 0,
      // satisfaction: 0,
      // stamina: 0,
      // stress: 0,
      // insanity: 0,
      // fate: 0,
      // fortune: 0,
      // resilience: 0,
      // resolve: 0,
   // };

   // let attributes = {
      // strength: 10,
      // toughness: 10,
      // agility: 10,
      // dexterity: 10,
      // perception: 10,
      // intelligence: 10,
      // willpower: 10,
      // charisma: 10,
      // luck: 10,
   // };

   // let skills = {
      // cooking : {
         // current: 1,
         // progress: 0,
      // },
      // fishing: {
         // current: 1,
         // progress: 0,
      // },
   // };

   // let weaponSkills = {
      // melee: {
         // current: 1,
         // progress: 0,
      // },
      // ranged: {
         // current: 1,
         // progress: 0,
      // },
      // unarmed: {
         // current: 1,
         // progress: 0,
      // },
   // };

   // await guildProfiles.updateMany(
      // {},
      // {
         // $set : {
            // actionPoints,
            // resources,
            // attributes,
            // skills,
            // weaponSkills
         // }
      // }
   // );
}