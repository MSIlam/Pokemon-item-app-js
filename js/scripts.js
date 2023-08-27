let pokemonRepository = (function() {
  let modalContainer = document.querySelector ('#modal-container');
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=950';

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
    button.innerText= pokemon.name.toUpperCase();
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
    }).then(function (json) {
    json.results.forEach(function (item) {
    let pokemon = {
      name:item.name,
      detailsURL:item.url
    };
    add(pokemon);
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
    showModal (pokemon);
  });
 }

 function showModal (pokemon) {
  // select modal container
  
  // clear all existing modal content
  modalContainer.innerHTML= '';
  let modal= document.createElement ('div');
  modal.classList.add('modal');

  // Add modal content 
  let closeButtonElement = document.createElement ('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement =document.createElement('h1');
  titleElement.innerText = pokemon.name.toUpperCase();

  let contentElement = document.createElement ('p');
  contentElement.classList.add ('pokemon-content');
  contentElement.innerText += `Height: ${pokemon.height}`;

  let imageContainer = document.createElement('div');
  imageContainer.classList.add('image-Container');
  let pokemonImage = document.createElement ('img');
  pokemonImage.src = pokemon.imageUrl;
  imageContainer.appendChild(pokemonImage);

  // append the created modal elements in the modal
  modal.appendChild (closeButtonElement);
  modal.appendChild (titleElement);
  modal.appendChild (contentElement);
  modal.appendChild (imageContainer);
  modalContainer.appendChild (modal);

  modalContainer.classList.add('is-visible');

 }

 function hideModal () {
  modalContainer.classList.remove('is-visible');
 }

 window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains ('is-visible')) {
    hideModal();
  }
 });

 modalContainer.addEventListener ('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
 });

// making the IIFE functions available
 return {
   getAll: getAll,
   add: add,
   loadList:loadList,
   loadDetails: loadDetails,
   addListItem:addListItem,
   showDetails:showDetails,
   showModal:showModal,
   hideModal:hideModal
 }
})();

// calling the pokemon list items from the repository
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
