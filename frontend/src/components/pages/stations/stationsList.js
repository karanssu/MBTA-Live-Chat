import "./stationsList.css";
import { useEffect, useState } from "react";
import CustomTitle from "./customTitle";
import Color from "../../../constants/colors";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const Stations = ({
    handleTrainlineChecked,
    handleGreenSubLineChecked,
    handleInboundChange,
    handleOutboundChange,
}) => {
    const [selectedTrainLine, setSelectedTrainLine] = useState("Red");
    const [selectedGreenSubLine, setSelectedGreenSubLine] = useState("B");
    const [inboundChecked, setInboundChecked] = useState(true);
    const [outboundChecked, setOutboundChecked] = useState(true);
    const [trainLines, setTrainLines] = useState([]);
    const [greenSubLines] = useState(["B", "C", "D", "E"]);

    useEffect(() => {
        fetchTrainLineDb();
    }, []);

    const handleTrainLineChange = (trainLine) => {
        setSelectedTrainLine(trainLine);
        handleTrainlineChecked(trainLine);
    };

    const handleSubLineChange = (greenSubLine) => {
        setSelectedGreenSubLine(greenSubLine);
        handleGreenSubLineChecked(greenSubLine);
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
            <div className="station-container">
                <div className="station-title">
                    <CustomTitle title={"Lines"}></CustomTitle>
                </div>
                <div className="horizontal-line"></div>
                <div className="station-board row">
                    <div className="col-7">
                        <div className="row">
                            <div className="col-7">
                                {trainLines.map((trainLine) => (
                                    <label
                                        key={trainLine}
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
                                            checked={
                                                selectedTrainLine === trainLine
                                            }
                                            onChange={() =>
                                                handleTrainLineChange(trainLine)
                                            }
                                        />
                                        <span className="radio-text">
                                            {trainLine}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            <div className="col-5">
                                {selectedTrainLine === "Green" &&
                                    greenSubLines.map((greenSubLine) => (
                                        <label
                                            key={greenSubLine}
                                            className="radio-label"
                                            style={{
                                                color: Color["Green"],
                                                fontWeight: "bold",
                                            }}
                                        >
                                            <input
                                                className="radio-input"
                                                type="radio"
                                                name="greenSubLine"
                                                value={greenSubLine}
                                                checked={
                                                    selectedGreenSubLine ===
                                                    greenSubLine
                                                }
                                                onChange={() =>
                                                    handleSubLineChange(
                                                        greenSubLine
                                                    )
                                                }
                                            />
                                            <span className="radio-text">
                                                {greenSubLine}
                                            </span>
                                        </label>
                                    ))}
                            </div>
                        </div>
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
