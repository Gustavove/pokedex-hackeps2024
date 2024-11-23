import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

function InfoPokemon() {
    const { id } = useParams(); // Obtener el parámetro dinámico de la URL

    // Datos simulados (en un caso real, obtendrás esta información de una API)
    const items = [
        { id: 1, name: 'Item 1', description: 'Descripción detallada del Item 1', details: 'Más información sobre el Item 1.' },
        { id: 2, name: 'Item 2', description: 'Descripción detallada del Item 2', details: 'Más información sobre el Item 2.' },
        { id: 3, name: 'Item 3', description: 'Descripción detallada del Item 3', details: 'Más información sobre el Item 3.' },
    ];

    // Buscar el elemento correspondiente al ID
    const item = items.find((item) => item.id === parseInt(id, 10));

    // Si el item no existe, mostrar un mensaje de error
    if (!item) {
        return (
            <Container className="text-center py-5">
                <h1>Item no encontrado</h1>
                <Link to="/">
                    <Button variant="secondary">Volver al listado</Button>
                </Link>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <Card>
                <Card.Header as="h5">Detalles de {item.name}</Card.Header>
                <Card.Body>
                    <Card.Title>{item.description}</Card.Title>
                    <Card.Text>{item.details}</Card.Text>
                    <Link to="/">
                        <Button variant="primary">Volver al listado</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default InfoPokemon;