import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllTeams } from '../services/TeamService'; // Asegúrate de que la ruta a pokemonService sea correcta


function Equips() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state before fetching
                const data = await getAllTeams();
                const orderedData = data.sort((a, b) => b.captured_pokemons.length - a.captured_pokemons.length);
                console.log("Fetched data:", orderedData);
                setItems(orderedData);
                
            } catch (error) {
                setError('Failed to load teams.');
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    if (loading) {
        return (
            <Container className="text-center py-5">
                <p>Loading...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center py-5">
                <p>{error}</p>
            </Container>
        );
    }
    

    return (
        <Container className="py-5">
            <h1 className="text-center mb-4">Rànking de captures</h1>
            <Row className="g-4">
                {items.map((item, i) => (
                    <Col key={i+1} xs={12} md={6} lg={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{"Posició " + (i + 1) + ": " + item.name}</Card.Title>
                                <Card.Text>{item.captured_pokemons.length + " pokemons atrapats."}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Equips;