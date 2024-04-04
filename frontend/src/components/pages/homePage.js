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
    const { } = user;
    return (
        <>
            
        </>
    );
};

export default HomePage;
