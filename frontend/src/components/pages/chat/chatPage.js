import SendButton from "./sendButton";
import CommentInput from "./commentInput";
import CommentBoard from "./commentBoard";
import ChatTitle from "./chatTitle";

const Chat = () => {
    const chatPageStyle = {
        backgroundColor: "rgba(204, 17, 39, 0.2)",
    };

    const bottomStyle = {};

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
                <div className="row" style={bottomStyle}>
                    <div className="col-11">
                        <CommentInput></CommentInput>
                    </div>
                    <div className="col-1">
                        <SendButton></SendButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;
