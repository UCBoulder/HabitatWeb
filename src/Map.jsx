import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const leafletMap = L.map('map');
    setMap(leafletMap);

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        leafletMap.setView([latitude, longitude], 13);
        //L.marker([latitude, longitude]).addTo(leafletMap);
      },
      error => {
        console.error('Error getting current location:', error);
      }
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(leafletMap);

    // Return a cleanup function to remove the map instance when the component unmounts
    return () => {
      leafletMap.remove();
    };
  }, []); // Ensure useEffect runs only once when the component mounts

  return (
    <div>
      <div id="map" style={{ height: '400px' }}></div>
    </div>
  );
};

export default Map;

