const express = require('express')
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../Models/user')

async function retrieveUserData() {
    try {
      const users = await User.find({}); 
      return users;
    } catch (error) {
      throw error;
    }
  }

router.get("/users", (req, res) => {
    retrieveUserData().then((users) => {
      res.status(200).json({
        message: "User List",
        users: users
      });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to retrieve Users" });
    });
  });

// create user
router.post('/signup', async (req, res) => {
    // console.log(req.body);
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
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ email, password: hashedPassword })

        await newUser.save()
        res.status(201).json({ msg: 'Sign up successfully' })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Sign up failed' });
    }
})

// login

router.post("/login", (req, res, next) => {
    console.log('Login request body:', req.body);
    
    passport.authenticate("local", (err, user, info) => {
      console.log('Authentication info:', info);
      
      if (err) {
        console.error('Error during authentication:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      if (!user) {
        // Authentication failed
        console.log('Incorrect email or password on the server');
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
  
      // Authentication succeeded
      req.logIn(user, (err) => {
        if (err) {
          console.error('Error during login:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
  
        console.log('Authentication successful on the server');
        return res.status(200).json({ message: 'Authentication successful' });
      });
    })(req, res, next);
  });

// or

// router.post("/login", passport.authenticate("local", {
//     successRedirect: '/audit',
//     failureRedirect: '/login',
//     failureFlash: true
// }));
module.exports = router