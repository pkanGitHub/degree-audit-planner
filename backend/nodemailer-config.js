require('dotenv').config()
const nodemailer = require('nodemailer');

// Configure Nodemailer with your email provider's settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASS // uses app password
    },
    logger: true,
  })
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
        // res.status(200).json({ msg: 'Email sent successfully' })
        return 'Email sent successfully';
    } catch (error) {
        console.error(error);
        throw new Error('Failed to send email');
    }
}

module.exports = { sendVerificationCode }