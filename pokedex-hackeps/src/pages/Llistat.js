import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllPokemons } from '../Services/PokemonService';
import { capturaPokemon } from '../Services/PokemonService';

const Llistat = () => {
    const items = [
        { id: 1, name: 'Item 1', description: 'Descripción breve del Item 1' },
        { id: 2, name: 'Item 2', description: 'Descripción breve del Item 2' },
        { id: 3, name: 'Item 3', description: 'Descripción breve del Item 3' },
    ];

    const handleButtonClick = () => {
        getAllPokemons().then((pokemons) => {
            console.log(pokemons.json());
        });
    };

    const handleButtonClick2 = () => { // he posat una zona d'exemple
        capturaPokemon("67372c61f269e28d2f86f063", "28620274-0860-416a-baee-4ae42f8623fd").then((pokemons) => {
            console.log(pokemons);
        });
    };

    return (
        <Container className="py-5">
            <h1 className="text-center mb-4">Listado de Elementos</h1>
            <Row className="g-4">
                {items.map((item) => (
                    <Col key={item.id} xs={12} md={6} lg={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                <Link to={`/item/${item.id}`}>
                                    <Button variant="primary">Ver Detalles</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="text-center mt-4">
            <Button variant="secondary" onClick={handleButtonClick}>Nuevo Botón</Button>
            <Button variant="secondary" onClick={handleButtonClick2}>Nuevo Botón</Button>
            </div>
        </Container>
    );
}

export default Llistat;