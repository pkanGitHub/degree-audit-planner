import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import{ saveAs } from 'file-saver';
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
        
            for (var line of data) {
                // console.log(line);
                if (line.match(/.*Local Campus Credits.*/)) {
                    var text = line.split(" ");
                    term = text[0] + "_" + text[1];
                    userData.CourseWork[term] = [];
                    userData.Programs = [];
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
                        continue;
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
            resolve(userData);
        })
        .catch(error => {
            reject(error);
        });
    })
}

