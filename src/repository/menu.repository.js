const db = require("./db.service");
const helper = require("../utils/helper.util");

async function getAccess() {
  const rows = await db.query(`SELECT * FROM tblAccess`);
  const data = helper.emptyOrRows(rows);
  return data;
}

async function getMenu() {
  const rows = await db.query(`SELECT * FROM tblMenu`);
  const data = helper.emptyOrRows(rows);
  return data;
}

async function getMenuAccess() {
  const rows = await db.query(`SELECT * FROM tblMenuAccess`);
  const data = helper.emptyOrRows(rows);
  return data;
}

module.exports = {
    getAccess,
    getMenu,
    getMenuAccess
}
