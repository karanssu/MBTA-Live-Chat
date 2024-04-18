import React from 'react';
import Color from "../../../constants/colors";
import dotGif from './dot.gif';  
import './chatTitle.css';  

const ChatTitle = ({ trainLine }) => {
    const chatTitleStyle = {
        color: Color[trainLine],
        fontSize: "2rem",
        fontWeight: "bold",
        textAlign: "center",
    };

    return (
        <div className="chat-title-container">
            <img src={dotGif} alt="Flashing dot" className="flashing-dot" />
            <h1 style={chatTitleStyle}>
                <span style={{ color: "black" }}>Live Chat: </span>
                {trainLine} Line
            </h1>
        </div>
    );
};

export default ChatTitle;
