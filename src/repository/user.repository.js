const db = require("./db.service");
const helper = require("../utils/helper.util");

async function getUserByEmailOrName(user) {
  const rows = await db.query(
    `SELECT * FROM tblUser WHERE LOWER(Email) = LOWER('${user}') OR LOWER(Name) = LOWER('${user}')`
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

async function getUserByID(userId) {
  const result = await db.query(`SELECT 
  u.UserID AS NIM, 
  u.Name, 
  u.Email, 
  u.ProdiID, 
  p.ProdiName, 
  u.LecturerGuardianID, 
  lg.Name AS LecturerGuardianName
FROM 
  tblUser u 
  INNER JOIN tblProdi p ON u.ProdiID = p.ProdiID 
  LEFT JOIN tblUser lg ON u.LecturerGuardianID = lg.UserID
  WHERE u.UserID = ${userId};`);

  const data = helper.emptyOrRows(result);
  return data[0];
}

async function getAvatar() {
  const rows = await db.query('SELECT UserPhoto AS Avatar, AccessID FROM tblUser');
  const data = helper.emptyOrRows(rows);
  return data;
}

module.exports = {
  getUserByEmailOrName,
  createUser,
  getUserByID,
  getAvatar
};
