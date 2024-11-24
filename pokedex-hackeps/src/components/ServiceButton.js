import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { capturaPokemon } from "../Services/PokemonService";
import './ServiceButton.css'

const ServiceButton = ({ qrData }) => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false); // Estado para el popup
    const [modalMessage, setModalMessage] = useState(""); // Mensaje del popup
    const navigate = useNavigate(); // Para redirigir a otra ruta

    const handleClick = async () => {
        if (qrData) {
            setLoading(true);
            try {
                const response = await capturaPokemon(qrData, "28620274-0860-416a-baee-4ae42f8623fd");

                if (response.detail) {
                    setModalMessage("A Pokémon cannot be obtained at this moment...");
                    setShowModal(true);
                    return;
                }

                const capturedPokemon = response.captured_pokemon_uuid;
                const firstPokemon = response.pokemon_uuid_list[0]?.pokemon_id;

                if (capturedPokemon && firstPokemon) {
                    navigate(`/infoPokemon/true/${firstPokemon}`);
                } else {
                    setModalMessage("The response does not contain enough information");
                    setShowModal(true);
                }
            } catch (error) {
                console.error("Error al llamar al servicio:", error);
                setModalMessage("An unexpected error occured");
                setShowModal(true);
            } finally {
                setLoading(false);
            }
        } else {
            alert("You must obtain the ID of your zone");
        }
    };

    return (
        <>
            <Row className="mt-3">
                <Col xs={6} md={4} className="mx-auto">
                    <Button
                        onClick={handleClick}
                        disabled={loading || !qrData}
                        variant="danger"
                        className="w-100"
                    >
                        {loading ? "Loading..." : "Capture"}
                    </Button>
                </Col>
            </Row>

            {/* Modal para mostrar mensajes */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ServiceButton;