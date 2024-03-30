import SendButton from "./sendButton";
import CommentInput from "./commentInput";
import CommentBoard from "./commentBoard";
import ChatTitle from "./chatTitle";
import { useEffect, useRef, useState } from "react";
import getUserInfo from "../../../utilities/decodeJwt";

const Chat = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(getUserInfo());
    }, []);

    const userComments = [
        { username: "testUser", comment: "This is my test comment" },
        { username: "BostonFan00", comment: "cap" },
    ];

    const inputRef = useRef(null);

    const chatPageStyle = {
        backgroundColor: "rgba(204, 17, 39, 0.2)",
    };

    function handleClick() {
        const username = user.username;
        const comment = inputRef.current.value;

        console.log(username, comment);

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
                    <CommentBoard userComments={userComments}></CommentBoard>
                </div>
                <div className="row">
                    <div className="col-11">
                        <CommentInput
                            handleSendButtonClick={handleClick}
                            ref={inputRef}
                        ></CommentInput>
                    </div>
                    <div className="col-1">
                        <SendButton
                            handleSendButtonClick={handleClick}
                        ></SendButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;
