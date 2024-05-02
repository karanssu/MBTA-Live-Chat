import EditUserPage from "./editUserPage";

const PrivateUserProfile = () => {
    return (
        <>
            <div
                className="d-flex justify-content-center"
                style={{ height: "calc(100vh - 60px)" }}
            >
                <EditUserPage />
            </div>
        </>
    );
};

export default PrivateUserProfile;
