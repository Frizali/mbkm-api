const db = require("./db.service");
const helper = require("../utils/helper.util");

async function getUserByEmailOrName(user) {
  const rows = await db.query(
    `SELECT * FROM tblUser INNER JOIN tblProdi ON tblUser.ProdiID = tblProdi.ProdiID WHERE LOWER(Email) = LOWER('${user}') OR LOWER(Name) = LOWER('${user}')`
  );
  const data = helper.emptyOrRows(rows);
  return data[0];
}

async function createUser(user, password) {
  const result = await db.query(
    `INSERT INTO tblUser (UserID, Name, ProdiID, Email, Password, AccessID) VALUES(?,?,?,?,?,?)`,
    [user.userId, user.name, user.prodiId, user.email, password, '6']
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
  u.UserPhoto,
  p.ProdiName
FROM 
  tblUser u 
  INNER JOIN tblProdi p ON u.ProdiID = p.ProdiID 
  WHERE u.UserID = ${userId};`);

  const data = helper.emptyOrRows(result);
  return data[0];
}

async function getUserByAccessID(accessId) {
  const result = await db.query(`SELECT UserID,Name,ProdiID,UserPhoto,Email FROM tblUser WHERE AccessID = ${accessId}`)

  return helper.emptyOrRows(result)
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
  getAvatar,
  getUserByAccessID
};
