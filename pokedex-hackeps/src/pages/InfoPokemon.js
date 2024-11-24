import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { getPokemonById } from '../services/PokemonService'; // Asegúrate de que la ruta a pokemonService sea correcta

function InfoPokemon() {
    const { nou, id } = useParams(); // Obtén el ID del Pokémon desde la URL
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect para obtener datos cuando el componente se monta o cambia el ID
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                setError(null); // Resetea el estado de error al iniciar la carga
                const data = await getPokemonById(id); // Obtén los datos del Pokémon por ID
                
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

    // Si está cargando, muestra un spinner
    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading...</p>
            </Container>
        );
    }

    // Si hay un error, muestra el mensaje de error
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

    // Si no hay datos de Pokémon después de la carga, muestra "Pokémon no encontrado"
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

    // Solo muestra la información del Pokémon si los datos son válidos
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
                    <Link to="/llistat">
                        <Button variant="primary" className="mt-3">Back to List</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default InfoPokemon;