import React, { useState } from "react";
import Chat from "./chat/chatPage";
import Stations from "./stations/stationsList";
import LiveMap from "./map/liveMapPage";
import Alerts from "./alerts/mbtaAlerts";

const HomePage = () => {
    const [trainLine, setTrainLine] = useState("Red");
    const [greenSubLine, setGreenSubLine] = useState("B");
    const [inboundChecked, setInboundChecked] = useState(true);
    const [outboundChecked, setOutboundChecked] = useState(true);

    const handleTrainlineChange = (trainLine) => {
        setTrainLine(trainLine);
    };

    const handleGreenSubLineChecked = (greenSubLine) => {
        setGreenSubLine(greenSubLine);
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
                    <div className="col-8">
                        <div className="row" style={{ height: "60vh" }}>
                            <div className="col px-2">
                                <LiveMap
                                    trainLine={trainLine.toUpperCase()}
                                    greenSubLine={greenSubLine}
                                    inboundChecked={inboundChecked}
                                    outboundChecked={outboundChecked}
                                ></LiveMap>
                            </div>
                        </div>
                        <div className="row" style={{ height: "30vh" }}>
                            <div
                                className="col-8 py-2 px-2"
                                style={{ height: "100%", overflow: "hidden" }}
                            >
                                <Alerts></Alerts>
                            </div>
                            <div className="col-4 py-2 px-0">
                                <Stations
                                    handleTrainlineChecked={
                                        handleTrainlineChange
                                    }
                                    handleGreenSubLineChecked={
                                        handleGreenSubLineChecked
                                    }
                                    handleInboundChange={handleInboundChange}
                                    handleOutboundChange={handleOutboundChange}
                                ></Stations>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <Chat trainLine={trainLine}></Chat>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
