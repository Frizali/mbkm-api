const db = require("./db.service");
const helper = require("../utils/helper.util");

async function getUserByEmail(email) {
  const rows = db.query(
    `SELECT * FROM tblUser WHERE LOWER(Email) = LOWER('${email}')`
  );
  const data = helper.emptyOrRows(rows);
  return data[0];
}

async function createUser(user, password) {
  const result = await db.query(
    `INSERT INTO tblUser (UserID, Name, Email, Password) VALUES(?,?,?,?)`,
    [user.userId, user.name, user.email, password]
  );

  let message = "Error in submit Submission";

  if (result.affectedRows) {
    message = "Submission created successfully";
  }

  return { message };
}

module.exports = {
  getUserByEmail,
  createUser,
};
