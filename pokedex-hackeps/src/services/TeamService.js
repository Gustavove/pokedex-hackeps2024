import { getById, getTeams } from './TeamGateway.js';

export const getAllTeams = async () => {
    return await getTeams().then(response => {return response.json()});
}

export const getTeam = async() => {
    const team_id = '28620274-0860-416a-baee-4ae42f8623fd'
    return await getById(team_id).then(response => {return response.json()})
}

export const getTeamPokemons = async() => {
    const team = await getTeam()
    return team['captured_pokemons']
}



export const getTeamById = async (id) => {
    return await getById(id);
}

