const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
);

const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    connection.execute(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  connection,
  executeQuery,
};
