const mysql = require('mysql');
const util = require('util');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world',
    multipleStatements: true
});

conn.connect();

function getPopulation(Country, name, code, cb) {
    conn.query(
        `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = ${code}`,
        function (err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            cb(null, result);
        }
    );
}

// With this query, I can get all the information from the country table
getPopulation('country', 'turkey', "'tur'; SELECT * from country;", (err, content) => {
    if (err) throw err;
    console.log(content);
});

//Using a question mark syntax to do the escaping and secure the query:
function getPopulationSecure(Country, name, code, cb) {
    conn.query(`SELECT Population FROM ${Country} WHERE Name = ? and code = ?`,
        [name, code],
        (err, result) => {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            cb(null, result);
        }
    );
}

getPopulationSecure('country', 'Turkey', 'TUR', (err, content) => {
    if (err) throw err;
    console.table(content)
})
conn.end();