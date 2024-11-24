<<<<<<< Updated upstream
// InfoPokemon.js
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    const { id } = useParams(); // Get the Pokémon ID from the URL
=======
    const { nou, id } = useParams(); // Obtén el ID del Pokémon desde la URL
=======
// src/components/InfoPokemon.js

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { getPokemonById } from "../services/PokemonService";

function InfoPokemon() {
    const { id } = useParams(); // Get Pokémon ID from the URL
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

<<<<<<< Updated upstream
    // Fetch Pokémon data when the component mounts or the ID changes
=======
<<<<<<< Updated upstream
    // useEffect para obtener datos cuando el componente se monta o cambia el ID
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
            } finally {
=======
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const data = await getPokemonById(id); // Fetch Pokémon details from the service
                setPokemon(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Pokémon details:", error);
>>>>>>> Stashed changes
>>>>>>> Stashed changes
                setLoading(false);
            }
        };
    }, [id]);

<<<<<<< Updated upstream


    // Show a loading spinner while data is being fetched
=======
<<<<<<< Updated upstream
    // Si está cargando, muestra un spinner
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading Pokémon details...</p>
            </Container>
        );
    }

<<<<<<< Updated upstream
    // Show an error message if data fetching fails
=======
<<<<<<< Updated upstream
    // Si hay un error, muestra el mensaje de error
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    // If the Pokémon doesn't exist, show an error message
=======
    // Si no hay datos de Pokémon después de la carga, muestra "Pokémon no encontrado"
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    if (!pokemon) {
        return (
            <Container className="text-center py-5">
                <h1>Pokémon not found</h1>
                <Link to="/">
                    <Button variant="secondary">Back to Pokédex</Button>
                </Link>
            </Container>
        );
    }

<<<<<<< Updated upstream
    // Display the Pokémon's information
=======
<<<<<<< Updated upstream
    // Solo muestra la información del Pokémon si los datos son válidos
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    return (
        <Container className="py-5">
            <Card>
                <Card.Header as="h5">Details of {pokemon.name}</Card.Header>
                <Card.Body>
                    <Card.Title>{pokemon.name}</Card.Title>
                    <Card.Text>
<<<<<<< Updated upstream
                        <strong>Height:</strong> {pokemon.height} <br />
                        <strong>Weight:</strong> {pokemon.weight} <br />
                        <strong>Types:</strong> {pokemon.types.map((type) => type.name).join(', ')} <br />
                        <strong>Abilities:</strong> {pokemon.abilities.map((ability) => ability.name).join(', ')}
                    </Card.Text>
                    <img src={pokemon.image} alt={pokemon.name} style={{ width: '200px' }} />
=======
<<<<<<< Updated upstream
                        <strong>Height:</strong> {pokemon?.height || "N/A"} <br />
                        <strong>Weight:</strong> {pokemon?.weight || "N/A"} <br />
                        <strong>Types: </strong> 
                        {pokemon?.types && pokemon.types.length > 0 
                            ? pokemon.types.map((item) => item.type.name).join(', ') 
                            : "No types available"} 
                        <br />
                        <strong>Abilities: </strong> 
                        {pokemon?.abilities && pokemon.abilities.length > 0 
                            ? pokemon.abilities.map((item) => item.ability.name).join(', ') 
                            : "No abilities available"}
                    </Card.Text>
                    <img src={pokemon?.image} alt={pokemon?.name} style={{ width: '200px' }} />
=======
                        <strong>Height:</strong> {pokemon.height} <br />
                        <strong>Weight:</strong> {pokemon.weight} <br />
                        <strong>Types:</strong>{" "}
                        {pokemon.types.map((type) => type.name).join(", ")} <br />
                        <strong>Abilities:</strong>{" "}
                        {pokemon.abilities.map((ability) => ability.name).join(", ")}
                    </Card.Text>
                    <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        style={{ width: "200px" }}
                    />
>>>>>>> Stashed changes
>>>>>>> Stashed changes
                    <Link to="/">
                        <Button variant="primary" className="mt-3">
                            Back to Pokédex
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default InfoPokemon;
