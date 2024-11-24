
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

export const capturePokemon = async (zone_id, team_id) => {
    const response = fetch("https://hackeps-poke-backend.azurewebsites.net/events/" + zone_id, {
        method: "POST",
        body: JSON.stringify({
          team_id: team_id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    console.log(response)
    return response
}


