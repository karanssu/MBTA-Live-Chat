import React from "react";

const CustomDropdown = ({ options, value, onChange, severity }) => {
    
    const getDropdownStyle = () => {
        if (severity === "Critical") {
            return { backgroundColor: "#FF9393" }; 
        } else if (severity === "Warning") {
            return { backgroundColor: "#ffff99" }; 
        } else if (severity === "Info") {
            return { backgroundColor: "#A3B6FF" }; 
        } else {
            return { backgroundColor: "#f8f9fa" }; 
        }
    };

    return (
        <select
            className="custom-dropdown"
            value={value}
            onChange={onChange}
            style={getDropdownStyle()}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default CustomDropdown;
