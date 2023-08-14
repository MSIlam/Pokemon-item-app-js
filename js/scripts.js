let pokemonRepository = (function() {
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
   }];
 
 function add(pokemon) {
if (typeof pokemon === 'object' &&
['name', 'height','types']) {
  pokemonList.push(pokemon);
} else {
  console.log('I dont know');
}
}

 function getAll() {
   return pokemonList;
 }
 return {
   getAll: getAll,
   add: add
 }
})();

document.write("Showing All")
pokemonRepository.getAll().forEach(function(pokemon) {
 document.write('<p>'+pokemon.name+'-'+pokemon.height+ '-'+pokemon.types+'</p>');
});

pokemonRepository.add({name:'pikachu', height:1.04, types:['Electric']})

document.write("Show All including new one")
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write('<p>'+pokemon.name+'-'+pokemon.height+ '-'+pokemon.types+'</p>');
});
