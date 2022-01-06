import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import API from '../../api';

const Logout = () => {

    const history = useHistory();

    const logout = async () => {
        localStorage.clear()
        const user = await API.logout();
        history.push('/')
        history.go(0)
    };

    return (
        logout()
    );
};

export default Logout;