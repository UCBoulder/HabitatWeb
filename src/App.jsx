import Observations from './Observations';
import Map from './Map';
import './App.css';

function App() {
  return (
    <div className='app-container'>
      <Map />
      <div>
        <Observations />
      </div>
    </div>
  );
}

export default App;
