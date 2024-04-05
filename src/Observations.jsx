import { useEffect, useState } from "react";
import './Observations.css';


function Observations() {
    const [observations, setObservations] = useState([]);
    const [obs, setObs] = useState({
        "observationImageURL": {
            "S": "https://via.placeholder.com/300"
        },
        "Notes": {
            "M": {
                "description": {
                    "S": "This is a placeholder observation"
                }
            }
        }
    });
    const [obsId, setObservationId] = useState(0);
    useEffect(() => { 
        fetch("/src/assets/sample-response.json")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setObservations(data);
                setObs(data.Items[0]);
                console.log(obs)
            });
    }, []);

    function nextObservation() {
        setObs(observations.Items[obsId + 1]);
        setObservationId(obsId + 1);
    }
    function prevObservation() {
        setObs(observations.Items[obsId - 1]);
        setObservationId(obsId - 1);
    }


    return (
        <>
            <div>Observation {obsId+1}</div>
            <img className="observation-image" src={obs.observationImageURL.S}></img>
            <div>{obs.Notes.M.description.S}</div>
            <div>
                <button disabled={obsId==0} onClick={prevObservation}>Previous</button>
                <button onClick={nextObservation}>Next</button>
            </div>
        </>
    )
}

export default Observations;