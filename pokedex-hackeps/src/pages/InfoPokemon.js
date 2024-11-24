import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { getPokemonById } from '../services/PokemonService'; // Make sure the path is correct
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Registering the chart components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function InfoPokemon() {
    const { nou, id } = useParams(); // Get Pokémon ID from URL
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Pokémon data when component mounts or ID changes
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state when loading
                const data = await getPokemonById(id); // Fetch Pokémon by ID
                const parsedData = await data.json();
                console.log("Fetched data:", parsedData);
                setPokemon(parsedData);
            } catch (error) {
                setError('Failed to load Pokémon information.');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [id]);

    // If loading, show spinner
    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading...</p>
            </Container>
        );
    }

    // If error occurs, display error message
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

    // If Pokémon not found, show message
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

    // Prepare data for the radar chart
    const stats = pokemon.stats || []; // Default to empty array if stats is missing
    const data = {
        labels: stats.map(stat => stat.stat.name), // e.g. ['hp', 'attack', 'defense', ...]
        datasets: [
            {
                label: "Base Stats",
                data: stats.map(stat => stat.base_stat), // e.g. [63, 60, 55, 50, 50, 71]
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    };

    // Configure options for the radar chart
    const options = {
        responsive: true,
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                suggestedMin: 0,
                suggestedMax: 100, // Set a max value for better comparison
            },
        },
        plugins: {
            legend: {
                position: "top", // Adjust legend position
            },
        },
    };

    // Handle sound button click
    const playSound = () => {
        const soundUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`; // Construct the sound URL
        const audio = new Audio(soundUrl); // Create an Audio object with the URL
        audio.play(); // Play the sound
    };

    // Render Pokémon details with the radar chart
    return (
        <Container className="py-5">
            <Card>
                <Card.Header as="h5">
                    {nou === 'true' ? `New Pokémon Unlocked!: ${pokemon?.name || "Unknown"}` : `Details of ${pokemon?.name || "Unknown"}`}
                </Card.Header>
                <Card.Body>
                    <Card.Title>{pokemon?.name || "Unknown"}</Card.Title>
                    <Card.Text>
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

                    {/* Radar chart for base stats */}
                    
                    <div style={{ width: '400px', height: '400px', marginLeft: '200px', marginTop: '-330px' }}>
                        <Radar 
                            data={data} 
                            options={options}
                        />
                    </div>

                    {/* Sound Button */}
                    <Button variant="success" onClick={playSound} className="mt-3">
                        Play Sound
                    </Button>

                    <Link to="/llistat">
                        <Button variant="primary" className="mt-3">Back to List</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default InfoPokemon;
