require('dotenv').config()
const nodemailer = require('nodemailer');
const aws = require("@aws-sdk/client-ses");

// Configure Nodemailer with your email provider's settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASS // uses app password
    },
    logger: true,
    // SES: {
    //     ses: new aws.SES({
    //       region: 'us-east-1',
    //       credentials: {
    //           accessKeyId: process.env.ADMIN_EMAIL,
    //           secretAccessKey: process.env.ADMIN_PASS
    //       }
    //     }),
    //     aws
    //   }
  })

// const transporter = nodemailer.createTransport({
//     SES: {
//       ses: new aws.SES({
//         region: 'us-east-1',
//         credentials: {
//             accessKeyId: 'AKIA5327EGHZ4TVWMFG2',
//             secretAccessKey: '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',
//         }
//       }),
//       aws
//     }
//   });
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