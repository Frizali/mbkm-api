const db = require("./db.service");
const helper = require("../utils/helper.util");

async function getUserByEmailOrName(user) {
  const rows = await db.query(
    `SELECT * FROM tbluser INNER JOIN tblprodi ON tbluser.ProdiID = tblprodi.ProdiID WHERE LOWER(Email) = LOWER('${user}') OR LOWER(Name) = LOWER('${user}')`
  );
  const data = helper.emptyOrRows(rows);
  return data[0];
}

async function createUser(user, password) {
  const result = await db.query(
    `INSERT INTO tbluser (UserID, Name, ProdiID, Email, Password, AccessID) VALUES(?,?,?,?,?,?)`,
    [user.userId, user.name, user.prodiId, user.email, password, '1']
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
  tbluser u 
  INNER JOIN tblprodi p ON u.ProdiID = p.ProdiID 
  WHERE u.UserID = ${userId};`);

  const data = helper.emptyOrRows(result);
  return data[0];
}

async function getUserByAccessID(accessId) {
  const result = await db.query(`SELECT UserID,Name,ProdiID,UserPhoto,Email FROM tbluser WHERE AccessID = ${accessId}`)

  return helper.emptyOrRows(result)
}

async function getAvatar() {
  const rows = await db.query('SELECT UserPhoto AS Avatar, AccessID FROM tbluser');
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
