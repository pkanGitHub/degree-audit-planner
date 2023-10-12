const { debug } = require("console");
const puppeteer = require("puppeteer");

(async () => {
    const program = {};
    const browser = await puppeteer.launch();                                               // Starts virtual browser
    const page = await browser.newPage();                                                   // Opens a tab in the browser
    await page.goto("https://catalog.missouri.edu/degreesanddegreeprograms/");              // Navigates to course offering page

    const course_links = await page.evaluate(() => {
        const rows = document.querySelectorAll("#degree_body tr");                          // Gets the link to every page of courses
        const link_dict = {};

        rows.forEach(row => {
            const program = row.querySelector(".column0");
            const links = row.querySelectorAll(".column2 a");

            if (links.length < 1) return;

            link_dict[program.textContent] = []
            links.forEach(link => {
                link_dict[program.textContent].push({ type: link.textContent, url: link.href });
            });
        });

        return link_dict;
    });



    for (const [title, links] of Object.entries(course_links)) {
        const courses = [];
        for (var link of links) {
            await page.goto(link.url); // Navigates to course offering page
            const course_program = await page.evaluate((link) => {
                const requirements = {}
                const course = {};
                const tables = document.querySelectorAll("table.sc_courselist tbody");
                const name = document.querySelector("#content h1").textContent;             // Gets the name of the program, ie: Minor in Math
                requirements["title"] = name;                                                     // 
                requirements["type"] = link.type;                                                 // Gets the type of program (minor, cert, major, etc)
                requirements["url"] = link.url;                                                   // Gets the url to the program page

                /*
                 * Code for finding required courses
                 * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
                 */

                var rows = tables[0].querySelectorAll("table.sc_courselist tbody tr");     // Finds the table with required courses

                var header = "";                                                            // These two values are used to create sections in the json
                var prevClass = null;

                rows.forEach((row) => {
                    if (row.classList.contains("areaheader")) {                             // If the row is a header -> create a new section for the courses to be 
                        header = row.querySelector("td span.areaheader").textContent;       // added under
                        course[header] = []
                        return;
                    }

                    var col = row.querySelector(".codecol");
                    if (col === null) {                                                     // Some of the rows are just general information 
                        col = row.querySelector("span.courselistcomment");
                        course[header].push({info: col?.textContent});                      // So here we just create a new type of object to hold that and add it to the header
                        return;
                    };
                    var id = col.textContent
                    id = id.replace(/or\u00a0/g, "");                                       // Clears "or" from text
                    id = id.replace(/\u00a0/g, "_");                                        // Clears non-breaking spaces
                    id = id.split("&_");                                                    // Splits the multi-element strings into an array. Always creates an array

                    if (col.classList.contains("orclass")) {                                // Handles the different options for courses
                        if (!("or" in prevClass)) prevClass["or"] = id;                     // If "or" key does not yet exist, create it
                        else prevClass.or = prevClass.or.concat(id);
                        return;
                    }

                    const courseItem = {id: id};
                    prevClass = courseItem;
                    course[header].push(courseItem);

                });

                /*
                 * Code for finding credit requirements
                 * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
                 */

                if (tables.length == 1) {                                                       // Checks to see if there was only one table (certifications and minors)
                    requirements["requirements"] = course; 
                    return requirements;    
                }

                const credits = {};                     
                rows = tables[1].querySelectorAll("table.sc_courselist tbody tr");              // Gets table rows
                
                rows.forEach((row) => {
                    const title = row.querySelector(".courselistcomment")?.textContent;         // Requirement title
                    const hours = row.querySelector(".hourscol")?.textContent;                  // hours

                    credits[title] = hours;
                });

                requirements["course_requirements"] = course;                             
                requirements["credit_requirements"] = credits;



                /*
                 * Code for finding semester plan
                 * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
                 */

                rows = document.querySelectorAll("table.sc_plangrid tbody tr");

                const plan = {};
                var year;
                var semester1;
                var semester2;
                rows.forEach(row => {
                    
                    if (row.classList.contains("plangridyear")) { 
                        plan[row.querySelector("th").textContent] = year = {};
                        return;
                    }

                    if (row.classList.contains("plangridterm")) {
                        const heads = row.querySelectorAll("th");
                        year[heads[0].textContent] = semester1 = [];
                        year[heads[2].textContent] = semester2 = [];
                        return;
                    }
                    const cells = row.querySelectorAll(".codecol");
                    if (cells[0] != null) semester1.push(cells[0]?.textContent.replace(/\u00a0/g, "_"));
                    if (cells[1] != null) semester2.push(cells[1]?.textContent.replace(/\u00a0/g, "_"));
                });


                requirements["plan"] = plan;

                return requirements;


            }, link);
            courses.push(course_program);
        }
        program[title] = courses;
    }





  await browser.close();  // Closes browser, womp womp

  //  Turn to json and put into document
  var jsonData = JSON.stringify(program);
  var fs = require('fs');
  fs.writeFile("plans.json", jsonData, function(err) {
      if (err) {
          console.log(err);
      }
  });
})();