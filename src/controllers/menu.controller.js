const menuService = require("../services/menu.service");

async function getMenu(req, res, next) {
  try {
    res.json(await menuService.getMenu(req.params.accessId));
  } catch (err) {
    console.error(`Error while getting menus`, err.message);
    next(err);
  }
}

async function getBreadcrumbPath(req, res, next) {
  try {
    res.json(await menuService.getBreadcrumbPath());
  } catch (err) {
    console.error(`Error while getting menus`, err.message);
    next(err);
  }
}

module.exports = {
    getMenu,
    getBreadcrumbPath
}