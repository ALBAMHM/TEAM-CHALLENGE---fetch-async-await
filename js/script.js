const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchBtn");
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");
const resetButton = document.getElementById("resetBtn");
const divPokemons = document.getElementById("app");

//let divPokemon=document.createElement("div");
//divPokemon.classList.add("divPokemon")
            
const limit = 10
let maxPokemon= 1302
let searchedPokemon = searchInput.value

prevButton.addEventListener("click", () => {
    if(!offset !== 0){
        fetchPokemons()
        divPokemons.innerHTML=""
    }else prevButton.remove()
})

nextButton.addEventListener("click", () => {
    if(offset < maxPokemon){
        fetchPokemons()
        divPokemons.innerHTML=""
   }else nextButton.remove()
})

resetButton.addEventListener("click", () => {
    divPokemons.innerHTML= ""
    offset = 0
    searchedPokemon = ""
    })
    
async function fetchPokemons(offset){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        const data = await response.json()
        const pokemons = data.results
        divPokemons.innerHTML = ""

        pokemons.forEach((pokemon) => {
            let divPokemon=document.createElement("div");
            divPokemon.classList.add("divPokemon")
            divPokemon.innerHTML=`
            <img src=  ${pokemon.url}   alt= ${pokemon.name} >
            <p>${pokemon.name} </p>`
            divPokemons.appendChild(divPokemon)
        })
    }
    catch(error){
        console.error('Error fetching pokemons:', error)
    }
}
fetchPokemons()

searchButton.addEventListener ("click", () => {
    divPokemons.innerHTML=""
    function searchPokemon (pokemon){
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((response)=>{
            if (!response.ok){
                throw new Error ("La solicitud no fue exitosa");
            }
            return response.json();
        })
        .then((data) =>{   
            divPokemons.innerHTML = `
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h3>Nombre:</h3> <p>${data.name}</p>
            <h3>Tipo:</h3> <p>${data.types[0].type.name}</p>
            <h3>Altura:</h3> <p>${data.height}</p>
            <h3>Peso:</h3> <p> ${data.weight}</p>
        `;
    })
        .catch((error)=>{
            divPokemons.innerText="Error: " + error
        })
          
    }
    searchPokemon(searchedPokemon);
})

