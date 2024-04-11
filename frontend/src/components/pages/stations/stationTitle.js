import Color from "../../../constants/colors";

const StationTitle = ({ trainLine }) => {
    const stationTitleStyle = {
        color: Color[trainLine],
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
