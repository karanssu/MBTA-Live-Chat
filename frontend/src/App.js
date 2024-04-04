import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
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
import MainPage from "./components/pages/mainPage";

export const UserContext = createContext();
//test change
//test again
const App = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        setUser(getUserInfo());
    }, []);

    return (
        <>
            <Navbar />
            <UserContext.Provider value={user}>
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route exact path="/home" element={<HomePage />} />
                    <Route exact path="/main" element={<MainPage />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route
                        exact
                        path="/mbtaAlerts"
                        element={<MbtaAlertsPage />}
                    />
                    <Route exact path="/chat" element={<ChatPage />} />
                    <Route
                        path="/privateUserProfile"
                        element={<PrivateUserProfile />}
                    />
                    <Route exact path="/liveMap" element={<LiveMapPage />} />
                    <Route
                        exact
                        path="/stationsList"
                        element={<StationsList />}
                    />
                </Routes>
            </UserContext.Provider>
        </>
    );
};

export default App;
