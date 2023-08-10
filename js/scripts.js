let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 0.7,
        types: ['GRASS', 'POISON']
    },
    {
        name: 'Charizard',
        height: 1.7,
        types: ['FIRE', 'FLYING']
    },
    {
        name: 'Butterfree',
        height: 1.1,
        types: ['BUG', 'FLYING']
    },
    {
        name: 'Beedrill',
        height: 1,
        types: ['BUG', 'POISON']
    },
    {
        name: 'Pidgeot',
        height: 1.5,
        types: ['FLYING', 'NORMAL']
    }
];

// for (i = 0; i < pokemonList.length; i++) {
//     if (pokemonList[i].height <= 1.5) {
//         document.write(pokemonList[i].name + ' ' + '(height:' + pokemonList[i].height + ')' + ' ');
//     }
//     else {
//         document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, that\'s big!' + ' ');
//     }
// }

pokemonList.forEach (function (pokemon) {
    document.write (pokemon.name+ ' '+ pokemon.height + ' '+ pokemon.types+ ' '
 );
});

