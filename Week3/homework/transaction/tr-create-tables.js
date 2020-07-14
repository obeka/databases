const util = require('util');
const mysql = require('mysql');
const { exec } = require('child_process');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
  });

const execQuery = util.promisify(connection.query.bind(connection));

const createAccountTableS = async () => {
    //Created a db for the homework
    const CREATE_A_DATABASE = `
        CREATE DATABASE IF NOT EXISTS week3_hw
    `;

    const SELECT_DB = `
        USE week3_hw;
    `;

    const CREATE_ACCOUNT_TABLE = `
    CREATE TABLE IF NOT EXISTS account (
        account_number INT PRIMARY KEY,
        balance INT 
    );
    `;

    const CREATE_ACCOUNT_CHANGES_TABLE = `
    CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT PRIMARY KEY AUTO_INCREMENT,
        account_number INT,
        amount INT,
        changed_date DATETIME,
        remark VARCHAR(50) 
    );
    `;

    connection.connect();

    const operations = [CREATE_A_DATABASE, SELECT_DB, CREATE_ACCOUNT_TABLE, CREATE_ACCOUNT_CHANGES_TABLE];

  try {
    /* await Promise.all[execQuery(CREATE_A_DATABASE),execQuery(SELECT_DB),execQuery(CREATE_ACCOUNT_TABLE),execQuery(CREATE_ACCOUNT_CHANGES_TABLE)];  */
    
    for(let i = 0; i < operations.length; i++) {
      await execQuery(operations[i]);
    }
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

createAccountTableS();

module.exports = execQuery;