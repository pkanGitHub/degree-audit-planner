const puppeteer = require("puppeteer");

/*
 * ********************* CODE FOR COURSES *********************
 * ************************************************************
 */



    /*
     * Gets the base course information
     * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
     */

async function GetCatalogSource(page) {
    const courses = {};
    await page.goto("https://catalog.missouri.edu/courseofferings/");                                   // Navigates to course offering page

    const links = await page.evaluate(() => {
        const links = document.querySelectorAll("#co_departments ul li a");                             // Gets the link to every page of courses
        const links_array = []

        links.forEach(link => {
        links_array.push(link.href);                                                                    // Gets the actual link to the page
        })
        return links_array;
    });

    for (var link of links) {                                                                           // Go through every course list
        await page.goto(link);                                                                          // Navigate to the page
        const course_info = await page.evaluate(() => {
        const h1 = document.querySelector("#content h1")?.textContent;
        const rows = document.querySelectorAll(".courseblock");                                         // Grabs the div for each course

        const course_array = []                                                                         // Empty array to house course objects

        rows.forEach(row => {
            const title_line = row.querySelector(".courseblocktitle").textContent.split(":  ");             // The title has both the course # and name, so we split them 
            const number = title_line[0].replace(/\u00a0/g, "_");
            const title = title_line[1];                                                                    // Removes non-breaking spaces which are used in ALL course ids

            const text = row.querySelector(".courseblockdesc").textContent?.replace(/\u00a0/g, " ");        // Non-breaking spaces again

            const creditHoursRegex = /Credit Hour(?:s)?: ((?:\d+-\d+|\d+))/;
            const prerequisitesRegex = /Prerequisites: (.*?)(?=\n|Recommended:|$)/;
            const recommendedRegex = /Recommended: (.*?)\n/;
    
            const creditHoursMatch = text.match(creditHoursRegex);
            const prerequisitesMatch = text.match(prerequisitesRegex);
            const recommendedMatch = text.match(recommendedRegex);
    
            const creditHours = creditHoursMatch ? creditHoursMatch[1] : "";
            const prerequisites = prerequisitesMatch ? prerequisitesMatch[1] : "";
            const recommended = recommendedMatch ? recommendedMatch[1] : "";
    
            const textBeforeMatch = text.slice(0, text.indexOf(creditHoursMatch[0])).trim();

            
            // Creates an object for each course
            course_array.push({ 
                number: number, 
                title: title, 
                credit_hours: creditHours, 
                prerequisites: prerequisites, 
                recommended: recommended, 
                description: textBeforeMatch 
            });
        });      

        return { courses: course_array, program: h1 };
        });
        // creates key value pair of link with courses. should probably replace with a better major identifier.
        courses[course_info.program] = course_info.courses;                 
    }

    return courses;
}

    /*
     * Gets the Gen Ed category for courses
     * And any additional properties (like having a lab)
     * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
     */

async function GetCategories(page) {
    var courses = {};
    var pageCount = 1;
    var hasNext = true;                         //  This page has pagination, so we check if the pagination is available, and while it is the loop continues

    do {
        await page.goto(`https://generaleducation.missouri.edu/courses/page/${ pageCount++ }/?category=all&prop=all&level=all`); 
        await page.waitForSelector("#course_list");

        const info = await page.evaluate(() => {
            const rows = document.querySelectorAll("#course_list tbody tr");                                        // Get the table rows
            const courses = {};
            rows.forEach((row) => {
                const id = row.querySelector(".course_name")?.textContent.trim().replace('-', '_');                 // Get the course name from each row
                const cats = Array.from(row.querySelectorAll(".category abbr")).map(cat => cat.textContent.trim())  // Get any categories (ie, humanities, social sciences, etc.) or any properties (ie. labs)

                courses[id] = { categories: cats };                                                                 // Return that info as an object
            });
            const next = (document.querySelector(".pagination__item--next")) ? true : false;                        // Here is where we check the pagination
            return { hasNext: next, courses: courses }
        });
        courses = {
            ...courses,
            ...info.courses
        }
        hasNext = info.hasNext;

    }
    while (hasNext);

    return courses;
}

    /*
     * Gets the past semesters a course was offered
     * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
     */

