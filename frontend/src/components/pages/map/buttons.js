import React from "react";

const ButtonsComponent = ({
    handleButtonClick,
    resetMap,
    pressedButton,
    filterColor,
}) => {
    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
                style={{
                    color: pressedButton === "BLUE" ? "blue" : "black",
                    fontWeight: pressedButton === "BLUE" ? "bold" : "normal",
                }}
                onClick={() => handleButtonClick("BLUE")}
            >
                Blue
            </button>
            <button
                style={{
                    color: pressedButton === "RED" ? "red" : "black",
                    fontWeight: pressedButton === "RED" ? "bold" : "normal",
                }}
                onClick={() => handleButtonClick("RED")}
            >
                Red
            </button>
            <button
                style={{
                    color: pressedButton === "GREEN" ? "green" : "black",
                    fontWeight: pressedButton === "GREEN" ? "bold" : "normal",
                }}
                onClick={() => handleButtonClick("GREEN")}
            >
                Green
            </button>
            <button
                style={{
                    color: pressedButton === "ORANGE" ? "orange" : "black",
                    fontWeight: pressedButton === "ORANGE" ? "bold" : "normal",
                }}
                onClick={() => handleButtonClick("ORANGE")}
            >
                Orange
            </button>
        </div>
    );
};

export default ButtonsComponent;
