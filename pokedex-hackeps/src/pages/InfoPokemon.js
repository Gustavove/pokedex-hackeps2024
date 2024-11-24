// InfoPokemon.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import {getPokemonById} from '../Services/PokemonService'; // Ensure the path to pokemonService is correct

const dummyPokemon = {
    id: 1,
    name: "Bulbasaur",
    height: 7, // Height in decimeters
    weight: 69, // Weight in hectograms
    types: [
        { name: "Grass" },
        { name: "Poison" }
    ],
    abilities: [
        { name: "Overgrow" },
        { name: "Chlorophyll" }
    ],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" // Example image URL
};


function InfoPokemon() {
    const { id } = useParams(); // Get the Pokémon ID from the URL
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Pokémon data when the component mounts or the ID changes
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const data = await getPokemonById(id);
                console.log(data);
                setPokemon(data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load Pokémon information.');
                setLoading(false);
            }
        };
    }, [id]);



    // Show a loading spinner while data is being fetched
    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading...</p>
            </Container>
        );
    }

    // Show an error message if data fetching fails
    if (error) {
        return (
            <Container className="text-center py-5">
                <h1>{error}</h1>
                <Link to="/">
                    <Button variant="secondary">Back to List</Button>
                </Link>
            </Container>
        );
    }

    // If the Pokémon doesn't exist, show an error message
    if (!pokemon) {
        return (
            <Container className="text-center py-5">
                <h1>Pokémon not found</h1>
                <Link to="/">
                    <Button variant="secondary">Back to List</Button>
                </Link>
            </Container>
        );
    }

    // Display the Pokémon's information
    return (
        <Container className="py-5">
            <Card>
                <Card.Header as="h5">Details of {pokemon.name}</Card.Header>
                <Card.Body>
                    <Card.Title>{pokemon.name}</Card.Title>
                    <Card.Text>
                        <strong>Height:</strong> {pokemon.height} <br />
                        <strong>Weight:</strong> {pokemon.weight} <br />
                        <strong>Types:</strong> {pokemon.types.map((type) => type.name).join(', ')} <br />
                        <strong>Abilities:</strong> {pokemon.abilities.map((ability) => ability.name).join(', ')}
                    </Card.Text>
                    <img src={pokemon.image} alt={pokemon.name} style={{ width: '200px' }} />
                    <Link to="/">
                        <Button variant="primary" className="mt-3">Back to List</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default InfoPokemon;
