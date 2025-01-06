const menuRepo = require("../repository/menu.repository");
const columnRepo = require('../repository/column.repository');
const accessRepo = require('../repository/access.repository');
const userRepo = require('../repository/user.repository');

// Column Setup
async function getColumnSetup(type,accessId) {
    accessId = parseInt(accessId);
    let access = await menuRepo.getAccessByID(accessId);
    if (!access) throw new Error('Sorry, you dont have access');

    const column = await columnRepo.getColumnSetup(type, accessId);
    const visibility = column.reduce((acc, item) => {
        acc[item.field] = item.visibility === 1;
        return acc;
    }, {});

    return {column, visibility};
}

async function updateWidthColumn(column) {
    return await columnRepo.updateWidthColumn(column.id,column.width,column.visibility);
}

// Menu
async function getMenuByAccess(accessId) {
  accessId = parseInt(accessId);
  let access = await menuRepo.getAccessByID(accessId);
  if (!access) throw new Error('Sorry, you dont have access');

  let [menus, menuAccess] = await Promise.all([
    menuRepo.getMenu(),
    menuRepo.getMenuAccess()
  ]);

  const enrichMenu = (menuList, parent = false) => {
    return menuList.map(item => {
      let accessDetail = menuAccess.find(acc => acc.MenuID === item.MenuID && acc.AccessID === access.AccessID);
      return {
        ...item,
        menuAccess: accessDetail || null
      };
    }).filter(item => item.menuAccess && (parent ? item.ParentID === item.MenuID : item.ParentID !== item.MenuID));
  };

  let parentMenu = enrichMenu(menus, true);
  
  return parentMenu.map(parent => ({
    ...parent,
    child: enrichMenu(menus.filter(child => child.ParentID === parent.MenuID))
  }));
}

async function getBreadcrumbPath() {
  var breadcrumbPath = {};
  let menus = await menuRepo.getMenu();

  menus.forEach((item) => {
    let key = item.Path
    let value = item.BreadcrumbName

    breadcrumbPath[key] = value
  });

  return breadcrumbPath;
}

async function getMenuAccessDetailByAccessID(accessId) {
  return await menuRepo.getMenuAccessDetailByAccessID(accessId);
}

async function getRedirectMenuByAccessID(accessId) {
  return await menuRepo.getRedirectMenuByAccessID(accessId);
}

// Access
async function getRoleDetail() {
  let [roles,userAvatar] = await Promise.all([
    accessRepo.getRoles(),
    userRepo.getAvatar()
  ])

  return roles.map(role => ({
    ...role,
    users: userAvatar.filter(user => user.AccessID === role.AccessID).map(x => x.Avatar?.toString('base64'))
  }))
}

async function getUserByAccessID(accessID) {
  return await userRepo.getUserByAccessID(accessID)
}

module.exports = {
  getColumnSetup,
  updateWidthColumn,
  getMenuByAccess,
  getBreadcrumbPath,
  getRoleDetail,
  getMenuAccessDetailByAccessID,
  getRedirectMenuByAccessID,
  getUserByAccessID,
};
