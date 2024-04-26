import React from "react";

const CustomDropdown = ({ options, value, onChange }) => {
    const getDropdownStyle = (option) => {
        switch (option) {
            case "Critical":
                return { color: "Red", borderColor: "Red" }; 
            case "Warning":
                return { color: "#D4D23F", borderColor: "Black"};
            case "Info":
                return { color: "Blue", borderColor: "Blue" }; 
            default:
                return { color: "Black", borderColor: "Black" }; 
        }
    };
    const selectStyle = {
        ...getDropdownStyle(value), 
        backgroundColor: '#f8f9fa', 
    };

    return (
        <select
            className="custom-dropdown"
            value={value}
            onChange={onChange}
            style={selectStyle} 
        >
            {options.map((option) => (
                <option key={option} value={option} style={getDropdownStyle(option)}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default CustomDropdown;
