const menuRepo = require("../repository/menu.repository");

async function getMenu(accessId) {
  accessId = parseInt(accessId);

  let access = await menuRepo.getAccess();
  let menus = await menuRepo.getMenu();
  let menuAccess = await menuRepo.getMenuAccess();

  let parentMenu = menus.map((item) => {
    let menuAccessDetail = menuAccess.filter(
      (menuAcc) => menuAcc.MenuID === item.MenuID && menuAcc.AccessID == accessId
    );

    return {
      ...item,
      menuAccess: menuAccessDetail.length > 0 ? menuAccessDetail[0] : null,
    };
  }).filter((item) => item.menuAccess && item.ParentID === item.MenuID);

  let detailMenu = parentMenu.map((item) => {
    let childMenu = menus.filter((child) => child.ParentID === item.MenuID && child.ParentID != child.MenuID);
    let childMenuAccess = childMenu.map((childAcc) => {
      let childMenuAccDetail = menuAccess.filter((x) => x.MenuID === childAcc.MenuID && x.AccessID === accessId);
      return {
        ...childAcc,
        menuAccess: childMenuAccDetail.length > 0 ? childMenuAccDetail[0] : null
      }
    }).filter((item) => item.menuAccess)

    return {
      ...item,
      child: childMenuAccess
    }
  })

  return detailMenu;
}

async function getBreadcrumbPath() {
  var breadcrumbPath = {};
  let menus = await menuRepo.getMenu();

  menus.forEach((item) => {
    let key = item.Path
    let value = item.Title

    breadcrumbPath[key] = value
  });

  return breadcrumbPath;
}

module.exports = {
  getMenu,
  getBreadcrumbPath
};
