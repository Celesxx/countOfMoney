import {useState, useEffect} from 'react';
import TableComponent from "../UI/TableComponent";
import API from '../../api/';
import {Spinner} from "react-bootstrap";

const CryptoListUser = ({ keywords }) => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function getCryptos(keywords) {
            console.log("keywords = ", keywords)
            const cryptos = await API.getCryptos(keywords);
            setCryptos(cryptos);
            setLoading(false);
            console.log(cryptos)
        }

        getCryptos(keywords);

    }, [])

    const columns = [
        "#",
        "Coin",
        "Price",
        "1h",
        "24h",
        "7d",
        "Total Volume",
        "Market Cap"
    ]


    return (
        <div className={"mt-4"}>
            {/* { loading ? (<Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>) : <TableComponent columns={columns} coinList={cryptos.slice(0,10)}/>} */}
        </div>
    );
};

export default CryptoListUser;
