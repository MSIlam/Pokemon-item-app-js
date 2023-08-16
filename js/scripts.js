let pokemonRepository = (function() {
  // a variable containing the pokemon item list
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
//  a function for adding new pokemon in the list given the conditions are met
 function add(pokemon) {
if (typeof pokemon === 'object' &&
'name', 'height','types' in pokemon) {
  pokemonList.push(pokemon);
} else {
  console.log('I dont know');
}
}
// a function for retriving the list of pokemon
 function getAll() {
   return pokemonList;
 } 
// function creating the HTML framework for the pokemon list
 function addListItem (pokemon) {
  const pokemonUl = document.querySelector ('.pokemon-list');
  const listitem = document.createElement ('li');
  const button = document.createElement ('button');
  button.innerText= pokemon.name;
  button.classList.add ('pokemon-button');
  listitem.appendChild (button);
  pokemonUl.appendChild (listitem);
  button.addEventListener ('click', function(event) {
    showDetails(pokemon)
  });
 }
// function for showing pokemon name in the console
 function showDetails(pokemon) {
  console.log(pokemon.name);
 }
// making the IIFE functions available
 return {
   getAll: getAll,
   add: add,
   addListItem:addListItem
 }
})();
// adding a new pokemon character in the original list
pokemonRepository.add({name:'Pikachu', height:1.04, types:['Electric']})
// calling the pokemon list items from the repository
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
