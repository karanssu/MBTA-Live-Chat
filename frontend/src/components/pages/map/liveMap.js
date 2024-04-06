import React, { useRef, useEffect, useState } from 'react';
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
import Icon from 'ol/style/Icon';
import trainIcon from './train.png';

const MapComponent = () => {
  const mapRef = useRef();
  let map;

  const [filterColor, setFilterColor] = useState('');
  const [filterDirection, setFilterDirection] = useState(''); 
  const [pressedButton, setPressedButton] = useState('');

  const arcSource = new VectorSource(), nodeSource = new VectorSource(), trainSource = new VectorSource();

  useEffect(() => {
    const loadGeoJSONData = async (geojsonPath) => {
      const response = await fetch(geojsonPath);
      return await response.json();
    };

    function lineStyle(feature) {
      const lineColor = feature.get('LINE');
      let color;

      switch (lineColor) {
        case 'BLUE': color = 'blue'; break;
        case 'RED': color = 'red'; break;
        case 'GREEN': color = 'green'; break;
        case 'ORANGE': color = 'orange'; break;
        default: color = 'rgba(0, 0, 0, 0)';
      }

      if (filterColor && filterColor !== lineColor) {
        color = 'rgba(0, 0, 0, 0)';
      }

      return new Style({
        stroke: new Stroke({
          color: color,
          width: 4.5,
        }),
      });
    }

    function nodeStyle(feature) {
      const nodeColor = feature.get('LINE');
      let visibility = 'white';
      
      if (filterColor && filterColor !== nodeColor) {
        visibility = 'rgba(0, 0, 0, 0)';
      }
    
      return new Style({
        image: new Circle({
          radius: 3,
          fill: new Fill({
            color: visibility,
          }),
        }),
      });
    }

    const trainStyle = (feature) => {
      const trainLine = feature.get('LINE').toUpperCase(); 
      const direction = feature.get('DIRECTION');
      let isVisible = true;
    
      if (filterColor) {
        const isGreenFilter = filterColor.toUpperCase() === 'GREEN';
        const isGreenLine = trainLine.includes('GREEN'); 
        
        if ((isGreenFilter && !isGreenLine) || (!isGreenFilter && filterColor.toUpperCase() !== trainLine)) {
          isVisible = false;
        }
      }
      
      if (filterDirection && filterDirection !== direction) {
        isVisible = false;
      }
    
      return new Style({
        image: new Icon({
          opacity: isVisible ? 1 : 0, 
          src: trainIcon, 
          scale: 0.04, 
          anchor: [0.5, 0.5], 
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction'
        }),
      });
    };
    
    const fetchTrainLocations = async () => {
      const lines = ['Green', 'Green-B', 'Green-C', 'Green-D', 'Green-E','Blue', 'Orange', 'Red'];

      const trainData = await Promise.all(lines.map(async (line) => {
        const response = await fetch(`https://api-v3.mbta.com/vehicles?filter[route]=${line}&api_key=7e8e5d37481347e197271921b930d523`);
        return response.json();
      }));

      const locations = trainData.flatMap(data => data.data.map(vehicle => ({
        type: 'Feature',
        properties: {
          LINE: vehicle.relationships.route.data.id, 
          DIRECTION: vehicle.attributes.direction_id.toString(),
        },
        geometry: {
          type: 'Point',
          coordinates: [vehicle.attributes.longitude, vehicle.attributes.latitude],
        },
      })));
      
      const features = new GeoJSON().readFeatures({type: 'FeatureCollection', features: locations}, {featureProjection: 'EPSG:3857'});
      trainSource.clear(true);
      trainSource.addFeatures(features);
    };

    const initializeMap = async () => {
      try {
        const arcData = await loadGeoJSONData('arc.geojson');
        const nodeData = await loadGeoJSONData('node.geojson');

        arcSource.addFeatures(new GeoJSON().readFeatures(arcData));
        nodeSource.addFeatures(new GeoJSON().readFeatures(nodeData));

        const arcLayer = new VectorLayer({source: arcSource,style: lineStyle,});
        const nodeLayer = new VectorLayer({source: nodeSource,style: nodeStyle, });
        const trainLayer = new VectorLayer({source: trainSource,style: trainStyle,});

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
        console.error('Failed to load Data:', error);
      }
    };

    initializeMap();
    fetchTrainLocations();

    // Timer For refresh 800 ms = 0.8 seconds
    const intervalId = setInterval(fetchTrainLocations, 800);

    return () => {
      clearInterval(intervalId);
      if (map) {
        map.setTarget(null);
      }
    };
  }, [filterColor, filterDirection]); 

  const handleButtonClick = (color) => {
    setFilterColor(color);
    setPressedButton(color);
  };
  
  const handleDirectionClick = (direction) => { 
    setFilterDirection(direction);
  };

  const resetMap = () => {
    if (!map) {
      console.error('Map not initialized');
      return;
    }
    const bostonCords = fromLonLat([-71.07777, 42.35313]);
    map.getView().setCenter(bostonCords);
    map.getView().setZoom(12);
    setFilterColor('');
    setFilterDirection(''); 
    setPressedButton('');
  };

  return (
    <div>
      <div
        ref={mapRef}
        style={{
          width: '600px',
          height: '400px',
          margin: 'auto',
          marginTop: '1%',
          WebkitBoxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
          MozBoxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
          boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
        }}

        // Buttons
      ></div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button
        style={{
          color: pressedButton === 'BLUE' ? 'blue' : 'black',
          fontWeight: pressedButton === 'BLUE' ? 'bold' : 'normal' 
        }}
        onClick={() => handleButtonClick('BLUE')}>Blue</button>
      <button
        style={{
          color: pressedButton === 'RED' ? 'red' : 'black',
          fontWeight: pressedButton === 'RED' ? 'bold' : 'normal' 
        }}
        onClick={() => handleButtonClick('RED')}>Red</button>
      <button
        style={{
          color: pressedButton === 'GREEN' ? 'green' : 'black',
          fontWeight: pressedButton === 'GREEN' ? 'bold' : 'normal' 
        }}
        onClick={() => handleButtonClick('GREEN')}>Green</button>
      <button
        style={{
          color: pressedButton === 'ORANGE' ? 'orange' : 'black',
          fontWeight: pressedButton === 'ORANGE' ? 'bold' : 'normal' 
        }}
        onClick={() => handleButtonClick('ORANGE')}>Orange</button>
      <br></br>
        <button 
        style={{ 
          color: filterDirection === '0' && filterColor ? filterColor.toLowerCase() : 'black', 
          fontWeight: filterDirection === '0' ? 'bold' : 'normal'
        }} 
        onClick={() => handleDirectionClick('0')}>Outbound</button>
      <button style={{ 
          color: filterDirection === '1' && filterColor ? filterColor.toLowerCase() : 'black', 
          fontWeight: filterDirection === '1' ? 'bold' : 'normal' 
        }} 
        onClick={() => handleDirectionClick('1')}>Inbound</button>
        <br></br>
      <button onClick={resetMap}>Reset All</button>
      </div>
    </div>
  );
};

export default MapComponent;