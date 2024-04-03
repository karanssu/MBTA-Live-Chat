import React, { useState } from "react";
import "./radioButton.css";

const RadioButton = ({ checked, onChecked, selectedColor, value }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleClick = () => {
        setIsChecked(!isChecked);

        const checked = !isChecked;
        if (checked) {
            onChecked();
        }
    };

    return (
        <div className="custom-radio-button-container">
            <div
                className={`custom-radio-button ${isChecked ? "checked" : ""}`}
                onClick={handleClick}
                style={{
                    marginRight: isChecked ? "15px" : "0",
                }}
            >
                <div
                    className="radio-dot"
                    style={{
                        backgroundColor: isChecked
                            ? selectedColor
                            : "transparent",
                    }}
                ></div>
            </div>
            <div className="custom-radio-button-value">{value}</div>
        </div>
    );
};

export default RadioButton;
