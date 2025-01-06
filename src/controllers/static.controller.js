const staticService = require("../services/static.service");

async function getMenu(req, res, next) {
  try {
    res.json(await staticService.getMenuByAccess(req.user.accessId));
  } catch (err) {
    console.error(`Error while getting menus`, err.message);
    next(err);
  }
}

async function getMenuAccessDetailByAccessID(req, res, next) {
  try {
    res.json(await staticService.getMenuAccessDetailByAccessID(req.params.accessId));
  } catch (error) {
    console.error(`Error while getting menu access detail`, err.message);
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
    res.json(await staticService.getColumnSetup(req.params.type, req.user.accessId));
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

async function getRoleDetail(req, res, next) {
  try {
    res.json(await staticService.getRoleDetail());
  } catch (err) {
    console.error(`Error while get role detail`, err.message);
    next(err);
  }
}

async function getUserByAccessID(req, res, next) {
  try {
    res.json(await staticService.getUserByAccessID(req.params.accessId));
  } catch (err) {
    console.error(`Error while getting user`, err.message);
    next(err);
  }
}

async function getMenuAccessByAccessId(req, res, next) {
  try {
    res.json(await staticService.getMenuAccessByAccessId(req.params.accessId));
  } catch (err) {
    console.error(`Error while getting user`, err.message);
    next(err);
  }
}

async function getRedirectMenuByAccessID(req, res, next) {
  try {
    res.json(await staticService.getRedirectMenuByAccessID(req.user.accessId));
  } catch (err) {
    console.error(`Error while getting redirect menu`, err.message);
    next(err);
  }
}

module.exports = {
    getMenu,
    getBreadcrumbPath,
    getColumnSetup,
    updateColumnWidth,
    getRoleDetail,
    getMenuAccessDetailByAccessID,
    getRedirectMenuByAccessID,
    getUserByAccessID,
    getMenuAccessByAccessId
}