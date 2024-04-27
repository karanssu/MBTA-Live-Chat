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
import { mapStyles } from "./mapStyles";
import { lineStyle, stationDotStyle, trainStyle } from "./styleFunctions";
import { fetchTrainLocations } from "./fetchTrainLocations";

const MapComponent = ({
    trainLine,
    greenSubLine,
    inboundChecked,
    outboundChecked,
}) => {
    const mapRef = useRef();
    let map;

    const getDirection = (inboundChecked, outboundChecked) => {
        if (
            (inboundChecked && outboundChecked) ||
            (!inboundChecked && !outboundChecked)
        ) {
            return "";
        } else if (inboundChecked) {
            return "1";
        } else if (outboundChecked) {
            return "0";
        }

        return "";
    };

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
                    style: (feature) => stationDotStyle(feature, trainLine),
                });
                const trainLayer = new VectorLayer({
                    source: trainSource,
                    style: (feature) =>
                        trainStyle(
                            feature,
                            trainLine,
                            getDirection(inboundChecked, outboundChecked),
                            inboundChecked,
                            outboundChecked,
                            greenSubLine
                        ),
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
                        zoom: 13,
                        rotation: 0,
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
    }, [trainLine, inboundChecked, outboundChecked, greenSubLine]);

    return (
        <>
            <div ref={mapRef} style={mapStyles.map}></div>
        </>
    );
};

export default MapComponent;
