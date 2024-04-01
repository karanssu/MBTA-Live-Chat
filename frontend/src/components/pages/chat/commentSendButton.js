import "./commentSendButton.css";

const CommentSendButton = ({ handleSendButtonClick }) => {
    function handleClick() {
        handleSendButtonClick();
    }

    return (
        <>
            <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/circled-right-2.png"
                alt="circled-right-2"
                onClick={handleClick}
                className="send-btn"
            />
        </>
    );
};

export default CommentSendButton;
