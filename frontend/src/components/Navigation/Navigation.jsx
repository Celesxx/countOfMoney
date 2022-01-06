import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import DropdownComponent from "./DropdownComponent";
import { Link } from "react-router-dom";
import API from '../../api';

const Navigation = () => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        const getUser = async () => {
            const user = await API.currentUser()
            setCurrentUser(user);
            console.log(user)
        };

        getUser()
    }, [])

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    CountOfMoney
                </Navbar.Brand>
                <Nav variant="pills" defaultActiveKey={"/"}>
                    <Nav.Item>
                        <Nav.Link as={Link} className={"mx-2"} to="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} className={"mx-2"} to="/coins">Cryptocurrencies</Nav.Link>
                    </Nav.Item>
                </Nav>

                {!currentUser &&
                    <Nav className={"flex-row"}>
                        <Nav.Item>
                            <Nav.Link as={Link} className={"mx-2"} to="/login">Log in</Nav.Link>
                        </Nav.Item>
                    </Nav>
                }
                {currentUser &&
                    < Nav className={"flex-row"}>
                        <DropdownComponent
                            title={currentUser.username}
                            itemList={[{ name: 'Profile', link: "/profile" }, { name: 'Settings', link: "/settings" }, { name: 'Logout', link: "/logout" }]} />
                    </Nav>
                }
            </Container>
        </Navbar >
    );
};

export default Navigation;
