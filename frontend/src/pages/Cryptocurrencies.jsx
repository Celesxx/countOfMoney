import {useState, useEffect} from 'react';
import {Container} from "react-bootstrap";
import CryptoList from "../components/Cryptos/CryptoList";
import AddNewCrypto from "../components/Cryptos/AddNewCrypto";
import API from '../api'

const CryptoCurrencies = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async() => {
            const user = await API.currentUser();
            setUser(user);
        }

        fetchUser();
    }, []);

    return (
        <Container className={"py-4"}>
            <div className={"d-flex flex-row align-items-center"}>
                <h1 className={"me-3"}>Cryptocurrencies by market cap</h1>

                { user && user.role === "admin" ? <AddNewCrypto /> : <></>}
            </div>
            <CryptoList />
        </Container>
    );
};

export default CryptoCurrencies;
