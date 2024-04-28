export const getMapData = (trainLine, subLine) => {
    const mapData = [];
    let line =
        trainLine.charAt(0).toUpperCase() + trainLine.slice(1).toLowerCase();
    line = line === "Green" ? `${line}-${subLine}` : line;

    getTrains(line).then((data) => {
        data.data.map((train) => {
            const trainId = train.id;
            const trainLine = train.relationships.route.data.id;
            const trainLongitude = train.attributes.longitude;
            const trainLatitude = train.attributes.latitude;
            const trainDirection = train.attributes.direction_id;
            const trainStatus = train.attributes.current_status
                .replaceAll("_", " ")
                .toLowerCase();
            let stationId = "";
            try {
                stationId = train.relationships.stop.data.id;
            } catch {
                stationId = "";
            }

            const result = {
                trainId,
                trainLine,
                trainLongitude,
                trainLatitude,
                trainDirection,
                trainStatus,
                stationId,
            };

            if (stationId) {
                getStation(stationId).then((data) => {
                    const stationName =
                        data.data[0].attributes.name || "Unknown";
                    const platformName =
                        data.data[0].attributes.platform_name || "Unknown";
                    const stationLongitude = data.data[0].attributes.longitude;
                    const stationLatitude = data.data[0].attributes.latitude;

                    result["stationName"] = stationName;
                    result["platformName"] = platformName;
                    result["stationLongitude"] = stationLongitude;
                    result["stationLatitude"] = stationLatitude;
                });

                mapData.push(result);
            }
        });
    });
    return mapData;
};

const getStation = async (stationId) => {
    const response = await fetch(
        `https://api-v3.mbta.com/stops?filter[id]=${stationId}&api_key=7e8e5d37481347e197271921b930d523`
    );
    return response.json();
};

const getTrains = async (trainLine) => {
    const response = await fetch(
        `https://api-v3.mbta.com/vehicles?filter[route]=${trainLine}&api_key=7e8e5d37481347e197271921b930d523`
    );

    return response.json();
};
