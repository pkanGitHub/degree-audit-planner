const url = process.env.REACT_APP_API_ROUTE || "http://localhost:4001/api/";
var Majors;
var Minors;
var Certificates;
var Courses;
var GenEds;

export async function getMajors(pull) {
    if (pull || Majors === undefined) {
        return Majors = await fetchGet('majors')
        .then(majors => planFormat(majors))
    }
    console.log(Majors);
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

export function getProgramByExactName(name) {
    if (!name) return;

    const major = Majors.filter(major => major.title === name)[0];
    if (major) return major;

    const minor = Minors.filter(minor => minor.title === name)[0];
    if (minor) return minor;

    const cert = Certificates.filter(cert => cert.title === name)[0];
    if (cert) return cert;

    return null;
}

export function getProgramsBySearch(name_segment, year, category=undefined) {

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

    const program = list?.filter(program => program.title.match(new RegExp(name_segment, "g")));
    return program;
}


export async function getCourseList(pull) {
    if (pull || Courses === undefined) {
        return Courses =  await fetchGet('courses');
    }
    return Courses;
}

export function getCourseById(id) {
    if (!id) return;
    id = id.toUpperCase();
    const area = id.slice(0, id.lastIndexOf("_"))
    const regex = new RegExp(`\\(${area}\\)$`, "i")

    if (!Courses) return;

    // console.log(Courses.filter(doc => doc.area?.match(regex) != null)[0].courses)

    const course = Courses
    .filter(doc => doc.area?.match(regex) != null)[0]?.courses
    .filter(course => course.courseID === id)[0];

    // console.log(course);

    return course;
}

export async function getGenEds(pull) {
    if (pull || GenEds === undefined) {
        return GenEds = await fetchGet('genEds');
    }
    return GenEds;
}

async function fetchGet(type) {
    return await fetch(url + type) 
    .then(response => response.json())
    .then(data => data[type])
    .catch(error => {
        console.error(`Error fetching ${type} data: ${error}`);
    });
}


function planFormat(plan) {
    return plan
    .reduce((obj, item) => {
        obj[item.year] = item.programs;
        return obj;
    }, {});
}