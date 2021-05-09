import './App.css';
import NavBar from './NavBar';
import ContentDisplayRegion from './ContentDisplayRegion';
import React, {useState, useEffect} from 'react';
import axios from "axios";

function App() {
    // -1 means initial page load
    // [] means no results found
    let [imageCardData, setImageCardData] = useState(-1);
    return (
        <div className="App">
            <NavBar updateImageCardData={(newImageCardData) => setImageCardData(newImageCardData)}></NavBar>
            <ContentDisplayRegion imageCardData={imageCardData}></ContentDisplayRegion>
        </div>
    );
}

export default App;
