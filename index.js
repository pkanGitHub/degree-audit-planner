const puppeteer = require("puppeteer");

(async () => {
  const courses = {};
  const browser = await puppeteer.launch(); // Starts virtual browser
  const page = await browser.newPage(); // Opens a tab in the browser
  await page.goto("https://catalog.missouri.edu/courseofferings/"); // Navigates to course offering page
 
  links = await page.evaluate(() => {
    links = document.querySelectorAll("#co_departments ul li a"); // Gets the link to every page of courses
    links_array = []

    links.forEach(link => {
      links_array.push(link.href);  // Gets the actual link to the page
    })
    return links_array;
  });

  // links.splice(1); // used in testing for faster running

  for (var link of links) { // Go through every course list
    await page.goto(link);  // Navigate to the page
    course_array = await page.evaluate(() => {
      headings_elements = document.querySelectorAll(".courseblock");  // Grabs the div for each course
      headings_array = Array.from(headings_elements); 

      course_array = [] // Empty array to house course objects

      headings_array.forEach(block => {
        const title_line = block.querySelector(".courseblocktitle").textContent.split(":  "); // The title has both the course # and name, so we split them 
        const number = title_line[0];
        const title = title_line[1];
        title.replace('\u00a0', " "); // Removes non-breaking spaces which are used in ALL course ids

        const text = block.querySelector(".courseblockdesc").textContent;
        text.replace('\u00a0', " ");  //  Non-breaking spaces again
        const regex = /Credit Hours: (\d+).*?Prerequisites: (.+?)\n/; // Splits the body of the courseblock into 3 parts, the description, the credit hours, and the prereqs
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
        course_array.push({number: number, title: title, credit_hours: creditHours, prerequisites: prerequisites, description: textBeforeMatch});
      });      

      return course_array;
    });
    courses[link] = course_array; // creates key value pair of link with courses. should probably replace with a better major identifier.

  }
  await browser.close();  // Closes browser, womp womp

  //  Turn to json and put into document
  var jsonData = JSON.stringify(courses);
  var fs = require('fs');
  fs.writeFile("courses.json", jsonData, function(err) {
      if (err) {
          console.log(err);
      }
  });
})();