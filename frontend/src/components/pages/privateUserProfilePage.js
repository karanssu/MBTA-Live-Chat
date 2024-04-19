import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import getUser from "../../utilities/decodeJwt";
import EditUserPage from "./editUserPage";

const PrivateUserProfile = () => {
    return (
        <>
            <EditUserPage />
        </>
    );
};

export default PrivateUserProfile;
