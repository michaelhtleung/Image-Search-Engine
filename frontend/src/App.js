import './App.css';
import NavBar from './NavBar';
import ContentDisplayRegion from './ContentDisplayRegion';
import React, {useState} from 'react';

function App() {
    // TODO: make a GET request for the most recent photos
    let [imageCardData, setImageCardData] = useState({data: []});
    return (
        <div className="App">
            <NavBar updateImageCardData={(newImageCardData) => setImageCardData(newImageCardData)}></NavBar>
            <ContentDisplayRegion imageCardData={imageCardData}></ContentDisplayRegion>
        </div>
    );
}

export default App;
