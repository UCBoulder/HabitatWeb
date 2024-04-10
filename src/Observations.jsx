import { useEffect, useState } from "react";
import './Observations.css';

function Observations() {
    const [observations, setObservations] = useState([]);

    const [verificationRating, setVerificationRating] = useState('1'); // 1 for default rating.

    const [message, setMessage] = useState(''); 

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
        },
        "ObservationID": { "S": "" } 
    });

    const [obsId, setObservationId] = useState(0);

    useEffect(() => { 
        fetch("/src/assets/sample-response.json")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setObservations(data);
                setObs(data.Items[0]);
            });
    }, []);

    function nextObservation() {
        if (observations.Items && obsId < observations.Items.length - 1) {
            setObs(observations.Items[obsId + 1]);
            setObservationId(obsId + 1);
        }
    }

    function prevObservation() {
        if (obsId > 0) {
            setObs(observations.Items[obsId - 1]);
            setObservationId(obsId - 1);
        }
    }

    function handleVerificationRating(rating) {
        //0- no 1- default 2- yes 3- maybe
        //0 - delete reqeust, send delete request with observation ID and user id fields
        //2 - send post request with observation id, user id, and VefificationRating =2 
        //3 - send post request with observation id, user id, and VefificationRating =3 

        setVerificationRating(rating); // Update the rating state

        const payload = {
            ObservationID: obs.ObservationID.S,
            VerificationRating: rating,
            UserID: obs.UserID.S,
        };

        if(verificationRating == 0){
            fetch("https://lt0clq58fh.execute-api.us-east-1.amazonaws.com/Verify/Verify", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }) 
            .then(response => response.json())
            .then(data => {
                setMessage("Success");
            })
            .catch((error) => {
                setMessage("Error: " + error.message);
            }); 
        }
        else if(verificationRating == 2 || verificationRating == 3){
            fetch("https://lt0clq58fh.execute-api.us-east-1.amazonaws.com/Verify/Verify", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            })
            .then(response => response.json())
            .then(data => {
                setMessage("Success");
            })
            .catch((error) => {
                setMessage("Error: " + error.message);
            }); 

            if(verificationRating == 2){
                obs.VerificationRating = 2;
            }
            else if(verificationRating = 3){
                obs.verificationRating = 3;
            }
        } 
    }

    return (
        <>
            <div>Observation {obsId + 1}</div>
            <img className="observation-image" src={obs.observationImageURL.S} alt="Observation"></img>
            <div>{obs.Notes.M.description.S}</div>
            <div className="button-group">
                <button className="btn not-cheatgrass" onClick={() => handleVerificationRating('0')}>Not Cheatgrass</button>
                <button className="btn maybe-cheatgrass" onClick={() => handleVerificationRating('3')}>Maybe Cheatgrass</button>
                <button className="btn cheatgrass" onClick={() => handleVerificationRating('2')}>Cheatgrass</button>
            </div>
            <div>
                <button disabled={obsId == 0} onClick={prevObservation}>Previous</button>
                <button onClick={nextObservation}>Next</button>
            </div>
            <div className="message">{message}</div>
        </>
    )
}

export default Observations;
