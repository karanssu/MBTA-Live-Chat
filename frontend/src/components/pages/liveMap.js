import React, { useRef, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { Style, Stroke, Circle, Fill } from 'ol/style';

const MapComponent = () => {
  const mapRef = useRef();
  let map; 

  useEffect(() => {
    const bostonCords = fromLonLat([-71.0589, 42.3601]);

    const loadGeoJSONData = async (geojsonPath) => {
      const response = await fetch(geojsonPath);
      return await response.json();
    };

    function lineStyle(feature) {
      const lineColor = feature.get('LINE');
      let color;
      switch (lineColor) {
        case 'BLUE':
          color = 'blue';
          break;
        case 'RED':
          color = 'red';
          break;
        case 'GREEN':
          color = 'green';
          break;
        case 'ORANGE':
          color = 'orange';
          break;
      }
      return new Style({
        stroke: new Stroke({
          color: color,
          width: 5,
        }),
      });
    }

    const initializeMap = async () => {
      try {
        const arcData = await loadGeoJSONData('arc.geojson');
        const nodeData = await loadGeoJSONData('node.geojson');

        const arcSource = new VectorSource({
          features: new GeoJSON().readFeatures(arcData),
        });

        const nodeSource = new VectorSource({
          features: new GeoJSON().readFeatures(nodeData),
        });

        const arcLayer = new VectorLayer({
          source: arcSource,
          style: lineStyle, 
        });

        const nodeLayer = new VectorLayer({
          source: nodeSource,
          style: new Style({
            image: new Circle({
              radius: 3,
              fill: new Fill({
                color: 'white', 
              }),
            }),
          }),
        });

        if (!map) {
          map = new Map({
            target: mapRef.current,
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
              arcLayer,
              nodeLayer,
            ],
            view: new View({
              center: bostonCords,
              zoom: 11.5,
            }),
          });
        }
      } catch (error) {
        console.error('Failed to load GeoJSON data:', error);
      }
    };

    initializeMap();

    return () => {
      if (map) {
        map.setTarget(null); 
      }
    };
  }, []); 

  return <div ref={mapRef} style={{ width: '600px', height: '400px', marginLeft: '30%', marginTop: '3%' }}></div>;
};

export default MapComponent;