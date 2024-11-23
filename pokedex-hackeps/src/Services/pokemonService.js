class pokemonService {

    constructor() {
        this.pokemons = [];
    }


    async getAllPokemons() {
        pokemonGateway.getAllPokemon().then(pokemonList => {
           return pokemonList;
        });
    }

    async getPokemonById(id) {
        pokemonGateway.getPokemonById(id).then(pokemon => {
            return pokemon;
        });
    }

    async evolvePokemonById(id) {
        pokemonGateway.evolveById(id).then(pokemon => {
            return pokemon;
        });
    }

}