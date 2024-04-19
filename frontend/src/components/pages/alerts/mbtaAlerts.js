import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./mbtaAlerts.css";
import Color from "../../../constants/colors";
import CustomTitle from "../stations/customTitle";

function Alerts() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                "https://api-v3.mbta.com/alerts?sort=banner&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE"
            );
            setAlerts(result.data.data.slice(0, 20));
        }
        fetchData();
    }, []);

    return (
        <>
            <div
                className="station-container"
                style={{ "--primary-color": Color.Pink, height: "99%" }}
            >
                <div className="alert-title row">
                    <CustomTitle
                        title={"Alerts"}
                        trainLine={"black"}
                    ></CustomTitle>
                </div>
                <div className="horizontal-line"></div>
                <div
                    className="title-board row px-2"
                    style={{ height: "70%", overflow: "auto" }}
                >
                    <div className="col">
                        {alerts.map((alert) => (
                            <Card
                                bg={"Danger".toLowerCase()}
                                key={"Danger"}
                                text={
                                    "Danger".toLowerCase() === "light"
                                        ? "dark"
                                        : "white"
                                }
                                className="my-2"
                                style={{ width: "auto", padding: "0" }}
                            >
                                <Card.Body>
                                    <Card.Text>
                                        {alert.attributes.header}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Alerts;
