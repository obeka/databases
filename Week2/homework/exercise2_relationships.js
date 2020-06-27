const util = require('util');
const mysql = require('mysql');
const papers = require('./inserts/papers');
const author_papers = require('./inserts/author_papers');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2_hw'
});

const execQuery = util.promisify(connection.query.bind(connection));

const createAuthorTable = async () => {

  const CREATE_RESEARCH_TABLE = `
    CREATE TABLE IF NOT EXISTS Research_Papers(
        paper_id INT PRIMARY KEY AUTO_INCREMENT,
        paper_title VARCHAR(50),
        conference VARCHAR(50),
        publish_date DATETIME
    );
    `;

  //There is many-to-many relationship between AUTHOR and RESEARCH_PAPERS tables; A research can be stuied by many authors, likewise an author can be worked on more than one research. So we need another table for the relation since it is a many-to-many relationship.

  const AUTHOR_RESEARCH_TABLE = `
    CREATE TABLE IF NOT EXISTS authors_papers(
        author_no INT,
        paper_id INT,
        PRIMARY KEY(author_no,paper_id),
        FOREIGN KEY(author_no) REFERENCES authors(author_no),
        FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id)
    );
    `
  connection.connect();

  try {
    await Promise.all[execQuery(CREATE_RESEARCH_TABLE), execQuery(AUTHOR_RESEARCH_TABLE)];

    papers.forEach(async (paper) =>
      await execQuery('INSERT INTO Research_Papers SET ?', paper));

    author_papers.forEach(async (author_paper) =>
      await execQuery('INSERT INTO authors_papers SET ?', author_paper));

  } catch (error) {
    console.error(error);
  }

  connection.end();
}

createAuthorTable();