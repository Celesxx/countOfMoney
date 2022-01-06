import React from 'react';
import {NavDropdown} from "react-bootstrap";

const DropdownComponent = ({ title, itemList}) => {
    return (
        <NavDropdown align={"end"} title={title} menuVariant={"dark"}>
            {itemList.map((element) => <NavDropdown.Item href={element.link}>{element.name}</NavDropdown.Item>)}
        </NavDropdown>
    );
};

export default DropdownComponent;
