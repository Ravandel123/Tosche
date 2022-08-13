
const bodyLocations = [
   ['head', 14],
   ['torso', 42],
   ['primary arm', 17],
   ['secondary arm', 13],
   ['right leg', 7],
   ['left leg', 7]
];

const currencies = [
   { name: 'amber drops',      nameDB: 'amberDrops',      alias1: 'amberdrops',      alias2: 'ad' },
   { name: 'pearl flake',      nameDB: 'pearlFlakes',     alias1: 'pearlflakes',     alias2: 'pf' },
   { name: 'obsidian chips',   nameDB: 'obsidianChips',   alias1: 'obsidianchips',   alias2: 'ac' },
   { name: 'silver coins',     nameDB: 'silverCoins',     alias1: 'silvercoins',     alias2: 'sc' },
   { name: 'gold coins',       nameDB: 'goldCoins',       alias1: 'goldcoins',       alias2: 'gc' },
   { name: 'deltrada coins',   nameDB: 'deltradaCoins',   alias1: 'deltradacoins',   alias2: 'dc' }
];

const weaponTypes = [
   'unarmed'
];



//----------------------------------------------------------- Exports ----------------------------------------------------------
module.exports = {
   bodyLocations,
   currencies,
   weaponTypes
};