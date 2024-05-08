const pesquisar = document.querySelector('#pesquisar');
const numero = document.querySelector('#numero')
const pokemonImagem = document.querySelector('#poke-image');
const type = document.querySelector("#types");
const statNumber   = document.querySelectorAll('.status-numero');
const barInner     = document.querySelectorAll('.barra-inner');
const barOuter     = document.querySelectorAll('.barra-outer');
const statDesc     = document.querySelectorAll('.status-desc');
const baseStats    = document.querySelector('#base-status');
const pokedex      = document.querySelector('#pokedex');

const typeColors = {
    "rock":     [182, 158,  49],
    "ghost":    [112,  85, 155],
    "steel":    [183, 185, 208],
    "water":    [100, 147, 235],
    "grass":    [116, 203,  72],
    "psychic":  [251,  85, 132],
    "ice":      [154, 214, 223],
    "dark":     [117,  87,  76],
    "fairy":    [230, 158, 172],
    "normal":   [170, 166, 127],
    "fighting": [193,  34,  57],
    "flying":   [168, 145, 236],
    "poison":   [164,  62, 158],
    "ground":   [222, 193, 107],
    "bug":      [167, 183,  35],
    "fire":     [245, 125,  49],
    "electric": [249, 207,  48],
    "dragon":   [112,  55, 255]
}

const fetchApi = async (pokemonNome) => {
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNome}`);
    if (!response.ok) {
        return null; // Retorna null se o Pokémon não for encontrado
    }
    const pokemonData = await response.json();
    return pokemonData;
};


pesquisar.addEventListener('change', async (event) => {
    const pokemonData = await fetchApi(event.target.value);
    
    if(!pokemonData){
        alert('Pokemon não existe.')
        return;
    }

    console.log(pokemonData);

    numero.innerHTML = '#' + pokemonData.id.toString().padStart(3, '0');
    pokemonImagem.src = pokemonData.sprites.other.dream_world.front_default;


    types.innerHTML = ' '

    const mainColor = typeColors[pokemonData.types[0].type.name];
    baseStats.style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    pokedex.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;



    pokemonData.types.forEach((t) => {
        let newType = document.createElement('span')
        let color = typeColors[t.type.name]

        newType.innerHTML = t.type.name
        newType.classList.add('type')
        newType.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    
        types.appendChild(newType)
    })

    pokemonData.stats.forEach((s, i) => {
        statNumber[i].innerHTML = s.base_stat.toString().padStart(3, '0');
        barInner[i].style.width = `${s.base_stat}%`;
        barInner[i].style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        barOuter[i].style.backgroundColor = `rgba(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}, 0.3)`;
        statDesc[i].style.color           = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    });
});
