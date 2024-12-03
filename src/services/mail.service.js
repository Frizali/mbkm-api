const nodemailer = require("nodemailer");

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

async function sendFeedBackSubmission(studentEmail) {
  const mailOptions = {
    to : studentEmail, 
    subject: "FeedBack Submission MBKM",
    text: "FeedBack",
    html: ""  
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = {
    sendFeedBackSubmission
}