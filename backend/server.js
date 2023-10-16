require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const plannerRoute = require('./routes/planner')
const modelNames = ['User', 'Course', 'Major', 'Minor', 'Certificate']
const models = {}
modelNames.forEach(modelName => {
    const Model = require(`./Models/${modelName}`)
    models[modelName] = Model
})

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/home', plannerRoute)

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    //listen for request
    app.listen(process.env.PORT, () => {
        console.log('start server on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})

/**
 * Set up CORS
 */
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});


//  This will need to be moved into a separate file and hashed.

app.post("/signup", (req, res) => {
    const user = new models['User']({
        email: 'test@test.com',
        password: 'password',
        major: 'Information Technology',
    })

    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
})


app.post("/courses", (req, res) => {
    models['Courses'].find().then((courses) => {
        if (!courses) return;
        res.status(200).json({
          message: "Course List",
          courses: courses
        })
    })
})