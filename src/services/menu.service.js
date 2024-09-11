const db = require("./db.service");
const helper = require("../utils/helper.util");
const config = require("../configs/general.config");

  
let access = [
  { accessId: 1, accDescriptin: "Mahasiswa" },
  { accessId: 2, accDescriptin: "Tata Usaha" },
  { accessId: 3, accDescriptin: "Dosen Wali" },
  { accessId: 4, accDescriptin: "KPS" },
  { accessId: 5, accDescriptin: "Sekjur" },
  { accessId: 6, accDescriptin: "Dosen Pembimbing" },
];

let menus = [
  {
    menuId: 1,
    title: "Menu",
    path: "/menu",
    url: "menu",
    icon: null,
    parentId: 1,
    index: true,
    element: "<DashboardLayout />",
  },
  {
    menuId: 2,
    title: "Dashboard",
    path: "/menu/dashboard",
    url: "dashboard",
    icon: "<DashboardOutlinedIcon />",
    parentId: 2,
    index: false,
    element: null,
  },
  {
    menuId: 3,
    title: "MBKM",
    path: "/menu/mbkm",
    url: "mbkm",
    icon: "<GroupsOutlinedIcon />",
    parentId: 3,
    index: false,
    element: null,
  },
  {
    menuId: 4,
    title: "Informasi",
    path: "/menu/mbkm/informasi",
    url: "mbkm/informasi",
    icon: "<InfoOutlinedIcon />",
    index: false,
    parentId: 3,
    element: null,
  },
  {
    menuId: 5,
    title: "Pengajuan",
    path: "/menu/mbkm/pengajuan",
    url: "mbkm/pengajuan",
    icon: "<DescriptionOutlinedIcon />",
    index: false,
    parentId: 3,
    element: "<Submission />",
  },
  {
    menuId: 6,
    title: "Daftar Pengajuan",
    path: "/menu/mbkm/daftar%20pengajuan",
    url: "mbkm/daftar pengajuan",
    icon: "<SegmentOutlinedIcon />",
    index: false,
    parentId: 3,
    element: "<ListSubmission />",
  },
];

let menuAccess = [
  {
    menuAccessId: 1,
    accessId: 1,
    menuId: 1,
    canRead: true,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
    canPrint: false,
  },
  {
    menuAccessId: 2,
    accessId: 1,
    menuId: 3,
    canRead: true,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
    canPrint: false,
  },
  {
    menuAccessId: 3,
    accessId: 1,
    menuId: 4,
    canRead: true,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
    canPrint: false,
  },
  {
    menuAccessId: 4,
    accessId: 1,
    menuId: 5,
    canRead: true,
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canPrint: true,
  },
  {
    menuAccessId: 5,
    accessId: 2,
    menuId: 1,
    canRead: true,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
    canPrint: false,
  },
  {
    menuAccessId: 6,
    accessId: 2,
    menuId: 2,
    canRead: true,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
    canPrint: false,
  },
  {
    menuAccessId: 7,
    accessId: 2,
    menuId: 3,
    canRead: true,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
    canPrint: false,
  },
  {
    menuAccessId: 8,
    accessId: 2,
    menuId: 6,
    canRead: true,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
    canPrint: false,
  },
];

async function getMenu(accessId) {
  accessId = parseInt(accessId)
  // let menus = [
  //   {
  //     webMenuId: 1,
  //     title: "Menu",
  //     path: "/menu",
  //     url: "menu",
  //     icon: null,
  //     parentId: 1,
  //     index: true,
  //     child: [],
  //     element: "<DashboardLayout />",
  //   },
  //   {
  //     webMenuId: 2,
  //     title: "Dashboard",
  //     path: "menu/dashboard",
  //     url: "dashboard",
  //     icon: "<DashboardOutlinedIcon />",
  //     parentId: 1,
  //     index: false,
  //     child: [],
  //     element: null,
  //   },
  //   {
  //     webMenuId: 3,
  //     title: "MBKM",
  //     path: "menu/mbkm",
  //     url: "mbkm",
  //     icon: "<GroupsOutlinedIcon />",
  //     parentId: 1,
  //     index: false,
  //     child: [
  //       {
  //         webMenuId: 4,
  //         title: "Informasi",
  //         path: "menu/mbkm/informasi",
  //         url: "mbkm/informasi",
  //         icon: "<InfoOutlinedIcon />",
  //         index: false,
  //         parentId: 3,
  //         child: [],
  //         element: null,
  //       },
  //       {
  //         webMenuId: 5,
  //         title: "Pengajuan",
  //         path: "menu/mbkm/pengajuan",
  //         url: "mbkm/pengajuan",
  //         icon: "<DescriptionOutlinedIcon />",
  //         index: false,
  //         parentId: 3,
  //         child: [],
  //         element: null,
  //       },
  //       {
  //         webMenuId: 6,
  //         title: "Daftar Pengajuan",
  //         path: "menu/mbkm/daftar pengajuan",
  //         url: "mbkm/daftar pengajuan",
  //         icon: "<SegmentOutlinedIcon />",
  //         index: false,
  //         parentId: 3,
  //         child: [],
  //         element: "<ListSubmission />",
  //       },
  //     ],
  //     element: null,
  //   },
  // ];

  let parentMenu = menus.map((item) => {
    let menuAccessDetail = menuAccess.filter(
      (menuAcc) => menuAcc.menuId === item.menuId && menuAcc.accessId === accessId
    );

    return {
      ...item,
      menuAccess: menuAccessDetail.length > 0 ? menuAccessDetail[0] : null,
    };
  }).filter((item) => item.menuAccess && item.parentId === item.menuId);

  let detailMenu = parentMenu.map((item) => {
    let childMenu = menus.filter((child) => child.parentId === item.menuId && child.parentId != child.menuId);
    let childMenuAccess = childMenu.map((childAcc) => {
      let childMenuAccDetail = menuAccess.filter((x) => x.menuId === childAcc.menuId && x.accessId === accessId);

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

  menus.forEach((item) => {
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
