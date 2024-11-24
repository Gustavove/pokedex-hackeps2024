import { getPokemonById } from "./PokemonService";
import { getTeamPokemons } from "./TeamService";
import { getTournaments, getById, joinTournament } from "./TournamentGateway";

export const getAllTournaments = async () => {
    return await getTournaments().then(response => {return response.json()});
}

export const getTournamentById = async (id) => {
    return await getById(id).then(response => {return response.json()});
}

export const joinTournamentById = async (tournamentId, pokemonIdsString) => {
    const pokemonIdsList = pokemonIdsString.split(",").map(Number)
    const uuidList = pokemonIdsList.map(
        id => getTeamPokemons().filter(item => item["pokemon_id"] == id)[0]["id"]
    )
    return await joinTournament(tournamentId, uuidList);
}