import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getTeam } from "../services/TeamService";
import { getPokemonById } from "../services/PokemonService";

function Llistat() {
    const [pokemonList, setPokemonList] = useState([]);  // Holds the list of detailed Pokémon
    const [loading, setLoading] = useState(true);         // Loading state for async operations

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const pokemons = await getTeam().then(response => response.json()); // Fetch Pokémon from the service
                console.log("Fetched pokemons:", pokemons["captured_pokemons"]); // Debugging output

                // Fetch detailed data for each Pokémon in the list
                const pokemonDetails = await Promise.all(
                    pokemons["captured_pokemons"].map(async (item) => {
                        const url = `http://localhost:3001/InfoPokemon/True/${item.pokemon_id}`;
                        const cardResponse = await getPokemonById(item.pokemon_id);
                        const pokemonDetail = await cardResponse.json();
                        return pokemonDetail; // Return the detailed data for each Pokémon
                    })
                );

                console.log("Pokemon Details:", pokemonDetails);  // Log details for debugging
                setPokemonList(pokemonDetails);  // Set the detailed Pokémon data in the state
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
                                <Card.Img
                                    variant="top"
                                    src={pokemon.image}  // Pokémon image from fetched details
                                    alt={pokemon.name}    // Pokémon name
                                />
                                <Card.Body className="text-center">
                                    <Card.Title>
                                        #{pokemon.id} {pokemon.name}  {/* Pokémon ID and name */}
                                    </Card.Title>
                                    <Link to={`/pokemon/${pokemon.id}`}>
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
