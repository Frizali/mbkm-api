const dashboardService = require("../services/dashboard.service");

async function getSubmissionStatus(req, res, next) {
  try {
    res.json(await dashboardService.getSubmissionStatus(req.user.accessId));
  } catch (err) {
    console.error(`Error while get submission status`, err.message);
    next(err);
  }
}

async function getSubmissionTotal(req, res, next) {
  try {
    res.json(await dashboardService.getSubmissionTotal(req.user.accessId));
  } catch (err) {
    console.error(`Error while get submission total`, err.message);
    next(err);
  }
}

async function getTotalSubmissionMentorship(req, res, next) {
  try {
    res.json(await dashboardService.getTotalSubmissionMentorship(req.user.id));
  } catch (err) {
    console.error(`Error while get submission total`, err.message);
    next(err);
  }
}

async function getTotalSubmissionProgramTypeMentorship(req, res, next) {
  try {
    res.json(await dashboardService.getTotalSubmissionProgramTypeMentorship(req.user.id));
  } catch (err) {
    console.error(`Error while get submission total`, err.message);
    next(err);
  }
}

module.exports = {
  getSubmissionStatus,
  getSubmissionTotal,
  getTotalSubmissionMentorship,
  getTotalSubmissionProgramTypeMentorship
};
