import React, { useState } from "react";
import RadioButton from "./RadioButton";

const RadioButtonGroup = ({ options, onChange, colors }) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (id) => {
        setSelectedValue(id);
        onChange(id);
    };

    return (
        <div>
            {options.map((option, index) => (
                <RadioButton
                    key={index}
                    id={index}
                    value={option}
                    selectedValue={selectedValue}
                    onChange={handleChange}
                    color={colors[index]}
                />
            ))}
        </div>
    );
};

export default RadioButtonGroup;
