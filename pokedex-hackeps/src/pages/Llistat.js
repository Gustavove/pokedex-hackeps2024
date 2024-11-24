import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getTeam } from "../services/TeamService";
import { getPokemonById } from "../services/PokemonService";

function Llistat() {
    const [pokemonList, setPokemonList] = useState([]);  // Holds the list of unique Pokémon with counts
    const [loading, setLoading] = useState(true);         // Loading state for async operations

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const pokemons = await getTeam().then(response => response.json()); // Fetch Pokémon from the service
                console.log("Fetched pokemons:", pokemons["captured_pokemons"]); // Debugging output

                // Create an object to count occurrences of each Pokémon
                const pokemonCount = {};
                pokemons["captured_pokemons"].forEach(item => {
                    if (pokemonCount[item.pokemon_id]) {
                        pokemonCount[item.pokemon_id] += 1;  // Increment count if the Pokémon already exists
                    } else {
                        pokemonCount[item.pokemon_id] = 1;   // Set count to 1 if it's the first occurrence
                    }
                });

                // Get unique Pokémon data with their capture count
                const pokemonDetails = await Promise.all(
                    Object.keys(pokemonCount).map(async (pokemonId) => {
                        const cardResponse = await getPokemonById(pokemonId);
                        const pokemonDetail = await cardResponse.json();
                        return {
                            ...pokemonDetail,      // Include all the details fetched from API
                            count: pokemonCount[pokemonId],  // Add capture count
                        };
                    })
                );

                console.log("Pokemon Details:", pokemonDetails);  // Log details for debugging
                setPokemonList(pokemonDetails);  // Set the detailed Pokémon data with counts in state
                setLoading(false);  // Set loading to false once data is fetched
            } catch (error) {
                console.error("Error fetching Pokémon list:", error);
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);  // Empty dependency array to run this effect only once when the component mounts

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading Pokédex...</p>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h1 className="text-center mb-4">Pokédex</h1>
            <Row>
                {/* Map over pokemonList and render each Pokémon as a card */}
                {Array.isArray(pokemonList) &&
                    pokemonList.map((pokemon) => (
                        <Col xs={6} md={4} lg={3} key={pokemon.id} className="mb-4">
                            <Card className="h-100">
                                {/* Check if sprite exists and fallback to placeholder image */}
                                <Card.Img
                                    variant="top"
                                    src={pokemon.image}  // Fallback if sprite is missing
                                    alt={pokemon.name}    // Pokémon name
                                />
                                <Card.Body className="text-center">
                                    <Card.Title>
                                        #{pokemon.id} {pokemon.name}  {/* Pokémon ID and name */}
                                    </Card.Title>
                                    <Card.Text>
                                        Captured: {pokemon.count} times {/* Pokémon capture count */}
                                    </Card.Text>
                                    <Link to={`/infoPokemon/false/${pokemon.id}`}>
                                        <Button variant="primary">View Details</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
            </Row>
        </Container>
    );
}

export default Llistat;