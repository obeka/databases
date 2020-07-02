const mysql = require('mysql');
const accounts = require('./inserts/accounts');
const account_changes = require('./inserts/account_changes')
const execQuery = require('./tr-create-tables');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'week3_hw'
});

const insertDataToTables = async () => {
    connection.connect();
    try {
        
        accounts.forEach(async (account) =>
            await execQuery('INSERT INTO account SET ?', account));

        account_changes.forEach(async (change) =>
            await execQuery('INSERT INTO account_changes SET ?', change));

    } catch (error) {
        console.error(error);
    }
    connection.end();
}

insertDataToTables();