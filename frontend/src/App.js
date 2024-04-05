import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";
import MbtaAlertsPage from "./components/pages/alerts/mbtaAlerts";
import ChatPage from "./components/pages/chat/chatPage";
import LiveMapPage from "./components/pages/liveMap";
import StationsList from "./components/pages/stations/stationsList";

export const UserContext = createContext();

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getUserInfo());
    }, []);

    return (
        <>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/mbtaAlerts" element={<MbtaAlertsPage />} />
                <Route path="/profile" element={<PrivateUserProfile />} />
                <Route exact path="/liveMap" element={<LiveMapPage />} />
            </Routes>
        </>
    );
};

export default App;
