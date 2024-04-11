import React from "react";
import Nav from "react-bootstrap/Nav";


const DropDownList = () =>{
    return <div className="Dropdown-container">
        <ul className="Dropdown-list">
            <li> 
                <Nav.Link href="/logout" > Log out</Nav.Link>
            </li>
        </ul>
    </div>
}

export default DropDownList