const mongoose = require('mongoose')

const majorSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true},
    courses: { type: [{
        label: String,
        list: [{ id: String, or: [ String ]}],
        info: [{ index: Number, comment: String }]
    }]},
    semesters: [{ 
        label: { type: String, required: true },
        courses: [ String ]
    }],
    credits: [{
        area: { type: String, required: true },
        hours: { type: Number, required: true }
    }],
    url: String
})

module.exports = mongoose.model('Major', majorSchema)