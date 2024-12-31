const db = require("./db.service");
const helper = require("../utils/helper.util");

async function getLogbookBySubmissionID(submissionId) {
  const rows = await db.query(
    `SELECT * FROM tbllogbook WHERE SubmissionID='${submissionId}'`
  );
  const data = helper.emptyOrRows(rows);
  return data;
}

async function createLogbook(logbook) {
  const result = await db.query(
    `INSERT INTO tbllogbook (SubmissionID, Date, Label) VALUES(?,?,?)`,
    [logbook.SubmissionID,logbook.Date, logbook.Label]
  );

  let message = "Error in submit logbook";

  if (result.affectedRows) {
    message = "Logbook created successfully";
  }

  return { message };
}

module.exports = {
    getLogbookBySubmissionID,
    createLogbook
}