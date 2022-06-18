const bannedWords = [
   'cunt',
   'dick',
   'faggot', 'fuck',
   'goddammit', 'goddamnit',
   'kurva', 'kurwa',
   'nigga', 'nigger',
   '0laffson', 'titusW',
   'e621.net', 'furaffinity.net', 'weasyl.com'
];

const noToscheCommentChannels = [
   'aviary',
   'canid', 'cell-of-aki',
   'deltrada-guide', 'deltrada-law',
   'ermehn',
   'felis',
   'general',
   'knowledge-center',
   'lutren',
   'polcan',
   'resources', 'rules',
   'secret-chamber', 'secret-code-of-conduct', 'spire-of-deltrada',
   'tamian', 'todo-tosche',
   'vulpin'
];

const currencies = [
   { name: `amber drops`,      nameDB: `amberDrops`,      alias1: `amberdrops`,      alias2: `ad` },
   { name: `pearl flake`,      nameDB: `pearlFlakes`,     alias1: `pearlflakes`,     alias2: `pf` },
   { name: `obsidian chips`,   nameDB: `obsidianChips`,   alias1: `obsidianchips`,   alias2: `ac` },
   { name: `silver coins`,     nameDB: `silverCoins`,     alias1: `silvercoins`,     alias2: `sc` },
   { name: `gold coins`,       nameDB: `goldCoins`,       alias1: `goldcoins`,       alias2: `gc` },
   { name: `deltrada coins`,   nameDB: `deltradaCoins`,   alias1: `deltradacoins`,   alias2: `dc` }
];

//----------------------------------------------------------- Exports ----------------------------------------------------------

module.exports = {
   bannedWords,
   noToscheCommentChannels,

   currencies
};