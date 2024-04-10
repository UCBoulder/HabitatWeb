import { useEffect, useState } from "react";
import './Observations.css';

function Observations() {
    const [observations, setObservations] = useState({"Items":[]});

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
                },
                "cover": {
                    "S": ""
                }
            }
        },
        "ObservationID": { "S": "" },
        "VerificationRating": { "N": "1" },
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
        setVerificationRating(rating); // Update the rating state

        var o = observations;
        o.Items[obsId].VerificationRating.N = rating;
        setObservations(o);

        const payload = {
            ObservationID: obs.ObservationID.S,
            VerificationRating: rating,
        };

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

        nextObservation();
    }

    function selectedVerification(verify) {
        if (obs.VerificationRating.N == verify) {
            return "selected-rating";
        }
        return "";
    }

    function currentRating() {
        switch (obs.VerificationRating.N) {
            case '0':
                return "Not Cheatgrass";
            case '1':
                return "Not chosen";
            case '2':
                return "Cheatgrass";
            case '3':
                return "Maybe Cheatgrass";
            default:
                return "Unknown";
        }
    }

    return (
        <>
            <div className="flex-container">
                <img className="observation-image" src={obs.observationImageURL.S} alt="Observation"></img>
                <div className="details-container">
                    <div><b>Observation {obsId + 1} of {observations.Items.length}</b></div>
                    <div><b>Current Rating: </b>{currentRating()}</div>
                    <div className="button-group">
                        <button className={"btn not-cheatgrass " + selectedVerification(0)} onClick={() => handleVerificationRating('0')}>Not Cheatgrass</button>
                        <button className={"btn maybe-cheatgrass " + selectedVerification(3)} onClick={() => handleVerificationRating('3')}>Maybe Cheatgrass</button>
                        <button className={"btn cheatgrass " + selectedVerification(2)} onClick={() => handleVerificationRating('2')}>Cheatgrass</button>
                    </div>
                    <div className="button-group">
                        <button disabled={obsId == 0} onClick={prevObservation}>Previous</button>
                        <button onClick={nextObservation}>Next</button>
                    </div>
                    <div className="details"><b>Notes:</b> {obs.Notes.M.description.S}</div>
                    <div><b>Cover:</b> {obs.Notes.M.cover.S}</div>
                    <div className="message">{message}</div>
                </div>
            </div>
        </>
    )
}

export default Observations;
