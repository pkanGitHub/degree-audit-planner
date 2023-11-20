import "../styles/semesterPlan.css";
import { getCourseById, getProgramsBySearch } from "../lib/data";
import { Course, STATUS } from "../lib/course";
import { getCourses } from "../lib/user";
import { useState, memo } from "react";

export const SemesterPlan = memo(({data, courses}) => {
    console.log(data);
    const [change, callChange] = useState(1);
    const update = () => callChange(change + 1);

    var years = [];
    addFromUser(years, courses);
    addProgramPlans(years, data);
    years = DeleteDuplicates(years);

    if (JSON.stringify(years[years.length -1 ]?.semesters) === "[[],[]]") years.pop();


    if (years.length > 0 && change) return (
        <div id="planner">
            <h2 id='userPlanner'>User's Degree Planner</h2>
                {years?.map((year, index) => {
                    const rows = year?.semesters.reduce((max, semester) => max > semester.length ? max : semester.length, 0)

                    const totals = Array(year?.semesters.length).fill(0);

                    return (
                        <table key={index} id={"Year" + (index + 1)} className="planTable">
                            <thead>
                                <tr>
                                    <th colSpan={year.semesters.length * 2} id='tableHeading'>Year {index + 1}</th>
                                </tr>
                                <tr>

                                    {
                                        year.semesters.map((semester, index) => 
                                            <td colSpan={2} className="semesterHeading">Semester {index + 1}</td>
                                        )
                                    }
                                </tr>
                                <tr className="courseTableInfo" id="tableDataHeading">

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
                                            { year.semesters.map((semester, index) => {
                                                const course = semester[r];
                                                return (
                                                <>
                                                    <td className={"courseLabel " + course?.status}>{ course?.id.replace(/_/g, " ") }</td>
                                                    <td>{ (() => {
                                                            const credit = course?.credits
                                                            totals[index] += !isNaN(Number(credit)) ? Number(credit) : 0;
                                                            return credit;
                                                        })()}
                                                    </td>
                                                </>)
                                            })}
                                        </tr>
                                    )
                                }, year)}
                            </tbody>



                            <tfoot>
                                <tr id='tableSummary'>
                                    { year.semesters.map((semester, index) => 
                                    <>
                                        <td><b>Status:</b> <SetStatus semester={semester} update={update} /></td>
                                        <td><b>Total Credit Hours: </b>{ totals[index] }</td>
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
        <h4 style={{textAlign: "center"}}>Add some courses to generate a degree plan</h4>
    )
})

function calcStatus(semester) {
    if (semester.every(course => course?.status ? course.status === STATUS.COMPLETED : true)) return STATUS.COMPLETED;
    if (semester.every(course => course?.status ? course.status === STATUS.INPROGRESS : true)) return STATUS.INPROGRESS;
    if (semester.every(course => course?.status ? course.status === STATUS.PLANNED : true)) return STATUS.PLANNED;

    return undefined;
}

function SetStatus({semester, update}) {
    const manualChange = e => {
        semester.forEach(course => course.setStatus(e.target.value));
        update();
        console.log(semester);
    }

    return (
        <select defaultValue={ calcStatus } onChange={manualChange}>
            <option value={ STATUS.PLANNED }>Planned</option>
            <option value={ STATUS.INPROGRESS }>In Progress</option>
            <option value={ STATUS.COMPLETED }>Completed</option>
        </select>
    )
}

function DeleteDuplicates(years) {
    const uniqueCourses = new Set();
  
    return years.map( year => {
        const uniqueSemesters = year.semesters.map( semester => {
            return semester.filter( course => {
                if (uniqueCourses.has(course)) return false;
                uniqueCourses.add(course);
                return true;
            });
        });
        return { semesters: uniqueSemesters };
    });
}

function addProgramPlans(years, data) {

    data.map(program => getProgramsBySearch(program.category, program.year, program.type))
    .filter(programs => programs && programs[0].years)
    .map(programs => programs[0])
    .reduce((YEARS, program) =>
        program.years.reduce((YEARS, year, i) => {
            if (!YEARS[i]?.semesters) YEARS[i] = {semesters: []};

            for (var s in year?.semesters) {
                console.log(year?.semesters[s].courses);
                if (YEARS[i]?.semesters[s] === undefined) { YEARS[i].semesters[s] = [];}
                YEARS[i].semesters[s] = YEARS[i].semesters[s].concat(year?.semesters[s]?.courses
                                     .filter(course => course?.id).map(course => new Course(course.id, i, 0).planned()));
            }

            // NEED TO FIX THIS YOU BIG DUMBY
            if (program.years[i]?.courses) {
                const total = program.years[i].courses
                for (const k in total) {
                    if (k <= total.length / 2) YEARS[i].semesters[0].push(total[k]?.id)
                    else YEARS[i].semesters[1].push(total[k]?.id);
                }
                return YEARS;
            }
            return YEARS;

        }, YEARS), years)  
}

function addFromUser(years, courses) {
    if (courses.length < 1) return courses;
    // console.log("From User pre formatting: ");
    // console.log(courses);
    for (var course of courses) {
        const y = course.plan[0];
        const s = course.plan[1];

        if (!years[y]) years[y] = {semesters: []}
        if (!years[y].semesters[s]) years[y].semesters[s] = [];

        years[y].semesters[s].push(course);
    }
    // console.log("From User post formatting: ")
    // console.log(years);
}

export default SemesterPlan;