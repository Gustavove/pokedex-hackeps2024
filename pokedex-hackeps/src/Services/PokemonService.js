import { getPokemons } from '../Services/PokemonGateway2.js';
import { getById } from '../Services/PokemonGateway2.js';
import { evolveById } from '../Services/PokemonGateway2.js';
import { capturePokemon } from '../Services/PokemonGateway2.js';
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
export const capturaPokemon = async(idZona) => {
    const response = await capturePokemon(idZona);
    return response.data; // Return the response data from the event
}

// Capture Pokémon at intervals (automated)
export const capturaPokemonTemps = (id, idZona, idEquip, temps, tempsAutomatitzacio) => {
    let tokenIndex = 0; // Start with the first token

    const tokens = Array.isArray(id) ? id : [id]; // Support single or multiple tokens

    const runInterval = setInterval(async () => {
        const currentToken = tokens[tokenIndex];
        console.log(`Using token: ${currentToken}`);

        try {
            const result = await this.capturaPokemon(currentToken, idZona, idEquip);
            console.log(`Capture result:`, result);
        } catch (error) {
            console.error("Error during automated capture:", error);
        }

        // Move to the next token in the list
        tokenIndex = (tokenIndex + 1) % tokens.length;

        // Clear the interval after the specified duration
        if (tempsAutomatitzacio && new Date().getTime() > tempsAutomatitzacio) {
            console.log("Automation duration expired. Stopping.");
            clearInterval(runInterval);
        }
    }, temps); // Execute at the specified interval
}