const submissionService = require("../services/submission.service");

async function submit(req, res, next) {
  try {
    res.json(await submissionService.submit(req.body));
  } catch (err) {
    console.error(`Error while submit submission`, err.message);
    next(err);
  }
}

async function approve(req, res, next) {
  try {
    res.json(
      await submissionService.approve(req.params.submissionId, req.user.accessId)
    );
  } catch (err) {
    console.error(`Error while approve submission`, err.message);
    next(err);
  }
}

async function reject(req, res, next) {
  try {
    res.json(
      await submissionService.reject(req.params.submissionId, req.user.accessId, req.body)
    );
  } catch (err) {
    console.error(`Error while reject submission`, err.message);
    next(err);
  }
}

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
    res.json(
      await submissionService.getSubmissionDetail(req.params.submissionId, req.user)
    );
  } catch (err) {
    console.error(`Error while getting submission detail`, err.message);
    next(err);
  }
}

async function getSubmissionByAccessID(req, res, next) {
  try {
    res.json(
      await submissionService.getSubmissionByAccessID(req.user.accessId, req)
    );
  } catch (err) {
    console.error(`Error while getting submission detail`, err.message);
    next(err);
  }
}

async function getSubmissionStatus(req, res, next) {
  try {
    res.json(
      await submissionService.getSubmissionStatus(req.user.accessId)
    );
  } catch (err) {
    console.error(`Error while getting submission detail`, err.message);
    next(err);
  }
}

async function getSubmissionMentorship(req, res, next) {
  try {
    res.json(
      await submissionService.getSubmissionMentorship(req.user.id)
    );
  } catch (err) {
    console.error(`Error while getting submission detail`, err.message);
    next(err);
  }
}

async function deleteSubmission(req, res, next) {
  try {
    res.json(
      await submissionService.deleteSubmission(req.params.submissionId, req)
    );
  } catch (err) {
    console.error(`Error while delete submission`, err.message);
    next(err);
  }
}

async function reAssign(req, res, next) {
  try {
    res.json(await submissionService.updateLucturerSubmission(req.body));
  } catch (err) {
    console.error(`Error while Re-Assign`, err.message);
    next(err);
  }
}

module.exports = {
  submit,
  approve,
  reject,
  reAssign,
  getSubmissions,
  getSubmissionDetail,
  getSubmissionByAccessID,
  getSubmissionStatus,
  getSubmissionMentorship,
  deleteSubmission,
};
