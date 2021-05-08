import './App.css';
import NavBar from './NavBar';
import ContentDisplayRegion from './ContentDisplayRegion';
import React, {useState} from 'react';

function App() {
    // let [imageCardData, setImageCardData] = useState([]);
    // TODO: remove placeholder data when data fetching is done
    let placeholderData = [
        {
            "image_id": 1,
            "author_id": 1,
            "first_name": "Alice",
            "datetime_upload": "2021-05-07T21:16:43.000Z",
            "public": 0,
            "uri": "gs://shopify_michael/blue_chair.jpg",
        },
        {
            "image_id": 2,
            "author_id": 1,
            "first_name": "Alice",
            "datetime_upload": "2021-05-07T21:16:44.000Z",
            "public": 0,
            "uri": "gs://shopify_michael/brown_coat.jpg",
        },
        {
            "image_id": 3,
            "author_id": 1,
            "first_name": "Alice",
            "datetime_upload": "2021-05-07T21:16:44.000Z",
            "public": 0,
            "uri": "gs://shopify_michael/red_purse.jpg",
        },
    ];
    let [imageCardData, setImageCardData] = useState(placeholderData);
    return (
        <div className="App">
            <NavBar updateImageCardData={(newImageCardData) => setImageCardData(newImageCardData)}></NavBar>
            <ContentDisplayRegion imageCardData={imageCardData}></ContentDisplayRegion>
        </div>
    );
}

export default App;
