import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import { createContext, useState, useEffect } from "react";
import getUser from "./utilities/decodeJwt";
import "./App.css";

export const UserContext = createContext();

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    return (
        <>
            <UserContext.Provider value={[user, setUser]}>
                <div className="overlay">
                    <div className="content">
                        <Navbar />
                        <Routes>
                            <Route exact path="/" element={<HomePage />} />
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/signup" element={<Signup />} />
                            <Route
                                path="/profile"
                                element={<PrivateUserProfile />}
                            />
                        </Routes>
                    </div>
                </div>
            </UserContext.Provider>
        </>
    );
};

export default App;
