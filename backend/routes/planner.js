const express = require('express')

const router = express.Router()

// GET all if we need
router.get('/', (req, res) => {
    res.json({mssg: 'GET all'})
})

module.exports = router