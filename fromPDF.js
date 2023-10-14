var pdfUtil = require('pdf-to-text');
var pdf_path = "./ussr0300_12211863.PDF";

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
    //   console.log(datas);

    var term = "";
    var onTerm = false;
    var crsCnt = 0;
    var major = "";

    datas.forEach((line) => {
        if (line.match(/.*Local Campus Credits.*/)) {
            var text = line.split(" ");
            term = text[0] + "_" + text[1];
            userData.CourseWork[term] = [];
            onTerm = true;
            crsCnt = 0;
            skip = true;
            return;
        }
        if (line.match(/GPA/)) onTerm = false;
        if (onTerm && crsCnt == 0) userData["Major"] = line.trim();
        if (line.match(/General Education Met/)) userData.GenEdComplete = true;
        if (onTerm && line !== "" && !line.match(/^\s+$|^\f\s+/) && crsCnt++ > 0) {
            const course = line.match(/^\w*\s*\d*/);
            userData["CourseWork"][term].push(course[0].replace(/\s+/, "_"));
        }

        // console.log(line);
    });
    console.log(userData);
    // console.log(userData.major);
});





