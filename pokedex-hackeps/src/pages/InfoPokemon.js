import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Spinner, Table } from 'react-bootstrap';
import { getPokemonById } from '../services/PokemonService';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Registering the chart components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Pokémon Types to Emoji mapping
const typeEmojis = {
    bug: "🦟",
    dark: "🌑",
    dragon: "🐉",
    electric: "⚡",
    fairy: "🧚‍♀️",
    fighting: "🥊",
    fire: "🔥",
    flying: "🕊️",
    ghost: "👻",
    grass: "🌿",
    ground: "🌍",
    ice: "❄️",
    normal: "⚪",
    poison: "☠️",
    psychic: "🧠",
    rock: "🪨",
    steel: "⚙️",
    water: "💧",
};

function InfoPokemon() {
    const { nou, id } = useParams(); // Get Pokémon ID from URL
    const [pokemon, setPokemon] = useState(null);
    const [moves, setMoves] = useState([]); // To store move details
    const [evolutionChain, setEvolutionChain] = useState(null); // To store evolution chain
    const [locations, setLocations] = useState([]); // To store location encounter details
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

                // Fetch the evolution chain data
                if (parsedData.species && parsedData.species.url) {
                    const speciesResponse = await fetch(parsedData.species.url);
                    const speciesData = await speciesResponse.json();
                    if (speciesData.evolution_chain) {
                        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
                        const evolutionData = await evolutionResponse.json();
                        setEvolutionChain(evolutionData.chain);
                    }
                }

                // Fetch location encounters if they exist
                if (parsedData.location_area_encounters && parsedData.location_area_encounters.length > 0) {
                    const locationDetails = await Promise.all(
                        parsedData.location_area_encounters.map(async (locationId) => {
                            try {
                                const locationURL = "https://hackeps-poke-backend.azurewebsites.net/zones/" + locationId;
                                const response = await fetch(locationURL);
                                const locationData = await response.json();
                                return locationData.name;
                            } catch (err) {
                                console.error("Location fetch error:", err);
                                return { error: "Location details not available" };
                            }
                        })
                    );
                    console.log(locationDetails);
                    setLocations(locationDetails);
                }

            } catch (err) {
                console.error("Error fetching Pokémon information:", err);
                setError(`Error: ${err.message || "Unknown error occurred."}`);
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

    // Helper function to get emoji for type
    const getTypeEmoji = (type) => typeEmojis[type] || '';

    // Helper function to recursively display evolution chain
    const renderEvolutionChain = (evolutionData) => {
        if (!evolutionData) return <p>No evolution data available.</p>;

        let evolutionList = [];
        let currentEvolution = evolutionData;

        while (currentEvolution) {
            const pokemonName = currentEvolution.species.name;
            const pokemonId = currentEvolution.species.url.split('/')[6]; // Extract ID from the URL

            evolutionList.push(
                <span key={pokemonId}>
                    <Link to={`/InfoPokemon/false/${pokemonId}`}>{pokemonName}</Link>{' '}
                    {currentEvolution.evolves_to.length > 0 && '➡️'}
                </span>
            );

            // Move to the next evolution
            currentEvolution = currentEvolution.evolves_to[0];
        }

        return evolutionList;
    };

    // Helper function to render locations
    const renderLocationEncounters = () => {
        if (locations.length === 0) {
            return <p>No location encounters available.</p>;
        }
        
        return locations.map((location, index) => (
            <div key={index}>
                {location ? (
                    <h6>{location}</h6>
                ) : (
                    <h6>Location Name: Unknown</h6>
                )}
                {location.version && location.version.name && (
                    <p>Version: {location.version.name}</p>
                )}
                {location.encounter_method && location.encounter_method.name && (
                    <p>Encounter Method: {location.encounter_method.name}</p>
                )}
            </div>
        ));
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
                            ? pokemon.types.map((item) => item.type.name + ' ' + getTypeEmoji(item.type.name)).join(', ')
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
                    <Button variant="success" onClick={playSound} className="mt-3">
                        Play Sound
                    </Button>

                    <Link to="/llistat">
                        <Button variant="primary" className="mt-3">
                            Back to List
                        </Button>
                    </Link>
                </Card.Body>
            </Card>

            {/* Evolution Chain */}
            {evolutionChain && (
                <Card className="mt-5">
                    <Card.Header as="h5">Evolution</Card.Header>
                    <Card.Body>
                        <p>{renderEvolutionChain(evolutionChain)}</p>
                    </Card.Body>
                </Card>
            )}

            {/* Location Encounters */}
            <Card className="mt-5">
                <Card.Header as="h5">Location Encounters</Card.Header>
                <Card.Body>
                    {renderLocationEncounters()}
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
                                    <td>{move.type} {getTypeEmoji(move.type)}</td>
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