import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { getPokemonById } from "../Services/PokemonService";
import { evolvePokemonById } from "../Services/PokemonService";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getAllPokemons } from '../Services/PokemonService.js';
import { capturaPokemon } from '../Services/PokemonService.js';
import { getTeam } from '../Services/TeamService.js';




function Llistat() {
    const [pokemonList, setPokemonList] = useState([]); // Holds all Pokémon (captured and uncaptured)
    const [loading, setLoading] = useState(true);       // Loading state for async operations
    const [error, setError] = useState(null);  

    const handleEvolve = async (id) => {
        try {
            const response = await evolvePokemonById(id);
            console.log(response);
            // Optionally update the state with the evolved Pokémon
            setPokemonList((prevList) =>
                prevList.map((pokemon) =>
                    pokemon.id === id ? { ...pokemon, ...response } : pokemon
                )
            );
            window.location.reload();
        } catch (error) {
            console.error("Error evolving Pokémon:", error);
            setError("Error evolving Pokémon.");
        }
    };

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                // Fetch captured Pokémon
                const pokemons = await getTeam();
                console.log("Fetched pokemons:", pokemons["captured_pokemons"]);

                // Create an object to count occurrences of each captured Pokémon
                const pokemonCount = {};
                pokemons["captured_pokemons"].forEach((item) => {
                    if (pokemonCount[item.pokemon_id]) {
                        pokemonCount[item.pokemon_id] += 1; // Increment count
                    } else {
                        pokemonCount[item.pokemon_id] = 1;  // Initialize count
                    }
                });

                // Fetch Pokémon data for IDs 1 to 152 (including missing ones)
                const allPokemons = await Promise.all(
                    Array.from({ length: 152 }, (_, i) => i + 1).map(async (pokemonId) => {
                        try {
                            const cardResponse = await getPokemonById(pokemonId);
                            const pokemonDetail = await cardResponse.json();
                            return {
                                id: pokemonDetail.id,
                                name: pokemonDetail.name,
                                image: pokemonDetail.image || null, // Sprite or null
                                count: pokemonCount[pokemonId] || 0, // Capture count
                                evolves_to: pokemonDetail.evolves_to,
                            };
                        } catch (error) {
                            // If fetch fails, create a placeholder for the missing Pokémon
                            return {
                                id: pokemonId,
                                name: "Unknown",
                                image: null,
                                count: 0,
                            };
                        }
                    })
                );

                console.log("All Pokemon Details:", allPokemons);
                setPokemonList(allPokemons); // Set the Pokémon list (captured + placeholders)
                setLoading(false);           // Stop loading spinner
            } catch (error) {
                console.error("Error fetching Pokémon list:", error);
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []); // Empty dependency array to run this effect once

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
                {pokemonList.map((pokemon) => (
                    <Col xs={6} md={4} lg={3} key={pokemon.id} className="mb-4">
                        <Card className="h-100">
                            {/* Conditionally render Pokémon image or ID placeholder */}
                            {pokemon.count > 0 ? (
                                <Card.Img
                                    variant="top"
                                    src={pokemon.image} // Sprite for captured Pokémon
                                    alt={pokemon.name}
                                    style={{ width: "100%", height: "150px", objectFit: "scale-down" }}
                                />
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "200px",
                                        fontSize: "3rem",
                                        fontWeight: "bold",
                                        color: "#ccc",
                                        backgroundColor: "#f7f7f7",
                                        border: "1px dashed #ccc",
                                    }}
                                >
                                    #{pokemon.id} {/* ID for uncaptured Pokémon */}
                                </div>
                            )}
                            <Card.Body className="text-center">
                                <Card.Title>
                                    #{pokemon.id} {pokemon.count > 0 ? pokemon.name : "Unknown"} {/* Name or Unknown */}
                                </Card.Title>
                                <Card.Text>
                                    {pokemon.count > 0 ? (
                                        <span>Captured: {pokemon.count} times</span> // Show capture count
                                    ) : (
                                        <span>Not Captured</span> // Indicate uncaptured Pokémon
                                    )}
                                </Card.Text>
                                {pokemon.count > 0 && ( // Only show the "View Details" button for captured Pokémon
                                    <><Link to={`/infoPokemon/false/${pokemon.id}`}>
                                        <Button variant="primary">View Details</Button>
                                    </Link><Button variant="secondary" disabled={!pokemon.evolves_to || pokemon.count < 3} onClick={() => handleEvolve(pokemon.id)}>
                                            Evolve
                                    </Button></>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Llistat;