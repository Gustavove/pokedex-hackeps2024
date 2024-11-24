import { getTeam } from "./TeamService";

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

export const evolveById = async (id, uuid1, uuid2, uuid3) => {
    const myPokemons = getTeam()
    const url = "https://hackeps-poke-backend.azurewebsites.net/pokemons" + "/" + id + "/evolve";
    const team_id = '28620274-0860-416a-baee-4ae42f8623fd'
    const response = fetch(
        url, 
        {method: 'POST', body: JSON.stringify({pokemon_uuid_list: [uuid1, uuid2, uuid3], team_id: team_id}),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }});
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


