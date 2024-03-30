const CommentBoard = ({ userComments }) => {
    return (
        <>
            <div>
                {userComments.map((userComment) => (
                    <li>
                        {userComment.username}: {userComment.comment}
                    </li>
                ))}
            </div>
        </>
    );
};

export default CommentBoard;
