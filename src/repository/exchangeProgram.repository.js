const db = require("./db.service");
const helper = require("../utils/helper.util");

async function addExchangeProgram(submissionId,exchangeProgram) {
    const result = await db.query(`INSERT INTO tblExchangeProgram VALUES(?,?,?,?,?)`,
        [
            exchangeProgram.id,
            submissionId,
            exchangeProgram.courseCode,
            exchangeProgram.courseName,
            exchangeProgram.credits
        ]);

    let message = "Error in add Exchange Program";

    if (result.affectedRows) {
        message = "Exchange Program created successfully";
    }
    
    return { message };
}

module.exports = {
    addExchangeProgram
}