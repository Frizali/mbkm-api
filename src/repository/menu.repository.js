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
  return data.map((item) => {
    return {
      MenuAccessID: item.MenuAccessID,
      MenuID: item.MenuID,
      AccessID: item.AccessID,
      CanRead: item.CanRead == 0 ? false : true,
      CanAdd: item.CanAdd == 0 ? false : true,
      CanEdit: item.CanEdit == 0 ? false : true,
      CanDelete: item.CanDelete == 0 ? false : true,
      CanPrint: item.CanPrint == 0 ? false : true,
    }
  });
}

module.exports = {
    getAccess,
    getMenu,
    getMenuAccess
}
