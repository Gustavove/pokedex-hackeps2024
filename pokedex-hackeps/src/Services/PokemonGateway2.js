
import pokemon from './pokemon.js';

export const getPokemons = async () => {
    const url = "https://hackeps-poke-backend.azurewebsites.net/pokemons";
    const response = fetch(url);
    return response
}


export const getPokemonById = async (id) => {
    const url = "https://hackeps-poke-backend.azurewebsites.net/pokemons" + "/" + id;
    const response = fetch(url);
    return response
}