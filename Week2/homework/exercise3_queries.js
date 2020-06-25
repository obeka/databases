const mysql = require('mysql');
const connection = mysql.createConnection({
host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'week2_hw'
});
connection.connect();

//1.Write a query that prints names of all Authors and their corresponding Collaborators.

const sql_1 = 
`SELECT 
    a.author_no, a.author_name, c.author_name AS Collaborator
FROM authors a
JOIN authors c
    ON a.collaborator = c.author_no;`

connection.query(sql_1, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//2.Write a query that prints all columns of Authors and their published paper_title. If there is an author without any Research_Papers, print the information of that Author too.

//Author 104 has no paper. So her/his paper_title will be NULL due to LEFT JOIN.

const sql_2 = 
`
SELECT 
    a.author_no, a.author_name, a.university, a.h_index, a.gender, a.Collaborator, rp.paper_title
FROM authors a
LEFT JOIN authors_papers ap
	USING(author_no)
LEFT JOIN research_papers rp
    ON rp.paper_id = ap.paper_id;
`

connection.query(sql_2, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

connection.end();