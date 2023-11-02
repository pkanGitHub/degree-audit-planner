const plan = require('./dataCollection/json/plans.json')["Accountancy"][0];

const user = {
    major: "BSAcc in Accountancy",
    coursePlan: [
        { 
            semester: 0,
            courses: [
                "BUS_AD_1500",
                "COMMUN_1200",
                "MATH_1100*",
                "State Requirement",
                "Humanities"
            ]
        },
        {
            semester: 1,
            courses: [
                "ENGLSH_1000**",
                "MATH_1300*",
                "Humanities  ",
                "Physical/Biological Science with a Lab",
                "Free Elective"
              ]
        },
        {
            semester: 2,
            courses: [
                "ACCTCY_2036 or  2136H",
                "ECONOM_1014",
                "MANGMT_3300",
                "MATH_1400*",
                "STAT_2500"
              ]
        },
        {
            semester: 3,
            courses: [
                "ACCTCY_2037 or  2137H",
                "ACCTCY_2258",
                "ECONOM_1015",
                "MANGMT_3000W**",
                "Free Elective"
              ]
        }
    ]
}

// console.log(plan.course_requirements);

for (const [title, courses] of Object.entries(plan.course_requirements)) {
    var taken = 0;
    for (var i in courses) {
        const course = courses[i];
        // if (course.id !== undefined) console.log(inUserPlan(course.id[0]))
        if (course.id !== undefined  && inUserPlan(course.id[0])) {
            taken++;
            console.log(course.id[0]);
        }
        else {
            for (var i = 0; i < course.or?.length; i++) {
                if (inUserPlan(course.or[i])){
                    taken++;
                    console.log(course.or[i])
                }
            }
        }
    }
    console.log(`${title}: ${taken}`);
}


function inUserPlan(id) {
    for (var i in user.coursePlan) {
        for (var k in user.coursePlan[i].courses) {
            const course = user.coursePlan[i].courses[k];
            // console.log(course)
            if (course.includes(id)) {
                console.log(`${id} in ${course}`)
                return true;
            }
        }
        break;
    }
    return false;
    // const found = user.coursePlan.forEach(semester => {
    //     semester.courses.forEach(course => {
    //         // console.log(`${id} in ${course}`)
    //         // console.log(course.includes(id));
    //         if (course.includes(id)) {
              
    //         }
    //         return false
    //     })
    //     return found
    // })
    // return found;
}