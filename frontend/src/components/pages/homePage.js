import React, { useState, useEffect } from "react";
import Chat from "./chat/chatPage";
import Stations from "./stations/stationsList";
import LiveMap from "./map/liveMapPage";
import Alerts from "./alerts/mbtaAlerts";
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
            <div
                className="container-fluid"
                style={{
                    width: "100hv",
                }}
            >
                <div className="row py-3" style={{ height: "90vh" }}>
                    <div
                        className="col-3"
                        style={{ height: "85vh", overflow: "hidden" }}
                    >
                        <Alerts></Alerts>
                    </div>
                    <div className="col-9">
                        <div className="row" style={{ height: "42vh" }}>
                            <div className="col-8 ">
                                <LiveMap
                                    trainLine={trainLine.toUpperCase()}
                                    inboundChecked={inboundChecked}
                                    outboundChecked={outboundChecked}
                                ></LiveMap>
                            </div>
                            <div className="col-4">
                                <Stations
                                    handleTrainlineChecked={
                                        handleTrainlineChange
                                    }
                                    handleInboundChange={handleInboundChange}
                                    handleOutboundChange={handleOutboundChange}
                                ></Stations>
                            </div>
                        </div>
                        <div className="row" style={{ height: "42vh" }}>
                            <div className="col py-3">
                                <Chat trainLine={trainLine}></Chat>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
