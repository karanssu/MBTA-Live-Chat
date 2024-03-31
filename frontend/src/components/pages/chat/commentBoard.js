import "./commentBoard.css";

const CommentBoard = ({ userComments }) => {
    return (
        <>
            <div className="comment-board">
                {userComments.map((userComment) => (
                    <li className="custom-list">
                        <span>
                            <b>{userComment.username}:</b>
                        </span>
                        <span className="comment-text">
                            {userComment.comment}
                        </span>
                    </li>
                ))}
            </div>
        </>
    );
};

export default CommentBoard;
