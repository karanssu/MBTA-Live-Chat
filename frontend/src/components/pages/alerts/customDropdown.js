const CustomDropdown = ({ options, value, onChange }) => {
    return (
        <select className="custom-select" value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default CustomDropdown;
