let pokemonRepository = (function () {
  document.querySelector("#modal-container");
  let t = [];
  function e(e) {
    "object" == typeof e && "name" in e
      ? t.push(e)
      : console.log("I dont know");
  }
  function i() {
    return t;
  }
  function n(t) {
    return fetch(t.detailsURL)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.front_default),
          (t.imageUrlBack = e.sprites.front_shiny),
          (t.height = e.height),
          (t.weight = e.weight),
          (t.types = []);
        for (let i = 0; i < e.types.length; i++)
          t.types.push(e.types[i].type.name);
        t.abilities = [];
        for (let n = 0; n < e.abilities.length; n++)
          t.abilities.push(e.abilities[n].ability.name);
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  function a(t) {
    o(t);
  }
  function o(t) {
    $(".modal-header");
    let e = $(".modal-title"),
      i = $(".modal-body");
    i.empty(), e.empty();
    let n = $("<h1>" + t.name + "</h1>"),
      a = $("<img class='modal-img'>");
    a.attr("src", t.imageUrl);
    let o = $("<img class= 'modal-img'>");
    o.attr("src", t.imageUrlBack);
    let l = $("<p>Height:" + t.height + "</p>"),
      r = $("<p>Weight:" + t.weight + "</p>"),
      p = $("<p>Types:" + t.types + "</p>"),
      s = $("<p>Abilities:" + t.abilities + "</p>");
    e.append(n),
      i.append(a),
      i.append(o),
      i.append(l),
      i.append(r),
      i.append(p),
      i.append(s);
  }
  return {
    getAll: i,
    add: e,
    loadList: function t() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=950")
        .then(function (t) {
          return t.json();
        })
        .then(async function (t) {
          for await (let i of t.results) {
            let a = { name: i.name, detailsURL: i.url };
            e(a), await n(a);
          }
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: n,
    addListItem: function t(e) {
      let i = document.querySelector(".list-group"),
        n = document.createElement("li"),
        a = document.createElement("div"),
        l = document.createElement("img"),
        r = document.createElement("button");
      r.classList.add("search-btn"),
        (r.innerText = "Show details"),
        r.setAttribute("data-target", "#exampleModal"),
        r.setAttribute("data-toggle", "modal"),
        n.classList.add("list-group-item"),
        l.setAttribute("src", e.imageUrl),
        l.setAttribute("width", 100),
        a.appendChild(l),
        (n.innerText = e.name.toUpperCase()),
        n.appendChild(a),
        n.appendChild(r),
        i.appendChild(n),
        r.addEventListener("click", function (t) {
          var i;
          o((i = e)), console.log(e);
        });
    },
    showDetails: a,
    showModal: o,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
