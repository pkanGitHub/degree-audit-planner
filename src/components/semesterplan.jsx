import "../styles/semesterPlan.css";
import { getCourseById, getProgramsBySearch } from "../lib/data";
import { Course } from "../lib/course";
import { getCourses } from "../lib/user";

export default function SemesterPlan({data, courses}) {

    var years = [];
    addFromUser(years, courses);
    addProgramPlans(years, data);
    years = DeleteDuplicates(years);

    if (JSON.stringify(years[years.length -1 ]?.semesters) === "[[],[]]") years.pop();


    if (years.length > 0) return (
        <div id="planner">
            <h2 id='userPlanner'>User's Degree Planner</h2>
                {years?.map((year, index) => {
                    const rows = year?.semesters.reduce((max, semester) => max > semester.length ? max : semester.length, 0)
                    // const rows =  year?.semesters[0].length > year?.semesters[1].length ? year?.semesters[0].length : year?.semesters[1].length;
                    var total1 = 0;
                    var total2 = 0;

                    const totals = Array(year?.semesters.length).fill(0);

                    return (
                        <table key={index} id={"Year" + (index + 1)} className="planTable">
                            <thead>
                                <tr>
                                    <th colSpan={year.semesters.length * 2} id='tableHeading'>Year {index + 1}</th>
                                </tr>
                                <tr>

                                    {
                                        // year.semesters.length === 1 ? 
                                        // <td colSpan={4} className="semesterHeading">Semester 1</td>
                                        // :
                                        year.semesters.map((semester, index) => 
                                            <td colSpan={2} className="semesterHeading">Semester {index + 1}</td>
                                        )
                                    }


                                    
                                    {/* <td colSpan={2} className="semesterHeading">Semester 2</td> */}
                                </tr>
                                <tr className="courseTableInfo" id="tableDataHeading">

                                    {
                                        // year.semesters.length === 1 ? 
                                        // <>
                                        //     <td></td>
                                        //     <td>Course name</td>
                                        //     <td>Credit hours</td>
                                        //     <td></td>
                                        // </>
                                        // :
                                        year.semesters.map(() => 
                                            <>
                                                <td>Course name</td>
                                                <td>Credit hours</td>
                                            </>
                                        )
                                    }
                                    {/* 
                                    <td>Course name</td>
                                    <td>Credit hours</td> */}
                                </tr>
                            </thead>          
                            <tbody>
                                {[...Array(rows).keys()].map(r => {

                                    // const semester1 = year.semesters[0];
                                    // const semester2 = year.semesters[1];

                                    // // const course1 = semester1[r];
                                    // // const course2 = semester2[r];

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
                                            {/* <td className={"courseLabel " + course1?.status}>{ course1?.id.replace(/_/g, " ") }</td>
                                            <td>{ (() => {
                                                const credit = course1?.credits
                                                total1 += !isNaN(Number(credit)) ? Number(credit) : 0;
                                                return credit;
                                            })()}</td>
                                            <td className={"courseLabel " + course2?.status}>{ course2?.id.replace(/_/g, " ") }</td>
                                            <td>{ (() => {
                                                const credit = course2?.credits
                                                total2 += !isNaN(Number(credit)) ? Number(credit) : 0;
                                                return credit;
                                            })()}</td> */}
                                        </tr>
                                    )
                                }, year)}
                            </tbody>
                            <tfoot>
                                <tr id='tableSummary'>
                                    { year.semesters.map((semester, index) => 
                                    <>
                                        <td><b>Status:</b> {calcStatus(semester)}</td>
                                        <td><b>Total Credit Hours: </b>{ totals[index] }</td>
                                    </>
                                    )}
                                    {/* <td><b>Status:</b> {calcStatus(year.semesters[0])}</td>
                                    <td><b>Total Credit Hours: </b>{ total1 }</td>
                                    <td><b>Status:</b> {calcStatus(year.semesters[1])}</td>
                                    <td><b>Total Credit Hours: </b>{ total2 }</td> */}
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
}

function calcStatus(semester) {
    if (semester.every(course => course?.status ? course.status === "completed" : true)) return "Completed";
    if (semester.every(course => course?.status ? course.status === "in-progress" : true)) return "In Progress";
    if (semester.every(course => course?.status ? course.status === "Planned" : true)) return "Planned";

    return undefined;
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
            // console.log(year);
            // const semesters = YEARS[i].semesters = YEARS[i]?.semesters ? YEARS[i].semesters : []
            if (!YEARS[i]?.semesters) YEARS[i] = {semesters: []};

            for (var s in year?.semesters) {
                console.log(year?.semesters[s].courses);
                if (YEARS[i]?.semesters[s] === undefined) { YEARS[i].semesters[s] = [];}
                YEARS[i].semesters[s] = YEARS[i].semesters[s].concat(year?.semesters[s]?.courses
                                     .filter(course => course?.id).map(course => new Course(course.id, i, 0).planned()));
            }
            // console.log(YEARS);

            // NEED TO FIX THIS YOU BIG DUMBY
            // if (program.years[i]?.courses) {
            //     const total = program.years[i].courses
            //     for (const k in total) {
            //         if (k <= total.length / 2) YEARS[i].semesters[0].push(total[k]?.id)
            //         else YEARS[i].semesters[1].push(total[k]?.id);
            //     }
            //     return YEARS;
            // }
            
            // YEARS[i].semesters[0] = semester1
            //                         .concat(year?.semesters[0]?.courses
            //                         .filter(course => course?.id).map(course => new Course(course.id, i, 0).planned()));
            // YEARS[i].semesters[1] = semester2
            //                         .concat(year?.semesters[1]?.courses
            //                         .filter(course => course?.id).map(course => new Course(course.id, i, 1).planned()));
            return YEARS;

        }, YEARS), years)  

    /**
     * IS:
     * [
     *  {years: [
     * 
     *      {semesters: [
     *          courses: []
     *      ]}
     *  ]}
     * ] 
     * 
     * NEEDS:
     * 
     * [
     * { semesters: [[], []]}
     * ]
     * 
     */
    

    // for (const prog of data) {
    //     const programs = getProgramsBySearch(prog.category, prog.year, prog.type);
    //     const program = programs ? programs[0] : undefined;
    //     if (!program || !program.years) continue;

    //     for (var i in program.years) {
    //         const year = program.years[i];

    //         if (!years[i]?.semesters) years[i] = {semesters: [[],[]]};
    //         const semester1 = years[i].semesters[0];
    //         const semester2 = years[i].semesters[1];

    //         if (program.years[i]?.courses) {
    //             const total = program.years[i].courses
    //             for (const k in total) {
    //                 if (k <= total.length / 2) semester1.push(total[k]?.id)
    //                 else semester2.push(total[k]?.id);
    //             }
    //             continue;
    //         }
            
    //         years[i].semesters[0] = semester1
    //                                 .concat(year?.semesters[0]?.courses
    //                                 .filter(course => course?.id).map(course => course.id));
    //         years[i].semesters[1] = years[i]?.semesters[1]
    //                                 .concat(year?.semesters[1]?.courses
    //                                 .filter(course => course?.id).map(course => course.id));

    //     }
    // }
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

