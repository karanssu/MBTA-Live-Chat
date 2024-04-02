import CommentSendButton from "./commentSendButton";
import CommentInput from "./commentInput";
import CommentBoard from "./commentBoard";
import ChatTitle from "./chatTitle";
import { useEffect, useRef, useState } from "react";
import getUserInfo from "../../../utilities/decodeJwt";
import Color from "../../../constants/colors";
import "./chatPage.css";
const Stations = () => {
    const [trainLine, setTrainLine] = useState("Red");
    const handleChange = (trainLine) => {
        setTrainLine(trainLine);
    };

    return (
              <>
            <div
                className="container"
                style={{ "--primary-color": Color.Pink }}
            >
            
           
            <label>
                    <input
                        type="radio"
                        nme="color"
                        value="Red"
                        onChange={() => handleChange("Red")}
                    />
                    Red
                </label>
                <label>
                    <input
                        type="radio"
                        name="color"
                        value="Orange"
                        onChange={() => handleChange("Orange")}
                    />
                    Orange
                </label>
                <label>
                    <input
                        type="radio"
                        name="color"
                        value="Blue"
                        onChange={() => handleChange("Blue")}
                    />
                    Blue
                </label>
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
        </>
    );
};

export default Stations;