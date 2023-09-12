const listaPokemon = document.querySelector("#listaPokemon");
const buttonHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for(let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) { 

    let tipo = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipo = tipo.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2){
        pokeId = "0" + pokeId;
    } 

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML  = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-image">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt=${poke.name}>
        </div>
        <div class="pokemon-info">
            <div class="nome-contenitore">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nome">${poke.name}</h2>
            </div>
            <div class="pokemon-tipo">
                ${tipo}    
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p> 
            </div>
        </div>
    `;
    listaPokemon.append(div);
} 

buttonHeader.forEach(button => button.addEventListener("click", (event) => {
    const buttonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for(let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(buttonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipo = data.types.map(type => type.type.name);
                    if (tipo.some(tipe => tipe.includes(buttonId))) {
                    mostrarPokemon(data);
                    }
                }

            })
    }
}))