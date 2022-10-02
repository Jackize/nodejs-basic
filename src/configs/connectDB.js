// get the client
import mysql from "mysql2";
// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nodejs-basic",
});

// simple query
// connection.query("SELECT * FROM `users` ", function (err, results, fields) {
//   let rows = results.map((row) => row.id);
//   console.log(rows);
// });

export default connection;
