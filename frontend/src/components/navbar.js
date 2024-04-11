import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactNavbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import DropDownList from "./pages/dropDown";

export default function Navbar() {
    const [user, setUser] = useContext(UserContext);
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem("accessToken");
        setUser(null);
        return navigate("/login");
    };

    return (
        <ReactNavbar bg="dark" variant="dark">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {user && <Nav.Link href="/profile">Profile</Nav.Link>}
                    {/* <li> */}
                    {/* </li> */}
                </Nav>
                <Nav className="me-right">
                    {!user && <Nav.Link href="/signUp">Sign Up</Nav.Link>}
                    {!user && <Nav.Link href="/login">Login</Nav.Link>}
                    {user && <Nav.Link href="/login" onClick={() => setOpenMenu((prev) => !prev)}>{user.username}</Nav.Link>}
                    {
                        openMenu && <DropDownList></DropDownList>
                    }


                    {user && (
                        <Nav.Link
                            href="/logout"
                            onClick={(e) => handleClick(e)}
                        >
                            Log out
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </ReactNavbar>
    );
}
