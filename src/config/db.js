const mysql = require("mysql2");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "skripsi_rag",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = db.promise();