async function GetSemesters(page) {
    const courses = {};
    await page.goto("https://musis1.missouri.edu/gradedist/mu_grade_dist_intro.cfm?search=true");   // Navigates to grade distribution page

    //  The javascript on this page is really weird and slow so a lot of stuff is done just to account for that.
    await page.waitForSelector("#term option")                                                      // wait for the selection options to be loaded in

    const years = await page.evaluate(() => {
        const years = document.querySelectorAll("#term option");                                    // gets all of the term options
        const year_array = [];
        years.forEach((year) => {
            const val = year.getAttribute("value");                                                 // gets the value of the option (necessary for selecting it later)
            const term = year.textContent;                                                          // gets the actual term label
            year_array.push({year: term, id: val});                                                 // combines those 2 values into one obj
        })
        return year_array.splice(1);                                                                //  gets rid of the empty option
    });

    // years.splice(5) // for testing

    // loop through each term and find courses offered.
    for (var year of years) {
        try {
            await page.goto("https://musis1.missouri.edu/gradedist/mu_grade_dist_intro.cfm?search=true");   // renavigates to the page clearing previous selections
            await page.waitForSelector("#term option")                                                      // waits for the options to load again
            await page.select("#term", year.id);                                                            // selects the desired term
            await page.click("#submit");                                                                    // submits form
            await page.waitForSelector("#content-well > table tr:last-child")                               // wait for table to load
            await delay(5000);                                                                             // Delay to ensure table is fully loaded (20 is probably overkill hihi huhu)
            const rows = await page.evaluate( () => {
                const table_rows = document.querySelectorAll("#content-well > table tbody tr");                   // Grab the row for each course
                const id_array = [];

                table_rows.forEach((row) => {
                    const id = row.children[2].textContent + "_" + row.children[3].textContent;             // Get the course ID
                    if (id !== "\u00a0_\u00a0" && id !== "Subject_Course Number") id_array.push(id);        // get rid of empty rows and the table head
                });
                return id_array;
            });

            for(let i = 0; i < rows.length; i++) {
                const course = rows[i];
                if (!(course in courses)) courses[course] = [year.year];                                    // if the course has not been added yet, add it
                
                if (!courses[course].includes(year.year)) courses[course].push(year.year);                  // Check if the course has already been added to the dict and prevent dupe years (caused by multiple teachers teaching one class)
            }
        }
        catch (e) {
            if (e instanceof puppeteer.TimeoutError) {                                                      // prevent timing out
                debugger                                                                                    // debugger only works if devtools = true
                console.log("error thrown");
                continue;
            }
        }
    }
    return courses;
}


function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }



 /*
 * ********************* CODE FOR DEGREES *********************
 * ************************************************************
 */


// async function GetDegreePlans(page) {                         
//     const program = {}                         // Opens a tab in the browser
//     await page.goto("https://catalog.missouri.edu/degreesanddegreeprograms/");              // Navigates to course offering page

//     const course_links = await page.evaluate(() => {
//         const rows = document.querySelectorAll("#degree_body tr");                          // Gets the link to every page of courses
//         const link_dict = {};

//         rows.forEach(row => {
//             const program = row.querySelector(".column0");
//             const links = row.querySelectorAll(".column2 a");

//             if (links.length < 1) return;

//             link_dict[program.textContent] = []
//             links.forEach(link => {
//                 link_dict[program.textContent].push({ type: link.textContent, url: link.href });
//             });
//         });

//         return link_dict;
//     });


//     for (const [title, links] of Object.entries(course_links)) {
//         const courses = [];
//         for (var link of links) {
//             await page.goto(link.url); // Navigates to course offering page
//             const course_program = await page.evaluate((link) => {
//                 const requirements = {}
//                 const course = {};
//                 const tables = document.querySelectorAll("table.sc_courselist tbody");
//                 const name = document.querySelector("#content h1").textContent;                   // Gets the name of the program, ie: Minor in Math
//                 requirements["title"] = name;                                                     // The name of the program
//                 requirements["type"] = link.type;                                                 // Gets the type of program (minor, cert, major, etc)
//                 requirements["url"] = link.url;                                                   // Gets the url to the program page

//                 /*
//                  * Code for finding required courses
//                  * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//                  */

//                 if (tables.length === 0) {
//                     requirements["has_plan"] = false;
//                     return requirements;
//                 }
//                 var rows = tables[0].querySelectorAll("table.sc_courselist tbody tr");      // Finds the table with required courses

//                 var header = "Courses";                                                     // These two values are used to create sections in the json
//                 var prevClass = null;
//                 rows.forEach((row) => {
//                     if (row.classList.contains("areaheader")) {                             // If the row is a header -> create a new section for the courses to be 
//                         header = row.querySelector("td span.areaheader").textContent;       // added under
//                         course[header] = []
//                         return;
//                     }
//                     if (!Object.keys(course).includes(header)) course[header] = [];
//                     var col = row.querySelector(".codecol");
//                     if (col === null) {                                                     // Some of the rows are just general information 
//                         col = row.querySelector("span.courselistcomment");
//                         course[header].push({info: col?.textContent});                      // So here we just create a new type of object to hold that and add it to the header
//                         return;
//                     };
//                     var id = col.textContent
//                     id = id.replace(/or\u00a0/g, "");                                       // Clears "or" from text
//                     id = id.replace(/\u00a0/g, "_");                                        // Clears non-breaking spaces
//                     id = id.split("&_");                                                    // Splits the multi-element strings into an array. Always creates an array

