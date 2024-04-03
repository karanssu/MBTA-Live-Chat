import React, { useState } from "react";
import "./radioButton.css";

const RadioButton = ({ checked, onChange, selectedColor }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleClick = () => {
        setIsChecked(!isChecked);
        if (onChange) {
            onChange(!isChecked);
        }
    };

    return (
        <div
            className={`custom-radio-button ${isChecked ? "checked" : ""}`}
            onClick={handleClick}
        >
            <div
                className="radio-dot"
                style={{
                    backgroundColor: isChecked ? selectedColor : "transparent",
                }}
            ></div>
        </div>
    );
};

export default RadioButton;
