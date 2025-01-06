const db = require("./db.service");
const helper = require("../utils/helper.util");

async function getAccessByID(accessId) {
  const rows = await db.query(`SELECT * FROM tblaccess WHERE AccessID=?`,[accessId]);
  const data = helper.emptyOrRows(rows);
  return data[0];
}

async function getMenu() {
  const rows = await db.query(`SELECT * FROM tblmenu`);
  const data = helper.emptyOrRows(rows);
  return data;
}

async function getRedirectMenuByAccessID(accessId) {
  const rows = await db.query(`SELECT * FROM tblmenuaccess ma INNER JOIN tblmenu m ON ma.MenuID = m.MenuID WHERE ma.AccessID = ${accessId} AND m.Redirect = 1`);
  const data = helper.emptyOrRows(rows);
  return data[0];
}

async function getMenuAccessDetailByAccessID(accessId) {
  const rows = await db.query(`SELECT m.BreadcrumbName AS Title,ma.* FROM tblmenuaccess ma INNER JOIN tblmenu m ON ma.MenuID = m.MenuID WHERE ma.AccessID=? AND m.MenuID <> m.ParentID;`,[accessId])
  const data = helper.emptyOrRows(rows);
  return data.map((item) => {
    return {
      Title: item.Title,
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

async function getMenuAccess() {
  const rows = await db.query(`SELECT * FROM tblmenuaccess`);
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
    getAccessByID,
    getMenu,
    getMenuAccess,
    getMenuAccessDetailByAccessID,
    getRedirectMenuByAccessID
}
