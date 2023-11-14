const puppeteer = require("puppeteer");
const ws = require("./webscrape.functions");
const fs = require('fs');
const db = require('./database');

// eslint-disable-next-line no-unused-vars
async function CourseDataWebscrape() {
    // const browser = await puppeteer.launch();                           // Starts virtual browser
    // const page = await browser.newPage();                               // Opens a tab in the browser

    // const courses = await ws.GetCatalogSource(page);
    // console.log("Courses fetched");
    // const categories = await ws.GetCategories(page);
    // console.log("Categories fetched");
    // const semesters = await ws.GetSemesters(page);
    // console.log("Semesters fetched");

    // await browser.close();                                              // Closes browser, womp womp

    // const new_courses = {};

    // for (let [key, vals] of Object.entries(courses)) {
    //     const new_vals = []
    //     vals.forEach((course) => {
    //         const nc = {};                                              // nc for new course
            
    //         nc["course_id"] = course.number;                            // I only did it this v way because i wanted it be in a nice order LOL
    //         nc["title"] = course.title;
    //         nc["credit_hours"] = course.credit_hours;
    //         nc["prerequisites"] = course.prerequisites;
    //         nc["recommended"] = course.recommended
    //         nc["description"] = course.description;
    //         nc["categories"] = categories[course.number]?.categories;
    //         nc["available_next_semester"] = course.available_next_semester;
    //         nc["past_terms_offered"] = semesters[course.number];

    //         new_vals.push(nc);
    //     });
    //     new_courses[key] = new_vals;
    // }

    const new_courses = require('./json/course.data.json');

    await db.FillCourseData(new_courses);

    // var jsonData = JSON.stringify(new_courses);
    
    // fs.writeFile("./backend/dataCollection/json/course.data.json", jsonData, function(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    // });

    // console.log(__dirname);
    // const new_courses = require('./json/course.data.json');

    
}


// eslint-disable-next-line no-unused-vars
async function DegreePlanWebscrape() {
    const browser = await puppeteer.launch();           // Starts virtual browser
    const page = await browser.newPage();  
    const plans = await ws.GetDegreePlans(page);
    await browser.close();

    await db.FillPlanData(plans);

    var jsonData = JSON.stringify(plans);
    fs.writeFile("./backend/dataCollection/json/plans.json", jsonData, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

// CourseDataWebscrape();
DegreePlanWebscrape();