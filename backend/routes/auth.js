const express = require('express')
// const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../Models/user')

// create user
router.post('/signup', async (req, res) => {
    // console.log(req.body);
    const {email, password} = req.body
    // const {email, password, major, coursePlan} = req.body
    
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
        // const newUser = new User({email, password: hashedPassword, major, coursePlan})

        await newUser.save()
        res.status(201).json({ msg: 'Sign up successfully' })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Sign up failed' });
    }
})

// login
// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/', //
// }))

module.exports = router

// app.post("/signup", (req, res) => {
//     const user = new models['User']({
//         email: 'test@test.com',
//         password: 'password',
//         major: 'Information Technology',
//     })

//     user
//       .save()
//       .then(result => {
//         res.status(201).json({
//           message: "User created!",
//           result: result
//         });
//       })
//       .catch(err => {
//         res.status(500).json({
//           error: err
//         });
//       });
// })
