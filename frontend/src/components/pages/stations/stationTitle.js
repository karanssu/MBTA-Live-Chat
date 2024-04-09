import Color from "../../../constants/colors";

const StationTitle = () => {
    const stationTitleStyle = {
        color: Color.Black,
        fontSize: "2em",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "10px",
    };

    return (
        <>
            <div>
                <h1 style={stationTitleStyle}>Stations</h1>
            </div>
        </>
    );
};

export default StationTitle;
