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

    // web server packages
    const port = 8080
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();

    // Imports the Google Cloud client library
    const {Storage} = require('@google-cloud/storage');
    const storage_client = new Storage();

    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', async (req, res) => {
        res.send(await helpers.root_get_images_authors_presentation_data(db, storage_client))
    })

    app.post('/searchImagesByText', async (req, res) => {
        let search_terms = req.body;
        search_terms = search_terms.search_terms;
        search_terms = search_terms.split(" ");
        res.send(await helpers.searchImagesByText_get_images_authors_presentation_data (db, storage_client, search_terms))
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })


    // URL: localhost:8080/searchImagesByImages
    // search_terms = set(gcp_object_detection(img)) + set(gcp_logo_detection(img))
    // query = build_sql_query(search_terms)
    // return images_authors_presentation_data = query1(query)
});

