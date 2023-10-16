const mongoose = require('mongoose')

const majorSchema = mongoose.Schema({
<<<<<<< Updated upstream
    _id: { type: String, unique: true },
=======
>>>>>>> Stashed changes
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