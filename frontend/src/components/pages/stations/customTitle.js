import Color from "../../../constants/colors";

const CustomTitle = ({ title, trainLine }) => {
    const titleStyle = {
        color: Color[trainLine],
        fontSize: "2em",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "10px",
    };

    return (
        <>
            <div>
                <h1 style={titleStyle}>{title}</h1>
            </div>
        </>
    );
};

export default CustomTitle;
