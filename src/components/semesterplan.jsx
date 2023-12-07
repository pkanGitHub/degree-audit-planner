import "../styles/semesterPlan.css";
import { getProgramsBySearch } from "../lib/data";
import { Course, STATUS } from "../lib/course";
import { useState, memo } from "react";
import Popup from "reactjs-popup";
import PlanPosition from "./planPosition"
import { planYears, removeCourse } from "../lib/user";

export const SemesterPlan = ({ courses, updateParent }) => {
    const [change, callChange] = useState(1);
    const update = () => callChange(change + 1);

    var years = [];
    addFromUser(years, courses);
    years = DeleteDuplicates(years);

    if (JSON.stringify(years[years.length - 1]?.semesters) === "[[],[]]") years.pop();


    if (years.length > 0 && change) return (
        <div id="planner">
            <h2 id='userPlanner'>Degree Plan</h2>
            {years?.map((year, index) => {
                const rows = year?.semesters.reduce((max, semester) => max > semester.length ? max : semester.length, 0)

                return (
                    <table key={index} id={"Year" + (index + 1)} className="planTable">
                        <thead>
                            <tr>
                                <th colSpan={year.semesters.length * 2} className='tableHeading'>Year {index + 1}</th>
                            </tr>
                            <tr>
                                {
                                    year.semesters.map((semester, index) =>
                                        <td colSpan={2} className="semesterHeading">{
                                            index === 0 ? "Fall" :
                                                index === 1 ? "Summer" :
                                                    "Spring"
                                        }</td>
                                    )
                                }
                            </tr>
                            <tr className="courseTableInfo tableDataHeading">

                                {
                                    year.semesters.map(() =>
                                        <>
                                            <td>Course name</td>
                                            <td>Credit hours</td>
                                        </>
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(rows).keys()].map(r => {

                                return (
                                    <tr className="courseTableInfo" key={r}>
                                        {year.semesters.map(semester =>
                                            <CourseCell course={semester[r]} update={update} updateAudit={updateParent}/>
                                        )}
                                    </tr>
                                )
                            }, year)}
                        </tbody>
                        <tfoot>
                            <tr className='tableSummary'>
                                {year.semesters.map((semester, index) =>
                                    <>
                                        <td><b>Status:</b> <SetStatus semester={semester} update={update} /></td>
                                        <td><b>Total Credit Hours: </b>{calcCredits(semester)}</td>
                                    </>
                                )}
                            </tr>
                        </tfoot>
                    </table>
                )
            })}
        </div>
    );

    else return (
        <h4 style={{ textAlign: "center" }}>Add some courses to generate a degree plan</h4>
    )
}

function CourseCell({ course, update, updateAudit }) {

    const check = (status) => {
        course.status = status;
        update();
    }

    if (course) return (
        <>
            <td >
                <Popup contentStyle={{ height: "fit-content", width: "fit-content", margin: 'auto', padding: "10px" }} position={'top left'}
                    trigger={<button className={"courseLabel " + course?.status}>{course?.id.replace(/_/g, " ")}</button>} > {
                        <div>
                            {course?.status === STATUS.SUGGESTED ? <span>This course was suggested based on the programs you selected.</span> : null}
                            <div className="statusSet">
                                <span>{ course?.status === STATUS.SUGGESTED ? "Set " : ""}Status:</span>
                                <span className={course?.status === STATUS.PLANNED ? "checked" : null} onClick={() => check(STATUS.PLANNED)} >Planned</span>
                                -
                                <span className={course?.status === STATUS.INPROGRESS ? "checked" : null} onClick={() => check(STATUS.INPROGRESS)} >In Progress</span>
                                -
                                <span className={course?.status === STATUS.COMPLETED ? "checked" : null} onClick={() => check(STATUS.COMPLETED)} >Completed</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <button
                                    className='removeButton'
                                    onClick={() => {
                                        removeCourse(course);
                                        updateAudit();
                                    }}
                                    style={{ height: 50, padding: "0px 30px" }}
                                >Remove</button>
                                <PlanPosition
                                    plan={course?.plan || [-1, -1]}
                                    set={(year, semester) => {
                                        course.setPlan(year, semester);
                                        updateAudit();
                                    }}
                                />
                            </div>
                        </div>
                    }
                </Popup>
            </td>
            <td>
                {course?.credits && course?.credits?.match("-", "g") ?
                    <CreditSlider course={course} />
                    :
                    course?.credits
                }
            </td>
        </>
    )
    else return (
        <>
            <td></td>
            <td></td>
        </>
    )
}

function calcStatus(semester) {
    semester = semester.filter(course => course?.status);                                               // Removes any empty cells
    if (semester.every(course => course.status === STATUS.COMPLETED)) return STATUS.COMPLETED;          // These check if all courses share a status
    if (semester.every(course => course.status === STATUS.INPROGRESS)) return STATUS.INPROGRESS;
    if (semester.every(course => course.status === STATUS.PLANNED)) return STATUS.PLANNED;

    if (semester.some(course => course.status === STATUS.PLANNED)) return STATUS.PLANNED;               // If they dont share a single status
    if (semester.some(course => course.status === STATUS.INPROGRESS)) return STATUS.INPROGRESS;         // Check what the lowest level status is (Planned -> InProgress) Completed must be all elements

    return STATUS.PLANNED;                                                                              // By default it will be Planned, because its a plan
}


function SetStatus({ semester, update }) {
    const manualChange = e => {
        semester.forEach(course => course.setStatus(e.target.value));
        update();
    }

    return (
        <select value={calcStatus(semester)} onChange={manualChange} >
            <option value={STATUS.PLANNED}>Planned</option>
            <option value={STATUS.INPROGRESS}>In Progress</option>
            <option value={STATUS.COMPLETED}>Completed</option>
        </select>
    )
}

function calcCredits(semester) {
    return semester.reduce((total, course) => total + Number(course?.credits), 0);
}

function CreditSlider({ course }) {
    const creditVals = course.credits.split("-");
    const [currentVal, setCredits] = useState(Number(creditVals[0]))

    return (
        <Popup contentStyle={{ height: "fit-content", width: "fit-content", margin: 'auto', padding: "10px" }} position={'top left'}
            trigger={
                <button className={"courseLabel"}>{currentVal}</button>
            }>
            {
                <div>
                    {creditVals[0]}
                    <input type="range" min={Number(creditVals[0])} max={Number(creditVals[1])} defaultValue={creditVals[0]} onChange={e => setCredits(e.target.value)} />
                    {creditVals[1]}
                </div>
            }
        </Popup>
    )
}

function DeleteDuplicates(years) {
    const uniqueCourses = new Set();

    return years.map(year => {
        const uniqueSemesters = year.semesters.map(semester => {
            return semester.filter(course => {
                if (uniqueCourses.has(course)) return false;
                uniqueCourses.add(course);
                return true;
            });
        });
        return { semesters: uniqueSemesters };
    });
}


function addFromUser(years, courses) {
    if (courses.length < 1) return courses;

    for (var course of courses) {
        const y = course.plan[0];
        const s = course.plan[1];

        if (!years[y]) years[y] = { semesters: [] }
        if (!years[y].semesters[s]) years[y].semesters[s] = [];

        years[y].semesters[s].push(course);
    }
}

export default SemesterPlan;