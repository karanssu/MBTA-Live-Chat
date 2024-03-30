const ChatTitle = ({ trainLine }) => {
    const chatTitleStyle = {
        color: "#C72E2E",
        fontWeight: "bold",
        textAlign: "center",
    };

    return (
        <>
            <div>
                <h1 style={chatTitleStyle}>Live Chat: {trainLine} Line</h1>
            </div>
        </>
    );
};

export default ChatTitle;
