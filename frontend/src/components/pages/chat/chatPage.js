import SendButton from "./sendButton";
import CommentInput from "./commentInput";
import CommentBoard from "./commentBoard";
import ChatTitle from "./chatTitle";

function Chat() {
    return (
        <>
            <div>
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
}

export default Chat;
