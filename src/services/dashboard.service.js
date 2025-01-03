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

async function getTotalSubmissionProgramTypeMentorship(mentorId) {
    let data = await submissionRepo.getTotalSubmissionProgramTypeMentorship(mentorId);

    let categories = [];
    let series = [];
    let a = {
        label: "Proyek Kemanusiaan",
        data: [],
        color: "#FF4C51"
    };
    let b = {
        label: "Kegiatan Wirausaha",
        data: [],
        color: "#4CAF50"
    };
    let c = {
        label: "Studi /Proyek Independen",
        data: [],
        color: "#FFB400"
    };
    let d = {
        label: "Magang Praktik Kerja",
        data: [],
        color: "#8C57FF"
    };
    let f = {
        label: "Asistensi Mengajar di Satuan Pendidikan",
        data: [],
        color: "#2196F3"
    };
    let g = {
        label: "Pertukaran Pelajar",
        data: [],
        color: "#8A8D93"
    };

    data.forEach(e => {
        categories.push(e.Label)
        a.data.push(e.A)
        b.data.push(e.B)
        c.data.push(e.C)
        d.data.push(e.D)
        f.data.push(e.E)
        g.data.push(e.F)
    });
    
    series = [a,b,c,d,f,g]

    return {
        categories: categories,
        series: series
    }
}

async function getSubmissionTotal(accessId) {
    return await submissionRepo.getTotalSubmissionGropByProdi(accessId);
}

async function getTotalSubmissionMentorship(mentorId) {
    return await submissionRepo.getTotalSubmissionMentorship(mentorId);
}

module.exports = {
    getSubmissionStatus,
    getSubmissionTotal,
    getTotalSubmissionMentorship,
    getTotalSubmissionProgramTypeMentorship
}