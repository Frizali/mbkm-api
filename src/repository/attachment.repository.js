const db = require("./db.service");
const helper = require("../utils/helper.util");

async function addAttachment(submissionId, attachment) {
    const base64Data = attachment.base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    const bufferData = Buffer.from(base64Data, 'base64');
    const result = await db.query(`INSERT INTO tblsubmissionattachment (SubmissionID,AttachType,Base64,AttachName) VALUES(?,?,?,?)`,
        [
            submissionId,
            'pdf',
            bufferData,
            attachment.name
        ]
    )

    let message = "Error in add Attachment";

    if (result.affectedRows) {  
        message = "Attachment created successfully";
    }
    
    return { message };
}

module.exports = {
    addAttachment
}