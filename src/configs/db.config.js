const env = process.env;
const fs = require('fs');
const db = {
    host: 'sql12.freesqldatabase.com',
    user: 'sql12747330',
    database: 'sql12747330',
    port: env.DB_PORT || 3306,
    password: 'qXtA1PpX9X',
    // ssl: {
    //   mode: 'VERIFY_IDENTITY',
    //   ca: fs.readFileSync('/etc/ssl/cert.pem', 'utf-8'),
    // }
};

module.exports = db;
