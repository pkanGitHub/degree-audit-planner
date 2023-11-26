// import _ from "passport-local-mongoose";
import { Course } from "./course";
import { getProgramsBySearch } from "./data";

const url = process.env.REACT_APP_API_ROUTE || "http://localhost:4001/api/";

const courses = [];
const majors = [];
const certificates = [];
const minors = [];


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

export function addPlan(name, year, type) {
    const program = getProgramsBySearch(name, year, type);
    if (!program) return;
    console.log(program);
    switch (type.toLowerCase()) {
        case "majors":
        case "major": majors.push(program.title); break;
        case "minor": minors.push(program.title); break;
        case "cert": certificates.push(program.title); break;
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

export function getCourses() {
    return courses;
}

export function removeCourse(course) {
    
}

export function addMajor(major) {
    majors.push(major);
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

export function print() {
    console.log(courses);
}

export function save(id) {
    fetch(url + "user/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            courses: courses.map(course => ({id: course.id, plan: course.plan})),
            major: majors,
            minor: minors,
            cert: certificates,
            genEd: false
        })
    }) 
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => {
        console.error(`Error saving user data: ${error}`);
    });
}

export async function read(id) {
    return await fetch(url + "user/load", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
        })
    })
    .then(response => response.json())
    .then(response => { console.log(response); return response; })
    .then(response => {
        const courseMap = response.courses.map(course => new Course(course.id, course.plan[0], course.plan[1]).setStatus(course.status));
        clearAndFill(courses, courseMap);
        clearAndFill(majors, response.major);
        clearAndFill(minors, response.minor);
        clearAndFill(certificates, response.certificates);
        console.log(courses, majors, minors, certificates);
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