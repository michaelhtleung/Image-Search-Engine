const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000

app.get('/', (req, res) => {
    res.send('root')
})

app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// URL: localhost:8080/searchImagesByText
// query = build_sql_query(search_terms)
// return images_authors_presentation_data = query1(query)

// URL: localhost:8080/searchImagesByImages
// search_terms = set(gcp_object_detection(img)) + set(gcp_logo_detection(img))
// query = build_sql_query(search_terms)
// return images_authors_presentation_data = query1(query)

