

class pokemonGateway {
    constructor() {
        this.url = "https://hackeps-poke-backend.azurewebsites.net/pokemons/";

    }

    // GET return data from pokemon by id /pokemon/{id}
    async getPokemonById(id) { 
        const response = await fetch(this.url + id);
        const data = await response.json();
        const pokemon = new pokemon(id, name, abilities, cries, height, location_area_encounters, evolves_to, moves, species, image, stats, types, weight)
        return data;
    }

    // GET retorna tots els pokemons
    async getAllPokemon() {
        const response = await fetch(this.url);
        const data = await response.json();
        const pokemonList = data.array.forEach(element => {
            new pokemon(element.id, element.name, element.abilities, element.cries, element.height, element.location_area_encounters, element.evolves_to, element.moves, element.species, element.image, element.stats, element.types, element.weight);
        });
        return pokemonList;
    }

    // POST executa l'evolucio d'un pokemon
    async evolveById(pokemon_id) {
        const response = await fetch(this.url + '/' + pokemon_id + '/' + "/evolve");
        const data = await response.json();
        return data;
    }



}