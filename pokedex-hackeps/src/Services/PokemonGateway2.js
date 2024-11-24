
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


export const capturePokemonByTime = async (id, zone_id, team_id, time, auto_time) => {

    let tokenIndex = 0; // Start with the first token

    const tokens = Array.isArray(id) ? id : [id]; // Support single or multiple tokens

    const runInterval = setInterval(async () => {
        const currentToken = tokens[tokenIndex];
        console.log(`Using token: ${currentToken}`);

        try {
            const result = await capturePokemon(currentToken, zone_id, team_id);
            console.log(`Capture result:`, result);
        } catch (error) {
            console.error("Error during automated capture:", error);
        }

        // Move to the next token in the list
        tokenIndex = (tokenIndex + 1) % tokens.length;

        // Clear the interval after the specified duration
        if (auto_time && new Date().getTime() > auto_time) {
            console.log("Automation duration expired. Stopping.");
            clearInterval(runInterval);
        }
    }, time); // Execute at the specified interval
}