import './App.css';
import NavBar from './NavBar';
import ContentDisplayRegion from './ContentDisplayRegion';
import React, {useState, useEffect} from 'react';
import axios from "axios";

function App() {
    let [imageCardData, setImageCardData] = useState({data: []});
    useEffect(async () => {
        // local:
        // let uri = 'http://localhost:8080/';
        // production:
        let uri = 'https://shopify-dev-challenge-f21.uc.r.appspot.com/api/';
        try {
            let cardData = await axios.get(uri);
            // alert('GET response received');
            setImageCardData(cardData);
        } catch (error) {
            alert(error);
        }
    //    empty array makes useEffect run only on initial page load
    }, []);
    return (
        <div className="App">
            <NavBar updateImageCardData={(newImageCardData) => setImageCardData(newImageCardData)}></NavBar>
            <ContentDisplayRegion imageCardData={imageCardData}></ContentDisplayRegion>
        </div>
    );
}

export default App;
