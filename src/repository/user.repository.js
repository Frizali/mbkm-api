const db = require("./db.service");
const helper = require("../utils/helper.util");

async function getUserByEmail(email) {
    const rows = db.query(`SELECT * FROM tblUser WHERE LOWER(Email) = LOWER(${email})`);
    const data = helper.emptyOrRows(rows);
    return data[0];
}