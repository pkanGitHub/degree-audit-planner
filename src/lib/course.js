import { getCourseById } from "./data";

export const STATUS = {
    COMPLETED: "completed",
    PLANNED: "planned",
    INPROGRESS: "in-progress",
    SUGGESTED: "suggested"
}
Object.freeze(STATUS);
export class Course {

    constructor(id, year, semester, credits) {
        this.id = id;
        const course = getCourseById(id);
        this.plan = [year, semester];

        this.name = course?.name;
        this.description = course?.description;
        this.credits = (credits || course?.credit)?.replace(".0", "");
        this.status = STATUS.PLANNED;
        this.unique = generateUniqueID();
    }

    // Done this way so I don't have to worry about using the right string or number value everywhere.
    setStatus(status) { this.status = status; return this; }
    completed() { this.status = STATUS.COMPLETED; return this; }
    planned() { this.status = STATUS.PLANNED; return this; }
    inProgress() { this.status = STATUS.INPROGRESS; return this; }
    suggested() { this.status = STATUS.SUGGESTED; return this; }


}

const uniques = new Set();
function generateUniqueID() {
    var id = Math.random().toString(16).slice(2);
    if (uniques.has(id)) return generateUniqueID();
    return id;
}