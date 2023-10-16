const mongoose = require('mongoose')

const minorSchema = mongoose.Schema({
<<<<<<< Updated upstream
    _id: { type: String, unique: true },
=======
>>>>>>> Stashed changes
    title: { type: String, required: true },
    totalCredit: { type: Number },
    courses:[
        { course: String, required: Boolean },
    ]
})

module.exports = mongoose.model('Minor', minorSchema)