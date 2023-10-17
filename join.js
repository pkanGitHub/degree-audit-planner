const courses = require('./courses.json');
const years = require('./years.json');
const geneds = require('./geneds.json');
const reqs = require('./geneds-reqs.json');

// This file is just to combine info from several pages into something closer to what the database will be.

const new_courses = {};

for (let [key, vals] of Object.entries(courses)) {
    const new_vals = []
    vals.forEach((course) => {
        const nc = {};
        
        // I only did it this v way because i wanted it be in a nice order LOL

        nc["course_id"] = course.number;           
        nc["title"] = course.title;
        nc["credit_hours"] = course.credit_hours;
        nc["prerequisites"] = course.prerequisites;
        nc["recommended"] = course.recommended
        nc["description"] = course.title;
        nc["category"] = geneds[course.number]?.category;
        nc["properties"] = geneds[course.number]?.properties;
        nc["available_next_semester"] = course.available_next_semester;
        nc["past_terms_offered"] = years[course.number];
        new_vals.push(nc);

    });
    new_courses[key] = new_vals;

}



var jsonData = JSON.stringify(new_courses);
var fs = require('fs');
fs.writeFile("course.data.json", jsonData, function(err) {
    if (err) {
        console.log(err);
    }
});