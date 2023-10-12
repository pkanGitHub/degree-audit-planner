require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const plannerRoute = require('./routes/planner')

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