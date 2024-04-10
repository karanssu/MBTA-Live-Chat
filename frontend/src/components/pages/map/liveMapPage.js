import React, { useRef, useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import Buttons from "./buttons";
import { mapStyles } from "./mapStyles";
import { lineStyle, nodeStyle, trainStyle } from "./styleFunctions";
import { fetchTrainLocations } from "./fetchTrainLocations";
import {
    handleButtonClick,
    handleDirectionClick,
    resetMap,
} from "./mapControls";

const MapComponent = ({ trainLine }) => {
    const mapRef = useRef();
    let map;

    const [filterDirection, setFilterDirection] = useState("");
    const [pressedButton, setPressedButton] = useState("");

    const arcSource = new VectorSource(),
        nodeSource = new VectorSource(),
        trainSource = new VectorSource();

    useEffect(() => {
        const loadGeoJSONData = async (geojsonPath) => {
            const response = await fetch(geojsonPath);
            return await response.json();
        };

        const initializeMap = async () => {
            try {
                const arcData = await loadGeoJSONData("arc.geojson");
                const nodeData = await loadGeoJSONData("node.geojson");

                arcSource.addFeatures(new GeoJSON().readFeatures(arcData));
                nodeSource.addFeatures(new GeoJSON().readFeatures(nodeData));

                const arcLayer = new VectorLayer({
                    source: arcSource,
                    style: (feature) => lineStyle(feature, trainLine),
                });
                const nodeLayer = new VectorLayer({
                    source: nodeSource,
                    style: (feature) => nodeStyle(feature, trainLine),
                });
                const trainLayer = new VectorLayer({
                    source: trainSource,
                    style: (feature) =>
                        trainStyle(feature, trainLine, filterDirection),
                });

                map = new Map({
                    target: mapRef.current,
                    layers: [
                        new TileLayer({
                            source: new OSM(),
                        }),
                        arcLayer,
                        nodeLayer,
                        trainLayer,
                    ],
                    view: new View({
                        center: fromLonLat([-71.07777, 42.35313]),
                        zoom: 12,
                    }),
                });
            } catch (error) {
                console.error("Failed to load Data:", error);
            }
        };

        initializeMap();
        fetchTrainLocations(trainSource);

        // Timer For refresh 5000 ms = 5 seconds
        const intervalId = setInterval(
            () => fetchTrainLocations(trainSource),
            5000
        );

        return () => {
            clearInterval(intervalId);
            if (map) {
                map.setTarget(null);
            }
        };
    }, [trainLine, filterDirection]);

    return (
        <div>
            <div ref={mapRef} style={mapStyles.map}></div>
            <Buttons
                handleButtonClick={(trainLine) =>
                    handleButtonClick(trainLine, setPressedButton)
                }
                handleDirectionClick={(direction) =>
                    handleDirectionClick(direction, setFilterDirection)
                }
                resetMap={() =>
                    resetMap(
                        map,
                        fromLonLat,
                        setFilterDirection,
                        setPressedButton
                    )
                }
                pressedButton={pressedButton}
                filterDirection={filterDirection}
                filterColor={trainLine}
            />
        </div>
    );
};

export default MapComponent;
