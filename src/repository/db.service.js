const mysql = require('mysql2/promise');
const dbConfig = require('../configs/db.config');

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0 
});

async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

module.exports = {
  query
};
