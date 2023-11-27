const axios = require('axios');
const gens = require('./json/geneds-reqs.json')

require('dotenv').config();
const url = `http://localhost:${process.env.BACKEND_PORT}/`;

// eslint-disable-next-line no-unused-vars
async function FillCourseData(courses) {
    for (const [key, value] of Object.entries(courses)) {
        const courseList = [];
        for (var i = 0; i < value.length; i++) {
            const course = value[i];

            courseList.push({
                courseID: course.course_id,
                name: course.title,
                credit: course.credit_hours || undefined,
                categories: course.categories || undefined,
                prerequisites: course.prerequisites || undefined,
                recommended: course.recommended || undefined,
                description: course.description || undefined,
                pastTerms: course.past_terms_offered || undefined
            })
        }

        await axios.post(url + "addCourseArea", { 
            area: key,  
            courses: courseList
        })
        .then(() => {
            console.log(`${key} was added successfully!`);
        }, async (error) => {
            if (error?.response?.status === 413) {
                await axios.post(url + "addCourseArea", { 
                    area: key,  
                    courses: []
                })
                courseList.forEach(async (course, index, list) => {
                    await axios.post(url + "addCourse", { 
                        area: key,  
                        course: course
                    }).then(() => console.log(`${key}: ${index}/${list.length} added.`))
                    .catch(error => console.error(`ERROR: ${error?.response?.status}: ${error?.response?.statusText}`));
                });
            }
            else console.error(`ERROR: ${error?.response?.status}: ${error?.response?.statusText}`)
        });
    }
}

// eslint-disable-next-line no-unused-vars
async function FillPlanData(year, programs, minors=true, certs=true, majors=true) {
    const runMinors = minors;
    const runCerts = certs;
    const runMajors = majors;

    for (const [, value] of Object.entries(programs)) {
        for (var i = 0; i < value.length; i++) {
            const program = value[i];

            const title = program.title;
            const pUrl = program.url;
            const courses = getCourses(program);
            // const credits = getCreditReqs(program);
            const semesters = getPlan(program);
            // if (program.type === "Minor" || program.type === "Cert") continue;
            if (program.type === "Minor") {
                if (!runMinors) continue
                await axios.post(url + "addMinor/" + year, { 
                    title: title,
                    url: pUrl,
                    requirements: courses,
                })
                .then((response) => {
                    console.log(`${title} add successfully`);
                }, (error) => {
                    console.log(error.response.data.error);
                });
            }
            else if (program.type === "Cert") {
                if (!runCerts) continue
                await axios.post(url + "addCert/" + year, { 
                    title: title,
                    requirements: courses,
                    years: semesters,
                    url: pUrl
                })
                .then((response) => {
                    console.log(`${program.title} add successfully`);
                }, (error) => {
                    // console.log(error);
                    console.log(error.response.data.error);
                });
            }
            else if (runMajors) {
                await axios.post(url + "addMajor/" + year, { 
                    title: title,
                    requirements: courses,
                    years: semesters,
                    url: pUrl
                })
                .then((response) => {
                    console.log(`${program.title} add successfully`);
                }, (error) => {
                    console.log(error.response);
                    // console.log(error?.response?.data?.error?.message);
                });

            }
            
        }
    }
}

function getCourses(program) {
    if ((("has_plan" in program) && !program.has_plan) || program.requirements === undefined) return undefined;

    const courses = [];
    for (const [k, v] of Object.entries(program.requirements)) {
        const courseList = [];
        var info = [];

        for (var i = 0; i < v.courses.length; i++) {
            const c = v.courses[i];
            if (JSON.stringify(c) === '{}') break;
            if ("info" in c) {
                info.push({index: i, comment: c.info}); 
                continue;
            }
            courseList.push({ id: c.id[0], or: c.or || undefined})
        }
        courses.push({label: k, credits: v.credits, required: v.required, categories: v.categories, list: courseList, info: info.length < 1 ? undefined : info})
    }

    // console.log(courses);
    return courses;
}

// eslint-disable-next-line no-unused-vars
function getCreditReqs(program) {
    if ((("has_plan" in program) && !program.has_plan) || !program.credit_requirements) return undefined;

    const credits = [];
    for (const [k, v] of Object.entries(program.credit_requirements)) {
        credits.push({area: k, hours: Number(v)});
    }
    return credits;
}

function getPlan(program) {
    if ((("has_plan" in program) && !program.has_plan) || !program.plan ) return undefined;
    var yearCnt = 0;
    var semCnt = 0;
    const years = [];
    if (program.plan) for (const [, v] of Object.entries(program.plan)) {

        if (v.total) {
            years.push({
                label: `Year ${++yearCnt}`,
                courses: v.total
            })
            continue;
        }

        years.push({
            label: `Year ${++yearCnt}`,
            semesters: [
                {label: `Semester ${++semCnt}`, courses: v.Fall},
                {label: `Semester ${++semCnt}`, courses: v.Spring}
            ]
        })
        // semesters.push({label: `Semester ${++semCnt}`, courses: v.Fall});
        // semesters.push({label: `Semester ${++semCnt}`, courses: v.Spring});
    }
    return years;
}

// eslint-disable-next-line no-unused-vars
async function FillGenEds() {
    const requirements = [];
    for (const [k, v] of Object.entries(gens)) {
        const req = {};

        req.label = k;
        req.hours = v.hours || undefined;
        req.completion = v.completion || undefined;
        req.info = v.info || undefined;
        req.courses = v.courses || undefined;
        req.properties = v.properties || undefined;
        req.categories = v.categories || undefined;

        if (v.sub) {
            req.sub = [];
            for (const [kk, vv] of Object.entries(v.sub)) {
                const sub_req = {};
                sub_req.label = kk;
                sub_req.hours = vv.hours || undefined;
                sub_req.completion = vv.completion || undefined;
                sub_req.info = vv.info || undefined;
                sub_req.courses = vv.courses || undefined;
                sub_req.properties = vv.properties || undefined;
                sub_req.categories = vv.categories || undefined;
                req.sub.push(sub_req);
            }
        }
        requirements.push(req);
    }

    await axios.post(url + "addGenEds", { 
        year: 2023,
        reqs: requirements
    })
    .then((response) => {
        console.log(`GenEds add successfully`);
    }, (error) => {
        console.log(error.response);
    });
}



async function main() {
    // await FillCourseData();
    // await FillPlanData(false, false, true);
    // await FillGenEds();
}

main();

exports.FillCourseData = FillCourseData;
exports.FillPlanData = FillPlanData;
exports.FillGenEds = FillGenEds;
