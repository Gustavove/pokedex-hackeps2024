


import Pokemon from './models/Pokemon'; // Assuming Pokemon.js is in the 'models' folder
import Ability from './models/Ability';
import Move from './models/Move';
import Species from './models/Species';
import Stat from './models/Stat';
import Type from './models/Type';

class PokemonGateway {
    constructor() {
        this.url = "https://hackeps-poke-backend.azurewebsites.net/pokemons/";
    }

    // Helper method to fetch data from the API
    async fetchAPI(endpoint, options = {}) {
        try {
            const response = await fetch(this.url + endpoint, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("API fetch failed:", error);
            throw error;
        }
    }

    // GET: Returns data for a Pokémon by ID /pokemon/{id}
    async getPokemonById(id) {
        try {
            const data = await this.fetchAPI(id);

            // Create a new Pokemon object by mapping the data to a Pokemon instance
            const pokemon = new Pokemon({
                id: data.id,
                name: data.name,
                abilities: data.abilities.map(abilityData => new Ability(abilityData)),
                cries: data.cries,
                height: data.height,
                location_area_encounters: data.location_area_encounters,
                evolves_to: data.evolves_to ? new Pokemon(data.evolves_to) : null,
                moves: data.moves.map(moveData => new Move(moveData)),
                species: new Species(data.species),
                image: data.image,
                stats: data.stats.map(statData => new Stat(statData)),
                types: data.types.map(typeData => new Type(typeData)),
                weight: data.weight,
            });

            return pokemon;
        } catch (error) {
            console.error(`Failed to fetch Pokémon with ID ${id}:`, error);
            throw error;
        }
    }

    // GET: Returns a list of all Pokémon
    async getAllPokemon() {
        try {
            const data = await this.fetchAPI("");
            return data.map(element => {
                return new Pokemon({
                    id: element.id,
                    name: element.name,
                    abilities: element.abilities.map(abilityData => new Ability(abilityData)),
                    cries: element.cries,
                    height: element.height,
                    location_area_encounters: element.location_area_encounters,
                    evolves_to: element.evolves_to ? new Pokemon(element.evolves_to) : null,
                    moves: element.moves.map(moveData => new Move(moveData)),
                    species: new Species(element.species),
                    image: element.image,
                    stats: element.stats.map(statData => new Stat(statData)),
                    types: element.types.map(typeData => new Type(typeData)),
                    weight: element.weight,
                });
            });
        } catch (error) {
            console.error("Failed to fetch all Pokémon:", error);
            throw error;
        }
    }

    // POST: Executes the evolution of a Pokémon by ID, requires UUIDs and team_id
    async evolveById(pokemon_id, pokemon_uuid_list, team_id) {
        if (!pokemon_uuid_list || pokemon_uuid_list.length !== 3) {
            throw new Error("You must provide exactly 3 UUIDs of the same Pokémon.");
        }

        try {
            const body = JSON.stringify({
                pokemon_uuid_list: pokemon_uuid_list,
                team_id: team_id,
            });

            const data = await this.fetchAPI(`${pokemon_id}/evolve`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            });

            return data; // Return the response (e.g., success message)
        } catch (error) {
            console.error(`Failed to evolve Pokémon with ID ${pokemon_id}:`, error);
            throw error;
        }
    }
}

export default PokemonGateway;
