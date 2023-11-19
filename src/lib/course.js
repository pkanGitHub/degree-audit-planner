import { getCourseById } from "./data";

export class Course {

    constructor(id, year, semester, credits) {
        this.id = id;
        const course = getCourseById(id);
        this.plan = [year, semester];

        this.name = course?.name;
        this.description = course?.description;
        this.credits = (credits || course?.credit).replace(".0", "");
        this.status = "planned";
        this.unique = generateUniqueID();
    }

    // Done this way so I don't have to worry about using the right string or number value everywhere.
    completed() { this.status = "completed"; return this;}
    planned() { this.status = "planned"; return this;}
    inProgress() { this.status = "in-progress"; return this;}


}

const uniques = new Set();
function generateUniqueID() {
    var id = Math.random().toString(16).slice(2);
    if (uniques.has(id)) return generateUniqueID();
    return id;
}