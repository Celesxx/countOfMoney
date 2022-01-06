import React from 'react';
import { Container, Card, Form, Button, Row, FloatingLabel, Image, Col, Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import API from '../api';

const Settings = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const [showUsername, setShowUsername] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const handleCloseUsername = () => setShowUsername(false);
    const handleShowUsername = () => setShowUsername(true);
    const handleCloseEmail = () => setShowEmail(false);
    const handleShowEmail = () => setShowEmail(true);
    const handleClosePassword = () => setShowPassword(false);
    const handleShowPassword = () => setShowPassword(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const history = useHistory();

    useEffect(() => {

        const getUser = async () => {
            const user = await API.currentUser()
            setCurrentUser(user);
            setUsername(user.username);
            setEmail(user.email);
            setPassword(user.password);
            console.log(user)
        };

        getUser()
    }, [])

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const submitNewUsername = async () => {
        const user = await API.currentUserUpdate({ username: newUsername, email: email, password: password });
        console.log(user)
        history.push("/settings")
        history.go(0)
    }

    const submitNewEmail = async () => {
        const user = await API.currentUserUpdate({ username: username, email: newEmail, password: password });
        console.log(user)
        history.push("/settings")
        history.go(0)
    }

    const submitNewPassword = async () => {
        const user = await API.currentUserUpdate({ username: username, email: email, password: newPassword });
        console.log(user)
        history.push("/settings")
        history.go(0)
    }

    const handleSubmitNewUsername = (event) => {
        let check_valid = true;
        event.preventDefault();
        const form = event.currentTarget;
        if (newUsername === '') {
            check_valid = false;
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (check_valid === true) {
            handleCloseUsername();
            setValidated(false);
            submitNewUsername();
        }
    };

    const handleSubmitNewEmail = (event) => {
        let check_valid = true;
        event.preventDefault();
        const form = event.currentTarget;
        if (!validateEmail(newEmail)) {
            check_valid = false;
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (check_valid === true) {
            handleCloseEmail();
            setValidated(false);
            submitNewEmail();
        }
    };

    const handleSubmitNewPassword = (event) => {
        let check_valid = true;
        event.preventDefault();
        const form = event.currentTarget;
        if (newPassword != confirmPassword || newPassword === '' || confirmPassword === ''
            || newPassword.length < 5) {
            check_valid = false;
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (check_valid === true) {
            handleClosePassword();
            setValidated(false);
            submitNewPassword();
        }
    };

    return (
        <Container className={"py-4"}>
            <Row className="justify-content-md-center">
                {
                    !currentUser &&
                    <Card.Body>
                        <Card.Title>Current User</Card.Title>
                    </Card.Body>
                }
                {
                    currentUser &&
                    <Card style={{ width: '40rem', height: '40rem' }}>
                        <Card.Body>
                            <Row className="justify-content-md-center">
                                <Col xs={2} md={2}>
                                    <Card.Title>Settings</Card.Title>
                                    <Image src="http://cdn.onlinewebfonts.com/svg/img_24787.png" fluid />
                                </Col>
                            </Row>
                            <Container className={"mt-5"}>
                                <Row className="justify-content-md-center">
                                    <Col xs={2} md={3}>
                                        <Card.Title>Username :</Card.Title>
                                        <Card.Title>Email :</Card.Title>
                                        <Card.Title>Password :</Card.Title>
                                    </Col>
                                    <Col>
                                        <Card.Text>{currentUser.username}</Card.Text>
                                        <Card.Text>{currentUser.email}</Card.Text>
                                        <Card.Text>******</Card.Text>
                                    </Col>
                                    <Col>
                                        <Col className={"mb-1"}>
                                            <Button variant="primary" size="sm" onClick={handleShowUsername}>
                                                Modify
                                            </Button>
                                        </Col>
                                        <Col className={"mb-1"}>
                                            <Button variant="primary" size="sm" onClick={handleShowEmail}>
                                                Modify
                                            </Button>
                                        </Col>
                                        <Col className={"mb-1"}>
                                            <Button variant="primary" size="sm" onClick={handleShowPassword}>
                                                Modify
                                            </Button>
                                        </Col>
                                    </Col>
                                </Row>
                            </Container>
                            <Modal show={showUsername} onHide={handleCloseUsername}>
                                <Form noValidate validated={validated} onSubmit={handleSubmitNewUsername}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Change your username</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group className="mb-3" controlId="formBasicUsername">
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="New Username"
                                                className="mb-3"
                                            >
                                                <Form.Control type="text" placeholder="Username" onChange={(e) => setNewUsername(e.target.value)} />
                                                <Form.Control.Feedback>
                                                    the username looks good !
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseUsername}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                            <Modal show={showEmail} onHide={handleCloseEmail}>
                                <Form noValidate validated={validated} onSubmit={handleSubmitNewEmail}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Change your email</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group className="mb-3" controlId="formBasicUsername">
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="New Email"
                                                className="mb-3"
                                            >
                                                <Form.Control type="text" placeholder="Email" onChange={(e) => setNewEmail(e.target.value)} />
                                                <Form.Control.Feedback>
                                                    the email looks good !
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseEmail}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                            <Modal show={showPassword} onHide={handleClosePassword}>
                                <Form noValidate validated={validated} onSubmit={handleSubmitNewPassword}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Change your password</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="New Password"
                                                className="mb-3"
                                            >
                                                <Form.Control type="password" placeholder="Password" onChange={(e) => setNewPassword(e.target.value)} />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide the password !
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Confirm New Password"
                                                className="mb-3"
                                            >
                                                <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide the same password !
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClosePassword}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                        </Card.Body>
                    </Card>
                }
            </Row>
        </Container >
    );
};

export default Settings;