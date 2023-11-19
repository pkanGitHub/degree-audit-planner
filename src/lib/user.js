const courses = [];
const majors = [];
const certificates = [];
const minors = [];


export function addCourse(course) {
    courses.push(course);
}

export function concatCourses(courseArr) {
    courses.push(
        ...courseArr[0].filter(course => courses.every(COURSE => {
            return   COURSE.id !== course.id && 
                    (COURSE.plan[0] !== course.plan[0] &&
                     COURSE.plan[1] !== course.plan[1])
    })))
    console.log(courses);
}

export function getCourses() {
    return courses;
}

export function removeCourse(course) {
    
}

export function addMajor(major) {
    majors.push(major);
}