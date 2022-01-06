import { useState, useEffect } from 'react';
import {Container} from "react-bootstrap";
import CryptoListHome from "../components/Cryptos/CryptoList.Home";
import API from '../api'

const Home = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await API.currentUser();
            setCurrentUser(user);
            setLoading(false);
        }

        fetchUser()
    }, [])


    return (
        <Container className={"py-4"}>
            { loading ? "Loading ..." :
                <>
                    <div>
                        <h2 className={"mt-2"}> Cryptocurrencies by market cap </h2>
                        <CryptoListHome />
                    </div>
                </>

            }

        </Container>
    );
};

export default Home;
