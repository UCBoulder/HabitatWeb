import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCbAVEkhkMf11mpQXOUFzmyhFCCo_fmu3M'
  });

  return (
    <div className='map-container'>
      {isLoaded ? (
        <GoogleMap
          center={{
            lat: 38.5449,
            lng: -106.9329,
          }}
          zoom={13}
          mapContainerStyle={{
            width: '100%',
            height: '100%'
          }}
        />
      ) : null}
    </div>
  );
}

export default Map;
