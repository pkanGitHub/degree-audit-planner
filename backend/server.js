require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const session = require("express-session");
const cookieParser = require('cookie-parser')
// const plannerRoute = require('./routes/planner')
const authRoute = require('./routes/auth')
const modelNames = ['Course', 'Major', 'Minor', 'Certificate', 'Courses', 'GenEds']
const models = {}
modelNames.forEach(modelName => {
  const Model = require(`./Models/${modelName}`)
  models[modelName] = Model
})
const cron = require('node-cron')
const { removeUnverifiedEmailCron } = require('./cron/removeUnverifiedEmail')
const { removeExpiredCodesCron } = require('./cron/emptyExpiredCode')

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
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // save if nothing is changed
    resave: false,
    // save empty value in the session if there is no value
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//middlewares
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use(passport.initialize());
app.use(passport.session({
  // login sessions last 1 hour?
  sessionID: 'session',
  maxAge: 3600
}));

require('./passport-config')(passport);
app.use('/', authRoute);

app.use('/', (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
// app.use('/api/home', plannerRoute)
// connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    //listen for request
    app.listen(process.env.BACKEND_PORT, () => {
        console.log('Mongo connection successful on port', process.env.BACKEND_PORT);
        removeUnverifiedEmailCron();
        removeExpiredCodesCron();
    });
    // Run the cron job
    // Change time to operate cron job in 'cron-config' file

     
})
.catch((error) => {
    console.log(error);
});

// Get from all schemes

app.get("/api/certificates", (req, res) => {
    // res.redirect('/api/certificates/2023-24')
    models['Certificate'].find()
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
      message: "Certificate List",
      certificates: certificates
    });
  })
  .catch((error) => {
    res.status(500).json({ error: "Failed to retrieve Certificates" });
  });
});

app.get("/api/majors", (req, res) => {
    // res.redirect('/api/majors/2023-24')
    models['Major'].find()
    .then((majors) => {
        res.status(200).json({
            message: "Major List",
            majors: majors
          });
    })
    .catch((error) => {
        res.status(500).json({ error: "Failed to retrieve Majors" });
      });;
});

app.get("/api/majors/:year", (req, res) => {
  retrieveMajorData(req.params.year).then((majors) => {
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
    models['Minor'].find()
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
      message: "Minor List",
      minors: minors
    });
  })
  .catch((error) => {
    res.status(500).json({ error: "Failed to retrieve Minors" });
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

app.post("/addCourseArea", (req, res) => {
    models['Courses'].updateOne(
        { area: req.body.area },
        { $set: { courses: req.body.courses }},
        { upsert: true }
    )
    .then(result => {
        res.status(201).json({
          message: "Course area added!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err.message
        });
      });
  })

  app.post("/addCourse", (req, res) => {
    models['Courses'].updateOne(
        { area: req.body.area },
        { $push: { courses: req.body.course }})
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


app.post("/addMinor/:year", (req, res) => {
    models['Minor'].updateOne({
        year: req.params.year
        },{
        $addToSet: { programs: { title: req.body.title }}
        },{
        upsert: true
    })
    .then(() => models['Minor'].updateOne({
        year: req.params.year,
        programs: {
            $elemMatch: {
                title: req.body.title
            }
        }}, {
        $set: {
            "programs.$.requirements": req.body.requirements,
            "programs.$.url": req.body.url
        }}, {
        upsert: true      
    }))
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

app.post("/addMajor/:year", (req, res) => {
    models['Major'].updateOne({
        year: req.params.year
        },{
        $addToSet: { programs: { title: req.body.title }}
        },{
        upsert: true
    })
    .then(() => models['Major'].updateOne({
        year: req.params.year,
        programs: {
            $elemMatch: {
                title: req.body.title
            }
        }}, {
        $set: {
            "programs.$.requirements": req.body.requirements,
            "programs.$.years": req.body.years,
            "programs.$.url": req.body.url
        }}, {
        upsert: true      
    }))
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

app.post("/addCert/:year", (req, res) => {
    models['Certificate'].updateOne({
        year: req.params.year
        },{
        $addToSet: { programs: { title: req.body.title }}
        },{
        upsert: true
    })
    .then(() => models['Certificate'].updateOne({
        year: req.params.year,
        programs: {
            $elemMatch: {
                title: req.body.title
            }
        }}, {
        $set: {
            "programs.$.requirements": req.body.requirements,
            "programs.$.years": req.body.years,
            "programs.$.url": req.body.url
        }}, {
        upsert: true      
    }))
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


app.post('/addGenEds', (req, res) => {
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

//------ Fetch Years ------//
app.get("/api/years", (req, res) => {
    models['Major'].distinct("year")
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
    const certificates = await models['Certificate'].findOne({ year: year }); 
    return certificates.programs;
  } catch (error) {
    throw error;
  }
}

async function retrieveMajorData(year) {
    console.log(year);
  try {
    const majors = await models['Major'].findOne({ year: year });
    return majors.programs;
  } catch (error) {
    throw error;
  }
}

async function retrieveMinorData(year) {
  try {
    const minors = await models['Minor'].findOne({ year: year }); 
    return minors.programs;
  } catch (error) {
    throw error;
  }
}

async function retrieveCourseData(page) {
    try {
      const limit = 60;
      const skip = (page - 1) * limit;
      const courses = await models['Courses'].find().skip(skip).limit(limit);
      return courses;
    } catch (error) {
      throw error;
    }
  }

async function retrieveGenEds() {
  try {
    const genEds = await models['GenEds'].find({}); 
    return genEds;
  } catch (error) {
    throw error;
  }
}
//-------------------------------------------------------------



