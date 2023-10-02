const puppeteer = require("puppeteer");
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://catalog.missouri.edu/collegeofengineering/biologicalengineering/");
 
  headings = await page.evaluate(() => {
    headings_elements = document.querySelectorAll(".courseblock");
    headings_array = Array.from(headings_elements);

    blocks_array = []

    headings_array.forEach(block => {
      const title_line = block.querySelector(".courseblocktitle").textContent.split(":  ");
      const number = title_line[0];
      const title = title_line[1];

      const regex = new RegExp("\w*Credit Hours: \d.*");

      const hours = block.querySelector(".courseblockdesc").textContent.search(regex);
      blocks_array.push({number: number, title: title, credit_hours: hours});
    });
    return blocks_array;
  });

  console.log(headings);
  await browser.close();
})();