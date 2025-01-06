const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mbkm.notification@gmail.com",
    pass: "gtwl xzsi vmsw izyg",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error verifying transporter:", error);
  } else {
    console.log("Transporter is ready:", success);
  }
});

async function sendFeedBackSubmission(student,submission, status) {
  const filePath = path.join(__dirname, "Feedback.html");
  let htmlTemplate = fs.readFileSync(filePath, "utf-8");

  htmlTemplate = htmlTemplate.replace("{{name}}", student.Name);
  if (status === 'Approved')
    htmlTemplate = htmlTemplate.replace("{{status}}", 'DITERIMA');
  else
    htmlTemplate = htmlTemplate.replace("{{status}}", 'DITOLAK');

  htmlTemplate = htmlTemplate.replace("{{nim}}", student.NIM);
  htmlTemplate = htmlTemplate.replace("{{name}}", student.Name);
  htmlTemplate = htmlTemplate.replace("{{prodi}}", student.ProdiName);
  htmlTemplate = htmlTemplate.replace("{{programType}}", submission.ProgramType);
  htmlTemplate = htmlTemplate.replace("{{activityDate}}", `${formatDate(submission.StartDate)} - ${formatDate(submission.EndDate)}`);
  htmlTemplate = htmlTemplate.replace("{{submitDate}}", formatDate(submission.SubmissionDate));

  const mailOptions = {
    to : student.Email, 
    subject: "FeedBack Submission MBKM",
    text: "FeedBack",
    html: htmlTemplate  
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const optionsDate = {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  };

  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Jakarta",
  };

  const formattedDate = date.toLocaleDateString("en-US", optionsDate);

  return `${formattedDate}`;
};

module.exports = {
    sendFeedBackSubmission
}