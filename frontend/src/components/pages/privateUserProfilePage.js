import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import getUser from "../../utilities/decodeJwt";
import EditUserPage from "./editUserPage";

const PrivateUserProfile = () => {
    return (
        <>
        <img src="images/trains.jpeg"></img>
            <div className="d-flex justify-content-center">
                <EditUserPage />
            </div>
        </>
    );
};

export default PrivateUserProfile;
