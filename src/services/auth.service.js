const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepo = require("../repository/user.repository");

async function register(params) {
  let userIsExist = await userRepo.getUserByEmail(params.Email);

  if (userIsExist) {
    throw new Error("This user is already in use!");
  } else {
    bcrypt.hash(params.password, 10, async (err, hash) => {
      if (err) {
        throw new Error(err);
      } else {
        await userRepo.createUser(params, hash);
      }
    });
  }
}

module.exports = {
    register
}