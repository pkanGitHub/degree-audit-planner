const url = "http://localhost:4001/api/"

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

export async function getCourses(pull) {
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
        console.error('Error fetching data:', error);
    });
}