import React, {Fragment} from "react";
import { Link } from 'react-router-dom';

import '../styles/Navbar.css'
import logo from '../assets/images/logo.svg'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1>
          <Link to="/">Count of money</Link>
        </h1>
      </div>
      <ul>
        <Fragment>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </Fragment>
      </ul>
    </nav>
  )
}

export default Navbar