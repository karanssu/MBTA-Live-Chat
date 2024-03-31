const CommentBoard = ({ userComments }) => {
    return (
        <>
            <div>
                {userComments.map((userComment) => (
                    <li>
                        <b>{userComment.username}:</b> {userComment.comment}
                    </li>
                ))}
            </div>
        </>
    );
};

export default CommentBoard;
