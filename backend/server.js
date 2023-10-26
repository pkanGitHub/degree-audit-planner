require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const plannerRoute = require('./routes/planner')
const modelNames = ['User', 'Course', 'Major', 'Minor', 'Certificate', 'Courses']
const models = {}
modelNames.forEach(modelName => {
    const Model = require(`./Models/${modelName}`)
    models[modelName] = Model
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/home', plannerRoute)

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    //listen for request
    app.listen(process.env.PORT, () => {
        console.log('Mongo connection successful on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})

/**
 * Set up CORS
 */
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});


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


// app.post("/courses", (req, res) => {
//     models['Courses'].find().then((courses) => {
//         if (!courses) return;
//         res.status(200).json({
//           message: "Course List",
//           courses: courses
//         })
//     })
// })

// Get from all schemes
app.get("/certificates", (req, res) => {
  retrieveCertificateData().then((certificates) => {
    res.status(200).json({
      message: "Certificate List",
      certificates: certificates
    })
  })
})

app.get("/majors", (req, res) => {
  retrieveMajorData().then((majors) => {
    res.status(200).json({
      message: "Major List",
      majors: majors
    })
  })
})

app.get("/minors", (req, res) => {
  retrieveMinorData().then((minors) => {
    res.status(200).json({
      message: "Minor List",
      minors: minors
    })
  })
})

app.get("/users", (req, res) => {
  retrieveUserData().then((users) => {
    res.status(200).json({
      message: "User List",
      users: users
    })
  })
})

app.get("/courses", (req, res) => {
  retrieveCourseData().then((courses) => {
    res.status(200).json({
      message: "Course List",
      courses: courses
    })
  })
})

// //Add data to schemes
// app.post("/addCertificate", (req, res) => {
//   const certificate = new models['Certificate']({
//     title: req.body.title,
//     totalCredit: req.body.totalCredit,
//     courses: req.body.courses,
//   })

//   certificate
//     .save()
//     .then(result => {
//       res.status(201).json({
//         message: "Certificate created!",
//         result: result
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// })

// app.post("/addMajor", (req, res) => {
//   const major = new models['Major']({
//     title: req.body.title,
//     totalCredit: req.body.totalCredit,
//     creditArea: req.body.creditArea,
//     semester: req.body.semester,
//   })

//   major
//     .save()
//     .then(result => {
//       res.status(201).json({
//         message: "Major created!",
//         result: result
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// })

app.post("/addMinor", (req, res) => {
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

app.post("/addUser", (req, res) => {
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

// app.post("/addCourse", (req, res) => {
//   const course = new models['Course']({
//     courseID: req.body.courseID,
//     name: req.body.name,
//     credit: req.body.credit,
//     category: req.body.category,
//     prerequisites: req.body.prerequisites,
//     description: req.body.description,
//     available: req.body.available
//   })

//   course
//     .save()
//     .then(result => {
//       res.status(201).json({
//         message: "Course created!",
//         result: result
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// })

app.post("/addCourseArea", (req, res) => {
    console.log(req.body);
    // const course = new models['Courses']({
    //     area: req.body.area,
    //     courses: []
    // })

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
  
    // console.log(course);

    // course
    //   .save()
    //   .then(result => {
    //     res.status(201).json({
    //       message: "Course created!",
    //       result: result
    //     });
    //   })
    //   .catch(err => {
    //     res.status(500).json({
    //       error: err.message
    //     });
    //   });
  })

  app.post("/addCourse", (req, res) => {
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



app.post("/addMajor", (req, res) => {
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

app.post("/addCert", (req, res) => {

  // console.log(req.body);

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



