import pokemonService from "./pokemonService.js";


async function testCapturaPokemon() {
  try {
    console.log("Testing capturaPokemon...");
    const result = await pokemonService.capturaPokemon(
      "6737278e28aebf267e089bec", // Token
      "zone123",                 // Zone ID
      "team456"                  // Team ID
    );
    console.log("capturaPokemon Result:", result);
  } catch (error) {
    console.error("Error during capturaPokemon test:", error);
  }
}

async function testCapturaPokemonTemps() {
  console.log("Testing capturaPokemonTemps...");

  // Using tokens array and test params
  const tokens = ["token1", "token2", "token3"];
  const idZona = "zone123";
  const idEquip = "team456";
  const interval = 1000; // 1 second interval
  const duration = Date.now() + 5000; // Run for 5 seconds

  // Call the automated capture function
  pokemonService.capturaPokemonTemps(tokens, idZona, idEquip, interval, duration);

  console.log("capturaPokemonTemps is running. Watch the console for results.");
}

// Run the tests
testCapturaPokemon();
testCapturaPokemonTemps();