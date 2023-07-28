const mysql = require('mysql2');
// MySQL Connection Pool
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'teknistunisie',
    connectionLimit: 10, // Adjust the connection limit as needed
  });
  module.exports = pool;