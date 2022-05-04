const C = require('./common.js');
const CL_LA = require('./../classes/language.js');
const DC = require('./dataCommon.js');
const DS = require('./dataSpeech.js');
const GEN = require('./generators.js');

"use strict";

const RND = C.arrGetRandom;

//----------------------------------------------------------- COMMON DATA ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
const arrayUniversalResponses = [
   `Excuse me?!`,
   `I know.`,
   `I know, right?`,
   `No point in stating the obvious.`,
   `So I have been told.`,
   `Stop it please!`,
   `True, I couldn't agree more.`,
   `You too.`,
   `Mhm, for sure.`,
   `You're welcome.`,
   `As the prophecy foretold.`,
   `Like in my dream.`,
   `I'm fully convinced you never graduated kindergarden.`,
   `Because of what you said, now I want to burn down an Ermehn village.`
];

function universalResponses() {
   let arrayResult = [
      `I agree, in ${C.rnd(110)}%.`,
      `No, ${RND(['you', 'u'])}`,
      `Well, ${C.rnd(12)} out 10 people agree!`,
      `${C.strCapitalizeFirstLetter(RND(DS.termsNoDoubt))}.`,
      `*Tosche pulls out his ${RND(['sword', 'axe', 'gun', 'rocket launcher', 'crossbow', 'minigun', 'shotgun'])}.*`, //weapons here
      `And now I need to cut off your ${RND(['tongue', 'ears', 'fingers', 'toes', 'tail'])}.`
   ];

   arrayResult = arrayResult.concat(arrayUniversalResponses);

   return arrayResult;
}

//---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- COMMON ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function resMissingArgs(missingArgs) {
   if (!C.checkIfArray(missingArgs))
      return;

   const boldMissingArgs = C.arrAddTextToAllItems(missingArgs, '**', '**');
   const missingArgsEOL = boldMissingArgs.join('\n');

   const arrayResult = [
      `You must give me the following arguments:\n${missingArgsEOL}\n`,
      `You didn't provide the correct amount of arguments, you ${GEN.genPersonalInsult()}. You need to provide:\n${missingArgsEOL}\n`
   ];

   return arrayResult;
}

module.exports.resMissingArgs = resMissingArgs;

//------------------------------------------------------------------------------------------------------------------
function resIssue(issue, additionalText = '') {
   if (!C.checkIfExists(issue))
      return;

   const issueInMid = C.strDecapitalizeFirstLetter(issue);
   const insult = GEN.genPersonalInsult();
   const insultWithArticle = C.strAddArticle(insult);

   let arrayResult = [
      `${issue}, you ${insult}!`,
      `When ${insultWithArticle} like you gonna learn that ${issueInMid}?`,
      `Is it too hard for such ${insultWithArticle} to understand that ${issueInMid}?`
   ];

   if (C.checkIfExists(additionalText))
      arrayResult = C.arrAddTextToAllItems(arrayResult, '', ` ${additionalText}`);

   return arrayResult;
}

module.exports.resIssue = resIssue;

//------------------------------------------------------------------------------------------------------------------
function resIssueSingle(issue, additionalText = '') {
   return C.arrGetRandom(resIssue(issue, additionalText));
}

module.exports.resIssueSingle = resIssueSingle;

//------------------------------------------------------------------------------------------------------------------
function resBusy(reason, isMsgAuthor = true, name) {
   return `${isMsgAuthor ? 'You are ' : name + ' is'} busy. (${reason})`;
}

