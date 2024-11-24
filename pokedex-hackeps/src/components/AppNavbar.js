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
                                src="/capture.png"
                                alt="Captura"
                                style={{ width: "30px", height: "30px" }}
                            />
                            <span style={{ fontSize: "1.2rem" }}>Capture</span>
                        </div>
                    </Nav.Link>

                    <Nav.Link as={Link} to="/llistat" className="text-center">
                        <div className="d-flex flex-column align-items-center">
                            <img
                                src="/pokemon-list.png"
                                alt="Pokémons"
                                style={{ width: "30px", height: "30px" }}
                            />
                            <span style={{ fontSize: "1.2rem" }}>Pokémons</span>
                        </div>
                    </Nav.Link>

                    <Nav.Link as={Link} to="/zones" className="text-center">
                        <div className="d-flex flex-column align-items-center">
                            <img
                                src="/location-pin.png"
                                alt="Zones"
                                style={{ width: "30px", height: "30px" }}
                            />
                            <span style={{ fontSize: "1.2rem" }}>Zones</span>
                        </div>
                    </Nav.Link>

                    <Nav.Link as={Link} to="/equips" className="text-center">
                        <div className="d-flex flex-column align-items-center">
                            <img
                                src="/group.png"
                                alt="Teams"
                                style={{ width: "30px", height: "30px" }}
                            />
                            <span style={{ fontSize: "1.2rem" }}>Teams</span>
                        </div>
                    </Nav.Link>

                    <Nav.Link as={Link} to="/tournaments" className="text-center">
                        <div className="d-flex flex-column align-items-center">
                            <img
                                src="/tournement.png"
                                alt="tournaments"
                                style={{ width: "30px", height: "30px" }}
                            />
                            <span style={{ fontSize: "1.2rem" }}>Tournaments</span>
                        </div>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;