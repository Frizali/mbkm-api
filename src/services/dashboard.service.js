const submissionRepo = require("../repository/submission.repository");

async function getSubmissionStatus(accessId) {
    let data = await submissionRepo.getAllSubmissionStatusGroupByProdi(accessId);

    let categories = [];
    let series = [];
    let pending = {
        label: "Pending",
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
        pending.data.push(e.Pending)
        approved.data.push(e.Approved)
        rejected.data.push(e.Rejected)
    });
    
    series = [pending,approved,rejected]

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