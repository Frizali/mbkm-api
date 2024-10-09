const authService = require("../services/auth.service");

async function register(req, res, next) {
  try {
    res.json(await authService.register(req.body));
  } catch (err) {
    console.error(`Error while register`, err.message);
    next(err);
  }
}

async function login(req, res, next) {
  try {
    res.json(await authService.login(req.body));
  } catch (err) {
    next(err);
  }
}

module.exports = {
    register,
    login
}