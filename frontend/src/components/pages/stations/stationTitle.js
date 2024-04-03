import Color from "../../../constants/colors";

const StationTitle = () => {
    const stationTitleStyle = {
        color: Color.Black,
        fontWeight: "bold",
        textAlign: "center",
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
