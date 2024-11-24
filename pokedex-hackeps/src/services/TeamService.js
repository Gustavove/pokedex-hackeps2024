import { getById, getTeams } from './/TeamGateway.js';

export const getAllTeams = async () => {
    return await getTeams();
}

export const getTeam = async() => {
    const team_id = '28620274-0860-416a-baee-4ae42f8623fd'
    return await getById(team_id)
}


export const getTeamById = async (id) => {
    return await getById(id);
}

