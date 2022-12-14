import React, { useState, useContext } from "react"
import { UserContext } from "../context/userContext"
import { Container, Row, Col, Stack, Image, Form, Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { API } from "../config/api"

import WaysHub from "../img/WaysHub.png"

function SignInPage() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const [ state, dispatch ] = useContext(UserContext)
    console.log("Sign In State", state)

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            const body = JSON.stringify(form);

            const response = await API.post('/login', body, config);

            if (response?.status === 200) {

                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <>
            <Container className="p-3" style={{ marginTop: '14vh', height: '100vh' }}>
                <Row>
                    <Col className="d-flex flex-column justify-content-center">
                        <Stack direction="vertical" className="d-flex flex-column justify-content-center">
                            <Image className="w-75" src={WaysHub} />
                            <Card.Text className="text-white fs-5 fw-light w-75" >Join now, share your creations with another people and enjoy other creations</Card.Text>
                            <Button onClick={() => navigate("/SignUpPage")} variant="primary" type="submit" style={{ backgroundColor: '#FF7A00', border: 'none', width: '30%' }} className="mt-5 py-2 fw-bold fs-5 text-white">
                                Sign Up
                            </Button>
                        </Stack>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center">
                        <Container className="rounded-4 p-5" style={{ backgroundColor: '#161616' }} >
                            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                                <Form.Label className="fs-1 mb-3 fw-bold text-white">Sign In</Form.Label>
                                
                                <Form.Group controlId="formEmail">
                                    <Form.Control
                                        className="mb-3 py-2 fs-5"
                                        style={{ borderColor: '#BCBCBC', borderWidth: '3px', backgroundColor: '#555555', color: 'rgb(210,210,210,0.25)' }}
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                        placeholder="Email" />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formPassword">
                                    <Form.Control 
                                    className="py-2 fs-5" 
                                    style={{ borderColor: '#BCBCBC', borderWidth: '3px', backgroundColor: '#555555', color: 'rgb(210,210,210,0.25)' }} 
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange} 
                                    placeholder="Password" />
                                </Form.Group>

                                <Button variant="primary" type="submit" style={{ backgroundColor: '#FF7A00', border: 'none' }} className="py-2 fw-bold fs-5 w-100 text-white">
                                    Sign In
                                </Button>

                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SignInPage