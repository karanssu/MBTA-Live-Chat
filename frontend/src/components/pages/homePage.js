import React, { useState, useEffect } from "react";
import Chat from "./chat/chatPage";
import Stations from "./stations/stationsList";

const HomePage = () => {
    const [trainLine, setTrainLine] = useState("Red");

    const handleTrainlineChange = (trainLine) => {
        setTrainLine(trainLine);
    };

    return (
        <>
            <Chat trainLine={trainLine}></Chat>
            <Stations handleTrainlineChecked={handleTrainlineChange}></Stations>
        </>
    );
};

export default HomePage;
