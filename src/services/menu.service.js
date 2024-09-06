const db = require("./db.service");
const helper = require("../utils/helper.util");
const config = require("../configs/general.config");

async function getMenu() {
  let menus = [
    {
      webMenuId: 1,
      title: "Menu",
      path: "/menu",
      url: "menu",
      icon: null,
      parentId: 1,
      index: true,
      child: [],
      element: "<DashboardLayout />",
    },
    {
      webMenuId: 2,
      title: "Dashboard",
      path: "menu/dashboard",
      url: "dashboard",
      icon: "<DashboardOutlinedIcon />",
      parentId: 1,
      index: false,
      child: [],
      element: null,
    },
    {
      webMenuId: 3,
      title: "MBKM",
      path: "menu/mbkm",
      url: "mbkm",
      icon: "<GroupsOutlinedIcon />",
      parentId: 1,
      index: false,
      child: [
        {
          webMenuId: 4,
          title: "Informasi",
          path: "menu/mbkm/informasi",
          url: "mbkm/informasi",
          icon: "<InfoOutlinedIcon />",
          index: false,
          parentId: 3,
          child: [],
          element: null,
        },
        {
          webMenuId: 5,
          title: "Pengajuan",
          path: "menu/mbkm/pengajuan",
          url: "mbkm/pengajuan",
          icon: "<DescriptionOutlinedIcon />",
          index: false,
          parentId: 3,
          child: [],
          element: null,
        },
        {
          webMenuId: 6,
          title: "Daftar Pengajuan",
          path: "menu/mbkm/daftar pengajuan",
          url: "mbkm/daftar pengajuan",
          icon: "<SegmentOutlinedIcon />",
          index: false,
          parentId: 3,
          child: [],
          element: "<ListSubmission />",
        },
      ],
      element: null,
    },
  ];

  return menus
}

module.exports = {
    getMenu
}