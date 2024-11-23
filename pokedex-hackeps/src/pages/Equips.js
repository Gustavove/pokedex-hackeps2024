import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Equips() {
    // Datos simulados
    const items = [
        { id: 1, name: 'Item 1', description: 'Descripción breve del Item 1' },
        { id: 2, name: 'Item 2', description: 'Descripción breve del Item 2' },
        { id: 3, name: 'Item 3', description: 'Descripción breve del Item 3' },
    ];

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
        </Container>
    );
}

export default Equips;