module.exports.resBusy = resBusy;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- COMMANDS ----------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
function resDefault() {
   const affilction = C.chance(50) ? `${RND(DS.advBase)} ${RND(DS.adjAfflictionsVirtues)}` : `${RND(DS.adjAfflictionsVirtues)}`;

   const opinions = [
      `I am skeptic about that.`,
      `I can't agree with that.`,
      `This doesn't make any sense.`,
      `What?`,
      `Woot?`,
      `Are you serious?`,
      `Indeed.`
   ];
   
   const gifs = [
   `https://tenor.com/view/xd-fani-gif-24750348`,
   `https://tenor.com/view/jerry-seinfeld-i-like-the-way-you-think-gif-14890068`,
   `https://tenor.com/view/pirates-of-the-caribbean-captain-jack-sparrow-not-making-sense-doesnt-make-any-sense-johnny-depp-gif-16635067`,
   `https://tenor.com/view/i-knew-it-words-of-wisdom-youre-so-wise-the-shining-jack-nicholson-gif-14741551`,
   `https://tenor.com/view/everybody-just-calm-down-supt-joe-donovan-hudson-and-rex-everyone-take-it-easy-settle-down-guys-gif-24465700`,
   `https://tenor.com/view/gandalf-yes-very-good-gif-19209604`,
   `https://tenor.com/view/keep-telling-yourself-that-darling-captain-jack-sparrow-johnny-depp-gif-10233026`,
   `https://tenor.com/view/indeed-tealc-stargate-gif-4496552`,
   `https://tenor.com/view/cheems-bonk-doge-celestev69-gif-24399197`,
   `https://tenor.com/view/no-nope-smh-kanye-west-gif-4246025`
   ];

   const speaking = [
      `sound`, `speak`,
      `talk`
   ];

   const arrayResult = [
      `${RND(opinions)}`,
      `${RND(gifs)}`,
      `You ${RND(speaking)} like someone ${affilction}.`,
      `That information just made me ${affilction}.`,
      `*${C.strCapitalizeFirstLetter(RND(DS.adjAfflictions))} Tosche noises.*`,
      `${RND(universalResponses())}`
   ];

   return RND(arrayResult);
}

module.exports.resDefault = resDefault;

//------------------------------------------------------------------------------------------------------------------
function resAmount(maxMultiplier = 8, additionalSymbol = '') {
   const maxNumber = GEN.genRandomMultiplier(maxMultiplier, 75) + 1;
   const amountPart = C.rnd(maxNumber) + additionalSymbol;
   const defaultEnding = GEN.genAccuracy(false) + amountPart;

   const arrayResult = [
      `${amountPart}`,
      `This is ${defaultEnding}`,
      `My calculations show that this is ${defaultEnding}`,
      `I think it's ${defaultEnding}`
   ];

   return GEN.addFunnyEndingToAll(arrayResult);
}

module.exports.resAmount = resAmount;

//------------------------------------------------------------------------------------------------------------------
function resChance() {
   const number = C.chance(90) ? C.rnd(100) : C.rndBetween(100, 200);

   let arrayResult = [
      `${number}`,
      `${GEN.genAccuracy(true)}${number}`,
      `The chance for that is ${number}`,
      `The chance for that is ${GEN.genAccuracy(false)}${number}`
   ];

   arrayResult = C.arrAddTextToAllItems(arrayResult, '', '%');

   return GEN.addFunnyEndingToAll(arrayResult);
}

module.exports.resChance = resChance;

//------------------------------------------------------------------------------------------------------------------
function resCost() {
   if (C.chance(10)) {
      const arrayResultSpecial = [
         `That is worthless`,
         `That is priceless`,
         //tmp   'You need to give ' + GenerateRandomWeapon() + ' for that',
         `Only acceptable payment for that is ${C.arrGetRandom(DC.charactersIrlOnly)}`
      ];

      return GEN.addFunnyEndingToAll(arrayResultSpecial);
   } else {
      const amount = C.rnd(GEN.genRandomMultiplier(8));
      const cost = `${amount} ${C.arrGetRandom(DC.currenciesAll)}`;

      const arrayResult = [
         `${cost}`,
         `That costs ${cost}`,
         `That is worth ${cost}`,
         `Price for that is ${GEN.genAccuracy(false)}${cost}`
      ];
      
      return GEN.addFunnyEndingToAll(arrayResult);
   }
}

module.exports.resCost = resCost;

//------------------------------------------------------------------------------------------------------------------
function resDndalign(who) {
   if (!who)
      return;

   const alignment = `**${RND(DC.dndAlignments)}**`;
   const arrayResult = [
      `${who} is ${alignment}.`,
      `It seems like ${who} is ${alignment}.`,
      `${C.strCapitalizeFirstLetter(RND(DS.termsNoDoubt))} ${alignment}.`
   ];

   return GEN.addFunnyEnding(RND(arrayResult));
}

