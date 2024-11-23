import pokemonGateway from './pokemonGateway.js';

class pokemonService {
    constructor() {
        this.pokemons = [];
    }

    getAllPokemons() {
        return pokemonGateway.getAllPokemon().then(pokemonList => {
            return pokemonList;
        });
    }

    getPokemonById(id) {
        return pokemonGateway.getPokemonById(id).then(pokemon => {
            return pokemon;
        });
    }

    evolvePokemonById(id) {
        return pokemonGateway.evolveById(id).then(pokemon => {
            return pokemon;
        });
    }
}
export default pokemonService;