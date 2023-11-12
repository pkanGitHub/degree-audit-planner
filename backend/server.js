require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const session = require("express-session");
// const plannerRoute = require('./routes/planner')
const authRoute = require('./routes/auth')
const modelNames = ['Course', 'Major', 'Minor', 'Certificate', 'Courses', 'GenEds']
const models = {}
modelNames.forEach(modelName => {
  const Model = require(`./Models/${modelName}`)
  models[modelName] = Model
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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // save if nothing is changed
    resave: false,
    // save empty value in the session if there is no value
    saveUninitialized: false,
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
app.use(passport.session());
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
    });
})
.catch((error) => {
    console.log(error);
});

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

app.post("/addCourseArea", (req, res) => {
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

async function retrieveCourseData() {
  try {
    const courses = await models['Course'].find({}); 
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



