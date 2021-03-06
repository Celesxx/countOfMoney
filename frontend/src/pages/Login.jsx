import Modal from "react-modal";
import React from "react";
import axios from "axios";
import { useHistory, Router } from "react-router-dom";
// import { Button } from 'react-bootstrap';
import "../styles/Login.css";

const modalStyle = {
  content: {
    minWidth: "300px",
    minHeight: "450px",
    width: "30%",
    height: "60%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
};

function LoginModal(props) {
  const history = useHistory();
  const [isOpen, setIsOpen] = React.useState(true);
  const [error, setError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function closeModal() {
    setError("");
    setIsOpen(false);
    history.push("/");
  }

  function login(event) {
    event.preventDefault();

    if (email && password) {
      axios
        .post("http://localhost:4000/users/login/", {
          email: email,
          password: password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          closeModal();
          history.go(0)
        })
        .catch((error) => {
          setError("Bad login / password");
          console.log(error);
        });
    }
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyle}
      contentLabel="Log in modal"
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
      <div className="login-box">
        <form>
          <label>
            Email
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            ></input>
          </label>
          <label>
            Password
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="login-input"
            ></input>
          </label>
          <button onClick={(e) => login(e)} className="login-button">
            Log in
          </button>
        </form>
        <p class="error">{error && error}</p>
        <a
          onClick={() => history.push("/register")}
          className="account-creation"
          href="#"
        >
          Create an account
        </a>
      </div>
    </Modal>
  );
}
export default LoginModal;