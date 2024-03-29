import React, { createRef, forwardRef } from "react";

const CommentInput = React.forwardRef((props, ref) => {
    const inputStyle = {
        width: "100%",
        height: "50px",
    };

    return (
        <>
            <input ref={ref} style={inputStyle} />
        </>
    );
});

export default CommentInput;
