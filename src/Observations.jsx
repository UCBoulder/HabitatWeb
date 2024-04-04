import { useEffect, useState } from "react";


function Observations() {
    const [observations, setObservations] = useState([]);
    const [obs, setObs] = useState();
    const [obsId, SetObservationId] = useState(0);
    useEffect(() => { 
        fetch("/src/assets/sample-response.json")
            .then(response => response.json())
            .then(data => {
                setObservations(data);
                setObs(data.Items[0]);
                console.log(obs.Notes)
            });
    });


    return (
        <>
            <h1>Heyo!</h1>
            <div>{obs.Notes.M.description.S}</div>
        </>
    )
}

export default Observations;