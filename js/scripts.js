let pokemonRepository = (function() {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //  a function for adding new pokemon in the list given the conditions are met
 function add(pokemon) {
  if (typeof pokemon === 'object' &&
  'name' in pokemon) {
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
  
  //  add two new functions in the repository
function loadList() {
  return fetch (apiURL).then (function (response){
  return response.json();
    }).then (function (json) {
    json.results.forEach(function (item) {
    let pokemon = {
      name:item.name,
      detailsURL:item.url
    };
    add(pokemon);
    console.log(pokemon);
  });
}).catch (function (e){
  console.error (e);
})
}

function loadDetails(pokemon) {
let url= pokemon.detailsURL;
return fetch (url).then(function (response) {
  return response.json();
}).then(function(details){
  pokemon.imageUrl = details.sprites.front_default;
  pokemon.height = details.height;
  pokemon.types = details.types;
}).catch(function (e){
  console.error (e);
  })
}


// function for showing pokemon name in the console
 function showDetails(pokemon) {
  loadDetails(pokemon).then(function(){
    console.log(pokemon);
  });
 }
// making the IIFE functions available
 return {
   getAll: getAll,
   add: add,
   loadList:loadList,
   loadDetails: loadDetails,
   addListItem:addListItem,
   showDetails:showDetails
 }
})();

// calling the pokemon list items from the repository
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
