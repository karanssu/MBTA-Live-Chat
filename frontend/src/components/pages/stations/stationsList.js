import { useEffect, useRef, useState } from "react";
import Color from "../../../constants/colors";
import "./stationsList.css";

const Stations = () => {
    const [trainLine, setTrainLine] = useState("Red");
    const handleChange = (trainLine) => {
        setTrainLine(trainLine);
    };

    return (
        <>
            <div className="station-container">
                <div>
                    <h1>Stations</h1>
                </div>

                <hr></hr>

                <div
                    className="radio-buttons"
                    style={{ "--primary-color": Color.Pink }}
                >
                    <label>
                        <input
                            type="radio"
                            name="color"
                            value="Red"
                            onChange={() => handleChange("Red")}
                        />
                        Red
                    </label>
                    <br></br>
                    <label>
                        <input
                            type="radio"
                            name="color"
                            value="Orange"
                            onChange={() => handleChange("Orange")}
                        />
                        Orange
                    </label>
                    <br></br>
                    <label>
                        <input
                            type="radio"
                            name="color"
                            value="Blue"
                            onChange={() => handleChange("Blue")}
                        />
                        Blue
                    </label>
                    <br></br>
                    <label>
                        <input
                            type="radio"
                            name="color"
                            value="Green"
                            onChange={() => handleChange("Green")}
                        />
                        Green
                    </label>
                </div>
            </div>
        </>
    );
};

export default Stations;
