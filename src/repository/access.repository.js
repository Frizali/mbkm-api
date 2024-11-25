const db = require("./db.service");
const helper = require("../utils/helper.util");

async function getRoles() {
    const rows = await db.query("SELECT AccDescription AS Role, a.AccessID, COUNT(*) AS TotalUser FROM tbluser u INNER JOIN tblaccess a ON u.AccessID = a.AccessID GROUP BY a.AccDescription, a.AccessID;");
    const data = helper.emptyOrRows(rows);
    return data;
}

module.exports = {
    getRoles
}