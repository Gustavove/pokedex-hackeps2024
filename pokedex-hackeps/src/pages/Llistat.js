import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getTeam } from "../services/TeamService";

function Llistat() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const pokemons = await getTeam().then(response => {
                    return response.json()
                }); // Fetch Pokémon from the service
                console.log("Fetched pokemons:", pokemons["captured_pokemons"]); // Debugging output
                const pokemon_cards = await Promise.all(
                    pokemons["captured_pokemons"].map(async (item) => {
                        const url = `http://localhost:3001/InfoPokemon/True/${item.pokemon_id}`;
                        const cardResponse = await fetch(url); // Fetch Pokémon details
                        return cardResponse; // Parse the response
                    })
                );
                console.log(pokemon_cards)
                setPokemonList(pokemons);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Pokémon list:", error);
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

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
                {Array.isArray(pokemonList) &&
                    pokemonList.map((pokemon) => (
                        <Col xs={6} md={4} lg={3} key={pokemon.id} className="mb-4">
                            <Card className="h-100">
                                <Card.Img
                                    variant="top"
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                />
                                <Card.Body className="text-center">
                                    <Card.Title>
                                        #{pokemon.id} {pokemon.name}
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