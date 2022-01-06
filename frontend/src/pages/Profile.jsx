import React from 'react';
import {Card, Container, Row} from "react-bootstrap";
import API from '../api';
import { useState, useEffect } from 'react';
import Avatar from '../assets/avatar.png';

const Profile = () => {

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
        <Container className={"py-4"}>
            <Row className="justify-content-md-center">
                {
                    !currentUser &&
                    <Card.Body>
                        <Card.Title>
                            You are not logged in. Please <a href="/login">Log in or Register</a>
                        </Card.Title>
                    </Card.Body>
                }
                {
                    currentUser &&
                    <Card.Body>
                      <div class="profile">
                        <h1>Personal Info</h1>
                        <img src={Avatar} alt="" width="150" height="150" align="right"/>
                        <h2>Username</h2>
                        <p>{currentUser.username}</p>
                        <h2>Email Address</h2>
                        <p>{currentUser.email}</p>
                        <h2>Role</h2>
                        <p>{currentUser.role}</p>
                      </div>
                    </Card.Body>
                }
            </Row>
        </Container >
    );
};

export default Profile;
