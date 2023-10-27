const csv = require('csv-parser')
const fs = require('fs')
const courses = require('./json/course.data.json');
const infotc = courses["Information Technology (INFOTC)"];
// console.log(infotc)

const results = [];

fs.createReadStream('backend/dataCollection/files/INFOTC_SS2024.csv')
  .pipe(csv([
        "Catalog_Number", 
        "Course_Title", 
        "Class Section", 
        "Class No", 
        "Facility Description", 
        "Facility Capacity", 
        "Number Enroll", "Seat Rem", 
        "Wait List", 
        "Undup Wait List Status", 
        "Instructor" 
    ]))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    results.forEach((row) => {
        if (!isNaN(row.Catalog_Number) && /\S/.test(row.Catalog_Number)) {
            // console.log(row.Catalog_Number);
            const id = "INFOTC_" + row.Catalog_Number;

            infotc.forEach((course) => {
                if (id === course.course_id) {
                    course["available_next_semester"] = true;
                    // console.log(course);
                }
            })

            // available.push(id);
        }

        var jsonData = JSON.stringify(courses);
        fs.writeFile("./backend/dataCollection/json/course.data.json", jsonData, function(err) {
            if (err) {
                console.log(err);
            }
        });


    });



  });

// console.log(available);

// infotc.forEach((course) => {
//     available.forEach((id) => {
//         if (id === course.course_id) {
//             course["available_next_semester"] = true;
//         }
//     });
// })

// console.log(infotc)


  