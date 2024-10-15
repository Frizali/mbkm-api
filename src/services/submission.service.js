const submissionRepo = require("../repository/submission.repository");

async function submit(submission) {
    const firstApprover = await submissionRepo.getFirstApproverByProdiId(submission.ProdiID);
    if(!firstApprover) throw new Error('No Approver on this prodi, please set level approver');

    const uuid = uuidv4();
    await submissionRepo.create(uuid,submission);
    return await submissionRepo.createSubmissionApproval(uuid,firstApprover.ApproverID,'Pending');
}

async function approve(submissionId, accessId) {
    
}

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

async function getSubmissionByAccessID(accessId, req) {
    const user = req.user;
    accessId = parseInt(accessId);

    const submissions = await submissionRepo.getSubmissionByAccessID(accessId, user.id);
    submissions.forEach(submission => {
        submission.SubmissionDate = dateFormatted(submission.SubmissionDate);
        submission.StartDate = dateFormatted(submission.StartDate);
        submission.EndDate = dateFormatted(submission.EndDate);
    });

    return await Promise.all(submissions.map(async (item) => {
        let submissionApproval = await submissionRepo.getSubmissionApprovalBySubmission(item.SubmissionID);
        return {
            ...item,
            ApprovalStatus: submissionApproval
        };
    }));
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = {
    submit,
    getSubmissions,
    getSubmissionDetail,
    getSubmissionByAccessID
}
