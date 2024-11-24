import pokemonGateway from "./pokemonGateway.js";
import axios from "axios"; // Assuming axios is used for HTTP requests


const BASE_URL = "https://hackeps-poke-backend.azurewebsites.net/events/";

class PokemonService {
  constructor() {
    this.pokemons = [];
  }

  // Fetch all Pokémon
  async getAllPokemons() {
    try {
      const pokemonList = await pokemonGateway.getAllPokemon();
      this.pokemons = pokemonList; // Cache the list locally if needed
      return pokemonList;
    } catch (error) {
      console.error("Error fetching all Pokémon:", error);
      throw error;
    }
  }

  // Fetch a Pokémon by ID
  async getPokemonById(id) {
    if (id === "999") {
      // Returning a dummy Pokémon with ID 999
      return {
        id: 999,
        name: "DummyPikachu",
        height: 0.6,
        weight: 6.0,
        types: [{ name: "Electric" }],
        abilities: [{ name: "Static" }],
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", // Placeholder image
      };
    }

    try {
      const pokemon = await pokemonGateway.getPokemonById(id);
      return pokemon;
    } catch (error) {
      console.error(`Error fetching Pokémon with ID ${id}:`, error);
      throw error;
    }
  }
  // Evolve a Pokémon by ID
  async evolvePokemonById(id) {
    try {
      const evolvedPokemon = await pokemonGateway.evolveById(id);
      return evolvedPokemon;
    } catch (error) {
      console.error(`Error evolving Pokémon with ID ${id}:`, error);
      throw error;
    }
  }

  // Capture a Pokémon (immediate)
  async capturaPokemon(id, idZona, idEquip) {
    const url = `${BASE_URL}${idZona}`;
    const body = { team_id: idEquip };
    const headers = { Authorization: `Bearer ${id}` };

    try {
      const response = await axios.post(url, body, { headers });
      return response.data; // Return the response data from the event
    } catch (error) {
      console.error("Error capturing Pokémon:", error);
      throw error;
    }
  }

  // Capture Pokémon at intervals (automated)
  async capturaPokemonTemps(id, idZona, idEquip, temps, tempsAutomatitzacio) {
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
}

export default new PokemonService();