module.exports.resDndalign = resDndalign;

//------------------------------------------------------------------------------------------------------------------
function resHate() {
   const arrayResult = [
      `I hate you.`,
      `You suck.`,
      `You = noob.`,
      `You are probably the worst person in Dunia.`,
      `Uninstall discord please.`,
      `I wouldn't even buy you if you were a slave.`,
      `I have calculated your IQ and it is exactly ${Math.floor(Math.random() * 40)}.`,
      `I don't know how is that even possible to suck as much as you.`,
      `If laughter is the best medicine, your face must be curing the world.`,
      `You're so ugly, you scared the crap out of the toilet.`,
      `It's better to let someone think you are an idiot than to open your mouth and prove it.`,
      `I'm jealous of people that don't know you!`,
      `If I wanted to kill myself I'd climb your ego and jump to your IQ.`,
      `rains aren't everything. In your case they're nothing.`,
      `I don't know what makes you so stupid, but it really works.`,
      `I'd slap you, but that would be animal abuse.`,
      `They say opposites attract. I hope you meet someone who is good-looking, intelligent, and cultured.`,
      `If ugly were a crime, you'd get a life sentence.`,
      `Your mind is on vacation but your mouth is working overtime.`,
      `Shock me, say something intelligent.`,
      `I don't know what your problem is, but I'll bet it's hard to pronounce.`,
      `You're like Monday mornings, nobody likes you.`,
      `To make you laugh on Saturday, I need to tell you a joke on Wednesday.`,
      `If you really spoke your mind, you'd be speechless.`,
      `Every time I'm next to you, I get a fierce desire to be alone.`,
      `Don't you have a terribly empty feeling - in your skull?`,
      `Are you always this stupid or is today a special occasion?`,
      `Mirrors don't lie, and lucky for you, they also don't laugh.`,
      `No wonder everyone talks about you behind your back.`,
      `Your face makes onions cry.`,
      `If you were twice as smart, you'd still be stupid.`,
      `I wasn't born with enough middle fingers to let you know how I feel about you.`,
      `You look like something I'd draw with my left hand.`,
      `Of course I talk like an idiot... How else would you understand me?`,
      `What are you doing here? Did someone leave your cage open?`,
      `I could eat a bowl of alphabet soup and crap out a smarter comeback than what you just said.`,
      `I'd love to insult you, but I won't do as well as nature did.`,
      `You're so ugly the only dates you get are on a calendar.`,
      `You're the reason they invented double doors.`,
      `You're so dumb, I bet your pet teaches you tricks.`,
      `If you were on fire and I had water, I'd drink it.`,
      `You didn't just fall out of the stupid tree, you were dragged through dumbass forest.`,
      `Shut up, you'll never be the man your mother is.`,
      `Keep rolling your eyes, maybe you'll find a brain back there.`,
      `I'm not saying you're stupid, I'm just saying you've got bad luck when it comes to thinking.`,
      `There's only one problem with your face... I can see it.`,
      `You're so fat you could sell your shade.`,
      `I bet your brain feels good as new, seeing that you've never used it.`,
      `Do you still love nature, despite what it did to you?`,
      `Those clothes don't make you look stupid. You make you look stupid.`
   ];

   return arrayResult;
}

module.exports.resHate = resHate;

