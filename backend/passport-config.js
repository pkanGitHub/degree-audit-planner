// const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./Models/user')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, done) => {
            console.log('Local strategy verified cb')
            try {
                // find user with email input from the login form
                const user = await User.findOne({ email }).exec()
      
                if (!user) {
                  console.log('User not found')
                  return done(null, false, { message: 'Incorrect email or password' })
                }
                // Compare login form password with the hashed password(database)
                const passwordMatch = await bcrypt.compare(password, user.password)
                console.log('Input Password:', password)
                console.log('Stored Password:', user.password)
                console.log('Password Match:', passwordMatch)
                if (passwordMatch) {
                  console.log('Authentication successful')
                  return done(null, user)
                } else {
                  console.log('Incorrect password')
                  return done(null, false, { message: 'Incorrect email or password' })
                }
            } catch (err) {
                console.error(err)
                return done(err)
            }
        })
    )
    // store inside of session
    passport.serializeUser((user, done) => {
        user.isAuthenticated = true
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findOne({ _id: id }, (err, user) => {
            console.log('Deserialized user:', user)
            const userInfo = {
                email: user.email,
            }
            done(err, userInfo)
        })
    })
}