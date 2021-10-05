// db_connection.js

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "davise",
  password: "UhBCEBPukWaJAdFW",
  database: "davise"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("MYSQL Connected");
});

module.exports = connection
/*
con.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
	if (error) throw error;
	console.log('The solution is: ', results[0].solution;
});
*/
