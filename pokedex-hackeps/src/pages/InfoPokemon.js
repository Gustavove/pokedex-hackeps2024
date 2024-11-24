import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Spinner, Table } from 'react-bootstrap';
import { getPokemonById } from '../services/PokemonService';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Registering the chart components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function InfoPokemon() {
    const { nou, id } = useParams(); // Get Pokémon ID from URL
    const [pokemon, setPokemon] = useState(null);
    const [moves, setMoves] = useState([]); // To store move details
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Pokémon data when component mounts or ID changes
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state
                const data = await getPokemonById(id); // Fetch Pokémon by ID
                const parsedData = await data.json();
                console.log("Fetched data:", parsedData);
    
                if (!parsedData || Object.keys(parsedData).length === 0) {
                    throw new Error("Empty Pokémon data.");
                }
    
                setPokemon(parsedData);
    
                // Fetch move details (if moves exist)
                if (parsedData.moves && parsedData.moves.length > 0) {
                    const moveDetails = await Promise.all(
                        parsedData.moves.slice(0, 10).map(async (move) => {
                            try {
                                const response = await fetch(move.url);
                                const moveData = await response.json();
                                return {
                                    name: moveData.name,
                                    power: moveData.power,
                                    pp: moveData.pp,
                                    accuracy: moveData.accuracy,
                                    type: moveData.type.name,
                                };
                            } catch (err) {
                                console.error("Move fetch error:", err);
                                return { name: move.move.name, error: "Details not available" };
                            }
                        })
                    );
                    setMoves(moveDetails);
                }
            } catch (err) {
                console.error("Error fetching Pokémon information:", err);
                setError(`Error: ${err.message || "Unknown error occurred."}`);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPokemon();

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
                <Link to="/llistat">
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
                <Link to="/llistat">
                    <Button variant="secondary">Back to List</Button>
                </Link>
            </Container>
        );
    }

    // Prepare data for the radar chart
    const stats = pokemon.stats || []; // Default to empty array if stats is missing
    const data = {
        labels: stats.map((stat) => stat.stat.name), // e.g. ['hp', 'attack', 'defense', ...]
        datasets: [
            {
                label: 'Base Stats',
                data: stats.map((stat) => stat.base_stat), // e.g. [63, 60, 55, 50, 50, 71]
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const playSound = () => {
        const soundUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
        const audio = new Audio(soundUrl);
        audio.play();
    };

    return (
        <Container className="py-5">
            <Card>
                <Card.Header as="h5">
                    {nou === 'true'
                        ? `New Pokémon Unlocked!: ${pokemon?.name || 'Unknown'}`
                        : `Details of ${pokemon?.name || 'Unknown'}`}
                </Card.Header>
                <Card.Body>
                    <Card.Title>{pokemon?.name || 'Unknown'}</Card.Title>
                    <Card.Text>
                        <strong>Height:</strong> {pokemon?.height || 'N/A'} <br />
                        <strong>Weight:</strong> {pokemon?.weight || 'N/A'} <br />
                        <strong>Types:</strong>{' '}
                        {pokemon?.types && pokemon.types.length > 0
                            ? pokemon.types.map((item) => item.type.name).join(', ')
                            : 'No types available'}{' '}
                        <br />
                        <strong>Abilities:</strong>{' '}
                        {pokemon?.abilities && pokemon.abilities.length > 0
                            ? pokemon.abilities.map((item) => item.ability.name).join(', ')
                            : 'No abilities available'}
                    </Card.Text>
                    <img src={pokemon?.image} alt={pokemon?.name} style={{ width: '200px' }} />

                    {/* Radar chart for base stats */}
                    <div style={{ width: '400px', height: '400px', marginLeft: '200px', marginTop: '-330px' }}>
                        <Radar data={data} options={options} />
                    </div>

                    {/* Sound Button */}
                    <Button style={{ backgroundColor: "#FC5350", color: "#fff", border: "none"}} onClick={playSound} className="mt-3">
                        Play Sound
                    </Button>

                    <Link to="/llistat">
                        <Button style={{ backgroundColor: "#46CFB1", color: "#fff", border: "none"}} className="mt-3">
                            Back to List
                        </Button>
                    </Link>
                </Card.Body>
            </Card>

            {/* Moves Table */}
            <Card className="mt-5">
                <Card.Header as="h5">Moves</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Power</th>
                                <th>Accuracy</th>
                                <th>PP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moves.map((move, index) => (
                                <tr key={index}>
                                    <td>{move.name}</td>
                                    <td>{move.type}</td>
                                    <td>{move.power || 'N/A'}</td>
                                    <td>{move.accuracy || 'N/A'}</td>
                                    <td>{move.pp || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default InfoPokemon;