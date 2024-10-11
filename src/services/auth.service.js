const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

async function login(params) {
  let user = await userRepo.getUserByEmail(params.email);
  let token = "";

  if (!user) {
    throw new Error("Email or password is incorrect!");
  }

  const bResult = await bcrypt.compare(params.password, user.Password);

  if (bResult) {
    token = jwt.sign({ id: user.UserID, name: user.Name, prodiId: user.ProdiID, accessId: user.AccessID }, "mbkm292021173004050301@if@3312311045@*%", {
      expiresIn: "1h",
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
