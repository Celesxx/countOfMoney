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


function RegisterModal(props) {
    const [error, setError] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");



    function openModal() {
        props.setRegisterIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setError("")
        props.setRegisterIsOpen(false);
    }

    function register(event) {
        event.preventDefault();

        if (email && password) {
            axios.post('http://localhost:4000/users/register/', {
                email: email,
                password: password,
                username: email
            })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    closeModal()
                }).catch(error => {
                    // setError("Bad login / password");
                    console.log(error)
                })
        }
    }

    function goLogin(event) {
        props.setRegisterIsOpen(false)
        props.setLoginIsOpen(true)
    }

    return (
        <div>
            <Modal
                isOpen={props.modalRegisterIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={modalStyle}
                contentLabel="Log in modal"
            >
                <img onClick={closeModal} src={times} className="close" alt="close" />
                <img src={coingecko} alt="Coingecko" className="coingecko-logo" />
                <div className="login-box">
                    <form>
                        <label>Email
                            <input onChange={e => setEmail(e.target.value)} className="login-input"></input>
                        </label>
                        <label>Password
                            <input onChange={e => setPassword(e.target.value)} type="password" className="login-input"></input>
                        </label>
                        <button onClick={e => register(e)} className="register-button">Create my account</button>
                    </form>
                    <p class="error">{error && error}</p>
                    <a onClick={e => goLogin(e)} className="account-creation" href="#">Log in</a>
                </div>
            </Modal>
        </div>
    );
}

export default RegisterModal;
