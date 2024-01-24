import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

function Routes() {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios("https://api-v3.mbta.com/routes");
            setRoutes(result.data.data);
        }
        fetchData();
    }, []);

    return (
        <div>
            {routes.map((route) => (
                <Card
                    bg={"Primary".toLowerCase()}
                    key={"Primary"}
                    text={
                        "Primary".toLowerCase() === "light" ? "dark" : "white"
                    }
                    body
                    outline
                    color="success"
                    className="mx-1 my-2"
                    style={{ width: "30rem" }}
                >
                    <Card.Body>
                        <Card.Title>Route</Card.Title>
                        <Card.Text>{route.attributes.description}</Card.Text>
                        <Card.Text>
                            {route.attributes.direction_destinations}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}

            <h1>Routes!</h1>
            {routes.map((route) => (
                <div key={route.id}>
                    <p>{route.attributes.description}</p>
                    <p>{route.attributes.direction_destinations}</p>
                </div>
            ))}
        </div>
    );
}

export default Routes;
