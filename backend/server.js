require('dotenv').config()

const express = require('express')
const app = express()

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the backend'})
})

app.listen(process.env.PORT, () => {
    console.log('start server on port', process.env.PORT)
})