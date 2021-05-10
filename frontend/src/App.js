import './App.css';
import NavBar from './NavBar';
import ContentDisplayRegion from './ContentDisplayRegion';
import React, {useState, useEffect} from 'react';
import axios from "axios";

function App() {
    // -1 means initial page load
    // [] means no results found
    let [imageCardData, setImageCardData] = useState(-1);
    // let [detectedObjectName, setDetectedObjectName] = useState(undefined);
    useEffect(() => {
        alert(`Try searching fashion items like these:
        1. bag
        2. belt
        3. bracelet
        4. dress
        5. glasses
        6. hat
        7. shoe
        `);
    }, []);
    return (
        <div className="App">
            <NavBar
                updateImageCardData={(newImageCardData) => setImageCardData(newImageCardData)}
                updateDetectedObjectanem
            ></NavBar>
            <ContentDisplayRegion
                imageCardData={imageCardData}
                // detectedObjectName={detectedObjectName}
            ></ContentDisplayRegion>
        </div>
    );
}

export default App;
