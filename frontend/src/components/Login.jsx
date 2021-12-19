import Modal from 'react-modal';
import React from 'react';
import axios from 'axios';
import '../styles/Login.css';
import times from '../assets/images/times-solid.svg'
import coingecko from '../assets/images/coingecko.png'
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


function LoginModal(props) {
    const [error, setError] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    const openModal = () => {
        props.setLoginIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setError("")
        props.setLoginIsOpen(false);
    }

    function login(event) {
        event.preventDefault();

        if (email && password) {
            axios.post('http://localhost:4000/login/', {
                email: email,
                password: password
            })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    closeModal()
                }).catch(error => {
                    setError("Bad login / password");
                    console.log(error)
                })
        }
    }

    function goRegister(e) {
        props.setLoginIsOpen(false)
        props.setRegisterIsOpen(true)
    }

    return (
        <div>
            <button onClick={openModal}>Log in</button>
            <Modal
                isOpen={props.modalLoginIsOpen}
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
                        <button onClick={e => login(e)} className="login-button">Log in</button>
                    </form>
                    <p class="error">{error && error}</p>
                    <a onClick={e => goRegister(e)} className="account-creation" href="#">Create an account</a>
                </div>
            </Modal>
        </div>
    );
}

export default LoginModal