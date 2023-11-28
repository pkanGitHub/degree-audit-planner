const express = require('express')
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../Models/user')
const { sendVerificationCode } = require('../nodemailer-config')

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
    // console.log(req.body)
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
      // Generate a verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000)
      // Set the expiration time for the verification code for 3 mins
      const expirationTime = new Date(Date.now() + 3 * 60 * 1000);

      req.session.save()
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
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

router.post('/verify-email', async(req, res) => {
  const { verificationCode } = req.body
  try {
    const user = await User.findOne({ verificationCode })
    if (!user) {
      return res.status(404).json({ error: 'User not found or invalid verification code' })
    }
    // Check if the verification code matches and is not expired
    if (user.verificationCodeExpires && user.verificationCodeExpires > new Date()) {
      // Update the user to mark email as verified
      user.emailVerified = true
      await user.save()

      res.status(200).json({ success: true, msg: 'Email verification successful' })
    } else {
        res.status(400).json({ success: false, msg: 'Invalid verification code or code has expired' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to verify email' })
  }
})

// // login
router.post("/login", (req, res, next) => {
    // console.log('Login request body:', req.body)
    passport.authenticate("local", (err, user, info) => {
      console.log('Authentication info:', info)
      
      if (err) {
        console.error('Error during authentication:', err)
        return res.status(500).json({ message: 'Internal server error' })
      }

      if (!user) {
        // Authentication failed
        console.log('Incorrect email or password on the server')
        return res.status(401).json({ message: 'Incorrect email or password' })
      }
  
      // Authentication succeeded
      req.logIn(user, (err) => {
        if (err) {
          console.error('Error during login:', err)
          return res.status(500).json({ message: 'Internal server error' })
        }
  
        console.log('Authentication successful on the server')
        return res.status(200).json({ message: 'Authentication successful' })
      })
    })(req, res, next)
  })

module.exports = router