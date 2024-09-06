const menuService = require("../services/menu.service");

async function getMenu(req, res, next) {
  try {
    res.json(await menuService.getMenu());
  } catch (err) {
    console.error(`Error while getting menus`, err.message);
    next(err);
  }
}

module.exports = {
    getMenu
}