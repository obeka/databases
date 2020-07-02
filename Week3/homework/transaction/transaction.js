const mysql = require('mysql');
const execQuery = require('./tr-create-tables');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'week3_hw'
});

const transaction = async () => {
    connection.connect();
    
    const SET_AUTOCOMMIT = `
    SET AUTOCOMMIT = 0;
    `
    const START_TRANSACTION = `
    START TRANSACTION;
    `
    const UPDATE_ACCOUNT_TABLE_101 = `UPDATE account SET balance = balance - 1000 WHERE account_number = 101;`

    const UPDATE_ACCOUNT_TABLE_102 = `UPDATE account SET balance = balance + 1000 WHERE account_number = 102;`

    const INSERT_TRANSACTION_TO_ACCOUNT_CHANGE = `
    INSERT INTO account_changes(account_number,amount,changed_date,remark) VALUES(101,1000,'2020-01-01', 'To 102 - Sent'), (102,1000,'2020-01-01','From 101 - Incoming');
    `
    const END_TRANSACTION = `COMMIT;`


    try {
 
        await Promise.all[execQuery(SET_AUTOCOMMIT), execQuery(START_TRANSACTION), execQuery(UPDATE_ACCOUNT_TABLE_101), execQuery(UPDATE_ACCOUNT_TABLE_102), execQuery(INSERT_TRANSACTION_TO_ACCOUNT_CHANGE), execQuery(END_TRANSACTION)];
 
    } catch (error) {
        console.error(error);
    }
    connection.end();

}

transaction();