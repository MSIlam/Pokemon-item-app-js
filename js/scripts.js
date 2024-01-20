const pokemonRepository = (function () {
  const pokemonList = [];
  const apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=100";

  //  a function for adding new pokemon in the list given the conditions are met
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("I dont know");
    }
  }

  // a function for retriving the list of pokemon
  function getAll() {
    return pokemonList;
  }

  // function creating the HTML framework for the pokemon list
  function addListItem(pokemon) {
    const pokemonUl = document.querySelector(".list-group");
    const listitem = document.createElement("li");
    // const imgContainer = document.createElement("div");
    // const image = document.createElement("img");
    const button = document.createElement("button");

    button.classList.add("search-btn");
    button.innerText = "Show details";
    button.setAttribute("data-target", "#exampleModal");
    button.setAttribute("data-toggle", "modal");

    listitem.classList.add("list-group-item");
    listitem.innerText = pokemon.name.toUpperCase();
    // listitem.appendChild(imgContainer);
    listitem.appendChild(button);

    // image.setAttribute("src", pokemon.imageUrl);
    // image.setAttribute("width", 100);

    // imgContainer.appendChild(Image);
    pokemonUl.appendChild(listitem);

    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  //  add two new functions in the repository
  function loadList() {
    return fetch(apiURL)
      .then(function (response) {
        return response.json();
      })
      .then(async function (json) {
        for await (const item of json.results) {
          let pokemon = {
            name: item.name,
            detailsURL: item.url,
          };
          add(pokemon);
          await loadDetails(pokemon);
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    const url = pokemon.detailsURL;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.imageUrlBack = details.sprites.front_shiny;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = [];
        for (let i = 0; i < details.types.length; i++) {
          pokemon.types.push(details.types[i].type.name);
        }
        pokemon.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          pokemon.abilities.push(details.abilities[i].ability.name);
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // function for showing pokemon name in the modal
  function showDetails(pokemon) {
    showModal(pokemon);
  }

  function showModal(pokemon) {
    // lets add content to the new bootstrap modal

    // first select the contents inside the modal
    const modalTitle = $(".modal-title");
    const modalBody = $(".modal-body");

    // now empty the contents that needs to be filled
    modalBody.empty();
    modalTitle.empty();

    // create element for name
    const namePokemon = $("<h1>" + pokemon.name.toUpperCase() + "</h1>");
    // create image in modal
    const imageFront = $("<img class='modal-img'>");
    imageFront.attr("src", pokemon.imageUrl);

    const imageBack = $("<img class= 'modal-img2'>");
    imageBack.attr("src", pokemon.imageUrlBack);

    const heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");

    const weightElement = $("<p>" + "Weight: " + pokemon.weight + "</p>");

    const typesElement = $("<p>" + "Types: " + pokemon.types + "</p>");

    const abilitiesElement = $(
      "<p>" + "Abilities: " + pokemon.abilities + "</p>"
    );

    // now append the elements to the containers

    modalTitle.append(namePokemon);
    modalBody.append(imageFront);
    modalBody.append(imageBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    getAll: getAll,
    add: add,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
    showModal: showModal,
    // hideModal: hideModal,
  };
})();

// calling the pokemon list items from the repository
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
