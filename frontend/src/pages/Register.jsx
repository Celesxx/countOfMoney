import React from 'react';
import { Container, Card, Form, Button, Row, FloatingLabel, InputGroup } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import API from '../api';

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const history = useHistory();

    const submit = async () => {
        console.log({ username, email, password })
        const user = await API.register({ username, email, password });
        history.push("/")
        history.go(0)
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleSubmit = (event) => {
        let check_valid = true;
        event.preventDefault();
        const form = event.currentTarget;
        if (password != confirmPassword || password === '' || confirmPassword === ''
            || password.length < 5 || username === '' || !validateEmail(email)) {
            check_valid = false;
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (check_valid === true)
            submit();
    };

    return (
        <Container className={"py-4"}>
            <Row className="justify-content-md-center">
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title>Register</Card.Title>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Username"
                                    className="mb-3"
                                >
                                    <Form.Control required type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                                    <Form.Control.Feedback>
                                        the username looks good !
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email address"
                                    className="mb-3"
                                >
                                    <Form.Control required type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                    <Form.Control.Feedback>
                                        the email looks good !
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Password"
                                    className="mb-3"
                                >
                                    <Form.Control required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide the password !
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Confirm Password"
                                    className="mb-3"
                                >
                                    <Form.Control required type="password" placeholder="Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide the same password !
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>

                            <Row className="center">
                                <Button variant="primary" type="submit">
                                    Create an account
                                </Button>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default Register;