import GeoJSON from "ol/format/GeoJSON";

export const fetchTrainLocations = async (trainSource) => {
    const lines = [
        "Green",
        "Green-B",
        "Green-C",
        "Green-D",
        "Green-E",
        "Blue",
        "Orange",
        "Red",
    ];

    const trainData = await Promise.all(
        lines.map(async (line) => {
            const response = await fetch(
                `https://api-v3.mbta.com/vehicles?filter[route]=${line}&api_key=7e8e5d37481347e197271921b930d523`
            );
            return response.json();
        })
    );

    const locations = trainData.flatMap((data) =>
        data.data.map((vehicle) => ({
            type: "Feature",
            properties: {
                LINE: vehicle.relationships.route.data.id,
                DIRECTION: vehicle.attributes.direction_id.toString(),
            },
            geometry: {
                type: "Point",
                coordinates: [
                    vehicle.attributes.longitude,
                    vehicle.attributes.latitude,
                ],
            },
        }))
    );

    const features = new GeoJSON().readFeatures(
        { type: "FeatureCollection", features: locations },
        { featureProjection: "EPSG:3857" }
    );
    trainSource.clear(true);
    trainSource.addFeatures(features);
};