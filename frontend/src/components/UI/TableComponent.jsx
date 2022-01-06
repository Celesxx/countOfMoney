import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import API from "../../api";

const TableComponent = ({ columns, coinList}) => {

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        async function fetchCurrentUser() {
            const user = await API.currentUser();
            setCurrentUser(user);
        }

        fetchCurrentUser();
    }, [])


    console.log("coins = ", coinList)
    return (
        <Table hover size="sm">
            <thead>
                <tr>
                    {columns.map((column, index) => {
                        return <th key={index}>
                            <div className={"my-2"}> {column} </div>
                        </th>
                    })}
                </tr>
            </thead>
            <tbody>
                {coinList.map((coin, index) => {
                    return (
                        <tr key={index}>

                            <td>
                                <div className={"my-2 "}> {coin.rank} </div>
                            </td>
                            <td>
                                <div className={"my-2"}>
                                    { currentUser ? <Link to={`/coins/${coin.gecko}`}>
                                        <img src={coin.image} alt={coin.gecko} className={"me-3"} style={{width: '10%'}}/>
                                    </Link> : <img src={coin.image} alt={coin.name} className={"me-3"} style={{width: '10%'}}/> }
                                    <span className={"me-3"}>{coin.gecko}</span>
                                </div>
                            </td>
                            <td>
                                <div className={"my-2"}> €{coin.current_price} </div>
                            </td>
                            <td>
                                <div className={"my-2"}> €{coin.total_volume} </div>
                            </td>
                            <td>
                                <div className={"my-2"}> €{coin.market_cap.toLocaleString('en')} </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
};

export default TableComponent;
