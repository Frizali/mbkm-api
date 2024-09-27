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
    try {
        submissionId = parseInt(submissionId);
    } catch (error) {
        throw new Error(`Error while parsing ${error}`)
    }
    let submission = await submissionRepo.getSubmissionById(submissionId);
    if(!submission) throw new Error(`Submission with id=${submission} not found`);

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

module.exports = {
    getSubmissions,
    getSubmissionDetail
}
