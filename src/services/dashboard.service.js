const submissionRepo = require("../repository/submission.repository");
const userRepo = require("../repository/user.repository");
const exchangeProgramRepo = require("../repository/exchangeProgram.repository");
const attachmentRepo = require("../repository/attachment.repository")

async function getSubmissionStatus(accessId) {
    let data = await submissionRepo.getAllSubmissionStatusGroupByProdi(accessId);

    let categories = [];
    let series = [];
    let processing = {
        label: "Processing",
        data: [],
        color: "#2196F3"
    };
    let approved = {
        label: "Approved",
        data: [],
        color: "#4CAF50"
    };
    let rejected = {
        label: "Rejected",
        data: [],
        color: "#F44336"
    };

    data.forEach(e => {
        categories.push(e.ProdiName)
        processing.data.push(e.Processing)
        approved.data.push(e.Approved)
        rejected.data.push(e.Rejected)
    });
    
    series = [processing,approved,rejected]

    return {
        categories: categories,
        series: series
    }
}

async function getSubmissionTotal(accessId) {
    return await submissionRepo.getTotalSubmissionGropByProdi(accessId)
}

module.exports = {
    getSubmissionStatus,
    getSubmissionTotal
}