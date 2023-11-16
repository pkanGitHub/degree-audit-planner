import "../styles/semesterPlan.css";
import { getCourseById, getProgramsBySearch } from "../lib/data";

export default function SemesterPlan(props) {

    var years = [];
    addYears(years, props.data);
    years = DeleteDuplicates(years);

    if (JSON.stringify(years[years.length -1 ]?.semesters) === "[[],[]]") years.pop();


    if (years.length > 0) return (
        <div id="planner">
            <h2 id='userPlanner'>User's Degree Planner</h2>
                {years?.map((year, index) => {
                    const rows =  year?.semesters[0].length > year?.semesters[1].length ? year?.semesters[0].length : year?.semesters[1].length;
                    var total1 = 0;
                    var total2 = 0;

                    return (
                        <table key={index} id={"Year" + (index + 1)} className="planTable">
                            <thead>
                                <tr>
                                    <th colSpan={4} id='tableHeading'>Year {index + 1}</th>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="semesterHeading">Semester 1</td>
                                    <td colSpan={2} className="semesterHeading">Semester 2</td>
                                </tr>
                                <tr className="courseTableInfo" id="tableDataHeading">
                                    <td>Course name</td>
                                    <td>Credit hours</td>
                                    <td>Course name</td>
                                    <td>Credit hours</td>
                                </tr>
                            </thead>          
                            <tbody>
                                {[...Array(rows).keys()].map(r => {

                                    const semester1 = year.semesters[0];
                                    const semester2 = year.semesters[1];

                                    const course1 = semester1[r];
                                    const course2 = semester2[r];

                                    return (
                                        <tr className="courseTableInfo" key={r}>
                                            <td className={"courseLabel " + course1?.status}>{ course1?.id.replace(/_/g, " ") }</td>
                                            <td>{ (() => {
                                                const credit = getCourseById(course1?.id)?.credit; 
                                                total1 += !isNaN(Number(credit)) ? Number(credit) : 0;
                                                return credit;
                                            })()}</td>
                                            <td className={"courseLabel " + course2?.status}>{ course2?.id.replace(/_/g, " ") }</td>
                                            <td>{ (() => {
                                                const credit = getCourseById(course2?.id)?.credit; 
                                                total2 += !isNaN(Number(credit)) ? Number(credit) : 0;
                                                return credit;
                                            })()}</td>
                                        </tr>
                                    )
                                }, year)}
                            </tbody>
                            <tfoot>
                                <tr id='tableSummary'>
                                    <td><b>Status:</b> {calcStatus(year.semesters[0])}</td>
                                    <td><b>Total Credit Hours: </b>{ total1 }</td>
                                    <td><b>Status:</b> {calcStatus(year.semesters[1])}</td>
                                    <td><b>Total Credit Hours: </b>{ total2 }</td>
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
    console.log(semester);
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

function addYears(years, data) {

    data.map(program => getProgramsBySearch(program.category, program.year, program.type))
    .filter(programs => programs && programs[0].years)
    .map(programs => programs[0])
    .reduce((YEARS, program) =>
        program.years.reduce((YEARS, year, i) => {
            // const semesters = YEARS[i].semesters = YEARS[i]?.semesters ? YEARS[i].semesters : []
            if (!YEARS[i]?.semesters) YEARS[i] = {semesters: [[],[]]};
            const semester1 = YEARS[i].semesters[0];
            const semester2 = YEARS[i].semesters[1];

            if (program.years[i]?.courses) {
                const total = program.years[i].courses
                for (const k in total) {
                    if (k <= total.length / 2) semester1.push(total[k]?.id)
                    else semester2.push(total[k]?.id);
                }
                return YEARS;
            }
            
            YEARS[i].semesters[0] = semester1
                                    .concat(year?.semesters[0]?.courses
                                    .filter(course => course?.id).map(course => ({id: course.id, status: course?.status ? course.status : undefined })));
            YEARS[i].semesters[1] = YEARS[i]?.semesters[1]
                                    .concat(year?.semesters[1]?.courses
                                    .filter(course => course?.id).map(course => ({id: course.id, status: course?.status ? course.status : undefined })));
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

