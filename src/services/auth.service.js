const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("../repository/user.repository");

async function register(params) {
  if (!params.email || !params.password) {
    throw new Error("Email and password are required.");
  }

  let userIsExist = await userRepo.getUserByEmailOrName(params.user);

  if (userIsExist) {
    throw new Error("This user is already in use!");
  } else {
    const hash = await bcrypt.hash(params.password, 10);
    await userRepo.createUser(params, hash);
  }
}

async function login(params) {
  let user = await userRepo.getUserByEmailOrName(params.user);
  let token = "";

  if (!user) {
    throw new Error("Email or password is incorrect!");
  }

  const bResult = await bcrypt.compare(params.password, user.Password);

  if (bResult) {
    token = jwt.sign({ id: user.UserID, name: user.Name, prodiId: user.ProdiID, prodiName: user.ProdiName, accessId: user.AccessID, isMultiProdi: user.IsMultiProdi == 0 ? false : true }, "mbkm292021173004050301@if@3312311045@*%", {
      expiresIn: "24h",
    });
  } else {
    throw new Error("Email or password is incorrect!");
  }

  return token;
}

module.exports = {
  register,
  login,
};
