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
            <div
                className="container"
                style={{
                    border: "2px solid black",
                    width: "100hv",
                }}
            >
                <div className="row" style={{ height: "90vh" }}>
                    <div className="col-3" style={{ border: "2px solid red" }}>
                        Alerts
                    </div>
                    <div className="col-9" style={{ border: "2px solid red" }}>
                        <div
                            className="row"
                            style={{ border: "2px solid red", height: "42vh" }}
                        >
                            <div
                                className="col-8"
                                style={{ border: "2px solid red" }}
                            >
                                <LiveMap
                                    trainLine={trainLine.toUpperCase()}
                                    inboundChecked={inboundChecked}
                                    outboundChecked={outboundChecked}
                                ></LiveMap>
                            </div>
                            <div
                                className="col-4"
                                style={{ border: "2px solid red" }}
                            >
                                <Stations
                                    handleTrainlineChecked={
                                        handleTrainlineChange
                                    }
                                    handleInboundChange={handleInboundChange}
                                    handleOutboundChange={handleOutboundChange}
                                ></Stations>
                            </div>
                        </div>
                        <div
                            className="row"
                            style={{ border: "2px solid red", height: "42vh" }}
                        >
                            <div
                                className="col"
                                style={{ border: "2px solid red" }}
                            >
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
