import React, { createRef, forwardRef } from "react";

const CommentInput = React.forwardRef(({ handleSendButtonClick }, ref) => {
    const inputStyle = {
        width: "100%",
        height: "50px",
    };

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleSendButtonClick();
        }
    }

    return (
        <>
            <input ref={ref} onKeyDown={handleKeyDown} style={inputStyle} />
        </>
    );
});

export default CommentInput;
