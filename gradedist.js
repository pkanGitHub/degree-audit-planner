const puppeteer = require("puppeteer");

(async () => {
    const courses = {};
    const browser = await puppeteer.launch({headless: false}); // Starts virtual browser
    const page = await browser.newPage(); // Opens a tab in the browser
    await page.goto("https://musis1.missouri.edu/gradedist/mu_grade_dist_intro.cfm?search=true"); // Navigates to grade distribution page
    
    //  The javascript on this page is really weird and slow so a lot of stuff is done just to account for that.
    await page.waitForSelector("#term option")  // wait for the selection options to be loaded in

    const years = await page.evaluate(() => {
        const years = document.querySelectorAll("#term option"); // gets all of the term options
        const year_array = [];
        years.forEach((year) => {
            const val = year.getAttribute("value"); // gets the value of the option (necessary for selecting it later)
            const term = year.textContent;          // gets the actual term label
            year_array.push({year: term, id: val}); // combines those 2 values into one obj
        })
        return year_array.splice(1);                //  gets rid of the empty option
    });

    // years.splice(1) // for testing

    // loop through each term and find courses offered.
    for (var year of years) {
        try {
            await page.goto("https://musis1.missouri.edu/gradedist/mu_grade_dist_intro.cfm?search=true");   // renavigates to the page clearing previous selections
            await page.waitForSelector("#term option")                                                      // waits for the options to load again
            await page.select("#term", year.id);                                                            // selects the desired term
            await page.click("#submit");                                                                    // submits form
            await page.waitForSelector("#content-well > table")                                             // wait for table to load
            var rows = await page.evaluate( () => {
                const rows = document.querySelectorAll("#content-well > table tbody tr");                   // Grab the row for each course
                const id_array = [];

                rows.forEach((row) => {
                    const id = row.children[2].textContent + "_" + row.children[3].textContent;             // Get the course ID
                    if (id !== "\u00a0_\u00a0" && id !== "Subject_Course Number") id_array.push(id);        // get rid of empty rows and the table head
                });
                return id_array;
            });

            rows.forEach((course) => {
                if (course in courses && !courses[course].includes(year.year)) {    // Check if the course has already been added to the dict and prevent dupe years (caused by multiple teachers teaching one class)
                    courses[course].push(year.year);                                // Add the term
                }
                else {
                    courses[course] = [year.year];                                  // if the course has not been added yet, add it
                }
            });
        }
        catch (e) {
            if (e instanceof puppeteer.TimeoutError) {                              // prevent timing out
                continue;
            }
        }
    }

    await browser.close();  // Closes browser, womp womp

  //  Turn to json and put into document
  var jsonData = JSON.stringify(courses);
  var fs = require('fs');
  fs.writeFile("years.json", jsonData, function(err) {
      if (err) {
          console.log(err);
      }
  });
})();