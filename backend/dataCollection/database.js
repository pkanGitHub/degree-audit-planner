const axios = require('axios');
const courses = require('./json/course.data.json');
const programs = require('./json/plans.json');
const gens = require('./json/geneds-reqs.json')

async function FillCourseData() {
    for (const [key, value] of Object.entries(courses)) {

        const courseList = [];
        for (var i = 0; i < value.length; i++) {
            const course = value[i];

            courseList.push({
                courseID: course.course_id,
                name: course.title,
                credit: course.credit_hours || undefined,
                category: course.category || undefined,
                prerequisites: course.prerequisites || undefined,
                recommended: course.recommended || undefined,
                description: course.description || undefined,
                pastTerms: course.past_terms_offered || undefined
            })
        }
        

        await axios.post("http://localhost:4000/addCourseArea", { 
            area: key,  
            courses: courseList
        })
        .then((response) => {
            console.log(`${key} was added successfully!`);
        }, (error) => {
            console.log(error.response);
        });
    }
}

async function FillPlanData(minors=true, certs=true, majors=true) {
    const runMinors = minors;
    const runCerts = certs;
    const runMajors = majors;

    for (const [key, value] of Object.entries(programs)) {
        for (var i = 0; i < value.length; i++) {
            const program = value[i];

            const title = program.title;
            const url = program.url;
            const courses = getCourses(program);
            const credits = getCreditReqs(program);
            const semesters = getPlan(program);
            
            if (program.type === "Minor") {
                if (!runMinors) continue
                await axios.post("http://localhost:4000/addMinor", { 
                    title: program.title,
                    url: program.url,
                    courses: courses,
                })
                .then((response) => {
                    console.log(`${program.title} add successfully`);
                }, (error) => {
                    console.log(error.response);
                });
            }
            else if (program.type === "Cert") {
                if (!runCerts) continue
                await axios.post("http://localhost:4000/addCert", { 
                    title: title,
                    courses: courses,
                    credits: credits,
                    url: url
                })
                .then((response) => {
                    console.log(`${program.title} add successfully`);
                }, (error) => {
                    console.log(error.response);
                });
            }
            else if (runMajors) {
                await axios.post("http://localhost:4000/addMajor", { 
                    title: title,
                    courses: courses,
                    credits: credits,
                    semesters: semesters,
                    url: url
                })
                .then((response) => {
                    console.log(`${program.title} add successfully`);
                }, (error) => {
                    console.log(error.response);
                });

            }
            
        }
    }
}


function getCourses(program) {
    if (("has_plan" in program) && !program.has_plan) return undefined;

    const courses = [];
    for (const [k, v] of Object.entries(program.course_requirements || program.requirements)) {
        const courseList = [];
        var info = [];

        for (var i = 0; i < v.length; i++) {
            const c = v[i];
            if (JSON.stringify(c) === '{}') break;
            if ("info" in c) {
                info.push({index: i, comment: c.info}); 
                continue;
            }
            courseList.push({ id: c.id[0], or: c.or || undefined})
        }
        courses.push({label: k, list: courseList, info: info.length < 1 ? undefined : info})
    }

    // console.log(courses);
    return courses;
}

function getCreditReqs(program) {
    if ((("has_plan" in program) && !program.has_plan) || !program.credit_requirements) return undefined;

    const credits = [];
    for (const [k, v] of Object.entries(program.credit_requirements)) {
        credits.push({area: k, hours: Number(v)});
    }
    return credits;
}

function getPlan(program) {
    if ((("has_plan" in program) && !program.has_plan) || !program.plan) return undefined;
    var semCnt = 0;
    const semesters = [];
    if (program.plan) for (const [k, v] of Object.entries(program.plan)) {
        semesters.push({label: `Semester ${++semCnt}`, courses: v.Fall});
        semesters.push({label: `Semester ${++semCnt}`, courses: v.Spring});
    }
    return semesters;
}


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

    await axios.post("http://localhost:4000/addGenEds", { 
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
    await FillPlanData();
    // await FillGenEds();
}

main();
