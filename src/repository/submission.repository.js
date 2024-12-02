const db = require("./db.service");
const helper = require("../utils/helper.util");

async function create(submissionId, s) {
  const result = await db.query(
    `INSERT INTO tblsubmission
    (SubmissionID,StudentID,ProdiID,ProgramType,Reason,Title,InstitutionName,StartDate,EndDate,Position,ActivityDetails,LecturerGuardianID,Status,SubmissionDate)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())`,
    [
      submissionId,
      s.StudentID,
      s.ProdiID,
      s.ProgramType,
      s.Reason,
      s.Title,
      s.InstitutionName,
      s.StartDate,
      s.EndDate,
      s.Position,
      s.ActivityDetails,
      s.LecturerGuardianID,
      'Processing'
    ]
  );

  let message = "Error in submit Submission";

  if (result.affectedRows) {
    message = "Submission created successfully";
  }

  return { message };
}

async function updateSubmissionApproval(submissionId, approverId, note, status) {
  const result = await db.query(`UPDATE tblsubmissionapproval SET ApprovalStatus='${status}', Note='${note}', ApprovalDate = NOW()  WHERE SubmissionID='${submissionId}' AND ApproverID=${approverId}`)
 
  let message = "Error in update Submission Approval";

  if (result.affectedRows) {
    message = "Submission Approval updated successfully";
  }

  return { message };
}

async function createSubmissionApproval(submissionId, approverId, status) {
  const result = await db.query(
    `INSERT INTO tblsubmissionapproval (SubmissionID,ApproverID,ApprovalStatus) VALUES (?,?,?)`,
    [submissionId, approverId, status]
  );

  let message = "Error in submit Submission";

  if (result.affectedRows) {
    message = "Submission created successfully";
  }

  return { message };
}

async function getSubmissions() {
  const submissions = await db.query(`SELECT 
  u.Name, 
  p.ProdiName,
  s.* 
FROM 
  tblsubmission s 
  INNER JOIN (
    SELECT 
      sa.SubmissionID, 
      CONCAT(
        ApprovalStatus, ' By ', AccDescription
      ) AS ApprovalStatus 
    FROM 
      tblsubmissionapproval sa 
      INNER JOIN tblapprover a ON sa.ApproverID = a.ApproverID 
      INNER JOIN (
        SELECT 
          SubmissionID, 
          MAX(Level) AS Level 
        FROM 
          tblsubmissionapproval sa 
          INNER JOIN tblapprover a ON sa.ApproverID = a.ApproverID 
          INNER JOIN tblaccess acc ON a.AccessID = acc.AccessID 
        GROUP BY 
          SubmissionID
      ) AS qryCurrApproval ON (
        sa.SubmissionID = qryCurrApproval.SubmissionID 
        AND a.Level = qryCurrApproval.Level
      ) 
      LEFT JOIN tblaccess acc ON a.AccessID = acc.AccessID
  ) AS qryApproval ON s.SubmissionID = qryApproval.SubmissionID 
  INNER JOIN tblprodi p ON s.ProdiID = p.ProdiID 
  INNER JOIN tbluser u ON u.UserID = s.StudentID 
WHERE 
  s.SubmissionID IN (
    SELECT 
      sa.SubmissionID 
    FROM 
      tblapprover a 
      INNER JOIN tblsubmissionapproval sa ON a.ApproverID = sa.ApproverID 
  );
`);
  const data = helper.emptyOrRows(submissions);
  return data;
}

async function getSubmissionById(submissionId) {
  const submission = await db.query(
    `SELECT s.*,u.Name AS LecturerGuardianName FROM tblsubmission s LEFT JOIN tbluser u ON s.LecturerGuardianID = u.UserID WHERE SubmissionID='${submissionId}'`
  );
  const data = helper.emptyOrRows(submission);
  return data[0];
}

async function getSubmissionAttBySubId(submissionId) {
  const submissionAttachment = await db.query(
    `SELECT * FROM tblsubmissionattachment WHERE SubmissionID='${submissionId}'`
  );
  const data = helper.emptyOrRows(submissionAttachment);
  return data;
}

