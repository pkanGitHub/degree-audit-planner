import { getCourseById, getProgramsBySearch } from "../lib/data";

export default function SemesterPlan(props) {

    var years = [];

    for (const cat of props.data) {
        const programs = getProgramsBySearch(cat.category, cat.type);
        console.log(programs);
        const program = programs ? programs[0] : undefined;
        console.log(program)
        if (!program || !program.years) continue;

        console.log(program.years);

        for (var i in program.years) {
            const year = program.years[i];

            if (!years[i]?.semesters) years[i] = {semesters: [[],[]]};
            const semester1 = years[i].semesters[0];
            const semester2 = years[i].semesters[1];

            if (program.years[i]?.courses) {
                const total = program.years[i].courses
                for (const k in total) {
                    if (k <= total.length / 2) semester1.push(total[k]?.id)
                    else semester2.push(total[k]?.id);
                }
                continue;
            }
            
            years[i].semesters[0] = semester1
                                    .concat(year?.semesters[0]?.courses
                                    .filter(course => course?.id).map(course => course.id));
            years[i].semesters[1] = years[i]?.semesters[1]
                                    .concat(year?.semesters[1]?.courses
                                    .filter(course => course?.id).map(course => course.id));

        }
    }
    years = DeleteDuplicates(years);

    if (JSON.stringify(years[years.length -1 ]?.semesters) === "[[],[]]") years.pop();


    if (years != null) return (
        <div id="planner">
            <h2 id='userPlanner'>User's Degree Planner</h2>
                {years?.map(year => {
                    const rows =  year?.semesters[0].length > year?.semesters[1].length ? year?.semesters[0].length : year?.semesters[1].length;
                    var total1 = 0;
                    var total2 = 0;

                    return (
                        <table key={year.label} id={year.label} className="planTable">
                            <thead>
                                <tr>
                                    <th colSpan={4} id='tableHeading'>{year.label}</th>
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
                                            <td>{ course1?.replace(/_/g, " ") }</td>
                                            <td>{ (() => {
                                                const credit = getCourseById(course1)?.credit; 
                                                total1 += !isNaN(Number(credit)) ? Number(credit) : 0;
                                                return credit;
                                            })()}</td>
                                            <td>{ course2?.replace(/_/g, " ") }</td>
                                            <td>{ (() => {
                                                const credit = getCourseById(course2)?.credit; 
                                                total2 += !isNaN(Number(credit)) ? Number(credit) : 0;
                                                return credit;
                                            })()}</td>
                                        </tr>
                                    )
                                }, year)}
                                <tr id='tableSummary'>
                                    <td><b>Status:</b> Complete</td>
                                    <td><b>Total Credit Hours: </b>{ total1 }</td>
                                    <td><b>Status:</b> In Progress</td>
                                    <td><b>Total Credit Hours: </b>{ total2 }</td>
                                </tr>
                            </tbody>
                        </table>
                    )
                })}
        </div>
    );

    else return (
        <h4 style={{textAlign: "center"}}>Add some courses to generate a degree plan</h4>
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

