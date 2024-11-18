const env = process.env;
const fs = require('fs');
const db = {
    host: 'localhost',
    user: 'root',
    database: 'mbkm',
    port: env.DB_PORT || 3306,
    password: '',
    // ssl: {
    //   mode: 'VERIFY_IDENTITY',
    //   ca: fs.readFileSync('/etc/ssl/cert.pem', 'utf-8'),
    // }
};

module.exports = db;
