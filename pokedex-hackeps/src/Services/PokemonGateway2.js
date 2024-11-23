

export const getPokemons = async () => {
    const url = "https://hackeps-poke-backend.azurewebsites.net/pokemons";
    const response = fetch(url);
    return response
}

export const getById = async (id) => {
    const url = "https://hackeps-poke-backend.azurewebsites.net/pokemons" + "/" + id;
    const response = fetch(url);
    return response
}

export const evolveById = async (id) => {
    const url = "https://hackeps-poke-backend.azurewebsites.net/pokemons" + "/" + id + "/evolve";
    const response = fetch(url);
    return response
}

export const capturePokemon = async (zone_id) => {
    const url = "https://hackeps-poke-backend.azurewebsites.net/events/" + zone_id;
    const response = fetch(url);
    return response
}
