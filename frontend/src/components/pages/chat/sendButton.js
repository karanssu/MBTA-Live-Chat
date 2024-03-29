const SendButton = ({ onClick }) => {
    function handleClick() {
        onClick();
    }

    return (
        <>
            <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/circled-right-2.png"
                alt="circled-right-2"
                onClick={handleClick}
            />
        </>
    );
};

export default SendButton;
