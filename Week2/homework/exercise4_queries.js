const mysql = require('mysql');
const connection = mysql.createConnection({
host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'week2_hw'
});
connection.connect();

//1. All research papers and the number of authors that wrote that paper.
const sql_1 = 
`
SELECT 
    rp.paper_title, count(a.author_no) AS total_author
FROM research_papers rp
JOIN authors_papers ap
    USING(paper_id)
JOIN authors a
    USING(author_no)
GROUP BY paper_title;
`

connection.query(sql_1, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

// 2. Sum of the research papers published by all female authors.

const sql_2 = 
`
SELECT 
    count(ap.paper_id) AS total_paper_by_females
FROM authors a
JOIN authors_papers ap
USING(author_no)
WHERE a.gender = 'f'
`

connection.query(sql_2, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

// 3. Average of the h-index of all authors per university.

const sql_3 = 
`
SELECT 
university, avg(h_index) as avarage_h_index
FROM authors
GROUP BY university;
`

connection.query(sql_3, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

// 4. Sum of the research papers of the authors per university.

const sql_4 = 
`
SELECT 
a. university, count(ap.paper_id) AS total_papers_per_uni
FROM authors a
JOIN authors_papers ap
    USING(author_no)
JOIN research_papers rp
	USING(paper_id)
GROUP BY a.university;
`

connection.query(sql_4, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

// 5. Minimum and maximum of the h-index of all authors per university.

const sql_5 = 
`
SELECT 
a. university, min(a.h_index) AS min_h_index, max(a.h_index) AS max_h_index
FROM authors a
JOIN authors_papers ap
    USING(author_no)
JOIN research_papers rp
	ON rp.paper_id = ap.paper_id
GROUP BY a.university;
`

connection.query(sql_5, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

connection.end();