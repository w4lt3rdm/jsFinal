//funciones del acordeaon y los menu ver todos, ver info y ver imagen
const accordionTitles = document.querySelectorAll(".accordionTitle");

accordionTitles.forEach((accordionTitle) => {
	accordionTitle.addEventListener("click", () => {
		if (accordionTitle.classList.contains("is-open")) {
			accordionTitle.classList.remove("is-open");
		} else {
			const accordionTitlesWithIsOpen = document.querySelectorAll(".is-open");
			accordionTitlesWithIsOpen.forEach((accordionTitleWithIsOpen) => {
				accordionTitleWithIsOpen.classList.remove("is-open");
			});
			accordionTitle.classList.add("is-open");
		}
	});
});

let pokemonsList = document.getElementById("pokemons-list");
let links = document.getElementById("links");

let urlApi ="https://pokeapi.co/api/v2/pokemon/"
//updatePokemons("https://pokeapi.co/api/v2/pokemon/");
updatePokemons(urlApi);

//obtener todos los pokemon
function updatePokemons(url) {
  if (url) {

    //Reiniciamos pokemones actuales
    pokemonsList.innerHTML = "";
    // Llamamos a la API de pokemon con Fetch
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        // Obtenemos y recorremos a los primeros 20 pokemones obtenidos
        for (let i of res.results) {
          // Realizamos otra solicitud Fetch con la URL especifica del pokemon actual recorrido, para obtener datos mas especficos como la imagen
          fetch(i.url)
            .then(x => x.json())
            .then(x => {
              // Se carga la imagen y nombre del pokemon actual que se esta evaluando 
              pokemonsList.innerHTML += `<div class="card">
                                                  <img src="${x.sprites.front_default}" alt="">
                                                  <p>${x.name}</p>
                                              </div>`;
            });
        };
        // Pintamos los enlaces de siguiente o anterior de la paginacion de los pokemones 
        //Boton hacia atrás
        links.innerHTML = (res.previous) ? `<button onclick="updatePokemons('${res.previous}')">Atras</button>` : "";
        //Botón hacia adelante
        links.innerHTML += (res.next) ? `<button onclick="updatePokemons('${res.next}')">Siguiente</button>` : "";

      });
  }

}

//funcion q obtiene la info del poquemon buscado o deseado

function obtenerPokemon(){
    
    let pokeInfo = document.getElementById("pokeInfo");
    let url1 = urlApi + pokeInfo.value.toLowerCase();
const body12 = document.getElementById("divInfo");
body12.innerHTML= "";
    fetch(url1)
    .then(response => response.json())
    .then((pokeCharacter)=> {
      console.log(pokeCharacter)
      const pokemon = {
          name: pokeCharacter.name,
          sprite: pokeCharacter.sprites.other['official-artwork'].front_default,
          types: pokeCharacter.types.map((data)=>{
            return {
              type: data.type.name,
              url: data.type.url
            }        
          }),
          abilities: pokeCharacter.abilities.map((data)=>{
            return {
              name: data.ability.name, 
              url: data.ability.url
            }
          })
        }
        console.log(pokemon.types.length)
    // creacion de elementos del DOM en el HTML



const containerDiv = document.createElement("div");
containerDiv.className = 'container';
containerDiv.id = 'container';
body12.appendChild(containerDiv)

//inserta el nombre, habilidad y tipos de pokemon
containerDiv.innerHTML = `
<div class="pokemons-card" id="pokemons-card"> 
    <h5 id="pokemon-name">${pokemon.name}</h5>
    <img src="${pokemon.sprite}" alt="${pokemon.name}" width="100px">
    <div class="abilities" id="abilities"> 
        <p class="abilities-names">HABILIDAD:</p>
        <ul>
            <li>${pokemon.abilities[0].name}</li>
            <li>${pokemon.abilities[1].name}</li>
        </ul>    
    </div>
    <div class="types" id="types"> 
        <p class="types-names">TIPO:</p>
        <ul id="tipow">`
        var ul = document.getElementById("tipow");
        for(var i = 0; i < `${pokemon.types.length}`; i++) {
          ul.append(`${pokemon.types[i].type}-`)           
        }
    `</ul>    
    </div>
    </div>`   
    })
  }

//busca y muestra imagen del pokemon deseado
function mostrarFoto() {
    let pokemon = document.getElementById("pokemon");
    let url = urlApi + pokemon.value.toLowerCase();
    img.innerHTML = '';
    fetch(url)
        .then(res => res.json())
        .then(function(data) {
            var obj = data.sprites;
            for (let elem in obj) {
                let valor = obj[elem];
                if (typeof valor === 'string') {
                    img.innerHTML += `<img src='${valor}'>`;
                }
            }
        })
        .catch(error => console.log(error));
}