async function getSubmissionByAccessID(accessId, userId) {
  let filter = `s.SubmissionID IN (
    SELECT 
      sa.SubmissionID 
    FROM 
      tblapprover a 
      INNER JOIN tblsubmissionapproval sa ON a.ApproverID = sa.ApproverID 
    WHERE 
      a.AccessID = ${accessId}
      AND sa.ApprovalStatus = 'Pending'
  );`;

  if (accessId == 1) {
    filter = `  s.StudentID = '${userId}'`;
  }

  const submissions = await db.query(
    `SELECT 
  u.Name, 
  p.ProdiName,
  qryApproval.ApprovalStatus AS CurrentApproval,
  s.* 
FROM 
  tblsubmission s 
  INNER JOIN (
    SELECT 
      sa.SubmissionID, 
      CONCAT(
        ApprovalStatus, ' By ', AccDescription
      ) AS ApprovalStatus 
    FROM 
      tblsubmissionapproval sa 
      INNER JOIN tblapprover a ON sa.ApproverID = a.ApproverID 
      INNER JOIN (
        SELECT 
          SubmissionID, 
          MAX(Level) AS Level 
        FROM 
          tblsubmissionapproval sa 
          INNER JOIN tblapprover a ON sa.ApproverID = a.ApproverID 
          INNER JOIN tblaccess acc ON a.AccessID = acc.AccessID 
        GROUP BY 
          SubmissionID
      ) AS qryCurrApproval ON (
        sa.SubmissionID = qryCurrApproval.SubmissionID 
        AND a.Level = qryCurrApproval.Level
      ) 
      LEFT JOIN tblaccess acc ON a.AccessID = acc.AccessID
  ) AS qryApproval ON s.SubmissionID = qryApproval.SubmissionID 
  INNER JOIN tblprodi p ON s.ProdiID = p.ProdiID 
  INNER JOIN tbluser u ON u.UserID = s.StudentID 
WHERE ${filter}
`
  );

  const data = helper.emptyOrRows(submissions);
  return data;
}

async function getFirstApproverByProdiId(prodiId) {
  const approver = await db.query(
    `SELECT * FROM tblapprover WHERE ProdiID=${prodiId} ORDER BY Level LIMIT 1;`
  );
  const data = helper.emptyOrRows(approver);
  return data[0];
}

async function getSubmissionApprovalBySubmission(submissionId) {
  const approver = await db.query(
    `SELECT acc.AccDescription,a.Level,sa.* FROM tblsubmissionapproval sa INNER JOIN tblapprover a ON sa.ApproverID = a.ApproverID INNER JOIN tblaccess acc ON a.AccessID = acc.AccessID WHERE sa.SubmissionID = '${submissionId}';`
  );
  const data = helper.emptyOrRows(approver);
  return data;
}

async function getCurrentApprover(submissionId, accessId) {
  const currApprover = await db.query(`SELECT 
  * 
FROM 
  tblsubmissionapproval sa 
  INNER JOIN (
    SELECT 
      a.* 
    FROM 
      tblapprover a 
      INNER JOIN tblaccess acc ON a.AccessID = acc.AccessID 
    WHERE 
      a.AccessID = ${accessId}
  ) AS qryApprover ON sa.ApproverID = qryApprover.ApproverID 
WHERE 
  SubmissionID = '${submissionId}' 
  AND ApprovalStatus = 'Pending';
`);

  const data = helper.emptyOrRows(currApprover);
  return data[0];
}

async function updateSubmissionStatus(submissionId, status) {
  const result = await db.query(`UPDATE tblsubmission SET Status='${status}' WHERE SubmissionID = '${submissionId}'`);

  let message = "Error in update Submission Status";

  if (result.affectedRows) {
    message = "Submission Status updated successfully";
  }

  return { message };
}

async function deleteSubmission(submissionId) {
  await db.query(
    `DELETE FROM tblsubmission WHERE SubmissionID = '${submissionId}'`
  );

  let message = "Submission has been deleted";

  return { message };
}

async function getNextApprover(prodiId, level) {
  const approver = await db.query(`SELECT * FROM tblapprover WHERE ProdiID = ${prodiId} AND Level = ${level}`)

  const data = helper.emptyOrRows(approver);
  return data[0];
}

async function updateLucturerSubmission(submissionId, lecturerGuardianID) {
  const result = await db.query(`UPDATE tblsubmission SET LecturerGuardianID = ? WHERE SubmissionID = ?`,
    [
      lecturerGuardianID,
      submissionId
    ]
  )

  let message = "Error in update lecturer";

  if (result.affectedRows) {
    message = "Submission updated successfully";
  }

  return { message };
}

module.exports = {
  create,
  createSubmissionApproval,
  getSubmissions,
  getSubmissionById,
  getSubmissionAttBySubId,
  getSubmissionByAccessID,
  getFirstApproverByProdiId,
  getSubmissionApprovalBySubmission,
  getCurrentApprover,
  getNextApprover,
  updateSubmissionApproval,
  updateSubmissionStatus,
  updateLucturerSubmission,
  deleteSubmission,
};
