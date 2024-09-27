const submissionService = require("../services/submission.service");

async function getSubmissions(req, res, next) {
  try {
    res.json(await submissionService.getSubmissions());
  } catch (err) {
    console.error(`Error while getting submission detail`, err.message);
    next(err);
  }
}

async function getSubmissionDetail(req, res, next) {
  try {
    res.json(await submissionService.getSubmissionDetail(req.params.submissionId));
  } catch (err) {
    console.error(`Error while getting submission detail`, err.message);
    next(err);
  }
}

module.exports = {
    getSubmissions,
    getSubmissionDetail
}