import SendButton from "./sendButton";
import CommentInput from "./commentInput";

function Chat() {
    return (
        <>
            <div>
                <div>
                    <h1>Live Chat: (RED LINE)</h1>
                </div>
                <hr></hr>
                <div>Messages</div>
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
