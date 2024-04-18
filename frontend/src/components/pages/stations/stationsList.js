import "./stationsList.css";
import { useEffect, useState } from "react";
import CustomTitle from "./customTitle";
import Color from "../../../constants/colors";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const Stations = ({
    handleTrainlineChecked,
    handleInboundChange,
    handleOutboundChange,
}) => {
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
        handleInboundChange(!inboundChecked);
    };

    const handleOutboundCheckBox = () => {
        setOutboundChecked(!outboundChecked);
        handleOutboundChange(!outboundChecked);
    };

    const fetchTrainLineDb = async () => {
        try {
            const response = await fetch(REACT_APP_API_URL + "/trainLine/");
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
                    <CustomTitle
                        title={"Stations"}
                    ></CustomTitle>
                </div>
                <div className="horizontal-line"></div>
                <div className="station-board row">
                    <div className="col-7">
                        {trainLines.map((trainLine) => (
                            <label
                                className="radio-label"
                                style={{
                                    color: Color[trainLine],
                                    fontWeight: "bold",
                                }}
                            >
                                <input
                                    className="radio-input"
                                    type="radio"
                                    name="trainLine"
                                    value={trainLine}
                                    checked={selectedTrainLine === trainLine}
                                    onChange={() => handleChange(trainLine)}
                                />
                                <span className="radio-text">{trainLine}</span>
                            </label>
                        ))}
                    </div>
                    <div className="col-5">
                        <label
                            className="checkbox-label"
                            style={{
                                color: "black",
                                fontWeight: inboundChecked ? "bold" : "normal",
                            }}
                        >
                            <input
                                className="checkbox-input"
                                type="checkbox"
                                checked={inboundChecked}
                                value={"Inbound"}
                                onChange={handleInboundCheckBox}
                            />
                            <span className="checkbox-text">Inbound</span>
                        </label>
                        <label
                            className="checkbox-label"
                            style={{
                                color: "black",
                                fontWeight: outboundChecked ? "bold" : "normal",
                            }}
                        >
                            <input
                                className="checkbox-input"
                                type="checkbox"
                                checked={outboundChecked}
                                value={"Outbound"}
                                onChange={handleOutboundCheckBox}
                            />
                            <span className="checkbox-text">Outbound</span>
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Stations;
