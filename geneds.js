const puppeteer = require("puppeteer");

(async () => {
    const courses = {};
    const browser = await puppeteer.launch(); // Starts virtual browser
    const page = await browser.newPage(); // Opens a tab in the browser
    var pageCount = 1;
    var hasNext = true;
    do {
        await page.goto(`https://generaleducation.missouri.edu/courses/page/${ pageCount++ }/?category=all&prop=all&level=all`); 
        await page.waitForSelector("#course_list");

        const info = await page.evaluate(() => {
            const rows = document.querySelectorAll("#course_list tbody tr");
            const courses = {};
            rows.forEach((row) => {
                const id = row.querySelector(".course_name")?.textContent.trim();
                const cat = row.querySelectorAll(".category abbr")[0]?.textContent.trim();
                const prop = row.querySelectorAll(".category abbr")[1]?.textContent.trim();

                courses[id] = { category: cat, properties: prop ? prop : undefined };
            });
            const next = (document.querySelector(".pagination__item--next")) ? true : false;
            return { hasNext: next, courses: courses }
        });
        for (const [id, vals] of Object.entries(info.courses)) {
            courses[id.replace('-', '_')] = vals;
        }
        hasNext = info.hasNext;

    }
    while (hasNext);


    await browser.close();  // Closes browser, womp womp

        //  Turn to json and put into document
    var jsonData = JSON.stringify(courses);
    var fs = require('fs');
    fs.writeFile("geneds.json", jsonData, function(err) {
        if (err) {
            console.log(err);
        }
    });

})();