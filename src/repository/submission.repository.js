const db = require("./db.service");
const helper = require("../utils/helper.util");

async function create(submissionId,s) {
  const result = await db.query(
    `INSERT INTO tblSubmission
    (SubmissionID,StudentID,ProdiID,SubmissionDate,ProgramType,Reason,Title,InstitutionName,StartDate,EndDate,Position,ActivityDetails)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      submissionId,
      s.StudentID,
      s.ProdiID,
      new Date().toISOString().slice(0, 10),
      s.ProgramType,
      s.Reason,
      s.Title,
      s.InstitutionName,
      s.StartDate,
      s.EndDate,
      s.Position,
      s.ActivityDetails,
    ]
  );

  let message = "Error in submit Submission";

  if (result.affectedRows) {
    message = "Submission created successfully";
  }

  return { message };
}

async function createSubmissionApproval(submissionId, approverId, status) {
  const result = await db.query(
    `INSERT INTO tblSubmissionApproval (SubmissionID,ApproverID,ApprovalStatus) VALUES (?,?,?)`, [submissionId, approverId, status]
  );

  let message = "Error in submit Submission";

  if (result.affectedRows) {
    message = "Submission created successfully";
  }

  return { message };
}

async function getSubmissions() {
  const submissions = await db.query(`
SELECT * FROM tblSubmission s INNER JOIN 
(
SELECT 
  sa.SubmissionID,
  CONCAT(ApprovalStatus,' By ',AccDescription) AS ApprovalStatus
FROM 
  tblSubmissionApproval sa 
  INNER JOIN tblApprover a ON sa.ApproverID = a.ApproverID 
  INNER JOIN (
    SELECT 
      SubmissionID, 
      MAX(Level) AS Level 
    FROM 
      tblSubmissionApproval sa 
      INNER JOIN tblApprover a ON sa.ApproverID = a.ApproverID 
      INNER JOIN tblAccess acc ON a.AccessID = acc.AccessID 
    GROUP BY 
      SubmissionID
  ) AS qryCurrApproval ON (
    sa.SubmissionID = qryCurrApproval.SubmissionID 
    AND a.Level = qryCurrApproval.Level
  ) 
  LEFT JOIN tblAccess acc ON a.AccessID = acc.AccessID
) AS qryApproval ON s.SubmissionID = qryApproval.SubmissionID 
INNER JOIN tblProdi p ON s.ProdiID = p.ProdiID;`);
  const data = helper.emptyOrRows(submissions);
  return data;
}

async function getSubmissionById(submissionId) {
  const submission = await db.query(
    `SELECT * FROM tblSubmission WHERE SubmissionID=${submissionId}`
  );
  const data = helper.emptyOrRows(submission);
  return data[0];
}

async function getSubmissionApprovalBySubId(submissionId) {
  const submissionApproval =
    await db.query(`SELECT AccDescription,ApprovalStatus,ApprovalDate,Level FROM tblSubmissionApproval sa 
        INNER JOIN tblApprover a ON sa.ApproverID = a.ApproverID 
        INNER JOIN tblAccess acc ON a.AccessID = acc.AccessID
        WHERE SubmissionID=${submissionId} ORDER BY Level`);
  const data = helper.emptyOrRows(submissionApproval);
  return data;
}

async function getSubmissionAttBySubId(submissionId) {
  const submissionAttachment = await db.query(
    `SELECT * FROM tblSubmissionAttachment WHERE SubmissionID=${submissionId}`
  );
  const data = helper.emptyOrRows(submissionAttachment);
  return data;
}

async function getSubmissionByAccessID(accessId) {
  const submissions = await db.query(`SELECT * FROM tblSubmission s INNER JOIN 
(
SELECT 
  sa.SubmissionID,
  CONCAT(ApprovalStatus,' By ',AccDescription) AS ApprovalStatus
FROM 
  tblSubmissionApproval sa 
  INNER JOIN tblApprover a ON sa.ApproverID = a.ApproverID 
  INNER JOIN (
    SELECT 
      SubmissionID, 
      MAX(Level) AS Level 
    FROM 
      tblSubmissionApproval sa 
      INNER JOIN tblApprover a ON sa.ApproverID = a.ApproverID 
      INNER JOIN tblAccess acc ON a.AccessID = acc.AccessID 
    GROUP BY 
      SubmissionID
  ) AS qryCurrApproval ON (
    sa.SubmissionID = qryCurrApproval.SubmissionID 
    AND a.Level = qryCurrApproval.Level
  ) 
  LEFT JOIN tblAccess acc ON a.AccessID = acc.AccessID
) AS qryApproval ON s.SubmissionID = qryApproval.SubmissionID 
INNER JOIN tblProdi p ON s.ProdiID = p.ProdiID
WHERE s.SubmissionID IN (SELECT sa.SubmissionID FROM tblApprover a INNER JOIN tblSubmissionApproval sa ON a.ApproverID = sa.ApproverID WHERE a.AccessID = ${accessId} AND sa.ApprovalStatus = 'Pending');`);
  const data = helper.emptyOrRows(submissions);
  return data;
}

async function getFirstApproverByProdiId(prodiId) {
  const approver = await db.query(
    `SELECT * FROM tblApprover WHERE ProdiID=${prodiId} ORDER BY Level LIMIT 1;`
  );
  const data = helper.emptyOrRows(approver);
  return data[0];
}

module.exports = {
  create,
  getSubmissions,
  getSubmissionById,
  getSubmissionApprovalBySubId,
  getSubmissionAttBySubId,
  getSubmissionByAccessID,
  getFirstApproverByProdiId,
  createSubmissionApproval
};
