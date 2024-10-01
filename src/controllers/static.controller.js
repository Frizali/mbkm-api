const staticService = require("../services/static.service");

async function getMenu(req, res, next) {
  try {
    res.json(await staticService.getMenuByAccess(req.params.accessId));
  } catch (err) {
    console.error(`Error while getting menus`, err.message);
    next(err);
  }
}

async function getBreadcrumbPath(req, res, next) {
  try {
    res.json(await staticService.getBreadcrumbPath());
  } catch (err) {
    console.error(`Error while getting menus`, err.message);
    next(err);
  }
}

async function getColumnSetup(req, res, next) {
  try {
    res.json(await staticService.getColumnSetup(req.params.type, req.params.accessId));
  } catch (err) {
    console.error(`Error while getting menus`, err.message);
    next(err);
  }
}

async function updateColumnWidth(req, res, next) {
  try {
    res.json(await staticService.updateWidthColumn(req.body));
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