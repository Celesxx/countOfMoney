import Modal from 'react-modal';
import React from 'react';
import axios from 'axios';
import times from '../assets/images/times-solid.svg'
import coingecko from '../assets/images/coingecko.png'
import '../styles/Register.css';
import { useHistory } from 'react-router-dom';


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
    const history = useHistory()
    const [isOpen, setIsOpen] = React.useState(true);
    const [error, setError] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    function closeModal() {
        setError("")
        setIsOpen(false);
        history.push("/")
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
                    console.log("response.data.token = ", response.data.token)
                    localStorage.setItem('token', response.data.token);

                    closeModal()
                }).catch(error => {
                    // setError("Bad login / password");
                    console.log(error)
                })
        }
    }
return (
        <Modal
            ariaHideApp={false}
            isOpen={props.modalRegisterIsOpen}
            onRequestClose={closeModal}
            style={modalStyle}
            contentLabel="Register modal"
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
                <a onClick={() => history.push("/login")} className="account-creation" href="#">Log in</a>
            </div>
        </Modal>
    );
}

export default RegisterModal;