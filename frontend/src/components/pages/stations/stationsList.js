import "./stationsList.css";
import { useEffect, useState } from "react";
import StationTitle from "./stationTitle";
import Color from "../../../constants/colors";

const Stations = ({ handleTrainlineChecked }) => {
    const [selectedTrainLine, setSelectedTrainLine] = useState("Red");
    const [inboundChecked, setInboundChecked] = useState(true);
    const [outboundChecked, setOutboundChecked] = useState(true);
    const [trainLines, setTrainLines] = useState([]);

    useEffect(() => {
        fetchTrainLineDb();
    }, []);

    const handleChange = (trainLine) => {
        setSelectedTrainLine(trainLine);
        handleTrainlineChecked(trainLine);
    };

    const handleInboundCheckBox = () => {
        setInboundChecked(!inboundChecked);
    };

    const handleOutboundCheckBox = () => {
        setOutboundChecked(!outboundChecked);
    };

    const fetchTrainLineDb = async () => {
        try {
            const response = await fetch("http://localhost:8081/trainLine/");
            if (!response.ok) {
                throw new Error("Failed to fetch trainLines");
            }
            const trainLineData = await response.json();
            setTrainLines(trainLineData.map((data) => data["trainLine"]));
        } catch (error) {
            console.error("Error fetching trainLines:", error.message);
        }
    };

    return (
        <>
            <div
                className="station-container"
                style={{ "--primary-color": Color.Pink }}
            >
                <div className="station-title">
                    <StationTitle></StationTitle>
                </div>
                <div className="horizontal-line"></div>
                <div className="station-board row">
                    <div className="col-6">
                        {trainLines.map((trainLine) => (
                            <label
                                style={{
                                    color: Color[trainLine],
                                    fontWeight: "bold",
                                }}
                            >
                                <input
                                    type="radio"
                                    name="trainLine"
                                    value={trainLine}
                                    checked={selectedTrainLine === trainLine}
                                    onChange={() => handleChange(trainLine)}
                                />
                                {trainLine}
                            </label>
                        ))}
                    </div>
                    <div className="col-6">
                        <label
                            style={{
                                color: Color[selectedTrainLine],
                                fontWeight: "bold",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={inboundChecked}
                                value={"Inbound"}
                                onChange={handleInboundCheckBox}
                            />
                            Inbound
                        </label>
                        <label
                            style={{
                                color: Color[selectedTrainLine],
                                fontWeight: "bold",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={outboundChecked}
                                value={"Outbound"}
                                onChange={handleOutboundCheckBox}
                            />
                            Outbound
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Stations;
