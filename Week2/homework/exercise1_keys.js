const util = require('util');
const mysql = require('mysql');
const authors = require('./inserts/authors');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
  });

const execQuery = util.promisify(connection.query.bind(connection));

const createAuthorTable = async () => {
    const CREATE_A_DATABASE = `
        CREATE DATABASE IF NOT EXISTS week2_hw
    `;

    const SELECT_DB = `
        USE week2_hw;
    `;

    const CREATE_AUTHOR_TABLE = `
    CREATE TABLE IF NOT EXISTS Authors (
        author_no INT PRIMARY KEY,
        author_name VARCHAR(50),
        university VARCHAR(50),
        date_of_birth DATETIME,
        h_index INT,
        gender ENUM('m', 'f')
    );
    `;
    const ADD_COLUMN_TO_AUTHOR_TABLE = `
        ALTER TABLE Authors ADD COLUMN Collaborator INT;
    `;
    const ADD_FK_TO_AUTHOR_TABLE = `
        ALTER TABLE authors ADD FOREIGN KEY(Collaborator) REFERENCES authors(author_no);
    `;

    connection.connect();

  try {
    await Promise.all[execQuery(CREATE_A_DATABASE), execQuery(SELECT_DB), execQuery(CREATE_AUTHOR_TABLE), execQuery(ADD_COLUMN_TO_AUTHOR_TABLE),
    execQuery(ADD_FK_TO_AUTHOR_TABLE)];

    await Promise.all(authors.map(author =>
      execQuery('INSERT INTO authors SET ?', author)
    ));

  } catch (error) {
    console.error(error);
  }

  connection.end();
}

createAuthorTable();
