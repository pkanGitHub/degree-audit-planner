const puppeteer = require("puppeteer");

(async () => {
  const courses = {};
  const browser = await puppeteer.launch();                                                         // Starts virtual browser
  const page = await browser.newPage();                                                             // Opens a tab in the browser
  await page.goto("https://catalog.missouri.edu/courseofferings/");                                 // Navigates to course offering page
 
  const links = await page.evaluate(() => {
    const links = document.querySelectorAll("#co_departments ul li a");                             // Gets the link to every page of courses
    const links_array = []

    links.forEach(link => {
      links_array.push(link.href);                                                                  // Gets the actual link to the page
    })
    return links_array;
  });

  // links.splice(1); // used in testing for faster running

  for (var link of links) {                                                                         // Go through every course list
    await page.goto(link);                                                                          // Navigate to the page
    const course_info = await page.evaluate(() => {
      const h1 = document.querySelector("#content h1")?.textContent;
      const rows = document.querySelectorAll(".courseblock");                                       // Grabs the div for each course

      const course_array = []                                                                       // Empty array to house course objects

      rows.forEach(row => {
        const title_line = row.querySelector(".courseblocktitle").textContent.split(":  ");         // The title has both the course # and name, so we split them 
        const number = title_line[0].replace(/\u00a0/g, "_");
        const title = title_line[1];                                                                // Removes non-breaking spaces which are used in ALL course ids

        const text = row.querySelector(".courseblockdesc").textContent?.replace(/\u00a0/g, " ");    // Non-breaking spaces again
        const regex = /Credit Hour(?:s)?: ((?:\d+-\d+|\d+))(?:.*?Prerequisites: (.*?))?\n/;         // Splits the body of the courseblock into 3 parts, the description, the credit hours, and the prereqs
        const matches = text.match(regex);

        //  Prevent emptys
        var creditHours = "";
        var prerequisites = "";
        var textBeforeMatch = "";

        if (matches) {
          creditHours = matches[1];
          prerequisites = matches[2];
  
          textBeforeMatch = text.slice(0, text.indexOf(matches[0])).trim();
        }
        // Creates an object for each course
        course_array.push({ number: number, title: title, credit_hours: creditHours, prerequisites: prerequisites, description: textBeforeMatch });
      });      

      return { courses: course_array, program: h1 };
    });
    courses[course_info.program] = course_info.courses;                 // creates key value pair of link with courses. should probably replace with a better major identifier.

  }
  await browser.close();                                                // Closes browser, womp womp

  //  Turn to json and put into document
  var jsonData = JSON.stringify(courses);
  var fs = require('fs');
  fs.writeFile("courses.json", jsonData, function(err) {
      if (err) {
          console.log(err);
      }
  });
})();