import logo from './logo.svg';
import './App.css';
import Modal from 'react-modal';
import React from 'react';
import axios from 'axios';
import coingecko from './coingecko.png';
import times from './times-solid.svg';
import './Modal.css';

// import { Button } from 'react-bootstrap';


const modalStyle = {
    content: {
        minWidth: '300px',
        minHeight: '450px',
        width: '30%',
        height: '60%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden'
    },
};


function LoginModal() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function register(event) {
        event.preventDefault();
        console.log("email = ", email)
        console.log("username = ", email)

        console.log("password = ", password)

        axios.post('localhost:4000/users/register/', {
            withCredentials: true,
            data: {
                email: email,
                username: email,
                password: password
            }
        })
            .then(user => {
                console.log("user = ", user)
            })
    }

    return (
        <div>
            <button onClick={openModal}>Log in</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={modalStyle}
                contentLabel="Log in modal"
            >
                <img onClick={closeModal} src={times} className="close" alt="close" />
                <img src={coingecko} alt="Coingecko" className="coingecko-logo" />
                {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                <div className="login-box">
                    <form>
                        {/* <div className="text-align-center">Email</div> */}
                        <label>Email
                            <input onChange={e => setEmail(e.target.value)} className="login-input"></input>
                        </label>
                        <label>Password
                            <input onChange={e => setPassword(e.target.value)} type="password" className="login-input"></input>
                        </label>
                        {/* <div className="text-align-center">Password</div> */}
                        {/* <input /> */}
                        <button onClick={e => register(e)} className="login-button">Log in</button>
                    </form>
                    <a className="account-creation" href="#">Create an account</a>
                </div>
            </Modal>
        </div>
    );
}

export default LoginModal;
