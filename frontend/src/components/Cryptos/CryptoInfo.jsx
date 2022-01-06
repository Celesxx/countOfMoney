import {useState, useEffect} from 'react';
import {Badge, Card, Container, Row, Tab, Tabs} from "react-bootstrap";
import { useParams } from 'react-router-dom';
import API from '../../api/';
import CryptoLine from "./Charts/CryptoLine";
import moment from 'moment';

const CryptoInfo = () => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true)
    let {cmid} = useParams();

    useEffect(() => {

        async function getCryptoInfo() {
            console.log(cmid);
            const crypto = await API.getCryptoInfo(cmid);
            setCryptos(crypto);
            setLoading(false)
        }

        getCryptoInfo(cmid);

    }, [])

    return (
                <Container className={"py-4"}>
                    { loading ? "Loading ..." :
                        <Row className="justify-content-md-center">
                            {
                                !cryptos &&
                                <Card.Body>
                                    <Card.Title>
                                        No crypto found.
                                    </Card.Title>
                                </Card.Body>
                            }
                            {
                                cryptos &&
                                <Card.Body>
                                    <div className={"d-flex flex-row align-items-center"}>
                                        <img src={cryptos.image} alt={cryptos.name} className={"me-3"} />
                                        <Card.Title className={"me-2"}>
                                            {cryptos.name}
                                        </Card.Title>
                                        <Badge bg={"warning"} className={"me-2"}>
                                            #{cryptos.rank}
                                        </Badge>
                                        <Badge bg="secondary">
                                            {cryptos?.symbol.toUpperCase()}
                                        </Badge>
                                    </div>

                                    <h3 className={"mt-3"}>{cryptos?.market_data?.current_price.eur.toLocaleString('en')} €EUR</h3>

                                    <div>
                                        <h4 className={"mt-5"}>{cryptos.name} ({cryptos.symbol.toUpperCase()}) Price Chart</h4>

                                        <Tabs>
                                            <Tab eventKey="daily" title="Monthly">
                                                <CryptoLine dataName={cryptos.name+" daily"} labels={cryptos?.history?.daily.map(e => moment(e[0]).format("DD-MMM"))} dataArray={cryptos.history.daily.map(e => e[1])}/>
                                            </Tab>
                                            <Tab eventKey="hourly" title="Daily">
                                                <CryptoLine dataName={cryptos.name+" hourly"} labels={cryptos?.history?.hourly.map(e =>  moment(e[0]).format("DD-MMM"))} dataArray={cryptos.history.daily.map(e => e[1])}/>
                                            </Tab>
                                            <Tab eventKey="minutes" title="Hourly">
                                                <CryptoLine dataName={cryptos.name+" monthly"} labels={cryptos?.history?.minutes.map(e =>  moment(e[0]).format("DD-MMM"))} dataArray={cryptos.history.daily.map(e => e[1])}/>
                                            </Tab>
                                        </Tabs>
                                    </div>

                                </Card.Body>
                            }
                        </Row>

                    }

            </Container >
    );
};

export default CryptoInfo;