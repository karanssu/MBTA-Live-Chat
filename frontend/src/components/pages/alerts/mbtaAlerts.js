import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./mbtaAlerts.css";
import Color from "../../../constants/colors";
import CustomTitle from "../stations/customTitle";
import CustomDropdown from "./customDropdown";

function Alerts() {
    const [alerts, setAlerts] = useState([]);
    const [flashRed, setFlashRed] = useState(false);
    const severities = ["All", "Critical", "Warning", "Info"];
    const [severity, setSeverity] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios(
                    "https://api-v3.mbta.com/alerts?sort=banner&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE"
                );
                setAlerts(result.data.data.slice(0, 20));
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFlashRed((prevFlashRed) => !prevFlashRed);
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    const handleChange = (severity) => {
        setSeverity(severity);
    };

    const getAlertBorderStyle = (severity) => {
        let borderColor, borderWidth;

        if (severity >= 7) {
            borderColor = flashRed ? "Red" : "White";
            borderWidth = "2.4px";
        } else if (severity >= 4) {
            borderColor = "#FF8C00";
            borderWidth = "2.4px";
        } else {
            borderColor = "Yellow";
            borderWidth = "2.4px";
        }

        return {
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderStyle: "solid",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        };
    };

    return (
        <>
            <div
                className="station-container"
                style={{ "--primary-color": Color.Pink, height: "99%" }}
            >
                <div className="alert-title row">
                    <div className="col-8">
                        <CustomTitle
                            title={"Alerts"}
                            trainLine={"black"}
                        ></CustomTitle>
                    </div>
                    <div className="col-4 mt-2">
                        <CustomDropdown
                            options={severities}
                            onChange={(e) => handleChange(e.target.value)}
                        ></CustomDropdown>
                    </div>
                </div>
                <div className="horizontal-line"></div>
                <div
                    className="title-board row px-2"
                    style={{ height: "70%", overflow: "auto" }}
                >
                    <div className="col">
                        {alerts.map((alert) => (
                            <Card
                                key={alert.id}
                                text="black"
                                className="my-2"
                                style={{
                                    width: "auto",
                                    padding: "0",
                                    background:
                                        "linear-gradient(to top, #FFE3DE 0%, #FFD6DC 42%)",
                                    ...getAlertBorderStyle(
                                        alert.attributes.severity
                                    ),
                                }}
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
