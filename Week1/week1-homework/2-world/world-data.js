const mysql = require('mysql');
const connection = mysql.createConnection({
host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world'
});
connection.connect();

//1.What are the names of countries with population greater than 8 million?
const sql_1 = "SELECT name, POPULATION FROM country WHERE population > 8000000"
connection.query(sql_1, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//2.What are the names of countries that have “land” in their names?  0636257036
const sql_2 = "SELECT name FROM country WHERE name LIKE '%land%'";
connection.query(sql_2, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//3.What are the names of the cities with population in between 500,000 and 1 million?
const sql_3 = "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000";
connection.query(sql_3, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//4.What's the name of all the countries on the continent ‘Europe’?
const sql_4 = "SELECT name FROM country WHERE continent = 'Europe'";
connection.query(sql_4, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//5. List all the countries in the descending order of their surface areas.
const sql_5 = "SELECT name, surfacearea FROM country ORDER BY surfacearea DESC";
connection.query(sql_5, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//6.What are the names of all the cities in the Netherlands?
const sql_6 = "SELECT name FROM city WHERE countrycode = 'NLD'";
connection.query(sql_6, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//7. What is the population of Rotterdam?
const sql_7 = "SELECT population FROM city WHERE name = 'Rotterdam'";
connection.query(sql_7, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//8. What's the top 10 countries by Surface Area?
const sql_8 = "SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10";
connection.query(sql_8, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//9.What's the top 10 most populated cities?
const sql_9 = "SELECT name FROM city ORDER BY population DESC LIMIT 10";
connection.query(sql_9, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

//10. What is the population number of the world?
const sql_10 = "SELECT SUM(population) as world_total_population FROM country";
connection.query(sql_10, (err, results, fields) => {
    if (err) throw err;
    console.table(results);
});

connection.end();