//                     if (col.classList.contains("orclass")) {                                // Handles the different options for courses
//                         if (!("or" in prevClass)) prevClass["or"] = id;                     // If "or" key does not yet exist, create it
//                         else prevClass.or = prevClass.or.concat(id);
//                         return;
//                     }

//                     const courseItem = {id: id};
//                     prevClass = courseItem;
//                     course[header].push(courseItem);
//                 });

//                 /*
//                  * Code for finding credit requirements
//                  * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//                  */

//                 if (tables.length === 1) {                                                       // Checks to see if there was only one table (certifications and minors)
//                     requirements["requirements"] = course; 
//                     return requirements;    
//                 }

//                 const credits = {};                     
//                 rows = tables[1].querySelectorAll("table.sc_courselist tbody tr");              // Gets table rows
                
//                 rows.forEach((row) => {
//                     const title = row.querySelector(".courselistcomment")?.textContent;         // Requirement title
//                     const hours = row.querySelector(".hourscol")?.textContent;                  // hours

//                     credits[title] = hours;
//                 });

//                 requirements["course_requirements"] = course;                             
//                 requirements["credit_requirements"] = credits;



//                 /*
//                  * Code for finding semester plan
//                  * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//                  */

//                 rows = document.querySelectorAll("table.sc_plangrid tbody tr");

//                 const plan = {};
//                 var year;
//                 var semester1;
//                 var semester2;
//                 rows.forEach(row => {
                    
//                     if (row.classList.contains("plangridyear")) { 
//                         plan[row.querySelector("th").textContent] = year = {};
//                         return;
//                     }

//                     if (row.classList.contains("plangridterm")) {
//                         const heads = row.querySelectorAll("th");
//                         year[heads[0].textContent] = semester1 = [];
//                         year[heads[2].textContent] = semester2 = [];
//                         return;
//                     }
//                     const cells = row.querySelectorAll(".codecol");
//                     if (cells[0] != null) semester1.push(cells[0]?.textContent.replace(/\u00a0/g, "_"));
//                     if (cells[1] != null) semester2.push(cells[1]?.textContent.replace(/\u00a0/g, "_"));
//                 });


//                 requirements["plan"] = plan;

//                 return requirements;


//             }, link);
//             courses.push(course_program);
//         }
//         program[title] = courses;
//     }

//     return program;
// }

