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
import Overlay from 'ol/Overlay';
import { mapStyles } from "./mapStyles";
import {
    stationConnectlineStyle,
    stationDotStyle,
    trainIconStyle,
} from "./styleFunctions";
import { fetchTrainLocations } from "./fetchTrainLocations";
import { getMapData } from "./mapData";

const MapComponent = ({
    trainLine,
    greenSubLine,
    inboundChecked,
    outboundChecked,
}) => {
    const mapRef = useRef();
    const tooltipRef = useRef(null);
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

    const mapData = getMapData(trainLine, greenSubLine);
    console.log(mapData);

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
                    style: (feature) =>
                        stationConnectlineStyle(feature, trainLine),
                });
                const nodeLayer = new VectorLayer({
                    source: nodeSource,
                    style: (feature) => stationDotStyle(feature, trainLine),
                });
                const trainLayer = new VectorLayer({
                    source: trainSource,
                    style: (feature) =>
                        trainIconStyle(
                            feature,
                            trainLine,
                            getDirection(inboundChecked, outboundChecked),
                            inboundChecked,
                            outboundChecked,
                            greenSubLine,
                            map.get("view").get("zoom")
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
                
                const tooltip = new Overlay({
                    element: tooltipRef.current,
                    positioning: 'bottom-center',
                    offset: [0, -10],
                    stopEvent: false,
                });
                map.addOverlay(tooltip);

                map.on('pointermove', function (evt) {
                    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                        return feature;
                    }, {
                        hitTolerance: 2
                    });
                
                    if (feature && feature.get('STATION')) {
                        const pixel = map.getPixelFromCoordinate(feature.getGeometry().getCoordinates());
                        const offset = [-50, -50]; 
                        const position = map.getCoordinateFromPixel([pixel[0] + offset[0], pixel[1] + offset[1]]);
                        
                        tooltip.setPosition(position);
                        tooltipRef.current.innerHTML = feature.get('STATION');
                        tooltipRef.current.style.display = '';
                        map.getViewport().style.cursor = 'pointer';
                    } else {
                        tooltipRef.current.style.display = 'none';
                        map.getViewport().style.cursor = '';
                    }
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
            <div ref={tooltipRef} style={mapStyles.tooltip}></div>
        </>
    );
};

export default MapComponent;
