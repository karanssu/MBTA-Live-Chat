import React, { useState, useEffect } from "react";
import getUserInfo from "../../utilities/decodeJwt";
const HomePage = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        setUser(getUserInfo());
    }, []);

    if (!user)
        return (
            <div>
                <h4>Log in to view this page.</h4>
            </div>
        );
    const { id, email, username, password } = user;
    return (
        <>
            <div>
                <h3>
                    Welcome
                    <span className="username"> @{username}</span>
                </h3>
                <h3>
                    Your userId in mongo db is
                    <span className="userId"> {id}</span>
                </h3>
                <h3>
                    Your registered email is
                    <span className="email"> {email}</span>
                </h3>
                <h3>
                    Your password is
                    <span className="password"> {password} ( hashed )</span>
                </h3>
            </div>
        </>
    );
};

export default HomePage;
