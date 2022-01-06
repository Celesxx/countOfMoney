import {useState, useEffect} from 'react';
import TableComponent from "../UI/TableComponent";
import API from '../../api/';
import {Spinner} from "react-bootstrap";

const CryptoListHome = () => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function getCryptos() {
            const cryptos = await API.getCryptos();
            setCryptos(cryptos);
            setLoading(false);
        }

        getCryptos();

    }, [])

    const columns = [
        "#",
        "Coin",
        "Price",
        "Total Volume",
        "Market Cap"
    ]


    return (
        <div className={"mt-4"}>
            { loading ? (<Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>) : <TableComponent columns={columns} coinList={cryptos.slice(0,10)}/>}
        </div>
    );
};

export default CryptoListHome;
