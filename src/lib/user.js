// import _ from "passport-local-mongoose";
import { Course } from "./course";
import { getProgramsBySearch } from "./data";
import Cookies from 'universal-cookie';
import { API } from 'aws-amplify';

const courses = [];
const majors = [];
const certificates = [];
const minors = [];

export function userMajors() { return majors; }
export function userMinors() { return minors; }
export function userCerts() { return certificates; }


export function addCourse(course) {
    courses.push(course);
}

export function concatCourses(courseArr) {
    courses.push(
        ...courseArr.filter(course => courses.every(COURSE => {
            return   COURSE.id !== course.id && 
                    (COURSE.plan[0] !== course.plan[0] &&
                     COURSE.plan[1] !== course.plan[1])
    })))
    console.log(courses);
}

export function setCourses(courseArr) {
    clearAndFill(courses, courseArr);
}

export function addPlan(name, year, type) {
    const program = getProgramsBySearch(name, year, type);
    if (!program) return;
    console.log(program);
    switch (type.toLowerCase()) {
        case "majors":
        case "major": majors.push({ title: program[0].title, year: year }); break;
        case "minor": minors.push({ title: program[0].title, year: year }); break;
        case "cert": certificates.push({ title: program[0].title, year: year }); break;
        default: return;
    }

    const plan = [];
    program[0]?.years.forEach((year, y) => 
        year.semesters.forEach((semester, s) => 
            semester.courses.filter(course => course?.id)
            .forEach(course => 
                plan.push(new Course(course.id, y, s).suggested())
    )));
    
    concatCourses(plan);
}

export function getPrograms() {
    return majors.map(major => ({category: major.title, year: major.year, type: "major"}))
        .concat(minors.map(minor => ({category: minor.title, year: minor.year, type: "major"})))
        .concat(certificates.map(cert => ({category: cert.title, year: cert.year, type: "major"})));

}

export function removeProgram(category, year, type) {
    switch (type.toLowerCase()) {
        case "majors":
        case "major": majors.splice(majors.findIndex(major => major.title === category && major.year === year), 1); break;
        case "minor": minors.splice(minors.findIndex(minor => minor.title === category && minor.year === year), 1); break;
        case "cert": certificates.splice(certificates.findIndex(cert => cert.title === category && cert.year === year), 1); break;
        default: return;
    }
}

export function getCourses() {
    return courses;
}

export function addMajor(major, year) {
    majors.push({ title: major, year: year });
}

export function addPrograms(programs) {
    for (var p of programs) {
        var [name, type] = p.title.split("-");
        console.log(name);
        console.log(type);
        switch (type) {
            case "MI":
                type = "minor";
                break;
            default: type = undefined;
        }
        console.log(getProgramsBySearch(name, p.year, type));
        
    }
}

export function clear() {
    const pop = array => {
        do {
            array.pop();
        }
        while(array.length > 0);
    }
    pop(courses);
    pop(majors);
    pop(minors);
    pop(certificates);
}

export function print() {
    console.log(courses);
}

export function save(id) {
    API.post('DatabaseAPI', "/auth/user/save", {
        body:{
            id: id,
            courses: courses.map(course => ({id: course.id, plan: course.plan, status: course.status, credits: course.credits})),
            major: majors,
            minor: minors,
            cert: certificates,
            genEd: false
        }
    }) 
    .then(response => console.log(response))
    .catch(error => {
        console.error(`Error saving user data: ${error}`);
    });
}

export async function read(id) {
    return await API.post('DatabaseAPI', "/auth/user/save", {
        body:{ id: id }
    }) 
    .then(response => {
        console.log(response);
        // new Cookies().set("user", {id: response.id, email: response.email});
        const courseMap = response.courses.map(course => new Course(course.id, course.plan[0], course.plan[1], course.credits).setStatus(course.status));
        clearAndFill(courses, courseMap);
        clearAndFill(majors, response.major);
        clearAndFill(minors, response.minor);
        clearAndFill(certificates, response.certificates);
        return true;
    })
    .catch(error => console.error(error));
}

function clearAndFill(array, items) {
    do {
        array.pop();
    }
    while(array.length > 0);

    if (items && items.length > 0)
        for (var i of items) {
            if (i) array.push(i);
        }
}

export function tempStorage() {
    localStorage.setItem("saveData", JSON.stringify({
        courses: courses.map(course => ({id: course.id, plan: course.plan, status: course.status, credits: course.credits})),
        major: majors,
        minor: minors,
        cert: certificates
    }))
}

export function checkStorage() {
    const data = JSON.parse(localStorage.getItem("saveData"));
    const user = new Cookies(null).get("user");

    if (data && user?.id) {
        const courseMap = data.courses.map(course => new Course(course.id, course.plan[0], course.plan[1], course.credits).setStatus(course.status));
        clearAndFill(courses, courseMap);
        clearAndFill(majors, data.major);
        clearAndFill(minors, data.minor);
        clearAndFill(certificates, data.certificates);
        save(user.id);
    }

    localStorage.removeItem("saveData") 

    return 
}