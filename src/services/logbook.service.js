const logbookRepo = require("../repository/logbook.repository");

async function createLogbook(logbook) {
  return await logbookRepo.createLogbook(logbook);
}

async function getLogbookBySubmissionID(submissionId) {
  let logbooks = await logbookRepo.getLogbookBySubmissionID(submissionId);
  return logbooks.map((item) => ({
    ...item,
    Date: formatDate(item.Date),
  }));
}

async function getLogbookMentorship(mentorId) {
  let logbooks = await logbookRepo.getLogbookMentorship(mentorId);
  return logbooks.map((item) => ({
    ...item,
    Date: formatDate(item.Date),
  }));
}

const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

module.exports = {
  createLogbook,
  getLogbookBySubmissionID,
  getLogbookMentorship
};
