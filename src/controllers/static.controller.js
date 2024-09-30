const menuService = require("../services/menu.service");
const columnService = require("../services/column.service");

async function getMenu(req, res, next) {
  try {
    res.json(await menuService.getMenuByAccess(req.params.accessId));
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

async function getColumnSetup(req, res, next) {
  try {
    res.json(await columnService.getColumnSetup(req.params.type, req.params.accessId));
  } catch (err) {
    console.error(`Error while getting menus`, err.message);
    next(err);
  }
}

async function updateColumnWidth(req, res, next) {
  try {
    res.json(await columnService.updateWidthColumn(req.body));
  } catch (err) {
    console.error(`Error while updatting column`, err.message);
    next(err);
  }
}

module.exports = {
    getMenu,
    getBreadcrumbPath,
    getColumnSetup,
    updateColumnWidth
}