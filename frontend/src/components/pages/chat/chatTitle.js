import Color from "../../../constants/colors";

const ChatTitle = ({ trainLine }) => {
    const chatTitleStyle = {
        color: Color[trainLine],
        fontSize: "2rem",
        fontWeight: "bold",
        textAlign: "center",
    };

    return (
        <>
            <div>
                <h1 style={chatTitleStyle}>
                    <span style={{ color: "black" }}>Live Chat: </span>
                    {trainLine} Line
                </h1>
            </div>
        </>
    );
};

export default ChatTitle;
