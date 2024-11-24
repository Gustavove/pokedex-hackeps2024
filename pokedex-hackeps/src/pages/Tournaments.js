import React from "react";
import { Container, Table, Accordion, Button, Form } from "react-bootstrap";

const Tournaments = ({ data }) => {
    if (!data) {
        return <p>No data available</p>;
    }

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Tournament Details</h1>

            <h3>
                Tournament ID: <strong>{data.id || "Unknown"}</strong>
            </h3>
            <p>
                <strong>Date:</strong>{" "}
                {data.time ? new Date(data.time).toLocaleString() : "Unknown"}
            </p>
            <p>
                <strong>Winner:</strong> {data.winner || "No winner yet"}
            </p>

            <h4 className="mt-4">Teams</h4>
            <Accordion defaultActiveKey="0">
                {data.teams && data.teams.length > 0 ? (
                    data.teams.map((team, idx) => (
                        <Accordion.Item eventKey={idx} key={team.team_id}>
                            <Accordion.Header>{team.team_id}</Accordion.Header>
                            <Accordion.Body>
                                <h5>Pokémon List</h5>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Pokémon UUID</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {team.pokemon_uuid_list &&
                                        team.pokemon_uuid_list.map((uuid, i) => (
                                            <tr key={uuid}>
                                                <td>{i + 1}</td>
                                                <td>{uuid}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                {data.can_register && (
                                    <>
                                        <Button
                                            variant="success"
                                            className="mt-3"
                                            onClick={() =>
                                                document
                                                    .getElementById(`register-form-${idx}`)
                                                    .classList.toggle("d-none")
                                            }
                                        >
                                            Participate
                                        </Button>
                                        <Form
                                            id={`register-form-${idx}`}
                                            className="mt-3 d-none"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const input = e.target.elements.pokemonIds.value;
                                                console.log(`Team ${team.team_id} registered with:`, input);
                                            }}
                                        >
                                            <Form.Group>
                                                <Form.Label>
                                                    Enter Pokémon UUIDs (comma-separated):
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="pokemonIds"
                                                    placeholder="e.g., uuid1, uuid2, uuid3"
                                                />
                                            </Form.Group>
                                            <Button type="submit" variant="primary" className="mt-2">
                                                Submit
                                            </Button>
                                        </Form>
                                    </>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                ) : (
                    <p>No teams available</p>
                )}
            </Accordion>
        </Container>
    );
};

Tournaments.defaultProps = {
    data: {
        id: "Unknown",
        time: null,
        can_register: false,
        winner: "None",
        teams: [],
        teams_positions: [],
        tournament_combats: []
    }
};

export default Tournaments;