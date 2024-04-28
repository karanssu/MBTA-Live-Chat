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
            id: vehicle.id,
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

    features.forEach((newFeature) => {
        const existingFeature = trainSource.getFeatureById(newFeature.getId());
        if (existingFeature) {
            animate(existingFeature, newFeature.getGeometry().getCoordinates());
        } else {
            trainSource.addFeature(newFeature);
        }
    });
};

const animate = (feature, newCoordinates) => {
    const duration = 3000;
    const oldCoordinates = feature.getGeometry().getCoordinates();
    const startTime = performance.now();
  
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressPercent = Math.min(elapsed / duration * 100, 100);
  
      const x = oldCoordinates[0] + (newCoordinates[0] - oldCoordinates[0]) * progressPercent / 100;
      const y = oldCoordinates[1] + (newCoordinates[1] - oldCoordinates[1]) * progressPercent / 100;
  
      feature.getGeometry().setCoordinates([x, y]);
  
      if (progressPercent < 100) {
        requestAnimationFrame(animate);
      }
    };
  
    requestAnimationFrame(animate);
  };