const plan = require('./dataCollection/json/plans.json')
const fs = require('fs');


const titles = [];
const required = [];
const somerequired = [];
const onerequired = [];

const all = {
    notrequired: titles,
    required: required,
    somerequired: somerequired,
    onerequired: onerequired
}

for (const [, program] of Object.entries(plan)) {

    for (var i in program) {
        var reqs = program[i].course_requirements;
        if (reqs == null) {
            reqs = program[i].requirements;
        }
        if (reqs == null) continue;

        for (const [title, courses] of Object.entries(reqs)) {

            if (courses.length === 0) continue;
            var allInfo = true;
            for (const course in courses) {
                if ("id" in courses[course]) {
                    allInfo = false;
                    break;
                }
            }
            if (allInfo) continue;


            if (title.toLowerCase().match(/ one /g)) {
                if (onerequired.indexOf(title) === -1) onerequired.push(title);    
                continue;
            }

            if (title.toLowerCase().match(/choose |at least |select |complete |credit|hour|from/g)) {
                if (somerequired.indexOf(title) === -1) somerequired.push(title);    
                continue;
            }


            if (title.toLowerCase().match(/required|requirement|core |foundation|must/g) && !title.toLowerCase().includes("not required")) {
                if (required.indexOf(title) === -1) required.push(title);    
                continue;
            }

            if (titles.indexOf(title) === -1) titles.push(title);
        }
    }
}

//-------------------------------------------------------------------------------
//
//      Note to self:
//      Maybe redo the webscraping and get the credit column for each section
//      if no credit column check name of section for credit hours, select one, etc.
//      Otherwise all classes are considered mandatory
//
//-------------------------------------------------------------------------------

console.log(onerequired);


var jsonData = JSON.stringify(all);
fs.writeFile("./backend/dataCollection/json/course.reqs.json", jsonData, function(err) {
    if (err) {
        console.log(err);
    }
});