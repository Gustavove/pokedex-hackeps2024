import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNavbar = () => {
    return (
        <Navbar bg="light" className="py-3 shadow-sm">
            <Container className="d-flex justify-content-center">
                <Nav className="d-flex justify-content-around w-50">
                    <Nav.Link as={Link} to="/captura" className="text-center">
                        <div className="d-flex flex-column align-items-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/287/287221.png"
                                alt="Captura"
                                style={{ width: "30px", height: "24px" }}
                            />
                            <span style={{ fontSize: "0.9rem" }}>Capture</span>
                        </div>
                    </Nav.Link>

                    <Nav.Link as={Link} to="/llistat" className="text-center">
                        <div className="d-flex flex-column align-items-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/188/188987.png"
                                alt="Pokémons"
                                style={{ width: "30px", height: "24px" }}
                            />
                            <span style={{ fontSize: "0.9rem" }}>Pokémons</span>
                        </div>
                    </Nav.Link>

                    <Nav.Link as={Link} to="/equips" className="text-center">
                        <div className="d-flex flex-column align-items-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                                alt="Teams"
                                style={{ width: "30px", height: "24px" }}
                            />
                            <span style={{ fontSize: "0.9rem" }}>Teams</span>
                        </div>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;