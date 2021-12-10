import logo from './logo.svg';
import './App.css';
import Modal from 'react-modal';
import React from 'react';
import axios from 'axios';
import coingecko from './coingecko.png';
import times from './times-solid.svg';
import './Modal.css';
import LoginModal from './LoginModal.js';
import RegisterModal from './RegisterModal.js';


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


function AuthentificationModal() {
    const [modalLoginIsOpen, setLoginIsOpen] = React.useState(false);
    const [modalRegisterIsOpen, setRegisterIsOpen] = React.useState(true);

    return (
        <div>
            {setLoginIsOpen && (
                <LoginModal setLoginIsOpen={setLoginIsOpen} modalLoginIsOpen={modalLoginIsOpen} setRegisterIsOpen={setRegisterIsOpen} />
            )}

            {setRegisterIsOpen && (
                <RegisterModal setRegisterIsOpen={setRegisterIsOpen} modalRegisterIsOpen={modalRegisterIsOpen} setLoginIsOpen={setLoginIsOpen} />
            )}


        </div>
    );
}

export default AuthentificationModal;
