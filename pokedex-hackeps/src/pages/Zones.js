import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Dropdown, DropdownButton } from "react-bootstrap";
import zones from "../data/zonas.json";
import { capturaPokemonTemps } from "../services/PokemonService";

const zonas = zones;

function Zones() {
    const [timeSettings, setTimeSettings] = useState({}); // Estado para guardar tiempo e intervalo por zona

    const handleSelectTime = (zoneId, time) => {
        const timeNumber = parseInt(time.split(" ")[0], 10);
        setTimeSettings((prev) => ({
            ...prev,
            [zoneId]: { ...prev[zoneId], time: timeNumber },
        }));
    };


    const handleSelectInterval = (zoneId, interval) => {
        const intervalNumber = parseInt(interval.split(" ")[0], 10);
        setTimeSettings((prev) => ({
            ...prev,
            [zoneId]: { ...prev[zoneId], interval: intervalNumber },
        }));
    };

    const handleAutomatizeCapture = async (zoneId) => {
        const settings = timeSettings[zoneId];
        if (!settings?.time || !settings?.interval) {
            alert("Please select the time and interval before automating.");
            return;
        }
        console.log(`Automating capture for zone ${zoneId}\nTime: ${settings.time}\nInterval: ${settings.interval}`);
        try {
            // Ahora estamos pasando el intervalo como número
            const data = capturaPokemonTemps([zoneId], "28620274-0860-416a-baee-4ae42f8623fd", settings.interval, settings.time);
            console.log(`Automating capture for zone ${zoneId}\nTime: ${settings.time}\nInterval: ${settings.interval}`);
        } catch (error) {
            console.error("Error automating Pokémon zone", error);
        }
        alert(`Automating capture for zone ${zoneId}\nTime: ${settings.time}\nInterval: ${settings.interval}`);
    };

    return (
        <Container>
            <h1 className="text-center my-4">Zone Automatization</h1>
            <Row>
                {zonas.map((zona) => (
                    <Col md={4} sm={6} key={zona.id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Zone ID: {zona.id}</Card.Title>
                                <Card.Text>UUID: {zona.uuid}</Card.Text>

                                <DropdownButton
                                    id={`dropdown-time-${zona.id}`}
                                    title={timeSettings[zona.id]?.time || "Choose time"}
                                    className="mb-2"
                                >
                                    <Dropdown.Item onClick={() => handleSelectTime(zona.id, "1 hour")}>
                                        1 hour
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSelectTime(zona.id, "5 hours")}>
                                        5 hours
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSelectTime(zona.id, "10 hours")}>
                                        10 hours
                                    </Dropdown.Item>
                                </DropdownButton>

                                <DropdownButton
                                    id={`dropdown-interval-${zona.id}`}
                                    title={timeSettings[zona.id]?.interval || "Choose interval"}
                                    className="mb-2"
                                >
                                    <Dropdown.Item onClick={() => handleSelectInterval(zona.id, "10 minutes")}>
                                        10 minutes
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSelectInterval(zona.id, "20 minutes")}>
                                        20 minutes
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSelectInterval(zona.id, "30 minutes")}>
                                        30 minutes
                                    </Dropdown.Item>
                                </DropdownButton>

                                <Button
                                    variant="primary"
                                    onClick={() => handleAutomatizeCapture(zona.id)}
                                    className="w-100"
                                >
                                    Automate capture
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Zones;