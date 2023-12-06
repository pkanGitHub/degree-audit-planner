require('dotenv').config()
const nodemailer = require('nodemailer');
const aws = require("@aws-sdk/client-ses");

// Configure Nodemailer with your email provider's settings

const transporter = nodemailer.createTransport({
    SES: {
      ses: new aws.SES({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
        }
      }),
      aws
    }
  });
  // Function to send verification code via email
  const sendVerificationCode = async(email, code, res) => {
    try { 
        // Compose the email message
        const mailOptions = {
          from: process.env.ADMIN_EMAIL,
          to: email,
          subject: 'Email Verification Code',
          text: `Your verification code is: ${code}`,
        }
       
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent: ' + info.response)
        return 'Email sent successfully';
    } catch (error) {
        console.error(error);
        throw new Error('Failed to send email');
    }
}

module.exports = { sendVerificationCode }