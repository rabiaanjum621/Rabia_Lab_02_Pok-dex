const navigator = document.querySelector("#navigator");
window.addEventListener("DOMContentLoaded", () => {});

document.addEventListener("init", function (event) {
  var page = event.target;
  if (page.id === "home") {
    getPokemonList();
  } else if (page.id === "details") {
    getPokemonDetails(navigator.topPage.data.itemId);
  }
});

function getPokemonList() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((element, index) => {
        var itemList = document.getElementById("itemsList");
        var item = document.createElement("ons-list-item");
        item.setAttribute("tappable", "true");
        item.setAttribute("modifier", "chevron");
        item.innerHTML = element.name;
        item.id = "" + (index + 1);
        item.addEventListener("click", (event) => {
          navigator.pushPage("details.html", {
            data: { itemId: event.currentTarget.id },
          });
        });
        itemList.appendChild(item);
      });
    })
    .catch((error) => {
      console.log("pokemon not found" + error);
    });
}

function getPokemonDetails(itemId) {
  fetch("https://pokeapi.co/api/v2/pokemon/" + itemId)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("title").innerHTML = data.species.name;
      var image = document.getElementById("image");
      image.src = data.sprites.front_default;
      var name = document.getElementById("name");
       name.innerHTML = data.species.name + " #" + data.game_indices[0].game_index;
       var types = document.getElementById("types");
       data.types.forEach((element)=> {
           var typeItem = document.createElement("ons-list-item")
           typeItem.innerHTML = element.type.name;
           types.appendChild(typeItem);
       })

       var stats = document.getElementById("stats");
       data.stats.forEach((element)=> {
           var statItem = document.createElement("ons-list-item")
           statItem.innerHTML = element.stat.name;
           var spanItem = document.createElement("span");
           spanItem.className = "notification";
           spanItem.innerHTML = element.effort;
           spanItem.style.margin = "10px";
           statItem.appendChild(spanItem);
           var spanItem = document.createElement("span");
           spanItem.className = "notification notification--material";
           spanItem.innerHTML = element.base_stat;
           spanItem.style.background = "#2A7DAD"
           statItem.appendChild(spanItem);
           stats.appendChild(statItem);
       })
    });
}
