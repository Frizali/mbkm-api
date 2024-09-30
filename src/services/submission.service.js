const submissionRepo = require("../repository/submission.repository");

async function getSubmissions() {
    let submissions = await submissionRepo.getSubmissions();
    submissions.forEach(submission => {
        submission.SubmissionDate = dateFormatted(submission.SubmissionDate);
        submission.StartDate = dateFormatted(submission.StartDate);
        submission.EndDate = dateFormatted(submission.EndDate);
    });
    return submissions;
}

function dateFormatted(dateId){
    const date = new Date(dateId);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

async function getSubmissionDetail(submissionId) {
    submissionId = parseInt(submissionId);

    let submission = await submissionRepo.getSubmissionById(submissionId);
    if(!submission) throw new Error(`Submission with id ${submissionId} not found`);

    let [subApproval, subAttachment] = await Promise.all([
        submissionRepo.getSubmissionApprovalBySubId(submissionId),
        submissionRepo.getSubmissionAttBySubId(submissionId)
    ]);

    return {
        submission: submission,
        submissionApproval: subApproval,
        submissionAttachment: subAttachment,
    }
}

async function getSubmissionByAccessID(accessId) {
    accessId = parseInt(accessId);

    const submissions = await submissionRepo.getSubmissionByAccessID(accessId);
    submissions.forEach(submission => {
        submission.SubmissionDate = dateFormatted(submission.SubmissionDate);
        submission.StartDate = dateFormatted(submission.StartDate);
        submission.EndDate = dateFormatted(submission.EndDate);
    });
    return submissions;
}

module.exports = {
    getSubmissions,
    getSubmissionDetail,
    getSubmissionByAccessID
}
