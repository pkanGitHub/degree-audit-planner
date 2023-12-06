import { API } from 'aws-amplify';
var Majors;
var Minors;
var Certificates;
var Courses;
var GenEds;
var Years;

export async function getMajors(pull) {
    if (pull || Majors === undefined) {

        return Majors = await getData("majors")
        .then(majors => planFormat(majors))
    }
    return Majors;
}

export async function getMinors(pull) {
    if (pull || Minors === undefined) {
        return Minors = await getData('minors')
            .then(minors => planFormat(minors));
    }
    return Minors;
}

export async function getCerts(pull) {
    if (pull || Certificates === undefined) {
        return Certificates = await getData('certificates')
            .then(certs => planFormat(certs))
            .catch(err => console.log(err));
    }
    return Certificates;
}

export function getProgramByExactName(name, year) {
    if (!name || !year) return;

    const major = Majors[year].filter(major => major.title === name)[0];
    if (major) return major;

    const minor = Minors[year].filter(minor => minor.title === name)[0];
    if (minor) return minor;

    const cert = Certificates[year].filter(cert => cert.title === name)[0];
    if (cert) return cert;

    return null;
}

export function getProgramsBySearch(name_segment, year, category = undefined) {

    console.log(year);
    if (category === undefined) {
        var programs = [];
        programs = programs.concat(getProgramsBySearch(name_segment, year, "major"))
        programs = programs.concat(getProgramsBySearch(name_segment, year, "minor"))
        programs = programs.concat(getProgramsBySearch(name_segment, year, "cert"))
        return programs;
    }
    var list;

    switch (category.toLowerCase()) {
        case "majors":
        case "major":
            list = Majors[year];
            break;
        case "minors":
        case "minor":
            list = Minors[year];
            break;
        case "certificates":
        case "certificate":
        case "cert":
            list = Certificates[year];
            break;
        default: return undefined;
    }

    const program = list?.filter(program => program.title.match(new RegExp(name_segment, "g")))?.map(program => { program.type = category; return program; });
    return program;
}

export async function getCourseList(pull) {
    if (pull || Courses === undefined) {
        return Courses = await getData('courses');
    }
    return Courses;
}

export function getCourseById(id) {
    if (!id) return;
    id = id.toUpperCase();
    const area = id.slice(0, id.lastIndexOf("_"))
    const regex = new RegExp(`\\(${area}\\)$`, "i")

    if (!Courses) return;

    const course = Courses
        .filter(doc => doc.area?.match(regex) != null)[0]?.courses
        .filter(course => course.courseID === id)[0];

    return course;
}

export async function getGenEds(pull) {
    if (pull || GenEds === undefined) {
        return GenEds = await getData('genEds');
    }
    return GenEds;
}

export async function getYears(pull) {
    if (pull || Years === undefined) {
        return Years = await getData('years')
    }
    return Years;
}

export async function fetchGet(type, year) {
    return await API.get('DatabaseAPI', "/api/" + type + (year ? `/${year}` : ""))
    .then(data => data[type])
    .catch(error => {
        console.error(`Error fetching ${type}${year ? ` for ${year}`: ""} data: ${error}`);
    });

}

function planFormat(plan) {
    if (!plan) return [];
    return plan
        .reduce((obj, item) => {
            obj[item.year] = item.programs;
            return obj;
        }, {});
}

function getData(type) {
    return checkCache(type)
    .then(result => {
        if (result === null) return makeCache(type);
        return result;
    })
}

// INDEX DB
function checkCache(type) {
    return new Promise((resolve, reject) => {
        const dbName = 'cache';
        const storeName = 'data';

        // Open the database
        const openRequest = indexedDB.open(dbName, 1);

        openRequest.onupgradeneeded = event => {
            const db = event.target.result;
            db.createObjectStore(storeName, { keyPath: 'type' });
        };

        openRequest.onsuccess = event => {
            const db = event.target.result;

            // Start a read-write transaction
            const transaction = db.transaction([storeName], 'readwrite');
            const objectStore = transaction.objectStore(storeName);

            const getRequest = objectStore.get(type);

            getRequest.onsuccess = event => {
                const result = event.target.result;

                if (result) {
                    const data = result.value;
                    resolve(JSON.parse(data));
                } else {
                    resolve(null);
                }
            };

            getRequest.onerror = event => {
                console.error('Error checking for data:', event.target.error);
                reject(event.target.error);
            };
        };

        openRequest.onerror = event => {
            console.error('Error opening database:', event.target.error);
            reject(event.target.error);
        };
    });
}


function makeCache(type) {
    return new Promise((resolve, reject) => {
        const dbName = 'cache';
        const storeName = 'data';

        const saveCache = data => {
            console.log(data);
            // Open the database
            const openRequest = indexedDB.open(dbName, 1);

            openRequest.onupgradeneeded = event => {
                const db = event.target.result;
                db.createObjectStore(storeName, { keyPath: 'type' });
            };

            openRequest.onsuccess = event => {
                const db = event.target.result;

                const transaction = db.transaction([storeName], 'readwrite');
                const objectStore = transaction.objectStore(storeName);

                const addRequest = objectStore.put({ type: type, value: JSON.stringify(data) });

                addRequest.onsuccess = event => {
                    console.log('Data added successfully');
                    resolve(data);
                };

                addRequest.onerror = event => {
                    console.error('Error adding data:', event.target.error);
                    reject(event.target.error);
                };
            };

            openRequest.onerror = event => {
                console.error('Error opening database:', event.target.error);
                reject(event.target.error);
            };
        }



        try {
            if (type === "majors") {
                getYears()
                .then(years => runMany(type, years))
                .then(data => saveCache(data))
            }
            else if (type === "courses") {
                runMany(type, [1, 2, 3, 4, 5, 6])
                .then(data => saveCache(data));
            }
            else {
                fetchGet(type)
                .then(data => saveCache(data))
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
            reject(error);
        };
    })
}

function runMany(type, params) {
    return new Promise( async (resolve, reject) => {
        var courses = [];

        for (var param of params) {
            const page =  await fetchGet(type, param);

            if (type === "majors") courses.push({year: param, programs: page})
            else courses = courses.concat(page);
        }

        resolve(courses)
    })
}