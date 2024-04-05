import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactNavbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Navbar() {
    const [user, setUser] = useContext(UserContext);
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
                    <Nav.Link href="/mbtaAlerts">MBTA Alerts</Nav.Link>
                    <Nav.Link href="/liveMap">Live Map</Nav.Link>

                    {!user && <Nav.Link href="/signUp">Sign Up</Nav.Link>}
                    {!user && <Nav.Link href="/login">Login</Nav.Link>}

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
