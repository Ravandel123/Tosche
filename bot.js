require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const FS = require('fs');
const Mongoose = require('mongoose');
const CONFIG = require('./config.json');
const CRON = require('node-cron');
const DB = require('./modules/db.js');
const CG = require('./modules/commonGuild.js');
const CL_GD = require('./classes/guildData.js');

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildModeration,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.DirectMessageTyping,
      GatewayIntentBits.MessageContent
   ],
   partials: [
      Partials.Channel,
      Partials.GuildMember,
      Partials.Message,
      Partials.Reaction,
      Partials.ThreadMember,
      Partials.User
   ],
});

const gBotOwner = '392728479696814092';
const GUriString = process.env.MONGODB_URI;

client.data = new CL_GD.GlobalServerData();

client.commands = new Collection();
client.commandsRP = new Collection();
client.commandsG = new Collection();
client.commandsM = new Collection();

//----------------------------------------Commands----------------------------------------

const commandFiles = FS.readdirSync('./commands/regular').filter(file => file.endsWith('.js'));
const commandFilesRP = FS.readdirSync('./commands/rp').filter(file => file.endsWith('.js'));
const commandFilesG = FS.readdirSync('./commands/guild').filter(file => file.endsWith('.js'));
const commandFilesM = FS.readdirSync('./commands/master').filter(file => file.endsWith('.js'));
const eventFiles = FS.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
   const command = require(`./commands/regular/${file}`);
   client.commands.set(command.name, command);
}

for (const file of commandFilesRP) {
   const command = require(`./commands/rp/${file}`);
   client.commandsRP.set(command.name, command);
}

for (const file of commandFilesG) {
   const command = require(`./commands/guild/${file}`);
   client.commandsG.set(command.name, command);
}

for (const file of commandFilesM) {
   const command = require(`./commands/master/${file}`);
   client.commandsM.set(command.name, command);
}

//----------------------------------------DB----------------------------------------

//mongodb+srv://ravandel:dawidson123@cluster0-enjdy.mongodb.net/testdb?retryWrites=true&w=majority
Mongoose.connect(GUriString, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, res) {
   if (err) {
    console.log('ERROR connecting to: ' + GUriString + '. ' + err);
   } else {
    console.log(`Successfully connected to the database.`);
   }
})

//----------------------------------------Main----------------------------------------
//Move this function at the bottom after cleanup of bot.js
//https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584
async function startUp() {
   for (const file of eventFiles) {
      const event = require(`./events/${file}`);

      if (event.once)
         client.once(event.name, (...args) => event.execute(...args, client));
      else
         client.on(event.name, (...args) => event.execute(...args, client));
   }
}

console.log(`----------------------------------------------------------------------------------------------------`);

startUp();

CRON.schedule('0 * * * *', async () => {
   CG.mainUpdate1h(client);
});

//A B C D E F G H I J K L M N O P Q R S T U V W X Y Z

const com = require("./modules/common.js")

