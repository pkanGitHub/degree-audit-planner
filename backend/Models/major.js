const mongoose = require('mongoose')

const majorSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true},
    courses: { type: [{
        label: String,
        list: { type: [{ id: String, or: { type: [String], default: undefined }}], default: undefined },
        info: { type: [{ index: Number, comment: String }], default: undefined }
    }], default: undefined },
    semesters: { type: [{ 
        label: { type: String, required: true },
        courses: { type: [ String ], default: undefined }
    }], default: undefined },
    credits: { type: [{
        area: { type: String, required: true },
        hours: { type: Number, required: true }
    }], default: undefined },
    url: String
})

module.exports = mongoose.model('Major', majorSchema)