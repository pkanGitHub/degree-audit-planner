const axios = require('axios');
const courses = require('./json/course.data.json');
const programs = require('./json/plans.json');

async function FillCourseData() {
    for (const [key, value] of Object.entries(courses)) {

        const courseList = [];
        for (var i = 0; i < value.length; i++) {
            const course = value[i];

            courseList.push({
                courseID: course.course_id,
                name: course.title,
                credit: course.credit_hours || null,
                category: course.category || null,
                prerequisites: course.prerequisites || null,
                recommended: course.recommended || null,
                description: course.description || null,
                pastTerms: course.past_terms_offered || null
            })
        }

        await axios.post("http://localhost:4000/addCourseArea", { 
            area: key,  
            courses: courseList
        })
        .then((response) => {
            console.log("good");
        }, (error) => {
            console.log(error.response.message);
        });
    }
}

// FillCourseData();

async function FillPlanData() {
    for (const [key, value] of Object.entries(programs)) {

        console.log(value);
        break;


    }
}

FillPlanData();