//------------------------------------------------------------------------------------------------------------------
function resIs() {
   let result;

   if (C.chance(5)) {
      let arrayResultSpecialNormal = [
         `I think the answer is obvious`,
         `This question is stupid`,
         `No u`,
         `Sorry, but that question is disgusting`
      ];

      let arrayResultSpecialQuestion = [
         `Do I really need to answer this`,
         `Why are you asking me about that`
      ];

      arrayResultSpecialNormal = GEN.addFunnyEndingToAll(arrayResultSpecialNormal);
      arrayResultSpecialQuestion = GEN.addFunnyEndingToAll(arrayResultSpecialQuestion, '?');

      result = RND(arrayResultSpecialNormal.concat(arrayResultSpecialQuestion));
   } else {
      const arrayResult = [
         `Absolutely`, `Absolutely not`,
         `Affirmative`, `Negative`,
         `Definitely`, `Definitely no`,
         `For sure`, `Impossible`,
         `Indeed`, `Not at all`,
         `It's a possibility`, `It's not a possibility`, 
         `Likely`, `Unlikely`,
         `Probably`, `Probably not`,
         `Sure`, `Under no circumstances`,
         `Totally`, `No way`,
         `Why not`, `How about no`,
         `Yeah`, `Nah`,
         `Yes`, `No`,
         `Yup`, `Nope`,
         `Partially`, `A bit`, `Slightly`, `Somehow`, `Possibly`, `Perhaps`, `Maybe`, `It could be`, `Almost`,
         `https://tenor.com/view/isildur-isilduryes-lotr-gif-17969733`,
         `https://tenor.com/view/no-nope-no-way-noo-absolutely-not-gif-20244171`
      ];

      result = RND(arrayResult);
      if (!result.startsWith('http'))
         result = result + GEN.genFunnyEnding();
   }

   return result;
}

module.exports.resIs = resIs;

//------------------------------------------------------------------------------------------------------------------
function resLove(who) {
   const pG = new CL_LA.PersonGrammar(!who ? 'me' : who);
   const array1 = ['a new book', 'a burning Ermehn village', 'the blood of my enemies'];
   const array2 = ['dumb', 'fat', 'stinky', 'stupid', 'ugly'];

   const arrayResult = [
      `I love ${pG.pronoun}.`,
      `I really, really like ${pG.pronoun}. Like REALLY.`,
      `${pG.pv} amazing!`,
      `${pG.pv} probably the best person in the world!`,
      `${pG.pronoun} = awesome.`,
      `${pG.pv} the coolest person I have ever seen!`,
      `I think ${pG.pv} good looking, I would rate ${pG.determiner} look ${C.rndBetween(11, 20)}/10.`,
      `Even if ${pG.ppv} cloned, ${pG.pronoun} would still be one of a kind. And the better looking one.`,
      `I would love to spend every minute of every day with ${pG.pronoun}, but some days I actually have to get stuff done.`,
      `${pG.determiner} smile is proof that the best things in life are free.`,
      `${pG.pv} smarter than Felis scholars and Canid strategists combined.`,
      `I think the hardest part about being ${pG.determiner} friend is pretending as though I like my other friends as much as I like ${pG.pronoun}.`,
      `${pG.pv} not someone I pretend to not see in public.`,
      `I don\'t have a favourite colour, it\'s pretty much whatever ${pG.pronoun} are wearing.`,
      `${pG.pronoun} inspire me and most likely strangers. Also, friends and stalkers. ${pG.pronounUC} are the inspiration to many.`,
      `${pG.determiner} face makes other people ugly.`,
      `If there is one thing I like about ${pG.pronoun}, it is that I like more than one thing about ${pG.pronoun}.`,
      `${pG.pronoun} have that kind of body that when others see it they realise they need to workout more.`,
      `${pG.pv} more unique and wonderful than the smell of ${C.arrGetRandom(array1)}.`,
      `Talking to ${pG.pronoun} is the best part of my day, aside from when I\'m killing the Ermehn and when I\'m conquering the Four Kingdoms.`,
      `${pG.pv} awkward, in a cute way.`,
      `I\'m really good at people-watching. I\'m so glad I can share that hobby on ${pG.pronoun}.`,
      `${pG.pronoun} make everything better. If people were more like ${pG.pronoun} the Four Kingdoms would be perfect.`,
      `${pG.pv} not lazy, just that the people around ${pG.pronoun} are way too active.`,
      `I love ${pG.determiner} honesty and sincerity.`,
      `I would hang out with ${pG.pronoun} even if ${pG.pronoun} hadn\'t showered for a couple days.`,
      `${pG.pposv} really good taste in friends (i.e. me).`,
      `If ${pG.pronoun} cooked something really gross, I like ${pG.pronoun} enough that I would tell ${pG.pronoun} instead of politely eating it and hating everything.`,
      `If ${pG.ppv} running to be the king, I would vote for ${pG.pronoun}.`,
      `Our lives would be incomplete without ${pG.pronoun} in it.`,
      `There\'s ordinary, and then there\'s ${pG.pronoun}.`,
      `${pG.pv} my favourite weakness.`,
      `${pG.pronoun} look${pG.extraEnding} great for ${pG.determiner} age.`,
      `I bet ${pG.pronoun} taste${pG.extraEnding} great.`,
      `${pG.pv} beatiful... On the inside.`,
      `I love ${C.arrGetRandom(array2)} people like ${pG.pronoun}!`,
      `I love how ${C.arrGetRandom(array2)} ${pG.pv}.`,
      `Usually ${C.arrGetRandom(array2)} people disgust me, but ${pG.pv} actually cute.`,
      `I don\'t care what everyone else says. I don\'t think ${pG.pv} that bad.`
   ];

   return C.strCapitalizeFirstLetter(arrayResult);
}

