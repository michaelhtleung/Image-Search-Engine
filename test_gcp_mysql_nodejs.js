var mysql = require('mysql');
const fs = require('fs');

let rawdata = fs.readFileSync('./credentials/shopify_login.json');
let config = JSON.parse(rawdata);

var con = mysql.createConnection(config);

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM image", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});
