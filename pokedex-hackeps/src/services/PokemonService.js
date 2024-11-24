import { getPokemons } from '../services/PokemonGateway2.js';
import { getById } from '../services/PokemonGateway2.js';
import { evolveById } from '../services/PokemonGateway2.js';
import { capturePokemon } from '../services/PokemonGateway2.js';
import { getTeam, getTeamPokemons } from './TeamService.js';

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
        const myPokemons = await getTeamPokemons();
        console.log(myPokemons);
        const uuids = myPokemons.filter(item => item["pokemon_id"] === id).map(item => item["id"]);
        console.log(uuids);
        if (uuids.length >= 3) {
          const evolvedPokemon = await evolveById(id, uuids[0], uuids[1], uuids[2]);
          console.log(evolvedPokemon)
          return evolvedPokemon;
        } else {
          console.log('Not enough UUIDs to process.');
        }
    } catch (error) {
        console.error(`Error evolving Pokémon with ID ${id}:`, error);
        throw error;
    }
}

// Capture a Pokémon (immediate)
export const capturaPokemon = async(idZona, team_id) => {
    return await capturePokemon(idZona, team_id).then(response=> {return response.json()}); // Return the response data from the event

}

// Capture Pokémon at intervals (automated)
export const capturaPokemonTemps = (zone_ids, idEquip, temps = temps*60, tiempoTotal = tiempoTotal*60*60) => {
    zone_ids.forEach(idZona => {
        const interval = setInterval(async () => {
            try {
                const response = await capturePokemon(idZona, idEquip);
                const data = await response.json();
                console.log("Captured Pokémon:", data);
            } catch (error) {
                console.error("Error capturing Pokémon:", error);
            }
        }, temps * 1000);

        setTimeout(() => {
            clearInterval(interval);
        }, tiempoTotal * 1000);
    });
};