module.exports.resLove = resLove;

//------------------------------------------------------------------------------------------------------------------
function resPercentSpecial(who, what) {
   if (!who || !what)
      return;

   const value = C.chance(50) ? C.rnd(100) : C.rnd(200);

   const arrayResult = [
      `${who} is ${value}% ${what}`
   ];

   return GEN.addFunnyEndingToAll(arrayResult);
}

module.exports.resPercentSpecial = resPercentSpecial;

//------------------------------------------------------------------------------------------------------------------
function resRate(subject) {
   const who = C.strCheckIfAnyMatch(subject, ['i', 'me']) ? 'you' : 'that';
   const auxiliaryVerb = who == 'you' ? 'are' : 'is';
   const reflexivePronoun = who == 'you' ? 'yourself' : 'that';
   const additionalS = who == 'you' ? '' : 's';
   let result;

   if (C.chance(90)) {
      const arrayResult = [
         ``,
         `Hmm... I'd rate ${who}`,
         `I'd give ${who}`,
         `${RND(DS.termsNoDoubt)}`,
         `I think it's gonna be`,
         `I'd say`
      ];

      const rating = C.chance(90) ? C.rnd(13) : C.rndNo0(100);
      const maxRating = C.chance(90) ? 10 : C.rndNo0(100);
      const minus = C.chance(90) ? '' : '-';

      result = `${RND(arrayResult)} ${minus}${rating}/${maxRating}.`;
   } else {
      const arrayResult = [
         `I think we need a negative scale for ${who}.`,
         `I don't want to rate ${who}.`,
         `No way I'm gonna rate that!`,
         `${who} ${auxiliaryVerb} ${RND(C.chance(50) ? DS.termsExtremelyGood : DS.termsExtremelyBad)}!`,
         `Why do you even want to rate ${reflexivePronoun}?`,
         `${who} suck${additionalS}.`,
         `Better than ${RND(DC.charactersBadGuys)}.`,
         `${RND(DC.charactersBadGuys)} was better.`,
         `Over 9000!`,
         `https://tenor.com/pl/view/caroline-cameron-sportsnet-awful-absolutely-awful-horrible-gif-11225079422258787761`
      ];

      result = RND(arrayResult);
   }

   return C.strCapitalizeFirstLetter(result);
}

module.exports.resRate = resRate;

//------------------------------------------------------------------------------------------------------------------
function resResolve(who) {
   if (!who)
      return;

   const result = C.chance(75) ? `${RND(DS.adjAfflictions)} <:Stress:554734700279627792>` : `${RND(DS.adjVirtues)} <:Virtue:554734699935694848>`;
   return `${who} is **${C.strCapitalizeFirstLetter(result)}**`;
}

module.exports.resResolve = resResolve;

//------------------------------------------------------------------------------------------------------------------
function resWho() {
   return GEN.genPerson() + GEN.genFunnyEnding();
}

module.exports.resWho = resWho;

