const mongoose = require('mongoose')

const majorSchema = mongoose.Schema({
    title: { type: String, required: true},
    totalCredit: { type: Number },
    creditArea: [
        { area: String, creditRequired: Number }
    ],
    semester: { 
        courses:[
            { course: String, required: Boolean }
        ]
    }
})

module.exports = mongoose.model('Major', majorSchema)