const authService = require("../services/auth.service");

async function register(req, res, next) {
  try {
    res.json(await authService.register(req.body));
  } catch (err) {
    console.error(`Error while register`, err.message);
    next(err);
  }
}

module.exports = {
    register
}