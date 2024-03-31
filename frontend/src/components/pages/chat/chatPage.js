import CommentSendButton from "./commentSendButton";
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

    const chatPageStyle = {
        backgroundColor: "rgba(204, 17, 39, 0.2)",
    };

    useEffect(() => {
        setUser(getUserInfo());
        fetchCommentDb(trainLine);
    }, []);

    const clearCommentInput = () => {
        inputRef.current.value = "";
    };

    const addUserComment = (username, comment) => {
        setUserComments([
            ...userComments,
            {
                username: username,
                comment: comment,
            },
        ]);
    };

    const saveCommentDb = async (userId, trainLine, comment) => {
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
            } else {
                throw new Error("Error saving data");
            }
        } catch (error) {
            throw new Error("Error:", error);
        }
    };

    const fetchCommentDb = async (trainLine) => {
        try {
            const response = await fetch(
                "http://localhost:8081/comment/getByTrainLine/" + trainLine
            );
            if (!response.ok) {
                throw new Error("Failed to fetch comments");
            }
            const userCommentsData = await response.json();
            setUserComments(userCommentsData);
        } catch (error) {
            console.error("Error fetching comments:", error.message);
        }
    };

    const handleSendButtonClick = () => {
        const userId = user.id;
        const username = user.username;
        const comment = inputRef.current.value.trim();

        const success = saveCommentDb(userId, trainLine, comment);

        success
            .then(() => {
                addUserComment(username, comment);
                clearCommentInput();
            })
            .catch((e) => {
                console.log(e);
                alert("Something went wrong!");
            });
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
                            handleSendButtonClick={handleSendButtonClick}
                            ref={inputRef}
                        ></CommentInput>
                    </div>
                    <div className="col-1">
                        <CommentSendButton
                            handleSendButtonClick={handleSendButtonClick}
                        ></CommentSendButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;
