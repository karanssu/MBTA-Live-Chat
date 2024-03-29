import SendButton from "./sendButton";

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
                        <input></input>
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
