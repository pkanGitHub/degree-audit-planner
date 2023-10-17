var pdfUtil = require('pdf-to-text');
var pdf_path = "backend/dataCollection/files/academic_profile.PDF";     // This is my (jay) academic profile so i left it out of the github, if you want to test the code get your profile and rename it the same thing

//Omit option to extract all text from the pdf file

var datas = []
const userData = {
    Major: "",
    CourseWork: {},
    GenEdComplete: false
};

pdfUtil.pdfToText(pdf_path, function(err, data) {
    if (err) throw(err);
    datas = data.split('\n')

    var term = "";
    var onTerm = false;
    var crsCnt = 0;

    datas.forEach((line) => {
        if (line.match(/.*Local Campus Credits.*/)) {
            var text = line.split(" ");
            term = text[0] + "_" + text[1];
            userData.CourseWork[term] = [];
            onTerm = true;
            crsCnt = 0;
            return;
        }
        if (line.match(/GPA/)) onTerm = false;
        if (onTerm && crsCnt === 0) userData["Major"] = line.trim();
        if (line.match(/General Education Met/)) userData.GenEdComplete = true;
        if (onTerm && line !== "" && !line.match(/^\s+$|^\f\s+/) && crsCnt++ > 0) {
            const course = line.match(/^\w*\s*\d*/);
            userData["CourseWork"][term].push(course[0].replace(/\s+/, "_"));
        }
    });
    console.log(userData);
});





