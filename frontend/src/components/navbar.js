import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactNavbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Dropdown from "react-bootstrap/Dropdown";

export default function Navbar() {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
        navigate("/login");
    };

    return (
        <ReactNavbar bg="dark" variant="dark">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                <div className="profile-div">
                    {user && (
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {user.username}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/profile">
                                    Profile
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </div>
                <Nav className="me-right">
                    {!user && <Nav.Link href="/signUp">Sign Up</Nav.Link>}
                    {!user && <Nav.Link href="/login">Login</Nav.Link>}
                </Nav>
            </Container>
        </ReactNavbar>
    );
}