//------------------------------------------------------------------------------------------------------------------
function resYou() {
   let arrayResult = [
      `After hearing what you just said, I realized that honest people still do exists!`,
      `Are you a spy? Who sent you?`,
      `Are you hitting on me?`,
      `Awww... now I want to throw a rainbow at you.`,
      `Careful, you might get burned.`,
      `Coming from you, that means a lot!`,
      `Compliment accepted.`,
      `Do you really think I care about your opinion, lol?`,
      `Enough of that!`,
      `Finally, I found someone who agrees with my parents.`,
      `Flattery won't get you anywhere, fella. Scram!`,
      `Give me a quill and I'll give you my autograph.`,
      `I'd tell you how, but you would have to pay me.`,
      `I'm being watched. Act normal.`,
      `I'm glad I made your day brighter.`,
      `I'm sorry, but you can't afford it.`,
      `I'm warning you, I'm too hot for you to handle.`,
      `I can see that honesty is still the best policy.`,
      `I get that a lot!`,
      `I know. Wish I could say the same about you.`,
      `I love you too!`,
      `I love your honesty and sincerity.`,
      `I would like return the compliment, but I swore to tell the truth and nothing but the truth.`,
      `If I had a dollar for every compliment I've received so far, I'd be a billionaire.`,
      `Is that the best you've got?`,
      `It's actually the result of me not taking a bath for weeks.`,
      `It's extremely rare for me to hear that.`,
      `It's my duty to spread beauty in the world.`,
      `It must be the meds kicking in.`,
      `It must be the tapeworm.`,
      `Just today? What about yesterday?`,
      `Look who's talking, lol.`,
      `Much obliged!`,
      `No takebacks, okay!`,
      `Not since the accident.`,
      `Not this again... take a number and wait in line.`,
      `Oh, I wish you'd experience it as well.`,
      `Oh, really? I think I'm just ahead of you by one bath.`,
      `Oh, sorry, what? I was too busy thinking about how gorgeous I am.`,
      `Oh, stop it, you.`,
      `Oh, such discerning eyes!`,
      `Oh, the wonder of makeup!`,
      `Peace be with you!`,
      `Shucks, my fluffy neck!`,
      `Shut up baby.`,
      `Sorry, you must have mistaken me for someone else.`,
      `Stop it before I fall in love with you.`,
      `Thanks, but I prefer to be noticed for my intellectual capacity.`,
      `Thanks, fan!`,
      `Thanks, I sacrificed many lives for it.`,
      `Thanks, I woke up like this.`,
      `Thank you, so please vote for me in the next elections.`,
      `Well, hanging around the right people really changes you.`,
      `Well, that makes two of us!`,
      `What do you need?`,
      `Who told you to tell me that?`,
      `Why?`,
      `Why are you drooling? Here's a handkerchief.`,
      `Woah, that escalated quickly!`,
      `Yeah, I'm getting tired of being mistaken for our Imperator.`,
      `Yeah, it's my only redeeming quality.`,
      `Yeah, the genie finally granted my wish.`,
      `You'll get there, eventually.`,
      `You're not the first one to tell me that today.`,
      `You know what? I like you.`,
      `You must be looking at a mirror.`,
      `I am gonna kill you with all my floof.`,
      `I think it's time to pour cement into your eyes.`,
      `Soon, I will drink from your skull.`,
      `I'm gonna harvest your toes for that.`,
      `https://i.imgur.com/cTk5o3Y.png`,
      `https://i.imgur.com/gVyMLhT.png`,
      `https://i.imgur.com/b9A9qcU.png`,
      `https://i.imgur.com/GjHkWk0.png`,
      `https://i.imgur.com/Mm6v2ZU.png`,
      `https://i.imgur.com/BdTE5KF.png`,
      `https://i.imgur.com/Fyup5xA.png`,
      `https://i.imgur.com/fQNDGwh.png`, //bonk
      `https://tenor.com/view/no-asian-not-another-teen-gif-7699292`,
      `https://tenor.com/view/happy-rock-gif-3561328`,
      `https://media1.tenor.com/images/660bad00528f2861b214ee108928ba63/tenor.gif?itemid=10784297`,
      `https://tenor.com/view/woah-what-say-what-huh-shookt-gif-13459659`,
      `https://tenor.com/view/noob-risitas-funny-meme-laughing-gif-18917081`,
      `https://tenor.com/view/guillotine-bonk-revolution-gif-20305805`,
      `https://tenor.com/view/woman-be-silent-be-silent-tealc-woman-be-silent-stargate-woman-be-silent-sg1woman-be-silent-gif-16017603`
   ];

   arrayResult = arrayResult.concat(universalResponses());

   return RND(arrayResult);
}