async function GetDegreePlans(page) {
    const program = {}                         // Opens a tab in the browser
    await page.goto("https://catalog.missouri.edu/degreesanddegreeprograms/");    

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
            await page.goto(link.url);                                                      // Navigates to course offering page
            const course_program = await page.evaluate((link) => {

                const toNum = str => {
                    const num = Number(str);
                    if (!Number.isNaN(num)) return num;
    
                    switch (str) {
                        case "one": return 1;
                        case "two": return 2;
                        case "three": return 3;
                        case "four": return 4;
                        case "five": return 5;
                        case "six": return 6;
                        case "seven": return 7;
                        case "eight": return 8;
                        case "nine": return 9;
                        default: return str;
                    }
                }

                const getRequirements = (title) => {
                    const value = {
                        required: undefined,
                        credits: undefined
                    }

                    const regex = /\b(\d{1,2})\s*(?:or\s+(\d{1,2}))?\s*(?:hours|credits|credit\s*hours)\b/i;
                    const match = title.match(regex);
                    if (match) {
                        if (match[2])   value.credits = match[1] + "-" + match[2];
                        else            value.credits = match[1];
                    }
      
                    if (title.toLowerCase().match(/choose |at least |select |complete |credit|hour|from/g)) {   
                        const regex = /(?:at least|choose|select|complete)\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten)/i;
                        const match = title.match(regex);
                        if (!match) value.required = 0;
                        else        value.required = toNum(match[1].toLowerCase().trim());
                        return value;
                    }
                
                
                    if (title.toLowerCase().match(/required|requirement|core |foundation|must/g) && !title.toLowerCase().includes("not required")) {
                        value.required = true;
                        return value;
                    }
                
                    value.required = false;
                    return value;
                }

                const program = {}
                const requirements = {};
                const rows = document.querySelectorAll("table.sc_courselist tbody tr");

                const name = document.querySelector("#content h1").textContent;             // Gets the name of the program, ie: Minor in Math
                program["title"] = name;                                                     // 
                program["type"] = link.type;                                                 // Gets the type of program (minor, cert, major, etc)
                program["url"] = link.url;                                                   // Gets the url to the program page

                /*
                 * Code for finding required courses
                 * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
                 */
                if (rows.length === 0) {
                    return program;
                }

                var header = "Courses";                                                            // These two values are used to create sections in the json
                var prevClass = null;
                rows.forEach((row) => {
                    if (row.classList.contains("areaheader")) {                             // If the row is a header -> create a new section for the courses to be 
                        header = row.querySelector("td span.areaheader").textContent;       // added under
                        if (header === undefined || header === "" || header === null || header === " ") return;
                        const hours = row.querySelector(".hourscol")?.textContent.replace(/ |hrs|hours|credits/g, "");; 

                        const reqs = getRequirements(header);
                        requirements[header] = {
                            credits: reqs.credits || hours,
                            required: reqs.required,
                            courses: []
                        }

                        // if (hours !== null && hours !== undefined && hours !== "") {
                        //     requirements[header].credits = hours;
                        // }
                        return;
                    }
                    if (!Object.keys(requirements).includes(header)) requirements[header] = {
                        credits: undefined,
                        required: true,
                        courses: []
                    };
                    var col = row.querySelector(".codecol");
                    if (col === null) {                                                     // Some of the rows are just general information 
                        col = row.querySelector("span.courselistcomment");
                        const hours = row.querySelector(".hourscol")?.textContent.replace(/ |hrs|hours|credits/g, "");;
                        const isFirst = row.classList.contains("firstrow");
                        if ((hours !== null && hours !== undefined && hours !== "") || isFirst) {
                            header = col?.textContent;
                            if (header === undefined || header === "" || header === null || header === " ") return;
                            requirements[header] = {
                                credits: hours,
                                required: getRequirements(header).required,
                                courses: requirements[header]?.courses || []
                            }
                            return;
                        }

                        // else
                        requirements[header].courses?.push({info: col?.textContent});                      // So here we just create a new type of object to hold that and add it to the header
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
                    requirements[header].courses?.push(courseItem);
                });

                /*
                 * Code for finding credit requirements
                 * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
                 */

                const cleaned = {}
                for (var [key, value] of Object.entries(requirements)) {
                    if ((value?.credits === undefined || value?.credits === "") && (value?.courses === undefined || value?.courses.length === 0)) continue;
                    cleaned[key] = value;
                }

                program["requirements"] = cleaned;                             

                /*
                 * Code for finding semester plan
                 * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
                 */

                const plan_rows = document.querySelectorAll("table.sc_plangrid tbody tr");

                const plan = {};
                var year;
                var semester1;
                var semester2;
                plan_rows.forEach(row => {
                    
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

                    if (Object.entries(year).length === 0) {
                        year.total = semester1 = [];
                    }

                    const cells = row.querySelectorAll(".codecol");
                    if (cells[0] != null) {
                        const links = Array.from(cells[0].querySelectorAll("a"));
                        // debugger;
                        if (links.length === 0) semester1?.push({misc: cells[0].textContent});
                        else {
                            const id = links[0].title.replace(/\u00a0/g, "_");
                            const or = [];

                            if (links.length > 1) {
                                for (var o of links.splice(1)) {
                                    or.push(o.title.replace(/\u00a0/g, "_"));
                                }
                            }
                            semester1.push({ id: id, or: or.length > 0 ? or : undefined });
                        }
                    }
                    if (cells[1] != null) {
                        const links = Array.from(cells[1].querySelectorAll("a"));
                        if (links.length === 0) semester2?.push({misc: cells[1].textContent});
                        else {
                            const id = links[0].title.replace(/\u00a0/g, "_");
                            const or = [];

                            if (links.length > 1) {
                                for (o of links.splice(1)) {
                                    or.push(o.title.replace(/\u00a0/g, "_"));
                                }
                            }
                            semester2.push({ id: id, or: or.length > 0 ? or : undefined });
                        }
                    }
                });

                if (Object.keys(plan).length === 0) return program;

                program["plan"] = plan;

                return program;


            }, link);
            courses.push(course_program);
        }
        program[title] = courses;
    }
    return program;
}


exports.GetCatalogSource = GetCatalogSource;
exports.GetCategories = GetCategories;
exports.GetSemesters = GetSemesters;
exports.GetDegreePlans = GetDegreePlans;
