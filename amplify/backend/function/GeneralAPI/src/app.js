/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const connection = require('./db')
const mongoose = require('mongoose')

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())


const Certificate = () => mongoose.model('Certificate', require('./Models/certificate'));
const Courses = () => mongoose.model('Courses', require('./Models/courses'));
const GenEds = () => mongoose.model('GenEds', require('./Models/geneds'));
const Major = () => mongoose.model('Major', require('./Models/major'));
const Minor = () => mongoose.model('Minor', require('./Models/minor'));
const User = () => mongoose.model('User', require('./Models/user'));

// Enable CORS for all methods
app.use(async (req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods",
      "GET, POST"
    );
    try {
        await connection;
    }       
    catch (error) {
        res.status(500).json({ error: error });
    }
    
    next();
  });


//------ Fetch Certificates ------//
app.get("/api/certificates", (req, res) => {
    Certificate().find()
    .then((certificates) => {
        res.status(200).json({
            message: "Certificate List",
            certificates: certificates
          });
    })
    .catch((error) => {
        res.status(500).json({ error: "Failed to retrieve Certificates" });
      });;
});

app.get("/api/certificates/:year", (req, res) => {
  retrieveCertificateData(req.params.year).then((certificates) => {
    res.status(200).json({
      message: `Certificate List page: ${req.params.year}`,
      certificates: certificates
    });
  })
  .catch((error) => {
    res.status(500).json({ error: "Failed to retrieve Certificates" });
  });
});


//------ Fetch Majors ------//
app.get("/api/majors", async (req, res) => {
    await Promise.all(
        await Major().distinct('year')
        .then(years => years
            .map(year => Major()
            .findOne({year: year})
            .then(major => major)))
    )
    .then(majors => {
        res.status(200).json({
            message: "Major List",
            majors: majors
        });
    })

});

app.get("/api/majors/:year", (req, res) => {
  retrieveMajorData(req.params.year).then((majors) => {
    res.status(200).json({
      message: `Major List page: ${req.params.year}`,
      majors: majors
    });
  })
  .catch((error) => {
    res.status(500).json({ error: "Failed to retrieve Majors" });
  });
});

//------ Fetch Minors ------//
app.get("/api/minors", (req, res) => {
    Minor().find()
    .then((minors) => {
        res.status(200).json({
            message: "Minor List",
            minors: minors
          });
    })
    .catch((error) => {
        res.status(500).json({ error: "Failed to retrieve Minors" });
      });;
});

app.get("/api/minors/:year", (req, res) => {
  retrieveMinorData(req.params.year).then((minors) => {
    res.status(200).json({
      message: `Minor List page: ${req.params.year}`,
      minors: minors
    });
  })
  .catch((error) => {
    res.status(500).json({ error: "Failed to retrieve Minors" });
  });
});


//------ Fetch Courses ------//
app.get("/api/courses", (req, res) => {
  retrieveCourseData().then((courses) => {
    res.status(200).json({
      message: "Course List",
      courses: courses
    });
  })
  .catch((error) => {
    res.status(500).json({ error: "Failed to retrieve courses" });
  });
});

app.get('/api/courses/:page', (req,res) => {
    retrieveCourseData(req.params.page).then((courses) => {
        res.status(200).json({
          message: `Course List page: ${req.params.page}`,
          courses: courses
        });
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to retrieve courses" });
      });
})


//------ Fetch General Education Requirements ------//
app.get("/api/genEds", (req, res) => {
  retrieveGenEds().then((genEds) => {
    res.status(200).json({
      message: "Gen Eds",
      genEds: genEds
    });
  })
  .catch((error) => {
    res.status(500).json({ error: "Failed to retrieve Gen Eds" });
  });
});


//------ Fetch Years ------//
app.get("/api/years", (req, res) => {
    Major().distinct("year")
    .then(years => {
        res.status(200).json({
            message: "Years",
            years: years
        })
    })
    .catch(error => {
        res.status(500).json({ error: "Failed to retrieve year list" });
    })
})

//Retrieve data functions
async function retrieveCertificateData(year) {
  try {
    const certificates = await Certificate().findOne({ year: year }); 
    return certificates.programs;
  } catch (error) {
    throw error;
  }
}

async function retrieveMajorData(year) {
    console.log(year);
  try {
    const majors = await Major().findOne({ year: year });
    return majors.programs;
  } catch (error) {
    throw error;
  }
}

async function retrieveMinorData(year) {
  try {
    const minors = await Minor().findOne({ year: year }); 
    return minors.programs;
  } catch (error) {
    throw error;
  }
}

async function retrieveCourseData(page) {
  try {
    const limit = 40;
    const skip = (page - 1) * limit;
    const courses = await Courses().find().skip(skip).limit(limit);
    return courses;
  } catch (error) {
    throw error;
  }
}

async function retrieveGenEds() {
  try {
    const genEds = await GenEds().find({}); 
    return genEds;
  } catch (error) {
    throw error;
  }
}
//-------------------------------------------------------------



// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
