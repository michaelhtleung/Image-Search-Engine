// mysql set up
var mysql = require('mysql');
const fs = require('fs');
let rawdata = fs.readFileSync('./credentials/shopify_login.json');
let config = JSON.parse(rawdata);
var db = mysql.createConnection(config);
db.connect(function(err) {
    if (err) throw err;

    // custom packages
    const helpers = require('./helpers')

    // Imports the Google Cloud client library
    const {Storage} = require('@google-cloud/storage');
    const storage_client = new Storage();
    // Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');
    const vision_client = new vision.ImageAnnotatorClient();

    // web server packages
    const port = 8080
    const express = require('express');
    const app = express();

    var cors = require('cors');
    app.use(cors());

    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', async (req, res) => {
        res.send(await helpers.root_get_images_authors_presentation_data(db, storage_client))
    })

    app.post('/searchImagesByText', async (req, res) => {
        let search_terms = req.body || '';
        search_terms = search_terms.search_terms;
        search_terms = search_terms.split(" ");
        res.send(await helpers.searchImagesByText_get_images_authors_presentation_data (db, storage_client, search_terms))
    })

    app.post('/searchImagesByImages', async (req, res) => {
        let search_terms = ''
        let searchTextFromImage = await vision_client.objectLocalization(req.body.search_image);
        searchTextFromImage.forEach(text => {
            search_terms += ` ${text}`;
        });
        search_terms = search_terms.split(" ");
        res.send(await helpers.searchImagesByText_get_images_authors_presentation_data (db, storage_client, search_terms))
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
});

