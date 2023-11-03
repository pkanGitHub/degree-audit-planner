/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

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

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

/**********************
 * Example get method *
 **********************/

app.get('/api', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

// app.get('/api/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

// app.get("/api/courses", (req, res) => {
//   var retrieved = "false";
//   try {
//     retrieveCoursesData().then((courses) => {
//       // res.status(200).json({
//       //   message: "Course List",
//       //   courses: courses
//       // });
//       retrieved = "true";
//     })
//   }
//   catch {

//   }

//   // .catch((error) => {
//   //   res.status(500).json({ error: "Failed to retrieve courses" });
//   // });
//   res.status(200).json({
//     message: "Course List",
//     // courses: courses
//     retrieved: retrieved
//   });
// });

async function retrieveCoursesData() {
  try {
    const courses = await models.Courses.find({}); 
    return courses;
  } catch (error) {
    throw error;
  }
}

/****************************
* Example post method *
****************************/

app.post('/api', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/api/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/api', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/api/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/api', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/api/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// mongoose.connect("mongodb+srv://root:gmQ3kZT9aKJBQF7W@mernapp.9jdlshy.mongodb.net/?retryWrites=true&w=majority")
// .then(()=>{
//     app.listen(3000, function() {
//       console.log("App started")
//     });
// })
// .catch((error) => {
//     console.log(error)
//     app.listen(3000, function() {
//       console.log("App started")
//     });
// })

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
