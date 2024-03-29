import SendButton from "./sendButton";
import CommentInput from "./commentInput";
import CommentBoard from "./commentBoard";
import ChatTitle from "./chatTitle";

const Chat = () => {
    const chatPageStyle = {
        backgroundColor: "rgba(204, 17, 39, 0.2)",
    };

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
                <div>
                    <div>
                        <CommentInput></CommentInput>
                    </div>
                    <div>
                        <SendButton></SendButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;