module.exports.resYou = resYou;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- ADVANCED COMMANDS ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function fishCatchFailed(spotName, fish) {
   const fishName = C.strAddArticle(fish.name);
   const fishWeight = `**${fish.data?.weight} kg (${C.calcKgToImperial(fish.data?.weight)})**`;

   const arrayResult = [
      `Oof... your fish got away...`,
      `Oh no! Your line snapped!`,
      `*You slipped into the ${spotName}, scaring the fish away.*`
   ];

   const arrayFishInfoEnding = [
      `It was **${fishName}**, it weighed ${fishWeight}...`
   ];

   return `${C.arrGetRandom(arrayResult)}\n${C.arrGetRandom(arrayFishInfoEnding)}`;
}

module.exports.fishCatchFailed = fishCatchFailed;

//------------------------------------------------------------------------------------------------------------------
function fishRecord(recordResult, fish, previousRecordHolder) {
   const correctFish = `${C.strAddArticle(fish.name, true)}`;
   let finalMessage = '';
   let arrayPersonalRecord;
   let arrayServerRecord;

   //-----Personal records-----
   if (recordResult.previousPersonalRecord != -1) {
      if (recordResult.previousPersonalRecord > 0) {
         const correctWeightPersonal = `**${C.getFullKgToImperial(recordResult.previousPersonalRecord)}**`;
         arrayPersonalRecord = [
            `This is your personal record for ${correctFish}! Your previous record was: ${correctWeightPersonal}`
         ];
      } else if (recordResult.previousPersonalRecord == 0) {
         arrayPersonalRecord = [
            `This is your first **${fish.name}** caught!`
         ];
      }

      finalMessage += C.arrGetRandom(arrayPersonalRecord) + `\n`;
   }

   //-----Server records-----
   if (recordResult.currentPlace != -1) {
      if (recordResult.currentPlace == 0) {
         arrayServerRecord = [
            `And this is also the first **${fish.name}** caught in the server!`
         ];
      } else if (recordResult.currentPlace == 1) {
         arrayServerRecord = [
            `And this is also the new server record for ${correctFish}!`
         ];
      } else if (recordResult.currentPlace > 0) {
         const correctPlace = recordResult.currentPlace == 2 ? `2nd` : `3rd`;
         arrayServerRecord = [
            `This is also the ${correctPlace} best catch on the server for ${correctFish}!`
         ];
      }

      finalMessage += C.arrGetRandom(arrayServerRecord);

      if (recordResult.previousServerRecord > 0) {
         const correctWeightServer = `**${C.getFullKgToImperial(recordResult.previousServerRecord)}**`;
         finalMessage += ` The previous record was held by **${previousRecordHolder}** who caught ${correctFish} weighing ${correctWeightServer}`;
      }
   }

   return finalMessage;
}

module.exports.fishRecord = fishRecord;

// ---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------- COMMON DATA ----------------------------------------------------------
// universalResponses()

//----------------------------------------------------------- COMMON ----------------------------------------------------------
// resMissingArgs(missingArgs)
// resIssue(issue, additionalText = '')
// resIssueSingle(issue, additionalText = '')
// resBusy(reason, isMsgAuthor = true, name)

//----------------------------------------------------------- COMMANDS ----------------------------------------------------------
// resDefault()
// resAmount(maxMultiplier = 8, additionalSymbol = '')
// resChance()
// resCost()
// resDndalign(who)
// resHate()
// resIs()
// resLove(who)
// resPercentSpecial(who, what)
// resRate(subject)
// resResolve(who)
// resWho()
// resYou()

//----------------------------------------------------------- ADVANCED COMMANDS ----------------------------------------------------------
// fishCatchFailed(spotName, fish)
// fishRecord(recordResult, fish, previousRecordHolder)