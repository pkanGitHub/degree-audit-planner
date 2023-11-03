const mongoose = require('mongoose')

const models = {
    Certificate: mongoose.Schema({
        title: { type: String, required: true },
        url: String,
        courses: {
            label: String,
            list: { type: [{ id: String, or: { type: [ String ], default: undefined }}], default: undefined },
            info: { type: [{ index: Number, comment: String }], default: undefined }
        },
        credits: { type: [{
            area: { type: String, required: true },
            hours: { type: Number, required: true }
        }], default: undefined }
    }),

    Course: mongoose.Schema({
        courseID: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        credit: { type: Number },
        category: { type: String },
        prerequisites: { type: String },
        description: { type: String },
        available: { type: Boolean }
    }),

    Courses: mongoose.Schema({
        area: {type: String, required: true, unique: true},
        courses: {type: [{
            courseID: { type: String, required: true },
            name: { type: String, required: true },
            credit: String,
            category: String,
            prerequisites: String,
            description: String,
            available: Boolean,
            pastTerms: {type: [{type: String}]}
        }],
        required: true}
    }), 

    GenEds: mongoose.Schema({
        year: Number,
        requirements: [{
            label: String,
            hours: Number,
            completion: Boolean,
            info: String,
            categories: { type: [String], default: undefined },
                properties: { type: [String], default: undefined },
            sub: { type: [{
                label: String,
                hours: Number,
                info: String,
                categories: { type: [String], default: undefined },
                properties: { type: [String], default: undefined }
            }], default: undefined }
        }]
    }),

    Majors: mongoose.Schema({
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
    }),

    Minors: mongoose.Schema({
        title: { type: String, required: true, unique: true },
        totalCredit: Number,
        courses: { type: [{
            label: String,
            list: { type: [{ id: String, or: [ String ]}], default: undefined },
            info: { type: [{ index: Number, comment: String }], default: undefined }
        }], default: undefined },
        hasPlan: { type: Boolean },
        url: { type: String }
    }),

    Users: mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        major: { type: String, required: true },
        coursePlan: {
            semester: [{
                date: { type: Date },
                courses: [{
                    inProgress: { type: Boolean, default: false },
                    completed: { type: Boolean, required: true },
                    completion_date: { type: Date }
                }]
            }]
        },
        generalEducationCompleted: { type: Boolean, required: true, default: false },
        programRequirements: [{
            description: String,
            completed: { type: Boolean, default: false },
            courses: [String],
            creditHours: Number
        }]
    })
}