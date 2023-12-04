import { API } from 'aws-amplify';
var Majors;
var Minors;
var Certificates;
var Courses;
var GenEds;
var Years;

export async function getMajors(pull) {
    if (pull || Majors === undefined) {
        // const years = await getYears();
        const years = await fetchGet('years');
        if (!years) return;
        const programs = [];
        for (var year of years) {
            const program = await fetchGet('majors', year)
            programs.push({year: year, programs: program})
        }
        Majors = planFormat(programs);
        return Majors;
    }
    return Majors;
}

export async function getMinors(pull) {
    if (pull || Minors === undefined) {
        return Minors = await fetchGet('minors')
        .then(minors => planFormat(minors));
    }
    return Minors;
}

export async function getCerts(pull) {
    if (pull || Certificates === undefined) {
        return Certificates = await fetchGet('certificates')
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

export function getProgramsBySearch(name_segment, year, category=undefined) {

    console.log(year);
    if (category === undefined) {
        var programs = [];
        programs = programs.concat(getProgramsBySearch(name_segment, year, "major"))
        programs = programs.concat(getProgramsBySearch(name_segment, year, "minor"))
        programs = programs.concat(getProgramsBySearch(name_segment, year, "cert"))
        return programs;
    }
    var list;

    switch(category.toLowerCase()) {
        case "majors":
        case "major": 
            list = Majors[year];
            break;
        case "minor": 
            list = Minors[year];
            break;
        case "cert": 
            list = Certificates[year];
            break;
        default: return undefined;
    }

    const program = list?.filter(program => program.title.match(new RegExp(name_segment, "g")))?.map(program => { program.type = category; return program; });
    return program;
}

var runningCoursePull = false
export async function getCourseList(pull) {
    if ((pull || Courses === undefined) && !runningCoursePull) {
        runningCoursePull = true;
        var courses = [];

        for (let i = 1; i < 6; i++) {
            const page =  await fetchGet('courses', i);
            courses = courses.concat(page);
        }
        Courses = courses;
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
        return GenEds = await fetchGet('genEds');
    }
    return GenEds;
}

export async function getYears(pull) {
    if (pull || Years === undefined) {
        return Years = await fetchGet('years')
    }
    return Years;
}

// async function fetchGet(type, year) {
//     return await fetch(url + type + (year ? `/${year}` : "")) 
//     .then(response => response.json())
//     .then(reponse => {console.log(reponse); return reponse})
//     .then(data => data[type])
//     .then(data => {console.log(data); return data})
//     .catch(error => {
//         console.error(`Error fetching ${type}${year ? ` for ${year}`: ""} data: ${error}`);
//     });
// }

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