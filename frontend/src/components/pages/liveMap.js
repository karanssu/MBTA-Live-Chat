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

const MapComponent = () => {
  const mapRef = useRef();
  let map;

  const [filterColor, setFilterColor] = useState('');
  const [pressedButton, setPressedButton] = useState('');

  useEffect(() => {
    const bostonCords = fromLonLat([-71.07777, 42.35313]);

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
        default:
          color = 'rgba(0, 0, 0, 0)'; //invis
      }
      //If filter color on and doesnt match current line color make invis
      if (filterColor && filterColor !== lineColor) {
        color = 'rgba(0, 0, 0, 0)'; 
      }
      return new Style({
        stroke: new Stroke({
          color: color,
          width: 5,
        }),
      });
    }

    function nodeStyle(feature) {
   // todo : Currently all white, will adjust later with visited nodes??
      const nodeColor = feature.get('LINE'); 
      let visibility = 'rgba(0, 0, 0, 0)'; 
    
      if (!filterColor || filterColor === nodeColor) {
        visibility = 'white'; 
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
          style: nodeStyle, 
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
              zoom: 12,
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
  }, [filterColor]); 

  const handleButtonClick = (color) => {
    setFilterColor(color);
    setPressedButton(color);
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
          border: '2px solid black',
          borderRadius: '3.5px', 
        }}
        ></div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button style={{ color: pressedButton === 'BLUE' ? 'blue' : 'black' }} onClick={() => handleButtonClick('BLUE')}>Blue</button>
          <button style={{ color: pressedButton === 'RED' ? 'red' : 'black' }} onClick={() => handleButtonClick('RED')}>Red</button>
          <button style={{ color: pressedButton === 'GREEN' ? 'green' : 'black' }} onClick={() => handleButtonClick('GREEN')}>Green</button>
          <button style={{ color: pressedButton === 'ORANGE' ? 'orange' : 'black' }} onClick={() => handleButtonClick('ORANGE')}>Orange</button>
          <button onClick={() => { setFilterColor(''); setPressedButton(''); }}>Clear All</button>
        </div>
      </div>
  );
};

export default MapComponent;