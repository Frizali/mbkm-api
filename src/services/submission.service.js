const submissionRepo = require("../repository/submission.repository");
const userRepo = require("../repository/user.repository");

async function submit(submission) {
    const firstApprover = await submissionRepo.getFirstApproverByProdiId(submission.ProdiID);
    if(!firstApprover) throw new Error('No Approver on this prodi, please set level approver');

    const uuid = uuidv4();
    await submissionRepo.create(uuid,submission);
    return await submissionRepo.createSubmissionApproval(uuid,firstApprover.ApproverID,'Pending');
}

async function approve(submissionId, accessId) {
    let currApprover = await submissionRepo.getCurrentApprover(submissionId, accessId);
    if(!currApprover) throw new Error('You dont have access to approve this submission');

    await  Promise.all([
        submissionRepo.updateSubmissionApproval(submissionId, currApprover.ApproverID, 'Approved')
    ])
    
    let nextApprover = await submissionRepo.getNextApprover(currApprover.ProdiID, currApprover.Level + 1);

    if(nextApprover){
        await submissionRepo.createSubmissionApproval(submissionId, nextApprover.ApproverID, 'Pending');
    }

    let message = "Submission has been approved"
    return { message }
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
    let [submission,subApproval, subAttachment] = await Promise.all([
        submissionRepo.getSubmissionById(submissionId),
        submissionRepo.getSubmissionApprovalBySubmission(submissionId),
        submissionRepo.getSubmissionAttBySubId(submissionId)
    ]);

    let studentDetail = await userRepo.getUserByID(submission.StudentID);
    studentDetail.UserPhoto = studentDetail.UserPhoto.toString('base64')
    return {
        submission: submission,
        submissionApproval: subApproval,
        submissionAttachment: subAttachment,
        student: studentDetail
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

async function deleteSubmission(submissionId, req) {
    const user = req.user;
    var accessId = parseInt(user.accessId);

    if(accessId != 1) throw new Error('You dont have access to delete')
    
    return await submissionRepo.deleteSubmission(submissionId);
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
    getSubmissionByAccessID,
    deleteSubmission,
    approve
}
