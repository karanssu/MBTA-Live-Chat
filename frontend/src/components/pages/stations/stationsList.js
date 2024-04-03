import "./stationsList.css";
import { useEffect, useRef, useState } from "react";
import StationTitle from "./stationTitle";
import Color from "../../../constants/colors";

const Stations = () => {
    const [selectedTrainLine, setSelectedTrainLine] = useState("Red");
    const [trainLines, setTrainLines] = useState([]);

    useEffect(() => {
        fetchTrainLineDb();
    }, []);

    const handleChange = (trainLine) => {
        setSelectedTrainLine(trainLine);
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
            <div className="station-container">
                <div className="station-title">
                    <StationTitle></StationTitle>
                </div>
                <div className="horizontal-line"></div>
                <div className="station-board">
                    <div>
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
                </div>
            </div>
        </>
    );
};

export default Stations;
