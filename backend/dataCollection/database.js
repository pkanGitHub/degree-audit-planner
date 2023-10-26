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
        for (var i = 0; i < value.length; i++) {
            const program = value[i];
            // console.log(program.title);

            const runMinors = false;
            const runCerts = false;
            const runMajors = true;
            
            if (program.type === "Minor") {
                if (!runMinors) continue;
                const courses = getCourses(program);
                // if (("has_plan" in program) && program.has_plan) {
                //     for (const [k, v] of Object.entries(program.requirements)) {
                //         // console.log(v[0]);
                //         const list = [];
                //         const info = [];

                //         for (var i = 0; i < v.length; i++) {
                //             const c = v[i];
                //             if (JSON.stringify(c) === '{}') break;
                //             if ("info" in c) {
                //                 info.push({index: i, comment: c.info}); 
                //                 continue;
                //             }
                //             list.push({ id: c.id[0], or: c.or || null})
                //         }
                //         courses.push({sectionTitle: k, courses: list, info: info})
                //     }
                // }

                // console.log(courses);

                // return;


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
                // return;

            }
            else if (program.type === "Cert") {
                if (!runCerts) continue;
                const title = program.title;
                const url = program.url;
                const courses = getCourses(program);
                const credits = getCreditReqs(program);
                // if (("has_plan" in program) && program.has_plan) {
                //     // console.log(program);
                //     for (const [k, v] of Object.entries(program.course_requirements || program.requirements)) {
                //         const courseList = [];
                //         var info = [];

                //         for (var i = 0; i < v.length; i++) {
                //             const c = v[i];
                //             if (JSON.stringify(c) === '{}') break;
                //             if ("info" in c) {
                //                 info.push({index: i, comment: c.info}); 
                //                 continue;
                //             }
                //             courseList.push({ id: c.id[0], or: c.or || null})
                //         }
                //         courses.push({sectionTitle: k, courses: courseList, info: info})
                //     }

                //     if (program.credit_requirements) {
                //         for (const [k, v] of Object.entries(program.credit_requirements)) {
                //             credits.push({area: k, hours: Number(v)});
                //         }
                //     }

                //     // for (const [k, v] of Object.entries(program.credit_requirements)) {
                //     //     credits.push({area: k, hours: Number(v)});
                //     // }
                // }
                
                // console.log(courses);
                // return;

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
                // return;
            }
            else if (runMajors) {
                console.log(program.title);
                const title = program.title;
                const url = program.url;
                const courses = getCourses(program);
                const credits = getCreditReqs(program);
                const semesters = getPlan(program);

                // // console.log(courses);
                // // console.log(credits);
                // console.log(semesters);
                // return;
                
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
    if (("has_plan" in program) && !program.has_plan) return null;

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
            courseList.push({ id: c.id[0], or: c.or || null})
        }
        courses.push({label: k, list: courseList, info: info})
    }

    // console.log(courses);
    return courses;
}

function getCreditReqs(program) {
    if ((("has_plan" in program) && !program.has_plan) || !program.credit_requirements) return null;

    const credits = [];
    for (const [k, v] of Object.entries(program.credit_requirements)) {
        credits.push({area: k, hours: Number(v)});
    }
    return credits;
}

function getPlan(program) {
    if ((("has_plan" in program) && !program.has_plan) || !program.plan) return null;
    var semCnt = 0;
    const semesters = [];
    if (program.plan) for (const [k, v] of Object.entries(program.plan)) {
        semesters.push({label: `Semester ${++semCnt}`, courses: v.Fall});
        semesters.push({label: `Semester ${++semCnt}`, courses: v.Spring});
    }
    return semesters;
}



FillPlanData();