import React from "react";

const ButtonsComponent = ({handleButtonClick,handleDirectionClick,resetMap,pressedButton,filterDirection,filterColor}) => {
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
      <br></br>
      <button
        style={{
          color:
            filterDirection === "0" && filterColor
              ? filterColor.toLowerCase()
              : "black",
          fontWeight: filterDirection === "0" ? "bold" : "normal",
        }}
        onClick={() => handleDirectionClick("0")}
      >
        Outbound
      </button>
      <button
        style={{
          color:
            filterDirection === "1" && filterColor
              ? filterColor.toLowerCase()
              : "black",
          fontWeight: filterDirection === "1" ? "bold" : "normal",
        }}
        onClick={() => handleDirectionClick("1")}
      >
        Inbound
      </button>
      <br></br>
      <button onClick={resetMap}>Reset All</button>
    </div>
  );
};

export default ButtonsComponent;