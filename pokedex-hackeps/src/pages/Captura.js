
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import QRScanner from '../components/QRScanner';
import ServiceButton from '../components/ServiceButton';
import 'bootstrap/dist/css/bootstrap.min.css';


const Captura = () => {
    const [qrData, setQrData] = useState(""); // Guardar el resultado del QR escaneado

    // Maneja el resultado del escaneo y lo guarda en el estado
    const handleScanResult = (result) => {
        console.log(qrData)
        setQrData(result);
    };

    return (
        <Container className="my-4">
            <h1 className="text-center">📍 Zone Scanner</h1>
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Header>
                        Scan the QR of your zone here :)
                        </Card.Header>
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <QRScanner onScanResult={handleScanResult} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <ServiceButton qrData={qrData} />
                </Col>
            </Row>

        </Container>
    );
};

export default Captura;