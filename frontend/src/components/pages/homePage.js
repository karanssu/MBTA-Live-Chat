import React, { useState, useEffect } from "react";
import Chat from "./chat/chatPage";
import Stations from "./stations/stationsList";
import "./homePage.css";

const HomePage = () => {
    const [trainLine, setTrainLine] = useState("Red");

    const handleTrainlineChange = (trainLine) => {
        setTrainLine(trainLine);
    };

    return (
        <>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-3" style={{ background: "green" }}>
                        1 of 3
                    </div>
                    <div class="col-6" style={{ background: "orange" }}>
                        2 of 3
                    </div>
                    <div class="col-3" style={{ background: "cyan" }}>
                        <Stations
                            handleTrainlineChecked={handleTrainlineChange}
                        ></Stations>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4" style={{ background: "blue" }}></div>
                    <div class="col-8" style={{ background: "red" }}>
                        <Chat trainLine={trainLine}></Chat>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
