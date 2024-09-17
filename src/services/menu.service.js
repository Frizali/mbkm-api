const menuRepo = require("../repository/menu.repository");

  
let access1 = [
  { accessId: 1, accDescriptin: "Mahasiswa" },
  { accessId: 2, accDescriptin: "Tata Usaha" },
  { accessId: 3, accDescriptin: "Dosen Wali" },
  { accessId: 4, accDescriptin: "KPS" },
  { accessId: 5, accDescriptin: "Sekjur" },
  { accessId: 6, accDescriptin: "Dosen Pembimbing" },
];

let menus1 = [
  {
    MenuID: 1,
    title: "Menu",
    path: "/menu",
    url: "menu",
    icon: null,
    ParentID: 1,
    index: true,
    element: "<DashboardLayout />",
  },
  {
    MenuID: 2,
    title: "Dashboard",
    path: "/menu/dashboard",
    url: "dashboard",
    icon: "<DashboardOutlinedIcon />",
    ParentID: 2,
    index: false,
    element: null,
  },
  {
    MenuID: 3,
    title: "MBKM",
    path: "/menu/mbkm",
    url: "mbkm",
    icon: "<GroupsOutlinedIcon />",
    ParentID: 3,
    index: false,
    element: null,
  },
  {
    MenuID: 4,
    title: "Informasi",
    path: "/menu/mbkm/informasi",
    url: "mbkm/informasi",
    icon: "<InfoOutlinedIcon />",
    index: false,
    ParentID: 3,
    element: null,
  },
  {
    MenuID: 5,
    title: "Pengajuan",
    path: "/menu/mbkm/pengajuan",
    url: "mbkm/pengajuan",
    icon: "<DescriptionOutlinedIcon />",
    index: false,
    ParentID: 3,
    element: "<Submission />",
  },
  {
    MenuID: 6,
    title: "Daftar Pengajuan",
    path: "/menu/mbkm/daftar%20pengajuan",
    url: "mbkm/daftar pengajuan",
    icon: "<SegmentOutlinedIcon />",
    index: false,
    ParentID: 3,
    element: "<ListSubmission />",
  },
];

let menuAccess1 = [
  {
    menuAccessId: 1,
    accessId: 1,
    MenuID: 1,
    canRead: true,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
    canPrint: false,
  },
  {
    menuAccessId: 2,
    accessId: 1,
    MenuID: 3,
    canRead: true,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
    canPrint: false,
  },
  {
    menuAccessId: 3,
    accessId: 1,
    MenuID: 4,
    canRead: true,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
    canPrint: false,
  },
  {
    menuAccessId: 4,
    accessId: 1,
    MenuID: 5,
    canRead: true,
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canPrint: true,
  },
  {
    menuAccessId: 5,
    accessId: 2,
    MenuID: 1,
    canRead: true,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
    canPrint: false,
  },
  {
    menuAccessId: 6,
    accessId: 2,
    MenuID: 2,
    canRead: true,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
    canPrint: false,
  },
  {
    menuAccessId: 7,
    accessId: 2,
    MenuID: 3,
    canRead: true,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
    canPrint: false,
  },
  {
    menuAccessId: 8,
    accessId: 2,
    MenuID: 6,
    canRead: true,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
    canPrint: false,
  },
];

async function getMenu(accessId) {
  accessId = parseInt(accessId);

  let access = await menuRepo.getAccess();
  let menus = await menuRepo.getMenu();
  let menuAccess = await menuRepo.getMenuAccess();

  let parentMenu = menus.map((item) => {
    let menuAccessDetail = menuAccess.filter(
      (menuAcc) => menuAcc.MenuID === item.MenuID && menuAcc.AccessId === accessId
    );

    return {
      ...item,
      menuAccess: menuAccessDetail.length > 0 ? menuAccessDetail[0] : null,
    };
  }).filter((item) => item.menuAccess && item.ParentID === item.MenuID);

  let detailMenu = parentMenu.map((item) => {
    let childMenu = menus.filter((child) => child.ParentID === item.MenuID && child.ParentID != child.MenuID);
    let childMenuAccess = childMenu.map((childAcc) => {
      let childMenuAccDetail = menuAccess.filter((x) => x.MenuID === childAcc.MenuID && x.accessId === accessId);

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

  return accessId;
}

async function getBreadcrumbPath() {
  var breadcrumbPath = {};

  menus1.forEach((item) => {
    let key = item.path
    let value = item.title

    breadcrumbPath[key] = value
  });

  return breadcrumbPath;
}

module.exports = {
  getMenu,
  getBreadcrumbPath
};
