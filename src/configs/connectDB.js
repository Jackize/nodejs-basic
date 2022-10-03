// get the client
import mysql from "mysql2/promise";
// create the connection to database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejs-basic",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
export default connection;
