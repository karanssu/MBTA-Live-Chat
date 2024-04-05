import jwt_decode from "jwt-decode";

const getUser = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return undefined;
    return jwt_decode(accessToken);
};

export default getUser;
