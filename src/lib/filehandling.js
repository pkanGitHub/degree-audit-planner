import { jsPDF } from "jspdf";
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import * as PDFWorker from 'pdfjs-dist/build/pdf.worker.mjs'
import { Course } from './course';
import { userCerts, userMajors, userMinors } from './user';
GlobalWorkerOptions.workerSrc = PDFWorker;

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const contents = e.target.result;
            const pdfloading = getDocument(contents);

            pdfloading.promise.then(async pdf => {
                const title = await pdf.getMetadata().then(meta => {
                    return meta.info.Title
                });
                const planner = title === "Audit Plan";

                const numPages = pdf.numPages;
                var allTextContent = {};
    
                for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
            
                    pdf.getPage(pageNumber).then(async page => {
                        const textContentPromise = page.getTextContent();
                        var previousTranslateY = null
                        await textContentPromise.then(pageTextContent => {
                            pageTextContent.items.sort((a, b) => {
                                if (a.transform[5] < b.transform[5]) {
                                    return 1
                                }
                                else if (a.transform[5] > b.transform[5]) {
                                    return -1
                                }
                                else if (planner && a.transform[4] > b.transform[4]) {
                                    return 1
                                }
                                else if (planner && a.transform[4] < b.transform[4]) {
                                    return -1
                                }
                                return 0;
                            })

                            const text = pageTextContent.items
                            .filter(item => !planner || (item.str !== " " && item.str !== ""))
                            .map(item => {
                                var text = item.str;

                                if (planner) text = ` ${text} `

                                const translateY = item.transform[5];
                                if (translateY !== previousTranslateY) text = "\n" + text;
                                previousTranslateY = translateY;

                                return text;
                            });

                            allTextContent[pageNumber] = text.join("");
                        
                            if (Object.entries(allTextContent).length === numPages) {
                                var combinedText = "";
                                for (const [, text] of Object.entries(allTextContent)) {
                                    combinedText += text + "\n"
                                }
                                resolve({file: combinedText, plan: planner});
                                // const blob = new Blob([JSON.stringify(allTextContent)], { type: 'text/plain;charset=utf-8' });
                                // saveAs(blob, "text.txt" )
                            }

                        });
                    });
                }

            })
            .catch(error => {
                reject("Could not read PDF");
            });;
        }
        reader.readAsArrayBuffer(file);
    });
}

export function GetInfo(file) {
    return new Promise((resolve, reject) => {
        readFile(file).then(result => {
            const data = result.file.split('\n');
            if (result.plan) AuditPlan(data, resolve, reject);
            else AcademicProfile(data, resolve, reject);
        })
        .catch(error => {
            reject(error);
        });
    })
}

export function exportData() {
    const fileName = `plan-${Math.random().toString(16).slice(2)}.pdf`;
    const doc = new jsPDF();

    const table = document.getElementById("planner")?.cloneNode(true);
    if (!table) return;

    const buttons = Array.from(table.getElementsByTagName("td")).filter(td => td.getElementsByTagName("button").length !== 0).map(td => td.getElementsByTagName("button")[0]);
    for (var b of buttons) {
        b.style.wordSpacing = "8px";
        b.innerText = b.innerText.replace(/ /g, "_");
    }

    const tds = Array.from(table.getElementsByTagName("td")).filter(td => td.getElementsByTagName("button").length === 0)
    tds.forEach(td => {
        if (td.innerText === "") td.innerText = "|"
    });

    const majors = userMajors();
    console.log(majors);
    const minors = userMinors();
    const certs = userCerts();


    const html = `
    <h1 style="text-align: center">Audit Plan</h1>
    ${ majors.length > 0 || minors.length > 0 || certs.length > 0 ? `   
        <div style="margin-left: 5%">
            <h2>Degree Programs</h2>
            ${ majors.length > 0 ? majors.reduce((str, major) => str += `<p style="word-spacing: 8px;">${major.title} - ${major.year}</p>`, "<h3>Major(s):</h3>") : "" }
            ${ minors.length > 0 ? minors.reduce((str, minor) => str += `<p style="word-spacing: 8px;">${minor.title} - ${minor.year}</p>`, "<h3>Minor(s):</h3>") : "" }
            ${ certs.length > 0 ? certs.reduce((str, cert) => str += `<p style="word-spacing: 8px;">${cert.title} - ${cert.year}</p>`, "<h3>Certificates(s):</h3>") : "" }
        </div>`
        : ""
    }
    ${table.outerHTML}
    `;

    doc.html(html, {    
        callback: doc => {
            doc.setDocumentProperties({
                title: "Audit Plan"
            });
            doc.save(fileName);
        },
        x: 0,
        y: 0,
        width: 210, //target width in the PDF document
        windowWidth: 1080 //window width in CSS pixels})
    });
}

