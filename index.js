// custom packages
const helpers = require('./helpers')

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
const storage_client = new Storage();

// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');
// Creates a client
const vision_client = new vision.ImageAnnotatorClient();

// web server packages
const express = require('express');
const app = express();
app.enable('trust proxy');
// This middleware is available in Express v4.16.0 onwards
app.use(express.json());

var multer = require('multer');
var upload = multer();
// for parsing multipart/form-data
app.use(upload.array());


// needed for dev, not for prod:
var cors = require('cors');
app.use(cors());


// Serve static files from the React app
// const path = require('path');
// app.use(express.static(
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// mysql set up
const mysql = require('promise-mysql');

// [START cloud_sql_mysql_mysql_create_tcp]
const createTcpPool = async config => {
    // Extract host and port from socket address
    const dbSocketAddr = process.env.DB_HOST.split(':');

    // Establish a connection to the database
    return await mysql.createPool({
        user: process.env.DB_USER, // e.g. 'my-db-user'
        password: process.env.DB_PASS, // e.g. 'my-db-password'
        database: process.env.DB_NAME, // e.g. 'my-database'
        host: dbSocketAddr[0], // e.g. '127.0.0.1'
        port: dbSocketAddr[1], // e.g. '3306'
        // ... Specify additional properties here.
        ...config,
    });
};
// [END cloud_sql_mysql_mysql_create_tcp]

// [START cloud_sql_mysql_mysql_create_socket]
const createUnixSocketPool = async config => {
    const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

    // Establish a connection to the database
    return await mysql.createPool({
        user: process.env.DB_USER, // e.g. 'my-db-user'
        password: process.env.DB_PASS, // e.g. 'my-db-password'
        database: process.env.DB_NAME, // e.g. 'my-database'
        // If connecting via unix domain socket, specify the path
        socketPath: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
        // Specify additional properties here.
        ...config,
    });
};
// [END cloud_sql_mysql_mysql_create_socket]

const createPool = async () => {
    const config = {
        // [START cloud_sql_mysql_mysql_limit]
        // 'connectionLimit' is the maximum number of connections the pool is allowed
        // to keep at once.
        connectionLimit: 5,
        // [END cloud_sql_mysql_mysql_limit]

        // [START cloud_sql_mysql_mysql_timeout]
        // 'connectTimeout' is the maximum number of milliseconds before a timeout
        // occurs during the initial connection to the database.
        connectTimeout: 10000, // 10 seconds
        // 'acquireTimeout' is the maximum number of milliseconds to wait when
        // checking out a connection from the pool before a timeout error occurs.
        acquireTimeout: 10000, // 10 seconds
        // 'waitForConnections' determines the pool's action when no connections are
        // free. If true, the request will queued and a connection will be presented
        // when ready. If false, the pool will call back with an error.
        waitForConnections: true, // Default: true
        // 'queueLimit' is the maximum number of requests for connections the pool
        // will queue at once before returning an error. If 0, there is no limit.
        queueLimit: 0, // Default: 0
        // [END cloud_sql_mysql_mysql_timeout]

        // [START cloud_sql_mysql_mysql_backoff]
        // The mysql module automatically uses exponential delays between failed
        // connection attempts.
        // [END cloud_sql_mysql_mysql_backoff]
    };
    if (process.env.DB_HOST) {
        return await createTcpPool(config);
    } else {
        return await createUnixSocketPool(config);
    }
};

const createPoolAndEnsureSchema = async () =>
    await createPool()
        .then(async pool => {
            return pool;
        })
        .catch(err => {
            logger.error(err);
            throw err;
        });

// Set up a variable to hold our connection pool. It would be safe to
// initialize this right away, but we defer its instantiation to ease
// testing different configurations.
let pool;

app.use(async (req, res, next) => {
    if (pool) {
        return next();
    }
    try {
        pool = await createPoolAndEnsureSchema();
        next();
    } catch (err) {
        logger.error(err);
        return next(err);
    }
});


// endpoints:
app.get('/api/', async (req, res) => {
    pool = pool || (await createPoolAndEnsureSchema());
    try {
        res.send(await helpers.root_get_images_authors_presentation_data(pool, storage_client))
    } catch(error) {
        res.status(500).send(error).end();
    }
})

app.post('/api/searchImagesByText', async (req, res) => {
    pool = pool || (await createPoolAndEnsureSchema());
    try {
        let search_terms = req.body;
        search_terms = search_terms.search_terms;
        search_terms = search_terms.split(" ");
        res.send(await helpers.searchImagesByText_get_images_authors_presentation_data (pool, storage_client, search_terms))
    } catch(error) {
        res.status(500).send(error).end();
    }
})

app.post('/api/searchImagesByImages', async(req, res) => {
    pool = pool || (await createPoolAndEnsureSchema());
    try {
        let imageBuffer = req.body
        imageBuffer = imageBuffer.base64

        // Base64 encoded string
        const base64 = imageBuffer;
        // create a buffer
        const buff = new Buffer(base64, 'base64');

        imageBuffer = buff;
        let search_terms = await helpers.detect_objects_locally(vision_client, imageBuffer);
        res.send(await helpers.searchImagesByText_get_images_authors_presentation_data (pool, storage_client, search_terms))
    } catch(error) {
        res.status(500).send(error).end();
    }
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

process.on('unhandledRejection', err => {
    console.error(err);
    throw err;
});

module.exports = server;
