import{ saveAs } from 'file-saver';
import { jsPDF } from "jspdf";
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import * as PDFWorker from 'pdfjs-dist/build/pdf.worker.mjs'
GlobalWorkerOptions.workerSrc = PDFWorker;

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const contents = e.target.result;
            const pdfloading = getDocument(contents);

            pdfloading.promise.then(pdf => {
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
                                return 0;
                            })

                            const text = pageTextContent.items.map(item => {
                                var text = item.str;

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
                                resolve(combinedText);
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
        readFile(file).then(fileBody => {
            const data = fileBody.split('\n');
            const userData = {
                Programs: [],
                CourseWork: {},
                GenEdComplete: false
            };

            var term = "";
            var onTerm = false;
            var year = "";
            var allPrograms = [];
        
            for (var line of data) {
                // console.log(line);
                if (line.match(/.*Local Campus Credits.*/)) {
                    var text = line.split(" ");
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
                    }
                }
            };
            if (userData.Major === "" && Object.keys(userData.CourseWork) <= 0) reject("Invalid Formatting");

            userData.Programs = userData.Programs.map(program => allPrograms.find(p => p.title === program))
            resolve(userData);
        })
        .catch(error => {
            reject(error);
        });
    })
}

export function exportData() {
    const fileName = Math.random().toString(16).slice(2) + ".pdf";
    const doc = new jsPDF();

    const style = 
    `<style>
        table {
            margin-left: auto;
            margin-right: auto;
            border: 1px solid black;
            border-collapse: collapse;
            width: 90%;
            margin-bottom: 10px;
            text-indent: initial;
            border-spacing: 2px;
        }
        .yearHeading {
            text-align: center;
            background-color: #F1B82D;
            border-bottom: 1px solid black;
            padding: 10px;
        }
        .semesterHeading {
            background-color: lightgray;
            font-weight: bold;
            border-bottom: 1px solid black;
            border-left: 1px solid black;
            border-right: 1px solid black;
        }
        th, td {
            padding: 5px;
            text-align: left;
            background-color: white;
        }
        tr {
            border-left: 1px solid black;
            border-right: 1px solid black;
        }
        td:nth-child(2), td:nth-child(4), th:nth-child(2), th:nth-child(4) {
            border-right: 1px solid black;
        }
    </style>`

    // const years = [];

    // for (var course of plan) {
    //     const y = course.plan[0];
    //     const s = course.plan[1];

    //     if (!years[y]) years[y] = {semesters: []}
    //     if (!years[y].semesters[s]) years[y].semesters[s] = [];

    //     years[y].semesters[s].push(course);
    // }

    // years.map((year, yearIndex) => {
    //     var thead = `<thead>`
    //     thead += 
    //     `<tr>
    //         <th colspan="4" class="yearHeading">Year ${yearIndex}</th>
    //     </tr>`


    // })

    var html = 
    `<div style="width: 100%;">
        <table>
            <thead>
                <tr>
                    <th colspan="4" class="yearHeading">Year 1</th>
                </tr>
                <tr>
                    <th colspan="2" class="semesterHeading">Semester 1</th>
                    <th colspan="2" class="semesterHeading">Semester 2</th>
                </tr>    
                <tr>
                    <th>Course</th>
                    <th>Credits</th>
                    <th>Course</th>
                    <th>Credits</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>3</td>
                    <td>Name</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>3</td>
                    <td>Name</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>3</td>
                    <td>Name</td>
                    <td>3</td>
                </tr>
            </tbody>
            <tfoot>
                <tr className='tableSummary'>
                    <td colspan="2"><b>Status: </b>Completed</td>
                    <td colspan="2"><b>Total Credit Hours: </b>9</td>
                </tr>
            </tfoot>
        </table>
    </div>`

    const table = document.getElementById("planner");
    if (!table) return;

    doc.html(table, {    
        callback: function(doc) {
        // Save the PDF
        doc.save(fileName);
    },
    x: 0,
    y: 0,
    width: 170, //target width in the PDF document
    windowWidth: 1080 //window width in CSS pixels})

    // const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });

    // saveAs(blob, fileName)
    });
}