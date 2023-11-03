const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

const mongoose = require('mongoose')
const modelNames = ['User', 'Course', 'Major', 'Minor', 'Certificate', 'Courses', 'GenEds']
const models = {}
modelNames.forEach(modelName => {
    const Model = require(`./Models/${modelName}`)
    models[modelName] = Model
})

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


mongoose.connect("mongodb+srv://root:gmQ3kZT9aKJBQF7W@mernapp.9jdlshy.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    app.listen(3000, function() {
      console.log("App started")
    });
})
.catch((error) => {
    console.log(error)
})

/**
 * Set up CORS
 */
// app.use((req, res, next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.setHeader("Access-Control-Allow-Methods",
//       "GET, POST, PATCH, DELETE, OPTIONS"
//     );
//     next();
// });


//  This will need to be moved into a separate file and hashed.

app.post("/signup", (req, res) => {
    const user = new models['User']({
        email: 'test@test.com',
        password: 'password',
        major: 'Information Technology',
    })

    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
})

// Get from all schemes
app.get("/api/certificates", (req, res) => {
  retrieveCertificateData().then((certificates) => {
    res.status(200).json({
      message: "Certificate List",
      certificates: certificates
    });
  })
  .catch((error) => {
    res.status(500).json({ error: "Failed to retrieve Certificates" });
  });
});

app.get("/api/majors", (req, res) => {
  retrieveMajorData().then((majors) => {
    res.status(200).json({
      message: "Major List",
      majors: majors
    });
  })
  .catch((error) => {
    res.status(500).json({ error: "Failed to retrieve Majors" });
  });
});

app.get("/api/minors", (req, res) => {
  retrieveMinorData().then((minors) => {
    res.status(200).json({
      message: "Minor List",
      minors: minors
    });
  })
  .catch((error) => {
    res.status(500).json({ error: "Failed to retrieve Minors" });
  });
});

app.get("/api/users", (req, res) => {
  retrieveUserData().then((users) => {
    res.status(200).json({
      message: "User List",
      users: users
    });
  })
  .catch((error) => {
    res.status(500).json({ error: "Failed to retrieve Users" });
  });
});

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


app.post("/api/addMinor", (req, res) => {
  models['Minor'].findOneAndUpdate(
    { title: req.body.title },
    { $set: {
      title: req.body.title,
      courses: req.body.courses,
      url: req.body.url
    }},
    { upsert: true }
    )
  .then(result => {
    res.status(201).json({
      message: "Minor created!",
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
})

app.post("/api/addUser", (req, res) => {
  const user = new models['User']({
    email: req.body.email,
    password: req.body.password,
    major: req.body.major,
    coursePlan: req.body.coursePlan,
    url: req.body.url
  })

  user
    .save()
    .then(result => {
      res.status(201).json({
        message: "User created!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
})

app.post("/api/addCourseArea", (req, res) => {
    models['Courses'].findOneAndUpdate(
        { area: req.body.area },
        { $set: { courses: req.body.courses }},
        { upsert: true }
    )
    .then(result => {
        res.status(201).json({
          message: "Course added!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err.message
        });
      });
  })

  app.post("/api/addCourse", (req, res) => {
    models['Courses'].findOneAndUpdate(
        { area: req.body.area },
        { $set: { courses: req.body.courses }})
      .then(result => {
        res.status(201).json({
          message: "Course added!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  })



app.post("/api/addMajor", (req, res) => {
  models['Major'].findOneAndUpdate(
    { title: req.body.title },
    { $set: {
      courses: req.body.courses,
      semesters: req.body.semesters,
      credits: req.body.credits
    }},
    { upsert: true }
  )
  .then(result => {
    res.status(201).json({
      message: "Major created!",
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
})

app.post("/api/addCert", (req, res) => {
  models['Certificate'].findOneAndUpdate(
    { title: req.body.title },
    { $set: {
      url: req.body.url,
      courses: req.body.courses,
      credits: req.body.credits
    }},{ upsert: true }
  )
  .then(result => {
    res.status(201).json({
      message: "Major created!",
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err.message
    });
  });
})


app.post('/api/addGenEds', (req, res) => {
  models['GenEds'].findOneAndUpdate(
    { year: req.body.year },
    { $set: {
      requirements: req.body.reqs
    }},{ upsert: true }
  )
  .then(result => {
    res.status(201).json({
      message: "GenEds added!",
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err.message
    });
  });
})

//Retrieve data functions
async function retrieveCertificateData() {
  try {
    const certificates = await models['Certificate'].find({}); 
    return certificates;
  } catch (error) {
    throw error;
  }
}

async function retrieveMajorData() {
  try {
    const majors = await models['Major'].find({}); 
    return majors;
  } catch (error) {
    throw error;
  }
}

async function retrieveMinorData() {
  try {
    const minors = await models['Minor'].find({}); 
    return minors;
  } catch (error) {
    throw error;
  }
}

async function retrieveUserData() {
  try {
    const users = await models['User'].find({}); 
    return users;
  } catch (error) {
    throw error;
  }
}

async function retrieveCourseData() {
  try {
    const courses = await models['Course'].find({}); 
    return courses;
  } catch (error) {
    throw error;
  }
}
//-------------------------------------------------------------






// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
