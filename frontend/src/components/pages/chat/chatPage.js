import SendButton from "./sendButton";
import CommentInput from "./commentInput";
import CommentBoard from "./commentBoard";
import ChatTitle from "./chatTitle";
import { useRef, useState } from "react";

const Chat = () => {
    const inputRef = useRef(null);

    const chatPageStyle = {
        backgroundColor: "rgba(204, 17, 39, 0.2)",
    };

    const bottomStyle = {};

    function handleOnClick() {
        console.log(inputRef.current.value);

        inputRef.current.value = "";
    }

    return (
        <>
            <div style={chatPageStyle}>
                <div>
                    <ChatTitle></ChatTitle>
                </div>
                <hr></hr>
                <div>
                    <CommentBoard></CommentBoard>
                </div>
                <div className="row">
                    <div className="col-11">
                        <CommentInput ref={inputRef}></CommentInput>
                    </div>
                    <div className="col-1">
                        <SendButton onClick={handleOnClick}></SendButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;
