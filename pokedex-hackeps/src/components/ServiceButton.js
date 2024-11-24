import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";

const ServiceButton = ({ qrData }) => {
    const [loading, setLoading] = useState(false);
    const [serviceResponse, setServiceResponse] = useState(null);
    const [hasChanged, setHasChanged] = useState(false); // Estado para cambios recientes

    useEffect(() => {
        if (qrData) {
            // Activa el estado "cambio detectado"
            setHasChanged(true);

            // Resetea el estado después de 2 segundos
            const timer = setTimeout(() => setHasChanged(false), 2000);
            return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
        }
    }, [qrData]); // Ejecuta esto cuando qrData cambie

    const handleClick = async () => {
        if (qrData) {
            setLoading(true);
            try {
                const response = {
                    team_id: "28620274-0860-416a-baee-4ae42f8623fd",
                    captured_pokemon_uuid: "929a6923-8cbe-4a38-b841-3436c1ac662f",
                    pokemon_uuid_list: [
                        { id: "db887c41-8a56-4eee-96ed-62bf0a3c3310", pokemon_id: 152 },
                        { id: "29afc5ef-223a-4f6c-9a3f-e7ce7ec7096d", pokemon_id: 130 },
                        { id: "a2c0977d-503d-451c-b4f7-a974d44defd2", pokemon_id: 112 },
                        { id: "ba30dfb9-c796-4dd7-a7cd-54d0ab6cff56", pokemon_id: 89 },
                        { id: "712060bf-148b-4499-ad4f-e906169619e2", pokemon_id: 58 },
                        { id: "7e507264-218e-47a6-a4f5-01ef531fb68b", pokemon_id: 25 },
                        { id: "61b629c7-7830-4f6a-94ab-7113011ca4d5", pokemon_id: 149 },
                    ],
                };
                console.log(response);
                setServiceResponse(response);
            } catch (error) {
                console.error("Error al llamar al servicio:", error);
            } finally {
                setLoading(false);
            }
        } else {
            alert("Es necesario obtener el ID de la zona");
        }
    };

    return (
        <Row className="mt-3">
            <Col>
                <Button
                    onClick={handleClick}
                    disabled={loading || !qrData}
                    variant={hasChanged ? "success" : "primary"} // Cambia el color del botón
                    className="w-100"
                >
                    {loading ? "Cargando..." : "Capturar"}
                </Button>
            </Col>
            {serviceResponse && (
                <Col>
                    <h4>Datos de la última devolución:</h4>
                    <pre>{JSON.stringify(serviceResponse, null, 2)}</pre>
                </Col>
            )}
        </Row>
    );
};

export default ServiceButton;