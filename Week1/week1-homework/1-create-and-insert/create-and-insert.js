const mysql = require('mysql');
const invitees = require('./inserts/invitees');
const rooms = require('./inserts/room');
const meeting = require('./inserts/meeting');

//Connect to the mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
});
connection.connect();

//Drop a database
connection.query("DROP DATABASE IF EXISTS meetup", (err, results, fields) => {
    if (err) throw err;
    console.log('Database dropped...')
});

//Create a database
const database_query = "CREATE DATABASE IF NOT EXISTS meetup";
connection.query(database_query, (err, results, fields) => {
    if (err) throw err;
    console.log('Database created...')
});

//Select a database
connection.query("USE meetup", (err, results, fields) => {
    if (err) throw err;
    console.log('Database selected...')
});

//CREATING TABLES
const table_queries = [
    "CREATE TABLE Invitee (invitee_no int(3) ZEROFILL, invitee_name varchar(50), invited_by varchar(50))",
    "CREATE TABLE Room (room_no int, room_name varchar(50), floor_number int)",
    "CREATE TABLE Meeting (meeting_no int(3) ZEROFILL, meeting_title varchar(50), starting_time datetime, ending_time datetime, room_no int)"
];

table_queries.forEach(query => {
    connection.query(query, (err, results, fields) => {
        if (err) throw err;
        console.log('Table created.');
    })
});

//INSERTING VALUES TO RELATIVE TABLES WITH A FUNCTION
function insertToTable(tableName, tableContent) {
    tableContent.forEach(content => {
        connection.query(`INSERT INTO ${tableName} SET ?`, content, (err, results, fields) => {
            if (err) throw err;
            console.log(`Values added to the ${tableName} table.`)
        });
    });
}

insertToTable('Invitee', invitees);
insertToTable('Room', rooms);
insertToTable('Meeting', meeting);

connection.end();