import React, { createRef, forwardRef } from "react";
import "./commentInput.css";

const CommentInput = React.forwardRef(({ handleSendButtonClick }, ref) => {
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleSendButtonClick();
        }
    }

    return (
        <>
            <input className="input-box" ref={ref} onKeyDown={handleKeyDown} />
        </>
    );
});

export default CommentInput;
