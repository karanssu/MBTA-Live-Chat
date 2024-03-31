import SendButton from "./sendButton";
import CommentInput from "./commentInput";
import CommentBoard from "./commentBoard";
import ChatTitle from "./chatTitle";
import { useEffect, useRef, useState } from "react";
import getUserInfo from "../../../utilities/decodeJwt";

const trainLine = "Red";

const Chat = () => {
    const [user, setUser] = useState({});
    const [userComments, setUserComments] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        setUser(getUserInfo());
    }, []);

    const chatPageStyle = {
        backgroundColor: "rgba(204, 17, 39, 0.2)",
    };

    const handleClick = async () => {
        const userId = user.id;
        const username = user.username;
        const comment = inputRef.current.value;

        try {
            const response = await fetch("http://localhost:8081/comment/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    trainLine: trainLine,
                    comment: comment,
                }),
            });
            if (response.ok) {
                console.log("Data saved successfully");
            } else {
                console.error("Error saving data");
            }
        } catch (error) {
            console.error("Error:", error);
        }

        setUserComments([
            ...userComments,
            {
                username: username,
                comment: comment,
            },
        ]);

        inputRef.current.value = "";
    };

    return (
        <>
            <div style={chatPageStyle}>
                <div>
                    <ChatTitle trainLine={trainLine}></ChatTitle>
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
