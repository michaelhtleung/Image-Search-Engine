// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
// Creates a client
const storage = new Storage();
// The ID of your GCS bucket
const bucketName = 'shopify_michael';

async function main() {
    try{
        let file_names = await get_gcp_file_names(); // array
        // console.log(file_names)
        let file_search_terms = await detect_objects(file_names); // 2D array
        console.log(file_search_terms)
        // for (let i = 0; i < file_names.length; i++){
        //     for (let j = 0; j < file_search_terms[i].length; j++){
        //         await insert_photo_data_to_db(file_names[i], file_search_terms[i]);
        //     }
        // }
    } catch (err) {
        console.log(err);
    }
}

async function insert_photo_data_to_db(file_name, file_search_term){
    const date = require('date-and-time');
    const now = new Date();
    date.format(now, 'YYYY:MM:DD HH:mm:ss');

    var mysql = require('mysql');
    const fs = require('fs');

    let rawdata = fs.readFileSync('./credentials/shopify_login.json');
    let config = JSON.parse(rawdata);

    var con = mysql.createConnection(config);

    con.connect(function(err) {
        if (err) throw err;
        // con.query("SELECT * FROM image", function (err, result, fields) {
        //     if (err) throw err;
        //     console.log(result);
        // });

        let fileName = file_name;
        const gcsUri = `gs://${bucketName}/${fileName}`;
        const image_query = `INSERT INTO image( author_id, uri, public, pixels_width, pixels_height, datetime_upload) values ( 0, ${gcsUri}, 0, 0, 0, ${now}, );`
        // insert into image table
        con.query(image_query, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            // insert into search_term table
            // insert into images_search_terms table
        });
    });
}

async function detect_objects(file_names){
    // Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    let file_search_terms = file_names.map(file => [])
    for (let i = 0; i < file_names.length; i++) {
        let fileName = file_names[i]
        const gcsUri = `gs://${bucketName}/${fileName}`;
        const [result] = await client.objectLocalization(gcsUri);
        const objects = result.localizedObjectAnnotations;
        file_search_terms[i] = objects.map(object => object.name.toLowerCase());
    }
    return file_search_terms;
}

async function get_gcp_file_names() {
    // Lists files in the bucket
    const [files] = await storage.bucket(bucketName).getFiles();
    // console.log('Files:');
    // files.forEach(file => {
    //     console.log(file.name);
    // });
    return files.map(file => file.name)
}

main()