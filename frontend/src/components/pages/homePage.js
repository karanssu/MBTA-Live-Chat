import React, { useState, useEffect } from "react";
import Chat from "./chat/chatPage";
import Stations from "./stations/stationsList";
import LiveMap from "./map/liveMapPage";
import "./homePage.css";

const HomePage = () => {
    const [trainLine, setTrainLine] = useState("Red");
    const [inboundChecked, setInboundChecked] = useState(true);
    const [outboundChecked, setOutboundChecked] = useState(true);

    const handleTrainlineChange = (trainLine) => {
        setTrainLine(trainLine);
    };

    const handleInboundChange = (inboundChecked) => {
        setInboundChecked(inboundChecked);
    };

    const handleOutboundChange = (outboundChecked) => {
        setOutboundChecked(outboundChecked);
    };

    return (
        <>
            <div class="container">
                <div class="row">
                    <div class="col-md-3 p-3">Alerts</div>
                    <div class="col-md-6 p-3">
                        <LiveMap
                            trainLine={trainLine.toUpperCase()}
                            inboundChecked={inboundChecked}
                            outboundChecked={outboundChecked}
                        ></LiveMap>
                    </div>
                    <div class="col-md-3 p-3">
                        <Stations
                            handleTrainlineChecked={handleTrainlineChange}
                            handleInboundChange={handleInboundChange}
                            handleOutboundChange={handleOutboundChange}
                        ></Stations>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-9 p-3">
                        <Chat trainLine={trainLine}></Chat>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
