const url = "http://localhost:/api/"

var Majors;
var Minors;
var Certificates;
var Courses;
var GenEds;

export async function getMajors(pull) {
    if (pull || Majors === undefined) {
        return Majors = await fetchGet('majors') ;
    }
    return Majors;
}

export async function getMinors(pull) {
    if (pull || Minors === undefined) {
        return Minors = await fetchGet('minors');
    }
    return Minors;
}

export async function getCerts(pull) {
    if (pull || Certificates === undefined) {
        return Certificates = await fetchGet('certificates');
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

export function getProgramsBySearch(name_segment, category=undefined) {

    if (category === undefined) {
        const programs = [];
        programs.concat(getProgramsBySearch(name_segment, "major"))
        programs.concat(getProgramsBySearch(name_segment, "minor"))
        programs.concat(getProgramsBySearch(name_segment, "cert"))
        return programs;
    }
    var list;

    switch(category.toLowerCase()) {
        case "majors":
        case "major": 
            list = Majors;
            break;
        case "minor": 
            list = Minors;
            break;
        case "cert": 
            list = Certificates;
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
    const area = id.slice(0, id.lastIndexOf("_"))
    const regex = new RegExp(`\\(${area}\\)$`)

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

async function fetchGet(type) {
    return await fetch(url + type) 
    .then(response => response.json())
    .then(data => data[type])
    .catch(error => {
        console.error(`Error fetching ${type} data: ${error}`);
    });
}