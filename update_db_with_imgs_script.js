const async = require('async');
// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
// Creates a client
const storage = new Storage();
// The ID of your GCS bucket
const bucketName = 'shopify_michael';

let global_file_index = 0;

async function main() {
    try{
        let file_names = await get_gcp_file_names(); // array
        // console.log(file_names)
        file_names = file_names.slice(0, 50)
        console.log('Got file names');
        let gcsUris = file_names.map((file_name) => `gs://${bucketName}/${file_name}`);
        // console.log(gcsUris)
        console.log('Got URIs');
        let file_search_terms = await detect_objects(gcsUris); // 2D array
        // console.log(file_search_terms)
        let async_func_list = file_names.map(()=>null);
        for (let file_index = 0; file_index < file_names.length; file_index++){
            async_func_list[file_index] = make_insert_photo_data_to_db(gcsUris[file_index], file_search_terms[file_index]); // string, [string]
        }
        await async.series(async_func_list)
        console.log('End of script.')
    } catch (err) {
        console.log(err);
    }
}

function make_insert_photo_data_to_db(uri, search_terms) {
    function insert_photo_data_to_db(callback){
        // TODO: replace this with date uploaded to bucket
        const date = require('date-and-time');
        let now = new Date();
        now = date.format(now, 'YYYY:MM:DD HH:mm:ss');

        var mysql = require('mysql');
        const fs = require('fs');
        let rawdata = fs.readFileSync('./credentials/shopify_login.json');
        let config = JSON.parse(rawdata);

        var con = mysql.createConnection(config);

        con.connect(function(err) {
            if (err) throw err;
            const image_query = `INSERT INTO image( author_id, uri, public, pixels_width, pixels_height, datetime_upload) values ( 1, "${uri}", 0, 0, 0, "${now}");`
            con.query(image_query, function (err, image_query_result, fields) {
                if (err) throw err;
                console.log(`file_index: ${global_file_index}`);
                global_file_index += 1;
                // insert into search_term table:
                let tasks = search_terms.map(()=>null);
                for (let i = 0; i < tasks.length; i++) {
                    tasks[i] = make_tasks(search_terms[i]);
                }
                function make_tasks(term) {
                    function insert_to_images_search_terms(image_id, search_term_id, smallback) {
                        // insert into images_search_terms table:
                        const images_search_terms_query = `INSERT INTO images_search_terms(image_id, search_term_id ) values (${image_id}, ${search_term_id});`;
                        con.query(images_search_terms_query , function (err, result, fields) {
                            // if there's an error from a duplicate row, ignore it
                            // if (!err) console.log(result);
                            smallback(null);
                        });
                    }
                    return (smallback) => {
                        let insert_term_query = `INSERT INTO search_term (term) values ('${term}')`;
                        con.query(insert_term_query, function (err, insert_term_query_result, fields) {
                            if (err) {
                                // if there's an error from an error from a duplicate row, find the original row's ID
                                const find_term_query = `SELECT id FROM search_term WHERE term="${term}"`;
                                con.query(find_term_query, function(err, find_term_result, fields) {
                                    if (err) throw err;
                                    insert_to_images_search_terms(image_query_result.insertId, find_term_result[0].id, smallback);
                                });
                            } else {
                                insert_to_images_search_terms(image_query_result.insertId, insert_term_query_result.insertId, smallback);
                            }
                        });
                    }
                }
                async.parallel(tasks, (err) => {
                    if (err) throw err;
                    callback(null);
                });
            });
        });
    }
    return insert_photo_data_to_db;
}

async function detect_objects(gcsUris){
    // Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    let file_search_terms = gcsUris.map(file => [])
    for (let i = 0; i < gcsUris.length; i++) {
        console.log(`CV: ${i}`);
        const [result] = await client.objectLocalization(gcsUris[i]);
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