const logbookService = require("../services/logbook.service");

async function getLogbookBySubmissionID(req, res, next) {
  try {
    res.json(await logbookService.getLogbookBySubmissionID(req.params.submissionId));
  } catch (err) {
    console.error(`Error while get logbook`, err.message);
    next(err);
  }
}

async function createLogbook(req, res, next) {
  try {
    res.json(await logbookService.createLogbook(req.body));
  } catch (err) {
    console.error(`Error while create logbook`, err.message);
    next(err);
  }
}

module.exports = {
  getLogbookBySubmissionID,
  createLogbook
};
