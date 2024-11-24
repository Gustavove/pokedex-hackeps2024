export const getById = async (id) => {
    const url = "https://hackeps-poke-backend.azurewebsites.net/teams" + "/" + id;
    const response = fetch(url);
    return response
}

export const getTeams = async () => {
    const url = "https://hackeps-poke-backend.azurewebsites.net/teams";
    const response = fetch(url);
    return response
}