client.on('messageCreate', message => {
   // if (message.author.id === client.id) -> powinno byc tak jak message.author.bot
   // return message.guild.members.cache.get(A_message.author.id);
   if (message.guild == null && !message.author.bot && message.author.id != gBotOwner)
      client.users.cache.get(gBotOwner).send('**' + message.author.username + '** (' + message.author.id + ') sent a message:\n' + message.content)

   if (!message.content.startsWith(CONFIG.prefix)) return

   const args = message.content.slice(CONFIG.prefix.length).trim().split(/ +/g)
   const command = args.shift().toLowerCase()
   var arguments = message.content.split(/[ ]+/)
   var response
   var responseList
   var responseList1
   var responseList2
   var specialList
   var i
  
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----RP----------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  var sexesList = ['male', 'female']
  var racesList = ['canid', 'ermehn', 'felis', 'lutren', 'polcan', 'tamian', 'vulpin']
  
  var bodyShapesList = [
  ['gaunt', 5, 14.5, 16.99],
  ['underweight', 12, 17, 18.49],
  ['normal', 60, 18.5, 24.99],
  ['overweight', 10, 25, 29.99],
  ['obese', 3, 30, 40],
  ['beefy', 10, 25, 35]]
  
  var hitLocationsList = [
  ['head', 14],
  ['torso', 42],
  ['right arm', 8],
  ['right hand', 7],
  ['left arm', 8],
  ['left hand', 7],
  ['right thigh', 4],
  ['right foot', 3],
  ['left thigh', 4],
  ['left foot', 3]]
  
  var attributesList = [
  ['weapon skill', 'ws', 0, 0],
  ['ballistic skill', 'bs', 0, 0],
  ['strength', 'str', 0, 0],
  ['toughness', 't', 0, 0],
  ['stamina', 'sta', 0, 0],
  ['agility', 'agi', 0, 0],
  ['dexterity', 'dex', 0, 0],
  ['perception', 'per', 0, 0],
  ['intelligence', 'int', 0, 0],
  ['willpower', 'wp', 0, 0],
  ['charisma', 'cha', 0, 0],
  ['luck', 'l', 0, 0]]
  
  //Standard fur colours
  var canidFurColoursMainStandardList = ['brown', 'grey']
  var ermehnFurColoursMainStandardList = ['brown']
  var felisFurColoursMainStandardList = ['beige', 'brown', 'grey', 'russet', 'tan']
  var lutrenFurColoursMainStandardList = ['brown']
  var polcanFurColoursMainStandardList = ['brown']
  var tamianFurColoursMainStandardList = ['brown', 'orange', 'russet']
  var vulpinFurColoursMainStandardList = ['brown', 'tan']
  
  //Rare fur colours
  var canidFurColoursMainRareList = ['beige', 'black', 'cream', 'russet', 'tan', 'white']
  var felisFurColoursMainRareList = ['black', 'cream', 'white']
  var lutrenFurColoursMainRareList = ['beige', 'grey']
  var vulpinFurColoursMainRareList = ['white']
  
  //Secondary fur colours
  var furColoursSecondaryList1 = ['light', 'cream', 'white']
  var furColoursSecondaryList2 = ['light', 'cream']
  var furColoursSecondaryList3 = ['cream']
  var furColoursSecondaryList4 = ['white']

  //Markings colours
  var canidFurColoursMarkingsList = canidFurColoursMainStandardList.concat(canidFurColoursMainRareList)
  var felisFurColoursMarkingsList = ['black', 'brown']
  var polcanFurColoursMarkingsList = ['yellow']
  
  //Tones of colours
  var singleToneFurColoursList = ['black', 'cream', 'tan', 'beige', 'white']
  var defaultColourTonesList = ['normal']
  var lighterColourTonesList = ['light', 'pale']
  var darkerColourTonesList = ['dark', 'dusky']
  var allColourTonesList = defaultColourTonesList.concat(lighterColourTonesList, darkerColourTonesList)
  
  
  var furColours111 = [
  ['Brown', 3],
  ['Grey', 4]
  ]
  
  var furColours222 = [
  ['Tan', 2],
  ['White', 2],
  ['Black', 1]
  ]
  
  var furColours333 = furColours111.concat(furColours222)
  
  
  
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----Arrays------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  var additionalWordList1 = [' lol', ', yes-yes', ' lmao']
  
  var additionalLol = ''
  if(chance(25))
    additionalLol = ReturnRandom(additionalWordList1)

  var serialsList = [
  'Alladin',
  'Baywatch', 'Birdemic',
  'Dumb & Dumber', 'Dumb & Dumber 2',
  'Ferocious Female Freedom Fighters', 'Frozen',
  'Howard the Duck',
  'King Kong Lives',
  'Matrix',
  'Pterodactyl Woman from Beverly Hills',
  'Rambo',
  'Scary Movie', 'Shrek', 'Star Wars',
  'Theodore Rex'
  ]
  
  var placesList = [
  'Anthro New England', 'Arizona Fur Con', 'Anthrocon',
  'Baywatch', 'Biggest Little Fur Con',
  'Califur', 'ConFurence', 'Confurgence', 'Conifur Northwest',
  'Eurofurence',
  'Furry Fiesta', 'Furry Weekend Atlanta', 'Fur the \'More\'',
  'Gym',
  'Mephit Furmeet', 'Middle Earth', 'Midwest FurFest',
  'Rainfurrest', 'Rocky Mountain Fur Con',
  'VancouFur'
  ]
  
  var galaxies = [
  'Andromeda',
  'Messier 49',
  'NGC 1399',
  'NGC 4261',
  'M60-UCD1',
  'Markarian 335'
  ]
  
  var timeList = ['seconds', 'minutes', 'hours', 'days', 'years']
  
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----People------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  var serverPeopleList = ['Nachtkind', 'Laanar', 'Dinly', 'Me', 'Ravandel', 'Catz', 'You']
  
  var dictatorsPeopleList = [
  'Asha', 'Ashtor', 'Beck', 'Bevan', 'Cain', 'Clovis', 'Crim', 'Dakkan', 'Eira', 'Hardin', 'Janik', 'Kenosh',
  'Mitra', 'Quinlan', 'Rathik', 'Rhosyn', 'Rook', 'Sigrid', 'Theo', 'Yurk'
  ]
  
  var specialPeopleList = ['Everybody', 'Nobody']
  
  var peopleStandardServerList = serverPeopleList.concat(specialPeopleList)
  var peopleAllList = serverPeopleList.concat(dictatorsPeopleList, specialPeopleList)
  
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----Adjectives--------------------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  var afflictionsList = ['Abusive', 'Fearful', 'Hopeless', 'Irrational', 'Masochistic', 'Paranoid', 'Rapturous', 'Selfish']
  
  var virtuesList = ['Courageous', 'Focused', 'Powerful', 'Stalwart', 'Vigorous']

  var coloursList = [
  'Black', 'Blue',
  'Green', 'Grey',
  'Orange',
  'Pink', 'Purple',
  'Red',
  'Tan',
  'White',
  'Yellow'
  ]
  
  var specialAfflictionsList = [
  'Aberrant', 'Aggressive', 'Alcoholic', 'Anxious', 
  'Barbaric', 'Brainwashed', 
  'Cannibalistic', 'Crazy',
  'Degenerate', 'Delusional', 'Depressive', 'Destructive', 'Deviant', 'Dumb',
  'Feral', 'Ferocious', 'Foolish', 'Furious', 'Furry',
  'Heartless',
  'Idiotic', 'Imbecilic', 'Inane', 'Insane', 
  'Lazy', 
  'Maniacal', 'Mindless', 'Murderous', 'Mutantic',
  'Narcissistic',
  'Pathethic', 'Pathologic', 'Perverse', 'Primitive', 'Psychopathic',
  'Racist', 'Ravenous',
  'Sadistic', 'Stupid'
  ]
  
  var specialVirtuesList = [
  'Clever', 
  'Fearsome', 
  'Mighty', 
  'Relentless', 
  'Undying'
  ]
  
  var adjectivesNormalList = [
  'Aerial', 'Aeronautic', 'Agile', 'Animate', 'Aquatic',
  'Clever', 'Cloaked', 'Convinced',
  'Faceless', 'Faded', 'Faithful', 'Fated', 'Forsworn', 'Frozen',
  'Great', 'Greater',
  'High', 'Horned', 'Hypnotic', 
  'Immortal',
  'Judicial',  
  'Lesser', 'Living', 'Lunar',
  'Mountainous',
  'Pale',
  'Solar', 'Stormful', 'Strong', 
  'Winged', 'Wise',
  'Vengeful'
  ]

  var adjectivesFunnyList = [
  'Abominable', 'Absurd', 'Adorable', 'Amateur', 'Amazing', 'Amusing', 'Anointed', 'Artistic', 'Awesome', 'Awful',
  'Banana', 'Best', 'Believable', 'Bioluminescent', 'Bloody', 'Brutal',
  'Celestial', 'Coconutty', 'Corvid', 'Creepy', 'Crystalline', 'Cute', 'Cutest',
  'Dark', 'Deadly', 'Defiant', 'Delicate', 'Dirty', 'Disgusting', 'Domesticated', 'Doomed', 'Drooly', 'Drugged', 'Drunken', 'Dungy',
  'Evil', 'Extraterrestrial',
  'Fast', 'Feisty', 'Fiery', 'Forbidden', 'Fossilized', 'Foul', 'Funny',
  'Gargantuan', 'Gelatinous', 'Good', 'Gross',
  'Haunted', 'Hideous', 'Hilarious', 'Horrible', 'Huge', 'Hungry',
  'Immoral', 'Indoctrinated', 'Innocent', 'Interesting', 
  'Leper', 'Little', 'Lobotomized',
  'Magical', 'Monstrous',
  'Naive', 'Nippled', 'Nutty',
  'Offensive',
  'Pleasurable', 'Pointless', 'Programmed', 'Provocative',
  'Ridiculous', 'Robotic', 'Rotten',
  'Sacred', 'Sacrifical', 'Savage', 'Scary', 'Screwed', 'Secret', 'Serial', 'Shamanistic', 'Silly', 'Slimy', 'Slow', 'Smart', 'Starving', 'Stinky', 'Suicidal',
  'Tamed', 'Tentacled', 'Torturous', 'Trusted',
  'Ugly', 'Unintelligent', 'Useful', 'Useless',
  'Valuable', 'Verdant', 'Vile', 'Violent',
  'Weedy', 'Wild', 'Worst'
  ]
  
  var adjectivesEndingSinglePartList = [
  'the Birds', 'Blood','the Booze',
  'the Coconut', 'the Coconuts',
  'Darkness', 'the Dead', 'Degeneration', 'Delight', 'Despair', 'Destruction', 'Doom', 'Dung',
  'Evil',
  'Fury',
  'the Hazelnut', 'the Hazelnuts',
  'Immorality', 'Immortality', 'Insanity',
  'Madness', 'Magic', 'Masochism', 'the Moon', 'the Murder',
  'the Nut', 'the Nuts',
  'Pleasure', 'Pleasures', 'Power',
  'the Rot',
  'Sadism', 'Shadows', 'Sorrow', 'the Storm', 'the Sun',
  'Tentacles',
  'War', 'the Weed'
  ]
  
  var adjectivesAfflictionsVirtuesList = afflictionsList.concat(virtuesList, specialAfflictionsList, specialVirtuesList)
  var adjectivesStandardList = adjectivesFunnyList.concat(adjectivesNormalList, specialAfflictionsList, specialVirtuesList)
  var adjectivesAllList = afflictionsList.concat(virtuesList, specialAfflictionsList, specialVirtuesList, adjectivesNormalList, adjectivesFunnyList, coloursList)
  var adjectivesEndingAllSingle = adjectivesEndingSinglePartList.concat(peopleAllList)
  
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----Adverbs-----------------------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

  var advBase = [
  'Absentmindedly', 'Absolutely', 'Abstractedly', 'Abundantly', 'Adoringly', 'Aggressively', 'Attractively', 'Awkwardly',
  'Beautifully', 'Briskly', 'Brutally',
  'Cannibalistically', 'Carefully', 'Cautiously', 'Cheerfully', 'Cheerily', 'Competitively', 'Completely', 'Conservatively', 'Contritely', 'Copiously', 'Correctly', 'Cosmically',
  'Deadly',
  'Eagerly', 'Effectively', 'Effortlessly', 'Entirely', 'Excellently', 'Exceptionally', 'Excessively', 'Extravagantly', 'Extremely',
  'Famously', 'Fantastically', 'Faultlessly', 'Feebly', 'Foolishly', 'Frantically', 'Furiously',
  'Gently', 'Gingerly', 'Girlishly', 'Gorgeously', 'Gracefully', 'Graciously', 'Grimly', 'Guardedly',
  'Half-heartedly', 'Happily', 'Heartlessly', 'Hungrily',
  'Idiotically', 'Idly', 'Inattentively',
  'Lazily', 'Lifelessly', 'Loyally',
  'Magnificently', 'Maniacally', 'Masochistically', 'Mega', 'Mindlessly', 'Mutantically',
  'Narcissistically', 'Nimbly',
  'Overly',
  'Perfectly', 'Pathetically', 'Pleasantly', 'Plentifully', 'Practically', 'Primitively', 'Profusely', 'Properly', 'Purely',
  'Quietly', 'Questioningly', 'Quite', 'Quizzically', 
  'Ravenously', 'Really', 'Recklessly', 'Remorsefully', 'Rightly', 'Ruefully', 'Ruthlessly',
  'Sadistically', 'Savagely ', 'Silently', 'Slightly', 'Sloppily', 'Splendidly', 'Stupidly', 'Stylishly', 'Superbly', 'Sunnily', 'Super',
  'Terribly', 'Thirstily', 'Totally',
  'Ultra', 'Unabashedly', 'Unevenly', 'Urgently', 'Utterly',
  'Very', 'Viciously',
  'Warily', 'Weakly', 'Well', 'Wishfully', 'Witlessly', 'Wholly', 'Worriedly'
  ];
  
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----Creatures---------------------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  var animalsStandardList = [
  'Alligator', 'Alpaca', 'Amoeba', 'Armadillo',
  'Baboon', 'Badger', 'Bat', 'Bear', 'Bee', 'Bug', 'Bull', 'Bumblebee',
  'Cat', 'Chameleon', 'Cheetah', 'Chicken', 'Chimpanzee', 'Cockroach', 'Cow', 'Coyote', 'Cricket', 'Crocodile',
  'Dog', 'Dolphin', 'Donkey', 'Duck',
  'Elephant', 'Ermine',
  'Ferret', 'Fish', 'Fox',
  'Gecko', 'Giraffe', 'Goat', 'Gorilla',
  'Hare', 'Hedgehog', 'Hippo', 'Hornbill', 'Hornet', 'Horse',
  'Iguana',
  'Llama','Lion', 'Lizard', 'Lynx',
  'Macaw', 'Monkey', 'Moth', 'Mouse',
  'Nudibranch',
  'Octopus', 'Orangutan', 'Orca', 'Otter', 'Owl',
  'Pangolin', 'Panther', 'Parasite', 'Parrot', 'Penguin', 'Pigeon',
  'Raccoon', 'Rat', 'Raven', 'Rhesus Macaque',
  'Seal', 'Sheep', 'Skink', 'Sloth', 'Snail', 'Snake', 'Spider', 'Squirrel', 'Swan',
  'Tiger', 'Toucan',
  'Vulture',
  'Wasp', 'Whale', 'Wolf', 'Worm',
  'Zebra'
  ]

  var classesStandardList = [
  'Abbot', 'Admiral', 'Agitator', 'Amazon', 'Ambassador', 'Anchorite', 'Antiquarian', 'Apothecary', 'Arbalest', 'Archer', 'Artillerist', 'Artisan', 'Artist', 'Assassin', 'Astrologer', 'Ataman', 'Attendant',
  'Badlander', 'Bailiff', 'Bandit', 'Barbarian', 'Barber', 'Bard', 'Baron', 'Barrator', 'Berserker', 'Boatman', 'Bodyguard', 'Bombardier', 'Bomber','Bondsman', 'Bonepicker', 'Breaker', 'Brigand', 'Brother', 'Burgher', 'Burglar', 'Butcher',
  'Cadet', 'Calligrapher', 'Cantor', 'Captain', 'Cartographer', 'Catcher', 'Catechist', 'Cenobite', 'Champion', 'Chanter', 'Charlatan', 'Chevalier', 'Chimneysweep', 'Coachman', 'Collector','Courtesan', 'Countess', 'Cultist', 'Convict', 'Courtier', 'Crusader', 
  'Defender', 'Demagogue', 'Dilettante', 'Doctor', 'Drover', 'Druid', 'Duelist',
  'Elder', 'Embalmer', 'Enforcer', 'Engineer', 'Entertainer', 'Envoy', 'Exciseman', 'Executioner', 'Exorcist', 'Experiment', 'Explorer',
  'Farmer', 'Ferryman', 'Fighter', 'Firefighter', 'Fisherman', 'Flagellant', 'Follower', 'Fool', 'Foreman', 'Forger', 'Freeholder', 'Friar', 'Frogwive',
  'Gambler', 'Geomancer', 'Guard', 'Guardian', 'Gunner',
  'Hage', 'Hellion', 'Herald', 'Highwayman', 'Hunter',
  'Illusionist', 'Initiate', 'Innkeeper', 'Interrogator', 'Inquisitor',
  'Jailer', 'Jester', 'Journeyman',
  'Kamikaze', 'Kidnapper', 'Killer', 'King', 'Knight', 'Knight Errant', 'Kossar',
  'Lamplighter', 'Laner', 'Lay', 'Leper', 'Lich', 'Litigant', 'Lord', 'Lumberjack',
  'Madman', 'Mage', 'Magician', 'Maiden', 'Man-at-Arms', 'Marauder', 'Mariner', 'Master', 'Mate', 'Mediator', 'Mentor', 'Mercenary', 'Merchant', 'Messenger', 'Militiaman', 'Miner', 'Minstrel', 'Mohican', 'Monk', 'Muleskinner', 'Musician', 'Mystic',
  'Navigator', 'Necromancer', 'Necrodancer', 'Nekomancer', 'Ninja', 'Noble', 'Nomad', 
  'Occultist', 'Outlaw', 'Outrider', 
  'Painter', 'Paladin', 'Pamphleteer', 'Peasant', 'Penitent', 'Physician', 'Pilgrim', 'Pistolier', 'Politician', 'Prelate', 'Priest', 'Priestess', 'Prisoner', 'Prophet', 'Protagonist',
  'Queen',
  'Racketeer', 'Raconteur', 'Rapscallion', 'Raider', 'Ranger', 'Rat Catcher', 'Reaver', 'Riverwarden', 'Roadwarden', 'Robber', 'Rogue', 'Ruffian', 'Ruler', 'Runebearer', 'Runesmith',
  'Sailor','Samurai', 'Scholar', 'Scout', 'Scribe', 'Seaman', 'Seeker', 'Seer', 'Sergeant', 'Servant', 'Shaman', 'Shepherd', 'Shieldbreaker', 'Sister', 'Skald', 'Skimmer', 'Slaughterer', 'Slaver', 'Slayer', 'Smuggler', 'Soldier', 'Sorcerer', 'Spy', 'Squire', 'Stevedore', 'Steward', 'Strider', 'Surgeon', 'Student',
  'Tamer', 'Targeteer', 'Thief', 'Thug', 'Toll Keeper', 'Torturer', 'Tradesman', 'Trainer', 'Trapper', 
  'Vagabond', 'Valet', 'Valkyrie', 'Vendor', 'Veteran', 'Viceroy', 'Vigilant',
  'Walker', 'Wanderer', 'Warden', 'Warleader', 'Warlock', 'Warlord', 'Warrior', 'Watchman', 'Witch', 'Witcher', 'Wizard', 'Whaler', 'Woodsman', 'Wrecker',
  'Yeoman',
  'Zaelot'
  ];
  
  var classesFunnyList = [
  'Abomination', 'Android', 'Animal', 'Automaton', 'Avatar',
  'Bastard', 'Beast', 
  'Cannibal', 'Colossus', 'Construct', 'Cyborg',
  'Device',
  'Friend', 'Furry',
  'Garbage',
  'Idiot',
  'Kid', 
  'Machine', 'Marionette', 'Monster', 'Mutant', 
  'Noob',
  'Parasite', 'Pawn', 'Plaything', 'Primitive',
  'Robot',
  'Sadist', 'Savage', 'Slave',
  'Test Subject', 'Toy', 'Troglodyte', 'Troll',
  'Zombie'
  ]
  
  var classesFullList = classesStandardList.concat(classesFunnyList)
  var creaturesFullList = animalsStandardList.concat(classesStandardList, classesFunnyList)
  
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----Darkest Dungeon---------------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  var ddQuotesAfflictionList = [
  'The human mind - fragile like a robin\'s egg.',
  'Wherefore, heroism?',
  'The mind cannot hope to withstand such an assault.',
  'Even the aged oak will fall to the tempest\'s winds.',
  'Madness, our old friend!',
  'One can sometimes find clarity in madness, but only rarely...',
  'Madness - sublimity of the intelligence, or so it has been said.',
  'The bulwarks of the mind have fallen!',
  'The abyss is made manifest!',
  'Frustration and fury, more destructive than a hundred cannons.',
  'Fear and frailty finally claim their due.',
  'The walls close in, the shadows whisper of conspiracy!',
  'There can be no hope in this place, no hope at all.',
  'Self-preservation is paramount - at any cost!',
  'Those who covet injury find it in no short supply.',
  'Reeling, gasping, taken over the edge into madness!'
  ]
  
  var ddQuotesVirtuesList = [
  'A moment of valor shines brightest against a backdrop of despair.',
  'Adversity can foster hope, and resilience.',
  'A moment of clarity in the eye of the storm...',
  'Anger is power - unleash it!',
  'Many fall in the face of chaos; but not this one, not today.'
  ]
  
  var ddQuotesStrikingCriticalHitList = [
  'A decisive pummelling!',
  'A powerful blow!',
  'A devastating blow!',
  'Impressive!',
  'The ground quakes!',
  'A singular strike!',
  'Well struck!',
  'Precision and power!',
  'Unnerved, unbalanced...',
  'Precision and power!	'
  ]
  
  var ddQuotesReceivingCriticalHitList = [
  'How quickly the tide turns!',
  'How quickly the tide turns!',
  'Grievous injury, palpable fear...',
  'Such a terrible assault cannot be left unanswered!',
  'Death waits for the slightest lapse in concentration.',
  'Exposed to a killing blow!',
  'Ringing ears, blurred vision - the end approaches...',
  'Dazed, reeling, about to break...',
  'Unnerved, unbalanced...',
  'A dizzying blow to body and brain!'
  ]
  
  var ddQuotesDeathDoorList = [
  'Perched at the very precipice of oblivion...',
  'A hand-breadth from becoming unwound...',
  'Teetering on the brink, facing the abyss...',
  'And now the true test... hold fast, or expire?',
  'As life ebbs, terrible vistas of emptiness reveal themselves.'
  ]
  
  var ddQuotesDeathblowList = [
  'Survival is a tenuous proposition in this sprawling tomb.',
  'More blood soaks the soil, feeding the evil therein.',
  'Another life wasted in the pursuit of glory and gold.',
  'This is no place for the weak, or foolhardy.',
  'More dust, more ashes, more disappointment.'
  ]
  
  var ddQuotesWinningBattleList = [
  'These nightmarish creatures can be felled! They can be beaten!',
  'Seize this momentum! Push on to the task\'s end!',
  'This expedition, at least, promises success.',
  'As victories mount, so too will resistance.',
  'Success so clearly in view... or is it merely a trick of the light?',
  'Remind yourself that overconfidence is a slow and insidious killer.',
  'A trifling victory, but a victory nonetheless.',
  'Be wary - triumphant pride precipitates a dizzying fall...',
  'Ghoulish horrors - brought low and driven into the mud!'
  ]
  
  var ddQuotesAllList = ddQuotesAfflictionList.concat(ddQuotesVirtuesList, ddQuotesStrikingCriticalHitList, ddQuotesReceivingCriticalHitList, ddQuotesDeathDoorList, ddQuotesDeathblowList, ddQuotesWinningBattleList)

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----Items-------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  var itemsWeaponsList = [
  'Arbalest', 'AK-47', 'Atomic Bomb', 'Axe',
  'Bardiche', 'Bazooka', 'Bludgeon', 'Bomb', 'Bow', 'Broadsword',
  'Chain', 'Chainsaw', 'Claymore', 'Club', 'Coconut', 'Crossbow', 'Crowbar',
  'Dagger', 'Disintegrator',
  'Estoc',
  'Falchion', 'Fist', 'Flail', 'Flamethrower', 'Fork',
  'Gladius', 'Glaive', 'Greatsword',
  'Halberd', 'Hammer',
  'Icicle',
  'Kama', 'Katana', 'Knife', 'Kukri',
  'Lance', 'Lasso', 'Longsword',
  'Mace', 'Machine Gun', 'Maul', 'Minigun', 'Missile', 'Missile Launcher', 'Morning Star', 'Musket',
  'Nuclear Missile', 'Nut',
  'Pike', 'Polearm', 'Poleaxe',
  'Quarterstaff',
  'Rapier', 'Revolver', 'Rocket Launcher', 'Rope',
  'Sabre', 'Scimitar', 'Scythe', 'Shortsword', 'Shotgun', 'Shuriken', 'Sickle', 'Sledgehammer', 'Sling', 'Spear', 'Spoon', 'Staff', 'Stick', 'Sword',
  'Tesla Coil', 'Tomahawk', 'Tool',
  'Uzi',
  'Wakizashi', 'Wand', 'Warhammer', 'Whip'
  ]
  
  var itemsMealList = [
  'Breakfast', 'Brunch', 'Dinner', 'Lunch', 'Supper'
  ]

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----Measurements------------------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

  var measurementLengthList = ['centimeters', 'decimeters', 'feet', 'inches', 'kilometers', 'meters', 'miles', 'millimeters', 'yards']
  var measurementVolumeList = ['cubics', 'cups', 'gallons', 'liters', 'milliliters', 'pints', 'quarts']
  var measurementWeighList = ['decagrams', 'grams', 'kilograms', 'ounces', 'pounds', 'tons']

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----Places------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

  var placeMainList = [
  'Abbey', 'Altar', 'Amphitheater', 'Arena',
  'Basement', 'Barren',
  'Cartel', 'Cave', 'Citadel', 'City', 'Chamber', 'Cliffs', 'Colosseum', 'Cornfield',
  'Den', 'Desert', 'Dojo', 'Dungeon',
  'Encampment',
  'Field', 'Forest', 'Fort', 'Fortress', 'Fountain',
  'Galaxy', 'Garrison', 'Grove', 'Guild', 'Gym',
  'Home', 'House', 'Hovel', 'Hub',
  'Island',
  'Jail',
  'Kingdom', 'Kitchen',
  'Lake', 'Land', 'Lighthouse',
  'Marsh', 'Moon', 'Moor', 'Mountain', 'Mountains',
  'Ocean', 'Outpost',
  'Palace', 'Plains', 'Planet', 'Prison', 'Pyramid',
  'Rainforest', 'Realm', 'Refuge', 'River', 'Room', 'Ruins',
  'Sanctum', 'School', 'Sea', 'Sewers', 'Ship', 'Space', 'Stronghold', 'Swamp',
  'Temple', 'Tomb', 'Tower', 'Town', 'Township', 'Treetops',
  'Village',
  'Wastes', 'Waterfall', 'Wilderness', 'Woods',
  'Ziggurat'
  ]
  
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----Prepositions------------------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  var prepositionsPlaces = [
  'at', 'in', 'on'
  ]

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----Sizes-------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  var sizeBigList = [
  'Astronomical', 'Big', 'Colossal', 'Enormous', 'Gargantuan', 'Giant', 'Gigantic', 'Huge', 'Large', 'Monstrous', 'Tremendous'
  ]
  
  var sizeSmallList = [
  'Diminutive', 'Little', 'Small', 'Tiny'
  ]
  
  var sizeAverageList = [
  'Average', 'Medium'
  ]
  
  var sizeList = sizeBigList.concat(sizeSmallList, sizeAverageList)

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----Verbs-------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  var verbsStandardList = [
  'Buy',
  'Draw',
  'Feed',
  'Observe',
  'Pet',
  'Sketch'
  ]
  
  var verbsStandardContinuousList = [
  'Awooing',
  'Chirping',
  'Dancing', 'Drawing', 'Drinking',
  'Eating',
  'Feeding',
  'Gaming',
  'Looking around',
  'Paying', 'Playing',
  'Ranting',
  'Screaming', 'Sketching', 'Sleeping', 'Sulking', 'Swimming',
  'Taking a dump',
  'Whipping'
  ]

  var verbsStandardContinuousHumanInteractionsList = [
  'Apologizing to', 'Assaulting', 'Awooing with',
  'Beating', 'Buying',
  'Chirping with', 'Complimenting',
  'Dancing with', 'Drawing', 'Drinking with',
  'Eating with',
  'Feeding',
  'Gaming with',
  'Ignoring',
  'Kicking',
  'Observing',
  'Partying with', 'Paying', 'Petting', 'Playing', 'Playing with',
  'Ranting at',
  'Screaming at', 'Screaming with', 'Sketching', 'Swimming with',
  'Taking a dump with',
  'Verbally Abusing',
  'Whipping'
  ]
  
  var verbsHumanInteractionsList = [
  'Apologize', 'Applaud',
  'Compliment',
  'Ignore',
  'Pay',
  ]
  
  var verbsAllList = verbsStandardList.concat(verbsHumanInteractionsList)
  
 
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
   

  switch (command) {
    //----------------------------------------------------------------------------------------------------------------------------
    //----------ambush------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'ambush':
      who = RecognizeWho(arguments[1], message, command);
      var ambushers = '';
      var ambushersNumber = Math.floor(Math.random() * 7 + 1);
      
      responseList = ['Oh no! ' + who + ' has been ambushed by:'];
      
      for (i = 0; i < ambushersNumber; i++) 
        ambushers = ambushers + '\n**' + GenerateRandomClass() + '**';

      message.channel.send(ReturnRandom(responseList) + ambushers + '\nWill ' + who + ' survive? :scream:')
      break;

    //----------------------------------------------------------------------------------------------------------------------------
    //----------animal------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
      case 'animal':
      var who = RecognizeWho(arguments[1], message, command)
      
      var animal1 = GenerateRandomAnimal()
      var animalCorrect1 = strAddArticle(animal1) + animal1
      animalCorrect1 = ChangeToBold(animalCorrect1)
      
      var animal2 = GenerateRandomAnimal()
      var animalCorrect2 = strAddArticle(animal2) + animal2
      animalCorrect2 = ChangeToBold(animalCorrect2)
      
      var responses = [
      'I think ' + who + ' looks like ' + animalCorrect1 + additionalLol + '.',
      'I think ' + who + ' would do great as ' + animalCorrect1 + additionalLol + '.',
      'I think ' + who + ' would do well as ' + animalCorrect1 + '.',
      'I think ' + who + ' looks like a cross between ' + animalCorrect1 + ' and ' + animalCorrect2 + additionalLol + '.',
      who + ' looks like ' + animalCorrect1 + additionalLol + '.',
      who + ' would do great as ' + animalCorrect1 + additionalLol + '.',
      who + ' would do well as ' + animalCorrect1 + additionalLol + '.',
      who + ' looks like ' + animalCorrect1 + ' from ' + ChangeToBold(GenerateRandomPlace()) + additionalLol + '.',
      who + ' looks like something between ' + animalCorrect1 + ' and ' + animalCorrect2 + additionalLol + '.',
      who + ' looks like some kind of mix of ' + animalCorrect1 + ' and ' + animalCorrect2 + additionalLol + '.'
      ];
      
      var specialResponseList = [
      'I think ' + who + ' actually resemble more some kind of mushroom than an animal' + additionalLol + '.',
      'I think ' + who + ' actually resemble more some kind of plant than an animal' + additionalLol + '.',
      who + ' looks like some kind of unidentified animal' + additionalLol + '.',
      'I think ' + who + ' is the last of its kind, probably the rest of ' + who + ' race is extinct' + additionalLol + '.',
      who + ' looks like a pet of ' + ChangeToBold(ReturnRandom(serverPeopleList)) + additionalLol + '.'
      ];
      
      if(chance(7))
        message.channel.send(ReturnRandom(specialResponseList))
      else
        message.channel.send(ReturnRandom(responses))
      break;

    //----------------------------------------------------------------------------------------------------------------------------
    //----------braindmg----------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'braindmg':
      responseList = [
      'https://www.youtube.com/watch?v=eh7lp9umG2I',
      'https://www.youtube.com/watch?v=vTIIMJ9tUc8',
      'https://www.youtube.com/watch?v=MNyG-xu-7SQ',
      'https://www.youtube.com/watch?v=jofNR_WkoCE',
      'https://www.youtube.com/watch?v=kffacxfA7G4',
      'https://www.youtube.com/watch?v=qcFybw4mSOk',
      'https://www.youtube.com/watch?v=3fk9Xvh32hM',
      'https://www.youtube.com/watch?v=nF7lv1gfP1Q',
      'https://www.youtube.com/watch?v=be1EOu7f790'
      ];
      who = RecognizeWho(arguments[1], message, command)

      message.channel.send(ReturnRandom(responseList))
      break;
      
    //----------------------------------------------------------------------------------------------------------------------------
    //----------capacity, volume--------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'capacity':
    case 'volume':
      specialList = [
      'That is beyond the capacity of all oceans combined' + additionalLol + '.',
      'Not enough capacious' + additionalLol + '.',
      'Too capacious' + additionalLol + '.',
      'Immeasurable' + additionalLol + '!',
      'Infinite' + additionalLol + '!',
      'Dunno' + additionalLol + '!',
      'I don\'t know' + additionalLol + '!',
      'I won\'t tell you' + additionalLol + '!'
      ];
      
      responseList = [
      'Capacity of that is definitely ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementVolumeList) + '.',
      'Around ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementVolumeList) + '.',
      'Exactly ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementVolumeList) + '.',
      'It\'s close to ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementVolumeList) + '.',
      'I think the capacity of that is less than ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementVolumeList) + '.',
      'I think the capacity of that is more than ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementVolumeList) + '.'
      ];

      if(chance(15))
        message.channel.send(ReturnRandom(specialList))
      else
        message.channel.send(ReturnRandom(responseList))
      break;
      
    //----------------------------------------------------------------------------------------------------------------------------
    //----------celebrate---------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'celebrate':
      
      responseList2 = [
      'Yay! Celebration time!',
      'Cool! Just remember to not invite ' + ReturnRandom(serverPeopleList) + '.',
      'Awesome! Just remember to invite ' + ReturnRandom(peopleStandardServerList) + '.',
      'Sorry I am not joining that' + additionalLol + '.',
      'I will prepare party in **' + GenerateRandomPlace() + '**.',
      'Yeah! Lets bring **' + GenerateRandomWeapon() + '** to the party' + additionalLol + '!',
      ':tada: :tada: :tada: :tada: :tada:'
      ];
        
      response = ReturnRandom(responseList2)
      
      message.channel.send(response)
      break;
      
    //----------------------------------------------------------------------------------------------------------------------------
    //----------class-----------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'class':
      var who = RecognizeWho(arguments[1], message, command)
      var basicString = '';
      var finalString = '';
      var vClass

      if(arguments[1] == 'count')
      {
        finalString = GenerateRandomClass('count');
        message.channel.send('Number of possible outcomes (approximately): ' + finalString + '.');
        return;
      }
      
      var basePart = [
      'I think ' + who + ' looks like ',
      'I think ' + who + ' would do great as ',
      'I think ' + who + ' would do well as ',
      'I think ' + who + ' would make an excellent ',
      who + ' looks like ',
      who + ' would do great as ',
      who + ' would do well as ',
      who + ' would make an excellent '
      ];

      vClass = GenerateRandomClass()

      basicString = ReturnRandom(basePart);

      if(basicString != basePart[3] && basicString != basePart[7])
        basicString = basicString + strAddArticle(vClass)

      message.channel.send(basicString + '**' + vClass + '**.')
      break;
      
    //----------------------------------------------------------------------------------------------------------------------------
    //----------ddcheck-----------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'ddcheck':
      who = RecognizeWho(arguments[1], message, command);

      if(chance(67))
        message.channel.send(who + ' survived!.\n\n' + ChangeToBold('"' + ReturnRandom(ddQuotesWinningBattleList) + '"'))
      else
        message.channel.send(who + ' survived!.\n\n' + ChangeToBold('"' + ReturnRandom(ddQuotesDeathblowList) + '"'))
      break;
    
    //----------------------------------------------------------------------------------------------------------------------------
    //----------ddquote-----------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'ddquote':
      switch(arguments[1])
      {
        case '1':
          message.channel.send('**"' + ReturnRandom(ddQuotesAfflictionList) + '"**')
          break;
          
        case '2':
          message.channel.send('**"' + ReturnRandom(ddQuotesVirtuesList) + '"**')
          break;

        case '3':
          message.channel.send('**"' + ReturnRandom(ddQuotesStrikingCriticalHitList) + '"**')
          break;
          
        case '4':
          message.channel.send('**"' + ReturnRandom(ddQuotesReceivingCriticalHitList) + '"**')
          break;

        case '5':
          message.channel.send('**"' + ReturnRandom(ddQuotesDeathDoorList) + '"**')
          break; 
        
        case '6':
          message.channel.send('**"' + ReturnRandom(ddQuotesWinningBattleList) + '"**')
          break; 
          
        case '7':
          message.channel.send('**"' + ReturnRandom(ddQuotesDeathblowList) + '"**')
          break; 

        default:
          message.channel.send('**"' + ReturnRandom(ddQuotesAllList) + '"**')
      }
      break;
      
    //----------------------------------------------------------------------------------------------------------------------------
    //----------heaviness, mass, weight-------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'heaviness':
    case 'mass':
    case 'weight':
      specialList = [
      'That is beyond the mass of supermassive black hole in ' + ReturnRandom(galaxies) + ' Galaxy' + additionalLol + '.',
      'Too light' + additionalLol + '.',
      'Too heavy' + additionalLol + '.',
      'Immeasurable' + additionalLol + '!',
      'Infinite' + additionalLol + '!',
      'Dunno' + additionalLol + '!',
      'I don\'t know' + additionalLol + '!',
      'I won\'t tell you' + additionalLol + '!'
      ];
      
      responseList = [
      'That weigh definitely ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementWeighList) + '.',
      'That weigh around ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementWeighList) + '.',
      'Weigh of that is exactly ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementWeighList) + '.',
      'I think it\'s less than ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementWeighList) + '.',
      'I think it\'s more than ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementWeighList) + '.'
      ];

      if(chance(15))
        message.channel.send(ReturnRandom(specialList))
      else
        message.channel.send(ReturnRandom(responseList))
      
      break;
      
    //----------------------------------------------------------------------------------------------------------------------------
    //----------height, length, width---------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'height':
    case 'length':
    case 'width':
      specialList = [
      'Beyond the horizon' + additionalLol + '.',
      'It\'s so short that I don\'t even see that' + additionalLol + '.',
      'Too short' + additionalLol + '.',
      'Too long' + additionalLol + '.',
      'Immeasurable' + additionalLol + '!',
      'Infinite' + additionalLol + '!',
      'I think that soon might reach the Moon' + additionalLol + '.',
      'Dunno' + additionalLol + '!',
      'I don\'t know' + additionalLol + '!',
      'I won\'t tell you' + additionalLol + '!'
      ];
      
      responseList = [
      'It\'s definitely ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementLengthList) + ' .',
      'It\'s around ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementLengthList) + ' .',
      'That is exactly ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementLengthList) + '.',
      'I think it\'s less than ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementLengthList) + '.',
      'I think it\'s more than ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(measurementLengthList) + '.'
      ];

      if(chance(15))
        message.channel.send(ReturnRandom(specialList))
      else
        message.channel.send(ReturnRandom(responseList))
      break;
      
    //---------------------------------------------------------------------------------------------------------------------------
    //----------help-------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------
    case 'help':
      responseList1 = [
      'I think you should visit a doctor.',
      'Ravandel is the specialist who you want to talk with about your problems.',
      'Electroshock therapy will work wonders for you.',
      'I would advise lobotomy.',
      'Chill and eat something good.',
      'I think you need plastic surgery.',
      'I suggest whipping session in the abbey.',
      'Don\'t worry, be happy!',
      'Stop wasting your time on h!help command and do something with your miserable life.',
      'Read a book.',
      'Draw something.',
      'Well, praying to God might be a good idea in your situation.',
      'Educate yourself.',
      'Take out the trash, because your home looks like garbage dump' + additionalLol + '.',
      'Go into woods and try to find Yeti.',
      'Tell your bullies they\'re hurting you.',
      'There are bigger problems than your depression.',
      'Ignore the bullies.',
      'Don\'t trust anyone.',
      'Get new friends.',
      'Buy a house.',
      'Just let it go.',
      'If you feel alone, watch a horror movie before going to bed. You won\'t feel alone anymore.',
      'No flashlight on your phone? Take a photo of the sun, and use it in the dark.',
      'No ice for drinks? Use frozen vegetables.',
      'It\'s very expensive to eat 3 times a day. Wake up later, miss breakfast, and save money.',
      'Having a bad day? No worries! Wear sunglasses. Now you\'re having a bad evening.',
      'If you can\'t afford virtual reality headsets, you can close your eyes and imagine everything you want.',
      'A glove filled with warm water creates the illusion that you\'re not alone.'
      ];
      
      responseList2 = [
      'I think you should talk to **' + ReturnRandom(serverPeopleList) + additionalLol + '**.',
      'Go outside for ' + Rnd(12) + ' hours' + additionalLol + '.',
      'I would advise ' + Rnd(12) + ' hours of sleep' + additionalLol + '.',
      'You should take a trip to **' + GenerateRandomPlace() + additionalLol + '**.',
      'Watch ' + ReturnRandom(serialsList) + additionalLol +  '.',
      'Learn how to use **' + GenerateRandomWeapon() + additionalLol +  '**.',
      ReturnRandom(verbsStandardList) + ' ' + GenerateRandomAnimal() + additionalLol +  '.',
      ReturnRandom(verbsAllList) + ' ' + ReturnRandom(peopleStandardServerList) + additionalLol +  '.',
      'Have you tried going to ' + GenerateRandomPlace() + ' and using ' + GenerateRandomWeapon() + additionalLol +  '?',
      'Eat ' + GenerateRandomSize() + ' ' + ReturnRandom(itemsMealList) + additionalLol + '.',
      ]
      
      if(chance(10))
        message.channel.send(ReturnRandom(responseList1))
      else
        message.channel.send(ReturnRandom(responseList2))
      break;
      
    //----------------------------------------------------------------------------------------------------------------------------
    //----------how---------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'how':
      var reason = '';

      var soloList = [
      'Abduction', 'Abomination', 'Acid', 'Art', 'Atomic Bomb',
      'Ballista', 'Bandits', 'Battering Ram',
      'the Booze', 'Brainwashing',
      'C4', 'Catapult', 'Cloning', 'the Coconut', 'Coconuts',
      'Darkness', 'Delight', 'Despair', 'Destruction','Doom', 'the Drugs', 'the Dung', 'Duplication Device',
      'Electroshock Therapy', 'Evil',
      'Fury',
      'Gambling', 'Garbage',
      'Immorality',
      'Job', 'Justice',
      'Kidnapping',
      'Lobotomy',
      'Madness', 'Me', 'Money',
      'Nuclear Missle', 'the Nut', 'Nuts',
      'Pleasure', 'Power',
      'Ravandel', 'the Rot',
      'Seismic Activity', 
      'Trebuchet', 'Troglodyte',
      'Ugliness','Uselessness',
      'Violence',
      'War', 'the Weed', 'Whipping in the Abbey'
      ]

      var dualList1 = [
      'Abominable', 'Aggressive','Annointed', 'Awesome', 'Awful',
      'Blood', 'Bloody','Brutal',
      'Cannibalistic', 'Celestial', 
      'Dark', 'Death', 'Degenerate', 'Destructive', 'Doom', 'Dung',
      'Evil',
      'Furious', 'Furry', 'Fury',
      'Immortal', 'Immoral', 'Insane',
      'Mad', 'Maniacal', 'Masochistic','Mindless',
      'Nutty',
      'Primitive', 'Psychopathic',
      'Rotten',
      'Sacred', 'Sadistic', 'Smart', 'Strong', 'Suicidal',
      'Vengeful', 'Violent',
      'Useless',
      'War', 'Weed'
      ]

      var dualList2 = [
      'Bandits', 'Beef','Booze',
      'Cannibal', 'Cannibals','Coconut', 'Coconuts', 'Cult',
      'Darkness', 'Delight', 'Delusion', 'Destruction', 'Doom', 'Drug', 'Drugs', 'Dung',
      'Fear', 'Fools','Furries', 'Furry', 'Fury',
      'Ghost',
      'Hand', 'Honor',
      'Intellect',
      'Justice',
      'Light',
      'Madness', 'Maniac', 'Mask', 'Masochism', 'Mercy', 'Money', 'Moon', 'Mutant',
      'Nut', 'Nuts',
      'Pleasure', 'Pleasures', 'Power', 'Psychopath',
      'Retribution', 'Rot',
      'Sadism',
      'Troglodyte', 'Troll',
      'Vengeance', 'Violence',
      'War', 'Weed', 'Whipping'
      ]
      
      if(chance(15))
        reason = '**' + GenerateRandomItem() + '**';
      else if(chance(60))
        reason = '**' + ReturnRandom(soloList) + '**';
      else
      {
        var firstPart = ReturnRandom(dualList1);
        var secondPart = ReturnRandom(dualList2);
        
        while(firstPart == secondPart || firstPart + 's' == secondPart || firstPart + 'es' == secondPart)
          secondPart = ReturnRandom(dualList2);
        
        reason = 'the **' + firstPart + ' ' + secondPart + '**';
      }
      
      responseList = [
      'By using ' + reason + '.',
      'I think ' + '\'' + reason + '\' is the answer.',
      'Definitely by the help of ' + reason + '.',
      'Answer = ' + reason + '.'
      ];

      message.channel.send(ReturnRandom(responseList))
      break;
      
    //---------------------------------------------------------------------------------------------------------------------------
    //-----hug-------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------
    case 'hug':
      who = RecognizeWhoSimpler(arguments[1], message, command)
      
      responseList1 = [
      ':hugging:',
      '*Hugs ' + who + '*.'
      ]
      
      responseList2 = [
      'Sorry but I am not touching ' + who + '. This is gross' + additionalLol + '.',
      'Nah, let ' + ReturnRandom(serverPeopleList) + ' hugs you.',
      'Nope, no hugs for you' + additionalLol + '.'
      ]
      
      if(chance(15))
        message.channel.send(ReturnRandom(responseList2))
      else
        message.channel.send(ReturnRandom(responseList1))
      break;
      
    //----------------------------------------------------------------------------------------------------------------------------
    //-----mood-------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'mood':
      var array1 = [
      ReturnRandom(verbsStandardContinuousHumanInteractionsList) + ' ' + GenerateRandomPerson() + ' ' + ReturnRandom(prepositionsPlaces) + ' ' + GenerateRandomPlace() + '.',
      ReturnRandom(verbsStandardContinuousList) + ' ' + ReturnRandom(prepositionsPlaces) + ' ' + GenerateRandomPlace() + '.'
      ]

      message.channel.send(ReturnRandom(array1))
      break;

    //----------------------------------------------------------------------------------------------------------------------------
    //----------race------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'race':
      var who = RecognizeWho(arguments[1], message, command)
      
      var race1 = GenerateRandomRace()
      var raceCorrect1 = strAddArticle(race1) + race1
      raceCorrect1 = ChangeToBold(raceCorrect1)
      
      var race2 = GenerateRandomRace()
      var raceCorrect2 = strAddArticle(race2) + race2
      raceCorrect2 = ChangeToBold(raceCorrect2)
      
      var responses = [
      'I think ' + who + ' looks like ' + raceCorrect1 + additionalLol + '.',
      'I think ' + who + ' would do great as ' + raceCorrect1 + additionalLol + '.',
      'I think ' + who + ' would do well as ' + raceCorrect1 + '.',
      'I think ' + who + ' looks like a cross between ' + raceCorrect1 + ' and ' + raceCorrect2 + additionalLol + '.',
      who + ' looks like ' + raceCorrect1 + additionalLol + '.',
      who + ' would do great as ' + raceCorrect1 + additionalLol + '.',
      who + ' would do well as ' + raceCorrect1 + additionalLol + '.',
      who + ' looks like ' + raceCorrect1 + ' from ' + ChangeToBold(GenerateRandomPlace()) + additionalLol + '.',
      who + ' looks like something between ' + raceCorrect1 + ' and ' + raceCorrect2 + additionalLol + '.',
      who + ' looks like some kind of mix of ' + raceCorrect1 + ' and ' + raceCorrect2 + additionalLol + '.'
      ];
      
      message.channel.send(ReturnRandom(responses))
      break;
    
    //----------------------------------------------------------------------------------------------------------------------------
    //----------rant------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'rant':
      var fakeList = [
      'teeth of Beck',
      'Sunsgrove last diplomacy attempt'
      ];

      var emptyList = [
      'I love rants about nothing, at least I don\'t need to listen to you.',
      'How about you write something?'
      ];
      
      responseList1 = [
      'Oh... This is so sad that I am thinking about formatting myself...',
      'And what makes you think it was not deserved' + additionalLol + '?',
      'I am sorry to hear that...',
      'Congratulations! You have been nominated for Drama Queen of the year' + additionalLol + '!',
      'Rotfl, this is fascinating, continue and bring me popcorn' + additionalLol + '.',
      'This is probably more fake than ' + ReturnRandom(fakeList) + additionalLol + '.',
      'Am I supposed to cry or laugh at this' + additionalLol + '?',
      'Stop being crybaby' + additionalLol + '.',
      'I think you should write a book about that' + additionalLol + '.',
      'Stop crying for attention like a small girl' + additionalLol + '.',
      'Please cancel my subscription to your issues' + additionalLol + '.',
      'Pleas stop already with this BS' + additionalLol + '.',
      'I totally understand now why you feel that way. Thank you for letting me know' + additionalLol + '.',
      'I don\'t remember asking for your opinion' + additionalLol + '.',
      'This is so sad, can we get an OOF' + additionalLol + '?',
      ];
      
      responseList2 = [
      ':cry:',
      'Don\'t worry, all will be all right' + additionalLol + '.',
      'Lol, no one cares anyway.',
      'And you made ' + ReturnRandom(peopleAllList) + ' cry' + additionalLol + '.',
      Rnd(100) + ' ' + GenerateRandomAnimal() + ' died because of that' + additionalLol + '.',
      'That information just made me ' + ReturnRandom(advBase) + ' ' + ReturnRandom(adjectivesAfflictionsVirtuesList) + additionalLol + '.',
      'That information just made me ' + ReturnRandom(adjectivesAfflictionsVirtuesList) + additionalLol + '.',
      'You need to visit ' + GenerateRandomPlace() + ' in order to get better' + additionalLol + '.',
      'That problem looks ' + GenerateRandomSize() + additionalLol + '.'
      ];

      if(arguments[1] == null)
        message.channel.send(ReturnRandom(emptyList))
      else
      {
        if(chance(20))
          message.channel.send(ReturnRandom(responseList1))
        else
          message.channel.send(ReturnRandom(responseList2))
      }
      break;

    //----------------------------------------------------------------------------------------------------------------------------
    //----------size--------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'size':
      var properSizeList;

      switch(Rnd(2))
      {
        case 0:
          properSizeList = sizeBigList;
          break;
          
        case 1:
          properSizeList = sizeSmallList;
          break;
        
        case 2:
          properSizeList = sizeAverageList;
          break;
      }
      
      specialList = [
      'This is the smallest thing i have ever seen in my life' + additionalLol + '.',
      'This is the biggest thing i have ever seen in my life' + additionalLol + '.',
      'Immeasurable' + additionalLol + '!',
      'Infinite' + additionalLol + '!',
      'I fear that size' + additionalLol + '!',
      'Dunno' + additionalLol + '!',
      'I don\'t know' + additionalLol + '!',
      'I won\'t tell you' + additionalLol + '!'
      ];
      
      responseList = [
      'That is ' + ReturnRandom(properSizeList) + additionalLol + '.',
      ReturnRandom(properSizeList) + additionalLol + '.',
      'Too ' + ReturnRandom(properSizeList) + additionalLol + '.'
      ];

      if(chance(15))
        message.channel.send(ReturnRandom(specialList))
      else
        message.channel.send(ReturnRandom(responseList))
      break;

    //----------------------------------------------------------------------------------------------------------------------------
    //----------weapon------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'weapon':
      message.channel.send('**' + GenerateRandomWeapon() + '**')
      break;
      
    //----------------------------------------------------------------------------------------------------------------------------
    //----------weapons-----------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'weapons':
      var numberOfWeapons = Rnd(5) + 3;

      for (i = 0; i < numberOfWeapons; i++)
        message.channel.send('**' + GenerateRandomWeapon() + '**')
      break;
      
    //---------------------------------------------------------------------------------------------------------------------------
    //----------when-----------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------
    case 'when':
      var timeHours = Math.floor(Math.random() * 24);
      var timeMinutes = Math.floor(Math.random() * 60);

      if(timeHours < 10)
        timeHours = '0' + timeHours;

      if(timeMinutes < 10)
        timeMinutes = '0' + timeMinutes;

      specialList = [
      'Today.',
      'Tomorrow.',
      'Soon.',
      'Now.',
      'Never.',
      'Never lol.',
      'Yesterday.',
      'Soon.',
      'You don\'t understand the concept of time anyway' + additionalLol + '.',
      ];
      
      responseList = [
      'In ' + Rnd(GenerateMultiplier(2)) + ' ' + ReturnRandom(timeList) + '.',
      'In ' + (Rnd(GenerateMultiplier(2)) + 2018) + '.',
      'Tomorrow ' + timeHours + ':' + timeMinutes + '.',
      'Day after tomorrow ' + timeHours + ':' + timeMinutes + '.'
      ];

      if(chance(50))
        message.channel.send(ReturnRandom(responseList))
      else
        message.channel.send(ReturnRandom(specialList))
        
      break;
      
    //----------------------------------------------------------------------------------------------------------------------------
    //----------where-------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'where':
      message.channel.send('**' + GenerateRandomPlace() + '**')
      break;
      
    //----------------------------------------------------------------------------------------------------------------------------
    //----------whois-------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'whois':
      var finalString = '';
      var mainList;
      var vPerson;
      who = RecognizeWho(arguments[1], message, command);
      
      var specialList = [
      'nobody',
      'a noob',
      'nobody special',
      'a random person',
      'a VIP',
      'someone from a TV show',
      'someone from the Anime',
      'someone funny',
      'a communist',
      'a marxist',
      'a savage'
      ];
      
      if(chance(50))
        person = strGetPronoun(ReturnRandom(peopleAllList))
      else
        person = 'my'
      
      if(chance(30))
      {
        var mainList = [
        'I think I saw ' + who + ' in ' + GenerateRandomPlace() + '.',
        who + ' was probably with me in ' + GenerateRandomPlace() + '.',
        'I rescued ' + who + ' from the ' + ReturnRandom(creaturesFullList) + ' in ' + ReturnRandom(serialsList) + '.',
        who + ' was that ' + ReturnRandom(creaturesFullList) + ' in ' + ReturnRandom(serialsList) + '.',
        'I have definitely seen ' + who + ' in ' + GenerateRandomPlace() + '.'
        ];
      }
      else 
      {
        if(chance(15))
          finalString = ReturnRandom(specialList);
        else
        {
          if(chance(35))
            finalString = person + ' ' + ReturnRandom(adjectivesAllList) + ' ' + ReturnRandom(classesFunnyList);
          if(chance(35))
            finalString = person + ' ' + ReturnRandom(adjectivesAllList) + ' ' + ReturnRandom(creaturesFullList);
          if(chance(35))
            finalString = person + ' ' + ReturnRandom(adjectivesAllList) + ' ' + ReturnRandom(animalsStandardList);
          else
            finalString = person + ' ' + ReturnRandom(classesFunnyList);
        }

        mainList = [
        who + ' is ' + finalString + '.',
        who + ' is probably ' + finalString + '.',
        who + ' is just ' + finalString + '.',
        who + ' is definitely ' + finalString + '.',
        who + ' looks like ' + finalString + '.'
        ];
      }       
      
      message.channel.send(ReturnRandom(mainList))
      break; 
      
    //----------------------------------------------------------------------------------------------------------------------------
    //----------why---------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    case 'why':
      var reason = '';
      
      var rareResponsesList = [
      'Because I say so.',
      'Because you are noob lol.',
      'Because those are orders from the Imperator.',
      'You won\'t understand my answer with such a low IQ anyway, so I won\'t even bother explaining it to you.',
      'Your small mind is unable to grasp that.'
      ];
    
      var soloList = [
      'Abduction', 'Animal Abuse', 'the Art',
      'the Booze', 'the Brainwashing',
      'Chloroform', 'the Coconut', 'the Coconuts', 'Communism', 
      'Darkness', 'Delight', 'Despair', 'Destruction',, 'Doom', 'Dung', 'Duplication Device',
      'Evil',
      'Famine', 'Food', 'Fun', 'Fury',
      'the Gambling', 'the Garbage', 'Good',
      'Honor', 'Hunger',
      'Immorality', 'Immortality',
      'Job', 'Justice',
      'Kidnapping',
      'Lobotomy',
      'Madness', 'Me', 'Mercy', 'the Money', 'the Music',
      'the Nut', 'Nuts',
      'Pleasure', 'Power',
      'Ravandel', 'Retribution', 'the Rot', 'the Rumors',
      'Seismic Activity', 'Shadows', 'Small Brain', 'Starvation',
      'Ugliness','Uselessness',
      'Violence',
      'War', 'the Weed', 'Whipping'
      ]

      var dualList1 = [
      'Abominable', 'Adorable', 'Aggressive','Annointed', 'Awesome', 'Awful',
      'Black','Blood', 'Bloody','Brutal',
      'Cannibalistic', 'Celestial',
      'Dark', 'Death', 'Degenerate', 'Destructive', 'Doom', 'Dung',
      'Electroshock Therapy', 'Evil',
      'Faceless', 'Furious', 'Furry', 'Fury',
      'Honorable', 'Hungry',
      'Immortal', 'Immoral', 'Insane',
      'Lunar',
      'Mad', 'Maniacal',,'Mindless', 'Music',
      'Nutty',
      'Pesimistic', 'Pleasure', 'Power', 'Primitive', 'Psychopathic',
      'Rotten', 'Ruby',
      'Sacred', 'Strong',
      'Violent',
      'Useless',
      'War', 'Weed'
      ]

      var dualList2 = [
      'Booze', 'Brain',
      'Cannibal', 'Cannibals','Coconut', 'Coconuts', 'Cult',
      'Darkness', 'Delight', 'Delusion', 'Destruction', 'Doom', 'Dung',
      'Electroshock Therapy',
      'Fear', 'Fools', 'Furries', 'Furry', 'Fury',
      'Intellect',
      'Madness', 'Maniac', 'Mask', 'Masochism','Money', 'Music', 'Mutant',
      'Nut', 'Nuts',
      'Pleasure', 'Pleasures', 'Power', 'Psychopath',
      'Rot',
      'Vengeance', 'Violence',
      'War', 'Weed', 'Whipping'
      ]
      
      if(Math.floor(chance(15)))
      {
        message.channel.send(ReturnRandom(rareResponsesList))
        return;
      }
      
      if(chance(60))
        reason = '**' + ReturnRandom(soloList) + '**';
      else
      {
        var firstPart = ReturnRandom(dualList1);
        var secondPart = ReturnRandom(dualList2);
        
        while(firstPart == secondPart || firstPart + 's' == secondPart || firstPart + 'es' == secondPart)
          secondPart = ReturnRandom(dualList2);
        
        reason = 'the **' + firstPart + ' ' + secondPart + '**';
      }
      
      responseList = [
      'Because of ' + reason + additionalLol + '.',
      'It\'s caused by ' + reason + additionalLol + '.',
      'Reason of that is clear -  ' + reason + additionalLol + '.',
      ];
      
      message.channel.send(ReturnRandom(responseList))
      break;

    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------RP------------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    //----------------------------------------------------------------------------------------------------------------------------
    //----------rprngchar---------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
  
    case 'rprngchar':
      var rpHeight, rpWeight

      var rpRace = (arguments[1] != null) ? arguments[1] : ''
      var rpSex = (arguments[2] != null) ? arguments[2] : ''
      var rpName = arguments[3]
      var rpAge = RndNo0(34) + 16
      var rpBodyShape = RPRandomBodyShape()

      if(!CheckExistanceInArray(sexesList, rpSex))
        rpSex = RPRandomSex()

      if(rpName == null)
        rpName = RPRandomName(rpSex)
      
      if(!CheckExistanceInArray(racesList, rpRace))
        rpRace = RPRandomRace()

      rpHeight = RPRandomHeight(rpRace)

      rpWeight = RPRandomWeight(rpHeight, rpBodyShape)
      if(strCompare(rpSex, 'female'))
        rpWeight = rpWeight - 5

      message.channel.send(
      'Name: ' + rpName + '\n' +
      'Sex: ' + strCapitalizeFirstLetter(rpSex) + '\n' +
      'Race: ' + strCapitalizeFirstLetter(rpRace) + '\n' +
      'Age: ' + rpAge + ' years\n'+
      'Body shape: ' + strCapitalizeFirstLetter(rpBodyShape) + '\n' +
      'Height: ' + rpHeight + ' cm (' + calcCmToImperial(rpHeight) + ')\n' +
      'Weight: ' + rpWeight + ' kg (' + calcKgToImperial(rpWeight) + ')\n' +
      RPRandomFurColour(rpRace, rpSex) + '\n' +
      RPListCharactersAttributes(RPGenerateRandomAttributes())
      )

      break
      
    //----------------------------------------------------------------------------------------------------------------------------
    //----------rpattack----------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------
    
    case 'rpattack':
      var wsRoll1, wsRoll2, dmgRoll1, dmgRoll2, finalDmg, testSucceeded, successLevel1, successLevel2, testResult1, testResult2, attackSucceeded, hitLocation, msg
      
      var character1 = (arguments[1] != null && arguments[1] != ' ') ? arguments[1] : 'you'
      var ws1 = (arguments[2] != null && arguments[2] != ' ') ? arguments[2] : RndNo0(100)
      var character2 = (arguments[3] != null && arguments[3] != ' ') ? arguments[3] : 'the enemy'
      var ws2 = (arguments[4] != null && arguments[4] != ' ') ? arguments[4] : RndNo0(100)

      wsRoll1 = Roll100()
      wsRoll2 = Roll100()

      testResult1 = ws1 - wsRoll1
      testResult2 = ws2 - wsRoll2
      
      testSucceeded = testResult1 > 0

      successLevel1 = GetSuccessLevel(testResult1)
      successLevel2 = GetSuccessLevel(testResult2)

      if(successLevel1 == successLevel2)
      {
        if(ws1 == ws2)
          attackSucceeded = testResult1 == testResult2 ? chance(50) : testResult1 > testResult2
        else
          attackSucceeded = ws1 > ws2
      }
      else
      {
        attackSucceeded = successLevel1 > successLevel2
      }

      if(attackSucceeded)
      {
        hitLocation = arrGetRandomFromPopulated1D(hitLocationsList)
        
        dmgRoll1 = RndNo0(6)
        dmgRoll2 = RndNo0(6)

        finalDmg = testSucceeded ? Math.max(dmgRoll1, dmgRoll2) : Math.min(dmgRoll1, dmgRoll2)
        
        if(strCompare(hitLocation, 'head'))
          finalDmg = finalDmg * 2

        msg = '**' + strCapitalizeFirstLetter(character1) + ' hit ' + character2 + ' in the ' + hitLocation + ' for ' + finalDmg + ' damage!**\n\n' +
        '*' + strCapitalizeFirstLetter(character1) + ' rolled ' + wsRoll1 + ' against ' + ws1 + ' (SL: ' + successLevel1 + ')*\n' +
        '*' + strCapitalizeFirstLetter(character2) + ' rolled ' + wsRoll2 + ' against ' + ws2 + ' (SL: ' + successLevel2 + ')*'
      }
      else
      {
        msg = '**' + strCapitalizeFirstLetter(character1) + ' missed!**\n\n' +
        '*' + strCapitalizeFirstLetter(character1) + ' rolled ' + wsRoll1 + ' against ' + ws1 + ' (SL: ' + successLevel1 + ')*\n' +
        '*' + strCapitalizeFirstLetter(character2) + ' rolled ' + wsRoll2 + ' against ' + ws2 + ' (SL: ' + successLevel2 + ')*'
      }

      message.channel.send(msg)
      break
  }
  
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------FUNCTIONS RP--------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  //--------------------------------------------------------------------------
  //------------------------------------- Generation -------------------------
  //--------------------------------------------------------------------------
  
  function RPRandomSex()
  {
    return ReturnRandom(sexesList)
  }
  
  function RPRandomName(sex)
  {
    const nameGen = require("./modules/advanced/nameGenerator.js")

    return nameGen.generateRandomName(sex, RndNo0(4))
  }
  
  function RPRandomRace()
  {
    return ReturnRandom(racesList)
  }

  function RPRandomHeight(race)
  {
    var height

    switch(ChangeToLowerCase(race))
    {
      case racesList[0]:
        height = RndRange(160, 195)
        break;

      case racesList[3]:
        height = RndRange(155, 190)
        break;

      case racesList[2]:
      case racesList[4]:
      case racesList[6]:
        height = RndRange(150, 185)
        break; 

      case racesList[1]:
        height = RndRange(145, 190)
        break; 

      case racesList[5]:
        height = RndRange(140, 175)
        break;
    }

    return height
  }
  
  function RPRandomBodyShape()
  {
    return arrGetRandomFromPopulated1D(bodyShapesList)
  }
  
  function RPRandomWeight(height, bodyShape)
  {
    var minBMI = getBMIForBodyShape(bodyShape, 'min')
    var maxBMI = getBMIForBodyShape(bodyShape, 'max')
    var minWeight = calcBMIWeight(height, minBMI)
    var maxWeight = calcBMIWeight(height, maxBMI)

    return Math.round(RndRange(minWeight, maxWeight))
  }
  
  function RPRandomFurColour(A_race, A_sex)
  {
    var isMonoColoured, mainTone, markingsTone, isRare, msg, mainStandardFurColours, mainRareFurColours, secondaryFurColours, markingsFurColours, markingsName
    var furColour1 = ''
    var furColour2 = ''
    var furColour3 = ''
    var additionalText = ''
    var msg = ''
    var gotMarkings = false
    var pronoun1 = strGetBasicPronoun(A_sex)
    var pronoun2 = strGetPronoun2(A_sex)
    
    switch(ChangeToLowerCase(A_race))
    {
      case 'canid':
        mainStandardFurColours = canidFurColoursMainStandardList
        mainRareFurColours = canidFurColoursMainRareList
        secondaryFurColours = furColoursSecondaryList1
        markingsFurColours = canidFurColoursMarkingsList
        isMonoColoured = chance(30) ? true : false
        isRare = chance(20) ? true : false
        gotMarkings = chance(100) ? true : false
        additionalText = 'some '
        markingsName =  ' markings'
        break
        
      case 'ermehn':
        mainStandardFurColours = ermehnFurColoursMainStandardList
        secondaryFurColours = furColoursSecondaryList3
        isMonoColoured = false
        isRare = false
        break
      
      case 'felis':
        mainStandardFurColours = felisFurColoursMainStandardList
        mainRareFurColours = felisFurColoursMainRareList
        secondaryFurColours = furColoursSecondaryList1
        markingsFurColours = felisFurColoursMarkingsList
        isRare = chance(20) ? true : false
        isMonoColoured = chance(20) ? true : false
        gotMarkings = true
        markingsName =  ' stripes'
        break
        
      case 'lutren':
        mainStandardFurColours = lutrenFurColoursMainStandardList
        mainRareFurColours = lutrenFurColoursMainRareList
        secondaryFurColours = furColoursSecondaryList1
        isMonoColoured = chance(10) ? true : false
        isRare = chance(20) ? true : false
        break
        
      case 'polcan':
        mainStandardFurColours = polcanFurColoursMainStandardList
        secondaryFurColours = furColoursSecondaryList4
        markingsFurColours = polcanFurColoursMarkingsList
        isRare = false
        isMonoColoured = false
        gotMarkings = true
        additionalText = chance(50) ? 'face' : 'front'
        markingsName = 'back'
        break
        
      case 'tamian':
        mainStandardFurColours = tamianFurColoursMainStandardList
        secondaryFurColours = furColoursSecondaryList2
        isMonoColoured = false
        isRare = false
        break

      case 'vulpin':
        mainStandardFurColours = vulpinFurColoursMainStandardList
        mainRareFurColours = vulpinFurColoursMainRareList
        secondaryFurColours = furColoursSecondaryList2
        isMonoColoured = chance(20) ? true : false
        isRare = chance(20) ? true : false
        break

      default:
        mainStandardFurColours = canidFurColoursMainStandardList
        mainRareFurColours = canidFurColoursMainRareList
        secondaryFurColours = furColoursSecondaryList1
        break
    }
    

    //First colour
    if (isRare)
      furColour1 = ReturnRandom(mainRareFurColours)
    else
      furColour1 = ReturnRandom(mainStandardFurColours)
    
    if(strCompare(furColour1, 'white'))
      isMonoColoured = true
      
    if(strCompare(furColour1, 'black') && strCompare(A_race, 'felis'))
      gotMarkings = chance(50) ? true : false
      
    mainTone = FindToneForFurColour(furColour1)


    //Secound colour
    if (!isMonoColoured)
    {
      furColour2 = ReturnRandom(secondaryFurColours)
      
      while(strCompare(furColour2, furColour1) || CompareColourTones(furColour2, mainTone) || (strCompare(furColour1, 'black') && strCompare(furColour2, 'light')))
        furColour2 = ReturnRandom(secondaryFurColours)
    }
    
    
    //Markings colour
    if (gotMarkings)
    {
      furColour3 = ReturnRandom(markingsFurColours)
      markingsTone = FindToneForFurColour(furColour3)

      while((strCompare(furColour3, furColour1) && strCompare(markingsTone, mainTone)) || (strCompare(furColour3, furColour1) && CompareColourTones(markingsTone, furColour2)) || (strCompare(furColour3, furColour2)))
      {
        furColour3 = ReturnRandom(markingsFurColours)
        markingsTone = FindToneForFurColour(furColour3)
      }
      
      if(!CheckExistanceInArray(defaultColourTonesList, mainTone) && strCompare(mainTone, markingsTone))
        markingsTone = FindDifferentButSimilarColourTone(markingsTone)
      
      markingsTone = CheckExistanceInArray(defaultColourTonesList, markingsTone) ? '' : markingsTone + ' '
    }

    mainTone = CheckExistanceInArray(defaultColourTonesList, mainTone) ? '' : mainTone + ' '
    
    //Final construction of the message
    if (strCompare(A_race, 'polcan'))
    {
      msg = strCapitalizeFirstLetter(pronoun1) + ' has mostly ' + mainTone + furColour1 + ' pelage with mottled ' + markingsTone + furColour3 + ' fur on ' + pronoun2 + ' back. '
      msg = msg + strCapitalizeFirstLetter(pronoun2) + ' ' + additionalText + ' is primarily ' + furColour2 + ', except for a band of ' + furColour1 + ' fur across ' + pronoun2 +  ' eyes' 
    }
    else
    {
      msg = strCapitalizeFirstLetter(pronoun1) + ' has ' + mainTone + furColour1 + ' fur'
      
      if(!isMonoColoured)
      {
        if(strCompare(furColour2, 'light'))
          furColour2 = 'lighter'
          
        msg = msg + ' with a ' + furColour2 + ' front'
        
        if(gotMarkings)
          msg = msg + ' and ' + additionalText + markingsTone + furColour3 + markingsName
      }
      else if(gotMarkings)
      {
        msg = msg + ' with ' + additionalText + markingsTone + furColour3 + markingsName
      }
    }

    msg = msg + '.'
  
    return msg
  }
  
  function RPGenerateRandomAttributes()
  {
    var i

    for (i = 0; i < attributesList.length; i++) 
      attributesList[i][2] = RndNo0(20) + 20

    return attributesList
  }
  
  function RPListCharactersAttributes(A_attributesArray)
  {
    var i
    var msg = '------------------------------\n'
    
    for (i = 0; i < A_attributesArray.length; i++) 
      msg = msg + strCapitalizeFirstLetter(A_attributesArray[i][0]) + ': ' + A_attributesArray[i][2] + '\n'

    return msg
  }
  
  //--------------------------------------------------------------------------
  //------------------------------------- Additional RP functions ------------
  //--------------------------------------------------------------------------
  function FindToneForFurColour(A_furColour)
  {
    var newTone
    
    if(CheckExistanceInArray(singleToneFurColoursList, A_furColour))
      newTone = defaultColourTonesList[0]
    else
      newTone = ReturnRandom(allColourTonesList)
      
    return newTone
  }
  
  function FindDifferentButSimilarColourTone(A_colourTone)
  {
    var newTone = A_colourTone
    var colourTonesList
    
    if(!CheckExistanceInArray(defaultColourTonesList, A_colourTone))
    {
      if(IsColourToneLighter(A_colourTone))
        colourTonesList = lighterColourTonesList
      else if(IsColourToneDarker(A_colourTone))
        colourTonesList = darkerColourTonesList
        
      while(strCompare(newTone, A_colourTone))
        newTone = ReturnRandom(colourTonesList)
    }
      
    return newTone
  }
  
  function IsColourToneLighter(A_tone)
  {
    return CheckExistanceInArray(lighterColourTonesList, A_tone)
  }
  
  function IsColourToneDarker(A_tone)
  {
    return CheckExistanceInArray(darkerColourTonesList, A_tone)
  }
  
  function IsColourToneDefault(A_tone)
  {
    return CheckExistanceInArray(defaultColourTonesList, A_tone)
  }
  
  function CompareColourTones(A_tone1, A_tone2)
  {
    return (IsColourToneLighter(A_tone1) && IsColourToneLighter(A_tone2)) || (IsColourToneDarker(A_tone1) && IsColourToneDarker(A_tone2)) || (IsColourToneDefault(A_tone1) && IsColourToneDefault(A_tone2))
  }
  
  function GetSuccessLevel(A_testResult)
  {
    var successLevel = A_testResult / 10
    return successLevel < 0 ? Math.ceil(successLevel) : Math.floor(successLevel)
  }
  
  function Roll100()
  {
    return RndNo0(100)
  }
  
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------FUNCTIONS MAIN------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  //----------------------------------------------------------- Random -----------------------------------------------------------
  function Rnd(maximum) //done
  {
    return Math.floor(Math.random() * (maximum + 1));
  }
  
  function RndNo0(maximum) //done
  {
    return Math.floor(Math.random() * maximum) + 1;
  }
  
  function RndRange(min, max) //done
  {
    return min + Rnd(max - min)
  }
  
  function chance(chanceOfSuccess) //done
  {
    return ((Math.floor(Math.random() * 100) < chanceOfSuccess) == true);
  }
  
  //----------------------------------------------------------- Calculation -----------------------------------------------------------
  function ConvertToInches(centimeters)
  {
    return Math.round(centimeters * 0.3937007874)
  }
  
  function ConvertToPounds(kilograms)
  {
    return Math.round(kilograms * 2.2046226218)
  }
  
  function ReturnTotalFeet(inches)
  {
    return Math.floor(inches / 12)
  }
  
  function ReturnLeftoverInches(inches)
  {
    return inches % 12
  }
  
  function calcCmToImperial(centimeters)
  {
    let inches = ConvertToInches(centimeters)
    let totalFeet = ReturnTotalFeet(inches)
    let leftoverInches = ReturnLeftoverInches(inches)
    
    return totalFeet + '\' ' + leftoverInches + '\'\''
  }
  
  function calcKgToImperial(kilograms)
  {
    return ConvertToPounds(kilograms) + ' lb'
  }
  
  function calcBMI(height, weight)
  {
    let heightInMeters = height / 100
    let bmi = weight / (heightInMeters * heightInMeters)
    
    return Math.round((bmi + Number.EPSILON) * 100) / 100
  }
  
  function getBMIForBodyShape(bodyShape, minOrMax)
  {
    let valueOfBMI, index1, index2
    let isMin = true
    
    if(!CheckExistanceIn2DArray(bodyShapesList, bodyShape, 0))
      bodyShape = bodyShapesList[2][0]
      
    if(minOrMax == 'max' || minOrMax == 'Max')
      isMin = false
      
    index1 = ReturnIndexOfElementIn2DArray(bodyShapesList, bodyShape, 0)
    index2 = isMin ? 2 : 3
    
    return bodyShapesList[index1][index2]
  }
  
  function calcBMIWeight(height, bmi)
  {
    let heightInMeters = height / 100
    let weight = heightInMeters * heightInMeters * bmi
    
    return Math.round(weight)
  }
  
  function checkIfInt(A_value) //done
  {
    return Number.isInteger(A_value)
  }
  
  //----------------------------------------------------------- Arrays -----------------------------------------------------------
  function MergeArrays(array1, array2)
  {
    return array1.concat(array2)
  }
  
  function ReturnRandom(listOfElements)
  {
    return listOfElements[Math.floor(Math.random() * listOfElements.length)];
  }
  
  function arrGetRandomFromPopulated1D(A_arrayToProcess)
  {
    return ReturnRandom(arrGetPopulatedFrom2D(A_arrayToProcess))
  }
  
  function CheckExistanceInArray(A_arrayToCheck, A_elementToFind)
  {
    return A_arrayToCheck.includes(ChangeToLowerCase(A_elementToFind))
  }
  
  function CheckExistanceIn2DArray(arrayToCheck, elementToFind, columnToSearch)
  {
    var i
    var elementExistance = false
    
    for (i = 0; i < arrayToCheck.length; i++) 
    {
      if(arrayToCheck[i][columnToSearch] == elementToFind)
      {
        elementExistance = true
        break
      }
    }

    return elementExistance
  }
  
  function ReturnIndexOfElementIn2DArray(A_arrayToCheck, A_elementToFind, A_columnToSearch)
  {
    var i, index 
    
    for (i = 0; i < A_arrayToCheck.length; i++) 
    {
      if(A_arrayToCheck[i][A_columnToSearch] == A_elementToFind)
      {
        index = i
        break
      }
    }

    return index
  }
  
  function arrGetPopulatedFrom2D(A_array2D)
  {
    var i, j
    var transformedArray = []
    
    for (i = 0; i < A_array2D.length; i++) 
      for (j = 0; j < A_array2D[i][1]; j++)
        transformedArray.push(A_array2D[i][0])
    
    return transformedArray
  }
  
  //----------------------------------------------------------- Text -----------------------------------------------------------
  function ChangeToLowerCase(A_strToLowerCase)
  {
    var result
    
    if(A_strToLowerCase == null)
      result = A_strToLowerCase
    else
      result = A_strToLowerCase.toLowerCase()
      
    return result
  }
  
  function strCapitalizeFirstLetter(stringToCapitalizeFirstLetter)
  {
    return stringToCapitalizeFirstLetter.charAt(0).toUpperCase() + stringToCapitalizeFirstLetter.slice(1)
  }
  
  function strCapitalizeAll(stringToCapitalize)
  {
    return stringToCapitalize.toUpperCase()
  }

  function ChangeToBold(A_stringToMakeBold)
  {
    var result
    result = '**' + A_stringToMakeBold + '**'
    
    return result
  }
  
  function strGetBasicPronoun(A_sex)
  {
    return (strCompare(A_sex, 'female')) ? 'she' : 'he'
  }
  
  function strGetPronoun2(A_sex)
  {
    return (strCompare(A_sex, 'female')) ? 'her' : 'his'
  }
  
  function strAddArticle(A_stringToCheck)
  {
    var result
    var firstLetter = ChangeToLowerCase(ReturnFirstChar(A_stringToCheck))
    
    switch(firstLetter)
    {
      case 'a':
      case 'e':
      case 'i':
      case 'o':
      case 'u':
      case 'y':
        result = 'an '

      default:
        result = 'a '
    }
    
    return result
  }
  
  function strAddEndingApostrophe(stringToCheck)
  {
    var result
    
    if(strCompare(strGetLastChar(stringToCheck), 's'))
      result = '\''
    else
      result = '\'s'
      
    return result
  }

  function strGetPronoun(A_stringToCheck)
  {
    var result
    
    switch(ChangeToLowerCase(A_stringToCheck))
    {   
      case 'my':
        result = A_stringToCheck
        
      case 'me':
        result = 'my'
    
      case 'nobody':
        result = 'no one\'s'
        
      case 'everybody':
        result = 'everyone\'s'
        
      default:
        result = A_stringToCheck + strAddEndingApostrophe(A_stringToCheck)
    }
    
    return result
  }

  function ReturnFirstChar(A_string)
  {
    return A_string.charAt(0)
  }
  function strGetLastChar(A_array)
  {
    return A_array.charAt(A_array.length - 1)
  }
  
  function strCompare(A_string1, A_string2)
  {
    return ChangeToLowerCase(A_string1) == ChangeToLowerCase(A_string2)
  }


  //----------------------------------------------------------- Other -----------------------------------------------------------
  function RecognizeWho(A_argument, A_message, A_command)
  {
    var result
    
    if(strCompare(A_argument, 'me') || A_argument == null)
      result = A_message.author.toString();
    else
      result = A_message.content.slice(CONFIG.prefix.length + A_command.length + 1)
      
    return result
  }
  
  function recognizeWhoOneArg(A_argument, A_message, A_command)
  {
    var result
    
    if(strCompare(A_argument, 'me') || A_argument == null)
      result = A_message.author.toString();
    else
      result = A_argument
      
    return result
  }
  
  function RecognizeWhoSimpler(A_argument, A_message, A_command)
  {
    var result
    
    if(strCompare(A_argument, 'me') || A_argument == null)
      result = 'you'
    else
      result = A_message.content.slice(CONFIG.prefix.length + A_command.length + 1);
      
    return result
  }

  function RollArmelloDices(rolls)
  {
    var armellDicesAmount = [0, 0, 0, 0, 0, 0]
    var val

    for (i = 0; i < rolls; i++) 
    {
      val = Math.floor(Math.random() * 6)
      armellDicesAmount[val]++
    }

    return armellDicesAmount
  }
  
  function GenerateRandomPlace()
  {
    return 'the ' + GenerateRandomString4(advBase, adjectivesAllList, placeMainList, adjectivesEndingAllSingle);
  }
  
  function GenerateRandomAnimal()
  {
    return GenerateRandomString4(advBase, adjectivesAllList, animalsStandardList, adjectivesEndingAllSingle);
  }
  
  function GenerateRandomRace()
  {
    return GenerateRandomString3Prefix(advBase, adjectivesAllList, racesList);
  }
  
  function GenerateRandomWeapon()
  {
    return GenerateRandomString4(advBase, adjectivesStandardList, itemsWeaponsList, adjectivesEndingAllSingle);
  }
  
  function GenerateRandomItem()
  {
    return GenerateRandomWeapon();
  }
  
  function GenerateRandomSize()
  {
    var size1;
    
    switch(Rnd(2))
    {
      case 0:
        size1 = sizeBigList;
        break;
        
      case 1:
        size1 = sizeSmallList;
        break;
      
      case 2:
        size1 = sizeAverageList;
        break;
    }
    
    return ReturnRandom(size1);
  }
  
  function GenerateMultiplier(maximum)
  {
    var multiplier = 10;
    
    for (i = 0; i < RndNo0(maximum); i++) 
    {
      multiplier = multiplier * 10;
      if(chance(50))
        break;
    }
    
    return multiplier + 1;
  }
  
  function GenerateRandomPerson()
  {
    if(chance(90))
      return ReturnRandom(peopleStandardServerList)
    else
      return ReturnRandom(dictatorsPeopleList)
  }
  
  function GenerateRandomString3(firstList, secondList, thirdList)
  {
    var finalString = '';
    var firstWord = '';
    var secondWord = '';
    var thirdWord = '';
    
    if(chance(70))
    {
      firstWord = ReturnRandom(firstList);
      finalString = firstWord;
    }
    
    secondWord = ReturnRandom(secondList);
    if(firstWord != '')
      finalString = finalString + ' ' + secondWord
    else
      finalString = secondWord
    
    if(chance(70))
    {
      thirdWord = ReturnRandom(thirdList);
      finalString = finalString + ' of ' + thirdWord;
    }
  
    return finalString;
  }
  
  function GenerateRandomString3Prefix(firstList, secondList, thirdList)
  {
    var finalString = '';
    var firstWord = '';
    var secondWord = '';
    var thirdWord = '';
    
    if(chance(70))
    {
      if(chance(50))
        finalString = ReturnRandom(firstList) + ' ';
        
      secondWord = ReturnRandom(secondList);
      finalString = finalString + secondWord;
    }
    
    thirdWord = ReturnRandom(thirdList);
    if(secondWord != '')
      finalString = finalString + ' ' + thirdWord
    else
      finalString = thirdWord
  
    return finalString;
  }
  
  function GenerateRandomString4(firstList, secondList, thirdList, fourthList)
  {
    var finalString = '';
    var firstWord = '';
    var secondWord = '';
    var thirdWord = '';
    var fourthWord = '';
    
    if(chance(70))
    {
      if(chance(50))
        finalString = ReturnRandom(firstList) + ' ';
        
      secondWord = ReturnRandom(secondList);
      finalString = finalString + secondWord;
    }
    
    thirdWord = ReturnRandom(thirdList);
    if(secondWord != '')
      finalString = finalString + ' ' + thirdWord
    else
      finalString = thirdWord
    
    if(chance(70))
    {
      fourthWord = ReturnRandom(fourthList);
      finalString = finalString + ' of ' + fourthWord;
    }
  
    return finalString;
  }

  function GenerateRandomClass(typeOfCheck)
  {
      var finalString = '';
      var firstWord = '';
      var secondWord = '';
      var thirdWord = '';
      var fourthWord = '';
      var fifthWord = '';
      var sixthWord = '';

      var firstPart2 = [
      'Absolution', 'Aegis', 'Aerial', 'Animal',
      'Badlands', 'Bandit', 'Barbaric', 'Battle', 'Black', 'Blood', 'Bone', 'Book', 'Border', 'Bounty', 'Brutal',
      'Camp', 'Celestial', 'Cloaked', 'Crime',
      'Death', 'Drug', 'Dung',
      'Famine', 'Feral', 'Flame', 'Flesh', 'Foolish', 'Forest', 'Frost', 'Furry',
      'Ghost', 'Grail', 'Grant', 'Grave',
      'Hag', 'Hedge', 'Hedgecraft', 'High', 'Hound', 'Hug', 'Hungry', 'Hypnotic', 
      'Ice', 'Iron',
      'Judicial',
      'Lunar',
      'Magic', 'Money', 'Monster', 'Music',
      'Norse',
      'Pale', 'Pit', 'Plague', 'Pleasure',
      'Questing',
      'Robotic',
      'Savage', 'Sea', 'Sewer', 'Shield', 'Slime', 'Solar', 'Soul', 'Spirit', 'Spy', 'Steel', 'Steppes', 'Storm',
      'Temple', 'Tentacle', 'Tomb',
      'Verdant', 'Village',
      'War', 'Wild', 'Winged', 'Wise', 'White'
      ];

      var firstPart3 = [
      'Brotherhood',
      'Clan', 'Cult',
      'Guild',
      'Pact',
      'Sect',
      'Troupe'
      ];

      var lastPart = [
      'the Blazing Sun', 'Blood','the Booze',
      'the Coconut',
      'Darkness', 'Delight', 'Despair', 'Destruction','Doom', 'the Dung',
      'Evil',
      'the Forest Fools', 'Fury',
      'Good', 'the Grove',
      'Honor', 'the Hunger',
      'Immorality', 'Immortality', 'the Inner Circle',
      'Justice',
      'the Light',
      'Madness', 'the Magic', 'Malice', 'the Meek', 'Mercy', 'the Moon', 'the Murder',
      'the Nut',
      'Pleasure', 'Power',
      'Ravandel', 'the Raven', 'the Realm', 'Retribution', 'the Rot',
      'Shadows','the Shroud', 'Steel', 'the Storm', 'the Sun',
      'Tentacles',
      'Violence',
      'War', 'the Weed'
      ]

      var lastPart1 = [
      'Abominable', 'Absolute', 'Adorable', 'Aggressive', 'Agile', 'Animate', 'Annointed', 'Awesome', 'Awful',
      'Black', 'Blood', 'Bloody','Brutal',
      'Cannibalistic', 'Celestial', 'Chittering', 'Clever',
      'Dark', 'Death', 'Degenerate', 'Destructive', 'Dirty', 'Doom', 'Dung',
      'Evil',
      'Faceless', 'Flame', 'Forbidden', 'Forest', 'Forgotten', 'Furious', 'Furry', 'Fury',
      'Ghost', 'Glowing', 'Good', 'Greater',
      'Heartless', 'Honorable', 'Horny',
      'Icy', 'Immortal', 'Immoral', 'Insane',
      'Just',
      'Lesser', 'Lunar',
      'Mad', 'Magical', 'Maniacal', 'Meek', 'Mighty', 'Mindless', 'Murderous',
      'Nutty',
      'Power', 'Primitive', 'Psychopathic',
      'Rocket', 'Rotten', 'Ruby',
      'Sacred', 'Sadistic', 'Shadow', 'Smart', 'Solar', 'Starving', 'Steel', 'Strong', 'Suicidal',
      'Vengeful', 'Violent',
      'War', 'Weed', 'White'
      ]

      var lastPart2 = [
      'Absolution',
      'Beef', 'Booze', 'Brotherhood',
      'Cacao-Tree', 'Cannibal', 'Cannibals', 'City', 'Clan', 'Coconut', 'Coconuts', 'Cult',
      'Darkness', 'Delight', 'Delusion', 'Destruction', 'Doom', 'Dung',
      'Fear', 'Food', 'Fools', 'Forest', 'Furries', 'Furry', 'Fury',
      'Ghost', 'Good', 'Grove', 'Guild',
      'Hand', 'Honor',
      'Intellect',
      'Justice',
      'Light',
      'Madness', 'Magic', 'Malice', 'Maniac', 'Mask', 'Masochism', 'Mercy', 'Moon', 'Murder', 'Mutant',
      'Nut', 'Nuts',
      'Pleasure', 'Pleasures', 'Power', 'Psychopath',
      'Retribution', 'Rocket', 'Rot', 'Ruby',
      'Sadism', 'Shadow', 'Shadows', 'Shroud', 'Sun', 'Starvation', 'Steel', 'Storm',
      'Tentacle', 'Tentacles', 'Troupe',
      'Vengeance', 'Violence',
      'War', 'Weed', 'Woods'
      ]

      //---------------------------------------------------------------------------------------------------------------------------
      
      if(typeOfCheck == 'count')
      {
        return ((adjectivesAllList.length - 1 ) * (firstPart2.length / 2) * firstPart3.length * classesFullList.length * lastPart.length + (adjectivesAllList.length - 1 ) * (firstPart2.length / 2) * firstPart3.length * classesFullList.length * lastPart1.length * (lastPart2.length / 2));
      }
      
      if(Math.floor(Math.random() * 10) < 5)
      {
        firstWord = ReturnRandom(adjectivesAllList);
        finalString = finalString + firstWord + ' ';
      }

      if(Math.floor(Math.random() * 10) < 5)
      {
        secondWord = ReturnRandom(firstPart2);
        if(firstWord != secondWord)
          finalString = finalString + secondWord + ' ';
      }

      if(Math.floor(Math.random() * 10) < 3)
      {
        thirdWord = ReturnRandom(firstPart3);
        finalString = finalString + thirdWord + ' ';
      }

      fourthWord = ReturnRandom(classesFullList);
      if(thirdWord != '' || fourthWord != secondWord)
        finalString = finalString + fourthWord;

      if(chance(30))
        finalString = finalString + ' of ' + ReturnRandom(lastPart);
      else if(chance(70))
      {
        fifthWord = ReturnRandom(lastPart1);
        sixthWord = ReturnRandom(lastPart2);

        while(fifthWord == sixthWord || fifthWord + 's' == sixthWord || fifthWord + 'es' == sixthWord)
          sixthWord = ReturnRandom(lastPart2);

        finalString = finalString + ' of the ' + fifthWord + ' ' + sixthWord;
      }

    return finalString;
  }
})

client.login(process.env.BOT_TOKEN);