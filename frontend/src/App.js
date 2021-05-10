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
