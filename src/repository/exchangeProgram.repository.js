const db = require("./db.service");
const helper = require("../utils/helper.util");

async function getExchangeProgramBySubmissionID(submissionId) {
    const rows = await db.query(`SELECT * FROM tblexchangeprogram WHERE SubmissionID = '${submissionId}'`);

    const data = helper.emptyOrRows(rows);
    return data[0];
}

async function getCoursesByExchangeID(exchangeId) {
    const rows = await db.query(`SELECT * FROM tblcourse WHERE ExchangeID = '${exchangeId}'`);

    const data = helper.emptyOrRows(rows);
    return data;
}

async function addCourse(exchangeId,course) {
    const result = await db.query(`INSERT INTO tblcourse (CourseCode,CourseName,Credits,ExchangeID) VALUES(?,?,?,?)`,
        [
            course.courseCode,
            course.courseName,
            course.credits,
            exchangeId
        ]);

    let message = "Error in add Course";

    if (result.affectedRows) {
        message = "Course created successfully";
    }
    
    return { message };
}

async function addExchangeProgram(exchangeId,submissionId,exchangeProgram) {
    const result = await db.query(`INSERT INTO tblexchangeprogram VALUES(?,?,?,?)`,
        [
            exchangeId,
            submissionId,
            exchangeProgram.TypeExchange,
            exchangeProgram.StudyProgramObjective
        ]
    )

    let message = "Error in add Exchange Program";

    if (result.affectedRows) {
        message = "Exchange Program created successfully";
    }
    
    return { message };
}

module.exports = {
    addCourse,
    addExchangeProgram,
    getExchangeProgramBySubmissionID,
    getCoursesByExchangeID
}