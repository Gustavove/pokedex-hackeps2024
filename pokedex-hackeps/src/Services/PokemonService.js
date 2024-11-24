import { getPokemons } from './PokemonGateway2.js';
import { getById } from './PokemonGateway2.js';
import { evolveById } from './PokemonGateway2.js';
import { capturePokemon } from './PokemonGateway2.js';
import { capturePokemonByTime } from './PokemonGateway2.js';

const BASE_URL = "https://hackeps-poke-backend.azurewebsites.net/events/";


export const getAllPokemons = async () => {
    return await getPokemons();
}

export const getPokemonById = async (id) => {
    return await getById(id);
}


// Evolve a Pokémon by ID
export const evolvePokemonById = async(id) => {
    try {
        const evolvedPokemon = await evolveById(id);
        return evolvedPokemon;
    } catch (error) {
        console.error(`Error evolving Pokémon with ID ${id}:`, error);
        throw error;
    }
}

// Capture a Pokémon (immediate)
export const capturaPokemon = async(idZona, team_id) => {
    const response = await capturePokemon(idZona, team_id);
    return response.data; // Return the response data from the event
}

// Capture Pokémon at intervals (automated)
export const capturaPokemonTemps = (zone_ids, idEquip, temps) => {
    zone_ids.forEach(idZona => {
        setInterval(() => {
            capturePokemon(idZona, idEquip);
            console.log("setting interval for time:", temps * 10)
        }, temps * 10)
    });
}