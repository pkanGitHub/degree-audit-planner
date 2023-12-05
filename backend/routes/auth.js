const express = require('express')
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../Models/user')
const { sendVerificationCode } = require('../nodemailer-config')
const { codeExpirationTime } = require('../cron/cron-config')


async function retrieveUserData() {
  try {
    const users = await User.find({}) 
    return users
  } catch (error) {
    throw error
  }
}

router.get("/users", (req, res) => {
  retrieveUserData().then((users) => {
    res.status(200).json({
      message: "User List",
      users: users
    })
  })
  .catch((error) => {
    res.status(500).json({ error: "Failed to retrieve Users" })
  })
})

// create user
router.post('/signup', async (req, res) => {
  const {email, password} = req.body
  
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide a email and password' })
  }

  try {
    // check if user already exists
    const existUser = await User.findOne({ email })
    if (existUser) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // Generate a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000)
    // Set the expiration time in cron-config
    const expirationTime = codeExpirationTime()
    const newUser = new User({ email, password: hashedPassword, verificationCode, verificationCodeExpires: expirationTime })
    await newUser.save()

    const emailResult = await sendVerificationCode(email, verificationCode)
    console.log(emailResult)

    res.status(201).json({ msg: 'Sign up successfully, check your email for verification code.' })
      
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Sign up failed' })
  }
})

// reset password
router.post("/resetpassword", async(req, res) => {
  const { email, passwordAgain } = req.body 

  try{
    // check if user already exists
    const existUser = await User.findOne({ email })
    if (!existUser) {
      return res.status(400).json({ msg: 'User does not exist' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(passwordAgain, salt)
    // Generate a verification code
  
    existUser.password = hashedPassword
    await existUser.save()
    res.status(200).json({ success: true, msg: 'Password Successfully changed' })


  }catch (error) {
    console.error(error)
    res.status(500).json({ success: false, msg: 'Failed to update password.' })
  }


}); 

router.post('/verify-email', async(req, res) => {
  const { verificationCode } = req.body
  try {
    const user = await User.findOne({ verificationCode })
    if (!user) {
      return res.status(404).json({ error: 'User not found or invalid verification code' })
    }
    // Check if the verification code matches and not expired
    if (user.verificationCodeExpires && user.verificationCodeExpires > new Date()) {
      user.emailVerified = true
      await user.save()
      res.status(200).json({ success: true, msg: 'Email verification successful', id: user._id })
    } else {
      res.status(400).json({ success: false, error: 'invalid_code' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to verify email' })
  }
})

// login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err)
      return res.status(500).json({ message: 'Internal server error' })
    }

    if (!user) {
      console.log('Incorrect email or password on the server')
      return res.status(401).json({ message: 'Incorrect email or password' })
    }

    req.logIn(user, async(err) => {
      if (err) {
        console.error('Error during login:', err)
        return res.status(500).json({ message: 'Internal server error' })
      }
      const loginVerificationCode = Math.floor(100000 + Math.random() * 900000)
      user.loginVerificationCode = loginVerificationCode
      await user.save()
      const emailResult = await sendVerificationCode(user.email, loginVerificationCode)
      console.log(emailResult)

      console.log('Authentication successful on the server')
      return res.status(200).json({ message: 'Authentication successful', id: user._id })
    })
  })(req, res, next)
})

router.post('/verify-login', async(req, res) => {
  const { loginVerificationCode } = req.body
  try {
    const user = await User.findOne({ loginVerificationCode })
    if (!user) {
      return res.status(404).json({ error: 'User not found or invalid verification code' })
    }
    // if code match, change code to null upon submit
    if (user.loginVerificationCode) {
      user.loginVerificationCode = null
      await user.save()
      res.status(200).json({ success: true, msg: 'User verification successful', id: user._id })
    } else {
      res.status(400).json({ success: false, error: 'invalid_code' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to verify user' })
  }
})


// check email
router.post("/email", async(req, res) => {
  const { email } = req.body
  try {
    // check if user already exists
    const existUser = await User.findOne({ email })
    if (!existUser) {
      return res.status(400).json({ msg: 'User does not exist' })
    }
    // Generate a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000)
    // Store the verification code in the session
    req.session.verificationCode = verificationCode
    console.log(`what should be stored: ${req.session.verificationCode}`)
    req.session.save()

    // console.log('Before sending verification code email')
    const emailResult = await sendVerificationCode(email, verificationCode)
    console.log(emailResult)

    res.status(201).json({ msg: 'Check your email for verification code.' })
      
  } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Email has failed.' })
  }
})

router.post("/api/user/load", (req, res) => {
    User.findOne(
        { _id: req.body.id }
    )
    .then(user => res.status(200).json({
        message: "User data fetched",
        courses: user.courses,
        major: user.major,
        minor: user.minor,
        certificate: user.certificate,
        id: user._id,
        email: user.email
    }))
    .catch(err => res.status(500).json({
        message: "Could not fetch user data",
        error: err
    }))
})

router.post("/api/user/save", (req, res) => {
    User.findOneAndUpdate(
        { _id: req.body.id },
        { 
            courses: req.body.courses,
            major: req.body.major,
            minor: req.body.minor,
            certificates: req.body.cert,
            generalEducationComplete: req.body.genEd
        }
    )
    .then(user => res.status(200).json({
        message: "User data updated"
    }))
    .catch(err => res.status(500).json({
        message: "Could not update user data",
        error: err
    }))
})

module.exports = router