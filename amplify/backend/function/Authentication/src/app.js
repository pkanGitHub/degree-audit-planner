// Database Connections
const connection = require('./db');
const mongoose = require('mongoose')

const express = require('express')
const session = require("express-session");
const bodyParser = require('body-parser')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// const { sendVerificationCode } = require('../nodemailer-config')
// const { codeExpirationTime } = require('../cron/cron-config')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

const User = () => mongoose.model('User', require('./user'));

const timeZone = 'America/Chicago'
const codeExpirationTime = () => {
    const min = 5
    const codeExpires = new Date(Date.now() + min * 60 * 1000).toLocaleString('en-US', { timeZone })
    return codeExpires
}

// Enable CORS for all methods
app.use(async (req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods",
      "GET, POST"
    );
    try {
        await connection;
    }       
    catch (error) {
        res.status(500).json({ error: error });
    }
    
    next();
  });


app.use(
    session({
        secret: "alskdjflkjasldfjlkjasdf",
        // save if nothing is changed
        resave: false,
        // save empty value in the session if there is no value
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session({
    // login sessions last 1 hour?
    sessionID: 'session',
    maxAge: 3600
}));

require('./passport-config')(passport);

//***** Routes *****//

async function retrieveUserData() {
  try {
    const users = await User().find({}) 
    return users
  } catch (error) {
    throw error
  }
}

app.get("/auth/users", (req, res) => {
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
app.post('/auth/signup', async (req, res) => {

    // res.json({success: 'signup call succeed!', url: req.url, body: req.body})

  const {email, password} = req.body
  
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide a email and password' })
  }

  try {
    // check if user already exists
    const existUser = await User().findOne({ email })
    if (existUser) {
      return res.status(400).json({ msg: 'User already exists' })
    }


    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Generate a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000)
    // Set the expiration time in cron-config
    const expirationTime = codeExpirationTime()
    // const newUser = new User()({ email, password: hashedPassword, verificationCode, verificationCodeExpires: expirationTime })
    // await newUser.save()

    await User().create({ 
        email: email, 
        password: hashedPassword, 
        verificationCode: verificationCode, 
        verificationCodeExpires: expirationTime 
    })

    return res.status(201).json({ msg: 'Sign up successfully, check your email for verification code.' })

      // console.log('Before sending verification code email')
    //   const emailResult = await sendVerificationCode(email, verificationCode)
    //   console.log(emailResult)
    
      
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Sign up failed' })
  }
})

app.post('/auth/verify-email', async(req, res) => {
  const { verificationCode } = req.body
  try {
    const user = await User().findOne({ verificationCode })
    if (!user) {
      return res.status(404).json({ error: 'User not found or invalid verification code' })
    }
    // Check if the verification code matches and not expired
    if (user.verificationCodeExpires && user.verificationCodeExpires > new Date()) {
      user.emailVerified = true
      await user.save()
      res.status(200).json({ success: true, msg: 'Email verification successful' })
    } else {
      res.status(400).json({ success: false, error: 'invalid_code' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to verify email' })
  }
})

// login
app.post("/auth/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
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
        return res.status(200).json({ message: 'Authentication successful', id: user._id  })
      })
    })(req, res, next)
  })

app.post("/auth/user/save", (req, res) => {
    User().findOneAndUpdate(
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
        message: "User data updated",
        data: user
    }))
    .catch(err => res.status(500).json({
        message: "Could not update user data",
        error: err
    }))
})

app.post("/auth/user/load", (req, res) => {
    User().findOne(
        { _id: req.body.id }
    )
    .then(user => res.status(200).json({
        message: "User data fetched",
        courses: user.courses,
        major: user.major,
        minor: user.minor,
        certificate: user.certificate
    }))
    .catch(err => res.status(500).json({
        message: "Could not fetch user data",
        error: err
    }))
})

app.listen(3000, function() {
    console.log("App started")
});




module.exports = app
