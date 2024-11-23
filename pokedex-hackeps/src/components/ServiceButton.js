import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";

const ServiceButton = ({ qrData }) => {
    const [loading, setLoading] = useState(false); // Estado para saber si el servicio se está llamando
    const [serviceResponse, setServiceResponse] = useState(null); // Guardar la respuesta del servicio

    const handleClick = async () => {
        if (qrData) {
            setLoading(true);
            try {
                //const response = await fetchQRCodeData(qrData); // Llamar al servicio
                const response = null;
                setServiceResponse(response); // Guardar los datos recibidos
            } catch (error) {
                console.error("Error al llamar al servicio:", error);
            } finally {
                setLoading(false); // Desactivar carga
            }
        } else {
            alert("Por favor, escanee un código QR primero.");
        }
    };

    return (
        <Row className="mt-3">
            <Col>
                <Button
                    onClick={handleClick}
                    disabled={loading || !qrData}
                    variant="primary"
                    className="w-100"
                >
                    {loading ? "Cargando..." : "Llamar al Servicio"}
                </Button>
            </Col>
            {serviceResponse && (
                <Col>
                    <h4>Datos del Servicio:</h4>
                    <pre>{JSON.stringify(serviceResponse, null, 2)}</pre>
                </Col>
            )}
        </Row>
    );
};

export default ServiceButton;