const db = require("./db.service");
const helper = require("../utils/helper.util");

async function getColumnSetup(type, accessId) {
    const rows = db.query(`SELECT * FROM tblcolumnsetup WHERE type='${type}' AND AccessID=${accessId} ORDER BY Seq`);
    const data = helper.emptyOrRows(rows);
    return data;
}

async function updateWidthColumn(id, width, visibility) {
    const result = db.query(`UPDATE tblcolumnsetup SET width=${width}, visibility=${visibility} WHERE ID=${id};`);
    
    let message = 'Column Width updated successfully';
  
    return [message];
}

module.exports = {
    getColumnSetup,
    updateWidthColumn
}