function AcademicProfile(data, resolve, reject) {
    const userData = {
        Programs: [],
        CourseWork: {},
        GenEdComplete: false,
        Courses: [],
        FileType: "AcademicProfile"
    };

    var term = "";
    var onTerm = false;
    var year = "";
    var allPrograms = [];

    var y = 0;
    var s = 0;

    for (var line of data) {
        // console.log(line);
        if (line.match(/.*Local Campus Credits.*/)) {
            var text = line.split(" ");

            if (term === "") y = 0;
            else {
                const current = termOrder(text[0]);
                const prev = termOrder(term.split("_")[0]); 
                if (current === 2 ^ (current <= prev && prev !== 2)) {
                    y++;
                    s = 0;
                }
                else s++;
            }

            term = text[0] + "_" + text[1];
            year = Number(text[1]);
            if (year % 2 === 0) year -= 1;
            year = `${year}-${year - 2000 + 1}`;
            userData.Programs = [];
            userData.CourseWork[term] = [];
            onTerm = true;
            continue;
        }
        if (line.match(/Student Academic Profile/)) continue;
        if (line.match(/GPA/)) onTerm = false;
        // if (onTerm && crsCnt === 0) userData["Major"] = line.trim();
        if (line.match(/General Education Met/)) userData.GenEdComplete = true;
        if (onTerm && line !== "" && !line.match(/^\s+$|^\f\s+/)) {
            const program = line.match(/^[a-zA-Z&\s]+-\w+$/);
            if (program) {
                userData.Programs.push(program[0])
                if (!allPrograms.some(program => program.title === program[0])) allPrograms.push({title: program[0], year: year})
            }
            // const course = line.match(/^\w*\s*\d*/);
            const course = line.match(/^([a-zA-Z_\s]+)\s+(\d+).*(\d\.\d).*$/)
            if (course) {
                const inProgress = line.match(/\bIP\b/g);
                userData.CourseWork[term].push(`${course[1]}_${course[2]}:${course[3]}${inProgress ? ":inProgress" : ""}`.replace(/\s+/, "_"));
                const courseObject = new Course(`${course[1]}_${course[2]}`, y, s, course[3]).completed();
                if (inProgress) courseObject.inProgress();
                userData.Courses.push(courseObject);
            }
        }
    };
    if (userData.Major === "" && Object.keys(userData.CourseWork) <= 0) reject("Invalid Formatting");

    userData.Programs = userData.Programs.map(program => allPrograms.find(p => p.title === program))
    resolve(userData);
}

function AuditPlan(data, resolve, reject) {
    const userData = {
        Programs: [],
        CourseWork: [],
        GenEdComplete: false,
        Courses: [],
        FileType: "AuditPlan"
    };
    var year = -1;
    // var totalSemesters = 0;
    var inPrograms = false;

    for (var line of data) {

        if (line.match(/Degree Programs|Major\s*\(s\):|Minor\s*\(s\):|Certificates\s*\(s\):/)) {
            inPrograms = true;
        }
        else if (line.match(/Degree Planner/)) {
            inPrograms = false;
        }
        else if (inPrograms) {
            const [title, year1, year2] = line.split("-");
            userData.Programs.push({title: title, year: (year1 + "-" + year2).trim()});
        }
        else if (line.match(/Year \d/)) {
            year++;
        }
        else if (line.match(/Semester \d/g)) {
            // totalSemesters = line.match(/Semester \d/g).length;
        }
        else if (line.match(/Total|Course|Credit|Status|Plan|Planner/g)) {}
        else if (line.match(/Planned|Completed|In Progress/g)) {
            const y = year;
            line.match(/Planned|Completed|In Progress/g).forEach((status, sem) => {
                userData.CourseWork.forEach(course => {
                    if (course.plan[0] === y && course.plan[1] === sem) {
                        switch (status) {
                            case "Planned": course.planned(); break;
                            case "Completed": course.completed(); break;
                            case "In Progress": course.inProgress(); break;
                            default: 
                        }
                    }
                })
            })
        }
        else {
            const courses = line.split(/\s+/g).filter(Boolean);
            var semester = 0;

            for (let i = 0; i < courses.length; i += 2) {
                if (courses[i] === "|") {
                    i -= 1;
                }
                else {
                    userData.Courses.push(new Course(courses[i], year, semester, courses[i + 1]));
                }
                semester++;
            }
        }

    }
    resolve(userData);

}

function termOrder(term) {
    switch (term) {
        case "SPNG":
            return 0;
        case "SUM":
            return 1;
        case "FALL":
            return 2;
        default: 
            return 3;
    }
}